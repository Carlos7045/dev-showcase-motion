/**
 * AsyncErrorBoundary - Error Boundary para operações assíncronas
 * Captura erros de fetch, API calls e operações assíncronas
 */

import React from 'react';
import { ErrorBoundary, ErrorBoundaryProps } from './ErrorBoundary';
import { Button } from '@/components/atoms/Button';

// === INTERFACES ===
interface AsyncErrorBoundaryProps extends Omit<ErrorBoundaryProps, 'fallbackRender'> {
  /** Função para retry da operação assíncrona */
  onRetry?: () => void | Promise<void>;
  /** Se deve mostrar botão de retry */
  showRetry?: boolean;
  /** Se deve fazer retry automático */
  autoRetry?: boolean;
  /** Intervalo entre retries automáticos (ms) */
  retryInterval?: number;
  /** Número máximo de retries automáticos */
  maxRetries?: number;
  /** Timeout para operações assíncronas (ms) */
  timeout?: number;
}

// === COMPONENTE DE FALLBACK ===
const AsyncErrorFallback: React.FC<{
  error: Error;
  resetErrorBoundary: () => void;
  onRetry?: () => void | Promise<void>;
  showRetry?: boolean;
  isRetrying?: boolean;
}> = ({ 
  error, 
  resetErrorBoundary, 
  onRetry,
  showRetry = true,
  isRetrying = false
}) => {
  const [isManualRetrying, setIsManualRetrying] = React.useState(false);

  const isNetworkError = error.message.includes('fetch') ||
                        error.message.includes('Network') ||
                        error.message.includes('ERR_NETWORK') ||
                        error.name === 'NetworkError';

  const isTimeoutError = error.message.includes('timeout') ||
                        error.message.includes('Timeout') ||
                        error.name === 'TimeoutError';

  const isAPIError = error.message.includes('API') ||
                    error.message.includes('HTTP') ||
                    error.message.includes('status');

  const handleRetry = async () => {
    if (isManualRetrying) return;

    setIsManualRetrying(true);
    
    try {
      if (onRetry) {
        await onRetry();
      }
      resetErrorBoundary();
    } catch (retryError) {
      console.error('Retry failed:', retryError);
      // O erro será capturado pelo error boundary novamente
    } finally {
      setIsManualRetrying(false);
    }
  };

  const getErrorMessage = () => {
    if (isNetworkError) {
      return 'Erro de conexão. Verifique sua internet e tente novamente.';
    }
    
    if (isTimeoutError) {
      return 'A operação demorou mais que o esperado. Tente novamente.';
    }
    
    if (isAPIError) {
      return 'Erro no servidor. Nossa equipe foi notificada.';
    }
    
    return 'Erro ao carregar os dados. Tente novamente em alguns instantes.';
  };

  const getErrorTitle = () => {
    if (isNetworkError) {
      return 'Sem Conexão';
    }
    
    if (isTimeoutError) {
      return 'Tempo Esgotado';
    }
    
    if (isAPIError) {
      return 'Erro do Servidor';
    }
    
    return 'Erro de Carregamento';
  };

  const getErrorIcon = () => {
    if (isNetworkError) {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      );
    }
    
    if (isTimeoutError) {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      );
    }
    
    if (isAPIError) {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      );
    }
    
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    );
  };

  const showSpinner = isRetrying || isManualRetrying;

  return (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <div className="max-w-sm w-full text-center space-y-4">
        {/* Ícone de erro ou spinner */}
        <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
          {showSpinner ? (
            <svg
              className="w-6 h-6 text-primary animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {getErrorIcon()}
            </svg>
          )}
        </div>

        {/* Título e descrição */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">
            {showSpinner ? 'Tentando novamente...' : getErrorTitle()}
          </h3>
          
          <p className="text-sm text-muted-foreground">
            {showSpinner ? 'Aguarde enquanto recarregamos os dados.' : getErrorMessage()}
          </p>
        </div>

        {/* Ações */}
        {showRetry && !showSpinner && (
          <div className="space-y-2">
            <Button
              onClick={handleRetry}
              variant="outline"
              size="sm"
              disabled={isManualRetrying}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Tentar Novamente
            </Button>

            {/* Dicas baseadas no tipo de erro */}
            {isNetworkError && (
              <p className="text-xs text-muted-foreground">
                💡 Verifique sua conexão com a internet
              </p>
            )}
            
            {isTimeoutError && (
              <p className="text-xs text-muted-foreground">
                💡 Tente novamente em alguns segundos
              </p>
            )}
          </div>
        )}

        {/* Debug info em desenvolvimento */}
        {process.env.NODE_ENV === 'development' && !showSpinner && (
          <details className="text-left bg-muted/50 rounded-lg p-3">
            <summary className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground">
              Debug Info
            </summary>
            <div className="mt-2 space-y-1">
              <div>
                <strong className="text-xs text-muted-foreground">Type:</strong>
                <span className="text-xs ml-2">
                  {isNetworkError ? 'Network' : isTimeoutError ? 'Timeout' : isAPIError ? 'API' : 'Unknown'}
                </span>
              </div>
              <div>
                <strong className="text-xs text-muted-foreground">Message:</strong>
                <pre className="text-xs bg-background rounded p-1 mt-1 overflow-auto">
                  {error.message}
                </pre>
              </div>
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

// === HOOK PARA AUTO RETRY ===
const useAsyncAutoRetry = (
  autoRetry: boolean,
  maxRetries: number,
  retryInterval: number,
  onRetry?: () => void | Promise<void>
) => {
  const [retryCount, setRetryCount] = React.useState(0);
  const [isRetrying, setIsRetrying] = React.useState(false);

  const handleError = React.useCallback(async (error: Error) => {
    if (!autoRetry || retryCount >= maxRetries) return;

    // Só fazer auto retry para erros de rede/timeout
    const shouldRetry = error.message.includes('fetch') ||
                       error.message.includes('Network') ||
                       error.message.includes('timeout') ||
                       error.name === 'NetworkError' ||
                       error.name === 'TimeoutError';

    if (!shouldRetry) return;

    setIsRetrying(true);
    const delay = Math.min(retryInterval * Math.pow(2, retryCount), 10000); // Max 10s

    setTimeout(async () => {
      try {
        if (onRetry) {
          await onRetry();
        }
        setRetryCount(prev => prev + 1);
      } catch (retryError) {
        console.error('Auto retry failed:', retryError);
      } finally {
        setIsRetrying(false);
      }
    }, delay);

    console.warn(`Auto retry ${retryCount + 1}/${maxRetries} in ${delay}ms for async error`);
  }, [autoRetry, maxRetries, retryCount, retryInterval, onRetry]);

  const resetRetryCount = React.useCallback(() => {
    setRetryCount(0);
    setIsRetrying(false);
  }, []);

  return { handleError, resetRetryCount, retryCount, isRetrying };
};

// === COMPONENTE PRINCIPAL ===
export const AsyncErrorBoundary: React.FC<AsyncErrorBoundaryProps> = ({
  children,
  onRetry,
  showRetry = true,
  autoRetry = true,
  retryInterval = 2000,
  maxRetries = 3,
  timeout = 10000,
  onError,
  ...props
}) => {
  const [key, setKey] = React.useState(0);

  // Auto retry logic
  const { handleError: handleAutoRetry, resetRetryCount, isRetrying } = useAsyncAutoRetry(
    autoRetry,
    maxRetries,
    retryInterval,
    onRetry
  );

  const handleError = (error: Error, errorInfo: any) => {
    // Log estruturado do erro assíncrono
    console.group('⚡ Async Error Boundary');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Error Type:', {
      isNetwork: error.message.includes('fetch') || error.message.includes('Network'),
      isTimeout: error.message.includes('timeout'),
      isAPI: error.message.includes('API') || error.message.includes('HTTP'),
    });
    console.error('Timestamp:', new Date().toISOString());
    console.groupEnd();

    // Tentar auto retry
    handleAutoRetry(error);

    // Chamar handler customizado
    onError?.(error, errorInfo);
  };

  const handleReset = () => {
    resetRetryCount();
    setKey(prev => prev + 1);
  };

  // Timeout para operações assíncronas
  React.useEffect(() => {
    if (timeout <= 0) return;

    const timer = setTimeout(() => {
      console.warn(`Async operation timeout after ${timeout}ms`);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout, key]);

  return (
    <ErrorBoundary
      {...props}
      key={key}
      onError={handleError}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <AsyncErrorFallback
          error={error}
          resetErrorBoundary={() => {
            resetErrorBoundary();
            handleReset();
          }}
          onRetry={onRetry}
          showRetry={showRetry}
          isRetrying={isRetrying}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

AsyncErrorBoundary.displayName = 'AsyncErrorBoundary';

export default AsyncErrorBoundary;