import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, Github, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectHeader } from '@/components/portfolio/ProjectHeader';
import { ProjectMetrics } from '@/components/portfolio/ProjectMetrics';
import { ProjectGallery } from '@/components/portfolio/ProjectGallery';
import { ProjectChallenges } from '@/components/portfolio/ProjectChallenges';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { getProjectBySlug, getRelatedProjects } from '@/lib/portfolio';
import { Project } from '@/types/portfolio';

const PortfolioProject: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const projectData = await getProjectBySlug(slug);
        
        if (!projectData) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setProject(projectData);
        
        // Carregar projetos relacionados
        const related = await getRelatedProjects(projectData);
        setRelatedProjects(related);
        
        setIsVisible(true);
      } catch (error) {
        console.error('Error loading project:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  const handleShare = async () => {
    if (!project) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback para copiar URL
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando projeto...</p>
        </div>
      </div>
    );
  }

  if (notFound || !project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{project.seoData.title}</title>
        <meta name="description" content={project.seoData.description} />
        <meta name="keywords" content={project.seoData.keywords.join(', ')} />
        <link rel="canonical" href={`https://seudominio.com/portfolio/${project.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={project.seoData.title} />
        <meta property="og:description" content={project.seoData.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://seudominio.com/portfolio/${project.slug}`} />
        {project.images[0] && <meta property="og:image" content={project.images[0].url} />}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={project.seoData.title} />
        <meta name="twitter:description" content={project.seoData.description} />
        {project.images[0] && <meta name="twitter:image" content={project.images[0].url} />}
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": project.title,
            "description": project.description,
            "image": project.images[0]?.url,
            "creator": {
              "@type": "Person",
              "name": "Desenvolvedor Full-Stack"
            },
            "dateCreated": project.startDate.toISOString(),
            "dateModified": project.endDate?.toISOString() || project.startDate.toISOString(),
            "url": `https://seudominio.com/portfolio/${project.slug}`,
            "keywords": project.tags.join(', '),
            "genre": project.category.name,
            "workExample": project.liveUrl ? {
              "@type": "WebSite",
              "url": project.liveUrl
            } : undefined
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Project Header */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <ProjectHeader project={project} />
          </div>
        </div>

        {/* Project Overview */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
              <h2 className="text-3xl font-bold text-gradient mb-6 text-center">Visão Geral</h2>
              <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Gallery */}
        {project.images.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
                <ProjectGallery images={project.images} />
              </div>
            </div>
          </section>
        )}

        {/* Project Metrics */}
        {project.metrics && (
          <section className="py-16 px-6 bg-muted/30">
            <div className="max-w-7xl mx-auto">
              <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
                <ProjectMetrics metrics={project.metrics} />
              </div>
            </div>
          </section>
        )}

        {/* Challenges and Solutions */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
              <ProjectChallenges
                challenges={project.challenges}
                solutions={project.solutions}
                learnings={project.learnings}
              />
            </div>
          </div>
        </section>

        {/* Project Actions */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1000ms' }}>
              <h2 className="text-3xl font-bold text-gradient mb-6">
                Explore o Projeto
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Veja o projeto em funcionamento ou explore o código fonte para entender 
                melhor as soluções implementadas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {project.liveUrl && (
                  <Button size="lg" className="btn-hero" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Ver Demo Live
                    </a>
                  </Button>
                )}
                
                {project.githubUrl && (
                  <Button variant="outline" size="lg" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 mr-2" />
                      Ver Código
                    </a>
                  </Button>
                )}
                
                <Button variant="outline" size="lg" onClick={handleShare}>
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1200ms' }}>
                <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
                  Projetos Relacionados
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedProjects.map((relatedProject, index) => (
                    <ProjectCard 
                      key={relatedProject.id} 
                      project={relatedProject}
                      className="animate-scale-in"
                      style={{ animationDelay: `${1400 + index * 200}ms` } as React.CSSProperties}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Gostou do Projeto?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vamos conversar sobre como posso ajudar você a criar soluções 
                similares para seu negócio ou ideia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="btn-hero"
                  onClick={() => window.location.href = '/contato'}
                >
                  Iniciar Conversa
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.location.href = '/portfolio'}
                >
                  Ver Mais Projetos
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PortfolioProject;