// Utilitários para otimização de imagens

export interface ImageOptimizationConfig {
  quality: number;
  format: 'webp' | 'avif' | 'jpg' | 'png';
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

export class ImageOptimizer {
  private static baseUrl = import.meta.env.VITE_IMAGE_CDN_URL || '';

  /**
   * Gera URL otimizada para imagem
   */
  static optimizeImage(src: string, config: Partial<ImageOptimizationConfig> = {}): string {
    // Se for uma URL externa, retorna como está
    if (src.startsWith('http') && !src.includes(this.baseUrl)) {
      return src;
    }

    const {
      quality = 75,
      format = 'webp',
      width,
      height,
      fit = 'cover'
    } = config;

    // Se não temos CDN configurado, retorna a imagem original
    if (!this.baseUrl) {
      return src;
    }

    const params = new URLSearchParams();
    params.set('q', quality.toString());
    params.set('f', format);
    params.set('fit', fit);
    
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());

    const imagePath = src.startsWith('/') ? src.slice(1) : src;
    return `${this.baseUrl}/${imagePath}?${params.toString()}`;
  }

  /**
   * Gera múltiplas versões da imagem para srcSet
   */
  static generateSrcSet(src: string, breakpoints: number[], config: Partial<ImageOptimizationConfig> = {}): string {
    return breakpoints
      .map(width => {
        const optimizedSrc = this.optimizeImage(src, { ...config, width });
        return `${optimizedSrc} ${width}w`;
      })
      .join(', ');
  }

  /**
   * Gera placeholder blur data URL
   */
  static generateBlurPlaceholder(width: number = 400, height: number = 300, color: string = '#f3f4f6'): string {
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="blur">
            <feGaussianBlur stdDeviation="10"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="${color}" filter="url(#blur)"/>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  /**
   * Detecta suporte a formatos modernos
   */
  static async detectFormatSupport(): Promise<{
    webp: boolean;
    avif: boolean;
  }> {
    const webpSupport = await this.canUseFormat('webp');
    const avifSupport = await this.canUseFormat('avif');
    
    return { webp: webpSupport, avif: avifSupport };
  }

  /**
   * Verifica se o navegador suporta um formato específico
   */
  private static canUseFormat(format: 'webp' | 'avif'): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      
      const testImages = {
        webp: 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA',
        avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A='
      };
      
      img.src = testImages[format];
    });
  }

  /**
   * Calcula o tamanho ideal da imagem baseado no viewport
   */
  static calculateOptimalSize(
    originalWidth: number,
    originalHeight: number,
    maxWidth: number = window.innerWidth,
    maxHeight: number = window.innerHeight,
    devicePixelRatio: number = window.devicePixelRatio || 1
  ): { width: number; height: number } {
    const ratio = originalWidth / originalHeight;
    
    let width = Math.min(originalWidth, maxWidth * devicePixelRatio);
    let height = width / ratio;
    
    if (height > maxHeight * devicePixelRatio) {
      height = maxHeight * devicePixelRatio;
      width = height * ratio;
    }
    
    return {
      width: Math.round(width),
      height: Math.round(height)
    };
  }

  /**
   * Preload de imagens críticas
   */
  static preloadImage(src: string, config: Partial<ImageOptimizationConfig> = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = this.optimizeImage(src, config);
    });
  }

  /**
   * Preload de múltiplas imagens
   */
  static async preloadImages(images: Array<{ src: string; config?: Partial<ImageOptimizationConfig> }>): Promise<void> {
    const promises = images.map(({ src, config }) => this.preloadImage(src, config));
    await Promise.all(promises);
  }

  /**
   * Gera responsive breakpoints baseado no conteúdo
   */
  static generateResponsiveBreakpoints(
    originalWidth: number,
    minWidth: number = 320,
    maxWidth: number = 1920,
    steps: number = 6
  ): number[] {
    const actualMaxWidth = Math.min(originalWidth, maxWidth);
    const range = actualMaxWidth - minWidth;
    const stepSize = range / (steps - 1);
    
    const breakpoints: number[] = [];
    for (let i = 0; i < steps; i++) {
      breakpoints.push(Math.round(minWidth + (stepSize * i)));
    }
    
    // Remove duplicatas e ordena
    return [...new Set(breakpoints)].sort((a, b) => a - b);
  }

  /**
   * Monitora performance de carregamento de imagens
   */
  static monitorImagePerformance(src: string): void {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name.includes(src)) {
          console.log(`Image ${src} loaded in ${entry.duration}ms`);
          
          // Envia métricas para analytics se configurado
          if (window.gtag) {
            window.gtag('event', 'image_load_time', {
              custom_parameter_1: src,
              custom_parameter_2: entry.duration
            });
          }
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }
}

// Configurações padrão para diferentes tipos de imagem
export const imageConfigs = {
  hero: {
    quality: 85,
    format: 'webp' as const,
    breakpoints: [640, 768, 1024, 1280, 1536, 1920]
  },
  content: {
    quality: 75,
    format: 'webp' as const,
    breakpoints: [320, 640, 768, 1024]
  },
  thumbnail: {
    quality: 70,
    format: 'webp' as const,
    breakpoints: [150, 300, 450]
  },
  avatar: {
    quality: 80,
    format: 'webp' as const,
    breakpoints: [64, 128, 256]
  }
};

// Hook para detectar conexão lenta
export const useSlowConnection = (): boolean => {
  if (!('connection' in navigator)) return false;
  
  const connection = (navigator as any).connection;
  return connection?.effectiveType === 'slow-2g' || 
         connection?.effectiveType === '2g' ||
         connection?.saveData === true;
};