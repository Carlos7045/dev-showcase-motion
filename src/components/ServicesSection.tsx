import { Globe, Zap, Cog, Users } from 'lucide-react';

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
    <section id="services" className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-section text-gradient mb-6">
            O Que Eu Faço
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ofereco soluções completas para transformar seus desafios tecnológicos 
            em oportunidades de crescimento e inovação.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="group relative"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 h-full group-hover:border-primary/40 transition-all duration-500 group-hover:shadow-dramatic">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-card-foreground mb-4 group-hover:text-gradient transition-all duration-300">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div 
                      key={feature}
                      className="flex items-center gap-3 text-sm text-card-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ transitionDelay: `${featureIndex * 100}ms` }}
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-8 right-8 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
                  <div className="w-4 h-4 border-r-2 border-t-2 border-primary transform rotate-45" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Pronto para Transformar Sua Ideia?
            </h3>
            <p className="text-muted-foreground mb-6">
              Vamos conversar sobre como posso ajudar você a alcançar seus objetivos com tecnologia.
            </p>
            <button 
              className="btn-accent hover:scale-105 transition-transform duration-300"
              onClick={() => window.open('https://wa.me/5599984870193?text=Olá%20vim%20da%20sua%20pagina%20de%20desenvolvedor,%20gostaria%20de%20conversar%20com%20você%20sobre%20um%20projeto.', '_blank')}
            >
              Agendar Conversa
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;