/**
 * useIntersectionObserver - Hook para Intersection Observer
 * Utilities para detectar quando elementos entram na viewport
 */

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useMemoizedValue } from './useMemoizedValue';

// === TIPOS ===
export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** Se deve observar apenas uma vez */
  readonly once?: boolean;
  /** Se deve iniciar observando imediatamente */
  readonly enabled?: boolean;
  /** Callback quando o estado de intersecção muda */
  readonly onChange?: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;
  /** Callback quando entra na viewport */
  readonly onEnter?: (entry: IntersectionObserverEntry) => void;
  /** Callback quando sai da viewport */
  readonly onLeave?: (entry: IntersectionObserverEntry) => void;
}

export interface UseIntersectionObserverReturn {
  /** Ref para anexar ao elemento */
  readonly ref: React.RefObject<Element>;
  /** Se o elemento está intersectando */
  readonly isIntersecting: boolean;
  /** Se o elemento já intersectou pelo menos uma vez */
  readonly hasIntersected: boolean;
  /** Entry do intersection observer */
  readonly entry: IntersectionObserverEntry | null;
  /** Função para reconectar o observer */
  readonly reconnect: () => void;
  /** Função para desconectar o observer */
  readonly disconnect: () => void;
}

// === HOOK PRINCIPAL ===
export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn => {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    once = false,
    enabled = true,
    onChange,
    onEnter,
    onLeave,
  } = options;

  // Estados
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  // Refs
  const elementRef = useRef<Element>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const callbacksRef = useRef({ onChange, onEnter, onLeave });

  // Atualizar callbacks
  callbacksRef.current = { onChange, onEnter, onLeave };

  // Opções memoizadas
  const observerOptions = useMemoizedValue(
    () => ({ root, rootMargin, threshold }),
    [root, rootMargin, threshold]
  );

  // Callback do observer
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [currentEntry] = entries;
      if (!currentEntry) return;

      const { isIntersecting: currentlyIntersecting } = currentEntry;
      
      setEntry(currentEntry);
      setIsIntersecting(currentlyIntersecting);

      // Marcar como intersectado se entrou na viewport
      if (currentlyIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }

      // Chamar callbacks
      const { onChange, onEnter, onLeave } = callbacksRef.current;
      
      onChange?.(currentlyIntersecting, currentEntry);
      
      if (currentlyIntersecting) {
        onEnter?.(currentEntry);
      } else {
        onLeave?.(currentEntry);
      }

      // Desconectar se for "once" e já intersectou
      if (once && currentlyIntersecting && observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    },
    [hasIntersected, once]
  );

  // Função para conectar o observer
  const connect = useCallback(() => {
    const element = elementRef.current;
    if (!element || !enabled) return;

    // Desconectar observer anterior se existir
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Criar novo observer
    observerRef.current = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // Observar elemento
    observerRef.current.observe(element);
  }, [enabled, handleIntersection, observerOptions]);

  // Função para desconectar o observer
  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  // Função para reconectar
  const reconnect = useCallback(() => {
    disconnect();
    connect();
  }, [disconnect, connect]);

  // Efeito para conectar/desconectar
  useEffect(() => {
    connect();
    return disconnect;
  }, [connect, disconnect]);

  // Cleanup no unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    ref: elementRef,
    isIntersecting,
    hasIntersected,
    entry,
    reconnect,
    disconnect,
  };
};

// === HOOK PARA MÚLTIPLOS ELEMENTOS ===
export const useMultipleIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): {
  observe: (element: Element, id: string) => void;
  unobserve: (element: Element) => void;
  intersecting: Set<string>;
  entries: Map<string, IntersectionObserverEntry>;
  disconnect: () => void;
} => {
  const [intersecting, setIntersecting] = useState<Set<string>>(new Set());
  const [entries, setEntries] = useState<Map<string, IntersectionObserverEntry>>(new Map());
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Map<Element, string>>(new Map());
  const callbacksRef = useRef(options);

  // Atualizar callbacks
  callbacksRef.current = options;

  // Callback do observer
  const handleIntersection = useCallback(
    (observerEntries: IntersectionObserverEntry[]) => {
      const newIntersecting = new Set(intersecting);
      const newEntries = new Map(entries);

      observerEntries.forEach((entry) => {
        const id = elementsRef.current.get(entry.target);
        if (!id) return;

        newEntries.set(id, entry);

        if (entry.isIntersecting) {
          newIntersecting.add(id);
        } else {
          newIntersecting.delete(id);
        }

        // Chamar callbacks
        const { onChange, onEnter, onLeave } = callbacksRef.current;
        
        onChange?.(entry.isIntersecting, entry);
        
        if (entry.isIntersecting) {
          onEnter?.(entry);
        } else {
          onLeave?.(entry);
        }
      });

      setIntersecting(newIntersecting);
      setEntries(newEntries);
    },
    [intersecting, entries]
  );

  // Criar observer
  useEffect(() => {
    const { root, rootMargin, threshold } = options;
    
    observerRef.current = new IntersectionObserver(
      handleIntersection,
      { root, rootMargin, threshold }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection, options]);

  // Função para observar elemento
  const observe = useCallback((element: Element, id: string) => {
    if (!observerRef.current) return;

    elementsRef.current.set(element, id);
    observerRef.current.observe(element);
  }, []);

  // Função para parar de observar elemento
  const unobserve = useCallback((element: Element) => {
    if (!observerRef.current) return;

    const id = elementsRef.current.get(element);
    if (id) {
      elementsRef.current.delete(element);
      setIntersecting(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      setEntries(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
    }

    observerRef.current.unobserve(element);
  }, []);

  // Função para desconectar tudo
  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    elementsRef.current.clear();
    setIntersecting(new Set());
    setEntries(new Map());
  }, []);

  return {
    observe,
    unobserve,
    intersecting,
    entries,
    disconnect,
  };
};

// === HOOK PARA LAZY LOADING ===
export const useLazyLoading = (
  options: UseIntersectionObserverOptions = {}
): {
  ref: React.RefObject<Element>;
  shouldLoad: boolean;
  isVisible: boolean;
} => {
  const { isIntersecting, hasIntersected, ref } = useIntersectionObserver({
    rootMargin: '50px',
    threshold: 0.1,
    once: true,
    ...options,
  });

  return {
    ref,
    shouldLoad: hasIntersected,
    isVisible: isIntersecting,
  };
};

// === HOOK PARA ANIMAÇÕES ON SCROLL ===
export const useScrollAnimation = (
  options: UseIntersectionObserverOptions & {
    animationClass?: string;
    delay?: number;
  } = {}
): {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
  shouldAnimate: boolean;
} => {
  const { animationClass = 'animate-fade-in', delay = 0 } = options;
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const { ref, isIntersecting, hasIntersected } = useIntersectionObserver({
    rootMargin: '100px',
    threshold: 0.1,
    once: true,
    ...options,
    onEnter: (entry) => {
      if (delay > 0) {
        setTimeout(() => setShouldAnimate(true), delay);
      } else {
        setShouldAnimate(true);
      }
      options.onEnter?.(entry);
    },
  });

  // Aplicar classe de animação
  useEffect(() => {
    const element = ref.current;
    if (!element || !shouldAnimate) return;

    element.classList.add(animationClass);

    return () => {
      element.classList.remove(animationClass);
    };
  }, [shouldAnimate, animationClass, ref]);

  return {
    ref: ref as React.RefObject<HTMLElement>,
    isVisible: isIntersecting,
    shouldAnimate: shouldAnimate && hasIntersected,
  };
};

// === HOOK PARA PARALLAX ===
export const useParallax = (
  speed: number = 0.5,
  options: UseIntersectionObserverOptions = {}
): {
  ref: React.RefObject<HTMLElement>;
  transform: string;
} => {
  const [transform, setTransform] = useState('translateY(0px)');
  const { ref, isIntersecting } = useIntersectionObserver({
    rootMargin: '200px',
    ...options,
  });

  useEffect(() => {
    if (!isIntersecting) return;

    const handleScroll = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;

      setTransform(`translateY(${rate}px)`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Calcular posição inicial

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isIntersecting, speed, ref]);

  return {
    ref: ref as React.RefObject<HTMLElement>,
    transform,
  };
};

// === HOOK PARA CONTAGEM DE VISUALIZAÇÕES ===
export const useViewTracking = (
  onView: (duration: number) => void,
  options: UseIntersectionObserverOptions & {
    minViewTime?: number;
  } = {}
): {
  ref: React.RefObject<Element>;
  viewCount: number;
  totalViewTime: number;
} => {
  const { minViewTime = 1000 } = options;
  const [viewCount, setViewCount] = useState(0);
  const [totalViewTime, setTotalViewTime] = useState(0);
  
  const viewStartTime = useRef<number | null>(null);

  const { ref } = useIntersectionObserver({
    threshold: 0.5,
    ...options,
    onEnter: () => {
      viewStartTime.current = Date.now();
    },
    onLeave: () => {
      if (viewStartTime.current) {
        const duration = Date.now() - viewStartTime.current;
        
        if (duration >= minViewTime) {
          setViewCount(prev => prev + 1);
          setTotalViewTime(prev => prev + duration);
          onView(duration);
        }
        
        viewStartTime.current = null;
      }
    },
  });

  return {
    ref,
    viewCount,
    totalViewTime,
  };
};

// === UTILITIES ===
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  return new IntersectionObserver(callback, {
    rootMargin: '0px',
    threshold: 0,
    ...options,
  });
};

export const isInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};