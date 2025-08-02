/**
 * AppErrorBoundary - Error Boundary para toda a aplicação
 * Captura erros globais e fornece fallback para toda a app
 */

import React from 'react';
import { ErrorBoundary, ErrorBoundaryProps } from './ErrorBoundary';
import { Button } from '@/components/atoms/Button';
import { CONTACT_INFO } from '@/config';

// === INTERFACES ===
interface AppErrorBoundaryProps extends Omit<ErrorBoundaryProps, 'fallbackRender'> {
  /** Se deve mostrar informações de contato */
  showContact?: boolean;
  /** Se deve mostrar botão de reload da página */
  showReload?: boolean;
}

// === COMPONENTE DE FALLBACK ===
const AppErrorFallback: React.FC<{
  error: Error;
  resetErrorBoundary: () => void;
  showContact?: boolean;
  showReload?: boolean;
}> = ({ 
  error, 
  resetErrorBoundary, 
  showContact = true, 
  showReload = true 
}) => {
  const handleReload = () => {
    window.location.reload();
  };

  const handleContact = () => {
    const subject = 'Erro na Aplicação';
    const body = `Olá! Encontrei um erro na aplicação:\n\nErro: ${error.message}\n\nPor favor, me ajudem a resolver este problema.`;
    const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Ícone de erro */}
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-10 h-10 text-destructive"
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

        {/* Título e descrição */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-foreground">
            Oops! Algo deu errado
          </h1>
          
          <p className="text-muted-foreground leading-relaxed">
            Encontramos um erro inesperado na aplicação. Não se preocupe, 
            nossa equipe foi notificada e está trabalhando para resolver o problema.
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
              Tentar Novamente
            </Button>

            {showReload && (
              <Button
                onClick={handleReload}
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Recarregar Página
              </Button>
            )}
          </div>

          {showContact && (
            <Button
              onClick={handleContact}
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
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Reportar Problema
            </Button>
          )}
        </div>

        {/* Informações de debug em desenvolvimento */}
        {process.env.NODE_ENV === 'development' && (
          <details className="text-left bg-muted/50 rounded-lg p-4">
            <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
              Informações de Debug
            </summary>
            <div className="mt-3 space-y-2">
              <div>
                <strong className="text-xs text-muted-foreground">Erro:</strong>
                <pre className="text-xs bg-background rounded p-2 mt-1 overflow-auto">
                  {error.message}
                </pre>
              </div>
              <div>
                <strong className="text-xs text-muted-foreground">Stack Trace:</strong>
                <pre className="text-xs bg-background rounded p-2 mt-1 overflow-auto max-h-32">
                  {error.stack}
                </pre>
              </div>
            </div>
          </details>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Se o problema persistir, entre em contato conosco.
          </p>
        </div>
      </div>
    </div>
  );
};

// === COMPONENTE PRINCIPAL ===
export const AppErrorBoundary: React.FC<AppErrorBoundaryProps> = ({
  children,
  showContact = true,
  showReload = true,
  onError,
  ...props
}) => {
  const handleError = (error: Error, errorInfo: any) => {
    // Log estruturado do erro
    console.group('🚨 App Error Boundary');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Timestamp:', new Date().toISOString());
    console.error('User Agent:', navigator.userAgent);
    console.error('URL:', window.location.href);
    console.groupEnd();

    // Chamar handler customizado
    onError?.(error, errorInfo);

    // Em produção, enviar erro para serviço de monitoramento
    if (process.env.NODE_ENV === 'production') {
      // Aqui você pode integrar com Sentry, LogRocket, etc.
      // sendErrorToMonitoring(error, errorInfo);
    }
  };

  return (
    <ErrorBoundary
      {...props}
      onError={handleError}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <AppErrorFallback
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          showContact={showContact}
          showReload={showReload}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

AppErrorBoundary.displayName = 'AppErrorBoundary';

export default AppErrorBoundary;