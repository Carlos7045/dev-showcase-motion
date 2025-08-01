import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAnimationPreferences, useAnimationPerformance } from '@/hooks/useAnimationPreferences';
import { AnimationConfig } from '@/types/animations';
import { scrollAnimationManager } from '@/lib/ScrollAnimationManager';

interface AnimationContextType {
  adaptAnimationConfig: (config: AnimationConfig) => AnimationConfig;
  shouldAnimate: boolean;
  preferences: ReturnType<typeof useAnimationPreferences>['preferences'];
  performanceMetrics: ReturnType<typeof useAnimationPerformance>['performanceMetrics'];
  shouldReduceAnimations: boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider = ({ children }: AnimationProviderProps) => {
  const { preferences, adaptAnimationConfig, shouldAnimate } = useAnimationPreferences();
  const { 
    performanceMetrics, 
    shouldReduceAnimations
  } = useAnimationPerformance();

  useEffect(() => {
    // Configurar CSS custom properties para animações
    const root = document.documentElement;
    
    if (preferences.prefersReducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms');
      root.style.setProperty('--animation-delay', '0ms');
    } else {
      root.style.setProperty('--animation-duration', '');
      root.style.setProperty('--animation-delay', '');
    }

    // Pausar animações se performance estiver ruim
    if (shouldReduceAnimations) {
      scrollAnimationManager.pause();
    } else {
      scrollAnimationManager.resume();
    }
  }, [preferences.prefersReducedMotion, shouldReduceAnimations]);

  // Cleanup no unmount
  useEffect(() => {
    return () => {
      scrollAnimationManager.destroy();
    };
  }, []);

  const contextValue: AnimationContextType = {
    adaptAnimationConfig,
    shouldAnimate,
    preferences,
    performanceMetrics,
    shouldReduceAnimations
  };

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimationContext must be used within an AnimationProvider');
  }
  return context;
};

// Hook para registrar/desregistrar animações ativas
export const useAnimationLifecycle = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimationLifecycle must be used within an AnimationProvider');
  }

  return {
    activeAnimations: context.performanceMetrics.activeAnimations
  };
};