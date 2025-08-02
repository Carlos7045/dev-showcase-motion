export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: StructuredData;
  author?: string;
  publishDate?: string;
  modifiedDate?: string;
  articleType?: 'article' | 'website' | 'profile';
  locale?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface PersonStructuredData extends StructuredData {
  '@type': 'Person';
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  sameAs: string[];
  contactPoint: ContactPoint;
  address?: Address;
  geo?: GeoCoordinates;
}

export interface OrganizationStructuredData extends StructuredData {
  '@type': 'Organization';
  name: string;
  description: string;
  url: string;
  logo: string;
  contactPoint: ContactPoint;
  address?: Address;
  sameAs: string[];
}

export interface ArticleStructuredData extends StructuredData {
  '@type': 'Article';
  headline: string;
  description: string;
  author: {
    '@type': 'Person';
    name: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
  image: string;
}

export interface ServiceStructuredData extends StructuredData {
  '@type': 'Service';
  name: string;
  description: string;
  provider: {
    '@type': 'Person' | 'Organization';
    name: string;
  };
  areaServed: string;
  serviceType: string;
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
    description: string;
  }[];
}

export interface ContactPoint {
  '@type': 'ContactPoint';
  telephone: string;
  contactType: string;
  email?: string;
  availableLanguage: string[];
}

export interface Address {
  '@type': 'PostalAddress';
  streetAddress?: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string;
  addressCountry: string;
}

export interface GeoCoordinates {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}

export interface BreadcrumbStructuredData extends StructuredData {
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

export interface FAQStructuredData extends StructuredData {
  '@type': 'FAQPage';
  mainEntity: FAQItem[];
}

export interface FAQItem {
  '@type': 'Question';
  name: string;
  acceptedAnswer: {
    '@type': 'Answer';
    text: string;
  };
}