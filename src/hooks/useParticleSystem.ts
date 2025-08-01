import { useEffect, useRef, useState, useCallback } from 'react';
import { ParticleSystem } from '@/lib/ParticleSystem';
import { ParticleConfig, ParticleSystemConfig } from '@/types/particles';
import { useAnimationContext } from '@/components/AnimationProvider';

interface UseParticleSystemOptions {
  config: ParticleConfig;
  interactive?: boolean;
  mouseInfluence?: ParticleSystemConfig['mouseInfluence'];
  performance?: ParticleSystemConfig['performance'];
  autoStart?: boolean;
  responsive?: {
    mobile?: Partial<ParticleConfig>;
    tablet?: Partial<ParticleConfig>;
  };
}

export const useParticleSystem = (options: UseParticleSystemOptions) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const { shouldAnimate, preferences } = useAnimationContext();

  // Adaptar configuração baseada no dispositivo
  const getAdaptedConfig = useCallback((): ParticleConfig => {
    let adaptedConfig = { ...options.config };

    // Aplicar configurações responsivas
    if (options.responsive) {
      if (preferences.deviceType === 'mobile' && options.responsive.mobile) {
        adaptedConfig = { ...adaptedConfig, ...options.responsive.mobile };
      } else if (preferences.deviceType === 'tablet' && options.responsive.tablet) {
        adaptedConfig = { ...adaptedConfig, ...options.responsive.tablet };
      }
    }

    // Reduzir partículas se movimento reduzido estiver ativo
    if (preferences.prefersReducedMotion) {
      adaptedConfig = {
        ...adaptedConfig,
        count: Math.floor(adaptedConfig.count * 0.3),
        spawnRate: adaptedConfig.spawnRate * 0.5,
        life: {
          min: Math.min(adaptedConfig.life.min, 2),
          max: Math.min(adaptedConfig.life.max, 3)
        }
      };
    }

    return adaptedConfig;
  }, [options.config, options.responsive, preferences]);

  // Inicializar sistema de partículas
  const initialize = useCallback(() => {
    if (!canvasRef.current || particleSystemRef.current) return;

    try {
      const systemConfig: ParticleSystemConfig = {
        canvas: canvasRef.current,
        config: getAdaptedConfig(),
        interactive: options.interactive,
        mouseInfluence: options.mouseInfluence,
        performance: options.performance
      };

      particleSystemRef.current = new ParticleSystem(systemConfig);
      setIsInitialized(true);

      if (options.autoStart !== false && shouldAnimate) {
        particleSystemRef.current.start();
        setIsRunning(true);
      }
    } catch (error) {
      console.error('Failed to initialize particle system:', error);
    }
  }, [getAdaptedConfig, options.interactive, options.mouseInfluence, options.performance, options.autoStart, shouldAnimate]);

  // Cleanup
  const cleanup = useCallback(() => {
    if (particleSystemRef.current) {
      particleSystemRef.current.destroy();
      particleSystemRef.current = null;
      setIsInitialized(false);
      setIsRunning(false);
    }
  }, []);

  // Inicializar quando canvas estiver disponível
  useEffect(() => {
    if (canvasRef.current && !particleSystemRef.current) {
      initialize();
    }

    return cleanup;
  }, [initialize, cleanup]);

  // Reagir a mudanças nas preferências de animação
  useEffect(() => {
    if (!particleSystemRef.current) return;

    if (shouldAnimate && !isRunning) {
      particleSystemRef.current.start();
      setIsRunning(true);
    } else if (!shouldAnimate && isRunning) {
      particleSystemRef.current.stop();
      setIsRunning(false);
    }
  }, [shouldAnimate, isRunning]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (particleSystemRef.current) {
        particleSystemRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Métodos de controle
  const start = useCallback(() => {
    if (particleSystemRef.current && shouldAnimate) {
      particleSystemRef.current.start();
      setIsRunning(true);
    }
  }, [shouldAnimate]);

  const stop = useCallback(() => {
    if (particleSystemRef.current) {
      particleSystemRef.current.stop();
      setIsRunning(false);
    }
  }, []);

  const updateConfig = useCallback((newConfig: Partial<ParticleConfig>) => {
    if (particleSystemRef.current) {
      const adaptedConfig = { ...getAdaptedConfig(), ...newConfig };
      particleSystemRef.current.updateConfig(adaptedConfig);
    }
  }, [getAdaptedConfig]);

  const addParticles = useCallback((count: number) => {
    if (particleSystemRef.current) {
      particleSystemRef.current.addParticles(count);
    }
  }, []);

  const clear = useCallback(() => {
    if (particleSystemRef.current) {
      particleSystemRef.current.clear();
    }
  }, []);

  const getParticleCount = useCallback((): number => {
    return particleSystemRef.current?.getParticleCount() || 0;
  }, []);

  return {
    canvasRef,
    isInitialized,
    isRunning,
    start,
    stop,
    updateConfig,
    addParticles,
    clear,
    getParticleCount,
    particleSystem: particleSystemRef.current
  };
};

// Hook para efeitos de partículas em hover
export const useHoverParticles = (
  config: ParticleConfig,
  options?: {
    triggerCount?: number;
    cooldown?: number;
  }
) => {
  const elementRef = useRef<HTMLElement>(null);
  const [particleSystem, setParticleSystem] = useState<ParticleSystem | null>(null);
  const cooldownRef = useRef<boolean>(false);

  const triggerParticles = useCallback((event: MouseEvent) => {
    if (!particleSystem || cooldownRef.current) return;

    const rect = elementRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Atualizar posição das partículas
    particleSystem.updateConfig({
      ...config,
      position: { x, y, spread: config.position.spread }
    });

    // Adicionar partículas
    particleSystem.addParticles(options?.triggerCount || 10);

    // Aplicar cooldown
    cooldownRef.current = true;
    setTimeout(() => {
      cooldownRef.current = false;
    }, options?.cooldown || 100);
  }, [particleSystem, config, options]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Criar canvas para partículas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '10';
    
    const rect = element.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    element.style.position = 'relative';
    element.appendChild(canvas);

    // Criar sistema de partículas
    const system = new ParticleSystem({
      canvas,
      config,
      interactive: false
    });

    system.start();
    setParticleSystem(system);

    // Adicionar event listener
    element.addEventListener('mouseenter', triggerParticles);

    return () => {
      element.removeEventListener('mouseenter', triggerParticles);
      system.destroy();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, [config, triggerParticles]);

  return {
    elementRef,
    triggerParticles: (event: MouseEvent) => triggerParticles(event)
  };
};