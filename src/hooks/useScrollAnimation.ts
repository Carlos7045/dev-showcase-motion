import { useInView, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useEffect, useCallback, useState } from 'react';
import { AnimationConfig } from '@/types/animations';
import { createAnimationVariants } from '@/utils/animationVariants';
import { scrollAnimationManager } from '@/lib/ScrollAnimationManager';

export const useScrollAnimation = (config: AnimationConfig) => {
  const ref = useRef<HTMLElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  
  const isInView = useInView(ref, { 
    once: config.once !== false, 
    margin: config.rootMargin || "-100px",
    amount: config.threshold || 0.1
  });

  const variants = createAnimationVariants(config);

  useEffect(() => {
    if (isInView && !isTriggered) {
      setIsTriggered(true);
    }
  }, [isInView, isTriggered]);

  return {
    ref,
    isInView,
    isTriggered,
    variants,
    animate: isTriggered ? 'visible' : 'hidden'
  };
};

// Hook para animações de parallax
export const useParallaxAnimation = (speed: number = 0.5) => {
  const ref = useRef<HTMLElement>(null);
  const y = useMotionValue(0);
  const yRange = [-speed * 100, speed * 100];
  const transform = useTransform(y, [0, 1], yRange);

  useEffect(() => {
    const updateY = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      y.set(scrollProgress);
    };

    const handleScroll = () => {
      requestAnimationFrame(updateY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateY(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [y]);

  return { ref, y: transform };
};

// Hook para animações escalonadas
export const useStaggerAnimation = (
  itemsCount: number,
  baseConfig: AnimationConfig,
  staggerDelay: number = 0.1
) => {
  const containerRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [triggeredItems, setTriggeredItems] = useState<boolean[]>(new Array(itemsCount).fill(false));

  const isInView = useInView(containerRef, { 
    once: baseConfig.once !== false,
    margin: baseConfig.rootMargin || "-100px",
    amount: baseConfig.threshold || 0.1
  });

  useEffect(() => {
    if (isInView) {
      // Trigger items with stagger delay
      triggeredItems.forEach((_, index) => {
        setTimeout(() => {
          setTriggeredItems(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * staggerDelay * 1000);
      });
    }
  }, [isInView, staggerDelay, triggeredItems.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: baseConfig.delay || 0
      }
    }
  };

  const itemVariants = createAnimationVariants(baseConfig);

  const setItemRef = useCallback((index: number) => (el: HTMLElement | null) => {
    itemRefs.current[index] = el;
  }, []);

  return {
    containerRef,
    itemRefs: itemRefs.current,
    setItemRef,
    containerVariants,
    itemVariants,
    isInView,
    triggeredItems,
    containerAnimate: isInView ? 'visible' : 'hidden'
  };
};

// Hook para animações baseadas no IntersectionObserver customizado
export const useAdvancedScrollAnimation = (
  config: AnimationConfig,
  callback?: (entry: IntersectionObserverEntry) => void
) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleIntersection = (entry: IntersectionObserverEntry) => {
      setIsVisible(entry.isIntersecting);
      if (callback) {
        callback(entry);
      }
    };

    scrollAnimationManager.registerAnimation(element, config, handleIntersection);

    return () => {
      scrollAnimationManager.unregisterAnimation(element);
    };
  }, [config, callback]);

  const variants = createAnimationVariants(config);

  return {
    ref,
    isVisible,
    variants,
    animate: isVisible ? 'visible' : 'hidden'
  };
};