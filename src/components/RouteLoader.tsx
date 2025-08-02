import React from 'react';
import { cn } from '@/lib/utils';

interface RouteLoaderProps {
  className?: string;
  message?: string;
  showProgress?: boolean;
}

export const RouteLoader: React.FC<RouteLoaderProps> = ({
  className,
  message = 'Carregando...',
  showProgress = true
}) => {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center min-h-screen bg-background',
      className
    )}>
      {/* Logo ou ícone */}
      <div className="mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
      
      {/* Mensagem */}
      <p className="text-lg font-medium text-foreground mb-4">{message}</p>
      
      {/* Barra de progresso */}
      {showProgress && (
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full animate-pulse" />
        </div>
      )}
      
      {/* Skeleton do conteúdo */}
      <div className="mt-16 w-full max-w-4xl px-6">
        <div className="space-y-6">
          {/* Header skeleton */}
          <div className="h-12 bg-muted rounded-lg animate-pulse" />
          
          {/* Content skeleton */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
              <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
            </div>
            <div className="h-48 bg-muted rounded-lg animate-pulse" />
          </div>
          
          {/* Cards skeleton */}
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Loader específico para páginas de serviço
export const ServicePageLoader: React.FC = () => (
  <RouteLoader 
    message="Carregando página de serviço..."
    className="bg-gradient-to-br from-background to-muted/20"
  />
);

// Loader específico para blog
export const BlogLoader: React.FC = () => (
  <RouteLoader 
    message="Carregando artigos..."
    className="bg-gradient-to-br from-background to-muted/20"
  />
);

// Loader específico para portfolio
export const PortfolioLoader: React.FC = () => (
  <RouteLoader 
    message="Carregando projetos..."
    className="bg-gradient-to-br from-background to-muted/20"
  />
);

// Loader mínimo para componentes pequenos
export const ComponentLoader: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className={cn(
        'border-2 border-primary border-t-transparent rounded-full animate-spin',
        sizeClasses[size]
      )} />
    </div>
  );
};

// Error boundary para rotas lazy
interface RouteErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class RouteErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  RouteErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): RouteErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Erro no carregamento da rota:', error, errorInfo);
    
    // Envia erro para serviço de monitoramento se configurado
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background px-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ops! Algo deu errado
            </h2>
            
            <p className="text-muted-foreground mb-6">
              Não foi possível carregar esta página. Tente recarregar ou volte para a página inicial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Recarregar Página
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
              >
                Voltar ao Início
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Detalhes do erro (desenvolvimento)
                </summary>
                <pre className="mt-2 p-4 bg-muted rounded text-xs overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook para monitorar performance de carregamento
export const useRouteLoadingPerformance = (routeName: string) => {
  React.useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      console.log(`Rota ${routeName} carregada em ${loadTime.toFixed(2)}ms`);
      
      // Envia métricas para analytics se configurado
      if (window.gtag) {
        window.gtag('event', 'page_load_time', {
          custom_parameter_1: routeName,
          custom_parameter_2: Math.round(loadTime)
        });
      }
    };
  }, [routeName]);
};