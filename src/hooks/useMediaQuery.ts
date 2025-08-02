/**
 * useMediaQuery - Hook para media queries responsivas
 * Sistema completo de detecção de breakpoints e características do dispositivo
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { DESIGN_TOKENS } from '@/constants/design-tokens';
import { useMemoizedValue } from './useMemoizedValue';

// === TIPOS ===
export interface UseMediaQueryOptions {
  /** Valor padrão para SSR */
  readonly defaultValue?: boolean;
  /** Se deve usar matchMedia API */
  readonly useMatchMedia?: boolean;
  /** Callback quando o estado muda */
  readonly onChange?: (matches: boolean) => void;
}

export interface UseMediaQueryReturn {
  /** Se a media query corresponde */
  readonly matches: boolean;
  /** Se está carregando (SSR) */
  readonly loading: boolean;
  /** Media query string */
  readonly query: string;
}

export interface UseBreakpointReturn {
  /** Breakpoint atual */
  readonly current: string;
  /** Se está em mobile */
  readonly isMobile: boolean;
  /** Se está em tablet */
  readonly isTablet: boolean;
  /** Se está em desktop */
  readonly isDesktop: boolean;
  /** Se está acima do breakpoint especificado */
  readonly isAbove: (breakpoint: string) => boolean;
  /** Se está abaixo do breakpoint especificado */
  readonly isBelow: (breakpoint: string) => boolean;
  /** Largura da tela */
  readonly width: number;
  /** Altura da tela */
  readonly height: number;
}

export interface DeviceInfo {
  readonly type: 'mobile' | 'tablet' | 'desktop';
  readonly orientation: 'portrait' | 'landscape';
  readonly pixelRatio: number;
  readonly touchSupport: boolean;
  readonly reducedMotion: boolean;
  readonly darkMode: boolean;
  readonly highContrast: boolean;
}

// === CONSTANTES ===
const isSSR = typeof window === 'undefined';

const BREAKPOINT_VALUES = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// === HOOK PRINCIPAL ===
export const useMediaQuery = (
  query: string,
  options: UseMediaQueryOptions = {}
): UseMediaQueryReturn => {
  const {
    defaultValue = false,
    useMatchMedia = true,
    onChange,
  } = options;

  const [matches, setMatches] = useState(defaultValue);
  const [loading, setLoading] = useState(isSSR);

  // Memoizar query
  const memoizedQuery = useMemoizedValue(() => query, [query]);

  // Callback para mudanças
  const handleChange = useCallback(
    (event: MediaQueryListEvent | MediaQueryList) => {
      const newMatches = event.matches;
      setMatches(newMatches);
      onChange?.(newMatches);
    },
    [onChange]
  );

  useEffect(() => {
    if (isSSR) {
      setLoading(false);
      return;
    }

    if (!useMatchMedia || !window.matchMedia) {
      // Fallback para browsers antigos
      setMatches(defaultValue);
      setLoading(false);
      return;
    }

    const mediaQueryList = window.matchMedia(memoizedQuery);
    
    // Definir estado inicial
    setMatches(mediaQueryList.matches);
    setLoading(false);

    // Adicionar listener
    const listener = (event: MediaQueryListEvent) => handleChange(event);
    
    // Usar addEventListener se disponível, senão addListener (deprecated)
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
    } else {
      // @ts-ignore - Para compatibilidade com browsers antigos
      mediaQueryList.addListener(listener);
    }

    // Cleanup
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener);
      } else {
        // @ts-ignore - Para compatibilidade com browsers antigos
        mediaQueryList.removeListener(listener);
      }
    };
  }, [memoizedQuery, useMatchMedia, defaultValue, handleChange]);

  return {
    matches,
    loading,
    query: memoizedQuery,
  };
};

// === HOOK PARA BREAKPOINTS ===
export const useBreakpoint = (): UseBreakpointReturn => {
  const [dimensions, setDimensions] = useState({
    width: isSSR ? 1024 : window.innerWidth,
    height: isSSR ? 768 : window.innerHeight,
  });

  // Media queries para breakpoints
  const isXs = useMediaQuery(`(max-width: ${BREAKPOINT_VALUES.xs - 1}px)`);
  const isSm = useMediaQuery(`(min-width: ${BREAKPOINT_VALUES.xs}px) and (max-width: ${BREAKPOINT_VALUES.sm - 1}px)`);
  const isMd = useMediaQuery(`(min-width: ${BREAKPOINT_VALUES.sm}px) and (max-width: ${BREAKPOINT_VALUES.md - 1}px)`);
  const isLg = useMediaQuery(`(min-width: ${BREAKPOINT_VALUES.md}px) and (max-width: ${BREAKPOINT_VALUES.lg - 1}px)`);
  const isXl = useMediaQuery(`(min-width: ${BREAKPOINT_VALUES.lg}px) and (max-width: ${BREAKPOINT_VALUES.xl - 1}px)`);
  const is2Xl = useMediaQuery(`(min-width: ${BREAKPOINT_VALUES.xl}px)`);

  // Determinar breakpoint atual
  const current = useMemo(() => {
    if (isXs.matches) return 'xs';
    if (isSm.matches) return 'sm';
    if (isMd.matches) return 'md';
    if (isLg.matches) return 'lg';
    if (isXl.matches) return 'xl';
    if (is2Xl.matches) return '2xl';
    return 'md'; // fallback
  }, [isXs.matches, isSm.matches, isMd.matches, isLg.matches, isXl.matches, is2Xl.matches]);

  // Categorias de dispositivo
  const isMobile = useMemo(() => 
    isXs.matches || isSm.matches, 
    [isXs.matches, isSm.matches]
  );
  
  const isTablet = useMemo(() => 
    isMd.matches, 
    [isMd.matches]
  );
  
  const isDesktop = useMemo(() => 
    isLg.matches || isXl.matches || is2Xl.matches, 
    [isLg.matches, isXl.matches, is2Xl.matches]
  );

  // Funções de comparação
  const isAbove = useCallback((breakpoint: string) => {
    const currentValue = BREAKPOINT_VALUES[current as keyof typeof BREAKPOINT_VALUES] || 0;
    const targetValue = BREAKPOINT_VALUES[breakpoint as keyof typeof BREAKPOINT_VALUES] || 0;
    return currentValue >= targetValue;
  }, [current]);

  const isBelow = useCallback((breakpoint: string) => {
    const currentValue = BREAKPOINT_VALUES[current as keyof typeof BREAKPOINT_VALUES] || 0;
    const targetValue = BREAKPOINT_VALUES[breakpoint as keyof typeof BREAKPOINT_VALUES] || 0;
    return currentValue < targetValue;
  }, [current]);

  // Listener para mudanças de dimensão
  useEffect(() => {
    if (isSSR) return;

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    current,
    isMobile,
    isTablet,
    isDesktop,
    isAbove,
    isBelow,
    width: dimensions.width,
    height: dimensions.height,
  };
};

// === HOOK PARA INFORMAÇÕES DO DISPOSITIVO ===
export const useDeviceInfo = (): DeviceInfo => {
  const { isMobile, isTablet } = useBreakpoint();
  
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersHighContrast = useMediaQuery('(prefers-contrast: high)');

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => ({
    type: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
    orientation: isPortrait.matches ? 'portrait' : 'landscape',
    pixelRatio: isSSR ? 1 : window.devicePixelRatio || 1,
    touchSupport: isSSR ? false : 'ontouchstart' in window,
    reducedMotion: prefersReducedMotion.matches,
    darkMode: prefersDarkMode.matches,
    highContrast: prefersHighContrast.matches,
  }));

  // Atualizar informações quando mudarem
  useEffect(() => {
    setDeviceInfo({
      type: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      orientation: isPortrait.matches ? 'portrait' : 'landscape',
      pixelRatio: isSSR ? 1 : window.devicePixelRatio || 1,
      touchSupport: isSSR ? false : 'ontouchstart' in window,
      reducedMotion: prefersReducedMotion.matches,
      darkMode: prefersDarkMode.matches,
      highContrast: prefersHighContrast.matches,
    });
  }, [
    isMobile,
    isTablet,
    isPortrait.matches,
    prefersReducedMotion.matches,
    prefersDarkMode.matches,
    prefersHighContrast.matches,
  ]);

  return deviceInfo;
};

// === HOOKS DE CONVENIÊNCIA ===
export const useIsMobile = (): boolean => {
  const { isMobile } = useBreakpoint();
  return isMobile;
};

export const useIsTablet = (): boolean => {
  const { isTablet } = useBreakpoint();
  return isTablet;
};

export const useIsDesktop = (): boolean => {
  const { isDesktop } = useBreakpoint();
  return isDesktop;
};

export const useOrientation = (): 'portrait' | 'landscape' => {
  const isPortrait = useMediaQuery('(orientation: portrait)');
  return isPortrait.matches ? 'portrait' : 'landscape';
};

export const usePrefersReducedMotion = (): boolean => {
  const { matches } = useMediaQuery('(prefers-reduced-motion: reduce)');
  return matches;
};

export const usePrefersDarkMode = (): boolean => {
  const { matches } = useMediaQuery('(prefers-color-scheme: dark)');
  return matches;
};

export const usePrefersHighContrast = (): boolean => {
  const { matches } = useMediaQuery('(prefers-contrast: high)');
  return matches;
};

// === HOOK PARA MÚLTIPLAS MEDIA QUERIES ===
export const useMultipleMediaQueries = (
  queries: Record<string, string>
): Record<string, boolean> => {
  const results: Record<string, boolean> = {};
  
  Object.entries(queries).forEach(([key, query]) => {
    const { matches } = useMediaQuery(query);
    results[key] = matches;
  });
  
  return results;
};

// === HOOK PARA BREAKPOINT ESPECÍFICO ===
export const useBreakpointValue = <T>(
  values: Partial<Record<keyof typeof BREAKPOINT_VALUES, T>>,
  fallback: T
): T => {
  const { current } = useBreakpoint();
  
  return useMemo(() => {
    // Tentar encontrar valor exato para o breakpoint atual
    if (values[current as keyof typeof BREAKPOINT_VALUES]) {
      return values[current as keyof typeof BREAKPOINT_VALUES]!;
    }
    
    // Procurar o maior breakpoint menor que o atual
    const breakpointOrder: (keyof typeof BREAKPOINT_VALUES)[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const currentIndex = breakpointOrder.indexOf(current as keyof typeof BREAKPOINT_VALUES);
    
    for (let i = currentIndex - 1; i >= 0; i--) {
      const bp = breakpointOrder[i];
      if (values[bp]) {
        return values[bp]!;
      }
    }
    
    return fallback;
  }, [values, current, fallback]);
};

// === UTILITIES ===
export const createMediaQuery = (
  minWidth?: number,
  maxWidth?: number,
  orientation?: 'portrait' | 'landscape'
): string => {
  const conditions: string[] = [];
  
  if (minWidth) conditions.push(`(min-width: ${minWidth}px)`);
  if (maxWidth) conditions.push(`(max-width: ${maxWidth}px)`);
  if (orientation) conditions.push(`(orientation: ${orientation})`);
  
  return conditions.join(' and ');
};

export const getBreakpointValue = (breakpoint: keyof typeof BREAKPOINT_VALUES): number => {
  return BREAKPOINT_VALUES[breakpoint];
};

export const getAllBreakpoints = (): typeof BREAKPOINT_VALUES => {
  return BREAKPOINT_VALUES;
};