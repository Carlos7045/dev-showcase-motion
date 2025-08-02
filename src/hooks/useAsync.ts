/**
 * useAsync - Hook para operações assíncronas
 * Sistema completo de gerenciamento de estados async com error handling e cache
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useMemoizedValue } from './useMemoizedValue';

// === TIPOS ===
export interface UseAsyncOptions<T> {
  /** Valor inicial */
  readonly initialValue?: T;
  /** Se deve executar imediatamente */
  readonly immediate?: boolean;
  /** Callback quando sucesso */
  readonly onSuccess?: (data: T) => void;
  /** Callback quando erro */
  readonly onError?: (error: Error) => void;
  /** Callback quando finaliza (sucesso ou erro) */
  readonly onFinally?: () => void;
  /** Timeout em ms */
  readonly timeout?: number;
  /** Número de tentativas */
  readonly retries?: number;
  /** Delay entre tentativas em ms */
  readonly retryDelay?: number;
  /** Se deve fazer cache do resultado */
  readonly cache?: boolean;
  /** Chave para cache */
  readonly cacheKey?: string;
  /** TTL do cache em ms */
  readonly cacheTTL?: number;
  /** Se deve cancelar requisições anteriores */
  readonly cancelPrevious?: boolean;
}

export interface UseAsyncReturn<T> {
  /** Dados retornados */
  readonly data: T | undefined;
  /** Estado de loading */
  readonly loading: boolean;
  /** Erro se houver */
  readonly error: Error | null;
  /** Função para executar */
  readonly execute: (...args: any[]) => Promise<T>;
  /** Função para resetar estado */
  readonly reset: () => void;
  /** Função para cancelar */
  readonly cancel: () => void;
  /** Se foi cancelado */
  readonly cancelled: boolean;
  /** Tentativa atual */
  readonly attempt: number;
  /** Se está fazendo retry */
  readonly retrying: boolean;
}

export interface UseAsyncMutationReturn<T, P = any> {
  /** Dados retornados */
  readonly data: T | undefined;
  /** Estado de loading */
  readonly loading: boolean;
  /** Erro se houver */
  readonly error: Error | null;
  /** Função para executar mutação */
  readonly mutate: (params: P) => Promise<T>;
  /** Função para resetar estado */
  readonly reset: () => void;
  /** Função para cancelar */
  readonly cancel: () => void;
  /** Se foi cancelado */
  readonly cancelled: boolean;
}

export interface UseAsyncListReturn<T> {
  /** Lista de dados */
  readonly data: T[];
  /** Estado de loading */
  readonly loading: boolean;
  /** Erro se houver */
  readonly error: Error | null;
  /** Função para recarregar */
  readonly reload: () => Promise<T[]>;
  /** Função para adicionar item */
  readonly addItem: (item: T) => void;
  /** Função para remover item */
  readonly removeItem: (predicate: (item: T) => boolean) => void;
  /** Função para atualizar item */
  readonly updateItem: (predicate: (item: T) => boolean, updates: Partial<T>) => void;
  /** Função para limpar lista */
  readonly clear: () => void;
}

// === CACHE GLOBAL ===
const asyncCache = new Map<string, {
  data: any;
  timestamp: number;
  ttl: number;
}>();

// === UTILITIES ===
const isSSR = typeof window === 'undefined';

const getCachedData = <T>(key: string, ttl: number): T | null => {
  if (isSSR) return null;
  
  const cached = asyncCache.get(key);
  if (!cached) return null;
  
  if (Date.now() - cached.timestamp > ttl) {
    asyncCache.delete(key);
    return null;
  }
  
  return cached.data;
};

const setCachedData = <T>(key: string, data: T, ttl: number): void => {
  if (isSSR) return;
  
  asyncCache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
};

const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// === HOOK PRINCIPAL ===
export const useAsync = <T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options: UseAsyncOptions<T> = {}
): UseAsyncReturn<T> => {
  const {
    initialValue,
    immediate = false,
    onSuccess,
    onError,
    onFinally,
    timeout = 0,
    retries = 0,
    retryDelay = 1000,
    cache = false,
    cacheKey,
    cacheTTL = 5 * 60 * 1000, // 5 minutos
    cancelPrevious = true,
  } = options;

  // Estados
  const [data, setData] = useState<T | undefined>(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [cancelled, setCancelled] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [retrying, setRetrying] = useState(false);

  // Refs
  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbacksRef = useRef({ onSuccess, onError, onFinally });

  // Atualizar callbacks
  callbacksRef.current = { onSuccess, onError, onFinally };

  // Chave de cache memoizada
  const finalCacheKey = useMemoizedValue(
    () => cacheKey || asyncFunction.toString(),
    [cacheKey, asyncFunction]
  );

  // Função para cancelar
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setCancelled(true);
    setLoading(false);
    setRetrying(false);
  }, []);

  // Função para resetar
  const reset = useCallback(() => {
    cancel();
    setData(initialValue);
    setError(null);
    setCancelled(false);
    setAttempt(0);
    setRetrying(false);
  }, [cancel, initialValue]);

  // Função para executar com retry
  const executeWithRetry = useCallback(
    async (args: any[], currentAttempt: number = 0): Promise<T> => {
      try {
        setAttempt(currentAttempt + 1);
        
        if (currentAttempt > 0) {
          setRetrying(true);
          await sleep(retryDelay * currentAttempt);
        }

        // Verificar cache
        if (cache && currentAttempt === 0) {
          const cachedData = getCachedData<T>(finalCacheKey, cacheTTL);
          if (cachedData !== null) {
            setData(cachedData);
            setLoading(false);
            setRetrying(false);
            callbacksRef.current.onSuccess?.(cachedData);
            callbacksRef.current.onFinally?.();
            return cachedData;
          }
        }

        // Criar AbortController
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        // Configurar timeout
        if (timeout > 0) {
          timeoutRef.current = setTimeout(() => {
            abortController.abort();
          }, timeout);
        }

        // Executar função
        const result = await asyncFunction(...args);

        // Verificar se foi cancelado
        if (abortController.signal.aborted) {
          throw new Error('Operation was cancelled');
        }

        // Limpar timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        // Salvar no cache
        if (cache) {
          setCachedData(finalCacheKey, result, cacheTTL);
        }

        // Atualizar estado
        setData(result);
        setError(null);
        setLoading(false);
        setRetrying(false);
        setCancelled(false);

        // Callbacks
        callbacksRef.current.onSuccess?.(result);
        callbacksRef.current.onFinally?.();

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));

        // Se foi cancelado, não fazer retry
        if (error.message.includes('cancelled') || error.name === 'AbortError') {
          setCancelled(true);
          setLoading(false);
          setRetrying(false);
          throw error;
        }

        // Tentar novamente se ainda há tentativas
        if (currentAttempt < retries) {
          return executeWithRetry(args, currentAttempt + 1);
        }

        // Falha final
        setError(error);
        setLoading(false);
        setRetrying(false);
        setCancelled(false);

        callbacksRef.current.onError?.(error);
        callbacksRef.current.onFinally?.();

        throw error;
      }
    },
    [asyncFunction, timeout, retries, retryDelay, cache, finalCacheKey, cacheTTL]
  );

  // Função para executar
  const execute = useCallback(
    async (...args: any[]): Promise<T> => {
      // Cancelar execução anterior se necessário
      if (cancelPrevious && loading) {
        cancel();
      }

      setLoading(true);
      setError(null);
      setCancelled(false);
      setAttempt(0);
      setRetrying(false);

      return executeWithRetry(args);
    },
    [executeWithRetry, cancelPrevious, loading, cancel]
  );

  // Execução imediata
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  // Cleanup
  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    cancel,
    cancelled,
    attempt,
    retrying,
  };
};

// === HOOK PARA MUTAÇÕES ===
export const useAsyncMutation = <T, P = any>(
  mutationFunction: (params: P) => Promise<T>,
  options: Omit<UseAsyncOptions<T>, 'immediate'> = {}
): UseAsyncMutationReturn<T, P> => {
  const asyncState = useAsync(mutationFunction, { ...options, immediate: false });

  const mutate = useCallback(
    async (params: P): Promise<T> => {
      return asyncState.execute(params);
    },
    [asyncState.execute]
  );

  return {
    data: asyncState.data,
    loading: asyncState.loading,
    error: asyncState.error,
    mutate,
    reset: asyncState.reset,
    cancel: asyncState.cancel,
    cancelled: asyncState.cancelled,
  };
};

// === HOOK PARA LISTAS ASSÍNCRONAS ===
export const useAsyncList = <T>(
  fetchFunction: () => Promise<T[]>,
  options: UseAsyncOptions<T[]> = {}
): UseAsyncListReturn<T> => {
  const asyncState = useAsync(fetchFunction, { ...options, initialValue: [] });

  const addItem = useCallback((item: T) => {
    asyncState.execute().then(currentData => {
      const newData = [...(currentData || []), item];
      // Atualizar cache se habilitado
      if (options.cache && options.cacheKey) {
        setCachedData(options.cacheKey, newData, options.cacheTTL || 5 * 60 * 1000);
      }
    });
  }, [asyncState, options.cache, options.cacheKey, options.cacheTTL]);

  const removeItem = useCallback((predicate: (item: T) => boolean) => {
    const currentData = asyncState.data || [];
    const newData = currentData.filter(item => !predicate(item));
    
    // Atualizar cache se habilitado
    if (options.cache && options.cacheKey) {
      setCachedData(options.cacheKey, newData, options.cacheTTL || 5 * 60 * 1000);
    }
  }, [asyncState.data, options.cache, options.cacheKey, options.cacheTTL]);

  const updateItem = useCallback((predicate: (item: T) => boolean, updates: Partial<T>) => {
    const currentData = asyncState.data || [];
    const newData = currentData.map(item => 
      predicate(item) ? { ...item, ...updates } : item
    );
    
    // Atualizar cache se habilitado
    if (options.cache && options.cacheKey) {
      setCachedData(options.cacheKey, newData, options.cacheTTL || 5 * 60 * 1000);
    }
  }, [asyncState.data, options.cache, options.cacheKey, options.cacheTTL]);

  const clear = useCallback(() => {
    // Limpar cache se habilitado
    if (options.cache && options.cacheKey) {
      asyncCache.delete(options.cacheKey);
    }
    asyncState.reset();
  }, [asyncState, options.cache, options.cacheKey]);

  return {
    data: asyncState.data || [],
    loading: asyncState.loading,
    error: asyncState.error,
    reload: asyncState.execute,
    addItem,
    removeItem,
    updateItem,
    clear,
  };
};

// === HOOK PARA MÚLTIPLAS OPERAÇÕES ASYNC ===
export const useMultipleAsync = <T extends Record<string, any>>(
  asyncFunctions: { [K in keyof T]: () => Promise<T[K]> },
  options: UseAsyncOptions<any> = {}
): {
  data: Partial<T>;
  loading: boolean;
  errors: Partial<Record<keyof T, Error>>;
  execute: () => Promise<T>;
  reset: () => void;
} => {
  const [data, setData] = useState<Partial<T>>({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof T, Error>>>({});

  const execute = useCallback(async (): Promise<T> => {
    setLoading(true);
    setErrors({});

    const results = {} as T;
    const newErrors = {} as Partial<Record<keyof T, Error>>;

    await Promise.allSettled(
      Object.entries(asyncFunctions).map(async ([key, fn]) => {
        try {
          results[key as keyof T] = await (fn as () => Promise<any>)();
        } catch (error) {
          newErrors[key as keyof T] = error instanceof Error ? error : new Error(String(error));
        }
      })
    );

    setData(results);
    setErrors(newErrors);
    setLoading(false);

    return results;
  }, [asyncFunctions]);

  const reset = useCallback(() => {
    setData({});
    setErrors({});
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    errors,
    execute,
    reset,
  };
};

// === UTILITIES ===
export const clearAsyncCache = (): void => {
  asyncCache.clear();
};

export const getAsyncCacheSize = (): number => {
  return asyncCache.size;
};

export const removeExpiredAsyncCache = (): number => {
  let removed = 0;
  const now = Date.now();
  
  for (const [key, value] of asyncCache.entries()) {
    if (now - value.timestamp > value.ttl) {
      asyncCache.delete(key);
      removed++;
    }
  }
  
  return removed;
};

// === HOOKS DE CONVENIÊNCIA ===
export const useFetch = <T>(url: string, options: RequestInit & UseAsyncOptions<T> = {}) => {
  const { immediate = true, ...asyncOptions } = options;
  
  const fetchFunction = useCallback(async (): Promise<T> => {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  }, [url, options]);

  return useAsync(fetchFunction, { ...asyncOptions, immediate });
};

export const useAsyncCallback = <T, P extends any[]>(
  asyncFunction: (...args: P) => Promise<T>,
  deps: React.DependencyList = []
) => {
  const memoizedFunction = useMemoizedValue(() => asyncFunction, deps);
  return useAsync(memoizedFunction, { immediate: false });
};