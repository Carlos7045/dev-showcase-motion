/**
 * useScrollAnimation - Hook para animações baseadas em scroll
 * Sistema completo de animações performáticas ativadas por scroll
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';
import { useMemoizedValue } from './useMemoizedValue';
import { DESIGN_TOKENS } from '@/constants/design-tokens';

// === TIPOS ===
export interface ScrollAnimationOptions {
  /** Threshold para trigger da animação */
  readonly threshold?: number;
  /** Margem do root para intersection observer */
  readonly rootMargin?: string;
  /** Se deve animar apenas uma vez */
  readonly once?: boolean;
  /** Delay antes da animação (ms) */
  readonly delay?: number;
  /** Duração da animação (ms) */
  readonly duration?: number;
  /** Função de easing */
  readonly easing?: string;
  /** Se deve usar transform para melhor performance */
  readonly useTransform?: boolean;
  /** Direção da animação */
  readonly direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  /** Distância da animação em pixels */
  readonly distance?: number;
  /** Se deve debuggar a animação */
  readonly debug?: boolean;
}

export interface ParallaxOptions {
  /** Velocidade do parallax (-1 a 1) */
  readonly speed?: number;
  /** Se deve usar transform3d para melhor performance */
  readonly use3d?: boolean;
  /** Eixo do parallax */
  readonly axis?: 'x' | 'y' | 'both';
  /** Offset inicial */
  readonly offset?: number;
  /** Se deve limitar o parallax à viewport */
  readonly clamp?: boolean;
}

export interface UseScrollAnimationReturn {
  /** Ref para anexar ao elemento */
  readonly ref: React.RefObject<HTMLElement>;
  /** Se a animação está ativa */
  readonly isAnimating: boolean;
  /** Se o elemento está visível */
  readonly isVisible: boolean;
  /** Progresso da animação (0-1) */
  readonly progress: number;
  /** Função para resetar a animação */
  readonly reset: () => void;
  /** Função para forçar a animação */
  readonly trigger: () => void;
}

export interface UseParallaxReturn {
  /** Ref para anexar ao elemento */
  readonly ref: React.RefObject<HTMLElement>;
  /** Transform atual */
  readonly transform: string;
  /** Progresso do scroll (0-1) */
  readonly progress: number;
  /** Se está na viewport */
  readonly isInView: boolean;
}

// === UTILITIES ===
const getTransformValue = (
  direction: ScrollAnimationOptions['direction'],
  distance: number,
  progress: number
): string => {
  const offset = distance * (1 - progress);
  
  switch (direction) {
    case 'up':
      return `translateY(${offset}px)`;
    case 'down':
      return `translateY(${-offset}px)`;
    case 'left':
      return `translateX(${offset}px)`;
    case 'right':
      return `translateX(${-offset}px)`;
    case 'scale':
      const scale = 0.8 + (0.2 * progress);
      return `scale(${scale})`;
    case 'fade':
    default:
      return 'translateY(0)';
  }
};

const getOpacityValue = (progress: number): number => {
  return Math.max(0, Math.min(1, progress));
};

// === HOOK PRINCIPAL PARA SCROLL ANIMATION ===
export const useScrollAnimation = (
  options: ScrollAnimationOptions = {}
): UseScrollAnimationReturn => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    once = true,
    delay = 0,
    duration = 600,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
    useTransform = true,
    direction = 'up',
    distance = 50,
    debug = false,
  } = options;

  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Intersection Observer
  const { isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin,
    once,
  });

  // Função de animação
  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Aplicar easing (simplificado)
      const easedProgress = progress; // TODO: Implementar easing functions

      setProgress(easedProgress);

      // Aplicar transformações
      const element = elementRef.current;
      if (element && useTransform) {
        const transform = getTransformValue(direction, distance, easedProgress);
        const opacity = direction === 'fade' ? getOpacityValue(easedProgress) : 1;

        element.style.transform = transform;
        element.style.opacity = opacity.toString();
        element.style.transition = 'none'; // Remover transição CSS durante animação JS
      }

      if (debug) {
        console.debug('Scroll Animation:', {
          progress: easedProgress,
          elapsed,
          duration,
        });
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setHasAnimated(true);
        startTimeRef.current = null;
        animationRef.current = null;

        // Aplicar estado final
        if (element && useTransform) {
          element.style.transform = getTransformValue(direction, distance, 1);
          element.style.opacity = direction === 'fade' ? '1' : element.style.opacity;
        }
      }
    },
    [duration, useTransform, direction, distance, debug]
  );

  // Função para iniciar animação
  const trigger = useCallback(() => {
    if (isAnimating || (once && hasAnimated)) return;

    const startAnimation = () => {
      setIsAnimating(true);
      setProgress(0);
      startTimeRef.current = null;
      animationRef.current = requestAnimationFrame(animate);
    };

    if (delay > 0) {
      setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }
  }, [isAnimating, once, hasAnimated, delay, animate]);

  // Função para resetar
  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    setIsAnimating(false);
    setProgress(0);
    setHasAnimated(false);
    startTimeRef.current = null;

    // Resetar estilos
    const element = elementRef.current;
    if (element && useTransform) {
      element.style.transform = getTransformValue(direction, distance, 0);
      element.style.opacity = direction === 'fade' ? '0' : '1';
    }
  }, [useTransform, direction, distance]);

  // Trigger automático quando entra na viewport
  useEffect(() => {
    if (isIntersecting && !hasAnimated) {
      trigger();
    }
  }, [isIntersecting, hasAnimated, trigger]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Configurar estilos iniciais
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !useTransform) return;

    // Aplicar estado inicial
    element.style.transform = getTransformValue(direction, distance, 0);
    element.style.opacity = direction === 'fade' ? '0' : '1';
    element.style.willChange = 'transform, opacity';

    return () => {
      element.style.willChange = 'auto';
    };
  }, [useTransform, direction, distance]);

  return {
    ref: elementRef,
    isAnimating,
    isVisible: isIntersecting,
    progress,
    reset,
    trigger,
  };
};

// === HOOK PARA PARALLAX ===
export const useParallax = (
  options: ParallaxOptions = {}
): UseParallaxReturn => {
  const {
    speed = 0.5,
    use3d = true,
    axis = 'y',
    offset = 0,
    clamp = true,
  } = options;

  const [transform, setTransform] = useState('translate3d(0, 0, 0)');
  const [progress, setProgress] = useState(0);

  const elementRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  // Intersection Observer para otimização
  const { isIntersecting } = useIntersectionObserver({
    rootMargin: '200px',
    threshold: 0,
  });

  // Função de scroll
  const handleScroll = useCallback(() => {
    const element = elementRef.current;
    if (!element || !isIntersecting) return;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calcular progresso baseado na posição do elemento
    const elementTop = rect.top;
    const elementHeight = rect.height;
    const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
    
    // Clampar se necessário
    const clampedProgress = clamp 
      ? Math.max(0, Math.min(1, scrollProgress))
      : scrollProgress;

    setProgress(clampedProgress);

    // Calcular offset
    const parallaxOffset = (clampedProgress - 0.5) * speed * 100 + offset;

    // Gerar transform
    let newTransform: string;
    
    if (use3d) {
      switch (axis) {
        case 'x':
          newTransform = `translate3d(${parallaxOffset}px, 0, 0)`;
          break;
        case 'y':
          newTransform = `translate3d(0, ${parallaxOffset}px, 0)`;
          break;
        case 'both':
          newTransform = `translate3d(${parallaxOffset}px, ${parallaxOffset}px, 0)`;
          break;
        default:
          newTransform = `translate3d(0, ${parallaxOffset}px, 0)`;
      }
    } else {
      switch (axis) {
        case 'x':
          newTransform = `translateX(${parallaxOffset}px)`;
          break;
        case 'y':
          newTransform = `translateY(${parallaxOffset}px)`;
          break;
        case 'both':
          newTransform = `translate(${parallaxOffset}px, ${parallaxOffset}px)`;
          break;
        default:
          newTransform = `translateY(${parallaxOffset}px)`;
      }
    }

    setTransform(newTransform);
  }, [isIntersecting, speed, use3d, axis, offset, clamp]);

  // Throttled scroll handler
  const throttledScrollHandler = useMemoizedValue(() => {
    let ticking = false;
    
    return () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
  }, [handleScroll]);

  // Event listeners
  useEffect(() => {
    if (!isIntersecting) return;

    const scrollHandler = throttledScrollHandler;
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', scrollHandler, { passive: true });
    
    // Calcular posição inicial
    handleScroll();

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', scrollHandler);
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isIntersecting, throttledScrollHandler, handleScroll]);

  // Configurar will-change
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.style.willChange = 'transform';

    return () => {
      element.style.willChange = 'auto';
    };
  }, []);

  return {
    ref: elementRef,
    transform,
    progress,
    isInView: isIntersecting,
  };
};

// === HOOK PARA TYPEWRITER ANIMATION ===
export const useTypewriter = (
  text: string,
  options: {
    speed?: number;
    delay?: number;
    loop?: boolean;
    cursor?: boolean;
    cursorChar?: string;
  } = {}
): {
  displayText: string;
  isTyping: boolean;
  isComplete: boolean;
  reset: () => void;
  start: () => void;
  pause: () => void;
} => {
  const {
    speed = 50,
    delay = 0,
    loop = false,
    cursor = true,
    cursorChar = '|',
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Função para limpar timers
  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Função para iniciar
  const start = useCallback(() => {
    if (isTyping) return;

    setIsTyping(true);
    setIsComplete(false);

    const startTyping = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          
          if (newIndex > text.length) {
            clearTimers();
            setIsTyping(false);
            setIsComplete(true);
            
            if (loop) {
              setTimeout(() => {
                setCurrentIndex(0);
                setDisplayText('');
                start();
              }, 1000);
            }
            
            return prevIndex;
          }
          
          setDisplayText(text.slice(0, newIndex));
          return newIndex;
        });
      }, speed);
    };

    if (delay > 0) {
      timeoutRef.current = setTimeout(startTyping, delay);
    } else {
      startTyping();
    }
  }, [text, speed, delay, loop, isTyping, clearTimers]);

  // Função para pausar
  const pause = useCallback(() => {
    clearTimers();
    setIsTyping(false);
  }, [clearTimers]);

  // Função para resetar
  const reset = useCallback(() => {
    clearTimers();
    setDisplayText('');
    setCurrentIndex(0);
    setIsTyping(false);
    setIsComplete(false);
  }, [clearTimers]);

  // Cleanup
  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  // Adicionar cursor se habilitado
  const finalText = useMemo(() => {
    if (!cursor) return displayText;
    
    const showCursor = isTyping || !isComplete;
    return showCursor ? `${displayText}${cursorChar}` : displayText;
  }, [displayText, cursor, cursorChar, isTyping, isComplete]);

  return {
    displayText: finalText,
    isTyping,
    isComplete,
    reset,
    start,
    pause,
  };
};

// === HOOKS DE CONVENIÊNCIA ===
export const useFadeInAnimation = (options: Omit<ScrollAnimationOptions, 'direction'> = {}) => {
  return useScrollAnimation({ ...options, direction: 'fade' });
};

export const useSlideUpAnimation = (options: Omit<ScrollAnimationOptions, 'direction'> = {}) => {
  return useScrollAnimation({ ...options, direction: 'up' });
};

export const useSlideInAnimation = (direction: 'left' | 'right', options: Omit<ScrollAnimationOptions, 'direction'> = {}) => {
  return useScrollAnimation({ ...options, direction });
};

export const useScaleAnimation = (options: Omit<ScrollAnimationOptions, 'direction'> = {}) => {
  return useScrollAnimation({ ...options, direction: 'scale' });
};

// === UTILITIES ===
export const createScrollTrigger = (
  element: HTMLElement,
  callback: (progress: number) => void,
  options: { threshold?: number; rootMargin?: string } = {}
) => {
  const { threshold = 0.1, rootMargin = '0px' } = options;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          const progress = Math.max(0, Math.min(1, 
            (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
          ));
          callback(progress);
        }
      });
    },
    { threshold, rootMargin }
  );

  observer.observe(element);

  return () => observer.disconnect();
};