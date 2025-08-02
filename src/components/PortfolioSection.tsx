// import { useState } from 'react'; // Não mais necessário
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '@/components/ui/GlowCard';
// Imports temporariamente comentados até os componentes serem criados
// import { ContentImage } from '@/components/OptimizedImage';
// import { LazyLoad } from '@/components/LazyLoad';
// import projectCrm from '@/assets/project-crm.jpg';
// import projectApi from '@/assets/project-api.jpg';
// import projectAutomation from '@/assets/project-automation.jpg';

const PortfolioSection = () => {

  // Projeto principal em destaque
  const featuredProject = {
    id: 'featured',
    title: 'Comando Golgota',
    description: 'Site institucional completo para igreja, com sistema de eventos, galeria de fotos, área de membros e integração com redes sociais. Design responsivo e otimizado para performance.',
    url: 'https://comando-golgota.vercel.app/',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    category: 'web',
    isLive: true
  };

  const projects = [
    {
      id: 1,
      title: 'Sistema CRM Inteligente',
      description: 'Plataforma completa de gestão de relacionamento com clientes, incluindo automações de email e relatórios avançados.',
      image: 'https://via.placeholder.com/400x192/1a1a1a/ffffff?text=CRM+System',
      tags: ['React', 'Node.js', 'PostgreSQL', 'API'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Hub de Integrações API',
      description: 'Sistema centralizado para conectar múltiplas APIs e serviços, facilitando a sincronização de dados entre plataformas.',
      image: 'https://via.placeholder.com/400x192/1a1a1a/ffffff?text=API+Hub',
      tags: ['Next.js', 'TypeScript', 'Webhooks', 'REST API'],
      category: 'api',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Automação de Processos',
      description: 'Solução SaaS para automatizar workflows empresariais, desde aprovações até geração de relatórios.',
      image: 'https://via.placeholder.com/400x192/1a1a1a/ffffff?text=Automation',
      tags: ['React', 'Supabase', 'Zapier', 'Automation'],
      category: 'automation',
      demoUrl: '#',
      githubUrl: '#'
    }
  ];



  return (
    <section 
      id="portfolio" 
      className="py-20 px-6 relative overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Background Elements - Decorative only */}
        <div className="absolute top-20 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-section text-gradient mb-6">
            Portfólio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
            Projetos que demonstram minha capacidade de transformar ideias em soluções digitais funcionais e escaláveis.
          </p>


        </div>

        {/* Featured Project - Comando Golgota */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gradient mb-2">Projeto em Destaque</h3>
            <p className="text-muted-foreground">Projeto real desenvolvido e em produção</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="card-premium group cursor-pointer" onClick={() => window.open(featuredProject.url, '_blank')}>
              {/* Live Website Preview */}
              <div className="relative overflow-hidden rounded-xl mb-6 bg-card/50">
                <div className="aspect-video w-full">
                  <iframe
                    src={featuredProject.url}
                    className="w-full h-full border-0 rounded-xl transition-transform duration-500 group-hover:scale-105"
                    title={`Preview do ${featuredProject.title}`}
                    loading="lazy"
                  />
                </div>
                
                {/* Live Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE
                </div>
                
                {/* Visit Button */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    size="sm" 
                    className="bg-primary/90 text-primary-foreground hover:bg-primary backdrop-blur-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visitar Site
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="text-center">
                <h4 className="text-2xl font-bold text-gradient mb-3">{featuredProject.title}</h4>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {featuredProject.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {featuredProject.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Site em produção e funcionando
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Projects Preview */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gradient mb-2">Outros Projetos</h3>
          <p className="text-muted-foreground">Exemplos de soluções desenvolvidas</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="card-premium group">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img 
                  src={project.image}
                  alt={`Preview do ${project.title}`}
                  className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h4 className="font-bold text-card-foreground mb-2">{project.title}</h4>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Interessado em Ver Mais?
            </h3>
            <p className="text-muted-foreground mb-6">
              Tenho outros projetos e soluções desenvolvidas. Vamos conversar sobre como posso ajudar você!
            </p>
            <Button 
              className="btn-hero"
              onClick={() => window.open('https://wa.me/5599984870193?text=Olá%20vim%20da%20sua%20pagina%20de%20desenvolvedor,%20gostaria%20de%20ver%20mais%20projetos%20e%20conversar%20sobre%20uma%20solução.', '_blank')}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Ver Todos os Projetos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;