import { defaultSEOConfig } from '@/config/seo';

export interface TwitterCardData {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  creator?: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  url?: string;
}

export interface TwitterAppCardData extends TwitterCardData {
  card: 'app';
  appName: {
    iphone?: string;
    ipad?: string;
    googleplay?: string;
  };
  appId: {
    iphone?: string;
    ipad?: string;
    googleplay?: string;
  };
  appUrl: {
    iphone?: string;
    ipad?: string;
    googleplay?: string;
  };
}

export interface TwitterPlayerCardData extends TwitterCardData {
  card: 'player';
  player: string;
  playerWidth: number;
  playerHeight: number;
  playerStream?: string;
}

export class TwitterCardsOptimizer {
  private static defaultSite = defaultSEOConfig.twitterHandle;
  private static defaultCreator = defaultSEOConfig.twitterHandle;

  /**
   * Gera dados otimizados para Twitter Card básico
   */
  static generateBasicCard(data: {
    title: string;
    description: string;
    image: string;
    imageAlt?: string;
    url?: string;
    creator?: string;
  }): TwitterCardData {
    return {
      card: 'summary_large_image',
      site: this.defaultSite,
      creator: data.creator || this.defaultCreator,
      title: this.optimizeTitle(data.title),
      description: this.optimizeDescription(data.description),
      image: data.image,
      imageAlt: data.imageAlt || `Imagem para ${data.title}`,
      url: data.url
    };
  }

  /**
   * Gera Twitter Card para página inicial
   */
  static generateHomePageCard(): TwitterCardData {
    return this.generateBasicCard({
      title: defaultSEOConfig.defaultTitle,
      description: defaultSEOConfig.defaultDescription,
      image: defaultSEOConfig.defaultOGImage,
      imageAlt: 'Desenvolvedor Full-Stack - Soluções Digitais Personalizadas',
      url: defaultSEOConfig.siteUrl
    });
  }

  /**
   * Gera Twitter Card para páginas de serviço
   */
  static generateServiceCard(serviceData: {
    name: string;
    description: string;
    image: string;
    url: string;
  }): TwitterCardData {
    return this.generateBasicCard({
      title: `${serviceData.name} - Serviços Profissionais`,
      description: serviceData.description,
      image: serviceData.image,
      imageAlt: `Serviço de ${serviceData.name}`,
      url: serviceData.url
    });
  }

  /**
   * Gera Twitter Card para posts do blog
   */
  static generateBlogPostCard(postData: {
    title: string;
    description: string;
    image: string;
    url: string;
    author?: string;
  }): TwitterCardData {
    return this.generateBasicCard({
      title: postData.title,
      description: postData.description,
      image: postData.image,
      imageAlt: `Artigo: ${postData.title}`,
      url: postData.url,
      creator: postData.author ? `@${postData.author}` : this.defaultCreator
    });
  }

  /**
   * Gera Twitter Card para projetos do portfólio
   */
  static generatePortfolioCard(projectData: {
    title: string;
    description: string;
    image: string;
    url: string;
    technologies?: string[];
  }): TwitterCardData {
    const techString = projectData.technologies?.join(', ') || '';
    const enhancedDescription = techString 
      ? `${projectData.description} Tecnologias: ${techString}`
      : projectData.description;

    return this.generateBasicCard({
      title: `${projectData.title} - Projeto de Portfólio`,
      description: enhancedDescription,
      image: projectData.image,
      imageAlt: `Screenshot do projeto ${projectData.title}`,
      url: projectData.url
    });
  }

  /**
   * Gera Twitter App Card (para PWAs ou apps móveis)
   */
  static generateAppCard(appData: {
    title: string;
    description: string;
    image: string;
    url: string;
    appName: string;
    appId: {
      iphone?: string;
      googleplay?: string;
    };
    appUrl: {
      iphone?: string;
      googleplay?: string;
    };
  }): TwitterAppCardData {
    return {
      card: 'app',
      site: this.defaultSite,
      creator: this.defaultCreator,
      title: this.optimizeTitle(appData.title),
      description: this.optimizeDescription(appData.description),
      image: appData.image,
      imageAlt: `App ${appData.appName}`,
      url: appData.url,
      appName: {
        iphone: appData.appName,
        googleplay: appData.appName
      },
      appId: appData.appId,
      appUrl: appData.appUrl
    };
  }

  /**
   * Gera Twitter Player Card (para conteúdo de vídeo)
   */
  static generatePlayerCard(playerData: {
    title: string;
    description: string;
    image: string;
    url: string;
    playerUrl: string;
    width: number;
    height: number;
    streamUrl?: string;
  }): TwitterPlayerCardData {
    return {
      card: 'player',
      site: this.defaultSite,
      creator: this.defaultCreator,
      title: this.optimizeTitle(playerData.title),
      description: this.optimizeDescription(playerData.description),
      image: playerData.image,
      imageAlt: `Vídeo: ${playerData.title}`,
      url: playerData.url,
      player: playerData.playerUrl,
      playerWidth: playerData.width,
      playerHeight: playerData.height,
      playerStream: playerData.streamUrl
    };
  }

  /**
   * Otimiza título para Twitter (máximo 70 caracteres)
   */
  private static optimizeTitle(title: string): string {
    if (title.length <= 70) return title;
    
    return title.substring(0, 67) + '...';
  }

  /**
   * Otimiza descrição para Twitter (máximo 200 caracteres)
   */
  private static optimizeDescription(description: string): string {
    if (description.length <= 200) return description;
    
    // Tenta cortar em uma palavra completa
    const truncated = description.substring(0, 197);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > 150) {
      return truncated.substring(0, lastSpace) + '...';
    }
    
    return truncated + '...';
  }

  /**
   * Valida dados do Twitter Card
   */
  static validateTwitterCard(cardData: TwitterCardData): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Validações obrigatórias
    if (!cardData.title) errors.push('Título é obrigatório');
    if (!cardData.description) errors.push('Descrição é obrigatória');
    if (!cardData.image) errors.push('Imagem é obrigatória');

    // Validações de tamanho
    if (cardData.title && cardData.title.length > 70) {
      errors.push('Título deve ter no máximo 70 caracteres');
    }
    if (cardData.description && cardData.description.length > 200) {
      errors.push('Descrição deve ter no máximo 200 caracteres');
    }

    // Validação de URL da imagem
    if (cardData.image && !this.isValidImageUrl(cardData.image)) {
      errors.push('URL da imagem deve ser válida e usar HTTPS');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Verifica se a URL da imagem é válida
   */
  private static isValidImageUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'https:' && 
             (url.endsWith('.jpg') || url.endsWith('.jpeg') || 
              url.endsWith('.png') || url.endsWith('.webp'));
    } catch {
      return false;
    }
  }

  /**
   * Gera meta tags HTML para Twitter Card
   */
  static generateMetaTags(cardData: TwitterCardData): string[] {
    const tags: string[] = [];

    tags.push(`<meta name="twitter:card" content="${cardData.card}" />`);
    if (cardData.site) tags.push(`<meta name="twitter:site" content="${cardData.site}" />`);
    if (cardData.creator) tags.push(`<meta name="twitter:creator" content="${cardData.creator}" />`);
    tags.push(`<meta name="twitter:title" content="${cardData.title}" />`);
    tags.push(`<meta name="twitter:description" content="${cardData.description}" />`);
    tags.push(`<meta name="twitter:image" content="${cardData.image}" />`);
    if (cardData.imageAlt) tags.push(`<meta name="twitter:image:alt" content="${cardData.imageAlt}" />`);
    if (cardData.url) tags.push(`<meta name="twitter:url" content="${cardData.url}" />`);

    // Tags específicas para diferentes tipos de card
    if (cardData.card === 'app') {
      const appCard = cardData as TwitterAppCardData;
      if (appCard.appName.iphone) tags.push(`<meta name="twitter:app:name:iphone" content="${appCard.appName.iphone}" />`);
      if (appCard.appName.googleplay) tags.push(`<meta name="twitter:app:name:googleplay" content="${appCard.appName.googleplay}" />`);
      if (appCard.appId.iphone) tags.push(`<meta name="twitter:app:id:iphone" content="${appCard.appId.iphone}" />`);
      if (appCard.appId.googleplay) tags.push(`<meta name="twitter:app:id:googleplay" content="${appCard.appId.googleplay}" />`);
    }

    if (cardData.card === 'player') {
      const playerCard = cardData as TwitterPlayerCardData;
      tags.push(`<meta name="twitter:player" content="${playerCard.player}" />`);
      tags.push(`<meta name="twitter:player:width" content="${playerCard.playerWidth}" />`);
      tags.push(`<meta name="twitter:player:height" content="${playerCard.playerHeight}" />`);
      if (playerCard.playerStream) tags.push(`<meta name="twitter:player:stream" content="${playerCard.playerStream}" />`);
    }

    return tags;
  }
}