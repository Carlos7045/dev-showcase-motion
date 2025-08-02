/**
 * Tipos base para toda a aplicação
 * Definições fundamentais que são reutilizadas em todo o projeto
 */

// === TIPOS UTILITÁRIOS ===

/** Torna todas as propriedades opcionais recursivamente */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** Torna todas as propriedades obrigatórias recursivamente */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/** Extrai tipos de união de arrays */
export type ArrayElement<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/** Cria um tipo com propriedades específicas opcionais */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Cria um tipo com propriedades específicas obrigatórias */
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// === ENTIDADES BASE ===

/** Interface base para todas as entidades com identificação */
export interface BaseEntity {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

/** Interface para entidades que podem ser ativadas/desativadas */
export interface ToggleableEntity {
  readonly isActive: boolean;
}

/** Interface para entidades que podem ser destacadas */
export interface FeaturedEntity {
  readonly isFeatured: boolean;
}

/** Interface para entidades com metadados */
export interface MetadataEntity {
  readonly metadata?: Record<string, unknown>;
}

// === TIPOS DE DADOS COMUNS ===

/** Dados de imagem otimizada */
export interface ImageData {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly placeholder?: string;
  readonly srcSet?: string;
  readonly sizes?: string;
  readonly loading?: 'lazy' | 'eager';
  readonly priority?: boolean;
}

/** Dados de link/URL */
export interface LinkData {
  readonly href: string;
  readonly label: string;
  readonly target?: '_blank' | '_self' | '_parent' | '_top';
  readonly rel?: string;
  readonly ariaLabel?: string;
}

/** Dados de SEO */
export interface SEOData {
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly ogImage?: ImageData;
  readonly ogType?: 'website' | 'article' | 'profile';
  readonly canonicalUrl?: string;
  readonly noIndex?: boolean;
  readonly noFollow?: boolean;
}

/** Dados de autor/pessoa */
export interface PersonData {
  readonly name: string;
  readonly email?: string;
  readonly avatar?: ImageData;
  readonly bio?: string;
  readonly location?: string;
  readonly website?: string;
  readonly socialLinks?: readonly SocialLinkData[];
}

/** Dados de link social */
export interface SocialLinkData extends LinkData {
  readonly platform: SocialPlatform;
  readonly username?: string;
  readonly icon?: string;
}

// === ENUMS E CONSTANTES ===

/** Plataformas de redes sociais suportadas */
export type SocialPlatform = 
  | 'github'
  | 'linkedin' 
  | 'twitter'
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'email'
  | 'whatsapp'
  | 'telegram';

/** Tamanhos padrão para componentes */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Variantes de cor para componentes */
export type ColorVariant = 
  | 'primary' 
  | 'secondary' 
  | 'accent' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info';

/** Estados de loading */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/** Direções para animações */
export type AnimationDirection = 'up' | 'down' | 'left' | 'right';

/** Tipos de dispositivo para responsividade */
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// === TIPOS DE EVENTOS ===

/** Handler genérico para eventos */
export type EventHandler<T = void> = (event: T) => void;

/** Handler para eventos de clique */
export type ClickHandler = EventHandler<React.MouseEvent<HTMLElement>>;

/** Handler para eventos de mudança */
export type ChangeHandler<T = string> = EventHandler<T>;

/** Handler para eventos de submit */
export type SubmitHandler<T = Record<string, unknown>> = EventHandler<T>;

// === TIPOS DE COMPONENTES REACT ===

/** Props base para todos os componentes */
export interface BaseComponentProps {
  readonly className?: string;
  readonly children?: React.ReactNode;
  readonly testId?: string;
}

/** Props para componentes com loading */
export interface LoadingProps {
  readonly loading?: boolean;
  readonly loadingText?: string;
}

/** Props para componentes com estado disabled */
export interface DisabledProps {
  readonly disabled?: boolean;
}

/** Props para componentes com variantes */
export interface VariantProps {
  readonly variant?: ColorVariant;
  readonly size?: ComponentSize;
}

/** Props para componentes com animação */
export interface AnimationProps {
  readonly animate?: boolean;
  readonly animationDelay?: number;
  readonly animationDuration?: number;
  readonly animationDirection?: AnimationDirection;
}

// === TIPOS DE API E DADOS ===

/** Resposta padrão da API */
export interface ApiResponse<T = unknown> {
  readonly data: T;
  readonly message?: string;
  readonly success: boolean;
  readonly timestamp: string;
}

/** Erro padrão da API */
export interface ApiError {
  readonly message: string;
  readonly code?: string | number;
  readonly details?: Record<string, unknown>;
  readonly timestamp: string;
}

/** Parâmetros de paginação */
export interface PaginationParams {
  readonly page: number;
  readonly limit: number;
  readonly offset?: number;
}

/** Resposta paginada */
export interface PaginatedResponse<T> {
  readonly data: readonly T[];
  readonly pagination: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly totalPages: number;
    readonly hasNext: boolean;
    readonly hasPrev: boolean;
  };
}

// === TIPOS DE CONFIGURAÇÃO ===

/** Configuração de tema */
export interface ThemeConfig {
  readonly mode: 'light' | 'dark' | 'system';
  readonly primaryColor: string;
  readonly fontFamily: string;
}

/** Configuração de performance */
export interface PerformanceConfig {
  readonly lazyLoading: boolean;
  readonly imageOptimization: boolean;
  readonly codesplitting: boolean;
  readonly prefetching: boolean;
}

/** Configuração de acessibilidade */
export interface AccessibilityConfig {
  readonly reducedMotion: boolean;
  readonly highContrast: boolean;
  readonly screenReader: boolean;
  readonly keyboardNavigation: boolean;
}

// === GUARDS DE TIPO ===

/** Verifica se um valor é uma string não vazia */
export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.length > 0;
};

/** Verifica se um valor é um número válido */
export const isValidNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/** Verifica se um valor é uma URL válida */
export const isValidUrl = (value: unknown): value is string => {
  if (!isNonEmptyString(value)) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

/** Verifica se um valor é um email válido */
export const isValidEmail = (value: unknown): value is string => {
  if (!isNonEmptyString(value)) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

// === CONSTANTES ===

/** Breakpoints para responsividade */
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/** Durações de animação padrão */
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

/** Z-index layers */
export const Z_INDEX = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1700,
  tooltip: 1800,
} as const;