import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      title: 'Dashboard Analytics',
      description: 'Dashboard interativo para análise de dados com gráficos em tempo real, métricas de performance e relatórios customizáveis.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDQwMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMTkyIiBmaWxsPSIjMGYxNzJhIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjM2MCIgaGVpZ2h0PSIxNTIiIHJ4PSI4IiBmaWxsPSIjMWUyOTNiIiBzdHJva2U9IiMwZWE1ZTkiIHN0cm9rZS13aWR0aD0iMiIvPgo8Y2lyY2xlIGN4PSI2MCIgY3k9IjgwIiByPSIyMCIgZmlsbD0iIzBlYTVlOSIvPgo8cmVjdCB4PSIxMDAiIHk9IjYwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjQwIiByeD0iNCIgZmlsbD0iIzMzNDE1NSIvPgo8cmVjdCB4PSIzMjAiIHk9IjYwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSIjMGVhNWU5Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMGVhNWU5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIj5EYXNoYm9hcmQgQW5hbHl0aWNzPC90ZXh0Pgo8L3N2Zz4K',
      tags: ['React', 'Chart.js', 'TypeScript', 'API'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'E-commerce Platform',
      description: 'Plataforma de e-commerce completa com carrinho de compras, pagamentos integrados e painel administrativo.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDQwMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMTkyIiBmaWxsPSIjMGYxNzJhIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjM2MCIgaGVpZ2h0PSIxNTIiIHJ4PSI4IiBmaWxsPSIjMWUyOTNiIiBzdHJva2U9IiNmYmJmMjQiIHN0cm9rZS13aWR0aD0iMiIvPgo8cmVjdCB4PSI0MCIgeT0iNDAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI2MCIgcng9IjQiIGZpbGw9IiMzMzQxNTUiLz4KPHJlY3QgeD0iMTQwIiB5PSI0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiByeD0iNCIgZmlsbD0iIzMzNDE1NSIvPgo8cmVjdCB4PSIyNDAiIHk9IjQwIiB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHJ4PSI0IiBmaWxsPSIjMzM0MTU1Ii8+CjxyZWN0IHg9IjMwMCIgeT0iMTIwIiB3aWR0aD0iNjAiIGhlaWdodD0iMzAiIHJ4PSI0IiBmaWxsPSIjZmJiZjI0Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmJiZjI0IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIj5FLWNvbW1lcmNlPC90ZXh0Pgo8L3N2Zz4K',
      tags: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'Aplicativo de gerenciamento de tarefas com colaboração em equipe, notificações e integração com calendário.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDQwMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMTkyIiBmaWxsPSIjMGYxNzJhIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjM2MCIgaGVpZ2h0PSIxNTIiIHJ4PSI4IiBmaWxsPSIjMWUyOTNiIiBzdHJva2U9IiMxMGI5ODEiIHN0cm9rZS13aWR0aD0iMiIvPgo8cmVjdCB4PSI0MCIgeT0iNDAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAiIHJ4PSI0IiBmaWxsPSIjMzM0MTU1Ii8+CjxyZWN0IHg9IjQwIiB5PSI3MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMCIgcng9IjQiIGZpbGw9IiMzMzQxNTUiLz4KPHJlY3QgeD0iNDAiIHk9IjEwMCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMCIgcng9IjQiIGZpbGw9IiMzMzQxNTUiLz4KPGNpcmNsZSBjeD0iMzMwIiBjeT0iNTAiIHI9IjgiIGZpbGw9IiMxMGI5ODEiLz4KPGNpcmNsZSBjeD0iMzMwIiBjeT0iODAiIHI9IjgiIGZpbGw9IiMxMGI5ODEiLz4KPHRleHQgeD0iMjAwIiB5PSIxNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMxMGI5ODEiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPlRhc2sgTWFuYWdlbWVudDwvdGV4dD4KPC9zdmc+Cg==',
      tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#'
    }
  ];



  return (
    <section
      id="portfolio"
      className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Background Elements - Decorative only */}
        <div className="absolute top-20 right-0 w-40 h-40 sm:w-80 sm:h-80 bg-accent/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-20 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />

        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-section text-gradient mb-4 sm:mb-6">
            Portfólio
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 px-2">
            Projetos que demonstram minha capacidade de transformar ideias em soluções digitais funcionais e escaláveis.
          </p>
        </div>

        {/* Featured Project - Comando Golgota */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gradient mb-2">Projeto em Destaque</h3>
            <p className="text-sm sm:text-base text-muted-foreground px-2">Projeto real desenvolvido e em produção</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card-premium group cursor-pointer" onClick={() => window.open(featuredProject.url, '_blank')}>
              {/* Live Website Preview */}
              <div className="relative overflow-hidden rounded-xl mb-4 sm:mb-6 bg-card/50">
                <div className="aspect-video w-full">
                  <iframe
                    src={featuredProject.url}
                    className="w-full h-full border-0 rounded-xl transition-transform duration-500 group-hover:scale-105"
                    title={`Preview do ${featuredProject.title}`}
                    loading="lazy"
                  />
                </div>

                {/* Live Badge */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex items-center gap-1 sm:gap-2 bg-green-500/90 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                  LIVE
                </div>

                {/* Visit Button - Hidden on mobile, shown on hover on desktop */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    className="bg-primary/90 text-primary-foreground hover:bg-primary backdrop-blur-sm text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Visitar Site</span>
                    <span className="sm:hidden">Ver</span>
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="text-center px-2 sm:px-0">
                <h4 className="text-xl sm:text-2xl font-bold text-gradient mb-2 sm:mb-3">{featuredProject.title}</h4>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                  {featuredProject.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-4 sm:mb-6">
                  {featuredProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-xs sm:text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full" />
                    Site em produção e funcionando
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Projects Preview */}
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gradient mb-2">Outros Projetos</h3>
          <p className="text-sm sm:text-base text-muted-foreground px-2">Exemplos de soluções desenvolvidas</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="card-premium group">
              <div className="relative overflow-hidden rounded-xl mb-3 sm:mb-4">
                <img
                  src={project.image}
                  alt={`Preview do ${project.title}`}
                  className="w-full h-28 sm:h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h4 className="font-bold text-card-foreground mb-2 text-sm sm:text-base">{project.title}</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{project.description}</p>
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
        <div className="text-center px-2 sm:px-0">
          <div className="bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-2xl font-bold text-gradient mb-3 sm:mb-4">
              Interessado em Ver Mais?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              Tenho outros projetos e soluções desenvolvidas. Vamos conversar sobre como posso ajudar você!
            </p>
            <Button
              className="btn-hero text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
              onClick={() => window.open('https://wa.me/5599984870193?text=Olá%20vim%20da%20sua%20pagina%20de%20desenvolvedor,%20gostaria%20de%20ver%20mais%20projetos%20e%20conversar%20sobre%20uma%20solução.', '_blank')}
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Ver Todos os Projetos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;