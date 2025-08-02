/**
 * useErrorHandler - Hook para tratamento consistente de erros
 * Fornece funcionalidades centralizadas para captura e tratamento de erros
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { DEV_CONFIG } from '@/config';

// === TIPOS ===
export interface ErrorInfo {
  message: string;
  stack?: string;
  name: string;
  timestamp: string;
  context?: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'network' | 'validation' | 'runtime' | 'async' | 'ui' | 'unknown';
}

export interface ErrorHandlerOptions {
  /** Se deve fazer log do erro */
  enableLogging?: boolean;
  /** Se deve mostrar notificação de erro */
  showNotification?: boolean;
  /** Contexto adicional para o erro */
  context?: Record<string, any>;
  /** Callback customizado para tratamento */
  onError?: (error: ErrorInfo) => void;
  /** Se deve tentar recuperação automática */
  autoRecover?: boolean;
  /** Função de recuperação */
  onRecover?: () => void | Promise<void>;
}

export interface UseErrorHandlerReturn {
  /** Erro atual */
  error: ErrorInfo | null;
  /** Se há um erro ativo */
  hasError: boolean;
  /** Se está em processo de recuperação */
  isRecovering: boolean;
  /** Histórico de erros */
  errorHistory: ErrorInfo[];
  /** Capturar um erro */
  captureError: (error: Error | string, options?: ErrorHandlerOptions) => void;
  /** Limpar erro atual */
  clearError: () => void;
  /** Limpar histórico */
  clearHistory: () => void;
  /** Tentar recuperação */
  recover: () => Promise<void>;
  /** Obter estatísticas de erros */
  getErrorStats: () => {
    total: number;
    byCategory: Record<string, number>;
    bySeverity: Record<string, number>;
    recent: ErrorInfo[];
  };
}

// === UTILITIES ===
const categorizeError = (error: Error | string): ErrorInfo['category'] => {
  const message = typeof error === 'string' ? error : error.message;
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('fetch') || 
      lowerMessage.includes('network') || 
      lowerMessage.includes('connection')) {
    return 'network';
  }

  if (lowerMessage.includes('validation') || 
      lowerMessage.includes('invalid') || 
      lowerMessage.includes('required')) {
    return 'validation';
  }

  if (lowerMessage.includes('async') || 
      lowerMessage.includes('promise') || 
      lowerMessage.includes('timeout')) {
    return 'async';
  }

  if (lowerMessage.includes('render') || 
      lowerMessage.includes('component') || 
      lowerMessage.includes('hook')) {
    return 'ui';
  }

  if (typeof error === 'object' && error.name) {
    const errorName = error.name.toLowerCase();
    if (errorName.includes('type') || errorName.includes('reference')) {
      return 'runtime';
    }
  }

  return 'unknown';
};

const getSeverity = (error: Error | string, category: ErrorInfo['category']): ErrorInfo['severity'] => {
  const message = typeof error === 'string' ? error : error.message;
  const lowerMessage = message.toLowerCase();

  // Erros críticos
  if (lowerMessage.includes('critical') || 
      lowerMessage.includes('fatal') || 
      lowerMessage.includes('crash')) {
    return 'critical';
  }

  // Erros de alta severidade
  if (category === 'runtime' || 
      lowerMessage.includes('security') || 
      lowerMessage.includes('auth')) {
    return 'high';
  }

  // Erros de média severidade
  if (category === 'network' || 
      category === 'async' || 
      lowerMessage.includes('failed')) {
    return 'medium';
  }

  // Erros de baixa severidade
  return 'low';
};

const formatError = (
  error: Error | string, 
  options: ErrorHandlerOptions = {}
): ErrorInfo => {
  const errorObj = typeof error === 'string' ? new Error(error) : error;
  const category = categorizeError(error);
  const severity = getSeverity(error, category);

  return {
    message: errorObj.message,
    stack: errorObj.stack,
    name: errorObj.name,
    timestamp: new Date().toISOString(),
    context: options.context,
    severity,
    category,
  };
};

const logError = (errorInfo: ErrorInfo) => {
  if (!DEV_CONFIG.enableConsoleLogging) return;

  const logMethod = errorInfo.severity === 'critical' ? 'error' : 
                   errorInfo.severity === 'high' ? 'error' :
                   errorInfo.severity === 'medium' ? 'warn' : 'log';

  console.group(`🚨 Error Handler - ${errorInfo.severity.toUpperCase()}`);
  console[logMethod]('Message:', errorInfo.message);
  console[logMethod]('Category:', errorInfo.category);
  console[logMethod]('Severity:', errorInfo.severity);
  console[logMethod]('Timestamp:', errorInfo.timestamp);
  
  if (errorInfo.context) {
    console[logMethod]('Context:', errorInfo.context);
  }
  
  if (errorInfo.stack) {
    console[logMethod]('Stack:', errorInfo.stack);
  }
  
  console.groupEnd();
};

// === HOOK PRINCIPAL ===
export const useErrorHandler = (
  defaultOptions: ErrorHandlerOptions = {}
): UseErrorHandlerReturn => {
  const [error, setError] = useState<ErrorInfo | null>(null);
  const [isRecovering, setIsRecovering] = useState(false);
  const [errorHistory, setErrorHistory] = useState<ErrorInfo[]>([]);
  
  const optionsRef = useRef(defaultOptions);
  const recoveryTimeoutRef = useRef<NodeJS.Timeout>();

  // Atualizar opções
  useEffect(() => {
    optionsRef.current = { ...optionsRef.current, ...defaultOptions };
  }, [defaultOptions]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (recoveryTimeoutRef.current) {
        clearTimeout(recoveryTimeoutRef.current);
      }
    };
  }, []);

  // Capturar erro
  const captureError = useCallback((
    errorInput: Error | string, 
    options: ErrorHandlerOptions = {}
  ) => {
    const mergedOptions = { ...optionsRef.current, ...options };
    const errorInfo = formatError(errorInput, mergedOptions);

    // Definir erro atual
    setError(errorInfo);

    // Adicionar ao histórico
    setErrorHistory(prev => [errorInfo, ...prev.slice(0, 49)]); // Manter últimos 50

    // Log do erro
    if (mergedOptions.enableLogging !== false) {
      logError(errorInfo);
    }

    // Callback customizado
    mergedOptions.onError?.(errorInfo);

    // Recuperação automática
    if (mergedOptions.autoRecover && mergedOptions.onRecover) {
      recoveryTimeoutRef.current = setTimeout(async () => {
        try {
          setIsRecovering(true);
          await mergedOptions.onRecover!();
          setError(null);
        } catch (recoveryError) {
          console.error('Auto recovery failed:', recoveryError);
        } finally {
          setIsRecovering(false);
        }
      }, 2000);
    }

    // Em produção, enviar para serviço de monitoramento
    if (process.env.NODE_ENV === 'production' && errorInfo.severity === 'critical') {
      // sendErrorToMonitoring(errorInfo);
    }
  }, []);

  // Limpar erro atual
  const clearError = useCallback(() => {
    setError(null);
    setIsRecovering(false);
    
    if (recoveryTimeoutRef.current) {
      clearTimeout(recoveryTimeoutRef.current);
    }
  }, []);

  // Limpar histórico
  const clearHistory = useCallback(() => {
    setErrorHistory([]);
  }, []);

  // Recuperação manual
  const recover = useCallback(async () => {
    if (!optionsRef.current.onRecover) {
      console.warn('No recovery function provided');
      return;
    }

    try {
      setIsRecovering(true);
      await optionsRef.current.onRecover();
      setError(null);
    } catch (recoveryError) {
      console.error('Manual recovery failed:', recoveryError);
      captureError(recoveryError as Error, { 
        context: { recoveryAttempt: true },
        severity: 'high' 
      });
    } finally {
      setIsRecovering(false);
    }
  }, [captureError]);

  // Estatísticas de erros
  const getErrorStats = useCallback(() => {
    const byCategory = errorHistory.reduce((acc, err) => {
      acc[err.category] = (acc[err.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const bySeverity = errorHistory.reduce((acc, err) => {
      acc[err.severity] = (acc[err.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recent = errorHistory.slice(0, 10);

    return {
      total: errorHistory.length,
      byCategory,
      bySeverity,
      recent,
    };
  }, [errorHistory]);

  return {
    error,
    hasError: error !== null,
    isRecovering,
    errorHistory,
    captureError,
    clearError,
    clearHistory,
    recover,
    getErrorStats,
  };
};

// === HOOK PARA ERROS ASSÍNCRONOS ===
export const useAsyncError = () => {
  const { captureError } = useErrorHandler({
    enableLogging: true,
    category: 'async',
  });

  const throwAsync = useCallback((error: Error) => {
    // Capturar o erro primeiro
    captureError(error, { 
      context: { async: true },
      severity: 'medium' 
    });

    // Throw para ser capturado por Error Boundary
    throw error;
  }, [captureError]);

  return throwAsync;
};

// === HOOK PARA NOTIFICAÇÕES DE ERRO ===
export const useErrorNotification = () => {
  const [notifications, setNotifications] = useState<ErrorInfo[]>([]);

  const showError = useCallback((error: ErrorInfo) => {
    setNotifications(prev => [error, ...prev.slice(0, 4)]); // Máximo 5 notificações

    // Auto-remover após 5 segundos
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.timestamp !== error.timestamp));
    }, 5000);
  }, []);

  const dismissError = useCallback((timestamp: string) => {
    setNotifications(prev => prev.filter(n => n.timestamp !== timestamp));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    showError,
    dismissError,
    clearAll,
  };
};

// === TIPOS EXPORTADOS ===
export type { ErrorHandlerOptions, UseErrorHandlerReturn };