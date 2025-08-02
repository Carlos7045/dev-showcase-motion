/**
 * Tipos para configurações da aplicação
 * Definições para configurações de build, ambiente e features
 */

import type { 
  ThemeConfig, 
  PerformanceConfig, 
  AccessibilityConfig,
  SiteConfig 
} from './base';

// === CONFIGURAÇÃO DA APLICAÇÃO ===

/** Configuração principal da aplicação */
export interface AppConfig {
  readonly site: SiteConfig;
  readonly theme: ThemeConfig;
  readonly performance: PerformanceConfig;
  readonly accessibility: AccessibilityConfig;
  readonly features: FeatureFlags;
  readonly build: BuildConfig;
  readonly development: DevelopmentConfig;
}

// === FEATURE FLAGS ===

/** Flags de funcionalidades */
export interface FeatureFlags {
  readonly analytics: boolean;
  readonly darkMode: boolean;
  readonly animations: boolean;
  readonly blog: boolean;
  readonly comments: boolean;
  readonly search: boolean;
  readonly newsletter: boolean;
  readonly pwa: boolean;
  readonly i18n: boolean;
  readonly contactForm: boolean;
  readonly livechat: boolean;
  readonly testimonials: boolean;
  readonly portfolio: boolean;
  readonly services: boolean;
  readonly experience: boolean;
  readonly skills: boolean;
  readonly education: boolean;
}

// === CONFIGURAÇÃO DE BUILD ===

/** Configuração de build */
export interface BuildConfig {
  readonly target: 'development' | 'production' | 'preview';
  readonly sourceMaps: boolean;
  readonly minification: boolean;
  readonly compression: boolean;
  readonly bundleAnalysis: boolean;
  readonly treeshaking: boolean;
  readonly codesplitting: {
    readonly enabled: boolean;
    readonly strategy: 'route' | 'component' | 'vendor' | 'all';
    readonly chunkSizeLimit: number;
  };
  readonly optimization: {
    readonly images: boolean;
    readonly fonts: boolean;
    readonly css: boolean;
    readonly javascript: boolean;
  };
  readonly output: {
    readonly directory: string;
    readonly publicPath: string;
    readonly filename: string;
    readonly chunkFilename: string;
  };
}

// === CONFIGURAÇÃO DE DESENVOLVIMENTO ===

/** Configuração para ambiente de desenvolvimento */
export interface DevelopmentConfig {
  readonly hotReload: boolean;
  readonly devtools: boolean;
  readonly errorOverlay: boolean;
  readonly openBrowser: boolean;
  readonly port: number;
  readonly host: string;
  readonly https: boolean;
  readonly proxy?: Record<string, string>;
  readonly mock: {
    readonly enabled: boolean;
    readonly delay: number;
    readonly errorRate: number;
  };
  readonly logging: {
    readonly level: 'error' | 'warn' | 'info' | 'debug';
    readonly console: boolean;
    readonly file: boolean;
  };
}

// === CONFIGURAÇÃO DE SEO ===

/** Configuração avançada de SEO */
export interface SEOConfig {
  readonly sitemap: {
    readonly enabled: boolean;
    readonly filename: string;
    readonly changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    readonly priority: number;
  };
  readonly robots: {
    readonly enabled: boolean;
    readonly userAgent: string;
    readonly allow: readonly string[];
    readonly disallow: readonly string[];
  };
  readonly structuredData: {
    readonly enabled: boolean;
    readonly types: readonly ('Person' | 'Organization' | 'WebSite' | 'Article' | 'BreadcrumbList')[];
  };
  readonly openGraph: {
    readonly enabled: boolean;
    readonly type: 'website' | 'article' | 'profile';
    readonly locale: string;
    readonly siteName: string;
  };
  readonly twitter: {
    readonly enabled: boolean;
    readonly card: 'summary' | 'summary_large_image' | 'app' | 'player';
    readonly site?: string;
    readonly creator?: string;
  };
}

// === CONFIGURAÇÃO DE ANALYTICS ===

/** Configuração de analytics */
export interface AnalyticsConfig {
  readonly enabled: boolean;
  readonly providers: {
    readonly googleAnalytics?: {
      readonly measurementId: string;
      readonly anonymizeIp: boolean;
      readonly cookieConsent: boolean;
    };
    readonly googleTagManager?: {
      readonly containerId: string;
    };
    readonly facebookPixel?: {
      readonly pixelId: string;
    };
    readonly hotjar?: {
      readonly siteId: string;
    };
    readonly mixpanel?: {
      readonly token: string;
    };
  };
  readonly events: {
    readonly pageViews: boolean;
    readonly clicks: boolean;
    readonly scrollDepth: boolean;
    readonly formSubmissions: boolean;
    readonly downloads: boolean;
    readonly outboundLinks: boolean;
  };
  readonly privacy: {
    readonly cookieConsent: boolean;
    readonly dataRetention: number; // dias
    readonly anonymization: boolean;
  };
}

// === CONFIGURAÇÃO DE PWA ===

/** Configuração de Progressive Web App */
export interface PWAConfig {
  readonly enabled: boolean;
  readonly name: string;
  readonly shortName: string;
  readonly description: string;
  readonly themeColor: string;
  readonly backgroundColor: string;
  readonly display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  readonly orientation: 'portrait' | 'landscape' | 'any';
  readonly startUrl: string;
  readonly scope: string;
  readonly icons: readonly {
    readonly src: string;
    readonly sizes: string;
    readonly type: string;
    readonly purpose?: 'any' | 'maskable' | 'monochrome';
  }[];
  readonly serviceWorker: {
    readonly enabled: boolean;
    readonly strategy: 'networkFirst' | 'cacheFirst' | 'staleWhileRevalidate';
    readonly cacheName: string;
    readonly precache: readonly string[];
    readonly runtimeCache: readonly {
      readonly urlPattern: string;
      readonly handler: string;
      readonly options?: Record<string, unknown>;
    }[];
  };
  readonly manifest: {
    readonly filename: string;
    readonly crossorigin: 'anonymous' | 'use-credentials' | null;
  };
}

// === CONFIGURAÇÃO DE INTERNACIONALIZAÇÃO ===

/** Configuração de i18n */
export interface I18nConfig {
  readonly enabled: boolean;
  readonly defaultLocale: string;
  readonly locales: readonly string[];
  readonly fallbackLocale: string;
  readonly detection: {
    readonly order: readonly ('localStorage' | 'navigator' | 'htmlTag' | 'path' | 'subdomain')[];
    readonly caches: readonly ('localStorage' | 'cookie')[];
  };
  readonly resources: Record<string, Record<string, string>>;
  readonly interpolation: {
    readonly escapeValue: boolean;
    readonly formatSeparator: string;
  };
}

// === CONFIGURAÇÃO DE SEGURANÇA ===

/** Configuração de segurança */
export interface SecurityConfig {
  readonly csp: {
    readonly enabled: boolean;
    readonly directives: Record<string, readonly string[]>;
  };
  readonly cors: {
    readonly enabled: boolean;
    readonly origin: readonly string[];
    readonly methods: readonly string[];
    readonly headers: readonly string[];
  };
  readonly rateLimit: {
    readonly enabled: boolean;
    readonly windowMs: number;
    readonly max: number;
  };
  readonly headers: {
    readonly xFrameOptions: 'DENY' | 'SAMEORIGIN' | 'ALLOW-FROM';
    readonly xContentTypeOptions: boolean;
    readonly xXSSProtection: boolean;
    readonly referrerPolicy: string;
    readonly hsts: {
      readonly enabled: boolean;
      readonly maxAge: number;
      readonly includeSubDomains: boolean;
    };
  };
}

// === CONFIGURAÇÃO DE CACHE ===

/** Configuração de cache */
export interface CacheConfig {
  readonly enabled: boolean;
  readonly strategy: 'memory' | 'localStorage' | 'sessionStorage' | 'indexedDB';
  readonly ttl: number; // Time to live em segundos
  readonly maxSize: number; // Tamanho máximo em MB
  readonly compression: boolean;
  readonly encryption: boolean;
  readonly keys: {
    readonly prefix: string;
    readonly separator: string;
  };
  readonly invalidation: {
    readonly onUpdate: boolean;
    readonly onError: boolean;
    readonly manual: boolean;
  };
}

// === CONFIGURAÇÃO DE API ===

/** Configuração de API */
export interface APIConfig {
  readonly baseUrl: string;
  readonly timeout: number;
  readonly retries: number;
  readonly retryDelay: number;
  readonly headers: Record<string, string>;
  readonly auth: {
    readonly type: 'bearer' | 'basic' | 'apikey' | 'none';
    readonly token?: string;
    readonly refreshUrl?: string;
  };
  readonly endpoints: Record<string, {
    readonly url: string;
    readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    readonly cache?: boolean;
    readonly timeout?: number;
  }>;
  readonly mock: {
    readonly enabled: boolean;
    readonly delay: number;
    readonly errorRate: number;
  };
}

// === CONFIGURAÇÃO DE MONITORAMENTO ===

/** Configuração de monitoramento */
export interface MonitoringConfig {
  readonly enabled: boolean;
  readonly errorTracking: {
    readonly enabled: boolean;
    readonly dsn?: string;
    readonly environment: string;
    readonly sampleRate: number;
  };
  readonly performance: {
    readonly enabled: boolean;
    readonly sampleRate: number;
    readonly vitals: boolean;
    readonly longTasks: boolean;
    readonly navigation: boolean;
  };
  readonly logging: {
    readonly enabled: boolean;
    readonly level: 'error' | 'warn' | 'info' | 'debug';
    readonly remote: boolean;
    readonly console: boolean;
  };
  readonly alerts: {
    readonly enabled: boolean;
    readonly thresholds: {
      readonly errorRate: number;
      readonly responseTime: number;
      readonly memoryUsage: number;
    };
  };
}

// === CONFIGURAÇÃO COMPLETA ===

/** Configuração completa da aplicação */
export interface FullAppConfig extends AppConfig {
  readonly seo: SEOConfig;
  readonly analytics: AnalyticsConfig;
  readonly pwa: PWAConfig;
  readonly i18n: I18nConfig;
  readonly security: SecurityConfig;
  readonly cache: CacheConfig;
  readonly api: APIConfig;
  readonly monitoring: MonitoringConfig;
}

// === TIPOS UTILITÁRIOS ===

/** Configuração de ambiente */
export type Environment = 'development' | 'staging' | 'production';

/** Configuração por ambiente */
export type EnvironmentConfig<T> = Record<Environment, T>;

/** Configuração condicional */
export type ConditionalConfig<T> = T | ((env: Environment) => T);

// === VALIDADORES ===

/** Valida se uma configuração é válida */
export type ConfigValidator<T> = (config: T) => boolean | string;

/** Schema de validação */
export interface ConfigSchema<T> {
  readonly required: readonly (keyof T)[];
  readonly optional: readonly (keyof T)[];
  readonly validators: Partial<Record<keyof T, ConfigValidator<T[keyof T]>>>;
}

// === HELPERS ===

/** Merge de configurações */
export type MergeConfigs<T, U> = T & U;

/** Configuração parcial profunda */
export type DeepPartialConfig<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartialConfig<T[P]> : T[P];
};

/** Configuração com overrides */
export interface ConfigWithOverrides<T> {
  readonly base: T;
  readonly overrides: DeepPartialConfig<T>;
  readonly environment: Environment;
}