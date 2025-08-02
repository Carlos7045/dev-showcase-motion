/**
 * Design Tokens - Sistema centralizado de tokens de design
 * Todos os valores de design devem ser definidos aqui para consistência
 */

export const DESIGN_TOKENS = {
  // === CORES ===
  colors: {
    // Cores primárias
    primary: {
      50: 'hsl(195, 100%, 95%)',
      100: 'hsl(195, 100%, 85%)',
      200: 'hsl(195, 100%, 75%)',
      300: 'hsl(195, 100%, 65%)',
      400: 'hsl(195, 100%, 55%)',
      500: 'hsl(195, 100%, 35%)', // Primary padrão
      600: 'hsl(195, 100%, 30%)',
      700: 'hsl(195, 100%, 25%)',
      800: 'hsl(195, 100%, 20%)',
      900: 'hsl(195, 100%, 15%)',
      DEFAULT: 'hsl(195, 100%, 35%)',
      foreground: 'hsl(220, 10%, 98%)',
      glow: 'hsl(195, 85%, 45%)',
    },
    
    // Cores secundárias
    secondary: {
      50: 'hsl(220, 10%, 95%)',
      100: 'hsl(220, 10%, 85%)',
      200: 'hsl(220, 10%, 75%)',
      300: 'hsl(220, 10%, 65%)',
      400: 'hsl(220, 10%, 55%)',
      500: 'hsl(220, 10%, 20%)', // Secondary padrão
      600: 'hsl(220, 10%, 18%)',
      700: 'hsl(220, 10%, 16%)',
      800: 'hsl(220, 10%, 14%)',
      900: 'hsl(220, 10%, 12%)',
      DEFAULT: 'hsl(220, 10%, 20%)',
      foreground: 'hsl(220, 10%, 85%)',
    },

    // Cores de destaque
    accent: {
      50: 'hsl(45, 100%, 95%)',
      100: 'hsl(45, 100%, 85%)',
      200: 'hsl(45, 100%, 80%)',
      300: 'hsl(45, 100%, 75%)',
      400: 'hsl(45, 100%, 70%)',
      500: 'hsl(45, 100%, 70%)', // Accent padrão
      600: 'hsl(45, 95%, 65%)',
      700: 'hsl(45, 90%, 60%)',
      800: 'hsl(45, 85%, 55%)',
      900: 'hsl(45, 80%, 50%)',
      DEFAULT: 'hsl(45, 100%, 70%)',
      foreground: 'hsl(220, 15%, 10%)',
    },

    // Cores de fundo
    background: {
      DEFAULT: 'hsl(220, 15%, 6%)',
      secondary: 'hsl(220, 13%, 9%)',
      muted: 'hsl(220, 10%, 15%)',
    },

    // Cores de texto
    foreground: {
      DEFAULT: 'hsl(220, 10%, 98%)',
      muted: 'hsl(220, 5%, 65%)',
      secondary: 'hsl(220, 10%, 85%)',
    },

    // Cores de borda
    border: {
      DEFAULT: 'hsl(220, 10%, 20%)',
      muted: 'hsl(220, 10%, 15%)',
      focus: 'hsl(195, 100%, 50%)',
    },

    // Cores de estado
    success: {
      DEFAULT: 'hsl(142, 76%, 36%)',
      foreground: 'hsl(355, 7%, 97%)',
    },
    warning: {
      DEFAULT: 'hsl(38, 92%, 50%)',
      foreground: 'hsl(48, 96%, 89%)',
    },
    error: {
      DEFAULT: 'hsl(0, 75%, 60%)',
      foreground: 'hsl(220, 10%, 98%)',
    },
    info: {
      DEFAULT: 'hsl(195, 100%, 35%)',
      foreground: 'hsl(220, 10%, 98%)',
    },
  },

  // === ESPAÇAMENTOS ===
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem', // 2px
    1: '0.25rem',    // 4px
    1.5: '0.375rem', // 6px
    2: '0.5rem',     // 8px
    2.5: '0.625rem', // 10px
    3: '0.75rem',    // 12px
    3.5: '0.875rem', // 14px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    7: '1.75rem',    // 28px
    8: '2rem',       // 32px
    9: '2.25rem',    // 36px
    10: '2.5rem',    // 40px
    11: '2.75rem',   // 44px
    12: '3rem',      // 48px
    14: '3.5rem',    // 56px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
    28: '7rem',      // 112px
    32: '8rem',      // 128px
    36: '9rem',      // 144px
    40: '10rem',     // 160px
    44: '11rem',     // 176px
    48: '12rem',     // 192px
    52: '13rem',     // 208px
    56: '14rem',     // 224px
    60: '15rem',     // 240px
    64: '16rem',     // 256px
    72: '18rem',     // 288px
    80: '20rem',     // 320px
    96: '24rem',     // 384px
  },

  // === TIPOGRAFIA ===
  typography: {
    fontFamilies: {
      primary: ['Inter', 'system-ui', 'sans-serif'],
      heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
    },
    
    fontSizes: {
      xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
      base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
      lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
      xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
      '5xl': ['3rem', { lineHeight: '1' }],         // 48px
      '6xl': ['3.75rem', { lineHeight: '1' }],      // 60px
      '7xl': ['4.5rem', { lineHeight: '1' }],       // 72px
      '8xl': ['6rem', { lineHeight: '1' }],         // 96px
      '9xl': ['8rem', { lineHeight: '1' }],         // 128px
    },

    fontWeights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },

    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },

    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },

  // === BORDAS E RAIOS ===
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    DEFAULT: '0.25rem', // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },

  borderWidth: {
    DEFAULT: '1px',
    0: '0',
    2: '2px',
    4: '4px',
    8: '8px',
  },

  // === SOMBRAS ===
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
    
    // Sombras customizadas para o design
    soft: '0 4px 20px -4px hsl(195 100% 35% / 0.1)',
    elegant: '0 10px 40px -12px hsl(195 100% 35% / 0.25)',
    dramatic: '0 25px 80px -15px hsl(195 100% 35% / 0.4)',
    glow: '0 0 50px hsl(195 85% 45% / 0.3)',
  },

  // === ANIMAÇÕES ===
  animations: {
    durations: {
      instant: '0ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '750ms',
      slowest: '1000ms',
    },

    easings: {
      linear: 'linear',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },

    keyframes: {
      fadeIn: {
        '0%': { opacity: '0', transform: 'translateY(30px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      fadeInLeft: {
        '0%': { opacity: '0', transform: 'translateX(-50px)' },
        '100%': { opacity: '1', transform: 'translateX(0)' },
      },
      fadeInRight: {
        '0%': { opacity: '0', transform: 'translateX(50px)' },
        '100%': { opacity: '1', transform: 'translateX(0)' },
      },
      scaleIn: {
        '0%': { opacity: '0', transform: 'scale(0.9)' },
        '100%': { opacity: '1', transform: 'scale(1)' },
      },
      slideUp: {
        '0%': { opacity: '0', transform: 'translateY(100px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-20px)' },
      },
      pulse: {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '0.5' },
      },
      spin: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    },
  },

  // === BREAKPOINTS ===
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // === Z-INDEX ===
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // === GRADIENTES ===
  gradients: {
    primary: 'linear-gradient(135deg, hsl(195 100% 35%), hsl(195 85% 45%))',
    hero: 'linear-gradient(135deg, hsl(220 15% 6%) 0%, hsl(220 15% 8%) 50%, hsl(220 15% 6%) 100%)',
    accent: 'linear-gradient(90deg, hsl(45 100% 70%) 0%, hsl(45 95% 75%) 100%)',
    card: 'linear-gradient(145deg, hsl(220 13% 9%) 0%, hsl(220 13% 11%) 100%)',
    text: 'linear-gradient(135deg, hsl(195 100% 35%), hsl(195 85% 45%), hsl(45 100% 70%))',
  },
} as const;

// === TIPOS PARA DESIGN TOKENS ===
export type DesignTokens = typeof DESIGN_TOKENS;
export type ColorScale = keyof typeof DESIGN_TOKENS.colors.primary;
export type SpacingScale = keyof typeof DESIGN_TOKENS.spacing;
export type FontSize = keyof typeof DESIGN_TOKENS.typography.fontSizes;
export type FontWeight = keyof typeof DESIGN_TOKENS.typography.fontWeights;
export type BorderRadius = keyof typeof DESIGN_TOKENS.borderRadius;
export type BoxShadow = keyof typeof DESIGN_TOKENS.boxShadow;
export type AnimationDuration = keyof typeof DESIGN_TOKENS.animations.durations;
export type AnimationEasing = keyof typeof DESIGN_TOKENS.animations.easings;
export type Breakpoint = keyof typeof DESIGN_TOKENS.breakpoints;
export type ZIndex = keyof typeof DESIGN_TOKENS.zIndex;

// === UTILITY FUNCTIONS ===
export const getColor = (color: string, shade?: ColorScale) => {
  const colorPath = color.split('.');
  let result: any = DESIGN_TOKENS.colors;
  
  for (const path of colorPath) {
    result = result[path];
  }
  
  if (shade && typeof result === 'object') {
    return result[shade] || result.DEFAULT;
  }
  
  return typeof result === 'string' ? result : result.DEFAULT;
};

export const getSpacing = (scale: SpacingScale) => {
  return DESIGN_TOKENS.spacing[scale];
};

export const getFontSize = (size: FontSize) => {
  return DESIGN_TOKENS.typography.fontSizes[size];
};

export const getBreakpoint = (bp: Breakpoint) => {
  return DESIGN_TOKENS.breakpoints[bp];
};

export const getAnimationDuration = (duration: AnimationDuration) => {
  return DESIGN_TOKENS.animations.durations[duration];
};

export const getAnimationEasing = (easing: AnimationEasing) => {
  return DESIGN_TOKENS.animations.easings[easing];
};