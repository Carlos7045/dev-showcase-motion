/**
 * useTransition - Hook para animações de transição
 * Sistema completo de transições performáticas entre estados
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useMemoizedValue } from './useMemoizedValue';

// === TIPOS ===
export interface TransitionConfig {
  /** Duração da transição em ms */
  readonly duration?: number;
  /** Delay antes da transição em ms */
  readonly delay?: number;
  /** Função de easing */
  readonly easing?: string;
  /** Se deve usar transform para melhor performance */
  readonly useTransform?: boolean;
  /** Propriedades CSS a serem animadas */
  readonly properties?: readonly string[];
}

export interface UseTransitionOptions extends TransitionConfig {
  /** Estado inicial */
  readonly initialState?: boolean;
  /** Callback quando a transição inicia */
  readonly onStart?: () => void;
  /** Callback quando a transição termina */
  readonly onComplete?: () => void;
  /** Se deve manter o elemento no DOM durante transição */
  readonly keepMounted?: boolean;
}

export interface UseTransitionReturn {
  /** Estado atual da transição */
  readonly isVisible: boolean;
  /** Se está em transição */
  readonly isTransitioning: boolean;
  /** Função para mostrar */
  readonly show: () => void;
  /** Função para esconder */
  readonly hide: () => void;
  /** Função para alternar */
  readonly toggle: () => void;
  /** Estilos CSS para aplicar */
  readonly styles: React.CSSProperties;
  /** Se deve renderizar o elemento */
  readonly shouldRender: boolean;
}

export interface UseFadeTransitionReturn extends UseTransitionReturn {
  /** Opacidade atual */
  readonly opacity: number;
}

export interface UseSlideTransitionReturn extends UseTransitionReturn {
  /** Transform atual */
  readonly transform: string;
}

export interface UseScaleTransitionReturn extends UseTransitionReturn {
  /** Escala atual */
  readonly scale: number;
}

// === TIPOS DE TRANSIÇÃO ===
export type TransitionType = 'fade' | 'slide' | 'scale' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';

// === UTILITIES ===
const getTransitionStyles = (
  type: TransitionType,
  progress: number,
  config: TransitionConfig
): React.CSSProperties => {
  const { duration = 300, easing = 'ease-out' } = config;
  
  const baseStyles: React.CSSProperties = {
    transition: `all ${duration}ms ${easing}`,
    willChange: 'transform, opacity',
  };

  switch (type) {
    case 'fade':
      return {
        ...baseStyles,
        opacity: progress,
      };

    case 'scale':
      return {
        ...baseStyles,
        opacity: progress,
        transform: `scale(${0.8 + (0.2 * progress)})`,
      };

    case 'slideUp':
      return {
        ...baseStyles,
        opacity: progress,
        transform: `translateY(${20 * (1 - progress)}px)`,
      };

    case 'slideDown':
      return {
        ...baseStyles,
        opacity: progress,
        transform: `translateY(${-20 * (1 - progress)}px)`,
      };

    case 'slideLeft':
      return {
        ...baseStyles,
        opacity: progress,
        transform: `translateX(${20 * (1 - progress)}px)`,
      };

    case 'slideRight':
      return {
        ...baseStyles,
        opacity: progress,
        transform: `translateX(${-20 * (1 - progress)}px)`,
      };

    default:
      return baseStyles;
  }
};

// === HOOK PRINCIPAL ===
export const useTransition = (
  show: boolean,
  type: TransitionType = 'fade',
  options: UseTransitionOptions = {}
): UseTransitionReturn => {
  const {
    duration = 300,
    delay = 0,
    easing = 'ease-out',
    initialState = false,
    onStart,
    onComplete,
    keepMounted = false,
  } = options;

  const [isVisible, setIsVisible] = useState(initialState);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldRender, setShouldRender] = useState(initialState || keepMounted);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onStartRef = useRef(onStart);
  const onCompleteRef = useRef(onComplete);

  // Atualizar refs
  onStartRef.current = onStart;
  onCompleteRef.current = onComplete;

  // Config memoizada
  const config = useMemoizedValue(
    () => ({ duration, delay, easing }),
    [duration, delay, easing]
  );

  // Função para iniciar transição
  const startTransition = useCallback(
    (targetState: boolean) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setIsTransitioning(true);
      onStartRef.current?.();

      // Se está mostrando, renderizar imediatamente
      if (targetState) {
        setShouldRender(true);
      }

      const executeTransition = () => {
        setIsVisible(targetState);

        // Aguardar fim da transição
        timeoutRef.current = setTimeout(() => {
          setIsTransitioning(false);
          onCompleteRef.current?.();

          // Se está escondendo e não deve manter montado, parar de renderizar
          if (!targetState && !keepMounted) {
            setShouldRender(false);
          }
        }, duration);
      };

      if (delay > 0) {
        timeoutRef.current = setTimeout(executeTransition, delay);
      } else {
        executeTransition();
      }
    },
    [duration, delay, keepMounted]
  );

  // Efeito para reagir a mudanças no prop show
  useEffect(() => {
    startTransition(show);
  }, [show, startTransition]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Estilos calculados
  const styles = useMemoizedValue(
    () => getTransitionStyles(type, isVisible ? 1 : 0, config),
    [type, isVisible, config]
  );

  // Funções de controle
  const showElement = useCallback(() => startTransition(true), [startTransition]);
  const hideElement = useCallback(() => startTransition(false), [startTransition]);
  const toggleElement = useCallback(() => startTransition(!isVisible), [startTransition, isVisible]);

  return {
    isVisible,
    isTransitioning,
    show: showElement,
    hide: hideElement,
    toggle: toggleElement,
    styles,
    shouldRender,
  };
};

// === HOOK PARA FADE TRANSITION ===
export const useFadeTransition = (
  show: boolean,
  options: UseTransitionOptions = {}
): UseFadeTransitionReturn => {
  const transition = useTransition(show, 'fade', options);
  
  const opacity = useMemo(() => {
    return transition.isVisible ? 1 : 0;
  }, [transition.isVisible]);

  return {
    ...transition,
    opacity,
  };
};

// === HOOK PARA SLIDE TRANSITION ===
export const useSlideTransition = (
  show: boolean,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  options: UseTransitionOptions = {}
): UseSlideTransitionReturn => {
  const type = `slide${direction.charAt(0).toUpperCase() + direction.slice(1)}` as TransitionType;
  const transition = useTransition(show, type, options);
  
  const transform = useMemo(() => {
    const progress = transition.isVisible ? 1 : 0;
    const offset = 20 * (1 - progress);
    
    switch (direction) {
      case 'up':
        return `translateY(${offset}px)`;
      case 'down':
        return `translateY(${-offset}px)`;
      case 'left':
        return `translateX(${offset}px)`;
      case 'right':
        return `translateX(${-offset}px)`;
      default:
        return 'translateY(0)';
    }
  }, [direction, transition.isVisible]);

  return {
    ...transition,
    transform,
  };
};

// === HOOK PARA SCALE TRANSITION ===
export const useScaleTransition = (
  show: boolean,
  options: UseTransitionOptions = {}
): UseScaleTransitionReturn => {
  const transition = useTransition(show, 'scale', options);
  
  const scale = useMemo(() => {
    return transition.isVisible ? 1 : 0.8;
  }, [transition.isVisible]);

  return {
    ...transition,
    scale,
  };
};

// === HOOK PARA MÚLTIPLAS TRANSIÇÕES ===
export const useMultipleTransitions = <T extends Record<string, boolean>>(
  states: T,
  type: TransitionType = 'fade',
  options: UseTransitionOptions = {}
): Record<keyof T, UseTransitionReturn> => {
  const transitions = {} as Record<keyof T, UseTransitionReturn>;
  
  Object.entries(states).forEach(([key, show]) => {
    transitions[key as keyof T] = useTransition(show as boolean, type, options);
  });
  
  return transitions;
};

// === HOOK PARA TRANSIÇÃO DE LISTA ===
export const useListTransition = <T>(
  items: T[],
  keyExtractor: (item: T) => string | number,
  options: UseTransitionOptions & {
    stagger?: number;
  } = {}
): {
  transitionItems: Array<{
    key: string | number;
    item: T;
    transition: UseTransitionReturn;
  }>;
  isAnyTransitioning: boolean;
} => {
  const { stagger = 50, ...transitionOptions } = options;
  
  const [transitionItems, setTransitionItems] = useState<Array<{
    key: string | number;
    item: T;
    transition: UseTransitionReturn;
  }>>([]);

  const [isAnyTransitioning, setIsAnyTransitioning] = useState(false);

  // Atualizar items com transições
  useEffect(() => {
    const newItems = items.map((item, index) => {
      const key = keyExtractor(item);
      const existingItem = transitionItems.find(ti => ti.key === key);
      
      if (existingItem) {
        return existingItem;
      }
      
      // Novo item - criar transição com delay baseado no stagger
      const delay = index * stagger;
      const transition = useTransition(true, 'slideUp', {
        ...transitionOptions,
        delay,
      });
      
      return { key, item, transition };
    });

    setTransitionItems(newItems);
  }, [items, keyExtractor, stagger, transitionOptions]);

  // Monitorar se alguma transição está ativa
  useEffect(() => {
    const anyTransitioning = transitionItems.some(ti => ti.transition.isTransitioning);
    setIsAnyTransitioning(anyTransitioning);
  }, [transitionItems]);

  return {
    transitionItems,
    isAnyTransitioning,
  };
};

// === HOOK PARA TRANSIÇÃO DE PÁGINA ===
export const usePageTransition = (
  currentPage: string,
  options: UseTransitionOptions = {}
): {
  displayPage: string;
  isTransitioning: boolean;
  transitionStyles: React.CSSProperties;
} => {
  const [displayPage, setDisplayPage] = useState(currentPage);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const { duration = 300 } = options;
  
  const transition = useTransition(true, 'fade', options);

  useEffect(() => {
    if (currentPage !== displayPage) {
      setIsTransitioning(true);
      
      // Fade out
      setTimeout(() => {
        setDisplayPage(currentPage);
        
        // Fade in
        setTimeout(() => {
          setIsTransitioning(false);
        }, duration / 2);
      }, duration / 2);
    }
  }, [currentPage, displayPage, duration]);

  return {
    displayPage,
    isTransitioning,
    transitionStyles: transition.styles,
  };
};

// === UTILITIES ===
export const createTransitionGroup = <T>(
  items: T[],
  keyExtractor: (item: T) => string | number,
  transitionConfig: TransitionConfig = {}
) => {
  const { duration = 300, delay = 0 } = transitionConfig;
  
  return items.map((item, index) => ({
    key: keyExtractor(item),
    item,
    style: {
      transition: `all ${duration}ms ease-out`,
      transitionDelay: `${delay + (index * 50)}ms`,
    },
  }));
};

export const getStaggeredDelay = (index: number, baseDelay: number = 0, stagger: number = 50): number => {
  return baseDelay + (index * stagger);
};

// === PRESETS DE TRANSIÇÃO ===
export const TRANSITION_PRESETS = {
  quick: { duration: 150, easing: 'ease-out' },
  normal: { duration: 300, easing: 'ease-out' },
  slow: { duration: 500, easing: 'ease-out' },
  bounce: { duration: 400, easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
  smooth: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
} as const;