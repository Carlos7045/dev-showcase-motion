/**
 * ErrorBoundary - Componente atom para captura de erros
 * Implementação própria de Error Boundary sem dependências externas
 */

import React, { Component, ReactNode } from 'react';
import { cn } from '@/lib/utils';

// === INTERFACES ===
export interface ErrorInfo {
  componentStack: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export interface ErrorBoundaryProps {
  /** Componente filho */
  children: ReactNode;
  /** Componente de fallback para renderizar quando há erro */
  fallback?: ReactNode;
  /** Função para renderizar fallback com acesso ao erro */
  fallbackRender?: (props: {
    error: Error;
    resetErrorBoundary: () => void;
  }) => ReactNode;
  /** Callback chamado quando um erro é capturado */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Callback chamado quando o error boundary é resetado */
  onReset?: () => void;
  /** Condições para resetar automaticamente o error boundary */
  resetKeys?: Array<string | number | boolean | null | undefined>;
  /** Se deve resetar automaticamente quando as props mudam */
  resetOnPropsChange?: boolean;
  /** Classes CSS adicionais */
  className?: string;
  /** ID para testes */
  testId?: string;
}

// === COMPONENTE PRINCIPAL ===
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;
  private prevResetKeys: Array<string | number | boolean | null | undefined> = [];

  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };

    this.prevResetKeys = props.resetKeys || [];
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const customErrorInfo: ErrorInfo = {
      componentStack: errorInfo.componentStack,
    };

    this.setState({
      error,
      errorInfo: customErrorInfo,
    });

    // Chamar callback de erro se fornecido
    this.props.onError?.(error, customErrorInfo);

    // Log do erro em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Caught Error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Component Stack:', errorInfo.componentStack);
      console.groupEnd();
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    // Se havia erro e agora não há mais, resetar
    if (hasError && prevProps.children !== this.props.children) {
      if (resetOnPropsChange) {
        this.resetErrorBoundary();
      }
    }

    // Verificar se resetKeys mudaram
    if (hasError && resetKeys) {
      const hasResetKeyChanged = resetKeys.some(
        (key, index) => key !== this.prevResetKeys[index]
      );

      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }

    this.prevResetKeys = resetKeys || [];
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  resetErrorBoundary = () => {
    const { onReset } = this.props;

    // Limpar timeout anterior se existir
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    // Resetar estado
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    // Chamar callback de reset
    onReset?.();
  };

  render() {
    const { hasError, error } = this.state;
    const { 
      children, 
      fallback, 
      fallbackRender, 
      className,
      testId 
    } = this.props;

    if (hasError && error) {
      // Se há um fallbackRender, usar ele
      if (fallbackRender) {
        return (
          <div 
            className={cn('error-boundary', className)}
            data-testid={testId}
          >
            {fallbackRender({
              error,
              resetErrorBoundary: this.resetErrorBoundary,
            })}
          </div>
        );
      }

      // Se há um fallback, usar ele
      if (fallback) {
        return (
          <div 
            className={cn('error-boundary', className)}
            data-testid={testId}
          >
            {fallback}
          </div>
        );
      }

      // Fallback padrão
      return (
        <div 
          className={cn(
            'error-boundary flex flex-col items-center justify-center p-8 text-center space-y-4 min-h-[200px] bg-destructive/5 border border-destructive/20 rounded-lg',
            className
          )}
          data-testid={testId}
        >
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-destructive">
              Ops! Algo deu errado
            </h3>
            
            <p className="text-sm text-muted-foreground max-w-md">
              Ocorreu um erro inesperado. Tente recarregar a página ou entre em contato se o problema persistir.
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Detalhes do erro (desenvolvimento)
                </summary>
                <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto max-w-md text-left">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
          
          <button
            onClick={this.resetErrorBoundary}
            className="inline-flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
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
        </div>
      );
    }

    return children;
  }
}

// === HOOK PARA USO FUNCIONAL ===
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  // Throw error para ser capturado pelo Error Boundary
  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
};

// === COMPONENTE FUNCIONAL WRAPPER ===
export const ErrorBoundaryWrapper: React.FC<ErrorBoundaryProps> = (props) => {
  return <ErrorBoundary {...props} />;
};

// === HOC PARA COMPONENTES ===
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

// === EXPORTS ===
export type { ErrorBoundaryProps, ErrorBoundaryState, ErrorInfo };
export default ErrorBoundary;