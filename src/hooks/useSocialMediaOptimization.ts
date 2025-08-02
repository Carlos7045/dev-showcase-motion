import { useMemo } from 'react';
import { SocialMediaPreviewOptimizer, SocialMediaPreviewData, OptimizedSocialData } from '@/utils/socialMediaPreview';
import { OGImageGenerator } from '@/utils/ogImageGenerator';
import { TwitterCardsOptimizer } from '@/utils/twitterCards';

interface UseSocialMediaOptimizationOptions extends Omit<SocialMediaPreviewData, 'url'> {
  url?: string;
  generateDynamicImage?: boolean;
  platform?: 'all' | 'facebook' | 'twitter' | 'linkedin' | 'whatsapp';
}

export const useSocialMediaOptimization = (options: UseSocialMediaOptimizationOptions) => {
  return useMemo(() => {
    // Gera URL atual se não fornecida
    const url = options.url || (typeof window !== 'undefined' ? window.location.href : '');
    
    // Gera imagem dinâmica se solicitado
    let image = options.image;
    if (options.generateDynamicImage && !image) {
      image = OGImageGenerator.generateOGImageUrl({
        title: options.title,
        type: options.type || 'website',
        author: options.author,
        date: options.publishDate,
        tags: options.tags
      });
    }

    const socialData: SocialMediaPreviewData = {
      ...options,
      url,
      image
    };

    // Otimiza para todas as plataformas ou plataforma específica
    if (options.platform === 'all' || !options.platform) {
      return SocialMediaPreviewOptimizer.optimizeForAllPlatforms(socialData);
    }

    // Otimização específica por plataforma
    const optimized = SocialMediaPreviewOptimizer.optimizeForAllPlatforms(socialData);
    
    switch (options.platform) {
      case 'facebook':
        return { openGraph: optimized.openGraph };
      case 'twitter':
        return { twitter: optimized.twitter };
      case 'linkedin':
        return { linkedin: optimized.linkedin };
      case 'whatsapp':
        return { whatsapp: optimized.whatsapp };
      default:
        return optimized;
    }
  }, [options]);
};

// Hook específico para páginas de serviço
export const useServiceSocialOptimization = (serviceData: {
  name: string;
  description: string;
  slug: string;
  image?: string;
  features?: string[];
}) => {
  return useSocialMediaOptimization({
    title: `${serviceData.name} - Serviços Profissionais`,
    description: serviceData.description,
    type: 'service',
    image: serviceData.image,
    tags: serviceData.features,
    generateDynamicImage: !serviceData.image
  });
};

// Hook específico para posts do blog
export const useBlogSocialOptimization = (postData: {
  title: string;
  description: string;
  slug: string;
  author?: string;
  publishDate: string;
  image?: string;
  tags?: string[];
}) => {
  return useSocialMediaOptimization({
    title: postData.title,
    description: postData.description,
    type: 'article',
    author: postData.author,
    publishDate: postData.publishDate,
    image: postData.image,
    tags: postData.tags,
    generateDynamicImage: !postData.image
  });
};

// Hook específico para projetos do portfólio
export const usePortfolioSocialOptimization = (projectData: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  technologies?: string[];
}) => {
  return useSocialMediaOptimization({
    title: `${projectData.title} - Projeto de Portfólio`,
    description: projectData.description,
    type: 'portfolio',
    image: projectData.image,
    tags: projectData.technologies,
    generateDynamicImage: !projectData.image
  });
};

// Hook para validação de dados sociais
export const useSocialMediaValidation = (data: SocialMediaPreviewData) => {
  return useMemo(() => {
    return SocialMediaPreviewOptimizer.validateSocialPreview(data);
  }, [data]);
};

// Hook para preview de como aparecerá nas redes sociais
export const useSocialMediaPreview = (data: SocialMediaPreviewData) => {
  return useMemo(() => {
    return SocialMediaPreviewOptimizer.generatePreviewData(data);
  }, [data]);
};

// Hook para URLs de teste de preview
export const useSocialMediaTestUrls = (url?: string) => {
  return useMemo(() => {
    const testUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    return SocialMediaPreviewOptimizer.getPreviewTestUrls(testUrl);
  }, [url]);
};