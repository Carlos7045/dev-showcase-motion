export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  publishDate: Date;
  updatedDate?: Date;
  categories: Category[];
  tags: string[];
  readingTime: number;
  featured: boolean;
  coverImage?: string;
  seoData: SEOData;
}

export interface Author {
  name: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export interface BlogMetadata {
  totalPosts: number;
  categories: Category[];
  tags: string[];
  recentPosts: BlogPost[];
  featuredPosts: BlogPost[];
}