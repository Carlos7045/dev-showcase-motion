import { lazy, ComponentType } from 'react';

// Função para criar lazy components com loading e error handling
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ComponentType
) => {
  const LazyComponent = lazy(importFunc);
  
  // Preload function para carregar o componente antecipadamente
  (LazyComponent as any).preload = importFunc;
  
  return LazyComponent;
};

// Lazy loading das páginas principais
export const LazyPages = {
  Index: createLazyComponent(() => import('@/pages/Index')),
  NotFound: createLazyComponent(() => import('@/pages/NotFound')),
  
  // Páginas de serviços (quando criadas)
  DesenvolvimentoWeb: createLazyComponent(() => 
    import('@/pages/services/DesenvolvimentoWeb').catch(() => 
      import('@/pages/NotFound') // Fallback se a página não existir ainda
    )
  ),
  Automacoes: createLazyComponent(() => 
    import('@/pages/services/Automacoes').catch(() => 
      import('@/pages/NotFound')
    )
  ),
  Integracoes: createLazyComponent(() => 
    import('@/pages/services/Integracoes').catch(() => 
      import('@/pages/NotFound')
    )
  ),
  Consultoria: createLazyComponent(() => 
    import('@/pages/services/Consultoria').catch(() => 
      import('@/pages/NotFound')
    )
  ),
  
  // Blog (quando implementado)
  Blog: createLazyComponent(() => 
    import('@/pages/Blog').catch(() => 
      import('@/pages/NotFound')
    )
  ),
  BlogPost: createLazyComponent(() => 
    import('@/pages/BlogPost').catch(() => 
      import('@/pages/NotFound')
    )
  ),
  
  // Portfolio detalhado (quando implementado)
  Portfolio: createLazyComponent(() => 
    import('@/pages/Portfolio').catch(() => 
      import('@/pages/NotFound')
    )
  ),
  PortfolioProject: createLazyComponent(() => 
    import('@/pages/PortfolioProject').catch(() => 
      import('@/pages/NotFound')
    )
  ),
  
  // Contato
  Contact: createLazyComponent(() => 
    import('@/pages/Contact').catch(() => 
      import('@/pages/NotFound')
    )
  ),
  
  // Teste de animações
  AnimationTest: createLazyComponent(() => import('@/pages/AnimationTest'))
};

// Lazy loading de componentes pesados
export const LazyComponents = {
  // Componente de debug social (só em desenvolvimento)
  SocialMediaDebug: createLazyComponent(() => 
    import('@/components/SocialMediaDebug')
  )
};

// Função para preload de rotas baseado na navegação do usuário
export const preloadRoute = (routeName: keyof typeof LazyPages) => {
  const component = LazyPages[routeName] as any;
  if (component && component.preload) {
    component.preload().catch((error: Error) => {
      console.warn(`Falha ao preload da rota ${routeName}:`, error);
    });
  }
};

// Preload inteligente baseado em hover/focus
export const setupIntelligentPreload = () => {
  // Preload quando o usuário faz hover em links
  document.addEventListener('mouseover', (event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a[href]') as HTMLAnchorElement;
    
    if (link && link.href.includes(window.location.origin)) {
      const path = new URL(link.href).pathname;
      
      // Mapeia paths para componentes
      const routeMap: Record<string, keyof typeof LazyPages> = {
        '/': 'Index',
        '/desenvolvimento-web': 'DesenvolvimentoWeb',
        '/automacoes': 'Automacoes',
        '/integracoes': 'Integracoes',
        '/consultoria': 'Consultoria',
        '/blog': 'Blog',
        '/portfolio': 'Portfolio',
        '/contato': 'Contact'
      };
      
      const routeName = routeMap[path];
      if (routeName) {
        preloadRoute(routeName);
      }
    }
  });
  
  // Preload quando o usuário foca em links (navegação por teclado)
  document.addEventListener('focusin', (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'A' && target.getAttribute('href')) {
      const link = target as HTMLAnchorElement;
      if (link.href.includes(window.location.origin)) {
        const path = new URL(link.href).pathname;
        
        const routeMap: Record<string, keyof typeof LazyPages> = {
          '/': 'Index',
          '/desenvolvimento-web': 'DesenvolvimentoWeb',
          '/automacoes': 'Automacoes',
          '/integracoes': 'Integracoes',
          '/consultoria': 'Consultoria',
          '/blog': 'Blog',
          '/portfolio': 'Portfolio',
          '/contato': 'Contact'
        };
        
        const routeName = routeMap[path];
        if (routeName) {
          preloadRoute(routeName);
        }
      }
    }
  });
};

// Preload de recursos críticos para a próxima navegação
export const preloadCriticalResources = (resources: string[]) => {
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    
    if (resource.endsWith('.js')) {
      link.as = 'script';
    } else if (resource.endsWith('.css')) {
      link.as = 'style';
    } else if (resource.match(/\.(jpg|jpeg|png|webp|avif)$/)) {
      link.as = 'image';
    } else {
      link.as = 'fetch';
      link.setAttribute('crossorigin', 'anonymous');
    }
    
    link.href = resource;
    document.head.appendChild(link);
  });
};

// Função para detectar conexão lenta e ajustar estratégia de preload
export const getPreloadStrategy = () => {
  if (!('connection' in navigator)) {
    return 'normal';
  }
  
  const connection = (navigator as any).connection;
  
  if (connection.saveData) {
    return 'minimal';
  }
  
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    return 'conservative';
  }
  
  if (connection.effectiveType === '3g') {
    return 'normal';
  }
  
  return 'aggressive';
};

// Configuração de preload baseada na estratégia
export const configurePreloadStrategy = () => {
  const strategy = getPreloadStrategy();
  
  switch (strategy) {
    case 'minimal':
      // Só preload de recursos críticos
      return {
        preloadOnHover: false,
        preloadOnFocus: false,
        preloadCritical: true,
        chunkSize: 'small'
      };
      
    case 'conservative':
      return {
        preloadOnHover: false,
        preloadOnFocus: true,
        preloadCritical: true,
        chunkSize: 'medium'
      };
      
    case 'normal':
      return {
        preloadOnHover: true,
        preloadOnFocus: true,
        preloadCritical: true,
        chunkSize: 'medium'
      };
      
    case 'aggressive':
      return {
        preloadOnHover: true,
        preloadOnFocus: true,
        preloadCritical: true,
        chunkSize: 'large'
      };
      
    default:
      return {
        preloadOnHover: true,
        preloadOnFocus: true,
        preloadCritical: true,
        chunkSize: 'medium'
      };
  }
};