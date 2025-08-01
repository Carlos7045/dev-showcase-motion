import { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentImage } from '@/components/OptimizedImage';
import { LazyLoad } from '@/components/LazyLoad';
import projectCrm from '@/assets/project-crm.jpg';
import projectApi from '@/assets/project-api.jpg';
import projectAutomation from '@/assets/project-automation.jpg';

const PortfolioSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('portfolio');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Sistema CRM Inteligente',
      description: 'Plataforma completa de gestão de relacionamento com clientes, incluindo automações de email e relatórios avançados.',
      image: projectCrm,
      tags: ['React', 'Node.js', 'PostgreSQL', 'API'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Hub de Integrações API',
      description: 'Sistema centralizado para conectar múltiplas APIs e serviços, facilitando a sincronização de dados entre plataformas.',
      image: projectApi,
      tags: ['Next.js', 'TypeScript', 'Webhooks', 'REST API'],
      category: 'api',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Automação de Processos',
      description: 'Solução SaaS para automatizar workflows empresariais, desde aprovações até geração de relatórios.',
      image: projectAutomation,
      tags: ['React', 'Supabase', 'Zapier', 'Automation'],
      category: 'automation',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'E-commerce Personalizado',
      description: 'Loja virtual completa com sistema de pagamentos, gestão de estoque e painel administrativo.',
      image: projectCrm,
      tags: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      title: 'Dashboard Analytics',
      description: 'Painel interativo para visualização de dados empresariais com gráficos em tempo real e relatórios customizados.',
      image: projectApi,
      tags: ['React', 'D3.js', 'WebSocket', 'Charts'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'Bot de Atendimento',
      description: 'Chatbot inteligente integrado com WhatsApp e Telegram para atendimento automatizado ao cliente.',
      image: projectAutomation,
      tags: ['Node.js', 'OpenAI', 'WhatsApp API', 'NLP'],
      category: 'automation',
      demoUrl: '#',
      githubUrl: '#'
    }
  ];

  const filters = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'web', label: 'Desenvolvimento Web' },
    { id: 'api', label: 'APIs & Integrações' },
    { id: 'automation', label: 'Automações' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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
        <header className="text-center mb-16">
          <h2 
            id="portfolio-heading"
            className={`text-section text-gradient mb-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          >
            Portfólio
          </h2>
          <p className={`text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            Projetos que demonstram minha capacidade de transformar ideias em soluções digitais funcionais e escaláveis.
          </p>

          {/* Filter Tabs */}
          <nav 
            className={`flex flex-wrap justify-center gap-4 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} 
            style={{ animationDelay: '400ms' }}
            role="tablist"
            aria-label="Filtros de categoria de projetos"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground shadow-elegant'
                    : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-card-foreground border border-primary/20'
                }`}
                role="tab"
                aria-selected={activeFilter === filter.id}
                aria-controls="projects-grid"
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </nav>
        </header>

        {/* Projects Grid */}
        <div 
          id="projects-grid"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
          role="tabpanel"
          aria-label={`Projetos da categoria ${filters.find(f => f.id === activeFilter)?.label}`}
        >
          {filteredProjects.map((project, index) => (
            <article 
              key={project.id}
              className={`card-project ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${600 + index * 150}ms` }}
            >
              {/* Project Image */}
              <figure className="relative overflow-hidden">
                <LazyLoad height={192} offset={200}>
                  <ContentImage 
                    src={project.image}
                    alt={`Screenshot do projeto ${project.title}`}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    quality={80}
                  />
                </LazyLoad>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    size="sm" 
                    className="bg-card/90 text-card-foreground hover:bg-card border border-primary/20 backdrop-blur-sm"
                    aria-label={`Ver demo do projeto ${project.title}`}
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-card/90 text-card-foreground hover:bg-card border border-primary/20 backdrop-blur-sm"
                    aria-label={`Ver código fonte do projeto ${project.title}`}
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>
              </figure>

              {/* Project Content */}
              <div className="p-6">
                <header>
                  <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-gradient transition-all duration-300">
                    {project.title}
                  </h3>
                </header>
                
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Tags */}
                <ul className="flex flex-wrap gap-2 mb-6" role="list" aria-label={`Tecnologias utilizadas no projeto ${project.title}`}>
                  {project.tags.map((tag) => (
                    <li 
                      key={tag}
                      className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                      role="listitem"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                {/* Action Buttons Mobile */}
                <nav className="flex gap-3 md:hidden" aria-label={`Ações para o projeto ${project.title}`}>
                  <Button 
                    size="sm" 
                    className="btn-ghost flex-1"
                    aria-label={`Ver demo do projeto ${project.title}`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                    Demo
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    aria-label={`Ver código fonte do projeto ${project.title}`}
                  >
                    <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                    Código
                  </Button>
                </nav>
              </div>
            </article>
          ))}
        </div>

        {/* More Projects CTA */}
        <aside className={`text-center mt-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1000ms' }}>
          <div className="bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Gostou do Que Viu?
            </h3>
            <p className="text-muted-foreground mb-6">
              Estes são apenas alguns exemplos do meu trabalho. Vamos criar algo incrível juntos!
            </p>
            <nav className="flex flex-col sm:flex-row gap-4 justify-center" aria-label="Ações de contato">
              <Button 
                className="btn-hero"
                aria-label="Ver mais projetos do portfólio"
              >
                Ver Mais Projetos
              </Button>
              <Button 
                className="btn-ghost"
                aria-label="Solicitar orçamento para novo projeto"
              >
                Solicitar Orçamento
              </Button>
            </nav>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default PortfolioSection;