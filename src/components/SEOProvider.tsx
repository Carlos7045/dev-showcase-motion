import React from 'react';
import { SEO } from './SEO';
import { useSEO, useServiceSEO, useBlogPostSEO, usePortfolioSEO } from '@/hooks/useSEO';

// Componente para páginas gerais
interface SEOPageProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  generatePersonSchema?: boolean;
  generateWebsiteSchema?: boolean;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  noIndex?: boolean;
  noFollow?: boolean;
  children?: React.ReactNode;
}

export const SEOPage: React.FC<SEOPageProps> = ({
  children,
  noIndex,
  noFollow,
  ...seoOptions
}) => {
  const seoData = useSEO(seoOptions);

  return (
    <>
      <SEO data={seoData} noIndex={noIndex} noFollow={noFollow} />
      {children}
    </>
  );
};

// Componente específico para páginas de serviço
interface SEOServicePageProps {
  serviceData: {
    name: string;
    description: string;
    slug: string;
    keywords?: string[];
    features?: string[];
  };
  noIndex?: boolean;
  noFollow?: boolean;
  children?: React.ReactNode;
}

export const SEOServicePage: React.FC<SEOServicePageProps> = ({
  serviceData,
  noIndex,
  noFollow,
  children
}) => {
  const seoData = useServiceSEO(serviceData);

  return (
    <>
      <SEO data={seoData} noIndex={noIndex} noFollow={noFollow} />
      {children}
    </>
  );
};

// Componente específico para posts do blog
interface SEOBlogPostPageProps {
  postData: {
    title: string;
    description: string;
    slug: string;
    author?: string;
    publishDate: string;
    modifiedDate?: string;
    keywords?: string[];
    category?: string;
  };
  noIndex?: boolean;
  noFollow?: boolean;
  children?: React.ReactNode;
}

export const SEOBlogPostPage: React.FC<SEOBlogPostPageProps> = ({
  postData,
  noIndex,
  noFollow,
  children
}) => {
  const seoData = useBlogPostSEO(postData);

  return (
    <>
      <SEO data={seoData} noIndex={noIndex} noFollow={noFollow} />
      {children}
    </>
  );
};

// Componente específico para projetos do portfólio
interface SEOPortfolioPageProps {
  projectData: {
    title: string;
    description: string;
    slug: string;
    technologies?: string[];
    category?: string;
  };
  noIndex?: boolean;
  noFollow?: boolean;
  children?: React.ReactNode;
}

export const SEOPortfolioPage: React.FC<SEOPortfolioPageProps> = ({
  projectData,
  noIndex,
  noFollow,
  children
}) => {
  const seoData = usePortfolioSEO(projectData);

  return (
    <>
      <SEO data={seoData} noIndex={noIndex} noFollow={noFollow} />
      {children}
    </>
  );
};

// Componente para páginas com múltiplos schemas estruturados
interface SEOMultiSchemaPageProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  schemas: any[];
  breadcrumbs?: Array<{ name: string; url: string }>;
  noIndex?: boolean;
  noFollow?: boolean;
  children?: React.ReactNode;
}

export const SEOMultiSchemaPage: React.FC<SEOMultiSchemaPageProps> = ({
  schemas,
  breadcrumbs,
  noIndex,
  noFollow,
  children,
  ...seoOptions
}) => {
  const baseSeoData = useSEO(seoOptions);
  
  // Combina os schemas fornecidos com breadcrumbs se existirem
  let combinedSchemas = [...schemas];
  
  if (breadcrumbs && breadcrumbs.length > 0) {
    const { StructuredDataGenerator } = require('@/utils/structuredData');
    const breadcrumbSchema = StructuredDataGenerator.createBreadcrumbSchema(breadcrumbs);
    combinedSchemas.push(breadcrumbSchema);
  }

  const seoData = {
    ...baseSeoData,
    structuredData: combinedSchemas.length === 1 ? combinedSchemas[0] : combinedSchemas
  };

  return (
    <>
      <SEO data={seoData} noIndex={noIndex} noFollow={noFollow} />
      {children}
    </>
  );
};