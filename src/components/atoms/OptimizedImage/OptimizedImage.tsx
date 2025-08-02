/**
 * OptimizedImage - Componente atom para imagens otimizadas
 * Sistema completo de otimização de imagens com lazy loading, srcset e placeholder
 */

import React, { 
  forwardRef, 
  useState, 
  useCallback, 
  useMemo, 
  useRef,
  useEffect
} from 'react';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';
import { Icon } from '@/components/atoms/Icon';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useMemoizedValue } from '@/hooks/useMemoizedValue';
import type { BaseComponentProps, ImageData } from '@/types/base';

// === INTERFACES ===
export interface OptimizedImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'loading'>,
    BaseComponentProps {
  /** URL da imagem */
  readonly src: string;
  /** Texto alternativo */
  readonly alt: string;
  /** Largura da imagem */
  readonly width?: number;
  /** Altura da imagem */
  readonly height?: number;
  /** Se deve carregar com prioridade (sem lazy loading) */
  readonly priority?: boolean;
  /** Tipo de placeholder */
  readonly placeholder?: 'blur' | 'empty' | 'skeleton' | 'custom';
  /** URL do placeholder blur */
  readonly blurDataURL?: string;
  /** Componente de placeholder customizado */
  readonly customPlaceholder?: React.ReactNode;
  /** Qualidade da imagem (1-100) */
  readonly quality?: number;
  /** Formatos suportados */
  readonly formats?: readonly ('webp' | 'avif' | 'jpg' | 'png')[];
  /** Breakpoints para responsive images */
  readonly breakpoints?: readonly number[];
  /** Sizes attribute para responsive images */
  readonly sizes?: string;
  /** Se deve usar lazy loading */
  readonly lazy?: boolean;
  /** Margem para intersection observer */
  readonly rootMargin?: string;
  /** Threshold para intersection observer */
  readonly threshold?: number;
  /** Callback quando a imagem carrega */
  readonly onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Callback quando há erro */
  readonly onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Se deve mostrar indicador de loading */
  readonly showLoading?: boolean;
  /** Animação de entrada */
  readonly animation?: 'fade' | 'scale' | 'slide' | 'none';
  /** Duração da animação (ms) */
  readonly animationDuration?: number;
}

// === TIPOS ===
type ImageState = 'loading' | 'loaded' | 'error';

// === UTILITIES ===
const generateSrcSet = (
  src: string,
  breakpoints: readonly number[],
  quality: number = 80
): string => {
  return breakpoints
    .map(width => `${generateOptimizedUrl(src, width, quality)} ${width}w`)
    .join(', ');
};

const generateOptimizedUrl = (
  src: string,
  width?: number,
  quality: number = 80,
  format?: string
): string => {
  // Se for uma URL externa ou já otimizada, retornar como está
  if (src.startsWith('http') || src.includes('?')) {
    return src;
  }
  
  // Para URLs locais, adicionar parâmetros de otimização
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (quality !== 80) params.set('q', quality.toString());
  if (format) params.set('f', format);
  
  const queryString = params.toString();
  return queryString ? `${src}?${queryString}` : src;
};

const generateBlurDataURL = (width: number = 10, height: number = 10): string => {
  // Gerar um data URL de placeholder blur simples
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Gradiente simples
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

// === HOOK PARA INTERSECTION OBSERVER ===
const useIntersectionObserver = (
  enabled: boolean,
  options: {
    rootMargin?: string;
    threshold?: number;
  } = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(!enabled);
  const [hasIntersected, setHasIntersected] = useState(!enabled);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enabled || hasIntersected) return;

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: options.rootMargin || '50px',
        threshold: options.threshold || 0.1,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [enabled, hasIntersected, options.rootMargin, options.threshold]);

  return { elementRef, isIntersecting, hasIntersected };
};

// === COMPONENTE DE PLACEHOLDER ===
const ImagePlaceholder: React.FC<{
  type: OptimizedImageProps['placeholder'];
  width?: number;
  height?: number;
  blurDataURL?: string;
  customPlaceholder?: React.ReactNode;
  className?: string;
  showLoading?: boolean;
}> = ({ 
  type, 
  width, 
  height, 
  blurDataURL, 
  customPlaceholder, 
  className,
  showLoading = true
}) => {
  const placeholderStyle = useMemo(() => ({
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : 'auto',
    aspectRatio: width && height ? `${width} / ${height}` : undefined,
  }), [width, height]);

  switch (type) {
    case 'blur':
      return (
        <div
          className={cn(
            'bg-muted animate-pulse flex items-center justify-center',
            'bg-cover bg-center bg-no-repeat',
            className
          )}
          style={{
            ...placeholderStyle,
            backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined,
            filter: 'blur(10px)',
          }}
        >
          {showLoading && <LoadingSpinner size="sm" />}
        </div>
      );

    case 'skeleton':
      return (
        <div
          className={cn(
            'bg-muted animate-pulse flex items-center justify-center',
            className
          )}
          style={placeholderStyle}
        >
          <Icon name="Image" size="lg" color="muted" />
        </div>
      );

    case 'custom':
      return (
        <div
          className={cn('flex items-center justify-center', className)}
          style={placeholderStyle}
        >
          {customPlaceholder}
        </div>
      );

    case 'empty':
    default:
      return (
        <div
          className={cn('bg-transparent', className)}
          style={placeholderStyle}
        />
      );
  }
};

// === COMPONENTE DE ERRO ===
const ImageError: React.FC<{
  width?: number;
  height?: number;
  className?: string;
  onRetry?: () => void;
}> = ({ width, height, className, onRetry }) => {
  const errorStyle = useMemo(() => ({
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : 'auto',
    aspectRatio: width && height ? `${width} / ${height}` : undefined,
  }), [width, height]);

  return (
    <div
      className={cn(
        'bg-muted border-2 border-dashed border-muted-foreground/20',
        'flex flex-col items-center justify-center gap-2 p-4',
        className
      )}
      style={errorStyle}
    >
      <Icon name="ImageOff" size="lg" color="muted" />
      <span className="text-xs text-muted-foreground text-center">
        Erro ao carregar imagem
      </span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs text-primary hover:text-primary-glow transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
};

// === COMPONENTE PRINCIPAL ===
export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  (
    {
      className,
      src,
      alt,
      width,
      height,
      priority = false,
      placeholder = 'blur',
      blurDataURL,
      customPlaceholder,
      quality = 80,
      formats = ['webp', 'jpg'],
      breakpoints = [640, 768, 1024, 1280, 1536],
      sizes,
      lazy = true,
      rootMargin = '50px',
      threshold = 0.1,
      onLoad,
      onError,
      showLoading = true,
      animation = 'fade',
      animationDuration = 300,
      testId,
      ...props
    },
    ref
  ) => {
    // Estados
    const [imageState, setImageState] = useState<ImageState>('loading');
    const [retryCount, setRetryCount] = useState(0);

    // Intersection Observer para lazy loading
    const shouldLazyLoad = lazy && !priority;
    const { elementRef, isIntersecting } = useIntersectionObserver(
      shouldLazyLoad,
      { rootMargin, threshold }
    );

    // Determinar se deve carregar a imagem
    const shouldLoadImage = priority || isIntersecting;

    // URLs otimizadas
    const optimizedSrc = useMemoizedValue(
      () => generateOptimizedUrl(src, width, quality),
      [src, width, quality]
    );

    const srcSet = useMemoizedValue(
      () => breakpoints.length > 0 ? generateSrcSet(src, breakpoints, quality) : undefined,
      [src, breakpoints, quality]
    );

    const defaultBlurDataURL = useMemoizedValue(
      () => blurDataURL || (placeholder === 'blur' ? generateBlurDataURL(width, height) : undefined),
      [blurDataURL, placeholder, width, height]
    );

    // Handlers
    const handleLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
      setImageState('loaded');
      onLoad?.(event);
    }, [onLoad]);

    const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
      setImageState('error');
      onError?.(event);
    }, [onError]);

    const handleRetry = useCallback(() => {
      setImageState('loading');
      setRetryCount(prev => prev + 1);
    }, []);

    // Classes de animação
    const animationClasses = useMemo(() => {
      if (animation === 'none' || imageState !== 'loaded') return '';
      
      const animations = {
        fade: 'animate-fade-in',
        scale: 'animate-scale-in',
        slide: 'animate-slide-up',
      };
      
      return animations[animation] || '';
    }, [animation, imageState]);

    // Estilos do container
    const containerStyle = useMemo(() => ({
      width: width ? `${width}px` : '100%',
      height: height ? `${height}px` : 'auto',
      aspectRatio: width && height ? `${width} / ${height}` : undefined,
    }), [width, height]);

    // Estilos da imagem
    const imageStyle = useMemo(() => ({
      animationDuration: `${animationDuration}ms`,
    }), [animationDuration]);

    return (
      <div
        ref={elementRef as any}
        className={cn('relative overflow-hidden', className)}
        style={containerStyle}
        data-testid={testId}
      >
        {/* Placeholder */}
        {(!shouldLoadImage || imageState === 'loading') && (
          <ImagePlaceholder
            type={placeholder}
            width={width}
            height={height}
            blurDataURL={defaultBlurDataURL}
            customPlaceholder={customPlaceholder}
            className="absolute inset-0"
            showLoading={showLoading && shouldLoadImage}
          />
        )}

        {/* Imagem principal */}
        {shouldLoadImage && imageState !== 'error' && (
          <img
            ref={ref}
            src={optimizedSrc}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-300',
              imageState === 'loaded' ? 'opacity-100' : 'opacity-0',
              animationClasses
            )}
            style={imageStyle}
            key={retryCount} // Force re-render on retry
            {...props}
          />
        )}

        {/* Estado de erro */}
        {imageState === 'error' && (
          <ImageError
            width={width}
            height={height}
            className="absolute inset-0"
            onRetry={handleRetry}
          />
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

// === COMPONENTES DE CONVENIÊNCIA ===
export const Avatar: React.FC<Omit<OptimizedImageProps, 'width' | 'height'> & {
  size?: number;
}> = ({ size = 40, className, ...props }) => (
  <OptimizedImage
    width={size}
    height={size}
    className={cn('rounded-full', className)}
    {...props}
  />
);

export const HeroImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage
    priority
    placeholder="blur"
    animation="fade"
    {...props}
  />
);

export const ContentImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage
    lazy
    placeholder="blur"
    animation="scale"
    {...props}
  />
);

export const ThumbnailImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage
    lazy
    placeholder="skeleton"
    animation="fade"
    quality={60}
    {...props}
  />
);

// === HOOK PARA PRELOAD DE IMAGENS ===
export const useImagePreload = (
  src: string | string[],
  priority: boolean = false
): {
  loaded: boolean;
  error: boolean;
  preload: () => void;
} => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const preload = useCallback(() => {
    const sources = Array.isArray(src) ? src : [src];
    
    Promise.all(
      sources.map(source => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = source;
        });
      })
    )
    .then(() => setLoaded(true))
    .catch(() => setError(true));
  }, [src]);

  useEffect(() => {
    if (priority) {
      preload();
    }
  }, [priority, preload]);

  return { loaded, error, preload };
};

// === EXPORTS ===
export type { OptimizedImageProps };