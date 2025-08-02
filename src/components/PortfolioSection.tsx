import { useState } from 'react';
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
  const [activeFilter, setActiveFilter] = useState('all');

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
    },
    {
      id: 4,
      title: 'E-commerce Personalizado',
      description: 'Loja virtual completa com sistema de pagamentos, gestão de estoque e painel administrativo.',
      image: 'https://via.placeholder.com/400x192/1a1a1a/ffffff?text=E-commerce',
      tags: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      title: 'Dashboard Analytics',
      description: 'Painel interativo para visualização de dados empresariais com gráficos em tempo real e relatórios customizados.',
      image: 'https://via.placeholder.com/400x192/1a1a1a/ffffff?text=Analytics',
      tags: ['React', 'D3.js', 'WebSocket', 'Charts'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'Bot de Atendimento',
      description: 'Chatbot inteligente integrado com WhatsApp e Telegram para atendimento automatizado ao cliente.',
      image: 'https://via.placeholder.com/400x192/1a1a1a/ffffff?text=ChatBot',
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
        <div className="text-center mb-16">
          <h2 className="text-section text-gradient mb-6">
            Portfólio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
            Projetos que demonstram minha capacidade de transformar ideias em soluções digitais funcionais e escaláveis.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4">
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
          </div>
        </div>

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
              className="card-project"
            >
              {/* Project Image */}
              <figure className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={`Screenshot do projeto ${project.title}`}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    size="sm" 
                    className="bg-card/90 text-card-foreground hover:bg-card border border-primary/20 backdrop-blur-sm"
                    onClick={() => window.open(project.demoUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-card/90 text-card-foreground hover:bg-card border border-primary/20 backdrop-blur-sm"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4" />
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
                <div className="flex gap-3 md:hidden">
                  <Button 
                    size="sm" 
                    className="btn-ghost flex-1"
                    onClick={() => window.open(project.demoUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Código
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* More Projects CTA */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <GlowCard 
              customSize={true} 
              glowColor="blue" 
              className="w-full h-auto aspect-auto bg-gradient-to-r from-card/50 to-muted/30"
            >
              <div className="p-4">
                <h3 className="text-2xl font-bold text-gradient mb-4">
                  Gostou do Que Viu?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Estes são apenas alguns exemplos do meu trabalho. Vamos criar algo incrível juntos!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="btn-hero"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      contactSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Ver Mais Projetos
                  </Button>
                  <Button 
                    className="btn-ghost"
                    onClick={() => window.open('https://wa.me/5599984870193?text=Olá%20vim%20da%20sua%20pagina%20de%20desenvolvedor,%20gostaria%20de%20conversar%20com%20você%20sobre%20um%20projeto.', '_blank')}
                  >
                    Solicitar Orçamento
                  </Button>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;