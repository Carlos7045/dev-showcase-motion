import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, TrendingUp, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { 
  getAllPosts, 
  getFeaturedPosts, 
  getAllCategories, 
  getAllTags, 
  getRecentPosts,
  searchPosts 
} from '@/lib/blog';
import { BlogPost, Category } from '@/types/blog';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        const [
          allPosts,
          featured,
          allCategories,
          allTags,
          recent
        ] = await Promise.all([
          getAllPosts(),
          getFeaturedPosts(),
          getAllCategories(),
          getAllTags(),
          getRecentPosts()
        ]);

        setPosts(allPosts);
        setFeaturedPosts(featured);
        setCategories(allCategories);
        setTags(allTags);
        setRecentPosts(recent);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setLoading(false);
        setIsVisible(true);
      }
    };

    loadBlogData();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
      setSearchQuery('');
      return;
    }

    const results = await searchPosts(query);
    setPosts(results);
    setSearchQuery(query);
  };

  const handleCategoryFilter = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    
    if (!categorySlug) {
      getAllPosts().then(setPosts);
      return;
    }

    const filtered = posts.filter(post => 
      post.categories.some(cat => cat.slug === categorySlug)
    );
    setPosts(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    getAllPosts().then(setPosts);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando artigos...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog | Artigos sobre Desenvolvimento e Tecnologia</title>
        <meta 
          name="description" 
          content="Artigos técnicos sobre desenvolvimento web, React, TypeScript, automação e as melhores práticas de programação." 
        />
        <meta 
          name="keywords" 
          content="blog técnico, desenvolvimento web, react, typescript, javascript, automação, programação" 
        />
        <link rel="canonical" href="https://seudominio.com/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog | Artigos sobre Desenvolvimento e Tecnologia" />
        <meta property="og:description" content="Artigos técnicos sobre desenvolvimento web e as melhores práticas de programação." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seudominio.com/blog" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blog Tech",
            "description": "Artigos técnicos sobre desenvolvimento web e tecnologia",
            "url": "https://seudominio.com/blog",
            "author": {
              "@type": "Person",
              "name": "Desenvolvedor Full-Stack"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
          <div className="max-w-7xl mx-auto text-center">
            <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <Badge className="mb-4">Blog Técnico</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gradient mb-6">
                Conhecimento em
                <span className="block">Desenvolvimento</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                Artigos técnicos sobre desenvolvimento web, automação, integrações e as 
                melhores práticas para criar soluções digitais modernas.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Buscar artigos..."
                    className="pl-12 pr-4 py-3 text-lg border-primary/20 focus:border-primary/40"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  />
                  <Button 
                    onClick={() => handleSearch(searchQuery)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    size="sm"
                  >
                    Buscar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 mb-8">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-gradient">Artigos em Destaque</h2>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {featuredPosts.slice(0, 2).map((post, index) => (
                  <BlogCard 
                    key={post.slug} 
                    post={post} 
                    featured 
                    className={`${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 200}ms` } as React.CSSProperties}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">Filtros:</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryFilter(null)}
                    >
                      Todos
                    </Button>
                    {categories.slice(0, 5).map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.slug ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleCategoryFilter(category.slug)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                  
                  {(searchQuery || selectedCategory) && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Limpar filtros
                    </Button>
                  )}
                </div>

                {/* Results Info */}
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {posts.length} {posts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
                    {searchQuery && ` para "${searchQuery}"`}
                    {selectedCategory && ` na categoria "${categories.find(c => c.slug === selectedCategory)?.name}"`}
                  </span>
                </div>

                {/* Posts Grid */}
                {posts.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-8">
                    {posts.map((post, index) => (
                      <BlogCard 
                        key={post.slug} 
                        post={post}
                        className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                        style={{ animationDelay: `${400 + index * 100}ms` } as React.CSSProperties}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Nenhum artigo encontrado</h3>
                    <p className="text-muted-foreground mb-4">
                      Tente ajustar seus filtros ou buscar por outros termos.
                    </p>
                    <Button onClick={clearFilters}>
                      Ver todos os artigos
                    </Button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <BlogSidebar
                  categories={categories}
                  tags={tags}
                  recentPosts={recentPosts}
                  onSearch={handleSearch}
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

export default Blog;