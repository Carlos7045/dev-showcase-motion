import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Briefcase, TrendingUp, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { PortfolioFilters, SortOption, ViewMode } from '@/components/portfolio/PortfolioFilters';
import { 
  getAllProjects, 
  getFeaturedProjects, 
  getAllCategories, 
  getAllTechnologies,
  searchProjects 
} from '@/lib/portfolio';
import { Project, ProjectCategory, Technology } from '@/types/portfolio';

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const [
          allProjects,
          featured,
          allCategories,
          allTechnologies
        ] = await Promise.all([
          getAllProjects(),
          getFeaturedProjects(),
          getAllCategories(),
          getAllTechnologies()
        ]);

        setProjects(allProjects);
        setFeaturedProjects(featured);
        setCategories(allCategories);
        setTechnologies(allTechnologies);
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      } finally {
        setLoading(false);
        setIsVisible(true);
      }
    };

    loadPortfolioData();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      const allProjects = await getAllProjects();
      setProjects(allProjects);
      setSearchQuery('');
      return;
    }

    const results = await searchProjects(query);
    setProjects(results);
    setSearchQuery(query);
  };

  const applyFilters = (projectList: Project[]) => {
    let filtered = [...projectList];

    // Filtrar por categorias
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(project => 
        selectedCategories.includes(project.category.id)
      );
    }

    // Filtrar por tecnologias
    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter(project => 
        project.technologies.some(tech => 
          selectedTechnologies.includes(tech.name)
        )
      );
    }

    // Filtrar por status
    if (selectedStatus.length > 0) {
      filtered = filtered.filter(project => 
        selectedStatus.includes(project.status)
      );
    }

    // Aplicar ordenação
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => 
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
        break;
      case 'featured':
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => 
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
        break;
    }

    return filtered;
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedTechnologies([]);
    setSelectedStatus([]);
    setSortBy('newest');
    getAllProjects().then(setProjects);
  };

  const filteredProjects = applyFilters(projects);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando projetos...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Portfolio | Projetos e Cases de Desenvolvimento</title>
        <meta 
          name="description" 
          content="Explore meus projetos de desenvolvimento web, aplicações SaaS, e-commerce e automações. Cases detalhados com tecnologias modernas." 
        />
        <meta 
          name="keywords" 
          content="portfolio, projetos, desenvolvimento web, react, nextjs, saas, ecommerce, automação" 
        />
        <link rel="canonical" href="https://seudominio.com/portfolio" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Portfolio | Projetos e Cases de Desenvolvimento" />
        <meta property="og:description" content="Explore projetos reais de desenvolvimento web com tecnologias modernas e resultados comprovados." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seudominio.com/portfolio" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Portfolio de Desenvolvimento",
            "description": "Projetos de desenvolvimento web e aplicações modernas",
            "url": "https://seudominio.com/portfolio",
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": projects.length,
              "itemListElement": projects.slice(0, 10).map((project, index) => ({
                "@type": "CreativeWork",
                "position": index + 1,
                "name": project.title,
                "description": project.description,
                "url": `https://seudominio.com/portfolio/${project.slug}`,
                "dateCreated": project.startDate.toISOString(),
                "creator": {
                  "@type": "Person",
                  "name": "Desenvolvedor Full-Stack"
                }
              }))
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
          <div className="max-w-7xl mx-auto text-center">
            <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <Badge className="mb-4">Portfolio</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gradient mb-6">
                Projetos que
                <span className="block">Fazem a Diferença</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                Explore uma seleção dos meus melhores projetos, desde aplicações SaaS complexas 
                até e-commerces de alta conversão. Cada projeto conta uma história de desafios 
                superados e resultados alcançados.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Buscar projetos..."
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

        {/* Stats Section */}
        <section className="py-12 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{projects.length}+</div>
                <div className="text-muted-foreground">Projetos Concluídos</div>
              </div>
              
              <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
                <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
                <div className="text-3xl font-bold text-accent mb-2">98%</div>
                <div className="text-muted-foreground">Taxa de Sucesso</div>
              </div>
              
              <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
                <div className="flex items-center justify-center w-16 h-16 bg-primary-glow/10 rounded-full mx-auto mb-4">
                  <Code2 className="w-8 h-8 text-primary-glow" />
                </div>
                <div className="text-3xl font-bold text-primary-glow mb-2">{technologies.length}+</div>
                <div className="text-muted-foreground">Tecnologias</div>
              </div>
              
              <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
                <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
                <div className="text-3xl font-bold text-accent mb-2">2+ Anos</div>
                <div className="text-muted-foreground">Experiência</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 mb-8">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-gradient">Projetos em Destaque</h2>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {featuredProjects.slice(0, 2).map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    featured 
                    className={`${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 200}ms` } as React.CSSProperties}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Portfolio */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gradient">Todos os Projetos</h2>
              <div className="text-muted-foreground">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'projeto' : 'projetos'}
                {searchQuery && ` para "${searchQuery}"`}
              </div>
            </div>

            {/* Filters */}
            <PortfolioFilters
              categories={categories}
              technologies={technologies}
              selectedCategories={selectedCategories}
              selectedTechnologies={selectedTechnologies}
              selectedStatus={selectedStatus}
              sortBy={sortBy}
              viewMode={viewMode}
              onCategoryChange={setSelectedCategories}
              onTechnologyChange={setSelectedTechnologies}
              onStatusChange={setSelectedStatus}
              onSortChange={setSortBy}
              onViewModeChange={setViewMode}
              onClearFilters={clearFilters}
              className="mb-8"
            />

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
                {filteredProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project}
                    className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${400 + index * 100}ms` } as React.CSSProperties}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum projeto encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  Tente ajustar seus filtros ou buscar por outros termos.
                </p>
                <Button onClick={clearFilters}>
                  Ver todos os projetos
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Gostou dos Projetos?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vamos conversar sobre como posso ajudar você a criar soluções 
                digitais que realmente fazem a diferença para seu negócio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="btn-hero"
                  onClick={() => window.location.href = '/contato'}
                >
                  Iniciar Projeto
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.location.href = '/blog'}
                >
                  Ver Mais Cases
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Portfolio;