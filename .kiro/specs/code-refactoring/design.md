# Documento de Design - Refatoração e Otimização do Código

## Visão Geral

Este documento detalha a arquitetura e estratégias para refatorar o portfolio React/TypeScript, transformando-o em uma aplicação moderna, performática e maintível. A refatoração será incremental, preservando funcionalidades enquanto melhora a qualidade do código.

## Arquitetura

### Estrutura de Pastas Proposta

```
src/
├── components/           # Componentes organizados por atomic design
│   ├── atoms/           # Componentes básicos reutilizáveis
│   ├── molecules/       # Combinações de atoms
│   ├── organisms/       # Seções complexas da página
│   └── templates/       # Layouts de página
├── hooks/               # Custom hooks para lógica reutilizável
├── utils/               # Funções utilitárias puras
├── constants/           # Constantes e configurações
├── types/               # Definições de tipos TypeScript
├── styles/              # Estilos globais e temas
├── assets/              # Recursos estáticos otimizados
└── pages/               # Componentes de página
```

### Padrões de Componentes

#### 1. Atomic Design Implementation
- **Atoms**: Button, Input, Icon, Typography
- **Molecules**: Card, Navigation Item, Social Link
- **Organisms**: Header, Hero Section, Portfolio Grid
- **Templates**: Page Layout, Section Layout

#### 2. Composição vs Herança
- Usar composição para flexibilidade
- Props drilling mínimo com context quando necessário
- Render props para lógica compartilhada

## Componentes e Interfaces

### 1. Sistema de Design Tokens

```typescript
// constants/design-tokens.ts
export const DESIGN_TOKENS = {
  colors: {
    primary: 'hsl(195 100% 35%)',
    secondary: 'hsl(220 10% 20%)',
    // ... outros tokens
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    // ... escala consistente
  },
  typography: {
    fontFamilies: {
      primary: ['Inter', 'sans-serif'],
      heading: ['Space Grotesk', 'sans-serif'],
    },
    // ... escalas tipográficas
  },
  animations: {
    durations: {
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
    },
    easings: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
} as const;
```

### 2. Componentes Base Otimizados

#### Button Component
```typescript
// components/atoms/Button/Button.tsx
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    // Implementação otimizada com useMemo para classes
  }
));
```

#### Optimized Image Component
```typescript
// components/atoms/OptimizedImage/OptimizedImage.tsx
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
}

export const OptimizedImage = memo<OptimizedImageProps>(({
  src, alt, priority = false, placeholder = 'empty', ...props
}) => {
  // Lazy loading, WebP support, responsive images
});
```

### 3. Custom Hooks para Lógica Reutilizável

#### useIntersectionObserver
```typescript
// hooks/useIntersectionObserver.ts
export const useIntersectionObserver = (
  options?: IntersectionObserverInit
) => {
  // Implementação otimizada para animações on-scroll
};
```

#### useLocalStorage
```typescript
// hooks/useLocalStorage.ts
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  // Implementação com error handling e SSR safety
};
```

### 4. Sistema de Animações Performático

```typescript
// utils/animations.ts
export const createSpringAnimation = (
  element: HTMLElement,
  properties: Record<string, string>
) => {
  // Usar Web Animations API para melhor performance
  return element.animate(properties, {
    duration: DESIGN_TOKENS.animations.durations.normal,
    easing: DESIGN_TOKENS.animations.easings.spring,
    fill: 'forwards',
  });
};
```

## Modelos de Dados

### 1. Tipos Base

```typescript
// types/base.ts
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}
```

### 2. Tipos de Domínio

```typescript
// types/portfolio.ts
export interface Project extends BaseEntity {
  title: string;
  description: string;
  image: ImageData;
  tags: Technology[];
  links: ProjectLink[];
  featured: boolean;
  category: ProjectCategory;
}

export interface Technology {
  name: string;
  icon: string;
  color: string;
  category: TechCategory;
}

export interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholder?: string;
}
```

### 3. Configurações Tipadas

```typescript
// types/config.ts
export interface AppConfig {
  site: {
    name: string;
    description: string;
    url: string;
    author: AuthorInfo;
  };
  features: {
    analytics: boolean;
    darkMode: boolean;
    animations: boolean;
  };
  performance: {
    lazyLoading: boolean;
    imageOptimization: boolean;
    codesplitting: boolean;
  };
}
```

## Tratamento de Erros

### 1. Error Boundaries

```typescript
// components/organisms/ErrorBoundary/ErrorBoundary.tsx
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  // Implementação com logging e fallback UI
}
```

### 2. Hook para Error Handling

```typescript
// hooks/useErrorHandler.ts
export const useErrorHandler = () => {
  const handleError = useCallback((error: Error, errorInfo?: ErrorInfo) => {
    // Log error, show toast, track analytics
  }, []);

  return { handleError };
};
```

## Estratégia de Testes

### 1. Testes de Componentes
- Jest + React Testing Library
- Testes de acessibilidade com jest-axe
- Visual regression tests com Storybook

### 2. Testes de Performance
- Lighthouse CI integration
- Bundle size monitoring
- Core Web Vitals tracking

### 3. Testes E2E
- Playwright para fluxos críticos
- Testes de responsividade
- Testes de acessibilidade

## Otimizações de Performance

### 1. Code Splitting Estratégico

```typescript
// utils/lazyRoutes.ts
export const lazyRoute = (importFn: () => Promise<any>) => {
  return lazy(() => 
    importFn().then(module => ({
      default: module.default || module
    }))
  );
};
```

### 2. Memoização Inteligente

```typescript
// hooks/useMemoizedValue.ts
export const useMemoizedValue = <T>(
  value: T,
  deps: DependencyList
): T => {
  return useMemo(() => value, deps);
};
```

### 3. Otimização de Imagens

```typescript
// utils/imageOptimization.ts
export const generateSrcSet = (
  src: string,
  sizes: number[]
): string => {
  // Gerar srcset para diferentes densidades
};

export const getOptimizedImageUrl = (
  src: string,
  width: number,
  quality: number = 80
): string => {
  // Integração com serviços de otimização
};
```

### 4. Virtual Scrolling para Listas Grandes

```typescript
// components/molecules/VirtualList/VirtualList.tsx
export const VirtualList = <T,>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
}: VirtualListProps<T>) => {
  // Implementação de virtual scrolling
};
```

## Acessibilidade

### 1. Componentes Acessíveis por Padrão

```typescript
// components/atoms/Button/Button.tsx
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && <Spinner aria-hidden="true" />}
        {children}
      </button>
    );
  }
);
```

### 2. Hook para Navegação por Teclado

```typescript
// hooks/useKeyboardNavigation.ts
export const useKeyboardNavigation = (
  items: RefObject<HTMLElement>[],
  options?: KeyboardNavigationOptions
) => {
  // Implementação de navegação por teclado
};
```

## SEO e Meta Tags

### 1. Componente SEO Dinâmico

```typescript
// components/atoms/SEO/SEO.tsx
export const SEO: FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      {/* Open Graph tags */}
      {/* Twitter Card tags */}
      {/* Structured data */}
    </Helmet>
  );
};
```

### 2. Geração de Structured Data

```typescript
// utils/structuredData.ts
export const generatePersonSchema = (
  person: PersonData
): WithContext<Person> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    // ... outros campos
  };
};
```

## Monitoramento e Analytics

### 1. Performance Monitoring

```typescript
// utils/performance.ts
export const measurePerformance = (name: string, fn: () => void) => {
  performance.mark(`${name}-start`);
  fn();
  performance.mark(`${name}-end`);
  performance.measure(name, `${name}-start`, `${name}-end`);
};
```

### 2. Error Tracking

```typescript
// utils/errorTracking.ts
export const trackError = (error: Error, context?: Record<string, any>) => {
  // Integração com Sentry ou similar
  console.error('Error tracked:', error, context);
};
```

## Configuração de Build

### 1. Vite Otimizado

```typescript
// vite.config.ts - Configurações otimizadas
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', /* outros */],
          'animation-vendor': ['framer-motion'],
        },
      },
    },
    target: 'es2020',
    minify: 'terser',
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
});
```

### 2. TypeScript Strict Mode

```json
// tsconfig.json - Configurações rigorosas
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## Migração Incremental

### Fase 1: Estrutura Base
- Reorganizar estrutura de pastas
- Criar design tokens
- Implementar componentes base

### Fase 2: Otimizações Core
- Implementar lazy loading
- Otimizar imagens
- Adicionar memoização

### Fase 3: Features Avançadas
- Sistema de temas
- Animações performáticas
- PWA features

### Fase 4: Qualidade e Testes
- Cobertura de testes
- Acessibilidade completa
- Performance monitoring