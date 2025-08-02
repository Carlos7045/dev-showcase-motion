/**
 * Transitions - Utilities para transições e efeitos visuais
 * Funções reutilizáveis para efeitos de hover, fade, scale, etc.
 */

import { DESIGN_TOKENS } from '@/constants/design-tokens';

// === TIPOS ===
export interface TransitionConfig {
  /** Duração da transição em ms */
  readonly duration?: number;
  /** Função de timing */
  readonly timing?: string;
  /** Delay em ms */
  readonly delay?: number;
  /** Propriedades a serem animadas */
  readonly properties?: string[];
}

export interface HoverEffectConfig extends TransitionConfig {
  /** Escala no hover */
  readonly scale?: number;
  /** Opacidade no hover */
  readonly opacity?: number;
  /** Translação no hover */
  readonly translate?: { x?: number; y?: number };
  /** Rotação no hover */
  readonly rotate?: number;
}

export interface FadeConfig extends TransitionConfig {
  /** Opacidade inicial */
  readonly from?: number;
  /** Opacidade final */
  readonly to?: number;
  /** Direção do fade */
  readonly direction?: 'in' | 'out' | 'toggle';
}

// === CONSTANTES ===
export const TRANSITION_DEFAULTS = {
  duration: 300,
  timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  delay: 0,
  properties: ['all'],
} as const;

export const COMMON_TIMINGS = {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
} as const;

export const COMMON_DURATIONS = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 750,
} as const;

// === UTILITIES DE CLASSES CSS ===
export const createTransitionClasses = (config: TransitionConfig = {}): string => {
  const {
    duration = TRANSITION_DEFAULTS.duration,
    timing = TRANSITION_DEFAULTS.timing,
    delay = TRANSITION_DEFAULTS.delay,
    properties = TRANSITION_DEFAULTS.properties,
  } = config;

  const classes: string[] = [];

  // Duração
  if (duration === COMMON_DURATIONS.fast) {
    classes.push('duration-150');
  } else if (duration === COMMON_DURATIONS.normal) {
    classes.push('duration-300');
  } else if (duration === COMMON_DURATIONS.slow) {
    classes.push('duration-500');
  } else if (duration === COMMON_DURATIONS.slower) {
    classes.push('duration-750');
  } else {
    classes.push(`duration-[${duration}ms]`);
  }

  // Timing
  if (timing === COMMON_TIMINGS.ease) {
    classes.push('ease');
  } else if (timing === COMMON_TIMINGS.easeIn) {
    classes.push('ease-in');
  } else if (timing === COMMON_TIMINGS.easeOut) {
    classes.push('ease-out');
  } else if (timing === COMMON_TIMINGS.easeInOut) {
    classes.push('ease-in-out');
  } else if (timing === COMMON_TIMINGS.linear) {
    classes.push('ease-linear');
  }

  // Delay
  if (delay > 0) {
    classes.push(`delay-[${delay}ms]`);
  }

  // Propriedades
  if (properties.includes('all')) {
    classes.push('transition-all');
  } else if (properties.includes('transform')) {
    classes.push('transition-transform');
  } else if (properties.includes('opacity')) {
    classes.push('transition-opacity');
  } else if (properties.includes('colors')) {
    classes.push('transition-colors');
  }

  return classes.join(' ');
};

// === UTILITIES DE HOVER EFFECTS ===
export const createHoverEffect = (config: HoverEffectConfig = {}): {
  baseClasses: string;
  hoverClasses: string;
} => {
  const {
    scale,
    opacity,
    translate,
    rotate,
    ...transitionConfig
  } = config;

  const baseClasses = createTransitionClasses(transitionConfig);
  const hoverEffects: string[] = [];

  if (scale !== undefined) {
    hoverEffects.push(`hover:scale-[${scale}]`);
  }

  if (opacity !== undefined) {
    if (opacity === 0) {
      hoverEffects.push('hover:opacity-0');
    } else if (opacity === 0.5) {
      hoverEffects.push('hover:opacity-50');
    } else if (opacity === 0.75) {
      hoverEffects.push('hover:opacity-75');
    } else if (opacity === 1) {
      hoverEffects.push('hover:opacity-100');
    } else {
      hoverEffects.push(`hover:opacity-[${opacity}]`);
    }
  }

  if (translate) {
    const { x = 0, y = 0 } = translate;
    if (x !== 0 || y !== 0) {
      hoverEffects.push(`hover:translate-x-[${x}px] hover:translate-y-[${y}px]`);
    }
  }

  if (rotate !== undefined) {
    hoverEffects.push(`hover:rotate-[${rotate}deg]`);
  }

  return {
    baseClasses,
    hoverClasses: hoverEffects.join(' '),
  };
};

// === PRESETS DE HOVER EFFECTS ===
export const HOVER_EFFECTS = {
  // Escala suave
  scaleUp: createHoverEffect({ scale: 1.05, duration: COMMON_DURATIONS.normal }),
  scaleDown: createHoverEffect({ scale: 0.95, duration: COMMON_DURATIONS.normal }),
  
  // Fade effects
  fadeIn: createHoverEffect({ opacity: 1, duration: COMMON_DURATIONS.normal }),
  fadeOut: createHoverEffect({ opacity: 0, duration: COMMON_DURATIONS.normal }),
  fadePartial: createHoverEffect({ opacity: 0.7, duration: COMMON_DURATIONS.normal }),
  
  // Movimento
  slideUp: createHoverEffect({ translate: { y: -4 }, duration: COMMON_DURATIONS.normal }),
  slideDown: createHoverEffect({ translate: { y: 4 }, duration: COMMON_DURATIONS.normal }),
  slideLeft: createHoverEffect({ translate: { x: -4 }, duration: COMMON_DURATIONS.normal }),
  slideRight: createHoverEffect({ translate: { x: 4 }, duration: COMMON_DURATIONS.normal }),
  
  // Rotação
  rotateSlightly: createHoverEffect({ rotate: 3, duration: COMMON_DURATIONS.normal }),
  
  // Combinados
  liftAndScale: createHoverEffect({ 
    scale: 1.05, 
    translate: { y: -2 }, 
    duration: COMMON_DURATIONS.normal 
  }),
  
  // Para botões
  buttonHover: createHoverEffect({ 
    scale: 1.02, 
    duration: COMMON_DURATIONS.fast,
    timing: COMMON_TIMINGS.easeOut 
  }),
  
  // Para cards
  cardHover: createHoverEffect({ 
    translate: { y: -4 }, 
    duration: COMMON_DURATIONS.normal,
    timing: COMMON_TIMINGS.smooth 
  }),
  
  // Para ícones
  iconHover: createHoverEffect({ 
    scale: 1.1, 
    duration: COMMON_DURATIONS.fast,
    timing: COMMON_TIMINGS.spring 
  }),
} as const;

// === UTILITIES DE FADE EFFECTS ===
export const createFadeClasses = (config: FadeConfig = {}): string => {
  const {
    from = 0,
    to = 1,
    direction = 'in',
    ...transitionConfig
  } = config;

  const baseClasses = createTransitionClasses({
    ...transitionConfig,
    properties: ['opacity'],
  });

  const opacityClasses: string[] = [];

  if (direction === 'in') {
    opacityClasses.push('opacity-0', 'animate-in', 'fade-in');
  } else if (direction === 'out') {
    opacityClasses.push('opacity-100', 'animate-out', 'fade-out');
  }

  return [baseClasses, ...opacityClasses].join(' ');
};

// === UTILITIES DE GRADIENT OVERLAYS ===
export const createGradientOverlay = (
  direction: 'to-t' | 'to-b' | 'to-l' | 'to-r' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl',
  colors: string[] = ['from-background/80', 'via-transparent', 'to-transparent']
): string => {
  return `bg-gradient-${direction} ${colors.join(' ')}`;
};

export const GRADIENT_OVERLAYS = {
  // Overlays para imagens
  imageBottom: createGradientOverlay('to-t', ['from-background/80', 'via-transparent', 'to-transparent']),
  imageTop: createGradientOverlay('to-b', ['from-background/80', 'via-transparent', 'to-transparent']),
  
  // Overlays para cards
  cardHover: createGradientOverlay('to-br', ['from-primary/10', 'via-transparent', 'to-accent/10']),
  cardSubtle: createGradientOverlay('to-t', ['from-primary/5', 'to-transparent']),
  
  // Overlays para backgrounds
  heroBackground: createGradientOverlay('to-br', ['from-primary/20', 'via-background', 'to-accent/20']),
  sectionBackground: createGradientOverlay('to-t', ['from-background', 'to-card/20']),
} as const;

// === UTILITIES DE BLUR EFFECTS ===
export const createBlurEffect = (intensity: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' = 'md'): string => {
  return `blur-${intensity}`;
};

export const BLUR_EFFECTS = {
  subtle: createBlurEffect('sm'),
  normal: createBlurEffect('md'),
  strong: createBlurEffect('lg'),
  intense: createBlurEffect('xl'),
  extreme: createBlurEffect('3xl'),
} as const;

// === UTILITIES DE GLOW EFFECTS ===
export const createGlowEffect = (
  color: string = 'primary',
  intensity: 'sm' | 'md' | 'lg' = 'md'
): string => {
  const shadowSizes = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  return `${shadowSizes[intensity]} shadow-${color}/50`;
};

export const GLOW_EFFECTS = {
  primary: createGlowEffect('primary', 'md'),
  accent: createGlowEffect('accent', 'md'),
  subtle: createGlowEffect('primary', 'sm'),
  strong: createGlowEffect('primary', 'lg'),
} as const;

// === UTILITIES DE LOADING STATES ===
export const createLoadingClasses = (type: 'pulse' | 'spin' | 'bounce' | 'ping' = 'pulse'): string => {
  const animations = {
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    bounce: 'animate-bounce',
    ping: 'animate-ping',
  };

  return animations[type];
};

export const LOADING_EFFECTS = {
  pulse: createLoadingClasses('pulse'),
  spin: createLoadingClasses('spin'),
  bounce: createLoadingClasses('bounce'),
  ping: createLoadingClasses('ping'),
} as const;

// === UTILITIES DE STAGGER ANIMATIONS ===
export const createStaggerDelay = (index: number, baseDelay: number = 0, increment: number = 100): string => {
  const totalDelay = baseDelay + (index * increment);
  return `delay-[${totalDelay}ms]`;
};

export const createStaggeredClasses = (
  totalItems: number,
  baseDelay: number = 0,
  increment: number = 100
): string[] => {
  return Array.from({ length: totalItems }, (_, index) => 
    createStaggerDelay(index, baseDelay, increment)
  );
};

// === UTILITIES DE TRANSFORM ORIGINS ===
export const TRANSFORM_ORIGINS = {
  center: 'origin-center',
  top: 'origin-top',
  bottom: 'origin-bottom',
  left: 'origin-left',
  right: 'origin-right',
  topLeft: 'origin-top-left',
  topRight: 'origin-top-right',
  bottomLeft: 'origin-bottom-left',
  bottomRight: 'origin-bottom-right',
} as const;

// === UTILITIES DE BACKDROP EFFECTS ===
export const createBackdropEffect = (
  effect: 'blur' | 'brightness' | 'contrast' | 'saturate',
  intensity: string = '50'
): string => {
  return `backdrop-${effect}-${intensity}`;
};

export const BACKDROP_EFFECTS = {
  blur: createBackdropEffect('blur', 'sm'),
  blurStrong: createBackdropEffect('blur', 'md'),
  darken: createBackdropEffect('brightness', '50'),
  lighten: createBackdropEffect('brightness', '150'),
  desaturate: createBackdropEffect('saturate', '50'),
} as const;

// === UTILITIES DE COMBINAÇÃO ===
export const combineEffects = (...effects: string[]): string => {
  return effects.filter(Boolean).join(' ');
};

export const createInteractiveElement = (config: {
  hover?: keyof typeof HOVER_EFFECTS;
  focus?: boolean;
  active?: boolean;
  disabled?: boolean;
}): string => {
  const { hover, focus = true, active = true, disabled = false } = config;
  
  const classes: string[] = [];
  
  if (hover && HOVER_EFFECTS[hover]) {
    const { baseClasses, hoverClasses } = HOVER_EFFECTS[hover];
    classes.push(baseClasses, hoverClasses);
  }
  
  if (focus) {
    classes.push('focus:outline-none', 'focus:ring-2', 'focus:ring-primary', 'focus:ring-offset-2');
  }
  
  if (active) {
    classes.push('active:scale-95');
  }
  
  if (disabled) {
    classes.push('disabled:opacity-50', 'disabled:cursor-not-allowed', 'disabled:pointer-events-none');
  }
  
  return classes.join(' ');
};