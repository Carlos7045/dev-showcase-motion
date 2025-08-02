/**
 * useMemoizedValue - Hook para memoização otimizada
 * Utilities para memoização inteligente de valores e computações
 */

import { 
  useMemo, 
  useCallback, 
  useRef, 
  DependencyList,
  EffectCallback,
  useEffect
} from 'react';

// === TIPOS ===
export type MemoizedValueOptions = {
  /** Se deve usar deep comparison para dependências */
  readonly deepCompare?: boolean;
  /** Timeout para invalidar cache (ms) */
  readonly ttl?: number;
  /** Se deve debuggar mudanças */
  readonly debug?: boolean;
};

export type ComputationFunction<T> = () => T;
export type AsyncComputationFunction<T> = () => Promise<T>;

// === CACHE GLOBAL ===
const globalCache = new Map<string, {
  value: any;
  timestamp: number;
  ttl?: number;
}>();

// === UTILITIES ===
const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  
  if (a == null || b == null) return a === b;
  
  if (typeof a !== typeof b) return false;
  
  if (typeof a !== 'object') return a === b;
  
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  }
  
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  return keysA.every(key => deepEqual(a[key], b[key]));
};

const createDepsKey = (deps: DependencyList): string => {
  return JSON.stringify(deps);
};

// === HOOK PRINCIPAL ===
export const useMemoizedValue = <T>(
  computation: ComputationFunction<T>,
  deps: DependencyList,
  options: MemoizedValueOptions = {}
): T => {
  const { deepCompare = false, ttl, debug = false } = options;
  
  const prevDepsRef = useRef<DependencyList>();
  const cacheKeyRef = useRef<string>();
  
  // Comparar dependências
  const depsChanged = useMemo(() => {
    const prevDeps = prevDepsRef.current;
    
    if (!prevDeps) return true;
    
    if (prevDeps.length !== deps.length) return true;
    
    if (deepCompare) {
      return !deepEqual(prevDeps, deps);
    }
    
    return deps.some((dep, index) => dep !== prevDeps[index]);
  }, [deps, deepCompare]);
  
  // Memoizar valor
  const memoizedValue = useMemo(() => {
    if (debug) {
      console.debug('useMemoizedValue: Computing new value', { deps, depsChanged });
    }
    
    // Verificar cache global se TTL está definido
    if (ttl && cacheKeyRef.current) {
      const cached = globalCache.get(cacheKeyRef.current);
      if (cached && Date.now() - cached.timestamp < ttl) {
        if (debug) {
          console.debug('useMemoizedValue: Using cached value');
        }
        return cached.value;
      }
    }
    
    const value = computation();
    
    // Salvar no cache global se TTL está definido
    if (ttl) {
      const cacheKey = createDepsKey(deps);
      cacheKeyRef.current = cacheKey;
      globalCache.set(cacheKey, {
        value,
        timestamp: Date.now(),
        ttl
      });
    }
    
    prevDepsRef.current = deps;
    return value;
  }, [computation, deps, depsChanged, ttl, debug]);
  
  return memoizedValue;
};

// === HOOK PARA MEMOIZAÇÃO ASYNC ===
export const useAsyncMemoizedValue = <T>(
  computation: AsyncComputationFunction<T>,
  deps: DependencyList,
  options: MemoizedValueOptions & {
    readonly initialValue?: T;
    readonly onError?: (error: Error) => void;
  } = {}
): {
  value: T | undefined;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} => {
  const { initialValue, onError, ...memoOptions } = options;
  
  const [state, setState] = React.useState<{
    value: T | undefined;
    loading: boolean;
    error: Error | null;
  }>({
    value: initialValue,
    loading: false,
    error: null
  });
  
  const computationRef = useRef(computation);
  computationRef.current = computation;
  
  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const value = await computationRef.current();
      setState({ value, loading: false, error: null });
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      setState(prev => ({ ...prev, loading: false, error: err }));
      onError?.(err);
    }
  }, [onError]);
  
  // Executar quando dependências mudarem
  useMemoizedValue(
    () => {
      execute();
      return null;
    },
    deps,
    memoOptions
  );
  
  return {
    ...state,
    refetch: execute
  };
};

// === HOOK PARA MEMOIZAÇÃO DE CALLBACKS ===
export const useMemoizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList,
  options: MemoizedValueOptions = {}
): T => {
  return useMemoizedValue(
    () => callback,
    deps,
    options
  ) as T;
};

// === HOOK PARA MEMOIZAÇÃO DE OBJETOS ===
export const useMemoizedObject = <T extends Record<string, any>>(
  factory: () => T,
  deps: DependencyList,
  options: MemoizedValueOptions = {}
): T => {
  return useMemoizedValue(
    factory,
    deps,
    { deepCompare: true, ...options }
  );
};

// === HOOK PARA MEMOIZAÇÃO DE ARRAYS ===
export const useMemoizedArray = <T>(
  factory: () => T[],
  deps: DependencyList,
  options: MemoizedValueOptions = {}
): T[] => {
  return useMemoizedValue(
    factory,
    deps,
    { deepCompare: true, ...options }
  );
};

// === HOOK PARA MEMOIZAÇÃO COM SELECTOR ===
export const useMemoizedSelector = <TState, TSelected>(
  state: TState,
  selector: (state: TState) => TSelected,
  options: MemoizedValueOptions = {}
): TSelected => {
  return useMemoizedValue(
    () => selector(state),
    [state],
    { deepCompare: true, ...options }
  );
};

// === HOOK PARA MEMOIZAÇÃO CONDICIONAL ===
export const useConditionalMemo = <T>(
  computation: ComputationFunction<T>,
  deps: DependencyList,
  condition: boolean,
  fallback?: T
): T | undefined => {
  const memoizedValue = useMemoizedValue(
    computation,
    [...deps, condition],
    { debug: false }
  );
  
  return condition ? memoizedValue : fallback;
};

// === HOOK PARA DEBOUNCED MEMO ===
export const useDebouncedMemo = <T>(
  computation: ComputationFunction<T>,
  deps: DependencyList,
  delay: number = 300
): T | undefined => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(computation());
    }, delay);
    
    return () => clearTimeout(timer);
  }, [...deps, delay]);
  
  return debouncedValue;
};

// === HOOK PARA MEMOIZAÇÃO COM INVALIDAÇÃO ===
export const useInvalidatableMemo = <T>(
  computation: ComputationFunction<T>,
  deps: DependencyList
): [T, () => void] => {
  const [invalidationKey, setInvalidationKey] = React.useState(0);
  
  const memoizedValue = useMemoizedValue(
    computation,
    [...deps, invalidationKey]
  );
  
  const invalidate = useCallback(() => {
    setInvalidationKey(prev => prev + 1);
  }, []);
  
  return [memoizedValue, invalidate];
};

// === UTILITIES DE CACHE ===
export const clearGlobalCache = (): void => {
  globalCache.clear();
};

export const getCacheSize = (): number => {
  return globalCache.size;
};

export const getCacheStats = (): {
  size: number;
  entries: Array<{ key: string; age: number; ttl?: number }>;
} => {
  const now = Date.now();
  const entries = Array.from(globalCache.entries()).map(([key, value]) => ({
    key: key.slice(0, 50) + (key.length > 50 ? '...' : ''),
    age: now - value.timestamp,
    ttl: value.ttl
  }));
  
  return {
    size: globalCache.size,
    entries
  };
};

// === CLEANUP DE CACHE EXPIRADO ===
export const cleanupExpiredCache = (): number => {
  const now = Date.now();
  let cleaned = 0;
  
  for (const [key, value] of globalCache.entries()) {
    if (value.ttl && now - value.timestamp > value.ttl) {
      globalCache.delete(key);
      cleaned++;
    }
  }
  
  return cleaned;
};

// === AUTO CLEANUP ===
if (typeof window !== 'undefined') {
  // Cleanup automático a cada 5 minutos
  setInterval(cleanupExpiredCache, 5 * 60 * 1000);
}