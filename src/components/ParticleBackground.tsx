import React, { forwardRef } from 'react';
import { useParticleSystem } from '@/hooks/useParticleSystem';
import { ParticleConfig } from '@/types/particles';
import { cn } from '@/lib/utils';

interface ParticleBackgroundProps {
  config: ParticleConfig;
  className?: string;
  interactive?: boolean;
  mouseInfluence?: {
    enabled: boolean;
    radius: number;
    strength: number;
    type: 'attract' | 'repel' | 'orbit';
  };
  responsive?: {
    mobile?: Partial<ParticleConfig>;
    tablet?: Partial<ParticleConfig>;
  };
  children?: React.ReactNode;
}

export const ParticleBackground = forwardRef<HTMLDivElement, ParticleBackgroundProps>(
  ({ 
    config, 
    className, 
    interactive = false, 
    mouseInfluence,
    responsive,
    children 
  }, ref) => {
    const { canvasRef, isInitialized } = useParticleSystem({
      config,
      interactive,
      mouseInfluence,
      responsive,
      autoStart: true,
      performance: {
        maxParticles: 500,
        cullOffscreen: true
      }
    });

    return (
      <div 
        ref={ref}
        className={cn("relative overflow-hidden", className)}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        />
        {children && (
          <div className="relative z-10">
            {children}
          </div>
        )}
      </div>
    );
  }
);

ParticleBackground.displayName = 'ParticleBackground';

// Componente para efeitos de partículas em hover
interface HoverParticleEffectProps {
  config: ParticleConfig;
  triggerCount?: number;
  cooldown?: number;
  className?: string;
  children: React.ReactNode;
}

export const HoverParticleEffect: React.FC<HoverParticleEffectProps> = ({
  config,
  triggerCount = 10,
  cooldown = 100,
  className,
  children
}) => {
  const elementRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { particleSystem } = useParticleSystem({
    config: {
      ...config,
      spawnRate: 0 // Não spawnar automaticamente
    },
    interactive: false,
    autoStart: true
  });

  const handleMouseEnter = React.useCallback((event: React.MouseEvent) => {
    if (!particleSystem || !elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Atualizar posição e adicionar partículas
    particleSystem.updateConfig({
      position: { x, y, spread: config.position.spread }
    });
    
    particleSystem.addParticles(triggerCount);
  }, [particleSystem, config.position.spread, triggerCount]);

  return (
    <div 
      ref={elementRef}
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />
      {children}
    </div>
  );
};

// Componente para partículas em seções específicas
interface SectionParticlesProps {
  preset: 'hero' | 'services' | 'portfolio' | 'contact';
  className?: string;
  children?: React.ReactNode;
}

export const SectionParticles: React.FC<SectionParticlesProps> = ({
  preset,
  className,
  children
}) => {
  // Configurações baseadas no preset
  const getPresetConfig = (): ParticleConfig => {
    switch (preset) {
      case 'hero':
        return {
          count: 30,
          spawnRate: 0.5,
          life: { min: 10, max: 15 },
          position: { x: 400, y: 300, spread: 600 },
          velocity: {
            x: { min: -10, max: 10 },
            y: { min: -15, max: -5 }
          },
          size: { min: 1, max: 4 },
          color: {
            start: '#3b82f6',
            random: ['#3b82f6', '#8b5cf6', '#06b6d4']
          },
          opacity: { start: 0.6, end: 0.1 },
          gravity: -5,
          friction: 0.005,
          shape: 'circle'
        };
      
      case 'services':
        return {
          count: 20,
          spawnRate: 0.3,
          life: { min: 8, max: 12 },
          position: { x: 200, y: 200, spread: 400 },
          velocity: {
            x: { min: -5, max: 5 },
            y: { min: -10, max: 10 }
          },
          size: { min: 2, max: 6 },
          color: {
            start: '#fbbf24',
            random: ['#fbbf24', '#f59e0b', '#d97706']
          },
          opacity: { start: 0.4, end: 0.1 },
          gravity: 0,
          friction: 0.01,
          shape: 'star'
        };
      
      case 'portfolio':
        return {
          count: 25,
          spawnRate: 1,
          life: { min: 6, max: 10 },
          position: { x: 300, y: 400, spread: 500 },
          velocity: {
            x: { min: -20, max: 20 },
            y: { min: -30, max: 30 }
          },
          size: { min: 1, max: 3 },
          color: {
            start: '#00ff41',
            random: ['#00ff41', '#00d4aa', '#0099ff']
          },
          opacity: { start: 0.7, end: 0.2 },
          gravity: 0,
          friction: 0.008,
          shape: 'square'
        };
      
      case 'contact':
        return {
          count: 15,
          spawnRate: 0.8,
          life: { min: 12, max: 18 },
          position: { x: 400, y: 500, spread: 300 },
          velocity: {
            x: { min: -15, max: 15 },
            y: { min: -40, max: -20 }
          },
          size: { min: 3, max: 8 },
          color: {
            start: '#06b6d4',
            random: ['#06b6d4', '#3b82f6', '#8b5cf6']
          },
          opacity: { start: 0.5, end: 0.1 },
          gravity: -10,
          friction: 0.005,
          shape: 'circle'
        };
      
      default:
        return {
          count: 10,
          spawnRate: 0.2,
          life: { min: 5, max: 8 },
          position: { x: 200, y: 200, spread: 200 },
          velocity: { x: { min: -10, max: 10 }, y: { min: -10, max: 10 } },
          size: { min: 2, max: 4 },
          color: { start: '#3b82f6' },
          opacity: { start: 0.5, end: 0.1 },
          shape: 'circle'
        };
    }
  };

  return (
    <ParticleBackground
      config={getPresetConfig()}
      className={className}
      interactive={preset === 'hero'}
      mouseInfluence={preset === 'hero' ? {
        enabled: true,
        radius: 100,
        strength: 0.5,
        type: 'attract'
      } : undefined}
      responsive={{
        mobile: {
          count: Math.floor(getPresetConfig().count * 0.5),
          spawnRate: getPresetConfig().spawnRate * 0.6
        },
        tablet: {
          count: Math.floor(getPresetConfig().count * 0.7),
          spawnRate: getPresetConfig().spawnRate * 0.8
        }
      }}
    >
      {children}
    </ParticleBackground>
  );
};