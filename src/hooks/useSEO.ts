import { useMemo } from 'react';
import { SEOData } from '@/types/seo';
import { defaultSEOConfig } from '@/config/seo';
import { StructuredDataGenerator } from '@/utils/structuredData';
import { CanonicalUrlManager } from '@/utils/canonicalUrl';

interface UseSEOOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  author?: string;
  publishDate?: string;
  modifiedDate?: string;
  articleType?: 'article' | 'website' | 'profile';
  generatePersonSchema?: boolean;
  generateWebsiteSchema?: boolean;
  generateArticleSchema?: boolean;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
}

export const useSEO = (options: UseSEOOptions = {}): SEOData => {
  return useMemo(() => {
    const {
      title,
      description,
      keywords,
      ogImage,
      canonicalUrl,
      author,
      publishDate,
      modifiedDate,
      articleType = 'website',
      generatePersonSchema = false,
      generateWebsiteSchema = false,
      generateArticleSchema = false,
      breadcrumbs,
      faqs
    } = options;

    // Gera URL canônica se não fornecida
    const finalCanonicalUrl = canonicalUrl || CanonicalUrlManager.getCurrentCanonicalUrl();

    // Gera dados estruturados baseados nas opções
    let structuredData: any = null;

    if (generatePersonSchema) {
      structuredData = StructuredDataGenerator.createPersonSchema({
        name: defaultSEOConfig.author,
        jobTitle: 'Desenvolvedor Full-Stack',
        description: defaultSEOConfig.defaultDescription,
        url: defaultSEOConfig.siteUrl,
        sameAs: Object.values(defaultSEOConfig.socialMedia),
        telephone: defaultSEOConfig.telephone,
        email: defaultSEOConfig.email,
        address: defaultSEOConfig.address
      });
    } else if (generateWebsiteSchema) {
      structuredData = StructuredDataGenerator.createWebsiteSchema({
        name: defaultSEOConfig.siteName,
        url: defaultSEOConfig.siteUrl,
        description: defaultSEOConfig.defaultDescription,
        author: defaultSEOConfig.author,
        sameAs: Object.values(defaultSEOConfig.socialMedia)
      });
    } else if (generateArticleSchema && title && publishDate) {
      structuredData = StructuredDataGenerator.createArticleSchema({
        headline: title,
        description: description || defaultSEOConfig.defaultDescription,
        author: author || defaultSEOConfig.author,
        publisherName: defaultSEOConfig.siteName,
        publisherLogo: `${defaultSEOConfig.siteUrl}/logo.png`,
        datePublished: publishDate,
        dateModified: modifiedDate || publishDate,
        url: finalCanonicalUrl,
        image: ogImage || defaultSEOConfig.defaultOGImage
      });
    }

    // Adiciona breadcrumbs se fornecidos
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = StructuredDataGenerator.createBreadcrumbSchema(breadcrumbs);
      
      if (structuredData) {
        // Se já existe structured data, cria um array
        structuredData = [structuredData, breadcrumbSchema];
      } else {
        structuredData = breadcrumbSchema;
      }
    }

    // Adiciona FAQs se fornecidos
    if (faqs && faqs.length > 0) {
      const faqSchema = StructuredDataGenerator.createFAQSchema(faqs);
      
      if (Array.isArray(structuredData)) {
        structuredData.push(faqSchema);
      } else if (structuredData) {
        structuredData = [structuredData, faqSchema];
      } else {
        structuredData = faqSchema;
      }
    }

    return {
      title: title || defaultSEOConfig.defaultTitle,
      description: description || defaultSEOConfig.defaultDescription,
      keywords: keywords || defaultSEOConfig.defaultKeywords,
      ogImage: ogImage || defaultSEOConfig.defaultOGImage,
      canonicalUrl: finalCanonicalUrl,
      structuredData,
      author: author || defaultSEOConfig.author,
      publishDate,
      modifiedDate,
      articleType,
      locale: defaultSEOConfig.locale
    };
  }, [options]);
};

// Hook específico para páginas de serviço
export const useServiceSEO = (serviceData: {
  name: string;
  description: string;
  slug: string;
  keywords?: string[];
  features?: string[];
}) => {
  return useSEO({
    title: `${serviceData.name} - Serviços Profissionais`,
    description: serviceData.description,
    keywords: serviceData.keywords || [...defaultSEOConfig.defaultKeywords, serviceData.name.toLowerCase()],
    canonicalUrl: CanonicalUrlManager.generateServiceCanonicalUrl(serviceData.slug),
    generatePersonSchema: true,
    breadcrumbs: [
      { name: 'Home', url: defaultSEOConfig.siteUrl },
      { name: 'Serviços', url: `${defaultSEOConfig.siteUrl}/servicos` },
      { name: serviceData.name, url: CanonicalUrlManager.generateServiceCanonicalUrl(serviceData.slug) }
    ]
  });
};

// Hook específico para posts do blog
export const useBlogPostSEO = (postData: {
  title: string;
  description: string;
  slug: string;
  author?: string;
  publishDate: string;
  modifiedDate?: string;
  keywords?: string[];
  category?: string;
}) => {
  return useSEO({
    title: postData.title,
    description: postData.description,
    keywords: postData.keywords || [...defaultSEOConfig.defaultKeywords, 'blog', 'artigo'],
    canonicalUrl: CanonicalUrlManager.generateBlogPostCanonicalUrl(postData.slug),
    author: postData.author,
    publishDate: postData.publishDate,
    modifiedDate: postData.modifiedDate,
    articleType: 'article',
    generateArticleSchema: true,
    breadcrumbs: [
      { name: 'Home', url: defaultSEOConfig.siteUrl },
      { name: 'Blog', url: `${defaultSEOConfig.siteUrl}/blog` },
      ...(postData.category ? [{ name: postData.category, url: `${defaultSEOConfig.siteUrl}/blog/categoria/${postData.category.toLowerCase()}` }] : []),
      { name: postData.title, url: CanonicalUrlManager.generateBlogPostCanonicalUrl(postData.slug) }
    ]
  });
};

// Hook específico para projetos do portfólio
export const usePortfolioSEO = (projectData: {
  title: string;
  description: string;
  slug: string;
  technologies?: string[];
  category?: string;
}) => {
  return useSEO({
    title: `${projectData.title} - Projeto de Portfólio`,
    description: projectData.description,
    keywords: [
      ...defaultSEOConfig.defaultKeywords,
      'portfólio',
      'projeto',
      ...(projectData.technologies || [])
    ],
    canonicalUrl: CanonicalUrlManager.generatePortfolioCanonicalUrl(projectData.slug),
    generatePersonSchema: true,
    breadcrumbs: [
      { name: 'Home', url: defaultSEOConfig.siteUrl },
      { name: 'Portfólio', url: `${defaultSEOConfig.siteUrl}/portfolio` },
      ...(projectData.category ? [{ name: projectData.category, url: `${defaultSEOConfig.siteUrl}/portfolio/categoria/${projectData.category.toLowerCase()}` }] : []),
      { name: projectData.title, url: CanonicalUrlManager.generatePortfolioCanonicalUrl(projectData.slug) }
    ]
  });
};