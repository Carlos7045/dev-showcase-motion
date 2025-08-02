/**
 * SEO Configuration - Configurações de SEO e meta tags
 * Dados estruturados e configurações para otimização de mecanismos de busca
 */

import { SEO_CONFIG, PERSONAL_INFO, CONTACT_INFO, SOCIAL_LINKS } from './app';

// === META TAGS BÁSICAS ===
export const DEFAULT_META_TAGS = {
  title: SEO_CONFIG.siteName,
  description: SEO_CONFIG.siteDescription,
  keywords: [
    'desenvolvedor full stack',
    'react developer',
    'node.js developer',
    'typescript developer',
    'web developer',
    'frontend developer',
    'backend developer',
    'automação',
    'api development',
    'carlos henrique salgado',
    'desenvolvedor brasil',
    'freelancer developer',
    'next.js developer',
    'javascript developer',
    'python developer',
  ].join(', '),
  author: PERSONAL_INFO.name,
  robots: 'index, follow',
  language: 'pt-BR',
  revisitAfter: '7 days',
  distribution: 'global',
  rating: 'general',
} as const;

// === OPEN GRAPH TAGS ===
export const OPEN_GRAPH_TAGS = {
  type: 'website',
  locale: SEO_CONFIG.locale,
  alternateLocales: SEO_CONFIG.alternateLocales,
  siteName: SEO_CONFIG.siteName,
  title: SEO_CONFIG.siteName,
  description: SEO_CONFIG.siteDescription,
  url: SEO_CONFIG.siteUrl,
  image: {
    url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultImage}`,
    width: 1200,
    height: 630,
    alt: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
    type: 'image/jpeg',
  },
  profile: {
    firstName: PERSONAL_INFO.name.split(' ')[0],
    lastName: PERSONAL_INFO.name.split(' ').slice(1).join(' '),
    username: SOCIAL_LINKS.github.username,
    gender: 'male',
  },
} as const;

// === TWITTER CARD TAGS ===
export const TWITTER_CARD_TAGS = {
  card: 'summary_large_image',
  site: SEO_CONFIG.twitterHandle,
  creator: SEO_CONFIG.twitterHandle,
  title: SEO_CONFIG.siteName,
  description: SEO_CONFIG.siteDescription,
  image: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultImage}`,
  imageAlt: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
} as const;

// === STRUCTURED DATA (JSON-LD) ===
export const STRUCTURED_DATA = {
  // Person Schema
  person: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.title,
    description: PERSONAL_INFO.bio,
    url: SEO_CONFIG.siteUrl,
    image: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultImage}`,
    email: CONTACT_INFO.email,
    telephone: CONTACT_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: CONTACT_INFO.location.city,
      addressRegion: CONTACT_INFO.location.state,
      addressCountry: CONTACT_INFO.location.country,
    },
    sameAs: [
      SOCIAL_LINKS.github.url,
      SOCIAL_LINKS.linkedin.url,
      SOCIAL_LINKS.instagram.url,
      SOCIAL_LINKS.twitter.url,
    ],
    knowsAbout: [
      'Web Development',
      'Full Stack Development',
      'React',
      'Node.js',
      'TypeScript',
      'JavaScript',
      'Python',
      'API Development',
      'Database Design',
      'Automation',
      'DevOps',
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'Universidade Federal do Maranhão',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Freelancer',
    },
  },

  // Professional Service Schema
  professionalService: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${PERSONAL_INFO.name} - Desenvolvimento Web`,
    description: 'Serviços de desenvolvimento web full stack, criação de APIs, automações e consultoria técnica.',
    url: SEO_CONFIG.siteUrl,
    image: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultImage}`,
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: CONTACT_INFO.location.city,
      addressRegion: CONTACT_INFO.location.state,
      addressCountry: CONTACT_INFO.location.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -2.5307,
      longitude: -44.3068,
    },
    serviceType: 'Web Development',
    provider: {
      '@type': 'Person',
      name: PERSONAL_INFO.name,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
    availableLanguage: ['Portuguese', 'English'],
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'PayPal', 'Pix'],
    currenciesAccepted: 'BRL, USD',
  },

  // Website Schema
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.siteDescription,
    url: SEO_CONFIG.siteUrl,
    author: {
      '@type': 'Person',
      name: PERSONAL_INFO.name,
    },
    inLanguage: SEO_CONFIG.locale,
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Person',
      name: PERSONAL_INFO.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },

  // Organization Schema (for business representation)
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: `${PERSONAL_INFO.name} - Desenvolvimento Web`,
    description: 'Desenvolvimento de soluções web personalizadas, APIs robustas e automações inteligentes.',
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/logo.png`,
    image: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultImage}`,
    email: CONTACT_INFO.email,
    telephone: CONTACT_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: CONTACT_INFO.location.city,
      addressRegion: CONTACT_INFO.location.state,
      addressCountry: CONTACT_INFO.location.country,
    },
    founder: {
      '@type': 'Person',
      name: PERSONAL_INFO.name,
    },
    foundingDate: '2019',
    numberOfEmployees: 1,
    sameAs: [
      SOCIAL_LINKS.github.url,
      SOCIAL_LINKS.linkedin.url,
      SOCIAL_LINKS.instagram.url,
      SOCIAL_LINKS.twitter.url,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phone,
      email: CONTACT_INFO.email,
      contactType: 'Customer Service',
      availableLanguage: ['Portuguese', 'English'],
    },
  },

  // Breadcrumb Schema
  breadcrumb: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SEO_CONFIG.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sobre',
        item: `${SEO_CONFIG.siteUrl}#about`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Serviços',
        item: `${SEO_CONFIG.siteUrl}#services`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Portfolio',
        item: `${SEO_CONFIG.siteUrl}#portfolio`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contato',
        item: `${SEO_CONFIG.siteUrl}#contact`,
      },
    ],
  },
} as const;

// === CONFIGURAÇÕES POR PÁGINA ===
export const PAGE_SEO_CONFIG = {
  home: {
    title: SEO_CONFIG.siteName,
    description: SEO_CONFIG.siteDescription,
    keywords: DEFAULT_META_TAGS.keywords,
    canonical: SEO_CONFIG.siteUrl,
    structuredData: [
      STRUCTURED_DATA.person,
      STRUCTURED_DATA.website,
      STRUCTURED_DATA.professionalService,
      STRUCTURED_DATA.breadcrumb,
    ],
  },
  about: {
    title: `Sobre - ${PERSONAL_INFO.name}`,
    description: `Conheça ${PERSONAL_INFO.name}, ${PERSONAL_INFO.title.toLowerCase()} com ${PERSONAL_INFO.experience} de experiência em desenvolvimento web, especializado em React, Node.js e automações.`,
    keywords: `${DEFAULT_META_TAGS.keywords}, sobre carlos henrique, experiência desenvolvedor, formação desenvolvedor`,
    canonical: `${SEO_CONFIG.siteUrl}#about`,
    structuredData: [STRUCTURED_DATA.person],
  },
  services: {
    title: `Serviços - ${PERSONAL_INFO.name}`,
    description: 'Desenvolvimento web, criação de APIs, automações de processos e consultoria técnica. Soluções personalizadas para seu negócio.',
    keywords: `${DEFAULT_META_TAGS.keywords}, serviços desenvolvimento, desenvolvimento web, criação api, automação processos`,
    canonical: `${SEO_CONFIG.siteUrl}#services`,
    structuredData: [STRUCTURED_DATA.professionalService],
  },
  portfolio: {
    title: `Portfolio - ${PERSONAL_INFO.name}`,
    description: 'Confira os projetos desenvolvidos: sistemas CRM, e-commerce, dashboards, automações e integrações API.',
    keywords: `${DEFAULT_META_TAGS.keywords}, portfolio desenvolvedor, projetos web, sistemas crm, ecommerce, dashboard`,
    canonical: `${SEO_CONFIG.siteUrl}#portfolio`,
    structuredData: [STRUCTURED_DATA.person],
  },
  contact: {
    title: `Contato - ${PERSONAL_INFO.name}`,
    description: `Entre em contato com ${PERSONAL_INFO.name} para discutir seu projeto. WhatsApp, email ou LinkedIn. Resposta rápida garantida.`,
    keywords: `${DEFAULT_META_TAGS.keywords}, contato desenvolvedor, orçamento desenvolvimento, whatsapp desenvolvedor`,
    canonical: `${SEO_CONFIG.siteUrl}#contact`,
    structuredData: [STRUCTURED_DATA.person, STRUCTURED_DATA.organization],
  },
} as const;

// === HELPERS PARA SEO ===
export const generateMetaTags = (pageKey: keyof typeof PAGE_SEO_CONFIG) => {
  const pageConfig = PAGE_SEO_CONFIG[pageKey];
  
  return {
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: pageConfig.keywords,
    canonical: pageConfig.canonical,
    openGraph: {
      ...OPEN_GRAPH_TAGS,
      title: pageConfig.title,
      description: pageConfig.description,
      url: pageConfig.canonical,
    },
    twitter: {
      ...TWITTER_CARD_TAGS,
      title: pageConfig.title,
      description: pageConfig.description,
    },
    structuredData: pageConfig.structuredData,
  };
};

export const generateStructuredData = (data: any) => {
  return JSON.stringify(data, null, 0);
};

export const generateSitemap = () => {
  const pages = Object.keys(PAGE_SEO_CONFIG);
  const baseUrl = SEO_CONFIG.siteUrl;
  
  return pages.map(page => ({
    url: page === 'home' ? baseUrl : `${baseUrl}#${page}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: page === 'home' ? 1.0 : 0.8,
  }));
};

export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

Sitemap: ${SEO_CONFIG.siteUrl}/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /.env
Disallow: /config/

# Allow important resources
Allow: /assets/
Allow: /images/
Allow: /css/
Allow: /js/`;
};

// === CONFIGURAÇÕES DE ANALYTICS ===
export const ANALYTICS_CONFIG = {
  googleAnalytics: {
    measurementId: process.env.VITE_GA_MEASUREMENT_ID || '',
    enabled: !!process.env.VITE_GA_MEASUREMENT_ID,
  },
  googleTagManager: {
    containerId: process.env.VITE_GTM_CONTAINER_ID || '',
    enabled: !!process.env.VITE_GTM_CONTAINER_ID,
  },
  facebookPixel: {
    pixelId: process.env.VITE_FB_PIXEL_ID || '',
    enabled: !!process.env.VITE_FB_PIXEL_ID,
  },
  hotjar: {
    siteId: process.env.VITE_HOTJAR_SITE_ID || '',
    enabled: !!process.env.VITE_HOTJAR_SITE_ID,
  },
} as const;

// === TIPOS ===
export type MetaTags = ReturnType<typeof generateMetaTags>;
export type PageSEOConfig = typeof PAGE_SEO_CONFIG;
export type StructuredDataType = typeof STRUCTURED_DATA;
export type AnalyticsConfig = typeof ANALYTICS_CONFIG;