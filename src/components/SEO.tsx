import { Helmet } from 'react-helmet-async';
import { SEOData } from '@/types/seo';
import { defaultSEOConfig } from '@/config/seo';
import { CanonicalUrlManager } from '@/utils/canonicalUrl';
import { SocialMediaPreviewOptimizer } from '@/utils/socialMediaPreview';

interface SEOProps {
  data?: Partial<SEOData>;
  noIndex?: boolean;
  noFollow?: boolean;
}

export const SEO = ({ data = {}, noIndex = false, noFollow = false }: SEOProps) => {
  // Gera URL canônica automaticamente se não fornecida
  const canonicalUrl = data.canonicalUrl || CanonicalUrlManager.getCurrentCanonicalUrl();
  
  const seoData = {
    title: data.title || defaultSEOConfig.defaultTitle,
    description: data.description || defaultSEOConfig.defaultDescription,
    keywords: data.keywords || defaultSEOConfig.defaultKeywords,
    ogImage: data.ogImage || defaultSEOConfig.defaultOGImage,
    canonicalUrl,
    structuredData: data.structuredData,
    author: data.author || defaultSEOConfig.author,
    publishDate: data.publishDate,
    modifiedDate: data.modifiedDate,
    articleType: data.articleType || 'website',
    locale: data.locale || defaultSEOConfig.locale
  };

  const fullTitle = data.title 
    ? `${data.title} | ${defaultSEOConfig.siteName}`
    : defaultSEOConfig.defaultTitle;

  // Gera robots meta tag
  const robotsContent = [];
  if (noIndex) robotsContent.push('noindex');
  if (noFollow) robotsContent.push('nofollow');
  if (robotsContent.length === 0) robotsContent.push('index', 'follow');

  // Gera URLs alternativas para diferentes idiomas
  const alternateUrls = CanonicalUrlManager.generateAlternateUrls(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  // Otimiza dados para redes sociais
  const socialData = SocialMediaPreviewOptimizer.optimizeForAllPlatforms({
    title: seoData.title,
    description: seoData.description,
    url: canonicalUrl,
    image: seoData.ogImage,
    type: seoData.articleType,
    author: seoData.author,
    publishDate: seoData.publishDate,
    tags: seoData.keywords
  });

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords.join(', ')} />
      <meta name="author" content={seoData.author} />
      <meta name="robots" content={robotsContent.join(', ')} />
      <meta name="language" content={seoData.locale} />
      <meta httpEquiv="content-language" content={seoData.locale} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seoData.canonicalUrl} />
      
      {/* Alternate URLs for different languages */}
      {Object.entries(alternateUrls).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}

      {/* Article specific meta tags */}
      {seoData.publishDate && (
        <meta name="article:published_time" content={seoData.publishDate} />
      )}
      {seoData.modifiedDate && (
        <meta name="article:modified_time" content={seoData.modifiedDate} />
      )}

      {/* Open Graph Tags - Otimizados */}
      <meta property="og:title" content={socialData.openGraph.title} />
      <meta property="og:description" content={socialData.openGraph.description} />
      <meta property="og:image" content={socialData.openGraph.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`Imagem de ${socialData.openGraph.title}`} />
      <meta property="og:url" content={socialData.openGraph.url} />
      <meta property="og:type" content={socialData.openGraph.type} />
      <meta property="og:locale" content={socialData.openGraph.locale} />
      <meta property="og:site_name" content={socialData.openGraph.siteName} />
      
      {/* Additional OG tags for articles */}
      {socialData.openGraph.author && (
        <meta property="article:author" content={socialData.openGraph.author} />
      )}
      {socialData.openGraph.publishedTime && (
        <meta property="article:published_time" content={socialData.openGraph.publishedTime} />
      )}
      {socialData.openGraph.modifiedTime && (
        <meta property="article:modified_time" content={socialData.openGraph.modifiedTime} />
      )}
      {socialData.openGraph.tags && socialData.openGraph.tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card Tags - Otimizados */}
      <meta name="twitter:card" content={socialData.twitter.card} />
      {socialData.twitter.site && (
        <meta name="twitter:site" content={socialData.twitter.site} />
      )}
      {socialData.twitter.creator && (
        <meta name="twitter:creator" content={socialData.twitter.creator} />
      )}
      <meta name="twitter:title" content={socialData.twitter.title} />
      <meta name="twitter:description" content={socialData.twitter.description} />
      <meta name="twitter:image" content={socialData.twitter.image} />
      {socialData.twitter.imageAlt && (
        <meta name="twitter:image:alt" content={socialData.twitter.imageAlt} />
      )}
      
      {/* LinkedIn specific tags */}
      <meta property="linkedin:title" content={socialData.linkedin.title} />
      <meta property="linkedin:description" content={socialData.linkedin.description} />
      <meta property="linkedin:image" content={socialData.linkedin.image} />
      
      {/* WhatsApp specific tags (uses OG but optimized) */}
      <meta property="whatsapp:title" content={socialData.whatsapp.title} />
      <meta property="whatsapp:description" content={socialData.whatsapp.description} />
      <meta property="whatsapp:image" content={socialData.whatsapp.image} />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="application-name" content={defaultSEOConfig.siteName} />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* Structured Data */}
      {seoData.structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(seoData.structuredData, null, 2)}
        </script>
      )}
    </Helmet>
  );
};