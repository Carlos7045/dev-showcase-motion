/**
 * App Configuration - Configurações centralizadas da aplicação
 * Todas as configurações gerais da aplicação em um local centralizado
 */

// === INFORMAÇÕES PESSOAIS ===
export const PERSONAL_INFO = {
  name: 'Carlos Henrique Salgado',
  title: 'Desenvolvedor Full Stack',
  subtitle: 'Especialista em React, Node.js e Automações',
  bio: 'Desenvolvedor apaixonado por criar soluções digitais inovadoras que transformam ideias em realidade. Especializado em desenvolvimento web moderno, APIs robustas e automações inteligentes.',
  location: 'Brasil',
  timezone: 'America/Sao_Paulo',
  languages: ['Português', 'Inglês'],
  experience: '5+ anos',
  availability: 'Disponível para projetos',
} as const;

// === CONTATO ===
export const CONTACT_INFO = {
  email: 'salgadocarloshenrique@gmail.com',
  phone: '+55 99 98487-0193',
  whatsapp: {
    number: '5599984870193',
    message: 'Olá vim da sua pagina de desenvolvedor, gostaria de conversar com você sobre um projeto.',
  },
  location: {
    city: 'São Luís',
    state: 'Maranhão',
    country: 'Brasil',
  },
} as const;

// === REDES SOCIAIS ===
export const SOCIAL_LINKS = {
  github: {
    url: 'https://github.com/carlos7045',
    username: 'carlos7045',
    label: 'GitHub',
  },
  linkedin: {
    url: 'https://linkedin.com/in/carlos-henrique-salgado-8b8b8b8b8',
    username: 'carlos-henrique-salgado-8b8b8b8b8',
    label: 'LinkedIn',
  },
  instagram: {
    url: 'https://instagram.com/carlos_salgado704',
    username: 'carlos_salgado704',
    label: 'Instagram',
  },
  twitter: {
    url: 'https://twitter.com/carlos_salgado704',
    username: 'carlos_salgado704',
    label: 'Twitter',
  },
} as const;

// === TECNOLOGIAS ===
export const TECH_STACK = {
  frontend: [
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'React Query',
  ],
  backend: [
    'Node.js',
    'Express',
    'Fastify',
    'Python',
    'Django',
    'FastAPI',
  ],
  database: [
    'PostgreSQL',
    'MongoDB',
    'Supabase',
    'Prisma',
    'Redis',
  ],
  tools: [
    'Git',
    'Docker',
    'AWS',
    'Vercel',
    'Figma',
    'VS Code',
  ],
  automation: [
    'n8n',
    'Make.com',
    'Zapier',
    'GitHub Actions',
    'Webhooks',
  ],
} as const;

// === CONFIGURAÇÕES DE TEMA ===
export const THEME_CONFIG = {
  defaultTheme: 'dark' as 'light' | 'dark' | 'system',
  enableSystemTheme: true,
  enableThemeToggle: true,
  storageKey: 'portfolio-theme',
} as const;

// === CONFIGURAÇÕES DE ANIMAÇÃO ===
export const ANIMATION_CONFIG = {
  enableAnimations: true,
  respectReducedMotion: true,
  defaultDuration: 300,
  defaultEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  staggerDelay: 100,
  scrollAnimationThreshold: 0.1,
} as const;

// === CONFIGURAÇÕES DE PERFORMANCE ===
export const PERFORMANCE_CONFIG = {
  enableLazyLoading: true,
  enableImageOptimization: true,
  enableCodeSplitting: true,
  enableServiceWorker: false,
  enableAnalytics: false,
  enableErrorTracking: false,
} as const;

// === CONFIGURAÇÕES DE SEO ===
export const SEO_CONFIG = {
  siteName: 'Carlos Henrique Salgado - Desenvolvedor Full Stack',
  siteDescription: 'Desenvolvedor Full Stack especializado em React, Node.js e automações. Criando soluções digitais inovadoras que transformam ideias em realidade.',
  siteUrl: 'https://carlos-salgado.dev',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@carlos_salgado704',
  locale: 'pt-BR',
  alternateLocales: ['en-US'],
} as const;

// === CONFIGURAÇÕES DE NAVEGAÇÃO ===
export const NAVIGATION_CONFIG = {
  enableSmoothScroll: true,
  stickyHeader: true,
  showScrollProgress: true,
  showBackToTop: true,
  mobileBreakpoint: 768,
} as const;

// === CONFIGURAÇÕES DE FORMULÁRIO ===
export const FORM_CONFIG = {
  enableValidation: true,
  showErrorMessages: true,
  enableAutoSave: false,
  submitTimeout: 10000,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
} as const;

// === CONFIGURAÇÕES DE API ===
export const API_CONFIG = {
  baseUrl: process.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
  enableCaching: true,
  cacheTimeout: 5 * 60 * 1000, // 5 minutos
} as const;

// === CONFIGURAÇÕES DE DESENVOLVIMENTO ===
export const DEV_CONFIG = {
  enableDebugMode: process.env.NODE_ENV === 'development',
  enableConsoleLogging: process.env.NODE_ENV === 'development',
  enablePerformanceMonitoring: process.env.NODE_ENV === 'development',
  showComponentBoundaries: false,
  enableHotReload: true,
} as const;

// === CONFIGURAÇÕES DE LAYOUT ===
export const LAYOUT_CONFIG = {
  maxWidth: '1440px',
  containerPadding: {
    mobile: '1rem',
    tablet: '2rem',
    desktop: '3rem',
  },
  sectionSpacing: {
    small: '4rem',
    medium: '6rem',
    large: '8rem',
  },
  gridGap: {
    small: '1rem',
    medium: '1.5rem',
    large: '2rem',
  },
} as const;

// === CONFIGURAÇÕES DE BREAKPOINTS ===
export const BREAKPOINTS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// === CONFIGURAÇÕES DE Z-INDEX ===
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const;

// === CONFIGURAÇÕES DE TRANSIÇÃO ===
export const TRANSITIONS = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '750ms',
  easings: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// === CONFIGURAÇÕES DE CORES ===
export const COLOR_CONFIG = {
  brand: {
    primary: '#0891b2', // teal-600
    secondary: '#64748b', // slate-500
    accent: '#eab308', // yellow-500
  },
  semantic: {
    success: '#22c55e', // green-500
    warning: '#f59e0b', // amber-500
    error: '#ef4444', // red-500
    info: '#3b82f6', // blue-500
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
} as const;

// === CONFIGURAÇÕES COMBINADAS ===
export const APP_CONFIG = {
  personal: PERSONAL_INFO,
  contact: CONTACT_INFO,
  social: SOCIAL_LINKS,
  tech: TECH_STACK,
  theme: THEME_CONFIG,
  animation: ANIMATION_CONFIG,
  performance: PERFORMANCE_CONFIG,
  seo: SEO_CONFIG,
  navigation: NAVIGATION_CONFIG,
  form: FORM_CONFIG,
  api: API_CONFIG,
  dev: DEV_CONFIG,
  layout: LAYOUT_CONFIG,
  breakpoints: BREAKPOINTS,
  zIndex: Z_INDEX,
  transitions: TRANSITIONS,
  colors: COLOR_CONFIG,
} as const;

// === TIPOS ===
export type PersonalInfo = typeof PERSONAL_INFO;
export type ContactInfo = typeof CONTACT_INFO;
export type SocialLinks = typeof SOCIAL_LINKS;
export type TechStack = typeof TECH_STACK;
export type ThemeConfig = typeof THEME_CONFIG;
export type AnimationConfig = typeof ANIMATION_CONFIG;
export type PerformanceConfig = typeof PERFORMANCE_CONFIG;
export type SEOConfig = typeof SEO_CONFIG;
export type NavigationConfig = typeof NAVIGATION_CONFIG;
export type FormConfig = typeof FORM_CONFIG;
export type APIConfig = typeof API_CONFIG;
export type DevConfig = typeof DEV_CONFIG;
export type LayoutConfig = typeof LAYOUT_CONFIG;
export type Breakpoints = typeof BREAKPOINTS;
export type ZIndex = typeof Z_INDEX;
export type Transitions = typeof TRANSITIONS;
export type ColorConfig = typeof COLOR_CONFIG;
export type AppConfig = typeof APP_CONFIG;

// === HELPERS ===
export const getWhatsAppUrl = (customMessage?: string): string => {
  const message = customMessage || CONTACT_INFO.whatsapp.message;
  return `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(message)}`;
};

export const getEmailUrl = (subject?: string, body?: string): string => {
  const defaultSubject = 'Projeto de Desenvolvimento';
  const defaultBody = CONTACT_INFO.whatsapp.message;
  
  const params = new URLSearchParams({
    subject: subject || defaultSubject,
    body: body || defaultBody,
  });
  
  return `mailto:${CONTACT_INFO.email}?${params.toString()}`;
};

export const getSocialUrl = (platform: keyof typeof SOCIAL_LINKS): string => {
  return SOCIAL_LINKS[platform].url;
};

export const getTechStackFlat = (): string[] => {
  return Object.values(TECH_STACK).flat();
};

export const getBreakpointValue = (breakpoint: keyof typeof BREAKPOINTS): number => {
  return parseInt(BREAKPOINTS[breakpoint].replace('px', ''));
};

export const isDevMode = (): boolean => {
  return DEV_CONFIG.enableDebugMode;
};

export const shouldShowAnimations = (): boolean => {
  if (!ANIMATION_CONFIG.enableAnimations) return false;
  if (!ANIMATION_CONFIG.respectReducedMotion) return true;
  
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};