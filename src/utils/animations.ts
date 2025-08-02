/**
 * Animations - Utilities para animações
 * Funções reutilizáveis para animações performáticas e consistentes
 */

import { DESIGN_TOKENS } from '@/constants/design-tokens';

// === TIPOS ===
export interface AnimationConfig {
  /** Duração em ms */
  readonly duration?: number;
  /** Delay em ms */
  readonly delay?: number;
  /** Função de easing */
  readonly easing?: string;
  /** Se deve usar transform3d para melhor performance */
  readonly use3d?: boolean;
  /** Se deve aplicar will-change */
  readonly willChange?: boolean;
}

export interface ScrollAnimationConfig extends AnimationConfig {
  /** Direção da animação */
  readonly direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  /** Distância em pixels */
  readonly distance?: number;
  /** Threshold para trigger */
  readonly threshold?: number;
  /** Margem do root */
  readonly rootMargin?: string;
}

export interface ParallaxConfig extends AnimationConfig {
  /** Velocidade do parallax */
  readonly speed?: number;
  /** Eixo do movimento */
  readonly axis?: 'x' | 'y' | 'both';
  /** Offset inicial */
  readonly offset?: number;
  /** Se deve limitar à viewport */
  readonly clamp?: boolean;
}

export type EasingFunction = (t: number) => number;
export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

// === CONSTANTES ===
export const ANIMATION_DEFAULTS = {
  duration: 300,
  delay: 0,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  distance: 50,
  threshold: 0.1,
  rootMargin: '50px',
  speed: 0.5,
} as const;

export const EASING_FUNCTIONS = {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  acceleration: 'cubic-bezier(0.4, 0, 1, 1)',
  deceleration: 'cubic-bezier(0, 0, 0.2, 1)',
} as const;

export const ANIMATION_DURATIONS = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 750,
  slowest: 1000,
} as const;

// === FUNÇÕES DE EASING ===
export const easingFunctions: Record<string, EasingFunction> = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => 1 - (--t) * t * t * t,
  easeInOutQuart: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  easeInQuint: (t: number) => t * t * t * t * t,
  easeOutQuint: (t: number) => 1 + (--t) * t * t * t * t,
  easeInOutQuint: (t: number) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
  easeInSine: (t: number) => 1 - Math.cos(t * Math.PI / 2),
  easeOutSine: (t: number) => Math.sin(t * Math.PI / 2),
  easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeInExpo: (t: number) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: (t: number) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return Math.pow(2, 20 * t - 10) / 2;
    return (2 - Math.pow(2, -20 * t + 10)) / 2;
  },
  easeInCirc: (t: number) => 1 - Math.sqrt(1 - t * t),
  easeOutCirc: (t: number) => Math.sqrt(1 - (t - 1) * (t - 1)),
  easeInOutCirc: (t: number) => {
    if (t < 0.5) return (1 - Math.sqrt(1 - 4 * t * t)) / 2;
    return (Math.sqrt(1 - (-2 * t + 2) * (-2 * t + 2)) + 1) / 2;
  },
  easeInBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  easeOutBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInOutBack: (t: number) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },
  easeInElastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
  },
  easeOutElastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
  easeInOutElastic: (t: number) => {
    const c5 = (2 * Math.PI) / 4.5;
    return t === 0 ? 0 : t === 1 ? 1 : t < 0.5
      ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1;
  },
  easeInBounce: (t: number) => 1 - easingFunctions.easeOutBounce(1 - t),
  easeOutBounce: (t: number) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  },
  easeInOutBounce: (t: number) => {
    return t < 0.5
      ? (1 - easingFunctions.easeOutBounce(1 - 2 * t)) / 2
      : (1 + easingFunctions.easeOutBounce(2 * t - 1)) / 2;
  },
};

// === UTILITIES DE TRANSFORM ===
export const getTransformValue = (
  direction: AnimationDirection,
  distance: number,
  progress: number,
  use3d: boolean = true
): string => {
  const offset = distance * (1 - progress);
  const translateFn = use3d ? 'translate3d' : 'translate';
  
  switch (direction) {
    case 'up':
      return use3d ? `translate3d(0, ${offset}px, 0)` : `translateY(${offset}px)`;
    case 'down':
      return use3d ? `translate3d(0, ${-offset}px, 0)` : `translateY(${-offset}px)`;
    case 'left':
      return use3d ? `translate3d(${offset}px, 0, 0)` : `translateX(${offset}px)`;
    case 'right':
      return use3d ? `translate3d(${-offset}px, 0, 0)` : `translateX(${-offset}px)`;
    case 'scale':
      const scale = 0.8 + (0.2 * progress);
      return `scale(${scale})`;
    case 'fade':
    default:
      return use3d ? 'translate3d(0, 0, 0)' : 'translateY(0)';
  }
};

export const getOpacityValue = (progress: number): number => {
  return Math.max(0, Math.min(1, progress));
};

export const getScaleValue = (progress: number, minScale: number = 0.8): number => {
  return minScale + ((1 - minScale) * progress);
};

// === UTILITIES DE CSS ===
export const createAnimationStyles = (config: AnimationConfig): React.CSSProperties => {
  const {
    duration = ANIMATION_DEFAULTS.duration,
    delay = ANIMATION_DEFAULTS.delay,
    easing = ANIMATION_DEFAULTS.easing,
    willChange = true,
  } = config;

  return {
    transition: `all ${duration}ms ${easing}`,
    transitionDelay: delay > 0 ? `${delay}ms` : undefined,
    willChange: willChange ? 'transform, opacity' : undefined,
  };
};

export const createScrollAnimationStyles = (
  direction: AnimationDirection,
  progress: number,
  config: ScrollAnimationConfig
): React.CSSProperties => {
  const {
    distance = ANIMATION_DEFAULTS.distance,
    use3d = true,
    ...animationConfig
  } = config;

  const baseStyles = createAnimationStyles(animationConfig);
  const transform = getTransformValue(direction, distance, progress, use3d);
  const opacity = direction === 'fade' ? getOpacityValue(progress) : 1;

  return {
    ...baseStyles,
    transform,
    opacity,
  };
};

export const createParallaxStyles = (
  progress: number,
  config: ParallaxConfig
): React.CSSProperties => {
  const {
    speed = ANIMATION_DEFAULTS.speed,
    axis = 'y',
    offset = 0,
    use3d = true,
    willChange = true,
  } = config;

  const parallaxOffset = (progress - 0.5) * speed * 100 + offset;
  
  let transform: string;
  if (use3d) {
    switch (axis) {
      case 'x':
        transform = `translate3d(${parallaxOffset}px, 0, 0)`;
        break;
      case 'y':
        transform = `translate3d(0, ${parallaxOffset}px, 0)`;
        break;
      case 'both':
        transform = `translate3d(${parallaxOffset}px, ${parallaxOffset}px, 0)`;
        break;
      default:
        transform = `translate3d(0, ${parallaxOffset}px, 0)`;
    }
  } else {
    switch (axis) {
      case 'x':
        transform = `translateX(${parallaxOffset}px)`;
        break;
      case 'y':
        transform = `translateY(${parallaxOffset}px)`;
        break;
      case 'both':
        transform = `translate(${parallaxOffset}px, ${parallaxOffset}px)`;
        break;
      default:
        transform = `translateY(${parallaxOffset}px)`;
    }
  }

  return {
    transform,
    willChange: willChange ? 'transform' : undefined,
  };
};

// === UTILITIES DE PERFORMANCE ===
export const optimizeAnimation = (element: HTMLElement, config: AnimationConfig = {}): void => {
  const { willChange = true } = config;
  
  if (willChange) {
    element.style.willChange = 'transform, opacity';
  }
  
  // Forçar layer de composição
  element.style.transform = element.style.transform || 'translateZ(0)';
  
  // Otimizar para GPU
  element.style.backfaceVisibility = 'hidden';
  element.style.perspective = '1000px';
};

export const cleanupAnimation = (element: HTMLElement): void => {
  element.style.willChange = 'auto';
  element.style.backfaceVisibility = '';
  element.style.perspective = '';
};

// === UTILITIES DE TIMING ===
export const createStaggeredDelay = (
  index: number,
  baseDelay: number = 0,
  stagger: number = 100
): number => {
  return baseDelay + (index * stagger);
};

export const createStaggeredDuration = (
  index: number,
  baseDuration: number = 300,
  variance: number = 50
): number => {
  return baseDuration + (Math.random() * variance * 2 - variance);
};

// === UTILITIES DE INTERSECTION OBSERVER ===
export const createScrollTrigger = (
  element: HTMLElement,
  callback: (progress: number, isIntersecting: boolean) => void,
  config: Pick<ScrollAnimationConfig, 'threshold' | 'rootMargin'> = {}
): (() => void) => {
  const {
    threshold = ANIMATION_DEFAULTS.threshold,
    rootMargin = ANIMATION_DEFAULTS.rootMargin,
  } = config;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const rect = entry.boundingClientRect;
        const progress = Math.max(0, Math.min(1, 
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        ));
        
        callback(progress, entry.isIntersecting);
      });
    },
    { threshold, rootMargin }
  );

  observer.observe(element);

  return () => observer.disconnect();
};

// === UTILITIES DE ANIMAÇÃO MANUAL ===
export const animateValue = (
  from: number,
  to: number,
  duration: number,
  callback: (value: number) => void,
  easing: EasingFunction = easingFunctions.easeOutQuad
): (() => void) => {
  let startTime: number | null = null;
  let animationId: number;

  const animate = (currentTime: number) => {
    if (!startTime) startTime = currentTime;
    
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);
    const currentValue = from + (to - from) * easedProgress;
    
    callback(currentValue);
    
    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    }
  };

  animationId = requestAnimationFrame(animate);

  return () => cancelAnimationFrame(animationId);
};

export const animateElement = (
  element: HTMLElement,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions = {}
): Animation => {
  const defaultOptions: KeyframeAnimationOptions = {
    duration: ANIMATION_DEFAULTS.duration,
    easing: ANIMATION_DEFAULTS.easing,
    fill: 'forwards',
    ...options,
  };

  return element.animate(keyframes, defaultOptions);
};

// === PRESETS DE ANIMAÇÃO ===
export const ANIMATION_PRESETS = {
  fadeIn: {
    keyframes: [
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    options: { duration: 300, easing: 'ease-out' },
  },
  fadeOut: {
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-20px)' },
    ],
    options: { duration: 300, easing: 'ease-in' },
  },
  slideInLeft: {
    keyframes: [
      { opacity: 0, transform: 'translateX(-100%)' },
      { opacity: 1, transform: 'translateX(0)' },
    ],
    options: { duration: 400, easing: 'ease-out' },
  },
  slideInRight: {
    keyframes: [
      { opacity: 0, transform: 'translateX(100%)' },
      { opacity: 1, transform: 'translateX(0)' },
    ],
    options: { duration: 400, easing: 'ease-out' },
  },
  scaleIn: {
    keyframes: [
      { opacity: 0, transform: 'scale(0.8)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    options: { duration: 300, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
  },
  bounce: {
    keyframes: [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-10px)' },
      { transform: 'translateY(0)' },
    ],
    options: { duration: 600, easing: 'ease-in-out' },
  },
  shake: {
    keyframes: [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(0)' },
    ],
    options: { duration: 500, easing: 'ease-in-out' },
  },
  pulse: {
    keyframes: [
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(1.05)', opacity: 0.8 },
      { transform: 'scale(1)', opacity: 1 },
    ],
    options: { duration: 1000, easing: 'ease-in-out', iterations: Infinity },
  },
} as const;

// === UTILITIES DE CLASSE CSS ===
export const generateAnimationClasses = (
  direction: AnimationDirection,
  config: ScrollAnimationConfig = {}
): string => {
  const {
    duration = ANIMATION_DEFAULTS.duration,
    delay = ANIMATION_DEFAULTS.delay,
    easing = ANIMATION_DEFAULTS.easing,
  } = config;

  const animationName = `animate-${direction}`;
  const durationClass = `duration-${duration}`;
  const delayClass = delay > 0 ? `delay-${delay}` : '';
  const easingClass = easing.includes('cubic-bezier') ? 'ease-custom' : `ease-${easing}`;

  return [animationName, durationClass, delayClass, easingClass]
    .filter(Boolean)
    .join(' ');
};

// === UTILITIES DE DEBUG ===
export const debugAnimation = (
  element: HTMLElement,
  animationName: string,
  config: AnimationConfig = {}
): void => {
  if (process.env.NODE_ENV !== 'development') return;

  console.group(`🎬 Animation Debug: ${animationName}`);
  console.log('Element:', element);
  console.log('Config:', config);
  console.log('Computed styles:', window.getComputedStyle(element));
  console.groupEnd();
};

export const measureAnimationPerformance = (
  animationName: string,
  callback: () => void
): void => {
  if (process.env.NODE_ENV !== 'development') return;

  const startTime = performance.now();
  
  callback();
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  if (duration > 16) { // Mais que um frame (60fps)
    console.warn(`🐌 Slow animation "${animationName}": ${duration.toFixed(2)}ms`);
  } else {
    console.log(`⚡ Fast animation "${animationName}": ${duration.toFixed(2)}ms`);
  }
};