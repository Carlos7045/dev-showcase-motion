import { useEffect, useRef, useCallback } from 'react';
import { HoverEffect, TiltConfig, MagneticConfig, RippleConfig, GlowConfig, MorphConfig } from '@/types/interactions';
import { hoverEffectManager } from '@/lib/HoverEffectManager';
import { useAnimationContext } from '@/components/AnimationProvider';

interface UseHoverEffectOptions {
  effect: HoverEffect;
  config?: TiltConfig | MagneticConfig | RippleConfig | GlowConfig | MorphConfig;
  disabled?: boolean;
}

export const useHoverEffect = (options: UseHoverEffectOptions) => {
  const elementRef = useRef<HTMLElement>(null);
  const { shouldAnimate, preferences } = useAnimationContext();

  useEffect(() => {
    const element = elementRef.current;
    if (!element || options.disabled || !shouldAnimate) return;

    // Adaptar efeito baseado nas preferências
    let adaptedEffect = { ...options.effect };
    
    if (preferences.prefersReducedMotion) {
      // Reduzir intensidade e duração para movimento reduzido
      adaptedEffect = {
        ...adaptedEffect,
        intensity: Math.min(adaptedEffect.intensity * 0.5, 10),
        duration: Math.min(adaptedEffect.duration, 200)
      };
    }

    hoverEffectManager.applyEffect(element, adaptedEffect, options.config);

    return () => {
      hoverEffectManager.removeEffect(element);
    };
  }, [options.effect, options.config, options.disabled, shouldAnimate, preferences]);

  return elementRef;
};

// Hook específico para efeito 3D tilt
export const useTiltEffect = (config?: Partial<TiltConfig>, disabled?: boolean) => {
  return useHoverEffect({
    effect: {
      type: '3d-tilt',
      intensity: config?.maxTilt || 15,
      duration: config?.speed || 300,
      easing: 'cubic-bezier(0.03, 0.98, 0.52, 0.99)'
    },
    config,
    disabled
  });
};

// Hook específico para efeito magnético
export const useMagneticEffect = (config?: Partial<MagneticConfig>, disabled?: boolean) => {
  return useHoverEffect({
    effect: {
      type: 'magnetic',
      intensity: (config?.strength || 0.3) * 100,
      duration: (config?.restoreSpeed || 0.15) * 1000,
      easing: 'ease-out'
    },
    config,
    disabled
  });
};

// Hook específico para efeito ripple
export const useRippleEffect = (config?: Partial<RippleConfig>, disabled?: boolean) => {
  return useHoverEffect({
    effect: {
      type: 'ripple',
      intensity: config?.size || 100,
      duration: config?.duration || 600,
      easing: config?.easing || 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    config,
    disabled
  });
};

// Hook específico para efeito glow
export const useGlowEffect = (config?: Partial<GlowConfig>, disabled?: boolean) => {
  return useHoverEffect({
    effect: {
      type: 'glow',
      intensity: config?.intensity || 50,
      duration: config?.duration || 300,
      easing: 'ease-out'
    },
    config,
    disabled
  });
};

// Hook para múltiplos efeitos
export const useMultipleHoverEffects = (effects: UseHoverEffectOptions[], disabled?: boolean) => {
  const elementRef = useRef<HTMLElement>(null);
  const { shouldAnimate, preferences } = useAnimationContext();

  useEffect(() => {
    const element = elementRef.current;
    if (!element || disabled || !shouldAnimate) return;

    effects.forEach(({ effect, config }) => {
      let adaptedEffect = { ...effect };
      
      if (preferences.prefersReducedMotion) {
        adaptedEffect = {
          ...adaptedEffect,
          intensity: Math.min(adaptedEffect.intensity * 0.5, 10),
          duration: Math.min(adaptedEffect.duration, 200)
        };
      }

      hoverEffectManager.applyEffect(element, adaptedEffect, config);
    });

    return () => {
      hoverEffectManager.removeEffect(element);
    };
  }, [effects, disabled, shouldAnimate, preferences]);

  return elementRef;
};

// Hook para efeitos condicionais baseados em estado
export const useConditionalHoverEffect = (
  options: UseHoverEffectOptions,
  condition: boolean
) => {
  return useHoverEffect({
    ...options,
    disabled: !condition || options.disabled
  });
};

// Hook para efeitos responsivos
export const useResponsiveHoverEffect = (
  desktopOptions: UseHoverEffectOptions,
  mobileOptions?: UseHoverEffectOptions
) => {
  const { preferences } = useAnimationContext();
  const isMobile = preferences.deviceType === 'mobile';
  
  const options = isMobile && mobileOptions ? mobileOptions : desktopOptions;
  
  return useHoverEffect(options);
};

// Hook para efeitos com callback
export const useHoverEffectWithCallback = (
  options: UseHoverEffectOptions,
  callbacks?: {
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
  }
) => {
  const elementRef = useHoverEffect(options);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !callbacks) return;

    const handleMouseEnter = () => {
      callbacks.onHoverStart?.();
    };

    const handleMouseLeave = () => {
      callbacks.onHoverEnd?.();
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [callbacks]);

  return elementRef;
};

// Hook para efeitos com delay
export const useDelayedHoverEffect = (
  options: UseHoverEffectOptions,
  delay: number = 100
) => {
  const elementRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { shouldAnimate } = useAnimationContext();

  const applyEffect = useCallback(() => {
    const element = elementRef.current;
    if (!element || options.disabled || !shouldAnimate) return;

    hoverEffectManager.applyEffect(element, options.effect, options.config);
  }, [options, shouldAnimate]);

  const removeEffect = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    hoverEffectManager.removeEffect(element);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(applyEffect, delay);
    };

    const handleMouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      removeEffect();
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      removeEffect();
    };
  }, [applyEffect, removeEffect, delay]);

  return elementRef;
};