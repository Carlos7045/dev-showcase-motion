import { AnimationConfig, ScrollAnimation } from '@/types/animations';

export class ScrollAnimationManager {
  private observer: IntersectionObserver | null = null;
  private animations: Map<HTMLElement, ScrollAnimation> = new Map();
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private init(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const animation = this.animations.get(entry.target as HTMLElement);
          if (animation && animation.callback) {
            animation.callback(entry);
          }
        });
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.isInitialized = true;
  }

  registerAnimation(
    element: HTMLElement, 
    config: AnimationConfig,
    callback?: (entry: IntersectionObserverEntry) => void
  ): void {
    if (!this.observer || !element) return;

    const animation: ScrollAnimation = {
      element,
      animation: config,
      threshold: config.threshold || 0.1,
      rootMargin: config.rootMargin || '0px 0px -50px 0px',
      callback
    };

    this.animations.set(element, animation);
    this.observer.observe(element);
  }

  unregisterAnimation(element: HTMLElement): void {
    if (!this.observer || !element) return;

    this.observer.unobserve(element);
    this.animations.delete(element);
  }

  updateAnimation(element: HTMLElement, config: Partial<AnimationConfig>): void {
    const existingAnimation = this.animations.get(element);
    if (existingAnimation) {
      existingAnimation.animation = { ...existingAnimation.animation, ...config };
    }
  }

  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.animations.clear();
    this.isInitialized = false;
  }

  // Método para criar animações escalonadas
  registerStaggeredAnimations(
    elements: HTMLElement[],
    baseConfig: AnimationConfig,
    staggerDelay: number = 0.1
  ): void {
    elements.forEach((element, index) => {
      const config = {
        ...baseConfig,
        delay: (baseConfig.delay || 0) + (index * staggerDelay)
      };
      
      this.registerAnimation(element, config);
    });
  }

  // Método para pausar/retomar animações
  pause(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  resume(): void {
    if (!this.observer) {
      this.init();
    }
    
    // Re-observar todos os elementos
    this.animations.forEach((animation) => {
      if (this.observer) {
        this.observer.observe(animation.element);
      }
    });
  }
}

// Instância singleton
export const scrollAnimationManager = new ScrollAnimationManager();