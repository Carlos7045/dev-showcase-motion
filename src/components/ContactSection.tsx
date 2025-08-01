import { useEffect, useState } from 'react';
import { Mail, MessageCircle, Linkedin, Github, Send, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
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

    const element = document.getElementById('contact');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      subtitle: 'Resposta Rápida',
      action: 'Enviar Mensagem',
      link: 'https://wa.me/5511999999999',
      color: 'from-green-500/20 to-green-600/20',
      hoverColor: 'hover:border-green-500/40'
    },
    {
      icon: Mail,
      title: 'E-mail',
      subtitle: 'contato@seudominio.com',
      action: 'Enviar E-mail',
      link: 'mailto:contato@seudominio.com',
      color: 'from-blue-500/20 to-blue-600/20',
      hoverColor: 'hover:border-blue-500/40'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      subtitle: 'Rede Profissional',
      action: 'Conectar',
      link: 'https://linkedin.com/in/seulinkedin',
      color: 'from-blue-600/20 to-blue-700/20',
      hoverColor: 'hover:border-blue-600/40'
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
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-bounce" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-accent rounded-full animate-bounce delay-300" />
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-primary-glow rounded-full animate-bounce delay-700" />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Inspirational Content */}
          <div className={`${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <h2 className="text-section text-gradient mb-8">
              Vamos Transformar
              <br />
              <span className="text-accent">Sua Visão</span> em Realidade
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Cada grande projeto começa com uma conversa. Estou aqui para entender 
              seus desafios e criar soluções que superem suas expectativas.
            </p>

            <div className="space-y-6 mb-8">
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
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-card/50 border border-primary/20 rounded-xl flex items-center justify-center hover:border-primary/40 hover:bg-card transition-all duration-300 hover:scale-110 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-primary" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Contact Methods */}
          <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div 
                  key={method.title}
                  className={`group ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${400 + index * 200}ms` }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${method.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Card */}
                  <div className={`relative bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-primary/20 ${method.hoverColor} rounded-2xl p-6 transition-all duration-500 group-hover:shadow-dramatic cursor-pointer`}>
                    <a 
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-6 text-left w-full"
                    >
                      {/* Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <method.icon className="w-8 h-8 text-primary-foreground" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-card-foreground mb-1 group-hover:text-gradient transition-all duration-300">
                          {method.title}
                        </h3>
                        <p className="text-muted-foreground mb-2">{method.subtitle}</p>
                        <span className="text-primary font-medium group-hover:text-accent transition-colors duration-300">
                          {method.action} →
                        </span>
                      </div>

                      {/* Hover Arrow */}
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
                        <div className="w-4 h-4 border-r-2 border-t-2 border-primary transform rotate-45" />
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className={`mt-12 text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1000ms' }}>
              <div className="bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gradient mb-4">
                  Pronto para Começar?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Não importa o tamanho do seu projeto. Vamos conversar e encontrar a melhor solução para você.
                </p>
                <Button className="btn-accent hover:scale-105 transition-transform duration-300">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Iniciar Conversa
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;