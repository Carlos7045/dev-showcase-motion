import { AnimationConfig, StaggerConfig } from '@/types/animations';

export const defaultAnimations: Record<string, AnimationConfig> = {
  // Animações básicas
  fadeIn: {
    type: 'fadeIn',
    duration: 0.6,
    delay: 0,
    easing: 'easeOut',
    threshold: 0.1,
    once: true
  },
  slideUp: {
    type: 'slideUp',
    duration: 0.8,
    delay: 0.2,
    easing: 'easeOut',
    threshold: 0.1,
    once: true
  },
  slideDown: {
    type: 'slideDown',
    duration: 0.8,
    delay: 0.2,
    easing: 'easeOut',
    threshold: 0.1,
    once: true
  },
  slideLeft: {
    type: 'slideLeft',
    duration: 0.7,
    delay: 0.1,
    easing: 'easeOut',
    threshold: 0.1,
    once: true
  },
  slideRight: {
    type: 'slideRight',
    duration: 0.7,
    delay: 0.1,
    easing: 'easeOut',
    threshold: 0.1,
    once: true
  },
  scaleIn: {
    type: 'scaleIn',
    duration: 0.5,
    delay: 0.1,
    easing: 'easeOut',
    threshold: 0.1,
    once: true
  },
  scaleOut: {
    type: 'scaleOut',
    duration: 0.6,
    delay: 0.1,
    easing: 'easeOut',
    threshold: 0.1,
    once: true
  },
  rotateIn: {
    type: 'rotateIn',
    duration: 0.8,
    delay: 0.2,
    easing: 'easeOut',
    threshold: 0.1,
    once: true
  },
  bounce: {
    type: 'bounce',
    duration: 0.6,
    delay: 0.1,
    easing: 'easeOut',
    threshold: 0.1,
    once: true
  },
  elastic: {
    type: 'elastic',
    duration: 0.5,
    delay: 0,
    easing: 'easeOut',
    threshold: 0.1,
    once: true
  },
  parallax: {
    type: 'parallax',
    duration: 0.8,
    delay: 0,
    easing: 'linear',
    threshold: 0,
    once: false
  }
};

// Configurações para animações escalonadas
export const staggerConfigs: Record<string, StaggerConfig> = {
  // Para listas verticais
  verticalList: {
    container: {
      type: 'fadeIn',
      duration: 0.3,
      delay: 0,
      threshold: 0.1,
      once: true
    },
    items: {
      type: 'slideUp',
      duration: 0.5,
      delay: 0,
      threshold: 0.1,
      once: true
    },
    staggerDelay: 0.1,
    direction: 'normal'
  },
  
  // Para grids de cards
  cardGrid: {
    container: {
      type: 'fadeIn',
      duration: 0.4,
      delay: 0.2,
      threshold: 0.1,
      once: true
    },
    items: {
      type: 'scaleIn',
      duration: 0.6,
      delay: 0,
      threshold: 0.1,
      once: true
    },
    staggerDelay: 0.05,
    direction: 'normal'
  },
  
  // Para elementos de serviço
  serviceItems: {
    container: {
      type: 'fadeIn',
      duration: 0.5,
      delay: 0.1,
      threshold: 0.1,
      once: true
    },
    items: {
      type: 'slideLeft',
      duration: 0.7,
      delay: 0,
      threshold: 0.1,
      once: true
    },
    staggerDelay: 0.15,
    direction: 'normal'
  },
  
  // Para portfolio items
  portfolioGrid: {
    container: {
      type: 'fadeIn',
      duration: 0.6,
      delay: 0.3,
      threshold: 0.1,
      once: true
    },
    items: {
      type: 'bounce',
      duration: 0.8,
      delay: 0,
      threshold: 0.1,
      once: true
    },
    staggerDelay: 0.08,
    direction: 'normal'
  }
};

// Configurações específicas para diferentes seções
export const sectionAnimations = {
  hero: {
    title: defaultAnimations.slideDown,
    subtitle: {
      ...defaultAnimations.fadeIn,
      delay: 0.3
    },
    cta: {
      ...defaultAnimations.bounce,
      delay: 0.6
    }
  },
  
  about: {
    container: defaultAnimations.fadeIn,
    content: defaultAnimations.slideUp,
    image: defaultAnimations.scaleIn
  },
  
  services: {
    title: defaultAnimations.slideUp,
    grid: staggerConfigs.serviceItems
  },
  
  portfolio: {
    title: defaultAnimations.fadeIn,
    grid: staggerConfigs.portfolioGrid
  },
  
  contact: {
    form: defaultAnimations.slideLeft,
    info: defaultAnimations.slideRight
  }
};

// Configurações de performance
export const animationSettings = {
  // Reduzir animações em dispositivos com pouca bateria
  respectsPowerSaveMode: true,
  
  // Respeitar preferência de movimento reduzido
  respectsReducedMotion: true,
  
  // Configurações de threshold para diferentes tamanhos de tela
  responsiveThresholds: {
    mobile: 0.05,
    tablet: 0.1,
    desktop: 0.15
  },
  
  // Configurações de performance
  performance: {
    // Usar will-change para otimização
    useWillChange: true,
    
    // Usar transform3d para aceleração de hardware
    useHardwareAcceleration: true,
    
    // Limitar animações simultâneas
    maxConcurrentAnimations: 10
  }
};