/**
 * RouteLoader - Componente molecule para loading de rotas
 * Gerenciador de loading states para navegação
 */

import React, { useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';
import { Typography, H2, P } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { LazyLoad } from '@/components/molecules/LazyLoad';
import type { BaseComponentProps } from '@/types/base';

// === INTERFACES ===
export interface RouteLoaderProps extends BaseComponentProps {
  /** Estado de loading */
  readonly loading?: boolean;
  /** Estado de erro */
  readonly error?: Error | null;
  /** Função para retry */
  readonly onRetry?: () => void;
  /** Título da página */
  readonly title?: string;
  /** Descrição da página */
  readonly description?: string;
  /** Se deve mostrar progresso de loading */
  readonly showProgress?: boolean;
  /** Progresso atual (0-100) */
  readonly progress?: number;
  /** Tipo de loading */
  readonly loadingType?: 'spinner' | 'skeleton' | 'progress' | 'custom';
  /** Componente de loading customizado */
  readonly customLoader?: React.ReactNode;
  /** Se deve ocupar toda a tela */
  readonly fullScreen?: boolean;
  /** Altura mínima */
  readonly minHeight?: string | number;
}

// === COMPONENTE DE PROGRESS BAR ===
const ProgressBar: React.FC<{
  progress: number;
  className?: string;
}> = ({ progress, className }) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  
  return (
    <div className={cn('w-full bg-muted rounded-full h-2', className)}>
      <div
        className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${clampedProgress}%` }}
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Carregando: ${clampedProgress}%`}
      />
    </div>
  );
};

// === COMPONENTE DE SKELETON DE PÁGINA ===
const PageSkeleton: React.FC<{
  title?: string;
  description?: string;
}> = ({ title, description }) => (
  <div className="animate-pulse space-y-8 p-6 max-w-4xl mx-auto">
    {/* Header skeleton */}
    <div className="space-y-4">
      <div className="h-12 bg-muted rounded w-3/4 mx-auto" />
      {description && <div className="h-6 bg-muted rounded w-1/2 mx-auto" />}
    </div>
    
    {/* Content skeleton */}
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="h-6 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-4 bg-muted rounded w-4/6" />
        <div className="h-32 bg-muted rounded w-full" />
      </div>
      <div className="space-y-4">
        <div className="h-6 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-4 bg-muted rounded w-4/6" />
        <div className="h-32 bg-muted rounded w-full" />
      </div>
    </div>
    
    {/* Footer skeleton */}
    <div className="flex justify-center gap-4">
      <div className="h-10 bg-muted rounded w-24" />
      <div className="h-10 bg-muted rounded w-32" />
    </div>
  </div>
);

// === COMPONENTE DE LOADING COMPLETO ===
const FullPageLoader: React.FC<{
  title?: string;
  description?: string;
  progress?: number;
  showProgress?: boolean;
  loadingType?: RouteLoaderProps['loadingType'];
  customLoader?: React.ReactNode;
}> = ({ 
  title = 'Carregando...',
  description,
  progress = 0,
  showProgress = false,
  loadingType = 'spinner',
  customLoader
}) => {
  const renderLoader = useMemo(() => {
    if (customLoader) return customLoader;
    
    switch (loadingType) {
      case 'skeleton':
        return <PageSkeleton title={title} description={description} />;
      
      case 'progress':
        return (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="text-center space-y-4">
              <LoadingSpinner size="lg" />
              <div className="space-y-2">
                <H2>{title}</H2>
                {description && <P color="muted">{description}</P>}
              </div>
            </div>
            <ProgressBar progress={progress} />
            <P variant="small" color="muted" align="center">
              {progress}% concluído
            </P>
          </div>
        );
      
      case 'custom':
        return customLoader;
      
      default:
        return (
          <div className="text-center space-y-4">
            <LoadingSpinner size="xl" />
            <div className="space-y-2">
              <H2>{title}</H2>
              {description && <P color="muted">{description}</P>}
            </div>
            {showProgress && <ProgressBar progress={progress} />}
          </div>
        );
    }
  }, [customLoader, loadingType, title, description, progress, showProgress]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {renderLoader}
    </div>
  );
};

// === COMPONENTE DE ERRO DE ROTA ===
const RouteError: React.FC<{
  error: Error;
  onRetry?: () => void;
  title?: string;
}> = ({ error, onRetry, title }) => {
  const isChunkError = useMemo(() => {
    return error.message.includes('Loading chunk') || 
           error.message.includes('ChunkLoadError');
  }, [error.message]);

  const isNetworkError = useMemo(() => {
    return error.message.includes('Network') ||
           error.message.includes('fetch') ||
           error.name === 'NetworkError';
  }, [error.message, error.name]);

  const errorInfo = useMemo(() => {
    if (isChunkError) {
      return {
        title: 'Erro de Carregamento',
        description: 'Houve um problema ao carregar esta página. Isso pode acontecer após atualizações do site.',
        icon: 'RefreshCw' as const,
        suggestion: 'Tente recarregar a página ou limpar o cache do navegador.'
      };
    }
    
    if (isNetworkError) {
      return {
        title: 'Erro de Conexão',
        description: 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.',
        icon: 'WifiOff' as const,
        suggestion: 'Verifique sua conexão e tente novamente.'
      };
    }
    
    return {
      title: 'Erro Inesperado',
      description: 'Ocorreu um erro inesperado ao carregar esta página.',
      icon: 'AlertCircle' as const,
      suggestion: 'Tente recarregar a página ou entre em contato conosco se o problema persistir.'
    };
  }, [isChunkError, isNetworkError]);

  const handleReload = useCallback(() => {
    if (isChunkError) {
      // Para chunk errors, recarregar a página completamente
      window.location.reload();
    } else if (onRetry) {
      onRetry();
    }
  }, [isChunkError, onRetry]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto">
          <Icon name={errorInfo.icon} size="xl" color="error" />
        </div>
        
        <div className="space-y-3">
          <H2 color="error">{errorInfo.title}</H2>
          <P color="muted">{errorInfo.description}</P>
          <P variant="small" color="muted">{errorInfo.suggestion}</P>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            onClick={handleReload}
            leftIcon={<Icon name="RotateCcw" />}
          >
            {isChunkError ? 'Recarregar Página' : 'Tentar Novamente'}
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => window.location.href = '/'}
            leftIcon={<Icon name="Home" />}
          >
            Ir para Início
          </Button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="text-left mt-6">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              Detalhes do erro (desenvolvimento)
            </summary>
            <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

// === COMPONENTE PRINCIPAL ===
export const RouteLoader: React.FC<RouteLoaderProps> = ({
  children,
  className,
  loading = false,
  error = null,
  onRetry,
  title,
  description,
  showProgress = false,
  progress = 0,
  loadingType = 'spinner',
  customLoader,
  fullScreen = false,
  minHeight = '400px',
  testId,
}) => {
  // Renderizar erro se existir
  if (error) {
    return (
      <RouteError
        error={error}
        onRetry={onRetry}
        title={title}
      />
    );
  }

  // Renderizar loading se necessário
  if (loading) {
    if (fullScreen) {
      return (
        <FullPageLoader
          title={title}
          description={description}
          progress={progress}
          showProgress={showProgress}
          loadingType={loadingType}
          customLoader={customLoader}
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
        data-testid={testId}
      >
        {customLoader || (
          <div className="text-center space-y-4">
            <LoadingSpinner size="lg" />
            {title && <Typography variant="large">{title}</Typography>}
            {description && <P color="muted">{description}</P>}
            {showProgress && <ProgressBar progress={progress} />}
          </div>
        )}
      </div>
    );
  }

  // Renderizar conteúdo normal
  return (
    <div className={className} data-testid={testId}>
      {children}
    </div>
  );
};

RouteLoader.displayName = 'RouteLoader';

// === COMPONENTES DE CONVENIÊNCIA ===
export const PageLoader: React.FC<Omit<RouteLoaderProps, 'fullScreen'>> = (props) => (
  <RouteLoader fullScreen {...props} />
);

export const SectionLoader: React.FC<Omit<RouteLoaderProps, 'loadingType'>> = (props) => (
  <RouteLoader loadingType="skeleton" {...props} />
);

export const ProgressLoader: React.FC<Omit<RouteLoaderProps, 'loadingType' | 'showProgress'>> = (props) => (
  <RouteLoader loadingType="progress" showProgress {...props} />
);

// === EXPORTS ===
export type { RouteLoaderProps };