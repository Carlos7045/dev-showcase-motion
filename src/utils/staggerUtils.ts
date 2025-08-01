import { AnimationConfig } from '@/types/animations';

export interface StaggerOptions {
  delay: number;
  direction: 'normal' | 'reverse' | 'alternate' | 'center-out';
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  maxItems?: number;
}

// Calcular delay para animação escalonada
export const calculateStaggerDelay = (
  index: number, 
  totalItems: number, 
  options: StaggerOptions
): number => {
  const { delay, direction, maxItems } = options;
  const itemCount = maxItems ? Math.min(totalItems, maxItems) : totalItems;

  switch (direction) {
    case 'reverse':
      return (itemCount - 1 - index) * delay;
    
    case 'alternate':
      return index % 2 === 0 ? index * delay : (index + 1) * delay;
    
    case 'center-out':
      const center = Math.floor(itemCount / 2);
      const distance = Math.abs(index - center);
      return distance * delay;
    
    case 'normal':
    default:
      return index * delay;
  }
};

// Gerar configurações de animação para lista escalonada
export const generateStaggeredConfigs = (
  baseConfig: AnimationConfig,
  itemCount: number,
  options: StaggerOptions
): AnimationConfig[] => {
  return Array.from({ length: itemCount }, (_, index) => ({
    ...baseConfig,
    delay: (baseConfig.delay || 0) + calculateStaggerDelay(index, itemCount, options)
  }));
};

// Utilitário para animações em grid com padrões específicos
export const generateGridStaggerConfigs = (
  baseConfig: AnimationConfig,
  rows: number,
  columns: number,
  pattern: 'row-by-row' | 'column-by-column' | 'diagonal' | 'spiral' | 'random'
): AnimationConfig[] => {
  const totalItems = rows * columns;
  const configs: AnimationConfig[] = [];

  for (let i = 0; i < totalItems; i++) {
    const row = Math.floor(i / columns);
    const col = i % columns;
    let delay = baseConfig.delay || 0;

    switch (pattern) {
      case 'row-by-row':
        delay += row * 0.1 + col * 0.05;
        break;
      
      case 'column-by-column':
        delay += col * 0.1 + row * 0.05;
        break;
      
      case 'diagonal':
        delay += (row + col) * 0.08;
        break;
      
      case 'spiral':
        // Implementação simplificada de espiral
        const centerRow = Math.floor(rows / 2);
        const centerCol = Math.floor(columns / 2);
        const distance = Math.abs(row - centerRow) + Math.abs(col - centerCol);
        delay += distance * 0.1;
        break;
      
      case 'random':
        delay += Math.random() * 0.5;
        break;
    }

    configs.push({
      ...baseConfig,
      delay
    });
  }

  return configs;
};

// Utilitário para animações baseadas em distância do mouse
export const calculateMouseDistanceDelay = (
  elementRect: DOMRect,
  mousePosition: { x: number; y: number },
  maxDelay: number = 0.5
): number => {
  const elementCenter = {
    x: elementRect.left + elementRect.width / 2,
    y: elementRect.top + elementRect.height / 2
  };

  const distance = Math.sqrt(
    Math.pow(mousePosition.x - elementCenter.x, 2) +
    Math.pow(mousePosition.y - elementCenter.y, 2)
  );

  // Normalizar distância (assumindo tela de ~1920px)
  const normalizedDistance = Math.min(distance / 1920, 1);
  
  return normalizedDistance * maxDelay;
};

// Utilitário para animações baseadas em scroll
export const calculateScrollBasedDelay = (
  elementTop: number,
  viewportHeight: number,
  scrollY: number,
  maxDelay: number = 0.3
): number => {
  const elementPosition = elementTop - scrollY;
  const relativePosition = elementPosition / viewportHeight;
  
  // Elementos mais próximos do topo da viewport animam primeiro
  const normalizedPosition = Math.max(0, Math.min(1, relativePosition));
  
  return normalizedPosition * maxDelay;
};

// Presets de configurações escalonadas
export const staggerPresets = {
  // Lista simples de cima para baixo
  simpleList: {
    delay: 0.1,
    direction: 'normal' as const,
    easing: 'ease-out' as const
  },
  
  // Cards em grid
  cardGrid: {
    delay: 0.05,
    direction: 'normal' as const,
    easing: 'ease-out' as const
  },
  
  // Navegação/menu
  navigation: {
    delay: 0.08,
    direction: 'normal' as const,
    easing: 'ease-out' as const
  },
  
  // Portfolio items
  portfolio: {
    delay: 0.12,
    direction: 'center-out' as const,
    easing: 'ease-out' as const
  },
  
  // Elementos de serviço
  services: {
    delay: 0.15,
    direction: 'alternate' as const,
    easing: 'ease-in-out' as const
  },
  
  // Testimonials
  testimonials: {
    delay: 0.2,
    direction: 'normal' as const,
    easing: 'ease-out' as const
  }
};

// Função para otimizar animações baseada na performance
export const optimizeStaggerForPerformance = (
  configs: AnimationConfig[],
  performanceBudget: 'low' | 'medium' | 'high'
): AnimationConfig[] => {
  switch (performanceBudget) {
    case 'low':
      // Reduzir número de animações simultâneas
      return configs.map((config, index) => ({
        ...config,
        delay: (config.delay || 0) + Math.floor(index / 3) * 0.1,
        duration: Math.min(config.duration, 0.3)
      }));
    
    case 'medium':
      return configs.map(config => ({
        ...config,
        duration: Math.min(config.duration, 0.5)
      }));
    
    case 'high':
    default:
      return configs;
  }
};