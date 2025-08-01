import { AnimationConfig, AnimationVariants, StaggerConfig } from '@/types/animations';

export const createAnimationVariants = (config: AnimationConfig): AnimationVariants => {
  const baseTransition = {
    duration: config.duration,
    delay: config.delay || 0,
    ease: config.easing || "easeOut"
  };

  switch (config.type) {
    case 'fadeIn':
      return {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: baseTransition
        }
      };

    case 'slideUp':
      return {
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: baseTransition
        }
      };

    case 'slideDown':
      return {
        hidden: { opacity: 0, y: -50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: baseTransition
        }
      };

    case 'slideLeft':
      return {
        hidden: { opacity: 0, x: 50 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: baseTransition
        }
      };

    case 'slideRight':
      return {
        hidden: { opacity: 0, x: -50 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: baseTransition
        }
      };

    case 'scaleIn':
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: baseTransition
        }
      };

    case 'scaleOut':
      return {
        hidden: { opacity: 0, scale: 1.2 },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: baseTransition
        }
      };

    case 'rotateIn':
      return {
        hidden: { opacity: 0, rotate: -180, scale: 0.8 },
        visible: { 
          opacity: 1, 
          rotate: 0,
          scale: 1,
          transition: baseTransition
        }
      };

    case 'bounce':
      return {
        hidden: { opacity: 0, y: -100 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            ...baseTransition,
            type: "spring",
            bounce: 0.4
          }
        }
      };

    case 'elastic':
      return {
        hidden: { opacity: 0, scale: 0 },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: {
            ...baseTransition,
            type: "spring",
            stiffness: 400,
            damping: 10
          }
        }
      };

    case 'parallax':
      return {
        hidden: { opacity: 0, y: 100 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            ...baseTransition,
            type: "tween"
          }
        }
      };

    default:
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: baseTransition }
      };
  }
};

export const createStaggerVariants = (config: StaggerConfig): { container: any, item: any } => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: config.staggerDelay,
        delayChildren: config.container.delay || 0,
        staggerDirection: config.direction === 'reverse' ? -1 : 1
      }
    }
  };

  const itemVariants = createAnimationVariants(config.items);

  return {
    container: containerVariants,
    item: itemVariants
  };
};

// Variantes pré-definidas para casos comuns
export const presetVariants = {
  // Animações de entrada suaves
  gentleFadeIn: createAnimationVariants({
    type: 'fadeIn',
    duration: 0.8,
    delay: 0.2,
    easing: 'easeOut'
  }),

  // Animações de slide com bounce
  bouncySlideUp: createAnimationVariants({
    type: 'bounce',
    duration: 0.6,
    delay: 0.1,
    easing: 'easeOut'
  }),

  // Animações elásticas para elementos interativos
  elasticScale: createAnimationVariants({
    type: 'elastic',
    duration: 0.5,
    delay: 0,
    easing: 'easeOut'
  }),

  // Stagger para listas
  staggeredList: createStaggerVariants({
    container: {
      type: 'fadeIn',
      duration: 0.3,
      delay: 0
    },
    items: {
      type: 'slideUp',
      duration: 0.5,
      delay: 0
    },
    staggerDelay: 0.1,
    direction: 'normal'
  }),

  // Stagger para grids
  staggeredGrid: createStaggerVariants({
    container: {
      type: 'fadeIn',
      duration: 0.4,
      delay: 0.2
    },
    items: {
      type: 'scaleIn',
      duration: 0.6,
      delay: 0
    },
    staggerDelay: 0.05,
    direction: 'normal'
  })
};