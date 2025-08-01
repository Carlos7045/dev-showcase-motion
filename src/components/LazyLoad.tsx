import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LazyLoadProps {
  children: ReactNode;
  height?: number | string;
  offset?: number;
  placeholder?: ReactNode;
  className?: string;
  once?: boolean;
  onLoad?: () => void;
  threshold?: number;
  rootMargin?: string;
}

export const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  height = 'auto',
  offset = 100,
  placeholder,
  className,
  once = true,
  onLoad,
  threshold = 0.1,
  rootMargin = '50px'
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasLoaded(true);
          onLoad?.();
          
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once, onLoad]);

  const shouldRender = once ? hasLoaded : isInView;

  return (
    <div
      ref={elementRef}
      className={cn('lazy-load-container', className)}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      {shouldRender ? children : (placeholder || <LazyLoadPlaceholder height={height} />)}
    </div>
  );
};

// Placeholder padrão
const LazyLoadPlaceholder: React.FC<{ height?: number | string }> = ({ height }) => (
  <div
    className="bg-gray-200 dark:bg-gray-800 animate-pulse rounded"
    style={{ 
      height: typeof height === 'number' ? `${height}px` : height,
      minHeight: height === 'auto' ? '200px' : undefined
    }}
  />
);

// Hook para lazy loading de componentes
export const useLazyLoad = (offset: number = 100) => {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: `${offset}px`,
        threshold: 0.1
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [offset]);

  return { isInView, elementRef };
};

// Componente para lazy loading de listas
interface LazyListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemHeight?: number;
  containerHeight?: number;
  overscan?: number;
  className?: string;
}

export function LazyList<T>({
  items,
  renderItem,
  itemHeight = 100,
  containerHeight = 400,
  overscan = 5,
  className
}: LazyListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      className={cn('overflow-auto', className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente para lazy loading de seções da página
export const LazySection: React.FC<{
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  minHeight?: string;
}> = ({ children, fallback, className, minHeight = '200px' }) => {
  const { isInView, elementRef } = useLazyLoad(200);

  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      className={cn('lazy-section', className)}
      style={{ minHeight }}
    >
      {isInView ? children : (fallback || <LazyLoadPlaceholder height={minHeight} />)}
    </section>
  );
};

// Hook para preload de recursos quando próximo da viewport
export const usePreload = (resources: string[], offset: number = 500) => {
  const [shouldPreload, setShouldPreload] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = triggerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldPreload) {
          setShouldPreload(true);
          
          // Preload recursos
          resources.forEach(resource => {
            if (resource.match(/\.(js|css)$/)) {
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = resource.endsWith('.js') ? 'script' : 'style';
              link.href = resource;
              document.head.appendChild(link);
            } else if (resource.match(/\.(jpg|jpeg|png|webp|avif)$/)) {
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'image';
              link.href = resource;
              document.head.appendChild(link);
            }
          });
          
          observer.disconnect();
        }
      },
      {
        rootMargin: `${offset}px`,
        threshold: 0
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [resources, offset, shouldPreload]);

  return { shouldPreload, triggerRef };
};

// Componente para lazy loading de módulos/chunks
export const LazyModule: React.FC<{
  loader: () => Promise<{ default: React.ComponentType<any> }>;
  fallback?: ReactNode;
  props?: any;
}> = ({ loader, fallback, props = {} }) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { isInView, elementRef } = useLazyLoad();

  useEffect(() => {
    if (isInView && !Component && !isLoading) {
      setIsLoading(true);
      loader()
        .then(module => {
          setComponent(() => module.default);
          setError(null);
        })
        .catch(err => {
          setError(err);
          console.error('Erro ao carregar módulo lazy:', err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isInView, Component, isLoading, loader]);

  return (
    <div ref={elementRef as React.RefObject<HTMLDivElement>}>
      {error ? (
        <div className="p-4 text-red-600 bg-red-50 rounded">
          Erro ao carregar componente
        </div>
      ) : Component ? (
        <Component {...props} />
      ) : (
        fallback || <LazyLoadPlaceholder />
      )}
    </div>
  );
};