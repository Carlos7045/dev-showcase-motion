/**
 * LazyLoad - Componente molecule para lazy loading
 * Wrapper otimizado com Suspense e error boundaries
 */

import React, { Suspense, useMemo, useCallback } from 'react';
import { ErrorBoundary } from '@/components/atoms/ErrorBoundary';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';
import type { BaseComponentProps } from '@/types/base';

// === INTERFACES ===
export interface LazyLoadProps extends BaseComponentProps {
  /** Componente de loading customizado */
  readonly fallback?: React.ReactNode;
  /** Altura mínima durante o loading */
  readonly minHeight?: string | number;
  /** Se deve mostrar skeleton ao invés de spinner */
  readonly skeleton?: boolean;
  /** Número de linhas do skeleton */
  readonly skeletonLines?: number;
  /** Delay antes de mostrar o loading (evita flash) */
  readonly delay?: number;
  /** Timeout para mostrar erro */
  readonly timeout?: number;
  /** Handler de erro customizado */
  readonly onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /** Se deve tentar recarregar automaticamente */
  readonly autoRetry?: boolean;
  /** Número máximo de tentativas */
  readonly maxRetries?: number;
  /** Texto de erro customizado */
  readonly errorMessage?: string;
  /** Se deve mostrar botão de retry */
  readonly showRetry?: boolean;
}

// === COMPONENTE DE SKELETON ===
const SkeletonLoader: React.FC<{
  lines?: number;
  minHeight?: string | number;
  className?: string;
}> = ({ 
  lines = 3, 
  minHeight,
  className 
}) => {
  const containerStyle = useMemo(() => ({
    minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
  }), [minHeight]);

  return (
    <div 
      className={cn('animate-pulse space-y-4 p-6', className)}
      style={containerStyle}
      role="status"
      aria-label="Carregando conteúdo"
    >
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-6 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-3">
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={cn(
              'h-4 bg-muted rounded',
              index === lines - 1 ? 'w-2/3' : 'w-full'
            )}
          />
        ))}
      </div>
      
      {/* Footer skeleton */}
      <div className="flex gap-3 pt-4">
        <div className="h-8 bg-muted rounded w-20" />
        <div className="h-8 bg-muted rounded w-16" />
      </div>
    </div>
  );
};

// === COMPONENTE DE LOADING COM DELAY ===
const DelayedLoader: React.FC<{
  delay: number;
  fallback: React.ReactNode;
}> = ({ delay, fallback }) => {
  const [showLoader, setShowLoader] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!showLoader) {
    return null;
  }

  return <>{fallback}</>;
};

// === COMPONENTE DE ERRO ===
const ErrorFallback: React.FC<{
  error: Error;
  resetErrorBoundary: () => void;
  errorMessage?: string;
  showRetry?: boolean;
}> = ({ 
  error, 
  resetErrorBoundary, 
  errorMessage,
  showRetry = true 
}) => {
  const isNetworkError = useMemo(() => {
    return error.message.includes('Loading chunk') || 
           error.message.includes('Network') ||
           error.message.includes('fetch');
  }, [error.message]);

  const displayMessage = useMemo(() => {
    if (errorMessage) return errorMessage;
    
    if (isNetworkError) {
      return 'Erro de conexão. Verifique sua internet e tente novamente.';
    }
    
    return 'Ocorreu um erro ao carregar este conteúdo.';
  }, [errorMessage, isNetworkError]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 min-h-[200px]">
      <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-destructive"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isNetworkError ? (
            // WifiOff icon
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3l18 18M8.5 8.5l-1.5-1.5M12 12l-8-8M16.5 16.5L21 21M9 9l3 3m3-3l-3 3"
            />
          ) : (
            // AlertCircle icon
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          )}
        </svg>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-destructive">
          Ops! Algo deu errado
        </h4>
        
        <p className="text-sm text-muted-foreground max-w-md">
          {displayMessage}
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              Detalhes do erro (desenvolvimento)
            </summary>
            <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto max-w-md">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
      
      {showRetry && (
        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center gap-2 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
        >
          <svg
            className="w-4 h-4"
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
        </button>
      )}
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

  const handleError = useCallback((error: Error) => {
    if (autoRetry && retryCount < maxRetries) {
      const delay = Math.min(1000 * Math.pow(2, retryCount), 10000); // Exponential backoff
      
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        onRetry();
      }, delay);
      
      console.warn(`Auto retry ${retryCount + 1}/${maxRetries} in ${delay}ms:`, error);
    }
  }, [autoRetry, maxRetries, retryCount, onRetry]);

  const resetRetryCount = useCallback(() => {
    setRetryCount(0);
  }, []);

  return { handleError, resetRetryCount, retryCount };
};

// === COMPONENTE PRINCIPAL ===
export const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  className,
  fallback,
  minHeight = '200px',
  skeleton = false,
  skeletonLines = 3,
  delay = 200,
  timeout = 10000,
  onError,
  autoRetry = false,
  maxRetries = 3,
  errorMessage,
  showRetry = true,
  testId,
}) => {
  const [key, setKey] = React.useState(0);

  // Auto retry logic
  const { handleError, resetRetryCount } = useAutoRetry(
    autoRetry,
    maxRetries,
    () => setKey(prev => prev + 1)
  );

  // Loading fallback
  const loadingFallback = useMemo(() => {
    if (fallback) return fallback;
    
    if (skeleton) {
      return (
        <SkeletonLoader
          lines={skeletonLines}
          minHeight={minHeight}
          className={className}
        />
      );
    }
    
    const containerStyle = {
      minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
    };
    
    return (
      <div 
        className={cn('flex items-center justify-center', className)}
        style={containerStyle}
      >
        <LoadingSpinner
          showText
          text="Carregando..."
          textPosition="bottom"
        />
      </div>
    );
  }, [fallback, skeleton, skeletonLines, minHeight, className]);

  // Error handler
  const handleErrorBoundary = useCallback((error: Error, errorInfo: React.ErrorInfo) => {
    console.error('LazyLoad Error:', error, errorInfo);
    
    // Chamar handler customizado
    onError?.(error, errorInfo);
    
    // Auto retry se habilitado
    handleError(error);
  }, [onError, handleError]);

  // Reset handler
  const handleReset = useCallback(() => {
    resetRetryCount();
    setKey(prev => prev + 1);
  }, [resetRetryCount]);

  // Timeout para componentes que demoram muito
  React.useEffect(() => {
    if (timeout <= 0) return;

    const timer = setTimeout(() => {
      console.warn(`LazyLoad timeout after ${timeout}ms`);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout, key]);

  return (
    <div data-testid={testId} className={cn('relative', className)}>
      <ErrorBoundary
        key={key}
        onError={handleErrorBoundary}
        fallbackRender={({ error, resetErrorBoundary }) => (
          <ErrorFallback
            error={error}
            resetErrorBoundary={() => {
              resetErrorBoundary();
              handleReset();
            }}
            errorMessage={errorMessage}
            showRetry={showRetry}
          />
        )}
      >
        <Suspense
          fallback={
            delay > 0 ? (
              <DelayedLoader delay={delay} fallback={loadingFallback} />
            ) : (
              loadingFallback
            )
          }
        >
          {children}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

LazyLoad.displayName = 'LazyLoad';

// === COMPONENTES DE CONVENIÊNCIA ===
export const LazySection: React.FC<Omit<LazyLoadProps, 'skeleton'>> = (props) => (
  <LazyLoad skeleton minHeight="400px" skeletonLines={5} {...props} />
);

export const LazyCard: React.FC<Omit<LazyLoadProps, 'skeleton' | 'minHeight'>> = (props) => (
  <LazyLoad skeleton minHeight="200px" skeletonLines={3} {...props} />
);

export const LazyModal: React.FC<Omit<LazyLoadProps, 'delay'>> = (props) => (
  <LazyLoad delay={0} {...props} />
);

// === EXPORTS ===
export type { LazyLoadProps };