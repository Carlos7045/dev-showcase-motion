export interface AnimationConfig {
  type: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'scaleOut' | 'rotateIn' | 'parallax' | 'morphing' | 'bounce' | 'elastic';
  duration: number;
  delay?: number;
  easing?: string;
  trigger?: 'scroll' | 'hover' | 'click' | 'load';
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  stagger?: {
    enabled: boolean;
    delay: number;
    direction?: 'normal' | 'reverse' | 'alternate';
  };
}

export interface ScrollAnimation {
  element: HTMLElement;
  animation: AnimationConfig;
  threshold: number;
  rootMargin: string;
  callback?: (entry: IntersectionObserverEntry) => void;
}

export interface StaggerConfig {
  container: AnimationConfig;
  items: AnimationConfig;
  staggerDelay: number;
  direction?: 'normal' | 'reverse' | 'alternate';
}

export interface AnimationVariants {
  hidden: any;
  visible: any;
}

export interface ParallaxConfig {
  speed: number;
  direction: 'vertical' | 'horizontal';
  scale?: number;
  rotate?: number;
}