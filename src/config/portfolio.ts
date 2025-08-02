/**
 * Portfolio Configuration - Configurações de projetos e portfolio
 * Dados centralizados de todos os projetos, tecnologias e experiências
 */

import { TECH_STACK } from './app';

// === CATEGORIAS DE PROJETOS ===
export const PROJECT_CATEGORIES = {
  web: {
    id: 'web',
    name: 'Desenvolvimento Web',
    description: 'Aplicações web modernas e responsivas',
    icon: 'Globe',
    color: 'blue',
    priority: 1,
  },
  api: {
    id: 'api',
    name: 'APIs & Integrações',
    description: 'APIs robustas e integrações de sistemas',
    icon: 'Zap',
    color: 'purple',
    priority: 2,
  },
  automation: {
    id: 'automation',
    name: 'Automações',
    description: 'Automação de processos e workflows',
    icon: 'Bot',
    color: 'green',
    priority: 3,
  },
  mobile: {
    id: 'mobile',
    name: 'Mobile',
    description: 'Aplicações móveis nativas e híbridas',
    icon: 'Smartphone',
    color: 'orange',
    priority: 4,
  },
  desktop: {
    id: 'desktop',
    name: 'Desktop',
    description: 'Aplicações desktop multiplataforma',
    icon: 'Monitor',
    color: 'gray',
    priority: 5,
  },
} as const;

// === TECNOLOGIAS COM DETALHES ===
export const TECHNOLOGIES = {
  // Frontend
  react: {
    name: 'React',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#61DAFB',
    level: 'expert',
    experience: '4+ anos',
    description: 'Biblioteca para construção de interfaces de usuário',
    projects: 15,
  },
  nextjs: {
    name: 'Next.js',
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    color: '#000000',
    level: 'expert',
    experience: '3+ anos',
    description: 'Framework React para produção',
    projects: 12,
  },
  typescript: {
    name: 'TypeScript',
    category: 'language',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: '#3178C6',
    level: 'expert',
    experience: '3+ anos',
    description: 'JavaScript com tipagem estática',
    projects: 20,
  },
  javascript: {
    name: 'JavaScript',
    category: 'language',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    color: '#F7DF1E',
    level: 'expert',
    experience: '5+ anos',
    description: 'Linguagem de programação versátil',
    projects: 25,
  },
  tailwindcss: {
    name: 'Tailwind CSS',
    category: 'styling',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    color: '#06B6D4',
    level: 'expert',
    experience: '2+ anos',
    description: 'Framework CSS utility-first',
    projects: 18,
  },
  
  // Backend
  nodejs: {
    name: 'Node.js',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#339933',
    level: 'expert',
    experience: '4+ anos',
    description: 'Runtime JavaScript para servidor',
    projects: 20,
  },
  python: {
    name: 'Python',
    category: 'language',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: '#3776AB',
    level: 'advanced',
    experience: '3+ anos',
    description: 'Linguagem versátil para desenvolvimento',
    projects: 10,
  },
  express: {
    name: 'Express.js',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    color: '#000000',
    level: 'expert',
    experience: '4+ anos',
    description: 'Framework web para Node.js',
    projects: 15,
  },
  fastapi: {
    name: 'FastAPI',
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    color: '#009688',
    level: 'advanced',
    experience: '2+ anos',
    description: 'Framework Python moderno e rápido',
    projects: 8,
  },
  
  // Database
  postgresql: {
    name: 'PostgreSQL',
    category: 'database',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    color: '#336791',
    level: 'advanced',
    experience: '3+ anos',
    description: 'Banco de dados relacional avançado',
    projects: 12,
  },
  mongodb: {
    name: 'MongoDB',
    category: 'database',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    color: '#47A248',
    level: 'intermediate',
    experience: '2+ anos',
    description: 'Banco de dados NoSQL',
    projects: 8,
  },
  supabase: {
    name: 'Supabase',
    category: 'database',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
    color: '#3ECF8E',
    level: 'advanced',
    experience: '2+ anos',
    description: 'Backend-as-a-Service open source',
    projects: 10,
  },
  
  // Tools & Others
  git: {
    name: 'Git',
    category: 'tool',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    color: '#F05032',
    level: 'expert',
    experience: '5+ anos',
    description: 'Sistema de controle de versão',
    projects: 30,
  },
  docker: {
    name: 'Docker',
    category: 'tool',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    color: '#2496ED',
    level: 'intermediate',
    experience: '2+ anos',
    description: 'Plataforma de containerização',
    projects: 6,
  },
  aws: {
    name: 'AWS',
    category: 'cloud',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
    color: '#FF9900',
    level: 'intermediate',
    experience: '2+ anos',
    description: 'Serviços de nuvem da Amazon',
    projects: 5,
  },
} as const;

// === PROJETOS DO PORTFOLIO ===
export const PORTFOLIO_PROJECTS = [
  {
    id: 'crm-system',
    title: 'Sistema CRM Inteligente',
    description: 'Plataforma completa de gestão de relacionamento com clientes, incluindo automações de email e relatórios avançados.',
    longDescription: 'Sistema CRM desenvolvido para pequenas e médias empresas, com foco em automação de processos de vendas e marketing. Inclui dashboard interativo, gestão de leads, automação de email marketing, relatórios avançados e integração com múltiplas APIs.',
    image: 'https://via.placeholder.com/400x192/1a1a1a/ffffff?text=CRM+System',
    images: [
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=CRM+Dashboard',
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=CRM+Leads',
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=CRM+Reports',
    ],
    technologies: ['react', 'nodejs', 'postgresql', 'typescript', 'tailwindcss'],
    category: 'web',
    status: 'completed',
    featured: true,
    demoUrl: 'https://crm-demo.carlos-salgado.dev',
    githubUrl: 'https://github.com/carlos7045/crm-system',
    liveUrl: 'https://crm.carlos-salgado.dev',
    startDate: '2023-06-01',
    endDate: '2023-09-15',
    duration: '3.5 meses',
    teamSize: 1,
    role: 'Full Stack Developer',
    client: 'Empresa de Consultoria',
    budget: 'R$ 15.000 - R$ 25.000',
    features: [
      'Dashboard interativo com métricas em tempo real',
      'Gestão completa de leads e oportunidades',
      'Automação de email marketing',
      'Relatórios avançados e analytics',
      'Integração com WhatsApp e Telegram',
      'Sistema de notificações push',
      'API REST completa',
      'Autenticação e autorização',
    ],
    challenges: [
      'Integração com múltiplas APIs externas',
      'Performance com grandes volumes de dados',
      'Sistema de notificações em tempo real',
      'Interface responsiva complexa',
    ],
    learnings: [
      'Arquitetura de microserviços',
      'Otimização de queries complexas',
      'WebSockets para tempo real',
      'Testes automatizados E2E',
    ],
    metrics: {
      users: '500+',
      performance: '95% Lighthouse',
      uptime: '99.9%',
      loadTime: '< 2s',
    },
  },
  {
    id: 'api-hub',
    title: 'Hub de Integrações API',
    description: 'Sistema centralizado para conectar múltiplas APIs e serviços, facilitando a sincronização de dados entre plataformas.',
    longDescription: 'Plataforma de integração que permite conectar diferentes sistemas e APIs de forma simples e segura. Inclui transformação de dados, monitoramento de integrações, logs detalhados e sistema de retry automático.',
    image: 'https://via.placeholder.com/400x192/1a1a1a/ffffff?text=API+Hub',
    images: [
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=API+Dashboard',
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=API+Integrations',
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=API+Monitoring',
    ],
    technologies: ['nextjs', 'typescript', 'nodejs', 'postgresql', 'docker'],
    category: 'api',
    status: 'completed',
    featured: true,
    demoUrl: 'https://api-hub-demo.carlos-salgado.dev',
    githubUrl: 'https://github.com/carlos7045/api-hub',
    liveUrl: 'https://api-hub.carlos-salgado.dev',
    startDate: '2023-10-01',
    endDate: '2024-01-15',
    duration: '3.5 meses',
    teamSize: 1,
    role: 'Full Stack Developer',
    client: 'Startup de Tecnologia',
    budget: 'R$ 20.000 - R$ 30.000',
    features: [
      'Conectores para 20+ APIs populares',
      'Transformação de dados visual',
      'Monitoramento em tempo real',
      'Sistema de logs avançado',
      'Retry automático com backoff',
      'Webhooks bidirecionais',
      'Rate limiting inteligente',
      'Documentação automática',
    ],
    challenges: [
      'Gerenciamento de rate limits diferentes',
      'Transformação de dados complexos',
      'Monitoramento de múltiplas conexões',
      'Sistema de retry inteligente',
    ],
    learnings: [
      'Padrões de integração de APIs',
      'Sistemas de monitoramento',
      'Arquitetura orientada a eventos',
      'Processamento assíncrono',
    ],
    metrics: {
      integrations: '50+',
      uptime: '99.95%',
      throughput: '10k req/min',
      errorRate: '< 0.1%',
    },
  },
  {
    id: 'automation-platform',
    title: 'Automação de Processos',
    description: 'Solução SaaS para automatizar workflows empresariais, desde aprovações até geração de relatórios.',
    longDescription: 'Plataforma de automação no-code/low-code que permite criar workflows complexos sem programação. Inclui editor visual, triggers personalizados, ações condicionais e integrações com ferramentas populares.',
    image: 'https://via.placeholder.com/400x192/1a1a1a/ffffff?text=Automation',
    images: [
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Workflow+Builder',
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Automation+Dashboard',
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Process+Analytics',
    ],
    technologies: ['react', 'python', 'fastapi', 'mongodb', 'docker'],
    category: 'automation',
    status: 'completed',
    featured: true,
    demoUrl: 'https://automation-demo.carlos-salgado.dev',
    githubUrl: 'https://github.com/carlos7045/automation-platform',
    liveUrl: 'https://automation.carlos-salgado.dev',
    startDate: '2024-02-01',
    endDate: '2024-05-30',
    duration: '4 meses',
    teamSize: 2,
    role: 'Tech Lead',
    client: 'Empresa de Consultoria',
    budget: 'R$ 25.000 - R$ 40.000',
    features: [
      'Editor visual de workflows',
      'Triggers baseados em eventos',
      'Ações condicionais avançadas',
      'Integração com 30+ ferramentas',
      'Execução paralela de tarefas',
      'Monitoramento de performance',
      'Histórico de execuções',
      'Templates pré-configurados',
    ],
    challenges: [
      'Editor visual complexo',
      'Execução paralela de workflows',
      'Sistema de triggers em tempo real',
      'Escalabilidade horizontal',
    ],
    learnings: [
      'Arquitetura de sistemas distribuídos',
      'Processamento de eventos',
      'Design de interfaces complexas',
      'Otimização de performance',
    ],
    metrics: {
      workflows: '1000+',
      executions: '100k+/mês',
      users: '200+',
      satisfaction: '4.8/5',
    },
  },
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Personalizado',
    description: 'Loja virtual completa com sistema de pagamentos, gestão de estoque e painel administrativo.',
    longDescription: 'Plataforma de e-commerce completa desenvolvida do zero, com foco em performance e experiência do usuário. Inclui catálogo de produtos, carrinho de compras, múltiplos métodos de pagamento e painel administrativo completo.',
    image: 'https://via.placeholder.com/400x192/1a1a1a/ffffff?text=E-commerce',
    images: [
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Store+Frontend',
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Admin+Panel',
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Product+Catalog',
    ],
    technologies: ['nextjs', 'typescript', 'postgresql', 'tailwindcss', 'supabase'],
    category: 'web',
    status: 'completed',
    featured: false,
    demoUrl: 'https://ecommerce-demo.carlos-salgado.dev',
    githubUrl: 'https://github.com/carlos7045/ecommerce-platform',
    liveUrl: 'https://store.carlos-salgado.dev',
    startDate: '2023-03-01',
    endDate: '2023-05-15',
    duration: '2.5 meses',
    teamSize: 1,
    role: 'Full Stack Developer',
    client: 'Loja de Roupas',
    budget: 'R$ 12.000 - R$ 18.000',
    features: [
      'Catálogo de produtos responsivo',
      'Carrinho de compras persistente',
      'Múltiplos métodos de pagamento',
      'Gestão de estoque em tempo real',
      'Painel administrativo completo',
      'Sistema de cupons e promoções',
      'Relatórios de vendas',
      'Integração com correios',
    ],
    challenges: [
      'Integração com gateways de pagamento',
      'Gestão de estoque em tempo real',
      'Performance com muitos produtos',
      'SEO para produtos dinâmicos',
    ],
    learnings: [
      'Sistemas de pagamento online',
      'Otimização de SEO dinâmico',
      'Gestão de estado complexo',
      'Arquitetura de e-commerce',
    ],
    metrics: {
      products: '500+',
      orders: '1000+',
      conversion: '3.2%',
      performance: '92% Lighthouse',
    },
  },
  {
    id: 'analytics-dashboard',
    title: 'Dashboard Analytics',
    description: 'Painel interativo para visualização de dados empresariais com gráficos em tempo real e relatórios customizados.',
    longDescription: 'Dashboard avançado para análise de dados empresariais com visualizações interativas, filtros dinâmicos e relatórios personalizáveis. Conecta com múltiplas fontes de dados e oferece insights em tempo real.',
    image: 'https://via.placeholder.com/400x192/1a1a1a/ffffff?text=Analytics',
    images: [
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Analytics+Overview',
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Charts+Visualization',
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Custom+Reports',
    ],
    technologies: ['react', 'typescript', 'nodejs', 'postgresql', 'tailwindcss'],
    category: 'web',
    status: 'completed',
    featured: false,
    demoUrl: 'https://analytics-demo.carlos-salgado.dev',
    githubUrl: 'https://github.com/carlos7045/analytics-dashboard',
    liveUrl: 'https://analytics.carlos-salgado.dev',
    startDate: '2023-11-01',
    endDate: '2024-01-30',
    duration: '3 meses',
    teamSize: 1,
    role: 'Frontend Developer',
    client: 'Agência de Marketing',
    budget: 'R$ 10.000 - R$ 15.000',
    features: [
      'Visualizações interativas',
      'Filtros dinâmicos avançados',
      'Relatórios personalizáveis',
      'Exportação em múltiplos formatos',
      'Alertas automáticos',
      'Comparações temporais',
      'Drill-down de dados',
      'Compartilhamento de dashboards',
    ],
    challenges: [
      'Performance com grandes datasets',
      'Visualizações complexas',
      'Filtros dinâmicos em tempo real',
      'Responsividade de gráficos',
    ],
    learnings: [
      'Bibliotecas de visualização',
      'Otimização de queries',
      'Design de dashboards',
      'UX para dados complexos',
    ],
    metrics: {
      dataPoints: '1M+',
      users: '100+',
      reports: '500+',
      loadTime: '< 3s',
    },
  },
  {
    id: 'chatbot-platform',
    title: 'Bot de Atendimento',
    description: 'Chatbot inteligente integrado com WhatsApp e Telegram para atendimento automatizado ao cliente.',
    longDescription: 'Plataforma de chatbot com IA para atendimento ao cliente, integrada com WhatsApp Business API e Telegram. Inclui processamento de linguagem natural, fluxos conversacionais e painel de gerenciamento.',
    image: 'https://via.placeholder.com/400x192/1a1a1a/ffffff?text=ChatBot',
    images: [
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Bot+Interface',
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Flow+Builder',
      'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Analytics+Bot',
    ],
    technologies: ['nodejs', 'python', 'fastapi', 'mongodb', 'docker'],
    category: 'automation',
    status: 'completed',
    featured: false,
    demoUrl: 'https://chatbot-demo.carlos-salgado.dev',
    githubUrl: 'https://github.com/carlos7045/chatbot-platform',
    liveUrl: 'https://chatbot.carlos-salgado.dev',
    startDate: '2024-06-01',
    endDate: '2024-08-15',
    duration: '2.5 meses',
    teamSize: 1,
    role: 'Backend Developer',
    client: 'E-commerce',
    budget: 'R$ 8.000 - R$ 12.000',
    features: [
      'Processamento de linguagem natural',
      'Fluxos conversacionais visuais',
      'Integração WhatsApp Business',
      'Integração Telegram Bot API',
      'Respostas automáticas inteligentes',
      'Transferência para humanos',
      'Analytics de conversas',
      'Treinamento de IA personalizado',
    ],
    challenges: [
      'Processamento de linguagem natural',
      'Integração com APIs de mensageria',
      'Fluxos conversacionais complexos',
      'Escalabilidade de mensagens',
    ],
    learnings: [
      'APIs de mensageria',
      'Processamento de NLP',
      'Arquitetura de chatbots',
      'Machine Learning aplicado',
    ],
    metrics: {
      messages: '10k+/dia',
      accuracy: '85%',
      response: '< 2s',
      satisfaction: '4.2/5',
    },
  },
] as const;

// === SERVIÇOS OFERECIDOS ===
export const SERVICES = [
  {
    id: 'web-development',
    title: 'Desenvolvimento Web',
    icon: 'Globe',
    description: 'Aplicações web modernas e responsivas, desde landing pages até sistemas complexos como CRM e ERP.',
    longDescription: 'Desenvolvimento de aplicações web completas utilizando as tecnologias mais modernas do mercado. Foco em performance, SEO, acessibilidade e experiência do usuário.',
    features: [
      'React & Next.js',
      'Interface Responsiva',
      'Performance Otimizada',
      'SEO Friendly',
      'PWA (Progressive Web App)',
      'Testes Automatizados',
    ],
    technologies: ['react', 'nextjs', 'typescript', 'tailwindcss'],
    gradient: 'from-blue-500/20 to-primary/20',
    price: {
      min: 5000,
      max: 25000,
      currency: 'BRL',
      unit: 'projeto',
    },
    duration: {
      min: 2,
      max: 12,
      unit: 'semanas',
    },
    deliverables: [
      'Código fonte completo',
      'Documentação técnica',
      'Deploy em produção',
      'Treinamento da equipe',
      'Suporte pós-entrega',
    ],
  },
  {
    id: 'api-integration',
    title: 'APIs & Integrações',
    icon: 'Zap',
    description: 'Conectando sistemas diferentes para criar fluxos de trabalho eficientes e automatizados.',
    longDescription: 'Desenvolvimento de APIs REST e GraphQL, integrações entre sistemas e criação de webhooks para automação de processos empresariais.',
    features: [
      'REST & GraphQL APIs',
      'Webhooks',
      'Integração de Pagamentos',
      'Sincronização de Dados',
      'Documentação Automática',
      'Rate Limiting',
    ],
    technologies: ['nodejs', 'python', 'fastapi', 'postgresql'],
    gradient: 'from-primary/20 to-accent/20',
    price: {
      min: 3000,
      max: 15000,
      currency: 'BRL',
      unit: 'projeto',
    },
    duration: {
      min: 1,
      max: 8,
      unit: 'semanas',
    },
    deliverables: [
      'API completa e documentada',
      'Testes automatizados',
      'Monitoramento e logs',
      'Documentação de integração',
      'Suporte técnico',
    ],
  },
  {
    id: 'automation',
    title: 'Automação de Processos',
    icon: 'Bot',
    description: 'Automatização de processos repetitivos para aumentar produtividade e reduzir erros humanos.',
    longDescription: 'Criação de automações personalizadas usando ferramentas como n8n, Make.com e desenvolvimento de bots customizados para otimizar processos empresariais.',
    features: [
      'n8n & Make.com',
      'Workflows Personalizados',
      'Email Marketing',
      'Relatórios Automáticos',
      'Chatbots Inteligentes',
      'Integração de Sistemas',
    ],
    technologies: ['nodejs', 'python', 'mongodb', 'docker'],
    gradient: 'from-accent/20 to-primary-glow/20',
    price: {
      min: 2000,
      max: 10000,
      currency: 'BRL',
      unit: 'projeto',
    },
    duration: {
      min: 1,
      max: 6,
      unit: 'semanas',
    },
    deliverables: [
      'Automação configurada',
      'Documentação de processos',
      'Treinamento da equipe',
      'Monitoramento de execução',
      'Manutenção inicial',
    ],
  },
  {
    id: 'consulting',
    title: 'Consultoria Técnica',
    icon: 'Users',
    description: 'Consultoria estratégica para escolher as melhores tecnologias e arquiteturas para seu projeto.',
    longDescription: 'Consultoria especializada em arquitetura de software, escolha de tecnologias, code review e mentoria técnica para equipes de desenvolvimento.',
    features: [
      'Arquitetura de Software',
      'Escolha de Stack',
      'Code Review',
      'Mentoria Técnica',
      'Auditoria de Performance',
      'Planejamento de Projeto',
    ],
    technologies: ['react', 'nodejs', 'python', 'postgresql'],
    gradient: 'from-primary-glow/20 to-blue-500/20',
    price: {
      min: 150,
      max: 300,
      currency: 'BRL',
      unit: 'hora',
    },
    duration: {
      min: 1,
      max: 4,
      unit: 'semanas',
    },
    deliverables: [
      'Relatório de análise',
      'Recomendações técnicas',
      'Plano de implementação',
      'Documentação arquitetural',
      'Sessões de mentoria',
    ],
  },
] as const;

// === EXPERIÊNCIA PROFISSIONAL ===
export const WORK_EXPERIENCE = [
  {
    id: 'freelancer',
    company: 'Freelancer',
    position: 'Desenvolvedor Full Stack',
    type: 'freelance',
    startDate: '2019-01-01',
    endDate: null,
    current: true,
    location: 'Remoto',
    description: 'Desenvolvimento de soluções web personalizadas para clientes diversos, desde startups até empresas estabelecidas.',
    achievements: [
      'Mais de 50 projetos entregues com sucesso',
      'Taxa de satisfação do cliente de 98%',
      'Especialização em React, Node.js e automações',
      'Desenvolvimento de sistemas complexos como CRM e e-commerce',
    ],
    technologies: ['react', 'nodejs', 'typescript', 'python', 'postgresql'],
  },
  {
    id: 'tech-startup',
    company: 'Tech Startup',
    position: 'Desenvolvedor Frontend',
    type: 'contract',
    startDate: '2022-06-01',
    endDate: '2023-03-31',
    current: false,
    location: 'Remoto',
    description: 'Desenvolvimento de interface de usuário para plataforma SaaS de gestão empresarial.',
    achievements: [
      'Melhoria de 40% na performance da aplicação',
      'Implementação de design system completo',
      'Redução de 60% no tempo de carregamento',
      'Liderança técnica de equipe de 3 desenvolvedores',
    ],
    technologies: ['react', 'typescript', 'tailwindcss', 'nextjs'],
  },
] as const;

// === EDUCAÇÃO ===
export const EDUCATION = [
  {
    id: 'computer-science',
    institution: 'Universidade Federal do Maranhão',
    degree: 'Bacharelado em Ciência da Computação',
    field: 'Ciência da Computação',
    startDate: '2017-03-01',
    endDate: '2021-12-15',
    status: 'completed',
    location: 'São Luís, MA',
    description: 'Formação sólida em fundamentos da computação, algoritmos, estruturas de dados e engenharia de software.',
    achievements: [
      'Projeto de conclusão em Machine Learning',
      'Monitor de Programação Web',
      'Participação em projetos de extensão',
      'CRA: 8.5/10',
    ],
    relevantCourses: [
      'Algoritmos e Estruturas de Dados',
      'Engenharia de Software',
      'Banco de Dados',
      'Redes de Computadores',
      'Inteligência Artificial',
      'Desenvolvimento Web',
    ],
  },
] as const;

// === CERTIFICAÇÕES ===
export const CERTIFICATIONS = [
  {
    id: 'aws-cloud-practitioner',
    name: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    issueDate: '2023-06-15',
    expiryDate: '2026-06-15',
    credentialId: 'AWS-CCP-2023-001',
    url: 'https://aws.amazon.com/certification/',
    status: 'active',
    description: 'Certificação fundamental em serviços de nuvem AWS',
  },
  {
    id: 'react-advanced',
    name: 'React Advanced Patterns',
    issuer: 'Rocketseat',
    issueDate: '2023-03-20',
    expiryDate: null,
    credentialId: 'RS-REACT-ADV-2023',
    url: 'https://rocketseat.com.br',
    status: 'active',
    description: 'Padrões avançados de desenvolvimento React',
  },
] as const;

// === HELPERS ===
export const getProjectsByCategory = (categoryId: keyof typeof PROJECT_CATEGORIES) => {
  return PORTFOLIO_PROJECTS.filter(project => project.category === categoryId);
};

export const getFeaturedProjects = () => {
  return PORTFOLIO_PROJECTS.filter(project => project.featured);
};

export const getProjectById = (id: string) => {
  return PORTFOLIO_PROJECTS.find(project => project.id === id);
};

export const getTechnologiesByCategory = (category: string) => {
  return Object.entries(TECHNOLOGIES)
    .filter(([_, tech]) => tech.category === category)
    .map(([key, tech]) => ({ key, ...tech }));
};

export const getServiceById = (id: string) => {
  return SERVICES.find(service => service.id === id);
};

export const getCurrentExperience = () => {
  return WORK_EXPERIENCE.filter(exp => exp.current);
};

export const getCompletedEducation = () => {
  return EDUCATION.filter(edu => edu.status === 'completed');
};

export const getActiveCertifications = () => {
  return CERTIFICATIONS.filter(cert => cert.status === 'active');
};

// === TIPOS ===
export type ProjectCategory = typeof PROJECT_CATEGORIES[keyof typeof PROJECT_CATEGORIES];
export type Technology = typeof TECHNOLOGIES[keyof typeof TECHNOLOGIES];
export type PortfolioProject = typeof PORTFOLIO_PROJECTS[number];
export type Service = typeof SERVICES[number];
export type WorkExperience = typeof WORK_EXPERIENCE[number];
export type Education = typeof EDUCATION[number];
export type Certification = typeof CERTIFICATIONS[number];