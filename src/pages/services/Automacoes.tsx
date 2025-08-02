import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Zap, 
  Clock, 
  TrendingUp, 
  Users, 
  Mail, 
  Database,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Calculator,
  BarChart3,
  Workflow,
  Bot,
  Timer,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const Automacoes: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [roiData, setRoiData] = useState({
    hoursPerWeek: [20],
    hourlyRate: [50],
    automationCost: [5000]
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // ROI Calculator Logic
  const calculateROI = () => {
    const weeklyHours = roiData.hoursPerWeek[0];
    const hourlyRate = roiData.hourlyRate[0];
    const automationCost = roiData.automationCost[0];
    
    const weeklySavings = weeklyHours * hourlyRate;
    const monthlySavings = weeklySavings * 4;
    const yearlySavings = monthlySavings * 12;
    const paybackMonths = Math.ceil(automationCost / monthlySavings);
    const yearlyROI = ((yearlySavings - automationCost) / automationCost) * 100;
    
    return {
      weeklySavings,
      monthlySavings,
      yearlySavings,
      paybackMonths,
      yearlyROI
    };
  };

  const roi = calculateROI();

  const automationTypes = [
    {
      icon: Mail,
      title: 'Email Marketing',
      description: 'Campanhas automatizadas, segmentação inteligente e nutrição de leads',
      beforeAfter: {
        before: 'Manual: 8h/semana enviando emails',
        after: 'Automatizado: 30min/semana configurando'
      },
      savings: '90% menos tempo',
      gradient: 'from-blue-500/20 to-primary/20'
    },
    {
      icon: Database,
      title: 'Sincronização de Dados',
      description: 'Integração automática entre CRM, planilhas e sistemas de gestão',
      beforeAfter: {
        before: 'Manual: 5h/semana atualizando dados',
        after: 'Automatizado: Sincronização em tempo real'
      },
      savings: '95% menos erros',
      gradient: 'from-primary/20 to-accent/20'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Automáticos',
      description: 'Dashboards e relatórios gerados automaticamente com dados atualizados',
      beforeAfter: {
        before: 'Manual: 6h/semana criando relatórios',
        after: 'Automatizado: Relatórios instantâneos'
      },
      savings: '85% mais agilidade',
      gradient: 'from-accent/20 to-primary-glow/20'
    },
    {
      icon: Users,
      title: 'Gestão de Leads',
      description: 'Qualificação, distribuição e follow-up automático de leads',
      beforeAfter: {
        before: 'Manual: 10h/semana processando leads',
        after: 'Automatizado: Qualificação instantânea'
      },
      savings: '300% mais conversões',
      gradient: 'from-primary-glow/20 to-blue-500/20'
    }
  ];

  const workflowSteps = [
    {
      step: 1,
      title: 'Análise de Processos',
      description: 'Identificamos gargalos e oportunidades de automação',
      icon: BarChart3,
      duration: '1-2 semanas'
    },
    {
      step: 2,
      title: 'Design da Automação',
      description: 'Criamos fluxos otimizados e integrações necessárias',
      icon: Workflow,
      duration: '2-3 semanas'
    },
    {
      step: 3,
      title: 'Implementação',
      description: 'Desenvolvemos e testamos as automações',
      icon: Bot,
      duration: '3-4 semanas'
    },
    {
      step: 4,
      title: 'Monitoramento',
      description: 'Acompanhamos resultados e otimizamos continuamente',
      icon: TrendingUp,
      duration: 'Contínuo'
    }
  ];

  const integrations = [
    { name: 'Zapier', logo: '⚡', description: 'Conecta 5000+ aplicações' },
    { name: 'Make.com', logo: '🔧', description: 'Automações visuais complexas' },
    { name: 'Google Workspace', logo: '📊', description: 'Planilhas, Drive, Gmail' },
    { name: 'CRM Systems', logo: '👥', description: 'HubSpot, Pipedrive, RD' },
    { name: 'E-commerce', logo: '🛒', description: 'Shopify, WooCommerce' },
    { name: 'Social Media', logo: '📱', description: 'Instagram, Facebook, LinkedIn' }
  ];

  const caseStudies = [
    {
      company: 'E-commerce Fashion',
      challenge: 'Gestão manual de estoque e pedidos',
      solution: 'Automação completa do processo de vendas',
      results: {
        timeSaved: '25h/semana',
        errorReduction: '90%',
        salesIncrease: '150%'
      },
      testimonial: 'A automação transformou nossa operação. Conseguimos triplicar as vendas sem aumentar a equipe.',
      author: 'Carolina Santos, CEO'
    },
    {
      company: 'Consultoria Jurídica',
      challenge: 'Follow-up manual de clientes potenciais',
      solution: 'Sistema de nutrição de leads automatizado',
      results: {
        timeSaved: '15h/semana',
        conversionIncrease: '200%',
        leadQuality: '80% melhor'
      },
      testimonial: 'Nossa taxa de conversão dobrou e a qualidade dos leads melhorou drasticamente.',
      author: 'Dr. Roberto Lima, Sócio'
    }
  ];

  const pricingPlans = [
    {
      name: 'Automação Básica',
      price: 'R$ 2.500',
      description: 'Ideal para pequenos negócios',
      features: [
        'Até 3 automações simples',
        'Integração com 2 plataformas',
        'Setup e configuração',
        'Documentação completa',
        'Suporte por 30 dias'
      ],
      popular: false
    },
    {
      name: 'Automação Avançada',
      price: 'R$ 7.500',
      description: 'Para empresas em crescimento',
      features: [
        'Até 10 automações complexas',
        'Integração com 5+ plataformas',
        'Workflows personalizados',
        'Dashboard de monitoramento',
        'Treinamento da equipe',
        'Suporte por 90 dias'
      ],
      popular: true
    },
    {
      name: 'Automação Enterprise',
      price: 'R$ 15.000',
      description: 'Solução completa para grandes empresas',
      features: [
        'Automações ilimitadas',
        'Integrações customizadas',
        'API própria se necessário',
        'Relatórios avançados',
        'Consultoria estratégica',
        'Suporte prioritário 24/7'
      ],
      popular: false
    }
  ];

  return (
    <>
      <Helmet>
        <title>Automação de Processos | Aumente Produtividade e Reduza Custos</title>
        <meta 
          name="description" 
          content="Automação de processos empresariais com Zapier, Make.com e integrações customizadas. Reduza custos, elimine erros e aumente a produtividade." 
        />
        <meta 
          name="keywords" 
          content="automação de processos, zapier, make.com, integração de sistemas, workflow automation, produtividade empresarial" 
        />
        <link rel="canonical" href="https://seudominio.com/automacoes" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Automação de Processos | Transforme Sua Operação" />
        <meta property="og:description" content="Automatize processos repetitivos e foque no que realmente importa para seu negócio." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seudominio.com/automacoes" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Automação de Processos",
            "description": "Automação de processos empresariais e integrações de sistemas",
            "provider": {
              "@type": "Person",
              "name": "Seu Nome"
            },
            "offers": {
              "@type": "Offer",
              "priceRange": "R$ 2.500 - R$ 15.000"
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
                <Badge className="mb-4">Automação de Processos</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gradient mb-6">
                  Automatize e
                  <span className="block">Multiplique Resultados</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Elimine tarefas repetitivas, reduza erros humanos e libere sua equipe para focar 
                  no que realmente gera valor. Automações inteligentes que transformam sua operação.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="btn-hero group"
                    onClick={() => window.location.href = '/contato'}
                  >
                    <span>Calcular ROI</span>
                    <Calculator className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
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
                    <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-4 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-accent" />
                    </div>
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 flex items-center justify-center">
                      <Bot className="w-8 h-8 text-primary" />
                    </div>
                    <div className="bg-gradient-to-br from-primary-glow/10 to-primary/10 rounded-xl p-4 flex items-center justify-center">
                      <Workflow className="w-8 h-8 text-primary-glow" />
                    </div>
                    <div className="bg-gradient-to-br from-accent/10 to-primary-glow/10 rounded-xl p-4 flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Calculadora de ROI
              </h2>
              <p className="text-xl text-muted-foreground">
                Descubra quanto você pode economizar com automação
              </p>
            </div>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-primary" />
                  Configure seus dados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <Label>Horas gastas por semana em tarefas repetitivas</Label>
                    <div className="px-4">
                      <Slider
                        value={roiData.hoursPerWeek}
                        onValueChange={(value) => setRoiData({...roiData, hoursPerWeek: value})}
                        max={40}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>1h</span>
                        <span className="font-semibold text-primary">{roiData.hoursPerWeek[0]}h</span>
                        <span>40h</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Valor da hora de trabalho (R$)</Label>
                    <div className="px-4">
                      <Slider
                        value={roiData.hourlyRate}
                        onValueChange={(value) => setRoiData({...roiData, hourlyRate: value})}
                        max={200}
                        min={20}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>R$ 20</span>
                        <span className="font-semibold text-primary">R$ {roiData.hourlyRate[0]}</span>
                        <span>R$ 200</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Investimento em automação (R$)</Label>
                    <div className="px-4">
                      <Slider
                        value={roiData.automationCost}
                        onValueChange={(value) => setRoiData({...roiData, automationCost: value})}
                        max={20000}
                        min={1000}
                        step={500}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>R$ 1k</span>
                        <span className="font-semibold text-primary">R$ {roiData.automationCost[0].toLocaleString()}</span>
                        <span>R$ 20k</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-6 pt-8 border-t border-border">
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <DollarSign className="w-8 h-8 text-accent mx-auto mb-2" />
                      <div className="text-2xl font-bold text-accent">R$ {roi.monthlySavings.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Economia mensal</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <Timer className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary">{roi.paybackMonths}</div>
                      <div className="text-sm text-muted-foreground">Meses para ROI</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <TrendingUp className="w-8 h-8 text-primary-glow mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary-glow">{roi.yearlyROI.toFixed(0)}%</div>
                      <div className="text-sm text-muted-foreground">ROI anual</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <BarChart3 className="w-8 h-8 text-accent mx-auto mb-2" />
                      <div className="text-2xl font-bold text-accent">R$ {roi.yearlySavings.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Economia anual</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Automation Types */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Tipos de Automação
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Veja como diferentes automações podem transformar seus processos e gerar resultados reais.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {automationTypes.map((automation, index) => (
                <Card 
                  key={automation.title}
                  className={`group relative overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-500 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${automation.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <CardHeader className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <automation.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{automation.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1">{automation.savings}</Badge>
                      </div>
                    </div>
                    <CardDescription className="text-base">{automation.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-red-400">Antes</div>
                          <div className="text-sm text-muted-foreground">{automation.beforeAfter.before}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-green-400">Depois</div>
                          <div className="text-sm text-muted-foreground">{automation.beforeAfter.after}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Process */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Como Funciona Nosso Processo
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Metodologia comprovada para implementar automações que geram resultados reais.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {workflowSteps.map((step, index) => (
                <Card 
                  key={step.step}
                  className={`relative text-center border-primary/20 hover:border-primary/40 transition-all duration-500 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${600 + index * 200}ms` }}
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-4 relative">
                      <step.icon className="w-8 h-8 text-primary-foreground" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-sm">
                        {step.step}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <Badge variant="outline">{step.duration}</Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{step.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Integrações Disponíveis
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Conectamos suas ferramentas favoritas para criar fluxos de trabalho perfeitos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration, index) => (
                <Card 
                  key={integration.name}
                  className={`group text-center border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-elegant ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-4">{integration.logo}</div>
                    <h3 className="font-semibold text-lg mb-2">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Cases de Sucesso
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Veja como nossas automações transformaram negócios reais.
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
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{caseStudy.company}</Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">Desafio</CardTitle>
                    <CardDescription className="text-base mb-4">{caseStudy.challenge}</CardDescription>
                    <CardTitle className="text-xl mb-2">Solução</CardTitle>
                    <CardDescription className="text-base">{caseStudy.solution}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{caseStudy.results.timeSaved}</div>
                        <div className="text-xs text-muted-foreground">Tempo economizado</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">{caseStudy.results.errorReduction || caseStudy.results.conversionIncrease}</div>
                        <div className="text-xs text-muted-foreground">
                          {caseStudy.results.errorReduction ? 'Menos erros' : 'Mais conversões'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-glow">
                          {caseStudy.results.salesIncrease || caseStudy.results.leadQuality}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {caseStudy.results.salesIncrease ? 'Mais vendas' : 'Qualidade leads'}
                        </div>
                      </div>
                    </div>
                    <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground mb-4">
                      "{caseStudy.testimonial}"
                    </blockquote>
                    <div className="text-sm font-medium">— {caseStudy.author}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Planos de Automação
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Escolha o plano ideal para o nível de automação que sua empresa precisa.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <Card 
                  key={plan.name}
                  className={`relative overflow-hidden ${plan.popular ? 'border-primary ring-2 ring-primary/20' : 'border-primary/20'} hover:border-primary/40 transition-all duration-500 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${1200 + index * 200}ms` }}
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

        {/* CTA Section */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Pronto para Automatizar Seus Processos?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vamos analisar seus processos atuais e criar automações que vão transformar 
                sua operação e multiplicar seus resultados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="btn-hero group"
                  onClick={() => window.location.href = '/contato'}
                >
                  <span>Análise Gratuita</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.location.href = '/contato'}
                >
                  <span>Agendar Demonstração</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Automacoes;