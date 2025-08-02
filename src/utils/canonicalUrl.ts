import { defaultSEOConfig } from '@/config/seo';

export class CanonicalUrlManager {
  private static baseUrl = defaultSEOConfig.siteUrl;

  /**
   * Gera URL canônica para uma página específica
   */
  static generateCanonicalUrl(path: string): string {
    // Remove barras duplas e garante que comece com /
    const cleanPath = path.replace(/\/+/g, '/').replace(/^(?!\/)/, '/');
    
    // Remove barra final exceto para a raiz
    const finalPath = cleanPath === '/' ? '/' : cleanPath.replace(/\/$/, '');
    
    return `${this.baseUrl}${finalPath}`;
  }

  /**
   * Gera URL canônica baseada na localização atual
   */
  static getCurrentCanonicalUrl(): string {
    if (typeof window === 'undefined') {
      return this.baseUrl;
    }

    const { pathname, search } = window.location;
    
    // Remove parâmetros de query para URLs canônicas (exceto parâmetros importantes)
    const importantParams = this.extractImportantParams(search);
    const queryString = importantParams ? `?${importantParams}` : '';
    
    return this.generateCanonicalUrl(pathname + queryString);
  }

  /**
   * Extrai parâmetros importantes que devem ser mantidos na URL canônica
   */
  private static extractImportantParams(search: string): string {
    if (!search) return '';

    const params = new URLSearchParams(search);
    const importantParams = new URLSearchParams();

    // Lista de parâmetros que devem ser mantidos na URL canônica
    const keepParams = ['page', 'category', 'tag', 'lang'];

    keepParams.forEach(param => {
      const value = params.get(param);
      if (value) {
        importantParams.set(param, value);
      }
    });

    return importantParams.toString();
  }

  /**
   * Gera URL canônica para posts do blog
   */
  static generateBlogPostCanonicalUrl(slug: string): string {
    return this.generateCanonicalUrl(`/blog/${slug}`);
  }

  /**
   * Gera URL canônica para páginas de serviços
   */
  static generateServiceCanonicalUrl(serviceSlug: string): string {
    return this.generateCanonicalUrl(`/${serviceSlug}`);
  }

  /**
   * Gera URL canônica para páginas de portfólio
   */
  static generatePortfolioCanonicalUrl(projectSlug: string): string {
    return this.generateCanonicalUrl(`/portfolio/${projectSlug}`);
  }

  /**
   * Valida se uma URL é válida
   */
  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Normaliza URL removendo fragmentos e parâmetros desnecessários
   */
  static normalizeUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      
      // Remove fragmento
      urlObj.hash = '';
      
      // Remove parâmetros de tracking comuns
      const trackingParams = [
        'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
        'fbclid', 'gclid', 'ref', 'source'
      ];
      
      trackingParams.forEach(param => {
        urlObj.searchParams.delete(param);
      });

      return urlObj.toString();
    } catch {
      return url;
    }
  }

  /**
   * Gera URLs alternativas para diferentes idiomas
   */
  static generateAlternateUrls(path: string, languages: string[] = ['pt-BR', 'en-US']): Record<string, string> {
    const alternates: Record<string, string> = {};
    
    languages.forEach(lang => {
      if (lang === 'pt-BR') {
        // Português é o idioma padrão
        alternates[lang] = this.generateCanonicalUrl(path);
      } else {
        // Outros idiomas têm prefixo
        const langPrefix = lang.split('-')[0]; // 'en-US' -> 'en'
        alternates[lang] = this.generateCanonicalUrl(`/${langPrefix}${path}`);
      }
    });

    return alternates;
  }
}