/**
 * UI - Utilities para elementos de interface
 * Funções reutilizáveis para elementos comuns de UI
 */

import { DESIGN_TOKENS } from '@/constants/design-tokens';

// === TIPOS ===
export interface TooltipPosition {
  readonly x: number;
  readonly y: number;
}

export interface ElementRect {
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly left: number;
  readonly right: number;
  readonly bottom: number;
}

export interface PositioningOptions {
  /** Posição preferida */
  readonly placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  /** Offset em pixels */
  readonly offset?: number;
  /** Se deve ajustar automaticamente */
  readonly autoAdjust?: boolean;
}

// === CONSTANTES ===
const DEFAULT_TOOLTIP_OFFSET = 8;
const VIEWPORT_PADDING = 16;

// === UTILITIES DE POSICIONAMENTO ===
export const calculateTooltipPosition = (
  triggerElement: Element,
  tooltipElement: Element,
  options: PositioningOptions = {}
): TooltipPosition => {
  const {
    placement = 'top',
    offset = DEFAULT_TOOLTIP_OFFSET,
    autoAdjust = true,
  } = options;

  const triggerRect = triggerElement.getBoundingClientRect();
  const tooltipRect = tooltipElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let x = 0;
  let y = 0;

  // Calcular posição baseada no placement
  switch (placement) {
    case 'top':
      x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      y = triggerRect.top - tooltipRect.height - offset;
      break;
    case 'bottom':
      x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      y = triggerRect.bottom + offset;
      break;
    case 'left':
      x = triggerRect.left - tooltipRect.width - offset;
      y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
      break;
    case 'right':
      x = triggerRect.right + offset;
      y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
      break;
    case 'auto':
      // Escolher a melhor posição baseada no espaço disponível
      const spaceTop = triggerRect.top;
      const spaceBottom = viewportHeight - triggerRect.bottom;
      const spaceLeft = triggerRect.left;
      const spaceRight = viewportWidth - triggerRect.right;

      const maxSpace = Math.max(spaceTop, spaceBottom, spaceLeft, spaceRight);

      if (maxSpace === spaceTop) {
        return calculateTooltipPosition(triggerElement, tooltipElement, { ...options, placement: 'top' });
      } else if (maxSpace === spaceBottom) {
        return calculateTooltipPosition(triggerElement, tooltipElement, { ...options, placement: 'bottom' });
      } else if (maxSpace === spaceLeft) {
        return calculateTooltipPosition(triggerElement, tooltipElement, { ...options, placement: 'left' });
      } else {
        return calculateTooltipPosition(triggerElement, tooltipElement, { ...options, placement: 'right' });
      }
  }

  // Ajustar para manter dentro da viewport
  if (autoAdjust) {
    // Ajustar horizontalmente
    if (x < VIEWPORT_PADDING) {
      x = VIEWPORT_PADDING;
    } else if (x + tooltipRect.width > viewportWidth - VIEWPORT_PADDING) {
      x = viewportWidth - tooltipRect.width - VIEWPORT_PADDING;
    }

    // Ajustar verticalmente
    if (y < VIEWPORT_PADDING) {
      y = VIEWPORT_PADDING;
    } else if (y + tooltipRect.height > viewportHeight - VIEWPORT_PADDING) {
      y = viewportHeight - tooltipRect.height - VIEWPORT_PADDING;
    }
  }

  return { x, y };
};

// === UTILITIES DE CLASSES CONDICIONAIS ===
export const createConditionalClasses = (
  conditions: Record<string, boolean | undefined>,
  classMap: Record<string, string>
): string => {
  return Object.entries(conditions)
    .filter(([_, condition]) => condition)
    .map(([key]) => classMap[key])
    .filter(Boolean)
    .join(' ');
};

// === UTILITIES DE TAMANHOS ===
export const SIZE_VARIANTS = {
  xs: {
    padding: 'px-2 py-1',
    text: 'text-xs',
    height: 'h-6',
    minWidth: 'min-w-[1.5rem]',
  },
  sm: {
    padding: 'px-3 py-1.5',
    text: 'text-sm',
    height: 'h-8',
    minWidth: 'min-w-[2rem]',
  },
  md: {
    padding: 'px-4 py-2',
    text: 'text-base',
    height: 'h-10',
    minWidth: 'min-w-[2.5rem]',
  },
  lg: {
    padding: 'px-6 py-3',
    text: 'text-lg',
    height: 'h-12',
    minWidth: 'min-w-[3rem]',
  },
  xl: {
    padding: 'px-8 py-4',
    text: 'text-xl',
    height: 'h-14',
    minWidth: 'min-w-[3.5rem]',
  },
} as const;

export const getSizeClasses = (size: keyof typeof SIZE_VARIANTS): string => {
  const variant = SIZE_VARIANTS[size];
  return `${variant.padding} ${variant.text} ${variant.height}`;
};

// === UTILITIES DE CORES ===
export const COLOR_VARIANTS = {
  primary: {
    bg: 'bg-primary',
    text: 'text-primary-foreground',
    border: 'border-primary',
    hover: 'hover:bg-primary/90',
    focus: 'focus:ring-primary',
  },
  secondary: {
    bg: 'bg-secondary',
    text: 'text-secondary-foreground',
    border: 'border-secondary',
    hover: 'hover:bg-secondary/80',
    focus: 'focus:ring-secondary',
  },
  accent: {
    bg: 'bg-accent',
    text: 'text-accent-foreground',
    border: 'border-accent',
    hover: 'hover:bg-accent/90',
    focus: 'focus:ring-accent',
  },
  destructive: {
    bg: 'bg-destructive',
    text: 'text-destructive-foreground',
    border: 'border-destructive',
    hover: 'hover:bg-destructive/90',
    focus: 'focus:ring-destructive',
  },
  muted: {
    bg: 'bg-muted',
    text: 'text-muted-foreground',
    border: 'border-muted',
    hover: 'hover:bg-muted/80',
    focus: 'focus:ring-muted',
  },
  ghost: {
    bg: 'bg-transparent',
    text: 'text-foreground',
    border: 'border-transparent',
    hover: 'hover:bg-accent hover:text-accent-foreground',
    focus: 'focus:ring-accent',
  },
  outline: {
    bg: 'bg-transparent',
    text: 'text-foreground',
    border: 'border-input',
    hover: 'hover:bg-accent hover:text-accent-foreground',
    focus: 'focus:ring-accent',
  },
} as const;

export const getColorClasses = (
  variant: keyof typeof COLOR_VARIANTS,
  includeHover: boolean = true,
  includeFocus: boolean = true
): string => {
  const colors = COLOR_VARIANTS[variant];
  const classes = [colors.bg, colors.text, colors.border];
  
  if (includeHover) {
    classes.push(colors.hover);
  }
  
  if (includeFocus) {
    classes.push(colors.focus);
  }
  
  return classes.join(' ');
};

// === UTILITIES DE BORDAS ===
export const BORDER_RADIUS_VARIANTS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
} as const;

export const BORDER_WIDTH_VARIANTS = {
  0: 'border-0',
  1: 'border',
  2: 'border-2',
  4: 'border-4',
  8: 'border-8',
} as const;

// === UTILITIES DE SOMBRAS ===
export const SHADOW_VARIANTS = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  inner: 'shadow-inner',
} as const;

// === UTILITIES DE ESPAÇAMENTO ===
export const SPACING_VARIANTS = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
} as const;

// === UTILITIES DE LAYOUT ===
export const createFlexClasses = (
  direction: 'row' | 'col' = 'row',
  align: 'start' | 'center' | 'end' | 'stretch' = 'center',
  justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' = 'center',
  wrap: boolean = false,
  gap?: keyof typeof SPACING_VARIANTS
): string => {
  const classes = ['flex'];
  
  if (direction === 'col') {
    classes.push('flex-col');
  }
  
  classes.push(`items-${align}`);
  classes.push(`justify-${justify}`);
  
  if (wrap) {
    classes.push('flex-wrap');
  }
  
  if (gap) {
    classes.push(`gap-${gap}`);
  }
  
  return classes.join(' ');
};

export const createGridClasses = (
  cols: number | 'auto' = 'auto',
  rows?: number | 'auto',
  gap?: keyof typeof SPACING_VARIANTS
): string => {
  const classes = ['grid'];
  
  if (cols === 'auto') {
    classes.push('grid-cols-auto');
  } else {
    classes.push(`grid-cols-${cols}`);
  }
  
  if (rows) {
    if (rows === 'auto') {
      classes.push('grid-rows-auto');
    } else {
      classes.push(`grid-rows-${rows}`);
    }
  }
  
  if (gap) {
    classes.push(`gap-${gap}`);
  }
  
  return classes.join(' ');
};

// === UTILITIES DE RESPONSIVIDADE ===
export const createResponsiveClasses = (
  baseClasses: string,
  breakpoints: Partial<Record<'sm' | 'md' | 'lg' | 'xl' | '2xl', string>>
): string => {
  const classes = [baseClasses];
  
  Object.entries(breakpoints).forEach(([breakpoint, breakpointClasses]) => {
    if (breakpointClasses) {
      classes.push(`${breakpoint}:${breakpointClasses}`);
    }
  });
  
  return classes.join(' ');
};

// === UTILITIES DE ESTADOS ===
export const createStateClasses = (states: {
  hover?: string;
  focus?: string;
  active?: string;
  disabled?: string;
  loading?: string;
}): string => {
  const classes: string[] = [];
  
  if (states.hover) {
    classes.push(`hover:${states.hover}`);
  }
  
  if (states.focus) {
    classes.push(`focus:${states.focus}`);
  }
  
  if (states.active) {
    classes.push(`active:${states.active}`);
  }
  
  if (states.disabled) {
    classes.push(`disabled:${states.disabled}`);
  }
  
  if (states.loading) {
    classes.push(`data-loading:${states.loading}`);
  }
  
  return classes.join(' ');
};

// === UTILITIES DE ACESSIBILIDADE ===
export const createAccessibilityClasses = (options: {
  focusVisible?: boolean;
  screenReader?: boolean;
  reducedMotion?: boolean;
}): string => {
  const classes: string[] = [];
  
  if (options.focusVisible) {
    classes.push('focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-primary');
  }
  
  if (options.screenReader) {
    classes.push('sr-only');
  }
  
  if (options.reducedMotion) {
    classes.push('motion-reduce:transition-none', 'motion-reduce:animate-none');
  }
  
  return classes.join(' ');
};

// === UTILITIES DE TRUNCATE ===
export const TRUNCATE_VARIANTS = {
  single: 'truncate',
  multiline: 'line-clamp-3',
  twoLines: 'line-clamp-2',
  fourLines: 'line-clamp-4',
  none: 'line-clamp-none',
} as const;

// === UTILITIES DE OVERLAY ===
export const createOverlayClasses = (
  opacity: number = 0.5,
  color: string = 'black',
  blur?: boolean
): string => {
  const classes = ['absolute', 'inset-0', 'pointer-events-none'];
  
  if (color === 'black') {
    classes.push(`bg-black/${Math.round(opacity * 100)}`);
  } else if (color === 'white') {
    classes.push(`bg-white/${Math.round(opacity * 100)}`);
  } else {
    classes.push(`bg-${color}/${Math.round(opacity * 100)}`);
  }
  
  if (blur) {
    classes.push('backdrop-blur-sm');
  }
  
  return classes.join(' ');
};

// === UTILITIES DE LOADING ===
export const createLoadingOverlay = (
  variant: 'spinner' | 'pulse' | 'skeleton' = 'spinner'
): string => {
  const baseClasses = createOverlayClasses(0.8, 'white', true);
  const loadingClasses = createFlexClasses('col', 'center', 'center');
  
  return `${baseClasses} ${loadingClasses} z-50`;
};

// === UTILITIES DE ANIMAÇÃO DE ENTRADA ===
export const ENTER_ANIMATIONS = {
  fadeIn: 'animate-in fade-in duration-200',
  slideInFromTop: 'animate-in slide-in-from-top-2 duration-300',
  slideInFromBottom: 'animate-in slide-in-from-bottom-2 duration-300',
  slideInFromLeft: 'animate-in slide-in-from-left-2 duration-300',
  slideInFromRight: 'animate-in slide-in-from-right-2 duration-300',
  scaleIn: 'animate-in zoom-in-95 duration-200',
  bounceIn: 'animate-in zoom-in-95 duration-300 ease-out',
} as const;

export const EXIT_ANIMATIONS = {
  fadeOut: 'animate-out fade-out duration-200',
  slideOutToTop: 'animate-out slide-out-to-top-2 duration-300',
  slideOutToBottom: 'animate-out slide-out-to-bottom-2 duration-300',
  slideOutToLeft: 'animate-out slide-out-to-left-2 duration-300',
  slideOutToRight: 'animate-out slide-out-to-right-2 duration-300',
  scaleOut: 'animate-out zoom-out-95 duration-200',
  bounceOut: 'animate-out zoom-out-95 duration-300 ease-in',
} as const;

// === UTILITIES DE COMBINAÇÃO ===
export const combineClasses = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const createComponentClasses = (
  base: string,
  variants?: Record<string, string>,
  size?: keyof typeof SIZE_VARIANTS,
  color?: keyof typeof COLOR_VARIANTS
): string => {
  const classes = [base];
  
  if (variants) {
    classes.push(...Object.values(variants));
  }
  
  if (size) {
    classes.push(getSizeClasses(size));
  }
  
  if (color) {
    classes.push(getColorClasses(color));
  }
  
  return combineClasses(...classes);
};