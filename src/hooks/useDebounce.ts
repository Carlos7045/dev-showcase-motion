/**
 * useDebounce - Hook para debounce e throttle
 * Sistema completo de otimização de performance para eventos frequentes
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useMemoizedValue } from './useMemoizedValue';

// === TIPOS ===
export interface DebounceOptions {
  /** Delay em milissegundos */
  readonly delay: number;
  /** Se deve executar na primeira chamada */
  readonly leading?: boolean;
  /** Se deve executar na última chamada */
  readonly trailing?: boolean;
  /** Valor máximo de espera */
  readonly maxWait?: number;
}

export interface ThrottleOptions {
  /** Delay em milissegundos */
  readonly delay: number;
  /** Se deve executar na primeira chamada */
  readonly leading?: boolean;
  /** Se deve executar na última chamada */
  readonly trailing?: boolean;
}

export interface UseDebouncedValueReturn<T> {
  /** Valor debounced */
  readonly debouncedValue: T;
  /** Se está pendente */
  readonly isPending: boolean;
  /** Função para cancelar o debounce */
  readonly cancel: () => void;
  /** Função para executar imediatamente */
  readonly flush: () => void;
}

export interface UseDebouncedCallbackReturn<T extends (...args: any[]) => any> {
  /** Função debounced */
  readonly debouncedCallback: T;
  /** Se está pendente */
  readonly isPending: boolean;
  /** Função para cancelar o debounce */
  readonly cancel: () => void;
  /** Função para executar imediatamente */
  readonly flush: () => void;
}

// === HOOK PARA DEBOUNCED VALUE ===
export const useDebouncedValue = <T>(
  value: T,
  delay: number = 300,
  options: Omit<DebounceOptions, 'delay'> = {}
): UseDebouncedValueReturn<T> => {
  const {
    leading = false,
    trailing = true,
    maxWait,
  } = options;

  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isPending, setIsPending] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallTimeRef = useRef<number>(0);
  const lastInvokeTimeRef = useRef<number>(0);
  const leadingRef = useRef(true);

  // Função para limpar timeouts
  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
      maxTimeoutRef.current = null;
    }
  }, []);

  // Função para executar a atualização
  const invokeUpdate = useCallback((newValue: T) => {
    setDebouncedValue(newValue);
    setIsPending(false);
    lastInvokeTimeRef.current = Date.now();
    leadingRef.current = true;
  }, []);

  // Função para cancelar
  const cancel = useCallback(() => {
    clearTimeouts();
    setIsPending(false);
    leadingRef.current = true;
  }, [clearTimeouts]);

  // Função para executar imediatamente
  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeouts();
      invokeUpdate(value);
    }
  }, [clearTimeouts, invokeUpdate, value]);

  // Efeito principal
  useEffect(() => {
    const now = Date.now();
    lastCallTimeRef.current = now;

    // Executar leading se habilitado
    if (leading && leadingRef.current) {
      leadingRef.current = false;
      invokeUpdate(value);
      return;
    }

    setIsPending(true);

    // Função para executar trailing
    const executeTrailing = () => {
      if (trailing) {
        invokeUpdate(value);
      } else {
        setIsPending(false);
      }
    };

    // Configurar timeout principal
    timeoutRef.current = setTimeout(executeTrailing, delay);

    // Configurar maxWait se definido
    if (maxWait && !maxTimeoutRef.current) {
      const timeSinceLastInvoke = now - lastInvokeTimeRef.current;
      const remainingWait = maxWait - timeSinceLastInvoke;

      if (remainingWait <= 0) {
        invokeUpdate(value);
      } else {
        maxTimeoutRef.current = setTimeout(() => {
          invokeUpdate(value);
          maxTimeoutRef.current = null;
        }, remainingWait);
      }
    }

    // Cleanup
    return clearTimeouts;
  }, [value, delay, leading, trailing, maxWait, invokeUpdate, clearTimeouts]);

  // Cleanup no unmount
  useEffect(() => {
    return clearTimeouts;
  }, [clearTimeouts]);

  return {
    debouncedValue,
    isPending,
    cancel,
    flush,
  };
};

// === HOOK PARA DEBOUNCED CALLBACK ===
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300,
  options: Omit<DebounceOptions, 'delay'> = {}
): UseDebouncedCallbackReturn<T> => {
  const {
    leading = false,
    trailing = true,
    maxWait,
  } = options;

  const [isPending, setIsPending] = useState(false);
  
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallTimeRef = useRef<number>(0);
  const lastInvokeTimeRef = useRef<number>(0);
  const lastArgsRef = useRef<Parameters<T>>();
  const leadingRef = useRef(true);

  // Atualizar callback ref
  callbackRef.current = callback;

  // Função para limpar timeouts
  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
      maxTimeoutRef.current = null;
    }
  }, []);

  // Função para executar o callback
  const invokeCallback = useCallback((...args: Parameters<T>) => {
    setIsPending(false);
    lastInvokeTimeRef.current = Date.now();
    leadingRef.current = true;
    return callbackRef.current(...args);
  }, []);

  // Função para cancelar
  const cancel = useCallback(() => {
    clearTimeouts();
    setIsPending(false);
    leadingRef.current = true;
  }, [clearTimeouts]);

  // Função para executar imediatamente
  const flush = useCallback(() => {
    if (timeoutRef.current && lastArgsRef.current) {
      clearTimeouts();
      return invokeCallback(...lastArgsRef.current);
    }
  }, [clearTimeouts, invokeCallback]);

  // Callback debounced
  const debouncedCallback = useMemoizedValue(
    () => {
      return ((...args: Parameters<T>) => {
        const now = Date.now();
        lastCallTimeRef.current = now;
        lastArgsRef.current = args;

        // Executar leading se habilitado
        if (leading && leadingRef.current) {
          leadingRef.current = false;
          return invokeCallback(...args);
        }

        setIsPending(true);

        // Limpar timeout anterior
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Função para executar trailing
        const executeTrailing = () => {
          if (trailing && lastArgsRef.current) {
            invokeCallback(...lastArgsRef.current);
          } else {
            setIsPending(false);
          }
        };

        // Configurar timeout principal
        timeoutRef.current = setTimeout(executeTrailing, delay);

        // Configurar maxWait se definido
        if (maxWait && !maxTimeoutRef.current) {
          const timeSinceLastInvoke = now - lastInvokeTimeRef.current;
          const remainingWait = maxWait - timeSinceLastInvoke;

          if (remainingWait <= 0) {
            return invokeCallback(...args);
          } else {
            maxTimeoutRef.current = setTimeout(() => {
              if (lastArgsRef.current) {
                invokeCallback(...lastArgsRef.current);
              }
              maxTimeoutRef.current = null;
            }, remainingWait);
          }
        }
      }) as T;
    },
    [delay, leading, trailing, maxWait, invokeCallback]
  );

  // Cleanup no unmount
  useEffect(() => {
    return clearTimeouts;
  }, [clearTimeouts]);

  return {
    debouncedCallback,
    isPending,
    cancel,
    flush,
  };
};

// === HOOK PARA THROTTLED CALLBACK ===
export const useThrottledCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300,
  options: Omit<ThrottleOptions, 'delay'> = {}
): UseDebouncedCallbackReturn<T> => {
  const {
    leading = true,
    trailing = true,
  } = options;

  const [isPending, setIsPending] = useState(false);
  
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallTimeRef = useRef<number>(0);
  const lastArgsRef = useRef<Parameters<T>>();

  // Atualizar callback ref
  callbackRef.current = callback;

  // Função para executar o callback
  const invokeCallback = useCallback((...args: Parameters<T>) => {
    lastCallTimeRef.current = Date.now();
    setIsPending(false);
    return callbackRef.current(...args);
  }, []);

  // Função para cancelar
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPending(false);
  }, []);

  // Função para executar imediatamente
  const flush = useCallback(() => {
    if (lastArgsRef.current) {
      cancel();
      return invokeCallback(...lastArgsRef.current);
    }
  }, [cancel, invokeCallback]);

  // Callback throttled
  const throttledCallback = useMemoizedValue(
    () => {
      return ((...args: Parameters<T>) => {
        const now = Date.now();
        lastArgsRef.current = args;

        const timeSinceLastCall = now - lastCallTimeRef.current;

        if (timeSinceLastCall >= delay) {
          // Pode executar imediatamente
          if (leading) {
            return invokeCallback(...args);
          }
        }

        // Não pode executar ainda
        if (!timeoutRef.current) {
          setIsPending(true);
          
          const remainingTime = delay - timeSinceLastCall;
          
          timeoutRef.current = setTimeout(() => {
            timeoutRef.current = null;
            if (trailing && lastArgsRef.current) {
              invokeCallback(...lastArgsRef.current);
            } else {
              setIsPending(false);
            }
          }, remainingTime);
        }
      }) as T;
    },
    [delay, leading, trailing, invokeCallback]
  );

  // Cleanup no unmount
  useEffect(() => {
    return cancel;
  }, [cancel]);

  return {
    debouncedCallback: throttledCallback,
    isPending,
    cancel,
    flush,
  };
};

// === HOOK PARA THROTTLED VALUE ===
export const useThrottledValue = <T>(
  value: T,
  delay: number = 300,
  options: Omit<ThrottleOptions, 'delay'> = {}
): T => {
  const [throttledValue, setThrottledValue] = useState(value);
  
  const { debouncedCallback } = useThrottledCallback(
    (newValue: T) => setThrottledValue(newValue),
    delay,
    options
  );

  useEffect(() => {
    debouncedCallback(value);
  }, [value, debouncedCallback]);

  return throttledValue;
};

// === HOOKS DE CONVENIÊNCIA ===
export const useDebounce = <T>(value: T, delay: number = 300): T => {
  const { debouncedValue } = useDebouncedValue(value, delay);
  return debouncedValue;
};

export const useThrottle = <T>(value: T, delay: number = 300): T => {
  return useThrottledValue(value, delay);
};

// === HOOK PARA SEARCH DEBOUNCED ===
export const useDebouncedSearch = (
  initialValue: string = '',
  delay: number = 300
): {
  searchTerm: string;
  debouncedSearchTerm: string;
  setSearchTerm: (term: string) => void;
  isSearching: boolean;
  clearSearch: () => void;
} => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const { debouncedValue: debouncedSearchTerm, isPending } = useDebouncedValue(
    searchTerm,
    delay
  );

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return {
    searchTerm,
    debouncedSearchTerm,
    setSearchTerm,
    isSearching: isPending,
    clearSearch,
  };
};

// === UTILITIES ===
export const createDebouncedFunction = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  options: DebounceOptions = {}
): T & { cancel: () => void; flush: () => void } => {
  const {
    leading = false,
    trailing = true,
    maxWait,
  } = options;

  let timeoutId: NodeJS.Timeout | null = null;
  let maxTimeoutId: NodeJS.Timeout | null = null;
  let lastCallTime = 0;
  let lastInvokeTime = 0;
  let lastArgs: Parameters<T>;
  let leadingFlag = true;

  const clearTimeouts = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (maxTimeoutId) {
      clearTimeout(maxTimeoutId);
      maxTimeoutId = null;
    }
  };

  const invokeFunc = (...args: Parameters<T>) => {
    lastInvokeTime = Date.now();
    leadingFlag = true;
    return func(...args);
  };

  const debouncedFunc = ((...args: Parameters<T>) => {
    const now = Date.now();
    lastCallTime = now;
    lastArgs = args;

    if (leading && leadingFlag) {
      leadingFlag = false;
      return invokeFunc(...args);
    }

    clearTimeouts();

    const executeTrailing = () => {
      if (trailing) {
        invokeFunc(...lastArgs);
      }
    };

    timeoutId = setTimeout(executeTrailing, delay);

    if (maxWait) {
      const timeSinceLastInvoke = now - lastInvokeTime;
      const remainingWait = maxWait - timeSinceLastInvoke;

      if (remainingWait <= 0) {
        return invokeFunc(...args);
      } else if (!maxTimeoutId) {
        maxTimeoutId = setTimeout(() => {
          invokeFunc(...lastArgs);
          maxTimeoutId = null;
        }, remainingWait);
      }
    }
  }) as T & { cancel: () => void; flush: () => void };

  debouncedFunc.cancel = () => {
    clearTimeouts();
    leadingFlag = true;
  };

  debouncedFunc.flush = () => {
    if (timeoutId) {
      clearTimeouts();
      return invokeFunc(...lastArgs);
    }
  };

  return debouncedFunc;
};