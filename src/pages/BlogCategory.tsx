import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Folder, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { 
  getPostsByCategory, 
  getAllCategories, 
  getAllTags, 
  getRecentPosts 
} from '@/lib/blog';
import { BlogPost, Category } from '@/types/blog';

const BlogCategory: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadCategoryData = async () => {
      if (!categorySlug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const [
          categoryPosts,
          allCategories,
          allTags,
          recent
        ] = await Promise.all([
          getPostsByCategory(categorySlug),
          getAllCategories(),
          getAllTags(),
          getRecentPosts()
        ]);

        const foundCategory = allCategories.find(cat => cat.slug === categorySlug);
        
        if (!foundCategory) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setPosts(categoryPosts);
        setCategory(foundCategory);
        setCategories(allCategories);
        setTags(allTags);
        setRecentPosts(recent);
        setIsVisible(true);
      } catch (error) {
        console.error('Error loading category data:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryData();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando categoria...</p>
        </div>
      </div>
    );
  }

  if (notFound || !category) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{`${category.name} | Blog Tech`}</title>
        <meta 
          name="description" 
          content={`Artigos sobre ${category.name.toLowerCase()}: ${category.description}`} 
        />
        <meta 
          name="keywords" 
          content={`${category.name.toLowerCase()}, blog técnico, desenvolvimento, programação`} 
        />
        <link rel="canonical" href={`https://seudominio.com/blog/categoria/${category.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${category.name} | Blog Tech`} />
        <meta property="og:description" content={`Artigos sobre ${category.name.toLowerCase()}: ${category.description}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://seudominio.com/blog/categoria/${category.slug}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `Artigos sobre ${category.name}`,
            "description": category.description,
            "url": `https://seudominio.com/blog/categoria/${category.slug}`,
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
                }
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
                <Folder className="w-5 h-5 text-primary" />
                <span className="font-medium">Categoria</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
          <div className="max-w-7xl mx-auto text-center">
            <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <Badge variant="secondary">{category.name}</Badge>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gradient mb-6">
                Artigos sobre
                <span className="block">{category.name}</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                {category.description}
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
                    <Folder className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Nenhum artigo encontrado</h3>
                    <p className="text-muted-foreground mb-4">
                      Ainda não temos artigos nesta categoria.
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

export default BlogCategory;