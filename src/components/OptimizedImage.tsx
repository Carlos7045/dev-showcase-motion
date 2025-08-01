import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  formats?: ('webp' | 'avif' | 'jpg' | 'png')[];
  lazy?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  sizes = '100vw',
  formats = ['webp', 'avif', 'jpg'],
  lazy = true,
  onLoad,
  onError,
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority || !lazy);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || !lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => observer.disconnect();
  }, [priority, lazy]);

  // Gera URLs otimizadas para diferentes formatos
  const generateOptimizedSrc = (format: string, w?: number) => {
    const params = new URLSearchParams();
    if (w) params.set('w', w.toString());
    params.set('q', quality.toString());
    params.set('f', format);
    
    // Se for uma URL externa, retorna como está
    if (src.startsWith('http')) {
      return src;
    }
    
    // Para imagens locais, gera URL otimizada
    const basePath = src.replace(/\.[^/.]+$/, '');
    const extension = format === 'jpg' ? 'jpg' : format;
    return `${basePath}.${extension}?${params.toString()}`;
  };

  // Gera srcSet para diferentes tamanhos
  const generateSrcSet = (format: string) => {
    if (!width) return '';
    
    const breakpoints = [640, 768, 1024, 1280, 1536];
    const srcSetEntries = breakpoints
      .filter(bp => bp <= width * 2) // Só inclui breakpoints até 2x o tamanho original
      .map(bp => `${generateOptimizedSrc(format, bp)} ${bp}w`);
    
    // Adiciona o tamanho original
    srcSetEntries.push(`${generateOptimizedSrc(format, width)} ${width}w`);
    
    return srcSetEntries.join(', ');
  };

  // Gera placeholder blur
  const generateBlurPlaceholder = () => {
    if (blurDataURL) return blurDataURL;
    
    // Gera um placeholder SVG simples
    const svg = `
      <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Se não está em view e não é priority, mostra placeholder
  if (!isInView) {
    return (
      <div
        ref={placeholderRef}
        className={cn(
          'bg-gray-200 dark:bg-gray-800 animate-pulse',
          className
        )}
        style={{ width, height }}
        {...props}
      />
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Placeholder blur */}
      {placeholder === 'blur' && !isLoaded && (
        <img
          src={generateBlurPlaceholder()}
          alt=""
          className={cn(
            'absolute inset-0 w-full h-full object-cover filter blur-sm scale-110 transition-opacity duration-300',
            isLoaded ? 'opacity-0' : 'opacity-100',
            className
          )}
          aria-hidden="true"
        />
      )}

      {/* Imagem principal com suporte a múltiplos formatos */}
      <picture>
        {/* AVIF */}
        {formats.includes('avif') && (
          <source
            srcSet={generateSrcSet('avif')}
            sizes={sizes}
            type="image/avif"
          />
        )}
        
        {/* WebP */}
        {formats.includes('webp') && (
          <source
            srcSet={generateSrcSet('webp')}
            sizes={sizes}
            type="image/webp"
          />
        )}
        
        {/* Fallback */}
        <img
          ref={imgRef}
          src={hasError ? '/images/placeholder-error.jpg' : generateOptimizedSrc('jpg')}
          srcSet={generateSrcSet('jpg')}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          {...props}
        />
      </picture>

      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 opacity-50">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm">Erro ao carregar imagem</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Hook para preload de imagens críticas
export const useImagePreload = (src: string, priority: boolean = false) => {
  useEffect(() => {
    if (!priority) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [src, priority]);
};

// Componente para hero images com prioridade
export const HeroImage: React.FC<OptimizedImageProps> = (props) => {
  return (
    <OptimizedImage
      {...props}
      priority={true}
      lazy={false}
      formats={['avif', 'webp', 'jpg']}
      quality={85}
    />
  );
};

// Componente para imagens de conteúdo
export const ContentImage: React.FC<OptimizedImageProps> = (props) => {
  return (
    <OptimizedImage
      {...props}
      priority={false}
      lazy={true}
      formats={['webp', 'jpg']}
      quality={75}
    />
  );
};

// Componente para avatares e imagens pequenas
export const AvatarImage: React.FC<OptimizedImageProps> = (props) => {
  return (
    <OptimizedImage
      {...props}
      priority={false}
      lazy={true}
      formats={['webp', 'jpg']}
      quality={80}
      placeholder="empty"
    />
  );
};