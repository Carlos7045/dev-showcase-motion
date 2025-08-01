import { defaultSEOConfig } from '@/config/seo';

export interface OGImageConfig {
  title: string;
  subtitle?: string;
  type?: 'website' | 'article' | 'service' | 'portfolio';
  theme?: 'default' | 'dark' | 'gradient';
  author?: string;
  date?: string;
  tags?: string[];
}

export class OGImageGenerator {
  private static baseUrl = defaultSEOConfig.siteUrl;
  private static ogImageService = 'https://og-image-generator.vercel.app'; // Exemplo de serviço

  /**
   * Gera URL para imagem OG dinâmica
   */
  static generateOGImageUrl(config: OGImageConfig): string {
    const params = new URLSearchParams();
    
    // Parâmetros básicos
    params.set('title', config.title);
    if (config.subtitle) params.set('subtitle', config.subtitle);
    params.set('type', config.type || 'website');
    params.set('theme', config.theme || 'default');
    
    // Informações do autor
    if (config.author) params.set('author', config.author);
    if (config.date) params.set('date', config.date);
    
    // Tags
    if (config.tags && config.tags.length > 0) {
      params.set('tags', config.tags.join(','));
    }
    
    // Configurações de branding
    params.set('siteName', defaultSEOConfig.siteName);
    params.set('logo', `${this.baseUrl}/logo.png`);
    
    return `${this.ogImageService}/api/generate?${params.toString()}`;
  }

  /**
   * Gera imagem OG para página inicial
   */
  static generateHomePageOG(): string {
    return this.generateOGImageUrl({
      title: 'Desenvolvedor Full-Stack',
      subtitle: 'Transformando ideias em soluções digitais',
      type: 'website',
      theme: 'gradient',
      tags: ['React', 'Node.js', 'TypeScript', 'Automações']
    });
  }

  /**
   * Gera imagem OG para páginas de serviço
   */
  static generateServiceOG(serviceName: string, description: string): string {
    return this.generateOGImageUrl({
      title: serviceName,
      subtitle: description,
      type: 'service',
      theme: 'default',
      author: defaultSEOConfig.author
    });
  }

  /**
   * Gera imagem OG para posts do blog
   */
  static generateBlogPostOG(title: string, author?: string, publishDate?: string, tags?: string[]): string {
    return this.generateOGImageUrl({
      title,
      subtitle: 'Artigo técnico',
      type: 'article',
      theme: 'dark',
      author: author || defaultSEOConfig.author,
      date: publishDate,
      tags
    });
  }

  /**
   * Gera imagem OG para projetos do portfólio
   */
  static generatePortfolioOG(projectTitle: string, technologies: string[]): string {
    return this.generateOGImageUrl({
      title: projectTitle,
      subtitle: 'Projeto de Portfólio',
      type: 'portfolio',
      theme: 'gradient',
      author: defaultSEOConfig.author,
      tags: technologies
    });
  }

  /**
   * Gera imagem OG usando Canvas (para implementação local)
   */
  static async generateLocalOGImage(config: OGImageConfig): Promise<string> {
    // Esta função seria implementada para gerar imagens localmente usando Canvas
    // Por enquanto, retorna uma imagem padrão
    return `${this.baseUrl}/og-images/${config.type || 'default'}.jpg`;
  }

  /**
   * Valida se uma URL de imagem OG é válida
   */
  static async validateOGImage(imageUrl: string): Promise<boolean> {
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' });
      return response.ok && response.headers.get('content-type')?.startsWith('image/');
    } catch {
      return false;
    }
  }

  /**
   * Gera múltiplas variações de imagem OG para A/B testing
   */
  static generateOGVariations(config: OGImageConfig): string[] {
    const variations: string[] = [];
    const themes: Array<'default' | 'dark' | 'gradient'> = ['default', 'dark', 'gradient'];
    
    themes.forEach(theme => {
      variations.push(this.generateOGImageUrl({
        ...config,
        theme
      }));
    });
    
    return variations;
  }

  /**
   * Gera imagem OG otimizada para diferentes plataformas
   */
  static generatePlatformOptimizedOG(config: OGImageConfig) {
    return {
      facebook: this.generateOGImageUrl({
        ...config,
        // Facebook prefere 1200x630
      }),
      twitter: this.generateOGImageUrl({
        ...config,
        // Twitter prefere 1200x600
      }),
      linkedin: this.generateOGImageUrl({
        ...config,
        // LinkedIn prefere 1200x627
      }),
      whatsapp: this.generateOGImageUrl({
        ...config,
        // WhatsApp funciona bem com 1200x630
      })
    };
  }
}