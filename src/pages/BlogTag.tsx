import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Tag, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { 
  getPostsByTag, 
  getAllCategories, 
  getAllTags, 
  getRecentPosts 
} from '@/lib/blog';
import { BlogPost, Category } from '@/types/blog';

const BlogTag: React.FC = () => {
  const { tagSlug } = useParams<{ tagSlug: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tag, setTag] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadTagData = async () => {
      if (!tagSlug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const [
          tagPosts,
          allCategories,
          allTags,
          recent
        ] = await Promise.all([
          getPostsByTag(tagSlug),
          getAllCategories(),
          getAllTags(),
          getRecentPosts()
        ]);

        // Verificar se a tag existe
        const tagExists = allTags.some(t => t.toLowerCase() === tagSlug.toLowerCase());
        
        if (!tagExists) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setPosts(tagPosts);
        setTag(tagSlug);
        setCategories(allCategories);
        setTags(allTags);
        setRecentPosts(recent);
        setIsVisible(true);
      } catch (error) {
        console.error('Error loading tag data:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadTagData();
  }, [tagSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando tag...</p>
        </div>
      </div>
    );
  }

  if (notFound || !tag) {
    return <Navigate to="/404" replace />;
  }

  const tagDisplayName = tag.charAt(0).toUpperCase() + tag.slice(1);

  return (
    <>
      <Helmet>
        <title>{`#${tagDisplayName} | Blog Tech`}</title>
        <meta 
          name="description" 
          content={`Artigos marcados com #${tag}. Encontre conteúdo técnico sobre ${tag} e desenvolvimento.`} 
        />
        <meta 
          name="keywords" 
          content={`${tag}, blog técnico, desenvolvimento, programação, ${tag} tutorial`} 
        />
        <link rel="canonical" href={`https://seudominio.com/blog/tag/${tag}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`#${tagDisplayName} | Blog Tech`} />
        <meta property="og:description" content={`Artigos marcados com #${tag}. Encontre conteúdo técnico sobre ${tag} e desenvolvimento.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://seudominio.com/blog/tag/${tag}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `Artigos sobre #${tag}`,
            "description": `Artigos marcados com a tag ${tag}`,
            "url": `https://seudominio.com/blog/tag/${tag}`,
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": posts.length,
              "itemListElement": posts.map((post, index) => ({
                "@type": "BlogPosting",
                "position": index + 1,
                "headline": post.title,
                "description": post.excerpt,
                "url": `https://seudominio.com/blog/${post.slug}`,
                "datePublished": post.publishDate.toISOString(),
                "author": {
                  "@type": "Person",
                  "name": post.author.name
                },
                "keywords": post.tags.join(', ')
              }))
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
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
                <Tag className="w-5 h-5 text-primary" />
                <span className="font-medium">Tag</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-background via-background/95 to-accent/5">
          <div className="max-w-7xl mx-auto text-center">
            <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
                #{tagDisplayName}
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gradient mb-6">
                Artigos sobre
                <span className="block">#{tagDisplayName}</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                Explore todos os artigos relacionados a {tagDisplayName}. 
                Conteúdo técnico, tutoriais e insights sobre desenvolvimento.
              </p>
              
              <div className="flex items-center justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{posts.length} {posts.length === 1 ? 'artigo' : 'artigos'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tags */}
        <section className="py-8 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <h2 className="text-lg font-semibold mb-4">Tags Relacionadas</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {tags
                  .filter(t => t.toLowerCase() !== tag.toLowerCase())
                  .slice(0, 8)
                  .map((relatedTag) => (
                    <Link key={relatedTag} to={`/blog/tag/${relatedTag}`}>
                      <Badge 
                        variant="outline" 
                        className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-pointer"
                      >
                        #{relatedTag}
                      </Badge>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {posts.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-8">
                    {posts.map((post, index) => (
                      <BlogCard 
                        key={post.slug} 
                        post={post}
                        className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                        style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Tag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Nenhum artigo encontrado</h3>
                    <p className="text-muted-foreground mb-4">
                      Ainda não temos artigos com esta tag.
                    </p>
                    <Link to="/blog">
                      <Button>Ver todos os artigos</Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <BlogSidebar
                  categories={categories}
                  tags={tags}
                  recentPosts={recentPosts}
                  className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogTag;