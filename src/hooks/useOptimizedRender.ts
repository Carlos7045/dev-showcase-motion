/**
 * useOptimizedRender - Hook para otimização de re-renders
 * Utilities para prevenir re-renders desnecessários
 */

import { 
  useRef, 
  useCallback, 
  useMemo,
  DependencyList,
  MutableRefObject
} from 'react';

// === TIPOS ===
export type RenderOptimizationOptions = {
  /** Se deve debuggar re-renders */
  readonly debug?: boolean;
  /** Nome do componente para debug */
  readonly componentName?: string;
  /** Se deve usar shallow comparison */
  readonly shallow?: boolean;
};

export type StableCallback<T extends (...args: any[]) => any> = T;
export type StableValue<T> = T;

// === UTILITIES ===
const shallowEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  
  if (typeof a !== 'object' || typeof b !== 'object' || a == null || b == null) {
    return a === b;
  }
  
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  return keysA.every(key => a[key] === b[key]);
};

// === HOOK PARA CALLBACK ESTÁVEL ===
export const useStableCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps?: DependencyList
): StableCallback<T> => {
  const callbackRef = useRef(callback);
  const depsRef = useRef(deps);
  
  // Atualizar callback se dependências mudaram
  if (deps && (!depsRef.current || !shallowEqual(deps, depsRef.current))) {
    callbackRef.current = callback;
    depsRef.current = deps;
  } else if (!deps) {
    callbackRef.current = callback;
  }
  
  // Retornar callback estável
  return useCallback((...args: Parameters<T>) => {
    return callbackRef.current(...args);
  }, []) as StableCallback<T>;
};

// === HOOK PARA VALOR ESTÁVEL ===
export const useStableValue = <T>(
  value: T,
  options: RenderOptimizationOptions = {}
): StableValue<T> => {
  const { shallow = false, debug = false, componentName = 'Unknown' } = options;
  
  const valueRef = useRef(value);
  const renderCountRef = useRef(0);
  
  // Incrementar contador de renders para debug
  if (debug) {
    renderCountRef.current++;
  }
  
  const hasChanged = useMemo(() => {
    const changed = shallow 
      ? !shallowEqual(valueRef.current, value)
      : valueRef.current !== value;
    
    if (debug && changed) {
      console.debug(`useStableValue [${componentName}]: Value changed`, {
        old: valueRef.current,
        new: value,
        renderCount: renderCountRef.current
      });
    }
    
    return changed;
  }, [value, shallow, debug, componentName]);
  
  if (hasChanged) {
    valueRef.current = value;
  }
  
  return valueRef.current;
};

// === HOOK PARA PROPS ESTÁVEIS ===
export const useStableProps = <T extends Record<string, any>>(
  props: T,
  options: RenderOptimizationOptions = {}
): StableValue<T> => {
  return useStableValue(props, { shallow: true, ...options });
};

// === HOOK PARA PREVENIR RE-RENDERS ===
export const useRenderPrevention = <T>(
  value: T,
  equalityFn?: (a: T, b: T) => boolean
): T => {
  const valueRef = useRef(value);
  
  const isEqual = equalityFn 
    ? equalityFn(valueRef.current, value)
    : valueRef.current === value;
  
  if (!isEqual) {
    valueRef.current = value;
  }
  
  return valueRef.current;
};

// === HOOK PARA MEMOIZAÇÃO DE COMPONENTES FILHOS ===
export const useChildrenMemo = (
  children: React.ReactNode,
  deps: DependencyList = []
): React.ReactNode => {
  return useMemo(() => children, deps);
};

// === HOOK PARA OTIMIZAÇÃO DE HANDLERS ===
export const useOptimizedHandlers = <T extends Record<string, (...args: any[]) => any>>(
  handlers: T,
  deps: DependencyList = []
): T => {
  return useMemo(() => {
    const optimizedHandlers = {} as T;
    
    for (const [key, handler] of Object.entries(handlers)) {
      optimizedHandlers[key as keyof T] = useCallback(handler, deps) as T[keyof T];
    }
    
    return optimizedHandlers;
  }, [handlers, deps]);
};

// === HOOK PARA TRACKING DE RE-RENDERS ===
export const useRenderTracker = (
  componentName: string,
  props?: Record<string, any>
): void => {
  const renderCountRef = useRef(0);
  const prevPropsRef = useRef(props);
  
  renderCountRef.current++;
  
  if (process.env.NODE_ENV === 'development') {
    const changedProps: string[] = [];
    
    if (props && prevPropsRef.current) {
      for (const [key, value] of Object.entries(props)) {
        if (prevPropsRef.current[key] !== value) {
          changedProps.push(key);
        }
      }
    }
    
    console.debug(`[${componentName}] Render #${renderCountRef.current}`, {
      changedProps: changedProps.length > 0 ? changedProps : 'none',
      props: props ? Object.keys(props) : 'none'
    });
    
    prevPropsRef.current = props;
  }
};

// === HOOK PARA LAZY INITIALIZATION ===
export const useLazyInitialization = <T>(
  initializer: () => T
): T => {
  const [value] = React.useState(initializer);
  return value;
};

// === HOOK PARA MEMOIZAÇÃO CONDICIONAL ===
export const useConditionalMemo = <T>(
  factory: () => T,
  deps: DependencyList,
  condition: boolean
): T | undefined => {
  const memoizedValue = useMemo(() => {
    return condition ? factory() : undefined;
  }, [...deps, condition]);
  
  return memoizedValue;
};

// === HOOK PARA OTIMIZAÇÃO DE LISTAS ===
export const useOptimizedList = <T>(
  items: T[],
  keyExtractor: (item: T, index: number) => string | number,
  options: RenderOptimizationOptions = {}
): Array<{ key: string | number; item: T; index: number }> => {
  const { debug = false, componentName = 'List' } = options;
  
  return useMemo(() => {
    if (debug) {
      console.debug(`useOptimizedList [${componentName}]: Recomputing list`, {
        itemCount: items.length
      });
    }
    
    return items.map((item, index) => ({
      key: keyExtractor(item, index),
      item,
      index
    }));
  }, [items, keyExtractor, debug, componentName]);
};

// === HOOK PARA DEBOUNCED VALUES ===
export const useDebouncedValue = <T>(
  value: T,
  delay: number = 300
): T => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
};

// === HOOK PARA THROTTLED VALUES ===
export const useThrottledValue = <T>(
  value: T,
  delay: number = 300
): T => {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastExecuted = useRef(Date.now());
  
  React.useEffect(() => {
    const now = Date.now();
    
    if (now - lastExecuted.current >= delay) {
      setThrottledValue(value);
      lastExecuted.current = now;
    } else {
      const timer = setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }, delay - (now - lastExecuted.current));
      
      return () => clearTimeout(timer);
    }
  }, [value, delay]);
  
  return throttledValue;
};

// === HOOK PARA MEMOIZAÇÃO DE REFS ===
export const useMemoizedRef = <T>(
  initialValue?: T
): MutableRefObject<T | undefined> => {
  return useMemo(() => ({ current: initialValue }), []);
};

// === HOOK PARA OTIMIZAÇÃO DE CONTEXT VALUES ===
export const useOptimizedContextValue = <T extends Record<string, any>>(
  value: T
): T => {
  const stableValue = useStableValue(value, { shallow: true });
  
  return useMemo(() => stableValue, [stableValue]);
};

// === UTILITIES DE PERFORMANCE ===
export const measureRenderTime = (componentName: string) => {
  if (process.env.NODE_ENV === 'development') {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (renderTime > 16) { // Mais que um frame (60fps)
        console.warn(`[${componentName}] Slow render: ${renderTime.toFixed(2)}ms`);
      }
    };
  }
  
  return () => {};
};

// === HOOK PARA PERFORMANCE MONITORING ===
export const usePerformanceMonitor = (
  componentName: string,
  enabled: boolean = process.env.NODE_ENV === 'development'
): void => {
  const renderStartTime = useRef<number>();
  
  if (enabled) {
    renderStartTime.current = performance.now();
    
    React.useEffect(() => {
      if (renderStartTime.current) {
        const renderTime = performance.now() - renderStartTime.current;
        
        if (renderTime > 16) {
          console.warn(`[${componentName}] Slow render: ${renderTime.toFixed(2)}ms`);
        }
      }
    });
  }
};