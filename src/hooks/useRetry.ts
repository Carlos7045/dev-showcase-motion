/**
 * useRetry - Hook para retry de operações com backoff
 * Fornece funcionalidades para tentar novamente operações que falharam
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { useErrorHandler } from './useErrorHandler';

// === TIPOS ===
export interface RetryOptions {
  /** Número máximo de tentativas */
  maxAttempts?: number;
  /** Delay inicial em ms */
  initialDelay?: number;
  /** Multiplicador para backoff exponencial */
  backoffMultiplier?: number;
  /** Delay máximo em ms */
  maxDelay?: number;
  /** Se deve usar jitter para evitar thundering herd */
  useJitter?: boolean;
  /** Função para determinar se deve fazer retry */
  shouldRetry?: (error: Error, attempt: number) => boolean;
  /** Callback chamado antes de cada tentativa */
  onRetry?: (attempt: number, error: Error) => void;
  /** Callback chamado quando todas as tentativas falharam */
  onMaxAttemptsReached?: (error: Error) => void;
}

export interface UseRetryReturn<T> {
  /** Executar operação com retry */
  execute: (operation: () => Promise<T>) => Promise<T>;
  /** Se está executando */
  isExecuting: boolean;
  /** Tentativa atual */
  currentAttempt: number;
  /** Último erro */
  lastError: Error | null;
  /** Cancelar execução atual */
  cancel: () => void;
  /** Reset do estado */
  reset: () => void;
}

// === UTILITIES ===
const calculateDelay = (
  attempt: number,
  initialDelay: number,
  backoffMultiplier: number,
  maxDelay: number,
  useJitter: boolean
): number => {
  let delay = initialDelay * Math.pow(backoffMultiplier, attempt - 1);
  delay = Math.min(delay, maxDelay);

  if (useJitter) {
    // Adicionar jitter de ±25%
    const jitter = delay * 0.25 * (Math.random() * 2 - 1);
    delay += jitter;
  }

  return Math.max(delay, 0);
};

const defaultShouldRetry = (error: Error, attempt: number): boolean => {
  // Não fazer retry para erros de validação ou cliente
  if (error.message.includes('validation') || 
      error.message.includes('invalid') ||
      error.message.includes('400') ||
      error.message.includes('401') ||
      error.message.includes('403') ||
      error.message.includes('404')) {
    return false;
  }

  // Fazer retry para erros de rede, timeout e servidor
  return error.message.includes('network') ||
         error.message.includes('timeout') ||
         error.message.includes('fetch') ||
         error.message.includes('500') ||
         error.message.includes('502') ||
         error.message.includes('503') ||
         error.message.includes('504');
};

// === HOOK PRINCIPAL ===
export const useRetry = <T = any>(
  defaultOptions: RetryOptions = {}
): UseRetryReturn<T> => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [lastError, setLastError] = useState<Error | null>(null);

  const { captureError } = useErrorHandler();
  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const options: Required<RetryOptions> = {
    maxAttempts: 3,
    initialDelay: 1000,
    backoffMultiplier: 2,
    maxDelay: 10000,
    useJitter: true,
    shouldRetry: defaultShouldRetry,
    onRetry: () => {},
    onMaxAttemptsReached: () => {},
    ...defaultOptions,
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Cancelar execução
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsExecuting(false);
    setCurrentAttempt(0);
  }, []);

  // Reset do estado
  const reset = useCallback(() => {
    cancel();
    setLastError(null);
  }, [cancel]);

  // Executar operação com retry
  const execute = useCallback(async (
    operation: () => Promise<T>
  ): Promise<T> => {
    if (isExecuting) {
      throw new Error('Operation already in progress');
    }

    setIsExecuting(true);
    setLastError(null);
    setCurrentAttempt(0);

    // Criar novo AbortController
    abortControllerRef.current = new AbortController();

    let lastAttemptError: Error | null = null;

    for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
      // Verificar se foi cancelado
      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Operation was cancelled');
      }

      setCurrentAttempt(attempt);

      try {
        const result = await operation();
        
        // Sucesso - limpar estado e retornar
        setIsExecuting(false);
        setCurrentAttempt(0);
        return result;

      } catch (error) {
        const err = error as Error;
        lastAttemptError = err;
        setLastError(err);

        // Log do erro
        captureError(err, {
          context: { 
            attempt, 
            maxAttempts: options.maxAttempts,
            retryOperation: true 
          },
          severity: attempt === options.maxAttempts ? 'high' : 'medium',
        });

        // Verificar se deve fazer retry
        const shouldRetry = options.shouldRetry(err, attempt);
        const isLastAttempt = attempt === options.maxAttempts;

        if (!shouldRetry || isLastAttempt) {
          if (isLastAttempt) {
            options.onMaxAttemptsReached(err);
          }
          break;
        }

        // Callback de retry
        options.onRetry(attempt, err);

        // Calcular delay para próxima tentativa
        const delay = calculateDelay(
          attempt,
          options.initialDelay,
          options.backoffMultiplier,
          options.maxDelay,
          options.useJitter
        );

        // Aguardar delay antes da próxima tentativa
        await new Promise<void>((resolve, reject) => {
          timeoutRef.current = setTimeout(() => {
            if (abortControllerRef.current?.signal.aborted) {
              reject(new Error('Operation was cancelled'));
            } else {
              resolve();
            }
          }, delay);
        });
      }
    }

    // Todas as tentativas falharam
    setIsExecuting(false);
    setCurrentAttempt(0);

    if (lastAttemptError) {
      throw lastAttemptError;
    }

    throw new Error('All retry attempts failed');
  }, [isExecuting, options, captureError]);

  return {
    execute,
    isExecuting,
    currentAttempt,
    lastError,
    cancel,
    reset,
  };
};

// === HOOK PARA RETRY AUTOMÁTICO ===
export const useAutoRetry = <T = any>(
  operation: () => Promise<T>,
  dependencies: React.DependencyList = [],
  options: RetryOptions = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { execute, isExecuting, currentAttempt } = useRetry<T>(options);

  // Executar automaticamente quando dependências mudam
  useEffect(() => {
    const runOperation = async () => {
      try {
        setError(null);
        const result = await execute(operation);
        setData(result);
      } catch (err) {
        setError(err as Error);
      }
    };

    runOperation();
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data,
    error,
    isLoading: isExecuting,
    currentAttempt,
    retry: () => execute(operation),
  };
};

// === HOOK PARA RETRY MANUAL ===
export const useManualRetry = <T = any>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { execute, isExecuting, currentAttempt, reset } = useRetry<T>(options);

  const retry = useCallback(async () => {
    try {
      setError(null);
      const result = await execute(operation);
      setData(result);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [execute, operation]);

  return {
    data,
    error,
    isLoading: isExecuting,
    currentAttempt,
    retry,
    reset: () => {
      reset();
      setData(null);
      setError(null);
    },
  };
};

// === TIPOS EXPORTADOS ===
export type { RetryOptions, UseRetryReturn };