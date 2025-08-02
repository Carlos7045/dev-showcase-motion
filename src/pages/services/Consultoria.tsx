import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Shield, 
  Lightbulb, 
  Code2,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Calendar,
  Clock,
  Award,
  BookOpen,
  MessageSquare,
  FileText,
  Zap,
  BarChart3,
  Settings,
  Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Consultoria: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const consultingAreas = [
    {
      icon: Code2,
      title: 'Arquitetura de Software',
      description: 'Design de sistemas escaláveis, escolha de tecnologias e padrões arquiteturais',
      expertise: 95,
      deliverables: ['Documentação técnica', 'Diagramas de arquitetura', 'Roadmap tecnológico'],
      gradient: 'from-blue-500/20 to-primary/20'
    },
    {
      icon: TrendingUp,
      title: 'Transformação Digital',
      description: 'Modernização de sistemas legados e implementação de novas tecnologias',
      expertise: 90,
      deliverables: ['Plano de migração', 'Análise de riscos', 'Cronograma detalhado'],
      gradient: 'from-primary/20 to-accent/20'
    },
    {
      icon: Shield,
      title: 'Segurança & Performance',
      description: 'Auditoria de segurança, otimização de performance e melhores práticas',
      expertise: 88,
      deliverables: ['Relatório de auditoria', 'Plano de otimização', 'Guidelines de segurança'],
      gradient: 'from-accent/20 to-primary-glow/20'
    },
    {
      icon: Users,
      title: 'Gestão de Equipes Tech',
      description: 'Mentoria técnica, processos de desenvolvimento e cultura DevOps',
      expertise: 92,
      deliverables: ['Plano de capacitação', 'Processos documentados', 'Métricas de produtividade'],
      gradient: 'from-primary-glow/20 to-blue-500/20'
    }
  ];

  const consultingPackages = [
    {
      name: 'Diagnóstico Técnico',
      duration: '1-2 semanas',
      price: 'R$ 5.000',
      description: 'Análise completa da sua arquitetura atual',
      features: [
        'Auditoria de código e arquitetura',
        'Identificação de gargalos',
        'Relatório com recomendações',
        'Sessão de apresentação dos resultados',
        'Plano de ação prioritizado'
      ],
      deliverables: [
        'Relatório técnico detalhado',
        'Apresentação executiva',
        'Roadmap de melhorias'
      ],
      popular: false
    },
    {
      name: 'Consultoria Estratégica',
      duration: '1-3 meses',
      price: 'R$ 15.000',
      description: 'Acompanhamento contínuo e mentoria técnica',
      features: [
        'Reuniões semanais de acompanhamento',
        'Revisão de código e arquitetura',
        'Mentoria da equipe técnica',
        'Definição de processos e padrões',
        'Suporte na tomada de decisões',
        'Documentação de melhores práticas'
      ],
      deliverables: [
        'Documentação técnica completa',
        'Processos padronizados',
        'Equipe capacitada',
        'Métricas de acompanhamento'
      ],
      popular: true
    },
    {
      name: 'Transformação Completa',
      duration: '3-6 meses',
      price: 'R$ 35.000',
      description: 'Modernização completa da stack tecnológica',
      features: [
        'Planejamento estratégico completo',
        'Migração de sistemas legados',
        'Implementação de novas tecnologias',
        'Treinamento intensivo da equipe',
        'Acompanhamento pós-implementação',
        'Suporte prioritário 24/7'
      ],
      deliverables: [
        'Sistema modernizado',
        'Equipe treinada e autônoma',
        'Documentação completa',
        'Processos otimizados',
        'Métricas de sucesso'
      ],
      popular: false
    }
  ];

  const consultingProcess = [
    {
      step: 1,
      title: 'Diagnóstico Inicial',
      description: 'Análise profunda da situação atual e identificação de oportunidades',
      duration: '1 semana',
      activities: ['Entrevistas com stakeholders', 'Auditoria técnica', 'Análise de processos']
    },
    {
      step: 2,
      title: 'Estratégia & Planejamento',
      description: 'Desenvolvimento de estratégia personalizada e roadmap detalhado',
      duration: '1-2 semanas',
      activities: ['Definição de objetivos', 'Criação do roadmap', 'Estimativas e cronograma']
    },
    {
      step: 3,
      title: 'Implementação',
      description: 'Execução do plano com acompanhamento contínuo e ajustes',
      duration: 'Variável',
      activities: ['Execução das ações', 'Monitoramento de progresso', 'Ajustes necessários']
    },
    {
      step: 4,
      title: 'Acompanhamento',
      description: 'Monitoramento de resultados e otimização contínua',
      duration: 'Contínuo',
      activities: ['Análise de métricas', 'Otimizações', 'Suporte contínuo']
    }
  ];

  const testimonials = [
    {
      name: 'Carlos Mendes',
      company: 'TechCorp',
      role: 'CTO',
      content: 'A consultoria transformou nossa arquitetura. Reduzimos custos em 40% e aumentamos a performance em 300%.',
      rating: 5,
      project: 'Modernização de Sistema Legacy',
      results: ['40% redução de custos', '300% melhoria de performance', '90% menos bugs']
    },
    {
      name: 'Ana Paula Silva',
      company: 'StartupTech',
      role: 'CEO',
      content: 'Orientação estratégica excepcional. Nossa equipe ganhou autonomia e nossos processos ficaram muito mais eficientes.',
      rating: 5,
      project: 'Estruturação de Equipe Tech',
      results: ['50% mais produtividade', '80% menos retrabalho', '95% satisfação da equipe']
    },
    {
      name: 'Roberto Santos',
      company: 'Enterprise Solutions',
      role: 'Head of Engineering',
      content: 'Consultoria técnica de altíssimo nível. Conseguimos escalar nossa aplicação para milhões de usuários.',
      rating: 5,
      project: 'Arquitetura para Escala',
      results: ['10x mais usuários', '99.9% uptime', '50% menos latência']
    }
  ];

  const expertise = [
    { area: 'Frontend (React, Next.js)', level: 95 },
    { area: 'Backend (Node.js, APIs)', level: 92 },
    { area: 'Cloud & DevOps', level: 88 },
    { area: 'Database Design', level: 90 },
    { area: 'System Architecture', level: 94 },
    { area: 'Team Leadership', level: 89 }
  ];

  const caseStudies = [
    {
      company: 'E-commerce Líder',
      challenge: 'Sistema monolítico não escalava para Black Friday',
      solution: 'Migração para microserviços com arquitetura event-driven',
      timeline: '4 meses',
      results: {
        performance: '+500% capacidade',
        availability: '99.99% uptime',
        cost: '-30% infraestrutura'
      },
      technologies: ['Node.js', 'Docker', 'Kubernetes', 'Redis', 'PostgreSQL']
    },
    {
      company: 'FinTech Emergente',
      challenge: 'Equipe sem processos definidos e alta rotatividade',
      solution: 'Implementação de cultura DevOps e processos ágeis',
      timeline: '3 meses',
      results: {
        productivity: '+80% entregas',
        quality: '-70% bugs',
        retention: '+60% retenção'
      },
      technologies: ['Git Flow', 'CI/CD', 'Testing', 'Code Review', 'Monitoring']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Consultoria Técnica | Estratégia e Arquitetura de Software</title>
        <meta 
          name="description" 
          content="Consultoria técnica especializada em arquitetura de software, transformação digital e gestão de equipes tech. Acelere seu crescimento tecnológico." 
        />
        <meta 
          name="keywords" 
          content="consultoria técnica, arquitetura de software, transformação digital, CTO as a service, mentoria técnica" 
        />
        <link rel="canonical" href="https://seudominio.com/consultoria" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Consultoria Técnica | Acelere Seu Crescimento Tecnológico" />
        <meta property="og:description" content="Consultoria estratégica para transformar sua operação tecnológica e acelerar resultados." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seudominio.com/consultoria" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Consultoria Técnica",
            "description": "Consultoria em arquitetura de software e transformação digital",
            "provider": {
              "@type": "Person",
              "name": "Seu Nome"
            },
            "offers": {
              "@type": "Offer",
              "priceRange": "R$ 5.000 - R$ 35.000"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-background via-background/95 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
                <Badge className="mb-4">Consultoria Técnica</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gradient mb-6">
                  Acelere Seu
                  <span className="block">Crescimento Tech</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Consultoria estratégica para transformar sua operação tecnológica. 
                  Arquitetura escalável, equipes de alta performance e processos otimizados.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="btn-hero group"
                    onClick={() => window.location.href = '/contato'}
                  >
                    <span>Agendar Diagnóstico</span>
                    <Calendar className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="group"
                    onClick={() => window.location.href = '/portfolio'}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    <span>Ver Cases</span>
                  </Button>
                </div>
              </div>
              
              <div className={`relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
                <div className="relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 backdrop-blur-sm border border-primary/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 flex flex-col items-center justify-center">
                      <Target className="w-8 h-8 text-primary mb-2" />
                      <span className="text-sm font-medium">Estratégia</span>
                    </div>
                    <div className="bg-gradient-to-br from-accent/10 to-primary-glow/10 rounded-xl p-4 flex flex-col items-center justify-center">
                      <Code2 className="w-8 h-8 text-accent mb-2" />
                      <span className="text-sm font-medium">Arquitetura</span>
                    </div>
                    <div className="bg-gradient-to-br from-primary-glow/10 to-primary/10 rounded-xl p-4 flex flex-col items-center justify-center">
                      <Users className="w-8 h-8 text-primary-glow mb-2" />
                      <span className="text-sm font-medium">Equipes</span>
                    </div>
                    <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-4 flex flex-col items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-accent mb-2" />
                      <span className="text-sm font-medium">Resultados</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consulting Areas */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Áreas de Consultoria
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Expertise técnica e estratégica para transformar sua operação tecnológica.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {consultingAreas.map((area, index) => (
                <Card 
                  key={area.title}
                  className={`group relative overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-500 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <CardHeader className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <area.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{area.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Progress value={area.expertise} className="flex-1" />
                          <span className="text-sm font-medium text-primary">{area.expertise}%</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-base mb-4">{area.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-card-foreground mb-3">Entregáveis:</h4>
                      {area.deliverables.map((deliverable) => (
                        <div key={deliverable} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Levels */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Nível de Expertise
              </h2>
              <p className="text-xl text-muted-foreground">
                Anos de experiência prática em tecnologias e metodologias modernas.
              </p>
            </div>

            <Card className="border-primary/20">
              <CardContent className="pt-8">
                <div className="space-y-6">
                  {expertise.map((skill, index) => (
                    <div 
                      key={skill.area}
                      className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                      style={{ animationDelay: `${400 + index * 100}ms` }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{skill.area}</span>
                        <span className="text-primary font-semibold">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Consulting Process */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Processo de Consultoria
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Metodologia comprovada para gerar resultados reais e duradouros.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {consultingProcess.map((step, index) => (
                <Card 
                  key={step.step}
                  className={`relative text-center border-primary/20 hover:border-primary/40 transition-all duration-500 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${600 + index * 200}ms` }}
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-4 relative">
                      <span className="text-2xl font-bold text-primary-foreground">{step.step}</span>
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <Badge variant="outline">{step.duration}</Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{step.description}</CardDescription>
                    <div className="space-y-1">
                      {step.activities.map((activity) => (
                        <div key={activity} className="text-xs text-muted-foreground">
                          • {activity}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Consulting Packages */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Pacotes de Consultoria
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Escolha o nível de acompanhamento ideal para suas necessidades.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {consultingPackages.map((pkg, index) => (
                <Card 
                  key={pkg.name}
                  className={`relative overflow-hidden ${pkg.popular ? 'border-primary ring-2 ring-primary/20' : 'border-primary/20'} hover:border-primary/40 transition-all duration-500 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${800 + index * 200}ms` }}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        Mais Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <div className="text-4xl font-bold text-primary mb-2">{pkg.price}</div>
                    <Badge variant="secondary" className="mb-2">{pkg.duration}</Badge>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">Inclui:</h4>
                        <ul className="space-y-2">
                          {pkg.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Entregáveis:</h4>
                        <ul className="space-y-2">
                          {pkg.deliverables.map((deliverable) => (
                            <li key={deliverable} className="flex items-center gap-3">
                              <FileText className="w-4 h-4 text-accent flex-shrink-0" />
                              <span className="text-sm">{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <Button 
                      className={`w-full mt-6 ${pkg.popular ? 'btn-hero' : ''}`}
                      variant={pkg.popular ? 'default' : 'outline'}
                      onClick={() => window.location.href = '/contato'}
                    >
                      Agendar Conversa
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Cases de Transformação
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Veja como nossa consultoria gerou resultados reais para empresas.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {caseStudies.map((caseStudy, index) => (
                <Card 
                  key={caseStudy.company}
                  className={`border-primary/20 hover:border-primary/40 transition-all duration-500 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${1000 + index * 200}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">{caseStudy.company}</Badge>
                      <Badge variant="outline">{caseStudy.timeline}</Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">Desafio</CardTitle>
                    <CardDescription className="text-base mb-4">{caseStudy.challenge}</CardDescription>
                    <CardTitle className="text-xl mb-2">Solução</CardTitle>
                    <CardDescription className="text-base">{caseStudy.solution}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(caseStudy.results).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-primary">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Tecnologias:</h4>
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
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
                O Que Dizem Nossos Clientes
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Depoimentos de líderes que transformaram suas operações com nossa consultoria.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card 
                  key={testimonial.name}
                  className={`border-primary/20 hover:border-primary/40 transition-all duration-500 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${1200 + index * 200}ms` }}
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
                    <Badge variant="outline" className="mb-4">{testimonial.project}</Badge>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-muted-foreground italic mb-4">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm">Resultados:</h4>
                      {testimonial.results.map((result) => (
                        <div key={result} className="text-sm text-primary">• {result}</div>
                      ))}
                    </div>
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
                Pronto para Transformar Sua Operação?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vamos conversar sobre seus desafios e criar uma estratégia personalizada 
                para acelerar seu crescimento tecnológico. Primeira consulta gratuita.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="btn-hero group"
                  onClick={() => window.location.href = '/contato'}
                >
                  <span>Agendar Consulta Gratuita</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open('https://wa.me/5511999999999', '_blank', 'noopener,noreferrer')}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  <span>Falar no WhatsApp</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Consultoria;