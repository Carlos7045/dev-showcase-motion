export interface Author {
  name: string;
  avatar: string;
  bio: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  publishDate: Date;
  categories: Category[];
  tags: string[];
  readingTime: number;
  featured: boolean;
  seoData: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}