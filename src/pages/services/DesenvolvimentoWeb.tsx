import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Code2, 
  Smartphone, 
  Zap, 
  Shield, 
  Globe, 
  Rocket,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DesenvolvimentoWeb: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Code2,
      title: 'Desenvolvimento Moderno',
      description: 'React, Next.js, TypeScript e as mais modernas tecnologias do mercado',
      gradient: 'from-blue-500/20 to-primary/20'
    },
    {
      icon: Smartphone,
      title: 'Design Responsivo',
      description: 'Interfaces que funcionam perfeitamente em todos os dispositivos',
      gradient: 'from-primary/20 to-accent/20'
    },
    {
      icon: Zap,
      title: 'Performance Otimizada',
      description: 'Carregamento rápido e experiência fluida para seus usuários',
      gradient: 'from-accent/20 to-primary-glow/20'
    },
    {
      icon: Shield,
      title: 'Segurança Avançada',
      description: 'Implementação de melhores práticas de segurança e proteção de dados',
      gradient: 'from-primary-glow/20 to-blue-500/20'
    }
  ];

  const projects = [
    {
      title: 'E-commerce Completo',
      description: 'Plataforma de vendas online com pagamentos integrados',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'Next.js', 'Stripe', 'Supabase'],
      liveDemo: '#',
      caseStudy: '#'
    },
    {
      title: 'Dashboard Analytics',
      description: 'Sistema de análise de dados com visualizações interativas',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'TypeScript', 'Chart.js', 'PostgreSQL'],
      liveDemo: '#',
      caseStudy: '#'
    },
    {
      title: 'App de Gestão',
      description: 'Sistema completo de gestão empresarial',
      image: '/api/placeholder/400/250',
      technologies: ['Next.js', 'Prisma', 'tRPC', 'Tailwind'],
      liveDemo: '#',
      caseStudy: '#'
    }
  ];

  const pricingPlans = [
    {
      name: 'Landing Page',
      price: 'R$ 2.500',
      description: 'Perfeito para apresentar seu negócio online',
      features: [
        'Design responsivo profissional',
        'SEO otimizado',
        'Formulário de contato',
        'Integração com Google Analytics',
        'Hospedagem por 1 ano inclusa',
        'Suporte por 30 dias'
      ],
      popular: false
    },
    {
      name: 'Site Institucional',
      price: 'R$ 5.500',
      description: 'Site completo para sua empresa',
      features: [
        'Até 10 páginas',
        'Blog integrado',
        'Painel administrativo',
        'Otimização para buscadores',
        'Integração com redes sociais',
        'Certificado SSL',
        'Suporte por 60 dias'
      ],
      popular: true
    },
    {
      name: 'E-commerce',
      price: 'R$ 12.000',
      description: 'Loja virtual completa para vender online',
      features: [
        'Catálogo de produtos ilimitado',
        'Carrinho de compras',
        'Integração com pagamentos',
        'Painel de administração',
        'Relatórios de vendas',
        'Sistema de cupons',
        'Suporte por 90 dias'
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      company: 'Tech Solutions',
      role: 'CEO',
      content: 'O site desenvolvido superou nossas expectativas. Design moderno e funcionalidades perfeitas.',
      rating: 5,
      image: '/api/placeholder/60/60'
    },
    {
      name: 'João Santos',
      company: 'Digital Marketing',
      role: 'Diretor',
      content: 'Profissional excepcional! Entregou o projeto no prazo e com qualidade superior.',
      rating: 5,
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Ana Costa',
      company: 'E-commerce Plus',
      role: 'Fundadora',
      content: 'Nossa loja virtual triplicou as vendas após o novo desenvolvimento. Recomendo!',
      rating: 5,
      image: '/api/placeholder/60/60'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Desenvolvimento Web Profissional | Aplicações Modernas e Responsivas</title>
        <meta 
          name="description" 
          content="Desenvolvimento de sites, e-commerce e aplicações web modernas com React, Next.js e TypeScript. Design responsivo, performance otimizada e SEO." 
        />
        <meta 
          name="keywords" 
          content="desenvolvimento web, react, next.js, typescript, e-commerce, site responsivo, aplicação web" 
        />
        <link rel="canonical" href="https://seudominio.com/desenvolvimento-web" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Desenvolvimento Web Profissional | Aplicações Modernas" />
        <meta property="og:description" content="Desenvolvimento de sites e aplicações web modernas com as melhores tecnologias do mercado." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seudominio.com/desenvolvimento-web" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Desenvolvimento Web",
            "description": "Desenvolvimento de sites e aplicações web modernas",
            "provider": {
              "@type": "Person",
              "name": "Seu Nome"
            },
            "offers": {
              "@type": "Offer",
              "priceRange": "R$ 2.500 - R$ 12.000"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
                <Badge className="mb-4">Desenvolvimento Web</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gradient mb-6">
                  Transforme Sua Ideia em
                  <span className="block">Realidade Digital</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Desenvolvimento de aplicações web modernas, responsivas e otimizadas. 
                  Do conceito ao deploy, criamos soluções que geram resultados reais para seu negócio.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="btn-hero group"
                    onClick={() => window.location.href = '/portfolio'}
                  >
                    <span>Ver Projetos</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="group"
                    onClick={() => window.location.href = '/contato'}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    <span>Solicitar Orçamento</span>
                  </Button>
                </div>
              </div>
              
              <div className={`relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
                <div className="relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 backdrop-blur-sm border border-primary/20">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                    <Code2 className="w-16 h-16 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Por Que Escolher Nosso Desenvolvimento?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Utilizamos as tecnologias mais modernas e melhores práticas para criar 
                aplicações web que se destacam no mercado.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={feature.title}
                  className={`group relative overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-500 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <CardHeader className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Showcase */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Projetos em Destaque
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Conheça alguns dos projetos que desenvolvemos e os resultados alcançados.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card 
                  key={project.title}
                  className={`group overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-dramatic ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${600 + index * 200}ms` }}
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-4">
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => {
                            if (project.liveDemo && project.liveDemo !== '#') {
                              window.open(project.liveDemo, '_blank', 'noopener,noreferrer');
                            } else {
                              window.location.href = '/portfolio';
                            }
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            if (project.caseStudy && project.caseStudy !== '#') {
                              window.open(project.caseStudy, '_blank', 'noopener,noreferrer');
                            } else {
                              window.location.href = '/portfolio';
                            }
                          }}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Case Study
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Planos e Investimento
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Escolha o plano ideal para seu projeto. Todos incluem código limpo, 
                documentação completa e suporte pós-entrega.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <Card 
                  key={plan.name}
                  className={`relative overflow-hidden ${plan.popular ? 'border-primary ring-2 ring-primary/20' : 'border-primary/20'} hover:border-primary/40 transition-all duration-500 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${1000 + index * 200}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        Mais Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold text-primary mb-2">{plan.price}</div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.popular ? 'btn-hero' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => window.location.href = '/contato'}
                    >
                      Solicitar Orçamento
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                O Que Nossos Clientes Dizem
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Depoimentos reais de clientes que transformaram seus negócios com nossas soluções.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card 
                  key={testimonial.name}
                  className={`border-primary/20 hover:border-primary/40 transition-all duration-500 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${1400 + index * 200}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-semibold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role} • {testimonial.company}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Pronto para Começar Seu Projeto?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vamos conversar sobre suas necessidades e criar uma solução personalizada 
                que vai impulsionar seu negócio para o próximo nível.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="btn-hero group"
                  onClick={() => window.location.href = '/contato'}
                >
                  <span>Solicitar Orçamento Gratuito</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.location.href = '/contato'}
                >
                  <span>Agendar Conversa</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DesenvolvimentoWeb;