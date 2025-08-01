import { useState, useEffect } from 'react';
import { AnimationConfig } from '@/types/animations';

interface AnimationPreferences {
  prefersReducedMotion: boolean;
  isLowPowerMode: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

export const useAnimationPreferences = () => {
  const [preferences, setPreferences] = useState<AnimationPreferences>({
    prefersReducedMotion: false,
    isLowPowerMode: false,
    connectionSpeed: 'unknown',
    deviceType: 'desktop'
  });

  useEffect(() => {
    // Detectar preferência de movimento reduzido
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReducedMotion = () => {
      setPreferences(prev => ({
        ...prev,
        prefersReducedMotion: mediaQuery.matches
      }));
    };

    updateReducedMotion();
    mediaQuery.addEventListener('change', updateReducedMotion);

    // Detectar tipo de dispositivo
    const updateDeviceType = () => {
      const width = window.innerWidth;
      let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      
      if (width < 768) {
        deviceType = 'mobile';
      } else if (width < 1024) {
        deviceType = 'tablet';
      }

      setPreferences(prev => ({
        ...prev,
        deviceType
      }));
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);

    // Detectar velocidade de conexão (se disponível)
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const updateConnectionSpeed = () => {
        const effectiveType = connection.effectiveType;
        const connectionSpeed = ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast';
        
        setPreferences(prev => ({
          ...prev,
          connectionSpeed
        }));
      };

      updateConnectionSpeed();
      connection.addEventListener('change', updateConnectionSpeed);
    }

    // Detectar modo de economia de bateria (experimental)
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updatePowerMode = () => {
          setPreferences(prev => ({
            ...prev,
            isLowPowerMode: battery.level < 0.2 && !battery.charging
          }));
        };

        updatePowerMode();
        battery.addEventListener('levelchange', updatePowerMode);
        battery.addEventListener('chargingchange', updatePowerMode);
      });
    }

    return () => {
      mediaQuery.removeEventListener('change', updateReducedMotion);
      window.removeEventListener('resize', updateDeviceType);
    };
  }, []);

  // Função para adaptar configuração de animação baseada nas preferências
  const adaptAnimationConfig = (config: AnimationConfig): AnimationConfig => {
    let adaptedConfig = { ...config };

    // Se o usuário prefere movimento reduzido, simplificar animações
    if (preferences.prefersReducedMotion) {
      adaptedConfig = {
        ...adaptedConfig,
        type: 'fadeIn', // Usar apenas fade simples
        duration: Math.min(adaptedConfig.duration, 0.3), // Reduzir duração
        delay: 0 // Remover delays
      };
    }

    // Se está em modo de economia de bateria, reduzir complexidade
    if (preferences.isLowPowerMode) {
      adaptedConfig = {
        ...adaptedConfig,
        duration: Math.min(adaptedConfig.duration, 0.4),
        delay: Math.min(adaptedConfig.delay || 0, 0.1)
      };
    }

    // Ajustar para conexão lenta
    if (preferences.connectionSpeed === 'slow') {
      adaptedConfig = {
        ...adaptedConfig,
        duration: Math.min(adaptedConfig.duration, 0.5),
        delay: Math.min(adaptedConfig.delay || 0, 0.2)
      };
    }

    // Ajustar threshold baseado no tipo de dispositivo
    if (preferences.deviceType === 'mobile') {
      adaptedConfig.threshold = Math.min(adaptedConfig.threshold || 0.1, 0.05);
    }

    return adaptedConfig;
  };

  return {
    preferences,
    adaptAnimationConfig,
    shouldAnimate: !preferences.prefersReducedMotion || preferences.isLowPowerMode
  };
};

// Hook para performance de animações
export const useAnimationPerformance = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    fps: 60,
    isThrottled: false,
    activeAnimations: 0
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrame: number;

    const measureFPS = () => {
      const currentTime = performance.now();
      frameCount++;

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        setPerformanceMetrics(prev => ({
          ...prev,
          fps,
          isThrottled: fps < 30
        }));

        frameCount = 0;
        lastTime = currentTime;
      }

      animationFrame = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const shouldReduceAnimations = performanceMetrics.fps < 30 || performanceMetrics.activeAnimations > 10;

  return {
    performanceMetrics,
    shouldReduceAnimations,
    incrementActiveAnimations: () => {
      setPerformanceMetrics(prev => ({
        ...prev,
        activeAnimations: prev.activeAnimations + 1
      }));
    },
    decrementActiveAnimations: () => {
      setPerformanceMetrics(prev => ({
        ...prev,
        activeAnimations: Math.max(0, prev.activeAnimations - 1)
      }));
    }
  };
};