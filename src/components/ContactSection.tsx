import { Mail, MessageCircle, Send, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '@/components/ui/GlowCard';
import { MouseFollowSocials } from '@/components/ui/MouseFollowSocials';

const ContactSection = () => {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      subtitle: 'Resposta Rápida',
      action: 'Enviar Mensagem',
      link: 'https://wa.me/5599984870193?text=Olá%20vim%20da%20sua%20pagina%20de%20desenvolvedor,%20gostaria%20de%20conversar%20com%20você%20sobre%20um%20projeto.',
      color: 'from-green-500/20 to-green-600/20',
      hoverColor: 'hover:border-green-500/40'
    },
    {
      icon: Mail,
      title: 'E-mail',
      subtitle: 'salgadocarloshenrique@gmail.com',
      action: 'Enviar E-mail',
      link: 'mailto:salgadocarloshenrique@gmail.com?subject=Projeto%20de%20Desenvolvimento&body=Olá%20vim%20da%20sua%20pagina%20de%20desenvolvedor,%20gostaria%20de%20conversar%20com%20você%20sobre%20um%20projeto.',
      color: 'from-blue-500/20 to-blue-600/20',
      hoverColor: 'hover:border-blue-500/40'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      subtitle: 'Rede Profissional',
      action: 'Conectar',
      link: 'https://linkedin.com/in/carlos-henrique-salgado-8b8b8b8b8',
      color: 'from-blue-600/20 to-blue-700/20',
      hoverColor: 'hover:border-blue-600/40'
    }
  ];



  return (
    <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-accent/5 rounded-full blur-3xl" />

        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-1 h-1 sm:w-2 sm:h-2 bg-primary rounded-full opacity-60" />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 sm:w-3 sm:h-3 bg-accent rounded-full opacity-70" />
        <div className="absolute bottom-32 left-1/3 w-1 h-1 sm:w-2 sm:h-2 bg-primary-glow rounded-full opacity-50" />

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          {/* Left Side - Inspirational Content */}
          <div className="px-2 sm:px-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-space-grotesk font-semibold tracking-tight text-gradient mb-6 sm:mb-8">
              Vamos Transformar
              <br />
              <span className="text-accent">Sua Visão</span> em Realidade
            </h2>
            
            <p className="text-sm sm:text-xl text-muted-foreground leading-relaxed mb-6 sm:mb-8">
              Cada grande projeto começa com uma conversa. Estou aqui para entender 
              seus desafios e criar soluções que superem suas expectativas.
            </p>

            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span>Araguaina, Brasil (Atendimento Global)</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span>Disponível para reuniões virtuais</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground">
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span>Resposta em até 24 horas</span>
              </div>
            </div>

            {/* Social Links with Mouse Follow Animation */}
            <MouseFollowSocials />
          </div>

          {/* Right Side - Contact Methods */}
          <div>
            <div className="space-y-4 sm:space-y-6">
              {contactMethods.map((method, index) => (
                <div 
                  key={method.title}
                  className="group relative"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${method.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Card */}
                  <div 
                    className={`relative bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-primary/20 ${method.hoverColor} rounded-2xl p-4 sm:p-6 transition-all duration-500 group-hover:shadow-dramatic cursor-pointer`}
                    onClick={() => window.open(method.link, '_blank')}
                  >
                    <div className="flex items-center gap-4 sm:gap-6 text-left w-full">
                      {/* Icon */}
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <method.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-1 group-hover:text-gradient transition-all duration-300">
                          {method.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground mb-2 transition-colors duration-300 truncate">
                          {method.subtitle}
                        </p>
                        <span className="text-sm sm:text-base text-primary font-medium group-hover:text-accent transition-colors duration-300 inline-flex items-center gap-2">
                          {method.action}
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-r-2 border-t-2 border-current transform rotate-45 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>

                      {/* Hover Indicator */}
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary/20 flex-shrink-0">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-8 sm:mt-12 text-center">
              <GlowCard 
                customSize={true} 
                glowColor="green" 
                className="w-full h-auto aspect-auto bg-gradient-to-r from-card/50 to-muted/30"
              >
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-2xl font-bold text-gradient mb-3 sm:mb-4">
                    Pronto para Começar?
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                    Não importa o tamanho do seu projeto. Vamos conversar e encontrar a melhor solução para você.
                  </p>
                  <Button 
                    className="btn-accent hover:scale-105 transition-transform duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('https://wa.me/5599984870193?text=Olá%20vim%20da%20sua%20pagina%20de%20desenvolvedor,%20gostaria%20de%20conversar%20com%20você%20sobre%20um%20projeto.', '_blank');
                    }}
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Iniciar Conversa
                  </Button>
                </div>
              </GlowCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;