/**
 * Configuration Index - Exportações centralizadas
 * Ponto único de acesso para todas as configurações
 */

// === CONFIGURAÇÕES PRINCIPAIS ===
export * from './app';
export * from './seo';
export * from './social';
export * from './portfolio';

// === RE-EXPORTS ORGANIZADOS ===

// App Configuration
export {
  APP_CONFIG,
  PERSONAL_INFO,
  CONTACT_INFO,
  SOCIAL_LINKS,
  TECH_STACK,
  THEME_CONFIG,
  ANIMATION_CONFIG,
  PERFORMANCE_CONFIG,
  SEO_CONFIG,
  NAVIGATION_CONFIG,
  FORM_CONFIG,
  API_CONFIG,
  DEV_CONFIG,
  LAYOUT_CONFIG,
  BREAKPOINTS,
  Z_INDEX,
  TRANSITIONS,
  COLOR_CONFIG,
  getWhatsAppUrl,
  getEmailUrl,
  getSocialUrl,
  getTechStackFlat,
  getBreakpointValue,
  isDevMode,
  shouldShowAnimations,
} from './app';

// SEO Configuration
export {
  DEFAULT_META_TAGS,
  OPEN_GRAPH_TAGS,
  TWITTER_CARD_TAGS,
  STRUCTURED_DATA,
  PAGE_SEO_CONFIG,
  ANALYTICS_CONFIG,
  generateMetaTags,
  generateStructuredData,
  generateSitemap,
  generateRobotsTxt,
} from './seo';

// Social Configuration
export {
  SOCIAL_PLATFORMS,
  SHARING_CONFIG,
  SOCIAL_MESSAGES,
  SOCIAL_ANALYTICS,
  getSocialPlatforms,
  getSocialPlatform,
  getWhatsAppUrl as getSocialWhatsAppUrl,
  getEmailUrl as getSocialEmailUrl,
  getLinkedInUrl,
  getShareUrl,
  addAnalyticsToUrl,
  getSocialMetrics,
} from './social';

// Portfolio Configuration
export {
  PROJECT_CATEGORIES,
  TECHNOLOGIES,
  PORTFOLIO_PROJECTS,
  SERVICES,
  WORK_EXPERIENCE,
  EDUCATION,
  CERTIFICATIONS,
  getProjectsByCategory,
  getFeaturedProjects,
  getProjectById,
  getTechnologiesByCategory,
  getServiceById,
  getCurrentExperience,
  getCompletedEducation,
  getActiveCertifications,
} from './portfolio';

// === CONFIGURAÇÕES COMBINADAS ===

/**
 * Configuração completa da aplicação
 * Combina todas as configurações em um objeto único
 */
export const FULL_CONFIG = {
  app: APP_CONFIG,
  seo: {
    meta: DEFAULT_META_TAGS,
    openGraph: OPEN_GRAPH_TAGS,
    twitter: TWITTER_CARD_TAGS,
    structured: STRUCTURED_DATA,
    pages: PAGE_SEO_CONFIG,
    analytics: ANALYTICS_CONFIG,
  },
  social: {
    platforms: SOCIAL_PLATFORMS,
    sharing: SHARING_CONFIG,
    messages: SOCIAL_MESSAGES,
    analytics: SOCIAL_ANALYTICS,
  },
  portfolio: {
    categories: PROJECT_CATEGORIES,
    technologies: TECHNOLOGIES,
    projects: PORTFOLIO_PROJECTS,
    services: SERVICES,
    experience: WORK_EXPERIENCE,
    education: EDUCATION,
    certifications: CERTIFICATIONS,
  },
} as const;

// === HELPERS GLOBAIS ===

/**
 * Obtém configuração por chave
 */
export const getConfig = <T extends keyof typeof FULL_CONFIG>(key: T): typeof FULL_CONFIG[T] => {
  return FULL_CONFIG[key];
};

/**
 * Obtém informações de contato formatadas
 */
export const getContactMethods = () => {
  return [
    {
      type: 'whatsapp',
      label: 'WhatsApp',
      value: CONTACT_INFO.phone,
      url: getWhatsAppUrl(),
      icon: 'MessageCircle',
      primary: true,
    },
    {
      type: 'email',
      label: 'E-mail',
      value: CONTACT_INFO.email,
      url: getEmailUrl(),
      icon: 'Mail',
      primary: true,
    },
    {
      type: 'linkedin',
      label: 'LinkedIn',
      value: SOCIAL_LINKS.linkedin.username,
      url: SOCIAL_LINKS.linkedin.url,
      icon: 'Linkedin',
      primary: false,
    },
    {
      type: 'github',
      label: 'GitHub',
      value: SOCIAL_LINKS.github.username,
      url: SOCIAL_LINKS.github.url,
      icon: 'Github',
      primary: false,
    },
  ];
};

/**
 * Obtém estatísticas do portfolio
 */
export const getPortfolioStats = () => {
  const projects = PORTFOLIO_PROJECTS;
  const technologies = Object.keys(TECHNOLOGIES);
  const experience = WORK_EXPERIENCE;
  const certifications = getActiveCertifications();

  return {
    projects: {
      total: projects.length,
      featured: projects.filter(p => p.featured).length,
      completed: projects.filter(p => p.status === 'completed').length,
      categories: Object.keys(PROJECT_CATEGORIES).length,
    },
    technologies: {
      total: technologies.length,
      frontend: getTechnologiesByCategory('frontend').length,
      backend: getTechnologiesByCategory('backend').length,
      database: getTechnologiesByCategory('database').length,
    },
    experience: {
      years: PERSONAL_INFO.experience,
      positions: experience.length,
      current: experience.filter(e => e.current).length,
    },
    certifications: {
      total: certifications.length,
      active: certifications.length,
    },
  };
};

/**
 * Obtém configurações de tema
 */
export const getThemeConfig = () => {
  return {
    default: THEME_CONFIG.defaultTheme,
    system: THEME_CONFIG.enableSystemTheme,
    toggle: THEME_CONFIG.enableThemeToggle,
    storage: THEME_CONFIG.storageKey,
    colors: COLOR_CONFIG,
    transitions: TRANSITIONS,
  };
};

/**
 * Obtém configurações de performance
 */
export const getPerformanceConfig = () => {
  return {
    lazy: PERFORMANCE_CONFIG.enableLazyLoading,
    images: PERFORMANCE_CONFIG.enableImageOptimization,
    splitting: PERFORMANCE_CONFIG.enableCodeSplitting,
    animations: ANIMATION_CONFIG.enableAnimations,
    reducedMotion: ANIMATION_CONFIG.respectReducedMotion,
  };
};

/**
 * Obtém configurações de desenvolvimento
 */
export const getDevConfig = () => {
  return {
    debug: DEV_CONFIG.enableDebugMode,
    logging: DEV_CONFIG.enableConsoleLogging,
    monitoring: DEV_CONFIG.enablePerformanceMonitoring,
    boundaries: DEV_CONFIG.showComponentBoundaries,
    hotReload: DEV_CONFIG.enableHotReload,
  };
};

/**
 * Verifica se está em modo de desenvolvimento
 */
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

/**
 * Verifica se está em modo de produção
 */
export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

/**
 * Obtém URL base da aplicação
 */
export const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return SEO_CONFIG.siteUrl;
};

/**
 * Obtém informações do ambiente
 */
export const getEnvironmentInfo = () => {
  return {
    node: process.env.NODE_ENV,
    development: isDevelopment(),
    production: isProduction(),
    baseUrl: getBaseUrl(),
    version: process.env.VITE_APP_VERSION || '1.0.0',
    buildDate: process.env.VITE_BUILD_DATE || new Date().toISOString(),
  };
};

// === TIPOS GLOBAIS ===
export type FullConfig = typeof FULL_CONFIG;
export type ConfigKey = keyof typeof FULL_CONFIG;
export type ContactMethod = ReturnType<typeof getContactMethods>[number];
export type PortfolioStats = ReturnType<typeof getPortfolioStats>;
export type ThemeConfig = ReturnType<typeof getThemeConfig>;
export type PerformanceConfig = ReturnType<typeof getPerformanceConfig>;
export type DevConfig = ReturnType<typeof getDevConfig>;
export type EnvironmentInfo = ReturnType<typeof getEnvironmentInfo>;

// === VALIDAÇÕES ===

/**
 * Valida se todas as configurações necessárias estão presentes
 */
export const validateConfig = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validar informações pessoais
  if (!PERSONAL_INFO.name) errors.push('Personal name is required');
  if (!PERSONAL_INFO.title) errors.push('Personal title is required');

  // Validar contato
  if (!CONTACT_INFO.email) errors.push('Contact email is required');
  if (!CONTACT_INFO.phone) errors.push('Contact phone is required');

  // Validar redes sociais
  if (!SOCIAL_LINKS.github.url) errors.push('GitHub URL is required');
  if (!SOCIAL_LINKS.linkedin.url) errors.push('LinkedIn URL is required');

  // Validar SEO
  if (!SEO_CONFIG.siteName) errors.push('Site name is required');
  if (!SEO_CONFIG.siteDescription) errors.push('Site description is required');
  if (!SEO_CONFIG.siteUrl) errors.push('Site URL is required');

  return {
    valid: errors.length === 0,
    errors,
  };
};

// === INICIALIZAÇÃO ===

/**
 * Inicializa configurações da aplicação
 */
export const initializeConfig = () => {
  const validation = validateConfig();
  
  if (!validation.valid && isDevelopment()) {
    console.warn('Configuration validation failed:', validation.errors);
  }

  if (isDevelopment() && DEV_CONFIG.enableConsoleLogging) {
    console.log('🚀 Configuration loaded:', {
      environment: getEnvironmentInfo(),
      stats: getPortfolioStats(),
      validation: validation.valid,
    });
  }

  return FULL_CONFIG;
};

// === DEFAULT EXPORT ===
export default FULL_CONFIG;