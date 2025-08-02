/**
 * Image Optimization - Utilities para otimização de imagens
 * Sistema completo de otimização, compressão e transformação de imagens
 */

// === TIPOS ===
export interface ImageOptimizationOptions {
  /** Largura desejada */
  readonly width?: number;
  /** Altura desejada */
  readonly height?: number;
  /** Qualidade (1-100) */
  readonly quality?: number;
  /** Formato de saída */
  readonly format?: 'webp' | 'avif' | 'jpg' | 'png' | 'auto';
  /** Se deve manter aspect ratio */
  readonly maintainAspectRatio?: boolean;
  /** Modo de redimensionamento */
  readonly fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  /** Posição para crop */
  readonly position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  /** Se deve aplicar blur */
  readonly blur?: number;
  /** Se deve aplicar sharpen */
  readonly sharpen?: boolean;
  /** Cor de fundo para transparência */
  readonly backgroundColor?: string;
}

export interface ResponsiveImageConfig {
  /** Breakpoints em pixels */
  readonly breakpoints: readonly number[];
  /** Sizes attribute */
  readonly sizes?: string;
  /** Qualidade base */
  readonly quality?: number;
  /** Formatos suportados */
  readonly formats?: readonly ('webp' | 'avif' | 'jpg' | 'png')[];
}

export interface ImageMetadata {
  readonly width: number;
  readonly height: number;
  readonly format: string;
  readonly size: number;
  readonly aspectRatio: number;
  readonly hasAlpha: boolean;
}

// === CONSTANTES ===
export const DEFAULT_BREAKPOINTS = [320, 640, 768, 1024, 1280, 1536, 1920] as const;

export const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

export const SUPPORTED_FORMATS = ['webp', 'avif', 'jpg', 'png'] as const;

export const FORMAT_MIME_TYPES = {
  webp: 'image/webp',
  avif: 'image/avif',
  jpg: 'image/jpeg',
  png: 'image/png',
} as const;

// === DETECÇÃO DE SUPORTE A FORMATOS ===
let formatSupport: Record<string, boolean> | null = null;

export const detectFormatSupport = async (): Promise<Record<string, boolean>> => {
  if (formatSupport) return formatSupport;
  
  if (typeof window === 'undefined') {
    // Server-side: assumir suporte básico
    return {
      webp: true,
      avif: false,
      jpg: true,
      png: true,
    };
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  const support = {
    webp: false,
    avif: false,
    jpg: true, // Sempre suportado
    png: true, // Sempre suportado
  };

  try {
    // Testar WebP
    support.webp = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    
    // Testar AVIF (mais complexo)
    if ('createImageBitmap' in window) {
      const avifData = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
      
      try {
        const response = await fetch(avifData);
        const blob = await response.blob();
        await createImageBitmap(blob);
        support.avif = true;
      } catch {
        support.avif = false;
      }
    }
  } catch (error) {
    console.warn('Error detecting image format support:', error);
  }

  formatSupport = support;
  return support;
};

// === GERAÇÃO DE URLs OTIMIZADAS ===
export const generateOptimizedUrl = (
  src: string,
  options: ImageOptimizationOptions = {}
): string => {
  // Se for uma URL externa ou já otimizada, retornar como está
  if (src.startsWith('http') && !src.includes(window.location.hostname)) {
    return src;
  }

  const {
    width,
    height,
    quality = 80,
    format = 'auto',
    fit = 'cover',
    position = 'center',
    blur,
    sharpen,
    backgroundColor,
  } = options;

  const params = new URLSearchParams();

  // Dimensões
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());

  // Qualidade
  if (quality !== 80) params.set('q', quality.toString());

  // Formato
  if (format !== 'auto') params.set('f', format);

  // Modo de redimensionamento
  if (fit !== 'cover') params.set('fit', fit);

  // Posição
  if (position !== 'center') params.set('pos', position);

  // Efeitos
  if (blur) params.set('blur', blur.toString());
  if (sharpen) params.set('sharp', '1');

  // Cor de fundo
  if (backgroundColor) params.set('bg', backgroundColor.replace('#', ''));

  const queryString = params.toString();
  return queryString ? `${src}?${queryString}` : src;
};

// === GERAÇÃO DE SRCSET ===
export const generateSrcSet = (
  src: string,
  breakpoints: readonly number[],
  options: Omit<ImageOptimizationOptions, 'width'> = {}
): string => {
  return breakpoints
    .map(width => {
      const url = generateOptimizedUrl(src, { ...options, width });
      return `${url} ${width}w`;
    })
    .join(', ');
};

// === GERAÇÃO DE PICTURE ELEMENT ===
export const generatePictureData = (
  src: string,
  config: ResponsiveImageConfig & ImageOptimizationOptions
): {
  sources: Array<{
    srcSet: string;
    type: string;
    sizes?: string;
  }>;
  fallback: {
    src: string;
    srcSet: string;
    sizes?: string;
  };
} => {
  const {
    breakpoints = DEFAULT_BREAKPOINTS,
    sizes = DEFAULT_SIZES,
    formats = ['webp', 'jpg'],
    ...optimizationOptions
  } = config;

  // Gerar sources para cada formato
  const sources = formats.slice(0, -1).map(format => ({
    srcSet: generateSrcSet(src, breakpoints, { ...optimizationOptions, format }),
    type: FORMAT_MIME_TYPES[format],
    sizes,
  }));

  // Fallback com o último formato
  const fallbackFormat = formats[formats.length - 1];
  const fallback = {
    src: generateOptimizedUrl(src, { ...optimizationOptions, format: fallbackFormat }),
    srcSet: generateSrcSet(src, breakpoints, { ...optimizationOptions, format: fallbackFormat }),
    sizes,
  };

  return { sources, fallback };
};

// === OTIMIZAÇÃO AUTOMÁTICA DE FORMATO ===
export const getOptimalFormat = async (
  originalFormat: string,
  hasAlpha: boolean = false
): Promise<string> => {
  const support = await detectFormatSupport();

  // Se tem transparência, preferir formatos que suportam alpha
  if (hasAlpha) {
    if (support.avif) return 'avif';
    if (support.webp) return 'webp';
    return 'png';
  }

  // Para imagens sem transparência
  if (support.avif) return 'avif';
  if (support.webp) return 'webp';
  return 'jpg';
};

// === CÁLCULO DE QUALIDADE ADAPTATIVA ===
export const calculateAdaptiveQuality = (
  width: number,
  originalWidth: number,
  baseQuality: number = 80
): number => {
  // Reduzir qualidade para imagens menores (thumbnails)
  const ratio = width / originalWidth;
  
  if (ratio <= 0.25) return Math.max(baseQuality - 20, 40); // Thumbnails
  if (ratio <= 0.5) return Math.max(baseQuality - 10, 50);  // Médias
  if (ratio <= 0.75) return Math.max(baseQuality - 5, 60);  // Grandes
  
  return baseQuality; // Tamanho original
};

// === GERAÇÃO DE PLACEHOLDER BLUR ===
export const generateBlurPlaceholder = (
  src: string,
  width: number = 10,
  height: number = 10
): string => {
  return generateOptimizedUrl(src, {
    width,
    height,
    quality: 10,
    blur: 5,
    format: 'jpg',
  });
};

// === ANÁLISE DE IMAGEM ===
export const analyzeImage = (file: File): Promise<ImageMetadata> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0);
      
      // Verificar se tem transparência
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const hasAlpha = imageData.data.some((_, index) => 
        index % 4 === 3 && imageData.data[index] < 255
      );

      resolve({
        width: img.width,
        height: img.height,
        format: file.type.split('/')[1],
        size: file.size,
        aspectRatio: img.width / img.height,
        hasAlpha,
      });
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

// === COMPRESSÃO DE IMAGEM CLIENT-SIDE ===
export const compressImage = (
  file: File,
  options: ImageOptimizationOptions = {}
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const {
      width,
      height,
      quality = 0.8,
      format = 'auto',
      maintainAspectRatio = true,
    } = options;

    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      let { width: imgWidth, height: imgHeight } = img;

      // Calcular novas dimensões
      if (width || height) {
        if (maintainAspectRatio) {
          const aspectRatio = imgWidth / imgHeight;
          
          if (width && height) {
            // Usar a menor escala para manter aspect ratio
            const scaleX = width / imgWidth;
            const scaleY = height / imgHeight;
            const scale = Math.min(scaleX, scaleY);
            
            imgWidth = imgWidth * scale;
            imgHeight = imgHeight * scale;
          } else if (width) {
            imgHeight = width / aspectRatio;
            imgWidth = width;
          } else if (height) {
            imgWidth = height * aspectRatio;
            imgHeight = height;
          }
        } else {
          imgWidth = width || imgWidth;
          imgHeight = height || imgHeight;
        }
      }

      canvas.width = imgWidth;
      canvas.height = imgHeight;

      // Desenhar imagem redimensionada
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);

      // Determinar formato de saída
      let outputFormat = 'image/jpeg';
      if (format === 'png') outputFormat = 'image/png';
      else if (format === 'webp') outputFormat = 'image/webp';
      else if (format === 'auto') {
        // Manter formato original se for PNG (para transparência)
        outputFormat = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      }

      // Converter para blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        outputFormat,
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

// === PRELOAD DE IMAGENS ===
export const preloadImages = (
  urls: string[],
  options: {
    priority?: boolean;
    timeout?: number;
  } = {}
): Promise<void[]> => {
  const { priority = false, timeout = 10000 } = options;

  const loadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      const timer = setTimeout(() => {
        reject(new Error(`Image load timeout: ${url}`));
      }, timeout);

      img.onload = () => {
        clearTimeout(timer);
        resolve();
      };

      img.onerror = () => {
        clearTimeout(timer);
        reject(new Error(`Failed to load image: ${url}`));
      };

      if (priority) {
        img.fetchPriority = 'high';
      }

      img.src = url;
    });
  };

  return Promise.all(urls.map(loadImage));
};

// === LAZY LOADING COM INTERSECTION OBSERVER ===
export const createLazyImageObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// === UTILITIES DE PERFORMANCE ===
export const measureImageLoadTime = (src: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const startTime = performance.now();
    const img = new Image();

    img.onload = () => {
      const loadTime = performance.now() - startTime;
      resolve(loadTime);
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`));
    };

    img.src = src;
  });
};

export const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`));
    };

    img.src = src;
  });
};

// === CACHE DE IMAGENS ===
const imageCache = new Map<string, HTMLImageElement>();

export const getCachedImage = (src: string): HTMLImageElement | null => {
  return imageCache.get(src) || null;
};

export const cacheImage = (src: string): Promise<HTMLImageElement> => {
  const cached = imageCache.get(src);
  if (cached) return Promise.resolve(cached);

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };

    img.onerror = () => {
      reject(new Error(`Failed to cache image: ${src}`));
    };

    img.src = src;
  });
};

export const clearImageCache = (): void => {
  imageCache.clear();
};

export const getImageCacheSize = (): number => {
  return imageCache.size;
};