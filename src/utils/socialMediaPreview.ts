import { OGImageGenerator, OGImageConfig } from './ogImageGenerator';
import { TwitterCardsOptimizer, TwitterCardData } from './twitterCards';
import { defaultSEOConfig } from '@/config/seo';

export interface SocialMediaPreviewData {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article' | 'service' | 'portfolio';
  author?: string;
  publishDate?: string;
  tags?: string[];
}

export interface OptimizedSocialData {
  openGraph: {
    title: string;
    description: string;
    image: string;
    url: string;
    type: string;
    siteName: string;
    locale: string;
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
  };
  twitter: TwitterCardData;
  linkedin: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
  whatsapp: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
}

export class SocialMediaPreviewOptimizer {
  /**
   * Otimiza dados para todas as plataformas sociais
   */
  static optimizeForAllPlatforms(data: SocialMediaPreviewData): OptimizedSocialData {
    // Gera imagem OG se não fornecida
    const ogImage = data.image || this.generateOptimizedImage(data);

    return {
      openGraph: this.optimizeForOpenGraph(data, ogImage),
      twitter: this.optimizeForTwitter(data, ogImage),
      linkedin: this.optimizeForLinkedIn(data, ogImage),
      whatsapp: this.optimizeForWhatsApp(data, ogImage)
    };
  }

  /**
   * Otimiza dados para Open Graph (Facebook, LinkedIn, etc.)
   */
  private static optimizeForOpenGraph(data: SocialMediaPreviewData, image: string) {
    return {
      title: this.optimizeTitle(data.title, 95), // Facebook: máximo 95 caracteres
      description: this.optimizeDescription(data.description, 297), // Facebook: máximo 297 caracteres
      image,
      url: data.url,
      type: this.mapTypeToOGType(data.type || 'website'),
      siteName: defaultSEOConfig.siteName,
      locale: defaultSEOConfig.locale,
      author: data.author,
      publishedTime: data.publishDate,
      modifiedTime: data.publishDate, // Pode ser diferente em atualizações
      tags: data.tags
    };
  }

  /**
   * Otimiza dados para Twitter
   */
  private static optimizeForTwitter(data: SocialMediaPreviewData, image: string): TwitterCardData {
    return TwitterCardsOptimizer.generateBasicCard({
      title: data.title,
      description: data.description,
      image,
      imageAlt: `Imagem para ${data.title}`,
      url: data.url,
      creator: data.author
    });
  }

  /**
   * Otimiza dados para LinkedIn
   */
  private static optimizeForLinkedIn(data: SocialMediaPreviewData, image: string) {
    return {
      title: this.optimizeTitle(data.title, 120), // LinkedIn: máximo 120 caracteres
      description: this.optimizeDescription(data.description, 300), // LinkedIn: máximo 300 caracteres
      image,
      url: data.url
    };
  }

  /**
   * Otimiza dados para WhatsApp
   */
  private static optimizeForWhatsApp(data: SocialMediaPreviewData, image: string) {
    return {
      title: this.optimizeTitle(data.title, 65), // WhatsApp: título mais curto
      description: this.optimizeDescription(data.description, 160), // WhatsApp: descrição mais curta
      image,
      url: data.url
    };
  }

  /**
   * Gera imagem otimizada baseada nos dados
   */
  private static generateOptimizedImage(data: SocialMediaPreviewData): string {
    const ogConfig: OGImageConfig = {
      title: data.title,
      type: data.type || 'website',
      author: data.author,
      date: data.publishDate,
      tags: data.tags
    };

    return OGImageGenerator.generateOGImageUrl(ogConfig);
  }

  /**
   * Otimiza título para diferentes plataformas
   */
  private static optimizeTitle(title: string, maxLength: number): string {
    if (title.length <= maxLength) return title;
    
    // Tenta cortar em uma palavra completa
    const truncated = title.substring(0, maxLength - 3);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > maxLength * 0.7) {
      return truncated.substring(0, lastSpace) + '...';
    }
    
    return truncated + '...';
  }

  /**
   * Otimiza descrição para diferentes plataformas
   */
  private static optimizeDescription(description: string, maxLength: number): string {
    if (description.length <= maxLength) return description;
    
    // Tenta cortar em uma frase completa
    const truncated = description.substring(0, maxLength - 3);
    const lastPeriod = truncated.lastIndexOf('.');
    const lastSpace = truncated.lastIndexOf(' ');
    
    // Prefere cortar em ponto final se estiver próximo do final
    if (lastPeriod > maxLength * 0.8) {
      return truncated.substring(0, lastPeriod + 1);
    }
    
    // Senão, corta em espaço
    if (lastSpace > maxLength * 0.7) {
      return truncated.substring(0, lastSpace) + '...';
    }
    
    return truncated + '...';
  }

  /**
   * Mapeia tipos internos para tipos Open Graph
   */
  private static mapTypeToOGType(type: string): string {
    const typeMap: Record<string, string> = {
      'website': 'website',
      'article': 'article',
      'service': 'website',
      'portfolio': 'website'
    };

    return typeMap[type] || 'website';
  }

  /**
   * Valida dados de preview social
   */
  static validateSocialPreview(data: SocialMediaPreviewData): {
    isValid: boolean;
    warnings: string[];
    errors: string[];
  } {
    const warnings: string[] = [];
    const errors: string[] = [];

    // Validações obrigatórias
    if (!data.title) errors.push('Título é obrigatório');
    if (!data.description) errors.push('Descrição é obrigatória');
    if (!data.url) errors.push('URL é obrigatória');

    // Validações de qualidade
    if (data.title && data.title.length < 10) {
      warnings.push('Título muito curto (recomendado: pelo menos 10 caracteres)');
    }
    if (data.title && data.title.length > 60) {
      warnings.push('Título pode ser cortado em algumas plataformas (recomendado: máximo 60 caracteres)');
    }

    if (data.description && data.description.length < 50) {
      warnings.push('Descrição muito curta (recomendado: pelo menos 50 caracteres)');
    }
    if (data.description && data.description.length > 160) {
      warnings.push('Descrição pode ser cortada em algumas plataformas (recomendado: máximo 160 caracteres)');
    }

    // Validação de URL
    if (data.url && !this.isValidUrl(data.url)) {
      errors.push('URL deve ser válida e usar HTTPS');
    }

    // Validação de imagem
    if (data.image && !this.isValidImageUrl(data.image)) {
      warnings.push('URL da imagem deve usar HTTPS e ter formato válido');
    }

    return {
      isValid: errors.length === 0,
      warnings,
      errors
    };
  }

  /**
   * Verifica se a URL é válida
   */
  private static isValidUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }

  /**
   * Verifica se a URL da imagem é válida
   */
  private static isValidImageUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'https:' && 
             /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
    } catch {
      return false;
    }
  }

  /**
   * Gera preview de como aparecerá nas redes sociais
   */
  static generatePreviewData(data: SocialMediaPreviewData) {
    const optimized = this.optimizeForAllPlatforms(data);
    
    return {
      facebook: {
        title: optimized.openGraph.title,
        description: optimized.openGraph.description,
        image: optimized.openGraph.image,
        url: optimized.openGraph.url,
        siteName: optimized.openGraph.siteName
      },
      twitter: {
        title: optimized.twitter.title,
        description: optimized.twitter.description,
        image: optimized.twitter.image,
        card: optimized.twitter.card
      },
      linkedin: {
        title: optimized.linkedin.title,
        description: optimized.linkedin.description,
        image: optimized.linkedin.image
      },
      whatsapp: {
        title: optimized.whatsapp.title,
        description: optimized.whatsapp.description,
        image: optimized.whatsapp.image
      }
    };
  }

  /**
   * Testa URLs de preview em diferentes plataformas
   */
  static getPreviewTestUrls(url: string) {
    const encodedUrl = encodeURIComponent(url);
    
    return {
      facebook: `https://developers.facebook.com/tools/debug/?q=${encodedUrl}`,
      twitter: `https://cards-dev.twitter.com/validator?url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/post-inspector/inspect/${encodedUrl}`,
      whatsapp: `https://developers.facebook.com/tools/debug/?q=${encodedUrl}` // WhatsApp usa OG tags
    };
  }
}