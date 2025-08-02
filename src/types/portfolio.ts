export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  tags: string[];
  technologies: Technology[];
  images: ProjectImage[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'concept';
  startDate: Date;
  endDate?: Date;
  client?: Client;
  metrics?: ProjectMetrics;
  challenges: string[];
  solutions: string[];
  learnings: string[];
  seoData: SEOData;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'design' | 'other';
  color: string;
  icon?: string;
}

export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  type: 'hero' | 'screenshot' | 'mockup' | 'diagram' | 'before' | 'after';
  order: number;
}

export interface Client {
  name: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'enterprise';
  logo?: string;
}

export interface ProjectMetrics {
  performance?: {
    loadTime: string;
    lighthouse: number;
    coreWebVitals: string;
  };
  business?: {
    userIncrease?: string;
    conversionRate?: string;
    revenue?: string;
    timeToMarket?: string;
  };
  technical?: {
    codeReduction?: string;
    bugReduction?: string;
    testCoverage?: string;
    uptime?: string;
  };
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface PortfolioFilters {
  categories: string[];
  technologies: string[];
  status: string[];
  sortBy: 'newest' | 'oldest' | 'featured' | 'alphabetical';
}

export interface PortfolioMetadata {
  totalProjects: number;
  categories: ProjectCategory[];
  technologies: Technology[];
  featuredProjects: Project[];
}