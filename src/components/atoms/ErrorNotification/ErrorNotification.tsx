/**
 * ErrorNotification - Componente para notificações de erro
 * Sistema de toast/notificação para exibir erros ao usuário
 */

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ErrorInfo } from '@/hooks/useErrorHandler';

// === INTERFACES ===
export interface ErrorNotificationProps {
  /** Informações do erro */
  error: ErrorInfo;
  /** Se deve mostrar a notificação */
  show: boolean;
  /** Callback para fechar */
  onClose: () => void;
  /** Duração em ms (0 = não fecha automaticamente) */
  duration?: number;
  /** Posição da notificação */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  /** Se deve mostrar botão de ação */
  showAction?: boolean;
  /** Texto do botão de ação */
  actionText?: string;
  /** Callback do botão de ação */
  onAction?: () => void;
}

// === COMPONENTE PRINCIPAL ===
export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  error,
  show,
  onClose,
  duration = 5000,
  position = 'top-right',
  showAction = false,
  actionText = 'Tentar Novamente',
  onAction,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Controlar visibilidade com animação
  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setIsExiting(false);
    } else {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsExiting(false);
      }, 300); // Duração da animação de saída

      return () => clearTimeout(timer);
    }
  }, [show]);

  // Auto-close
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  const handleAction = () => {
    onAction?.();
    handleClose();
  };

  if (!isVisible) return null;

  // Classes de posição
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  // Classes de severidade
  const severityClasses = {
    low: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
    medium: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
    high: 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-200',
    critical: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
  };

  // Ícones de severidade
  const getSeverityIcon = () => {
    switch (error.severity) {
      case 'low':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'medium':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'high':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'critical':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Título baseado na categoria
  const getTitle = () => {
    switch (error.category) {
      case 'network':
        return 'Erro de Conexão';
      case 'validation':
        return 'Erro de Validação';
      case 'runtime':
        return 'Erro de Sistema';
      case 'async':
        return 'Erro de Operação';
      case 'ui':
        return 'Erro de Interface';
      default:
        return 'Erro';
    }
  };

  return (
    <div
      className={cn(
        'fixed z-50 max-w-sm w-full pointer-events-auto',
        positionClasses[position],
        'transition-all duration-300 ease-in-out',
        isExiting ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'
      )}
    >
      <div
        className={cn(
          'rounded-lg border shadow-lg p-4',
          severityClasses[error.severity],
          'backdrop-blur-sm'
        )}
      >
        <div className="flex items-start gap-3">
          {/* Ícone */}
          <div className="flex-shrink-0 mt-0.5">
            {getSeverityIcon()}
          </div>

          {/* Conteúdo */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className="text-sm font-medium">
                  {getTitle()}
                </h4>
                <p className="text-sm mt-1 opacity-90">
                  {error.message}
                </p>
                
                {/* Contexto adicional */}
                {error.context && Object.keys(error.context).length > 0 && (
                  <details className="mt-2">
                    <summary className="text-xs cursor-pointer opacity-75 hover:opacity-100">
                      Detalhes
                    </summary>
                    <pre className="text-xs mt-1 opacity-75 overflow-auto max-h-20">
                      {JSON.stringify(error.context, null, 2)}
                    </pre>
                  </details>
                )}
              </div>

              {/* Botão de fechar */}
              <button
                onClick={handleClose}
                className="flex-shrink-0 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Fechar notificação"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Ações */}
            {showAction && onAction && (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleAction}
                  className="text-xs px-3 py-1 rounded-md bg-current/10 hover:bg-current/20 transition-colors"
                >
                  {actionText}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Barra de progresso para auto-close */}
        {duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-current/20 rounded-b-lg overflow-hidden">
            <div
              className="h-full bg-current/40 transition-all ease-linear"
              style={{
                width: '100%',
                animation: `shrink ${duration}ms linear`,
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

// === CONTAINER DE NOTIFICAÇÕES ===
export interface ErrorNotificationContainerProps {
  /** Lista de erros para mostrar */
  errors: ErrorInfo[];
  /** Callback para remover erro */
  onRemove: (timestamp: string) => void;
  /** Posição das notificações */
  position?: ErrorNotificationProps['position'];
  /** Duração padrão */
  duration?: number;
  /** Máximo de notificações simultâneas */
  maxNotifications?: number;
}

export const ErrorNotificationContainer: React.FC<ErrorNotificationContainerProps> = ({
  errors,
  onRemove,
  position = 'top-right',
  duration = 5000,
  maxNotifications = 5,
}) => {
  // Limitar número de notificações
  const visibleErrors = errors.slice(0, maxNotifications);

  return (
    <>
      {visibleErrors.map((error, index) => (
        <ErrorNotification
          key={error.timestamp}
          error={error}
          show={true}
          onClose={() => onRemove(error.timestamp)}
          position={position}
          duration={duration}
          showAction={error.category === 'network' || error.category === 'async'}
          actionText="Tentar Novamente"
          onAction={() => {
            // Callback para retry pode ser implementado aqui
            console.log('Retry action for error:', error.message);
          }}
        />
      ))}
    </>
  );
};

ErrorNotification.displayName = 'ErrorNotification';
ErrorNotificationContainer.displayName = 'ErrorNotificationContainer';

export default ErrorNotification;