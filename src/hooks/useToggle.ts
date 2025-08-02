/**
 * useToggle - Hook para estados booleanos
 * Sistema completo de gerenciamento de estados toggle com funcionalidades avançadas
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { useMemoizedValue } from './useMemoizedValue';

// === TIPOS ===
export interface UseToggleOptions {
  /** Valor inicial */
  readonly defaultValue?: boolean;
  /** Callback quando o valor muda */
  readonly onChange?: (value: boolean) => void;
  /** Se deve persistir no localStorage */
  readonly persist?: boolean;
  /** Chave para localStorage */
  readonly persistKey?: string;
  /** Se deve debounce as mudanças */
  readonly debounce?: number;
  /** Se deve permitir toggle durante loading */
  readonly allowToggleDuringLoading?: boolean;
}

export interface UseToggleReturn {
  /** Valor atual */
  readonly value: boolean;
  /** Função para alternar */
  readonly toggle: () => void;
  /** Função para definir como true */
  readonly setTrue: () => void;
  /** Função para definir como false */
  readonly setFalse: () => void;
  /** Função para definir valor específico */
  readonly setValue: (value: boolean) => void;
  /** Se está em loading (para debounce) */
  readonly isLoading: boolean;
}

export interface UseMultiToggleReturn<T extends Record<string, boolean>> {
  /** Valores atuais */
  readonly values: T;
  /** Função para alternar um valor específico */
  readonly toggle: (key: keyof T) => void;
  /** Função para definir um valor específico */
  readonly setValue: (key: keyof T, value: boolean) => void;
  /** Função para definir múltiplos valores */
  readonly setValues: (updates: Partial<T>) => void;
  /** Função para resetar todos os valores */
  readonly reset: () => void;
  /** Função para alternar todos os valores */
  readonly toggleAll: () => void;
  /** Se todos estão true */
  readonly allTrue: boolean;
  /** Se todos estão false */
  readonly allFalse: boolean;
  /** Quantidade de valores true */
  readonly trueCount: number;
}

// === HOOK PRINCIPAL ===
export const useToggle = (
  initialValue: boolean = false,
  options: UseToggleOptions = {}
): UseToggleReturn => {
  const {
    defaultValue = initialValue,
    onChange,
    persist = false,
    persistKey = 'toggle',
    debounce = 0,
    allowToggleDuringLoading = true,
  } = options;

  // Estado inicial (com persistência se habilitada)
  const getInitialValue = (): boolean => {
    if (persist && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(persistKey);
        return stored !== null ? JSON.parse(stored) : defaultValue;
      } catch {
        return defaultValue;
      }
    }
    return defaultValue;
  };

  const [value, setValue] = useState(getInitialValue);
  const [isLoading, setIsLoading] = useState(false);
  
  const onChangeRef = useRef(onChange);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Atualizar callback ref
  onChangeRef.current = onChange;

  // Função para persistir valor
  const persistValue = useCallback(
    (newValue: boolean) => {
      if (persist && typeof window !== 'undefined') {
        try {
          localStorage.setItem(persistKey, JSON.stringify(newValue));
        } catch (error) {
          console.warn('Failed to persist toggle value:', error);
        }
      }
    },
    [persist, persistKey]
  );

  // Função para atualizar valor
  const updateValue = useCallback(
    (newValue: boolean) => {
      if (debounce > 0) {
        setIsLoading(true);
        
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
        
        debounceTimeoutRef.current = setTimeout(() => {
          setValue(newValue);
          persistValue(newValue);
          onChangeRef.current?.(newValue);
          setIsLoading(false);
        }, debounce);
      } else {
        setValue(newValue);
        persistValue(newValue);
        onChangeRef.current?.(newValue);
      }
    },
    [debounce, persistValue]
  );

  // Função para alternar
  const toggle = useCallback(() => {
    if (!allowToggleDuringLoading && isLoading) return;
    updateValue(!value);
  }, [value, updateValue, allowToggleDuringLoading, isLoading]);

  // Função para definir como true
  const setTrue = useCallback(() => {
    if (!allowToggleDuringLoading && isLoading) return;
    updateValue(true);
  }, [updateValue, allowToggleDuringLoading, isLoading]);

  // Função para definir como false
  const setFalse = useCallback(() => {
    if (!allowToggleDuringLoading && isLoading) return;
    updateValue(false);
  }, [updateValue, allowToggleDuringLoading, isLoading]);

  // Função para definir valor específico
  const setValueCallback = useCallback(
    (newValue: boolean) => {
      if (!allowToggleDuringLoading && isLoading) return;
      updateValue(newValue);
    },
    [updateValue, allowToggleDuringLoading, isLoading]
  );

  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue: setValueCallback,
    isLoading,
  };
};

// === HOOK PARA MÚLTIPLOS TOGGLES ===
export const useMultiToggle = <T extends Record<string, boolean>>(
  initialValues: T,
  options: Omit<UseToggleOptions, 'defaultValue'> = {}
): UseMultiToggleReturn<T> => {
  const {
    onChange,
    persist = false,
    persistKey = 'multiToggle',
    debounce = 0,
  } = options;

  // Estado inicial (com persistência se habilitada)
  const getInitialValues = (): T => {
    if (persist && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(persistKey);
        return stored !== null ? { ...initialValues, ...JSON.parse(stored) } : initialValues;
      } catch {
        return initialValues;
      }
    }
    return initialValues;
  };

  const [values, setValues] = useState(getInitialValues);
  const onChangeRef = useRef(onChange);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Atualizar callback ref
  onChangeRef.current = onChange;

  // Função para persistir valores
  const persistValues = useCallback(
    (newValues: T) => {
      if (persist && typeof window !== 'undefined') {
        try {
          localStorage.setItem(persistKey, JSON.stringify(newValues));
        } catch (error) {
          console.warn('Failed to persist multi-toggle values:', error);
        }
      }
    },
    [persist, persistKey]
  );

  // Função para atualizar valores
  const updateValues = useCallback(
    (newValues: T) => {
      if (debounce > 0) {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
        
        debounceTimeoutRef.current = setTimeout(() => {
          setValues(newValues);
          persistValues(newValues);
          // Chamar onChange para cada valor que mudou
          Object.entries(newValues).forEach(([key, value]) => {
            if (values[key] !== value) {
              onChangeRef.current?.(value as boolean);
            }
          });
        }, debounce);
      } else {
        setValues(newValues);
        persistValues(newValues);
        // Chamar onChange para cada valor que mudou
        Object.entries(newValues).forEach(([key, value]) => {
          if (values[key] !== value) {
            onChangeRef.current?.(value as boolean);
          }
        });
      }
    },
    [debounce, persistValues, values]
  );

  // Função para alternar um valor específico
  const toggle = useCallback(
    (key: keyof T) => {
      const newValues = { ...values, [key]: !values[key] };
      updateValues(newValues);
    },
    [values, updateValues]
  );

  // Função para definir um valor específico
  const setValue = useCallback(
    (key: keyof T, value: boolean) => {
      const newValues = { ...values, [key]: value };
      updateValues(newValues);
    },
    [values, updateValues]
  );

  // Função para definir múltiplos valores
  const setMultipleValues = useCallback(
    (updates: Partial<T>) => {
      const newValues = { ...values, ...updates };
      updateValues(newValues);
    },
    [values, updateValues]
  );

  // Função para resetar todos os valores
  const reset = useCallback(() => {
    updateValues(initialValues);
  }, [initialValues, updateValues]);

  // Função para alternar todos os valores
  const toggleAll = useCallback(() => {
    const newValues = {} as T;
    Object.keys(values).forEach(key => {
      newValues[key as keyof T] = !values[key];
    });
    updateValues(newValues);
  }, [values, updateValues]);

  // Valores computados
  const computedValues = useMemoizedValue(() => {
    const valueArray = Object.values(values) as boolean[];
    const trueCount = valueArray.filter(Boolean).length;
    const allTrue = valueArray.every(Boolean);
    const allFalse = valueArray.every(v => !v);

    return { trueCount, allTrue, allFalse };
  }, [values]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    values,
    toggle,
    setValue,
    setValues: setMultipleValues,
    reset,
    toggleAll,
    ...computedValues,
  };
};

// === HOOK PARA TOGGLE COM TIMER ===
export const useTimedToggle = (
  initialValue: boolean = false,
  duration: number = 3000,
  options: UseToggleOptions = {}
): UseToggleReturn & {
  readonly timeRemaining: number;
  readonly isTimerActive: boolean;
  readonly startTimer: () => void;
  readonly stopTimer: () => void;
  readonly resetTimer: () => void;
} => {
  const toggle = useToggle(initialValue, options);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Função para iniciar timer
  const startTimer = useCallback(() => {
    if (isTimerActive) return;

    setIsTimerActive(true);
    setTimeRemaining(duration);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, duration - elapsed);
      
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        setIsTimerActive(false);
        toggle.toggle();
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 100);
  }, [isTimerActive, duration, toggle]);

  // Função para parar timer
  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsTimerActive(false);
    setTimeRemaining(0);
  }, []);

  // Função para resetar timer
  const resetTimer = useCallback(() => {
    stopTimer();
    setTimeRemaining(duration);
  }, [stopTimer, duration]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    ...toggle,
    timeRemaining,
    isTimerActive,
    startTimer,
    stopTimer,
    resetTimer,
  };
};

// === HOOK PARA TOGGLE COM CONFIRMAÇÃO ===
export const useConfirmToggle = (
  initialValue: boolean = false,
  confirmationMessage: string = 'Are you sure?',
  options: UseToggleOptions = {}
): UseToggleReturn & {
  readonly pendingValue: boolean | null;
  readonly confirm: () => void;
  readonly cancel: () => void;
  readonly isConfirmationPending: boolean;
} => {
  const baseToggle = useToggle(initialValue, options);
  const [pendingValue, setPendingValue] = useState<boolean | null>(null);

  // Override do toggle para mostrar confirmação
  const toggle = useCallback(() => {
    const newValue = !baseToggle.value;
    
    if (window.confirm(confirmationMessage)) {
      baseToggle.setValue(newValue);
    } else {
      setPendingValue(newValue);
    }
  }, [baseToggle, confirmationMessage]);

  // Função para confirmar
  const confirm = useCallback(() => {
    if (pendingValue !== null) {
      baseToggle.setValue(pendingValue);
      setPendingValue(null);
    }
  }, [baseToggle, pendingValue]);

  // Função para cancelar
  const cancel = useCallback(() => {
    setPendingValue(null);
  }, []);

  return {
    ...baseToggle,
    toggle,
    pendingValue,
    confirm,
    cancel,
    isConfirmationPending: pendingValue !== null,
  };
};

// === HOOKS DE CONVENIÊNCIA ===
export const useBooleanState = (initialValue: boolean = false) => {
  return useToggle(initialValue);
};

export const useDisclosure = (initialValue: boolean = false) => {
  const toggle = useToggle(initialValue);
  
  return {
    isOpen: toggle.value,
    onOpen: toggle.setTrue,
    onClose: toggle.setFalse,
    onToggle: toggle.toggle,
  };
};

export const useModal = (initialValue: boolean = false) => {
  return useDisclosure(initialValue);
};

export const useDrawer = (initialValue: boolean = false) => {
  return useDisclosure(initialValue);
};

// === UTILITIES ===
export const createToggleGroup = <T extends string>(
  keys: readonly T[],
  initialValues?: Partial<Record<T, boolean>>
): Record<T, boolean> => {
  const result = {} as Record<T, boolean>;
  
  keys.forEach(key => {
    result[key] = initialValues?.[key] ?? false;
  });
  
  return result;
};

export const toggleGroupHelpers = <T extends Record<string, boolean>>(values: T) => {
  const entries = Object.entries(values) as [keyof T, boolean][];
  
  return {
    allTrue: entries.every(([, value]) => value),
    allFalse: entries.every(([, value]) => !value),
    someTrue: entries.some(([, value]) => value),
    trueCount: entries.filter(([, value]) => value).length,
    falseCount: entries.filter(([, value]) => !value).length,
    trueKeys: entries.filter(([, value]) => value).map(([key]) => key),
    falseKeys: entries.filter(([, value]) => !value).map(([key]) => key),
  };
};