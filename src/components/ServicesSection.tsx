import { Globe, Zap, Cog, Users } from 'lucide-react';
import { GlowCard } from '@/components/ui/GlowCard';

const ServicesSection = () => {

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
      features: ['n8n & Make.com', 'Workflows Personalizados', 'Email Marketing', 'Relatórios Automáticos'],
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
      className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Background Elements - Decorative only */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />

        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-space-grotesk font-semibold tracking-tight text-gradient mb-4 sm:mb-6">
            O Que Eu Faço
          </h2>
          <p className="text-sm sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
            Ofereco soluções completas para transformar seus desafios tecnológicos
            em oportunidades de crescimento e inovação.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8" role="list" aria-label="Lista de serviços oferecidos">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group relative"
            >
              {/* Background Gradient - Decorative only */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />

              {/* Card */}
              <div className="relative bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 sm:p-8 h-full group-hover:border-primary/40 transition-all duration-500 group-hover:shadow-dramatic">
                {/* Icon */}
                <div className="mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" aria-hidden="true" />
                  </div>
                </div>

                {/* Content */}
                <header>
                  <h3 className="text-lg sm:text-2xl font-bold text-card-foreground mb-3 sm:mb-4 group-hover:text-gradient transition-all duration-300">
                    {service.title}
                  </h3>
                </header>

                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 sm:space-y-3" role="list" aria-label={`Características do serviço ${service.title}`}>
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-card-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ transitionDelay: `${featureIndex * 100}ms` }}
                      role="listitem"
                    >
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Arrow - Decorative only */}
                <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 bg-primary/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 sm:group-hover:translate-x-2" aria-hidden="true">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-r-2 border-t-2 border-primary transform rotate-45" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8 sm:mt-16 px-2 sm:px-0">
          <div className="max-w-2xl mx-auto">
            <GlowCard
              customSize={true}
              glowColor="purple"
              className="w-full h-auto aspect-auto bg-gradient-to-r from-card/50 to-muted/30"
            >
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-2xl font-bold text-gradient mb-3 sm:mb-4">
                  Pronto para Transformar Sua Ideia?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  Vamos conversar sobre como posso ajudar você a alcançar seus objetivos com tecnologia.
                </p>
                <button
                  className="btn-accent hover:scale-105 transition-transform duration-300"
                  onClick={() => window.open('https://wa.me/5599984870193?text=Olá%20vim%20da%20sua%20pagina%20de%20desenvolvedor,%20gostaria%20de%20conversar%20com%20você%20sobre%20um%20projeto.', '_blank')}
                >
                  Agendar Conversa
                </button>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;