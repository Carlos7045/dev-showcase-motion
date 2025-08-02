import { useEffect, useState } from 'react';
import { Globe, Zap, Cog, Users } from 'lucide-react';

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('services');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Globe,
      title: 'Desenvolvimento Web',
      description: 'Aplicações web modernas e responsivas, desde landing pages até sistemas complexos como CRM e ERP.',
      features: ['React & Next.js', 'Interface Responsiva', 'Performance Otimizada', 'SEO Friendly'],
      gradient: 'from-blue-500/20 to-primary/20'
    },
    {
      icon: Zap,
      title: 'Integrações & APIs',
      description: 'Conectando sistemas diferentes para criar fluxos de trabalho eficientes e automatizados.',
      features: ['REST & GraphQL APIs', 'Webhooks', 'Integração de Pagamentos', 'Sincronização de Dados'],
      gradient: 'from-primary/20 to-accent/20'
    },
    {
      icon: Cog,
      title: 'Automações',
      description: 'Automatização de processos repetitivos para aumentar produtividade e reduzir erros humanos.',
      features: ['Zapier & Make.com', 'Workflows Personalizados', 'Email Marketing', 'Relatórios Automáticos'],
      gradient: 'from-accent/20 to-primary-glow/20'
    },
    {
      icon: Users,
      title: 'Consultoria Tech',
      description: 'Consultoria estratégica para escolher as melhores tecnologias e arquiteturas para seu projeto.',
      features: ['Arquitetura de Software', 'Escolha de Stack', 'Code Review', 'Mentoria Técnica'],
      gradient: 'from-primary-glow/20 to-blue-500/20'
    }
  ];

  return (
    <section 
      id="services" 
      className="py-20 px-6 relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Background Elements - Decorative only */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
        
        {/* Header */}
        <header className="text-center mb-16">
          <h2 
            id="services-heading"
            className={`text-section text-gradient mb-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          >
            O Que Eu Faço
          </h2>
          <p className={`text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            Ofereco soluções completas para transformar seus desafios tecnológicos 
            em oportunidades de crescimento e inovação.
          </p>
        </header>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8" role="list" aria-label="Lista de serviços oferecidos">
          {services.map((service, index) => (
            <article 
              key={service.title}
              className={`group relative ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${400 + index * 200}ms` }}
              role="listitem"
            >
              {/* Background Gradient - Decorative only */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 h-full group-hover:border-primary/40 transition-all duration-500 group-hover:shadow-dramatic">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-primary-foreground" aria-hidden="true" />
                  </div>
                </div>

                {/* Content */}
                <header>
                  <h3 className="text-2xl font-bold text-card-foreground mb-4 group-hover:text-gradient transition-all duration-300">
                    {service.title}
                  </h3>
                </header>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3" role="list" aria-label={`Características do serviço ${service.title}`}>
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={feature}
                      className="flex items-center gap-3 text-sm text-card-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ transitionDelay: `${featureIndex * 100}ms` }}
                      role="listitem"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Arrow - Decorative only */}
                <div className="absolute bottom-8 right-8 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2" aria-hidden="true">
                  <div className="w-4 h-4 border-r-2 border-t-2 border-primary transform rotate-45" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <aside className={`text-center mt-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1200ms' }}>
          <div className="bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Pronto para Transformar Sua Ideia?
            </h3>
            <p className="text-muted-foreground mb-6">
              Vamos conversar sobre como posso ajudar você a alcançar seus objetivos com tecnologia.
            </p>
            <button 
              className="btn-accent hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label="Agendar conversa sobre projeto"
              type="button"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/contato';
                }
              }}
            >
              Agendar Conversa
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ServicesSection;