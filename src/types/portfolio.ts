/**
 * Tipos específicos para o domínio do portfolio
 * Definições relacionadas a projetos, tecnologias e conteúdo do portfolio
 */

import type { 
  BaseEntity, 
  FeaturedEntity, 
  ImageData, 
  LinkData, 
  SEOData,
  SocialLinkData,
  PersonData 
} from './base';

// === TECNOLOGIAS ===

/** Categorias de tecnologia */
export type TechnologyCategory = 
  | 'frontend'
  | 'backend' 
  | 'database'
  | 'devops'
  | 'mobile'
  | 'design'
  | 'automation'
  | 'testing';

/** Dados de uma tecnologia */
export interface Technology {
  readonly name: string;
  readonly icon: string;
  readonly color: string;
  readonly category: TechnologyCategory;
  readonly proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  readonly yearsOfExperience?: number;
}

// === PROJETOS ===

/** Categorias de projeto */
export type ProjectCategory = 
  | 'web'
  | 'mobile'
  | 'desktop'
  | 'api'
  | 'automation'
  | 'design'
  | 'other';

/** Status do projeto */
export type ProjectStatus = 
  | 'planning'
  | 'development'
  | 'completed'
  | 'maintenance'
  | 'archived';

/** Tipos de link do projeto */
export type ProjectLinkType = 
  | 'demo'
  | 'repository'
  | 'documentation'
  | 'case-study'
  | 'download';

/** Link específico do projeto */
export interface ProjectLink extends LinkData {
  readonly type: ProjectLinkType;
  readonly icon?: string;
  readonly isPrimary?: boolean;
}

/** Dados completos de um projeto */
export interface Project extends BaseEntity, FeaturedEntity {
  readonly title: string;
  readonly description: string;
  readonly longDescription?: string;
  readonly image: ImageData;
  readonly gallery?: readonly ImageData[];
  readonly tags: readonly Technology[];
  readonly links: readonly ProjectLink[];
  readonly category: ProjectCategory;
  readonly status: ProjectStatus;
  readonly startDate: Date;
  readonly endDate?: Date;
  readonly client?: string;
  readonly teamSize?: number;
  readonly myRole?: string;
  readonly challenges?: readonly string[];
  readonly solutions?: readonly string[];
  readonly results?: readonly string[];
  readonly testimonial?: ProjectTestimonial;
  readonly seo?: SEOData;
}

/** Depoimento sobre o projeto */
export interface ProjectTestimonial {
  readonly content: string;
  readonly author: PersonData;
  readonly rating?: number;
  readonly date: Date;
}

// === SERVIÇOS ===

/** Tipos de serviço oferecido */
export type ServiceType = 
  | 'web-development'
  | 'mobile-development'
  | 'api-integration'
  | 'automation'
  | 'consulting'
  | 'maintenance'
  | 'design';

/** Dados de um serviço */
export interface Service extends BaseEntity {
  readonly title: string;
  readonly description: string;
  readonly longDescription?: string;
  readonly icon: string;
  readonly type: ServiceType;
  readonly features: readonly string[];
  readonly technologies: readonly Technology[];
  readonly pricing?: ServicePricing;
  readonly duration?: string;
  readonly deliverables?: readonly string[];
  readonly process?: readonly ServiceStep[];
}

/** Precificação do serviço */
export interface ServicePricing {
  readonly type: 'fixed' | 'hourly' | 'project' | 'custom';
  readonly amount?: number;
  readonly currency?: string;
  readonly description?: string;
}

/** Etapa do processo de serviço */
export interface ServiceStep {
  readonly title: string;
  readonly description: string;
  readonly duration?: string;
  readonly deliverables?: readonly string[];
}

// === EXPERIÊNCIA PROFISSIONAL ===

/** Tipo de experiência */
export type ExperienceType = 
  | 'full-time'
  | 'part-time'
  | 'contract'
  | 'freelance'
  | 'internship'
  | 'volunteer';

/** Dados de experiência profissional */
export interface Experience extends BaseEntity {
  readonly company: string;
  readonly position: string;
  readonly type: ExperienceType;
  readonly location?: string;
  readonly remote?: boolean;
  readonly startDate: Date;
  readonly endDate?: Date;
  readonly current?: boolean;
  readonly description: string;
  readonly responsibilities?: readonly string[];
  readonly achievements?: readonly string[];
  readonly technologies: readonly Technology[];
  readonly projects?: readonly string[]; // IDs dos projetos relacionados
  readonly companyLogo?: ImageData;
  readonly companyWebsite?: string;
}

// === EDUCAÇÃO ===

/** Tipo de educação */
export type EducationType = 
  | 'degree'
  | 'certificate'
  | 'course'
  | 'bootcamp'
  | 'workshop'
  | 'self-taught';

/** Dados de educação */
export interface Education extends BaseEntity {
  readonly institution: string;
  readonly degree: string;
  readonly field: string;
  readonly type: EducationType;
  readonly startDate: Date;
  readonly endDate?: Date;
  readonly current?: boolean;
  readonly grade?: string;
  readonly description?: string;
  readonly skills?: readonly string[];
  readonly projects?: readonly string[];
  readonly certificate?: LinkData;
  readonly institutionLogo?: ImageData;
}

// === HABILIDADES ===

/** Categoria de habilidade */
export type SkillCategory = 
  | 'technical'
  | 'soft'
  | 'language'
  | 'tool'
  | 'framework'
  | 'methodology';

/** Nível de proficiência */
export type ProficiencyLevel = 
  | 'beginner'
  | 'intermediate' 
  | 'advanced'
  | 'expert'
  | 'native';

/** Dados de uma habilidade */
export interface Skill extends BaseEntity {
  readonly name: string;
  readonly category: SkillCategory;
  readonly proficiency: ProficiencyLevel;
  readonly yearsOfExperience?: number;
  readonly description?: string;
  readonly icon?: string;
  readonly color?: string;
  readonly certifications?: readonly LinkData[];
  readonly relatedSkills?: readonly string[]; // IDs de skills relacionadas
}

// === BLOG/ARTIGOS ===

/** Status do artigo */
export type ArticleStatus = 
  | 'draft'
  | 'published'
  | 'archived'
  | 'scheduled';

/** Dados de um artigo */
export interface Article extends BaseEntity, FeaturedEntity {
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly content: string;
  readonly coverImage?: ImageData;
  readonly author: PersonData;
  readonly publishedAt?: Date;
  readonly updatedAt: Date;
  readonly status: ArticleStatus;
  readonly tags: readonly string[];
  readonly categories: readonly string[];
  readonly readingTime?: number;
  readonly views?: number;
  readonly likes?: number;
  readonly seo: SEOData;
}

// === CONTATO ===

/** Tipos de método de contato */
export type ContactMethod = 
  | 'email'
  | 'phone'
  | 'whatsapp'
  | 'linkedin'
  | 'form'
  | 'calendar';

/** Dados de método de contato */
export interface ContactMethodData {
  readonly type: ContactMethod;
  readonly value: string;
  readonly label: string;
  readonly icon: string;
  readonly primary?: boolean;
  readonly available?: boolean;
  readonly responseTime?: string;
}

/** Dados do formulário de contato */
export interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly subject?: string;
  readonly message: string;
  readonly company?: string;
  readonly budget?: string;
  readonly timeline?: string;
  readonly projectType?: ServiceType;
}

// === CONFIGURAÇÃO DO PORTFOLIO ===

/** Configuração geral do site */
export interface SiteConfig {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly logo?: ImageData;
  readonly favicon?: string;
  readonly author: PersonData;
  readonly social: readonly SocialLinkData[];
  readonly contact: readonly ContactMethodData[];
  readonly seo: SEOData;
  readonly analytics?: {
    readonly googleAnalytics?: string;
    readonly googleTagManager?: string;
    readonly facebookPixel?: string;
  };
}

/** Configuração de seções do portfolio */
export interface PortfolioSections {
  readonly hero: {
    readonly enabled: boolean;
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly backgroundImage?: ImageData;
    readonly ctaButtons: readonly LinkData[];
  };
  readonly about: {
    readonly enabled: boolean;
    readonly title: string;
    readonly description: string;
    readonly image?: ImageData;
    readonly skills: readonly Skill[];
    readonly downloadCV?: LinkData;
  };
  readonly services: {
    readonly enabled: boolean;
    readonly title: string;
    readonly description: string;
    readonly services: readonly Service[];
  };
  readonly portfolio: {
    readonly enabled: boolean;
    readonly title: string;
    readonly description: string;
    readonly projects: readonly Project[];
    readonly categories: readonly ProjectCategory[];
  };
  readonly experience: {
    readonly enabled: boolean;
    readonly title: string;
    readonly description: string;
    readonly experiences: readonly Experience[];
  };
  readonly blog: {
    readonly enabled: boolean;
    readonly title: string;
    readonly description: string;
    readonly articles: readonly Article[];
  };
  readonly contact: {
    readonly enabled: boolean;
    readonly title: string;
    readonly description: string;
    readonly methods: readonly ContactMethodData[];
    readonly form: boolean;
  };
}

// === FILTROS E BUSCA ===

/** Filtros para projetos */
export interface ProjectFilters {
  readonly category?: ProjectCategory;
  readonly status?: ProjectStatus;
  readonly technologies?: readonly string[];
  readonly featured?: boolean;
  readonly dateRange?: {
    readonly start: Date;
    readonly end: Date;
  };
}

/** Filtros para artigos */
export interface ArticleFilters {
  readonly status?: ArticleStatus;
  readonly tags?: readonly string[];
  readonly categories?: readonly string[];
  readonly author?: string;
  readonly featured?: boolean;
  readonly dateRange?: {
    readonly start: Date;
    readonly end: Date;
  };
}

/** Parâmetros de busca */
export interface SearchParams {
  readonly query: string;
  readonly type?: 'projects' | 'articles' | 'all';
  readonly filters?: ProjectFilters | ArticleFilters;
  readonly sortBy?: 'date' | 'title' | 'relevance';
  readonly sortOrder?: 'asc' | 'desc';
}

// === ANALYTICS E MÉTRICAS ===

/** Métricas do portfolio */
export interface PortfolioMetrics {
  readonly totalProjects: number;
  readonly completedProjects: number;
  readonly totalArticles: number;
  readonly totalViews: number;
  readonly totalLikes: number;
  readonly averageRating: number;
  readonly yearsOfExperience: number;
  readonly technologiesCount: number;
  readonly clientsCount: number;
}

/** Dados de analytics */
export interface AnalyticsData {
  readonly pageViews: number;
  readonly uniqueVisitors: number;
  readonly bounceRate: number;
  readonly averageSessionDuration: number;
  readonly topPages: readonly {
    readonly path: string;
    readonly views: number;
  }[];
  readonly topReferrers: readonly {
    readonly source: string;
    readonly visits: number;
  }[];
  readonly deviceTypes: readonly {
    readonly type: 'mobile' | 'desktop' | 'tablet';
    readonly percentage: number;
  }[];
}