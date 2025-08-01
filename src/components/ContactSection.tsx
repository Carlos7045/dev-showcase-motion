import { Mail, MessageCircle, Linkedin, Github, Send, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedSection, StaggeredList } from '@/components/AnimatedSection';
import { TiltCard, MagneticButton } from '@/components/InteractiveElements';
import { defaultAnimations } from '@/config/animations';

const ContactSection = () => {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      subtitle: 'Resposta Rápida',
      action: 'Enviar Mensagem',
      link: 'https://wa.me/5511999999999',
      gradient: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Mail,
      title: 'E-mail',
      subtitle: 'contato@seudominio.com',
      action: 'Enviar E-mail',
      link: 'mailto:contato@seudominio.com',
      gradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      subtitle: 'Rede Profissional',
      action: 'Conectar',
      link: 'https://linkedin.com/in/seulinkedin',
      gradient: 'from-blue-600 to-blue-700',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-700 dark:text-blue-300'
    }
  ];

  const socialLinks = [
    { icon: Github, url: 'https://github.com/seugithub', label: 'GitHub' },
    { icon: Linkedin, url: 'https://linkedin.com/in/seulinkedin', label: 'LinkedIn' },
    { icon: Mail, url: 'mailto:contato@seudominio.com', label: 'E-mail' }
  ];

  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

        {/* Floating Particles */}
        <AnimatedSection animation={{...defaultAnimations.bounce, delay: 0}}>
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full" />
        </AnimatedSection>
        <AnimatedSection animation={{...defaultAnimations.bounce, delay: 0.3}}>
          <div className="absolute top-40 right-20 w-3 h-3 bg-accent rounded-full" />
        </AnimatedSection>
        <AnimatedSection animation={{...defaultAnimations.bounce, delay: 0.7}}>
          <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-primary-glow rounded-full" />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Inspirational Content */}
          <div>
            <AnimatedSection animation={defaultAnimations.slideLeft}>
              <h2 className="text-section text-gradient mb-8">
                Vamos Transformar
                <br />
                <span className="text-accent">Sua Visão</span> em Realidade
              </h2>
            </AnimatedSection>
            
            <AnimatedSection animation={{...defaultAnimations.fadeIn, delay: 0.2}}>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Cada grande projeto começa com uma conversa. Estou aqui para entender 
                seus desafios e criar soluções que superem suas expectativas.
              </p>
            </AnimatedSection>

            <StaggeredList
              animation={{...defaultAnimations.slideLeft, delay: 0}}
              staggerDelay={0.1}
              className="space-y-6 mb-8"
            >
              <div className="flex items-center gap-4 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>São Paulo, Brasil (Atendimento Global)</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>Disponível para reuniões virtuais</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <Send className="w-5 h-5 text-primary" />
                <span>Resposta em até 24 horas</span>
              </div>
            </StaggeredList>

            {/* Social Links */}
            <StaggeredList
              animation={{...defaultAnimations.scaleIn, delay: 0}}
              staggerDelay={0.1}
              className="flex gap-4"
            >
              {socialLinks.map((social) => (
                <MagneticButton
                  key={social.label}
                  as="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  config={{
                    strength: 0.3,
                    radius: 60,
                    restoreSpeed: 0.2
                  }}
                  className="w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/40 hover:bg-primary/5 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300" />
                </MagneticButton>
              ))}
            </StaggeredList>
          </div>

          {/* Right Side - Contact Methods */}
          <div>
            <StaggeredList
              animation={{...defaultAnimations.slideRight, delay: 0}}
              staggerDelay={0.15}
              className="space-y-6"
            >
              {contactMethods.map((method) => (
                <TiltCard
                  key={method.title}
                  config={{
                    maxTilt: 8,
                    scale: 1.02,
                    glare: true,
                    glareMaxOpacity: 0.1,
                    speed: 400
                  }}
                  className="group cursor-pointer"
                >
                  <a 
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 transition-all duration-500 hover:shadow-xl hover:border-primary/30 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50 dark:group-hover:from-gray-800 dark:group-hover:to-gray-700">
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${method.gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-xl`} />
                      
                      <div className="relative flex items-center gap-6">
                        {/* Icon */}
                        <div className={`w-16 h-16 ${method.iconBg} group-hover:bg-gradient-to-br group-hover:${method.gradient} rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
                          <method.icon className={`w-8 h-8 ${method.iconColor} group-hover:text-white transition-all duration-500`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-gradient transition-all duration-300">
                            {method.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">
                            {method.subtitle}
                          </p>
                          <span className="text-primary font-medium group-hover:text-accent transition-colors duration-300 inline-flex items-center gap-2">
                            {method.action}
                            <div className="w-4 h-4 border-r-2 border-t-2 border-current transform rotate-45 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>

                        {/* Hover Indicator */}
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary/20">
                          <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </a>
                </TiltCard>
              ))}
            </StaggeredList>

            {/* Call to Action */}
            <AnimatedSection 
              animation={{...defaultAnimations.scaleIn, delay: 0.8}}
              className="mt-12"
            >
              <TiltCard
                config={{
                  maxTilt: 5,
                  scale: 1.01,
                  glare: true,
                  glareMaxOpacity: 0.05
                }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:shadow-xl transition-all duration-500">
                  <h3 className="text-2xl font-bold text-gradient mb-4">
                    Pronto para Começar?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Não importa o tamanho do seu projeto. Vamos conversar e encontrar a melhor solução para você.
                  </p>
                  <MagneticButton
                    config={{
                      strength: 0.4,
                      radius: 80,
                      restoreSpeed: 0.2
                    }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Iniciar Conversa
                  </MagneticButton>
                </div>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;