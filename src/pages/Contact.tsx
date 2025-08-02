import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare, Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MultiStepForm } from '@/components/contact/MultiStepForm';
import { CalendlyWidget } from '@/components/calendar/CalendlyWidget';
import { CustomBooking } from '@/components/calendar/CustomBooking';
import { AnimatedSection, StaggeredList } from '@/components/AnimatedSection';
import { ContactFormData } from '@/types/contact';
import { BookingRequest } from '@/types/calendar';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'calendly'>('quick');

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFormSubmit = async (data: ContactFormData) => {
    // Simular envio do formulário
    console.log('Form submitted:', data);
    
    // Aqui você integraria com seu backend/API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Enviar para analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_submit', {
        event_category: 'Contact',
        event_label: 'Multi-step Form',
        value: 1
      });
    }
  };

  const handleBookingSubmit = async (booking: BookingRequest) => {
    // Simular agendamento
    console.log('Booking submitted:', booking);
    
    // Aqui você integraria com seu sistema de calendário
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Enviar para analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'booking_submit', {
        event_category: 'Calendar',
        event_label: 'Custom Booking',
        value: 1
      });
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Resposta em até 4 horas',
      value: 'salgadocarloshenrique@gmail.com',
      action: 'mailto:contato@seudominio.com',
      color: 'text-primary'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      description: 'Conversa direta e rápida',
      value: '(99) 98487-0193',
      action: 'https://wa.me/5599984870193',
      color: 'text-green-600'
    },
    {
      icon: Calendar,
      title: 'Agendar Reunião',
      description: 'Videochamada de 30 minutos',
      value: 'Calendly',
      action: 'https://calendly.com/salgadocarloshenrique/30min',
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      title: 'Presencial',
      description: 'Araguaina, TO',
      value: 'Mediante agendamento',
      action: '#',
      color: 'text-purple-600'
    }
  ];

  const workingHours = [
    { day: 'Segunda - Sexta', hours: '9:00 - 18:00' },
    { day: 'Sábado', hours: '9:00 - 14:00' },
    { day: 'Domingo', hours: 'Fechado' }
  ];

  return (
    <>
      <Helmet>
        <title>Contato | Vamos Conversar Sobre Seu Projeto</title>
        <meta 
          name="description" 
          content="Entre em contato para discutir seu projeto. Formulário detalhado, resposta rápida e primeira consulta gratuita." 
        />
        <meta 
          name="keywords" 
          content="contato, orçamento, projeto, desenvolvimento web, consultoria, freelancer" 
        />
        <link rel="canonical" href="https://seudominio.com/contato" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contato | Vamos Conversar Sobre Seu Projeto" />
        <meta property="og:description" content="Entre em contato para discutir seu projeto. Resposta rápida e primeira consulta gratuita." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seudominio.com/contato" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Página de Contato",
            "description": "Entre em contato para discutir projetos de desenvolvimento web",
            "url": "https://seudominio.com/contato",
            "mainEntity": {
              "@type": "Person",
              "name": "Desenvolvedor Full-Stack",
              "email": "contato@seudominio.com",
              "telephone": "+5599984870193",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Araguaina",
                "addressRegion": "TO",
                "addressCountry": "BR"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
          {/* Background Elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <AnimatedSection
              animation={{
                type: 'fadeInUp',
                duration: 0.8,
                delay: 0.2
              }}
            >
              <Badge className="mb-4">Contato</Badge>
              <h1 className="tgrid md lg:text-6xl font-bold text-gradient mb-6">
                Vamos Conversar
                <span className="block">Sobre Seu Projeto</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                Preencha o formulário detalhado abaixo ou escolha o método de contato 
                que preferir. Primeira consulta sempre gratuita!
              </p>
            </AnimatedSection>
            
            {/* Quick Stats */}
            <AnimatedSection
              animation={{
                type: 'fadeInUp',
                duration: 0.6,
                delay: 0.6
              }}
            >
              <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center p-4 rounded-lg bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl font-bold text-primary">&lt; 4h</div>
                  <div className="text-sm text-muted-foreground">Tempo de resposta</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card/30 backdrop-blur-sm border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl font-bold text-accent">100%</div>
                  <div className="text-sm text-muted-foreground">Gratuita primeira consulta</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card/30 backdrop-blur-sm border border-primary-glow/10 hover:border-primary-glow/30 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl font-bold text-primary-glow">24-48h</div>
                  <div className="text-sm text-muted-foreground">Proposta detalhada</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection
              animation={{
                type: 'fadeInUp',
                duration: 0.8,
                delay: 0.2
              }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  Escolha Como Prefere Falar
                </h2>
                <p className="text-xl text-muted-foreground">
                  Diferentes formas de entrar em contato, você escolhe a mais conveniente.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {contactMethods.map((method, index) => (
                <Card 
                  key={method.title}
                  className={`border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-elegant cursor-pointer ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => window.open(method.action, '_blank')}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-${method.color.split('-')[1]}-100 dark:bg-${method.color.split('-')[1]}-900/30`}>
                      <method.icon className={`w-6 h-6 ${method.color}`} />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="font-medium text-foreground">{method.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Working Hours */}
            <Card className="max-w-md mx-auto border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Horário de Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {workingHours.map((schedule) => (
                    <div key={schedule.day} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{schedule.day}</span>
                      <span className="font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                  <p className="text-sm text-center text-muted-foreground">
                    <strong>Urgências:</strong> WhatsApp 24/7 para projetos em andamento
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Calendar Booking */}
        <section className="py-16 px-6 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-glow/10 rounded-full blur-lg animate-bounce delay-500" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimatedSection
              animation={{
                type: 'fadeInUp',
                duration: 0.8,
                delay: 0.2
              }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  Agende uma Conversa
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Prefere conversar diretamente? Agende uma reunião gratuita para 
                  discutirmos seu projeto em detalhes.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection
              animation={{
                type: 'fadeInUp',
                duration: 0.8,
                delay: 0.4
              }}
            >
              {/* Tabs for different booking options */}
              <div className="mb-8">
                <div className="flex justify-center">
                  <div className="bg-muted p-1 rounded-lg shadow-lg">
                    <Button 
                      variant={activeTab === 'quick' ? 'default' : 'ghost'}
                      className="mr-1 transition-all duration-300"
                      onClick={() => setActiveTab('quick')}
                    >
                      Agendamento Rápido
                    </Button>
                    <Button 
                      variant={activeTab === 'calendly' ? 'default' : 'ghost'}
                      className="transition-all duration-300"
                      onClick={() => setActiveTab('calendly')}
                    >
                      Calendly
                    </Button>
                  </div>
                </div>
              </div>

              {/* Conditional rendering based on active tab */}
              <div className="relative">
                {activeTab === 'quick' ? (
                  <div className="animate-fade-in">
                    <CustomBooking onBookingSubmit={handleBookingSubmit} />
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <CalendlyWidget />
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Multi-Step Form */}
        <section className="py-16 px-6 bg-muted/30 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimatedSection
              animation={{
                type: 'fadeInUp',
                duration: 0.8,
                delay: 0.2
              }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  Ou Envie um Formulário Detalhado
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Prefere descrever seu projeto por escrito? Use nosso formulário 
                  detalhado para nos contar tudo sobre suas necessidades.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection
              animation={{
                type: 'fadeInUp',
                duration: 0.8,
                delay: 0.6
              }}
       >
              <MultiStepForm onSubmit={handleFormSubmit} />
            </AnimatedSection>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-6 bg-muted/30 relative">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse delay-700" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <AnimatedSection
              animation={{
                type: 'fadeInUp',
                duration: 0.8,
                delay: 0.2
              }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  Perguntas Frequentes
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Quanto tempo leva para receber uma resposta?</h3>
                  <p className="text-muted-foreground text-sm">
                    Normalmente respondo em até 4 horas durante horário comercial. 
                    Para urgências, use o WhatsApp.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">A primeira consulta é realmente gratuita?</h3>
                  <p className="text-muted-foreground text-sm">
                    Sim! A primeira conversa de até 30 minutos é sempre gratuita para 
                    entendermos seu projeto e ver se há fit.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Trabalha com projetos de qualquer tamanho?</h3>
                  <p className="text-muted-foreground text-sm">
                    Sim, desde landing pages simples até sistemas complexos. 
                    Cada projeto é avaliado individualmente.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Como funciona o processo após o contato?</h3>
                  <p className="text-muted-foreground text-sm">
                    1) Conversa inicial gratuita, 2) Análise detalhada, 
                    3) Proposta personalizada, 4) Início do projeto.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Oferece suporte após a entrega?</h3>
                  <p className="text-muted-foreground text-sm">
                    Sim! Todos os projetos incluem período de garantia e 
                    oferecemos planos de manutenção contínua.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Trabalha apenas remotamente?</h3>
                  <p className="text-muted-foreground text-sm">
                    Principalmente remoto, mas posso fazer reuniões presenciais 
                    em São Paulo quando necessário.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Pronto para Começar?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Não importa o tamanho do seu projeto, vamos conversar e encontrar 
                a melhor solução para suas necessidades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-hero" asChild>
                  <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    WhatsApp Direto
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:contato@seudominio.com">
                    <Mail className="w-5 h-5 mr-2" />
                    Enviar Email
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;