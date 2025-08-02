import {
  PersonStructuredData,
  OrganizationStructuredData,
  ArticleStructuredData,
  ServiceStructuredData,
  BreadcrumbStructuredData,
  FAQStructuredData,
  ContactPoint,
  Address,
  GeoCoordinates
} from '@/types/seo';

export class StructuredDataGenerator {
  private static baseContext = 'https://schema.org';

  static createPersonSchema(data: {
    name: string;
    jobTitle: string;
    description: string;
    url: string;
    sameAs: string[];
    telephone: string;
    email?: string;
    address?: Omit<Address, '@type'>;
    geo?: Omit<GeoCoordinates, '@type'>;
  }): PersonStructuredData {
    const contactPoint: ContactPoint = {
      '@type': 'ContactPoint',
      telephone: data.telephone,
      contactType: 'customer service',
      availableLanguage: ['pt-BR', 'en-US']
    };

    if (data.email) {
      contactPoint.email = data.email;
    }

    const schema: PersonStructuredData = {
      '@context': this.baseContext,
      '@type': 'Person',
      name: data.name,
      jobTitle: data.jobTitle,
      description: data.description,
      url: data.url,
      sameAs: data.sameAs,
      contactPoint
    };

    if (data.address) {
      schema.address = {
        '@type': 'PostalAddress',
        ...data.address
      };
    }

    if (data.geo) {
      schema.geo = {
        '@type': 'GeoCoordinates',
        ...data.geo
      };
    }

    return schema;
  }

  static createOrganizationSchema(data: {
    name: string;
    description: string;
    url: string;
    logo: string;
    telephone: string;
    email?: string;
    address?: Omit<Address, '@type'>;
    sameAs: string[];
  }): OrganizationStructuredData {
    const contactPoint: ContactPoint = {
      '@type': 'ContactPoint',
      telephone: data.telephone,
      contactType: 'customer service',
      availableLanguage: ['pt-BR', 'en-US']
    };

    if (data.email) {
      contactPoint.email = data.email;
    }

    const schema: OrganizationStructuredData = {
      '@context': this.baseContext,
      '@type': 'Organization',
      name: data.name,
      description: data.description,
      url: data.url,
      logo: data.logo,
      contactPoint,
      sameAs: data.sameAs
    };

    if (data.address) {
      schema.address = {
        '@type': 'PostalAddress',
        ...data.address
      };
    }

    return schema;
  }

  static createArticleSchema(data: {
    headline: string;
    description: string;
    author: string;
    publisherName: string;
    publisherLogo: string;
    datePublished: string;
    dateModified: string;
    url: string;
    image: string;
  }): ArticleStructuredData {
    return {
      '@context': this.baseContext,
      '@type': 'Article',
      headline: data.headline,
      description: data.description,
      author: {
        '@type': 'Person',
        name: data.author
      },
      publisher: {
        '@type': 'Organization',
        name: data.publisherName,
        logo: {
          '@type': 'ImageObject',
          url: data.publisherLogo
        }
      },
      datePublished: data.datePublished,
      dateModified: data.dateModified,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': data.url
      },
      image: data.image
    };
  }

  static createServiceSchema(data: {
    name: string;
    description: string;
    providerName: string;
    providerType: 'Person' | 'Organization';
    areaServed: string;
    serviceType: string;
    offers?: Array<{
      price: string;
      priceCurrency: string;
      description: string;
    }>;
  }): ServiceStructuredData {
    const schema: ServiceStructuredData = {
      '@context': this.baseContext,
      '@type': 'Service',
      name: data.name,
      description: data.description,
      provider: {
        '@type': data.providerType,
        name: data.providerName
      },
      areaServed: data.areaServed,
      serviceType: data.serviceType
    };

    if (data.offers && data.offers.length > 0) {
      schema.offers = data.offers.map(offer => ({
        '@type': 'Offer',
        price: offer.price,
        priceCurrency: offer.priceCurrency,
        description: offer.description
      }));
    }

    return schema;
  }

  static createBreadcrumbSchema(items: Array<{
    name: string;
    url: string;
  }>): BreadcrumbStructuredData {
    return {
      '@context': this.baseContext,
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  }

  static createFAQSchema(faqs: Array<{
    question: string;
    answer: string;
  }>): FAQStructuredData {
    return {
      '@context': this.baseContext,
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }

  static createWebsiteSchema(data: {
    name: string;
    url: string;
    description: string;
    author: string;
    sameAs: string[];
  }) {
    return {
      '@context': this.baseContext,
      '@type': 'WebSite',
      name: data.name,
      url: data.url,
      description: data.description,
      author: {
        '@type': 'Person',
        name: data.author
      },
      sameAs: data.sameAs,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${data.url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };
  }
}