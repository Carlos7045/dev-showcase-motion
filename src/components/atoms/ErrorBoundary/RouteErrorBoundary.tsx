/**
 * RouteErrorBoundary - Error Boundary para rotas
 * Captura erros específicos de roteamento e lazy loading
 */

import React from 'react';
import { ErrorBoundary, ErrorBoundaryProps } from './ErrorBoundary';
import { Button } from '@/components/atoms/Button';

// === INTERFACES ===
interface RouteErrorBoundaryProps extends Omit<ErrorBoundaryProps, 'fallbackRender'> {
  /** Nome da rota para contexto */
  routeName?: string;
  /** Se deve mostrar botão de voltar */
  showBackButton?: boolean;
  /** Se deve tentar recarregar automaticamente */
  autoRetry?: boolean;
  /** Número máximo de tentativas automáticas */
  maxRetries?: number;
}

// === COMPONENTE DE FALLBACK ===
const RouteErrorFallback: React.FC<{
  error: Error;
  resetErrorBoundary: () => void;
  routeName?: string;
  showBackButton?: boolean;
}> = ({ 
  error, 
  resetErrorBoundary, 
  routeName,
  showBackButton = true 
}) => {
  const isChunkError = error.message.includes('Loading chunk') || 
                      error.message.includes('ChunkLoadError');
  
  const isNetworkError = error.message.includes('Network') ||
                        error.message.includes('fetch');

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  const handleHome = () => {
    window.location.href = '/';
  };

  const getErrorMessage = () => {
    if (isChunkError) {
      return 'Erro ao carregar esta página. Isso pode acontecer após atualizações da aplicação.';
    }
    
    if (isNetworkError) {
      return 'Erro de conexão. Verifique sua internet e tente novamente.';
    }
    
    return 'Ocorreu um erro ao carregar esta página.';
  };

  const getErrorTitle = () => {
    if (isChunkError) {
      return 'Página Desatualizada';
    }
    
    if (isNetworkError) {
      return 'Sem Conexão';
    }
    
    return 'Erro na Página';
  };

  const getErrorIcon = () => {
    if (isChunkError) {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
      );
    }
    
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
    
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    );
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Ícone de erro */}
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-8 h-8 text-destructive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {getErrorIcon()}
          </svg>
        </div>

        {/* Título e descrição */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            {getErrorTitle()}
          </h2>
          
          {routeName && (
            <p className="text-sm text-muted-foreground">
              Rota: <code className="bg-muted px-1 rounded">{routeName}</code>
            </p>
          )}
          
          <p className="text-muted-foreground">
            {getErrorMessage()}
          </p>
        </div>

        {/* Ações */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={resetErrorBoundary}
              variant="default"
              className="flex-1 sm:flex-none"
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
              {isChunkError ? 'Recarregar' : 'Tentar Novamente'}
            </Button>

            {showBackButton && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 sm:flex-none"
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Voltar
              </Button>
            )}
          </div>

          <Button
            onClick={handleHome}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Ir para Início
          </Button>
        </div>

        {/* Dica para chunk errors */}
        {isChunkError && (
          <div className="bg-muted/50 rounded-lg p-4 text-left">
            <h4 className="text-sm font-medium text-foreground mb-2">
              💡 Dica
            </h4>
            <p className="text-xs text-muted-foreground">
              Este erro geralmente acontece após atualizações da aplicação. 
              Recarregar a página deve resolver o problema.
            </p>
          </div>
        )}

        {/* Debug info em desenvolvimento */}
        {process.env.NODE_ENV === 'development' && (
          <details className="text-left bg-muted/50 rounded-lg p-4">
            <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
              Debug Info
            </summary>
            <div className="mt-3 space-y-2">
              <div>
                <strong className="text-xs text-muted-foreground">Error:</strong>
                <pre className="text-xs bg-background rounded p-2 mt-1 overflow-auto">
                  {error.message}
                </pre>
              </div>
              <div>
                <strong className="text-xs text-muted-foreground">Stack:</strong>
                <pre className="text-xs bg-background rounded p-2 mt-1 overflow-auto max-h-24">
                  {error.stack}
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
const useAutoRetry = (
  autoRetry: boolean,
  maxRetries: number,
  onRetry: () => void
) => {
  const [retryCount, setRetryCount] = React.useState(0);
  const [isRetrying, setIsRetrying] = React.useState(false);

  const handleError = React.useCallback((error: Error) => {
    if (!autoRetry || retryCount >= maxRetries) return;

    // Só fazer auto retry para chunk errors
    const isChunkError = error.message.includes('Loading chunk') || 
                        error.message.includes('ChunkLoadError');
    
    if (!isChunkError) return;

    setIsRetrying(true);
    const delay = Math.min(1000 * Math.pow(2, retryCount), 5000); // Max 5s

    setTimeout(() => {
      setRetryCount(prev => prev + 1);
      setIsRetrying(false);
      onRetry();
    }, delay);

    console.warn(`Auto retry ${retryCount + 1}/${maxRetries} in ${delay}ms for chunk error`);
  }, [autoRetry, maxRetries, retryCount, onRetry]);

  const resetRetryCount = React.useCallback(() => {
    setRetryCount(0);
    setIsRetrying(false);
  }, []);

  return { handleError, resetRetryCount, retryCount, isRetrying };
};

// === COMPONENTE PRINCIPAL ===
export const RouteErrorBoundary: React.FC<RouteErrorBoundaryProps> = ({
  children,
  routeName,
  showBackButton = true,
  autoRetry = true,
  maxRetries = 3,
  onError,
  ...props
}) => {
  const [key, setKey] = React.useState(0);

  // Auto retry logic
  const { handleError: handleAutoRetry, resetRetryCount } = useAutoRetry(
    autoRetry,
    maxRetries,
    () => setKey(prev => prev + 1)
  );

  const handleError = (error: Error, errorInfo: any) => {
    // Log estruturado do erro de rota
    console.group('🛣️ Route Error Boundary');
    console.error('Route:', routeName || 'Unknown');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('URL:', window.location.href);
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

  return (
    <ErrorBoundary
      {...props}
      key={key}
      onError={handleError}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <RouteErrorFallback
          error={error}
          resetErrorBoundary={() => {
            resetErrorBoundary();
            handleReset();
          }}
          routeName={routeName}
          showBackButton={showBackButton}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

RouteErrorBoundary.displayName = 'RouteErrorBoundary';

export default RouteErrorBoundary;