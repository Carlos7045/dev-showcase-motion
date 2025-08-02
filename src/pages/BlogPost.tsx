import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Share2, Bookmark, ThumbsUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { BlogCard } from '@/components/blog/BlogCard';
import { MDXContent } from '@/components/blog/MDXContent';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { SocialShare } from '@/components/blog/SocialShare';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { NewsletterSignup } from '@/components/blog/NewsletterSignup';
import { getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { BlogPost as BlogPostType } from '@/types/blog';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const postData = await getPostBySlug(slug);
        
        if (!postData) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setPost(postData);
        
        // Carregar posts relacionados
        const related = await getRelatedPosts(postData);
        setRelatedPosts(related);
        
        setIsVisible(true);
      } catch (error) {
        console.error('Error loading post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const handleShare = async () => {
    if (!post) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback para copiar URL
      await navigator.clipboard.writeText(window.location.href);
      // Aqui você poderia mostrar uma notificação de sucesso
    }
  };

  const handleBookmark = () => {
    if (!post) return;
    // Implementar funcionalidade de bookmark
    console.log('Bookmark post:', post.slug);
  };

  const handleLike = () => {
    if (!post) return;
    // Implementar funcionalidade de like
    console.log('Like post:', post.slug);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando artigo...</p>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{post.seoData.title}</title>
        <meta name="description" content={post.seoData.description} />
        <meta name="keywords" content={post.seoData.keywords.join(', ')} />
        <link rel="canonical" href={`https://seudominio.com/blog/${post.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.seoData.title} />
        <meta property="og:description" content={post.seoData.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://seudominio.com/blog/${post.slug}`} />
        {post.seoData.ogImage && <meta property="og:image" content={post.seoData.ogImage} />}
        <meta property="article:published_time" content={post.publishDate.toISOString()} />
        <meta property="article:author" content={post.author.name} />
        {post.categories.map(category => (
          <meta key={category.id} property="article:section" content={category.name} />
        ))}
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seoData.title} />
        <meta name="twitter:description" content={post.seoData.description} />
        {post.seoData.ogImage && <meta name="twitter:image" content={post.seoData.ogImage} />}
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.coverImage,
            "author": {
              "@type": "Person",
              "name": post.author.name,
              "description": post.author.bio
            },
            "publisher": {
              "@type": "Person",
              "name": post.author.name
            },
            "datePublished": post.publishDate.toISOString(),
            "dateModified": post.updatedDate?.toISOString() || post.publishDate.toISOString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://seudominio.com/blog/${post.slug}`
            },
            "keywords": post.tags.join(', '),
            "articleSection": post.categories.map(cat => cat.name).join(', ')
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Reading Progress */}
        <ReadingProgress />
        
        {/* Navigation */}
        <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link 
                to="/blog"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar ao Blog</span>
              </Link>
              
              <div className="flex items-center gap-2">
                <SocialShare post={post} />
                <Button variant="ghost" size="sm" onClick={handleBookmark}>
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLike}>
                  <ThumbsUp className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Article Content */}
        <article className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                  <BlogHeader post={post} className="mb-12" />
                  
                  <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                    <MDXContent content={post.content} />
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <TableOfContents content={post.content} />
                  <NewsletterSignup variant="sidebar" />
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Newsletter Inline */}
        <section className="py-12 px-6">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup variant="inline" />
          </div>
        </section>

        {/* Author Bio */}
        <section className="py-12 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <Card className={`border-primary/20 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {post.author.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {post.author.bio}
                    </p>
                    <div className="flex gap-4">
                      {post.author.social.twitter && (
                        <a
                          href={`https://twitter.com/${post.author.social.twitter.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors duration-200"
                        >
                          Twitter
                        </a>
                      )}
                      {post.author.social.linkedin && (
                        <a
                          href={post.author.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors duration-200"
                        >
                          LinkedIn
                        </a>
                      )}
                      {post.author.social.github && (
                        <a
                          href={post.author.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors duration-200"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
                Artigos Relacionados
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <BlogCard 
                    key={relatedPost.slug} 
                    post={relatedPost}
                    className={`${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${600 + index * 200}ms` } as React.CSSProperties}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Comments Section Placeholder */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-6 h-6" />
                  Comentários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Sistema de comentários em breve</h3>
                  <p className="text-muted-foreground mb-4">
                    Em breve você poderá comentar e interagir com outros leitores.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Por enquanto, compartilhe suas opiniões nas redes sociais!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Gostou do Artigo?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Compartilhe com sua rede e ajude outros desenvolvedores a aprender!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-hero" onClick={handleShare}>
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartilhar Artigo
                </Button>
                <Link to="/blog">
                  <Button variant="outline" size="lg">
                    Ver Mais Artigos
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPost;