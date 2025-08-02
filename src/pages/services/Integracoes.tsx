import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Link2, 
  Database, 
  Cloud, 
  Shield, 
  Zap, 
  Code2,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Copy,
  ExternalLink,
  Activity,
  Clock,
  TrendingUp,
  Server,
  Globe,
  Layers,
  GitBranch,
  Webhook,
  Settings,
  Monitor,
  BarChart3,
  Users,
  CreditCard,
  Mail,
  ShoppingCart,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Integracoes: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCode, setActiveCode] = useState('rest');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const integrationTypes = [
    {
      icon: Link2,
      title: 'APIs REST & GraphQL',
      description: 'Conecte sistemas através de APIs modernas e eficientes',
      features: ['Autenticação segura', 'Rate limiting', 'Documentação completa', 'Monitoramento em tempo real'],
      gradient: 'from-blue-500/20 to-primary/20',
      metrics: {
        uptime: '99.9%',
        latency: '<100ms',
        throughput: '10k req/min'
      }
    },
    {
      icon: Database,
      title: 'Sincronização de Dados',
      description: 'Mantenha seus sistemas sempre atualizados com sincronização bidirecional',
      features: ['Sync em tempo real', 'Conflict resolution', 'Backup automático', 'Rollback seguro'],
      gradient: 'from-primary/20 to-accent/20',
      metrics: {
        accuracy: '99.99%',
        speed: 'Real-time',
        reliability: '99.95%'
      }
    },
    {
      icon: Webhook,
      title: 'Webhooks & Events',
      description: 'Receba notificações instantâneas quando eventos importantes acontecem',
      features: ['Event streaming', 'Retry automático', 'Payload customizado', 'Logs detalhados'],
      gradient: 'from-accent/20 to-primary-glow/20',
      metrics: {
        delivery: '99.9%',
        latency: '<50ms',
        events: '1M+/day'
      }
    },
    {
      icon: Cloud,
      title: 'Integrações Cloud',
      description: 'Conecte com AWS, Google Cloud, Azure e outros provedores',
      features: ['Multi-cloud', 'Auto-scaling', 'Load balancing', 'Disaster recovery'],
      gradient: 'from-primary-glow/20 to-blue-500/20',
      metrics: {
        availability: '99.99%',
        scalability: 'Auto',
        security: 'Enterprise'
      }
    }
  ];

  const codeExamples = {
    rest: {
      title: 'API REST Integration',
      language: 'javascript',
      code: `// Exemplo de integração com API REST
const apiClient = {
  baseURL: 'https://api.exemplo.com/v1',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },

  async get(endpoint) {
    const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
      method: 'GET',
      headers: this.headers
    });
    return response.json();
  },

  async post(endpoint, data) {
    const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

// Uso da API
const users = await apiClient.get('/users');
const newUser = await apiClient.post('/users', {
  name: 'João Silva',
  email: 'joao@exemplo.com'
});`
    },
    webhook: {
      title: 'Webhook Handler',
      language: 'javascript',
      code: `// Exemplo de handler para webhooks
const express = require('express');
const crypto = require('crypto');
const app = express();

// Middleware para validar assinatura
const validateSignature = (req, res, next) => {
  const signature = req.headers['x-webhook-signature'];
  const payload = JSON.stringify(req.body);
  const secret = process.env.WEBHOOK_SECRET;
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  if (signature === expectedSignature) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

// Endpoint para receber webhooks
app.post('/webhook', validateSignature, (req, res) => {
  const { event, data } = req.body;
  
  switch(event) {
    case 'user.created':
      handleUserCreated(data);
      break;
    case 'payment.completed':
      handlePaymentCompleted(data);
      break;
    default:
      console.log('Unknown event:', event);
  }
  
  res.status(200).send('OK');
});`
    },
    graphql: {
      title: 'GraphQL Integration',
      language: 'javascript',
      code: `// Exemplo de integração GraphQL
const { GraphQLClient } = require('graphql-request');

const client = new GraphQLClient('https://api.exemplo.com/graphql', {
  headers: {
    Authorization: 'Bearer YOUR_TOKEN',
  },
});

// Query para buscar dados
const getUsersQuery = \`
  query GetUsers($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      id
      name
      email
      profile {
        avatar
        bio
      }
      posts {
        title
        content
        createdAt
      }
    }
  }
\`;

// Mutation para criar dados
const createUserMutation = \`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      email
      createdAt
    }
  }
\`;

// Executar operações
const users = await client.request(getUsersQuery, { limit: 10, offset: 0 });
const newUser = await client.request(createUserMutation, {
  input: { name: 'Maria', email: 'maria@exemplo.com' }
});`
    }
  };

  const platforms = [
    { name: 'Stripe', icon: CreditCard, category: 'Pagamentos', description: 'Processamento de pagamentos' },
    { name: 'SendGrid', icon: Mail, category: 'Email', description: 'Envio de emails transacionais' },
    { name: 'Shopify', icon: ShoppingCart, category: 'E-commerce', description: 'Plataforma de vendas online' },
    { name: 'Slack', icon: MessageSquare, category: 'Comunicação', description: 'Notificações e chat' },
    { name: 'HubSpot', icon: Users, category: 'CRM', description: 'Gestão de relacionamento' },
    { name: 'Google Analytics', icon: BarChart3, category: 'Analytics', description: 'Análise de dados' },
    { name: 'AWS', icon: Cloud, category: 'Cloud', description: 'Serviços em nuvem' },
    { name: 'PostgreSQL', icon: Database, category: 'Database', description: 'Banco de dados relacional' }
  ];

  const architectureDiagram = [
    { name: 'Frontend App', position: 'top-left', connections: ['API Gateway'] },
    { name: 'API Gateway', position: 'top-center', connections: ['Auth Service', 'Business Logic'] },
    { name: 'Mobile App', position: 'top-right', connections: ['API Gateway'] },
    { name: 'Auth Service', position: 'middle-left', connections: ['Database'] },
    { name: 'Business Logic', position: 'middle-center', connections: ['Database', 'External APIs'] },
    { name: 'External APIs', position: 'middle-right', connections: ['Third Party'] },
    { name: 'Database', position: 'bottom-left', connections: [] },
    { name: 'Message Queue', position: 'bottom-center', connections: ['Business Logic'] },
    { name: 'Third Party', position: 'bottom-right', connections: [] }
  ];

  const caseStudies = [
    {
      company: 'FinTech Startup',
      challenge: 'Integrar múltiplos provedores de pagamento',
      solution: 'API unificada com fallback automático',
      results: {
        uptime: '99.99%',
        latency: '45ms',
        cost: '-30%'
      },
      testimonial: 'A integração reduziu nossa complexidade e aumentou a confiabilidade dos pagamentos.',
      author: 'CTO, FinTech Startup'
    },
    {
      company: 'E-commerce Enterprise',
      challenge: 'Sincronizar estoque entre 5 sistemas',
      solution: 'Event-driven architecture com webhooks',
      results: {
        accuracy: '99.9%',
        speed: 'Real-time',
        errors: '-95%'
      },
      testimonial: 'Eliminamos discrepâncias de estoque e melhoramos a experiência do cliente.',
      author: 'Head of Technology'
    }
  ];

  const pricingPlans = [
    {
      name: 'Integração Simples',
      price: 'R$ 3.500',
      description: 'Para conectar 2-3 sistemas',
      features: [
        'Até 3 integrações',
        'API REST ou GraphQL',
        'Documentação técnica',
        'Testes automatizados',
        'Suporte por 30 dias'
      ],
      popular: false
    },
    {
      name: 'Integração Avançada',
      price: 'R$ 8.500',
      description: 'Para arquiteturas complexas',
      features: [
        'Até 8 integrações',
        'Webhooks e eventos',
        'Monitoramento em tempo real',
        'Error handling avançado',
        'Load balancing',
        'Suporte por 90 dias'
      ],
      popular: true
    },
    {
      name: 'Integração Enterprise',
      price: 'R$ 18.000',
      description: 'Para grandes corporações',
      features: [
        'Integrações ilimitadas',
        'Arquitetura customizada',
        'High availability (99.99%)',
        'Disaster recovery',
        'Consultoria arquitetural',
        'Suporte 24/7'
      ],
      popular: false
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Helmet>
        <title>Integrações de Sistemas e APIs | Conecte Suas Ferramentas</title>
        <meta 
          name="description" 
          content="Integrações de sistemas, APIs REST/GraphQL, webhooks e sincronização de dados. Conecte suas ferramentas e automatize fluxos de trabalho." 
        />
        <meta 
          name="keywords" 
          content="integração de sistemas, API REST, GraphQL, webhooks, sincronização de dados, integração de software" 
        />
        <link rel="canonical" href="https://seudominio.com/integracoes" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Integrações de Sistemas | Conecte Suas Ferramentas" />
        <meta property="og:description" content="Conecte sistemas diferentes através de integrações robustas e APIs modernas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seudominio.com/integracoes" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Integrações de Sistemas",
            "description": "Integrações de sistemas e desenvolvimento de APIs",
            "provider": {
              "@type": "Person",
              "name": "Seu Nome"
            },
            "offers": {
              "@type": "Offer",
              "priceRange": "R$ 3.500 - R$ 18.000"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary-glow/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
                <Badge className="mb-4">Integrações de Sistemas</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gradient mb-6">
                  Conecte Tudo,
                  <span className="block">Simplifique Tudo</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Integrações robustas que conectam seus sistemas, automatizam fluxos de trabalho 
                  e eliminam silos de dados. APIs modernas, webhooks inteligentes e sincronização em tempo real.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="btn-hero group"
                    onClick={() => window.location.href = '/portfolio'}
                  >
                    <span>Ver Arquiteturas</span>
                    <Layers className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="group"
                    onClick={() => window.location.href = '/blog'}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    <span>Exemplos de Código</span>
                  </Button>
                </div>
              </div>
              
              <div className={`relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
                <div className="relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 backdrop-blur-sm border border-primary/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 flex flex-col items-center justify-center">
                      <Link2 className="w-8 h-8 text-primary mb-2" />
                      <span className="text-sm font-medium">APIs</span>
                    </div>
                    <div className="bg-gradient-to-br from-accent/10 to-primary-glow/10 rounded-xl p-4 flex flex-col items-center justify-center">
                      <Webhook className="w-8 h-8 text-accent mb-2" />
                      <span className="text-sm font-medium">Webhooks</span>
                    </div>
                    <div className="bg-gradient-to-br from-primary-glow/10 to-primary/10 rounded-xl p-4 flex flex-col items-center justify-center">
                      <Database className="w-8 h-8 text-primary-glow mb-2" />
                      <span className="text-sm font-medium">Sync</span>
                    </div>
                    <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-4 flex flex-col items-center justify-center">
                      <Cloud className="w-8 h-8 text-accent mb-2" />
                      <span className="text-sm font-medium">Cloud</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Types */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Tipos de Integração
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Soluções completas para conectar sistemas, sincronizar dados e automatizar processos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {integrationTypes.map((integration, index) => (
                <Card 
                  key={integration.title}
                  className={`group relative overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-500 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${integration.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <CardHeader className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <integration.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{integration.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-base mb-4">{integration.description}</CardDescription>
                    
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {Object.entries(integration.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-primary">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <ul className="space-y-2">
                      {integration.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Exemplos de Implementação
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Veja como implementamos integrações robustas e escaláveis.
              </p>
            </div>

            <Card className="border-primary/20">
              <CardHeader>
                <Tabs value={activeCode} onValueChange={setActiveCode} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="rest">REST API</TabsTrigger>
                    <TabsTrigger value="webhook">Webhooks</TabsTrigger>
                    <TabsTrigger value="graphql">GraphQL</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <Tabs value={activeCode} className="w-full">
                  {Object.entries(codeExamples).map(([key, example]) => (
                    <TabsContent key={key} value={key}>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">{example.title}</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(example.code)}
                            className="gap-2"
                          >
                            <Copy className="w-4 h-4" />
                            Copiar
                          </Button>
                        </div>
                        <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
                          <pre className="text-sm text-slate-100">
                            <code>{example.code}</code>
                          </pre>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Platform Integrations */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Plataformas Suportadas
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Integramos com as principais plataformas e serviços do mercado.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platforms.map((platform, index) => (
                <Card 
                  key={platform.name}
                  className={`group text-center border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-elegant ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <CardContent className="pt-6">
                    <platform.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-lg mb-1">{platform.name}</h3>
                    <Badge variant="secondary" className="mb-2">{platform.category}</Badge>
                    <p className="text-sm text-muted-foreground">{platform.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* System Architecture */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Arquitetura de Sistemas
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Projetamos arquiteturas escaláveis e resilientes para suas integrações.
              </p>
            </div>

            <Card className="border-primary/20 p-8">
              <div className="relative h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Layers className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Arquitetura Microserviços</h3>
                  <p className="text-muted-foreground max-w-md">
                    Sistemas distribuídos com alta disponibilidade, escalabilidade automática 
                    e tolerância a falhas.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Cases de Sucesso
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Veja como nossas integrações transformaram operações complexas.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {caseStudies.map((caseStudy, index) => (
                <Card 
                  key={caseStudy.company}
                  className={`border-primary/20 hover:border-primary/40 transition-all duration-500 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${800 + index * 200}ms` }}
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
                      {Object.entries(caseStudy.results).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-primary">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
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
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Planos de Integração
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Escolha o plano ideal para o nível de complexidade das suas integrações.
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

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Pronto para Conectar Seus Sistemas?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vamos analisar sua arquitetura atual e criar integrações que realmente funcionam. 
                Consulta técnica gratuita para discutir seu projeto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="btn-hero group"
                  onClick={() => window.location.href = '/contato'}
                >
                  <span>Consulta Técnica Gratuita</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.location.href = '/blog'}
                >
                  <span>Ver Documentação</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Integracoes;