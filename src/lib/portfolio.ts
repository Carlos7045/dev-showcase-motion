import { Project, ProjectCategory, Technology, PortfolioMetadata } from '@/types/portfolio';

// Mock data para categorias
const mockCategories: ProjectCategory[] = [
  {
    id: '1',
    name: 'Aplicações Web',
    slug: 'web-apps',
    description: 'Aplicações web completas e sistemas SaaS',
    color: '#3B82F6',
    icon: 'Globe'
  },
  {
    id: '2',
    name: 'E-commerce',
    slug: 'ecommerce',
    description: 'Lojas virtuais e plataformas de vendas',
    color: '#10B981',
    icon: 'ShoppingCart'
  },
  {
    id: '3',
    name: 'Automações',
    slug: 'automations',
    description: 'Sistemas de automação e integrações',
    color: '#F59E0B',
    icon: 'Zap'
  },
  {
    id: '4',
    name: 'Landing Pages',
    slug: 'landing-pages',
    description: 'Páginas de conversão e marketing',
    color: '#EF4444',
    icon: 'Target'
  },
  {
    id: '5',
    name: 'Dashboards',
    slug: 'dashboards',
    description: 'Painéis administrativos e analytics',
    color: '#8B5CF6',
    icon: 'BarChart3'
  }
];

// Mock data para tecnologias
const mockTechnologies: Technology[] = [
  { name: 'React', category: 'frontend', color: '#61DAFB' },
  { name: 'Next.js', category: 'frontend', color: '#000000' },
  { name: 'TypeScript', category: 'frontend', color: '#3178C6' },
  { name: 'Tailwind CSS', category: 'frontend', color: '#06B6D4' },
  { name: 'Node.js', category: 'backend', color: '#339933' },
  { name: 'Supabase', category: 'backend', color: '#3ECF8E' },
  { name: 'PostgreSQL', category: 'database', color: '#336791' },
  { name: 'Prisma', category: 'backend', color: '#2D3748' },
  { name: 'Stripe', category: 'backend', color: '#635BFF' },
  { name: 'Vercel', category: 'devops', color: '#000000' },
  { name: 'Figma', category: 'design', color: '#F24E1E' },
  { name: 'Framer Motion', category: 'frontend', color: '#0055FF' }
];

// Mock data para projetos
const mockProjects: Project[] = [
  {
    id: '1',
    slug: 'saas-dashboard-analytics',
    title: 'SaaS Analytics Dashboard',
    subtitle: 'Plataforma completa de analytics para e-commerce',
    description: 'Dashboard avançado para análise de dados de vendas, comportamento de usuários e métricas de performance em tempo real.',
    longDescription: `Uma plataforma SaaS completa desenvolvida para empresas de e-commerce que precisam de insights detalhados sobre suas operações. O sistema oferece visualizações interativas, relatórios automatizados e alertas inteligentes.

A aplicação foi construída com foco em performance e escalabilidade, suportando milhões de eventos por dia e oferecendo insights em tempo real para tomada de decisões estratégicas.`,
    category: mockCategories[4], // Dashboards
    tags: ['saas', 'analytics', 'real-time', 'dashboard', 'e-commerce'],
    technologies: [
      mockTechnologies[0], // React
      mockTechnologies[1], // Next.js
      mockTechnologies[2], // TypeScript
      mockTechnologies[3], // Tailwind CSS
      mockTechnologies[5], // Supabase
      mockTechnologies[6], // PostgreSQL
    ],
    images: [
      {
        id: '1',
        url: '/api/placeholder/1200/800',
        alt: 'Dashboard principal com métricas em tempo real',
        caption: 'Interface principal do dashboard com KPIs e gráficos interativos',
        type: 'hero',
        order: 1
      },
      {
        id: '2',
        url: '/api/placeholder/800/600',
        alt: 'Página de relatórios detalhados',
        caption: 'Sistema de relatórios com filtros avançados',
        type: 'screenshot',
        order: 2
      },
      {
        id: '3',
        url: '/api/placeholder/800/600',
        alt: 'Interface mobile responsiva',
        caption: 'Versão mobile otimizada para gestores',
        type: 'mockup',
        order: 3
      }
    ],
    liveUrl: 'https://analytics-demo.exemplo.com',
    githubUrl: 'https://github.com/exemplo/analytics-dashboard',
    featured: true,
    status: 'completed',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-03-20'),
    client: {
      name: 'TechCommerce',
      industry: 'E-commerce',
      size: 'medium',
      logo: '/api/placeholder/100/100'
    },
    metrics: {
      performance: {
        loadTime: '< 1.2s',
        lighthouse: 98,
        coreWebVitals: 'Excelente'
      },
      business: {
        userIncrease: '+150%',
        conversionRate: '+45%',
        timeToMarket: '8 semanas'
      },
      technical: {
        testCoverage: '95%',
        uptime: '99.9%',
        bugReduction: '-80%'
      }
    },
    challenges: [
      'Processamento de grandes volumes de dados em tempo real',
      'Interface responsiva para diferentes tipos de usuários',
      'Integração com múltiplas APIs de e-commerce',
      'Otimização de performance para dashboards complexos'
    ],
    solutions: [
      'Implementação de WebSockets para atualizações em tempo real',
      'Design system modular com componentes reutilizáveis',
      'Arquitetura de microserviços para integrações',
      'Lazy loading e virtualização para grandes datasets'
    ],
    learnings: [
      'Importância da arquitetura escalável desde o início',
      'Valor do feedback contínuo do usuário no desenvolvimento',
      'Técnicas avançadas de otimização de performance',
      'Estratégias de cache para aplicações real-time'
    ],
    seoData: {
      title: 'SaaS Analytics Dashboard - Case Study | Portfolio',
      description: 'Case study completo do desenvolvimento de uma plataforma SaaS de analytics para e-commerce com React e Next.js.',
      keywords: ['saas', 'analytics', 'dashboard', 'react', 'nextjs', 'case study']
    }
  },
  {
    id: '2',
    slug: 'ecommerce-fashion-store',
    title: 'Fashion Store Online',
    subtitle: 'E-commerce moderno para moda feminina',
    description: 'Loja virtual completa com sistema de pagamentos, gestão de estoque e experiência de compra otimizada.',
    longDescription: `E-commerce completo desenvolvido para uma marca de moda feminina, focando em conversão e experiência do usuário. A plataforma inclui catálogo de produtos, carrinho de compras, checkout otimizado e painel administrativo.

O projeto foi desenvolvido com foco em performance mobile e SEO, resultando em excelentes métricas de conversão e posicionamento orgânico.`,
    category: mockCategories[1], // E-commerce
    tags: ['ecommerce', 'fashion', 'stripe', 'mobile-first', 'seo'],
    technologies: [
      mockTechnologies[0], // React
      mockTechnologies[1], // Next.js
      mockTechnologies[2], // TypeScript
      mockTechnologies[3], // Tailwind CSS
      mockTechnologies[8], // Stripe
      mockTechnologies[5], // Supabase
    ],
    images: [
      {
        id: '1',
        url: '/api/placeholder/1200/800',
        alt: 'Homepage da loja com produtos em destaque',
        caption: 'Design moderno e clean focado na experiência do usuário',
        type: 'hero',
        order: 1
      },
      {
        id: '2',
        url: '/api/placeholder/800/600',
        alt: 'Página de produto com galeria interativa',
        caption: 'Página de produto com zoom e múltiplas visualizações',
        type: 'screenshot',
        order: 2
      },
      {
        id: '3',
        url: '/api/placeholder/800/600',
        alt: 'Checkout otimizado mobile',
        caption: 'Processo de checkout simplificado para mobile',
        type: 'mockup',
        order: 3
      }
    ],
    liveUrl: 'https://fashion-store-demo.exemplo.com',
    featured: true,
    status: 'completed',
    startDate: new Date('2023-11-01'),
    endDate: new Date('2024-01-10'),
    client: {
      name: 'Bella Fashion',
      industry: 'Moda',
      size: 'small',
      logo: '/api/placeholder/100/100'
    },
    metrics: {
      performance: {
        loadTime: '< 0.8s',
        lighthouse: 96,
        coreWebVitals: 'Excelente'
      },
      business: {
        conversionRate: '+280%',
        revenue: '+320%',
        userIncrease: '+200%'
      },
      technical: {
        testCoverage: '88%',
        uptime: '99.8%'
      }
    },
    challenges: [
      'Otimização de imagens para catálogo extenso',
      'Integração com sistema de estoque legado',
      'Checkout mobile otimizado',
      'SEO para produtos dinâmicos'
    ],
    solutions: [
      'Sistema de otimização automática de imagens',
      'API middleware para sincronização de estoque',
      'Design mobile-first com UX simplificada',
      'SSG com ISR para páginas de produto'
    ],
    learnings: [
      'Importância da otimização mobile para e-commerce',
      'Valor do A/B testing no processo de checkout',
      'Estratégias de SEO para catálogos dinâmicos',
      'Integração eficiente com sistemas legados'
    ],
    seoData: {
      title: 'Fashion Store E-commerce - Case Study | Portfolio',
      description: 'Case study do desenvolvimento de e-commerce moderno para moda feminina com foco em conversão e performance.',
      keywords: ['ecommerce', 'fashion', 'react', 'nextjs', 'stripe', 'case study']
    }
  },
  {
    id: '3',
    slug: 'automation-crm-integration',
    title: 'CRM Automation System',
    subtitle: 'Automação completa de processos de vendas',
    description: 'Sistema de automação que integra CRM, email marketing e análise de leads para otimizar o funil de vendas.',
    longDescription: `Plataforma de automação desenvolvida para otimizar processos de vendas B2B. O sistema integra múltiplas ferramentas (CRM, email marketing, analytics) em um fluxo automatizado que qualifica leads, nutre prospects e acompanha conversões.

A solução reduziu significativamente o tempo de resposta da equipe de vendas e aumentou a taxa de conversão através de automações inteligentes.`,
    category: mockCategories[2], // Automações
    tags: ['automation', 'crm', 'sales', 'integration', 'b2b'],
    technologies: [
      mockTechnologies[0], // React
      mockTechnologies[2], // TypeScript
      mockTechnologies[4], // Node.js
      mockTechnologies[5], // Supabase
      mockTechnologies[6], // PostgreSQL
    ],
    images: [
      {
        id: '1',
        url: '/api/placeholder/1200/800',
        alt: 'Dashboard de automações ativas',
        caption: 'Painel principal com fluxos de automação e métricas',
        type: 'hero',
        order: 1
      },
      {
        id: '2',
        url: '/api/placeholder/800/600',
        alt: 'Editor visual de workflows',
        caption: 'Interface drag-and-drop para criar automações',
        type: 'screenshot',
        order: 2
      }
    ],
    featured: false,
    status: 'completed',
    startDate: new Date('2023-09-15'),
    endDate: new Date('2023-12-20'),
    client: {
      name: 'SalesForce Pro',
      industry: 'Software',
      size: 'medium'
    },
    metrics: {
      business: {
        conversionRate: '+180%',
        timeToMarket: '12 semanas'
      },
      technical: {
        uptime: '99.9%',
        testCoverage: '92%'
      }
    },
    challenges: [
      'Integração com múltiplas APIs de terceiros',
      'Processamento de grandes volumes de dados',
      'Interface intuitiva para usuários não-técnicos',
      'Confiabilidade em automações críticas'
    ],
    solutions: [
      'Arquitetura de microserviços com retry automático',
      'Sistema de filas para processamento assíncrono',
      'Design system focado em usabilidade',
      'Monitoramento e alertas em tempo real'
    ],
    learnings: [
      'Importância da confiabilidade em sistemas críticos',
      'Valor da interface intuitiva para adoção',
      'Estratégias de integração com APIs instáveis',
      'Monitoramento proativo de automações'
    ],
    seoData: {
      title: 'CRM Automation System - Case Study | Portfolio',
      description: 'Sistema de automação de CRM que otimiza processos de vendas B2B com integrações inteligentes.',
      keywords: ['automation', 'crm', 'sales', 'integration', 'b2b', 'case study']
    }
  },
  {
    id: '4',
    slug: 'startup-landing-page',
    title: 'Startup Landing Page',
    subtitle: 'Landing page de alta conversão para SaaS',
    description: 'Landing page otimizada para conversão com A/B testing, analytics avançados e integração com ferramentas de marketing.',
    longDescription: `Landing page desenvolvida para uma startup de SaaS focada em conversão e geração de leads qualificados. O projeto incluiu pesquisa de usuário, design de conversão, desenvolvimento otimizado e implementação de testes A/B.

A página alcançou excelentes métricas de conversão e se tornou a principal fonte de leads qualificados da empresa.`,
    category: mockCategories[3], // Landing Pages
    tags: ['landing-page', 'conversion', 'saas', 'ab-testing', 'marketing'],
    technologies: [
      mockTechnologies[0], // React
      mockTechnologies[1], // Next.js
      mockTechnologies[2], // TypeScript
      mockTechnologies[3], // Tailwind CSS
      mockTechnologies[11], // Framer Motion
    ],
    images: [
      {
        id: '1',
        url: '/api/placeholder/1200/800',
        alt: 'Hero section com proposta de valor clara',
        caption: 'Seção hero otimizada para conversão',
        type: 'hero',
        order: 1
      },
      {
        id: '2',
        url: '/api/placeholder/800/600',
        alt: 'Seção de features com animações',
        caption: 'Apresentação de funcionalidades com micro-interações',
        type: 'screenshot',
        order: 2
      }
    ],
    liveUrl: 'https://startup-landing-demo.exemplo.com',
    featured: false,
    status: 'completed',
    startDate: new Date('2023-08-01'),
    endDate: new Date('2023-09-15'),
    client: {
      name: 'InnovateSaaS',
      industry: 'Software',
      size: 'startup'
    },
    metrics: {
      performance: {
        loadTime: '< 0.6s',
        lighthouse: 100,
        coreWebVitals: 'Excelente'
      },
      business: {
        conversionRate: '+420%',
        userIncrease: '+350%'
      }
    },
    challenges: [
      'Otimização extrema de performance',
      'Design que converte diferentes personas',
      'Implementação de A/B testing',
      'SEO para termos competitivos'
    ],
    solutions: [
      'Otimizações avançadas de Core Web Vitals',
      'Pesquisa de usuário e design baseado em dados',
      'Framework próprio para testes A/B',
      'Estratégia de conteúdo SEO-first'
    ],
    learnings: [
      'Impacto da performance na conversão',
      'Valor da pesquisa de usuário no design',
      'Importância dos testes A/B contínuos',
      'SEO técnico para páginas de conversão'
    ],
    seoData: {
      title: 'Startup Landing Page - Case Study | Portfolio',
      description: 'Landing page de alta conversão para startup SaaS com foco em performance e geração de leads.',
      keywords: ['landing page', 'conversion', 'saas', 'startup', 'ab testing', 'case study']
    }
  }
];

// Funções para gerenciar o portfolio
export async function getAllProjects(): Promise<Project[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockProjects.sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockProjects.find(project => project.slug === slug) || null;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockProjects.filter(project => project.featured);
}

export async function getProjectsByCategory(categorySlug: string): Promise<Project[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockProjects.filter(project => project.category.slug === categorySlug);
}

export async function getProjectsByTechnology(technology: string): Promise<Project[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockProjects.filter(project => 
    project.technologies.some(tech => 
      tech.name.toLowerCase().includes(technology.toLowerCase())
    )
  );
}

export async function searchProjects(query: string): Promise<Project[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const searchTerm = query.toLowerCase();
  return mockProjects.filter(project => 
    project.title.toLowerCase().includes(searchTerm) ||
    project.description.toLowerCase().includes(searchTerm) ||
    project.tags.some(tag => tag.includes(searchTerm)) ||
    project.technologies.some(tech => tech.name.toLowerCase().includes(searchTerm))
  );
}

export async function getAllCategories(): Promise<ProjectCategory[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockCategories;
}

export async function getAllTechnologies(): Promise<Technology[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockTechnologies;
}

export async function getPortfolioMetadata(): Promise<PortfolioMetadata> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const featuredProjects = await getFeaturedProjects();
  
  return {
    totalProjects: mockProjects.length,
    categories: mockCategories,
    technologies: mockTechnologies,
    featuredProjects
  };
}

export async function getRelatedProjects(currentProject: Project, limit: number = 3): Promise<Project[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const relatedProjects = mockProjects
    .filter(project => project.id !== currentProject.id)
    .map(project => {
      let score = 0;
      
      // Pontuação por categoria
      if (project.category.id === currentProject.category.id) {
        score += 5;
      }
      
      // Pontuação por tecnologias em comum
      const commonTechs = project.technologies.filter(tech => 
        currentProject.technologies.some(currentTech => currentTech.name === tech.name)
      );
      score += commonTechs.length * 2;
      
      // Pontuação por tags em comum
      const commonTags = project.tags.filter(tag => 
        currentProject.tags.includes(tag)
      );
      score += commonTags.length;
      
      return { project, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.project);
  
  return relatedProjects;
}