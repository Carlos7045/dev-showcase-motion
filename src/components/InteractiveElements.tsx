import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { 
  useTiltEffect, 
  useMagneticEffect, 
  useRippleEffect, 
  useGlowEffect,
  useMultipleHoverEffects 
} from '@/hooks/useHoverEffects';
import { TiltConfig, MagneticConfig, RippleConfig, GlowConfig } from '@/types/interactions';
import { cn } from '@/lib/utils';

// Componente com efeito 3D Tilt
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  config?: Partial<TiltConfig>;
  disabled?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export const TiltCard = forwardRef<HTMLElement, TiltCardProps>(
  ({ children, className, config, disabled, as = 'div' }, forwardedRef) => {
    const tiltRef = useTiltEffect(config, disabled);
    
    const Component = as;

    return (
      <Component
        ref={forwardedRef || tiltRef}
        className={cn("transform-gpu", className)}
      >
        {children}
      </Component>
    );
  }
);

TiltCard.displayName = 'TiltCard';

// Componente com efeito magnético
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  config?: Partial<MagneticConfig>;
  disabled?: boolean;
  onClick?: () => void;
  as?: keyof JSX.IntrinsicElements;
}

export const MagneticButton = forwardRef<HTMLElement, MagneticButtonProps>(
  ({ children, className, config, disabled, onClick, as = 'button' }, forwardedRef) => {
    const magneticRef = useMagneticEffect(config, disabled);
    
    const Component = as;

    return (
      <Component
        ref={forwardedRef || magneticRef}
        className={cn("cursor-pointer transform-gpu", className)}
        onClick={onClick}
      >
        {children}
      </Component>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';

// Componente com efeito ripple
interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  config?: Partial<RippleConfig>;
  disabled?: boolean;
  onClick?: () => void;
}

export const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ children, className, config, disabled, onClick }, forwardedRef) => {
    const rippleRef = useRippleEffect(config, disabled);

    return (
      <button
        ref={forwardedRef || rippleRef}
        className={cn("relative overflow-hidden", className)}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

RippleButton.displayName = 'RippleButton';

// Componente com efeito glow
interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  config?: Partial<GlowConfig>;
  disabled?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export const GlowCard = forwardRef<HTMLElement, GlowCardProps>(
  ({ children, className, config, disabled, as = 'div' }, forwardedRef) => {
    const glowRef = useGlowEffect(config, disabled);
    
    const Component = as;

    return (
      <Component
        ref={forwardedRef || glowRef}
        className={cn("transition-shadow duration-300", className)}
      >
        {children}
      </Component>
    );
  }
);

GlowCard.displayName = 'GlowCard';

// Componente com múltiplos efeitos
interface MultiEffectCardProps {
  children: React.ReactNode;
  className?: string;
  effects: ('tilt' | 'magnetic' | 'glow' | 'scale')[];
  intensity?: number;
  disabled?: boolean;
}

export const MultiEffectCard = forwardRef<HTMLDivElement, MultiEffectCardProps>(
  ({ children, className, effects, intensity = 50, disabled }, forwardedRef) => {
    const effectConfigs = effects.map(effect => {
      switch (effect) {
        case 'tilt':
          return {
            effect: {
              type: '3d-tilt' as const,
              intensity: intensity * 0.3,
              duration: 300,
              easing: 'cubic-bezier(0.03, 0.98, 0.52, 0.99)'
            },
            config: {
              maxTilt: intensity * 0.3,
              scale: 1 + (intensity / 1000),
              glare: true
            }
          };
        
        case 'magnetic':
          return {
            effect: {
              type: 'magnetic' as const,
              intensity: intensity * 0.6,
              duration: 150,
              easing: 'ease-out'
            },
            config: {
              strength: intensity / 200,
              radius: intensity * 2
            }
          };
        
        case 'glow':
          return {
            effect: {
              type: 'glow' as const,
              intensity: intensity,
              duration: 300,
              easing: 'ease-out'
            },
            config: {
              color: '#3b82f6',
              size: intensity * 0.4,
              spread: intensity * 0.2
            }
          };
        
        case 'scale':
          return {
            effect: {
              type: 'scale' as const,
              intensity: intensity * 0.1,
              duration: 200,
              easing: 'ease-out'
            }
          };
        
        default:
          return {
            effect: {
              type: 'scale' as const,
              intensity: 5,
              duration: 200,
              easing: 'ease-out'
            }
          };
      }
    });

    const multiEffectRef = useMultipleHoverEffects(effectConfigs, disabled);

    return (
      <div
        ref={forwardedRef || multiEffectRef}
        className={cn("transform-gpu transition-all", className)}
      >
        {children}
      </div>
    );
  }
);

MultiEffectCard.displayName = 'MultiEffectCard';

// Componente de serviço com efeitos avançados
interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  className,
  onClick
}) => {
  return (
    <MultiEffectCard
      effects={['tilt', 'glow', 'scale']}
      intensity={30}
      className={cn(
        "p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg cursor-pointer",
        "border border-gray-200 dark:border-gray-700",
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {icon && (
          <div className="text-4xl text-blue-600 dark:text-blue-400">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </MultiEffectCard>
  );
};

// Componente de botão CTA com efeitos
interface CTAButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled
}) => {
  const baseClasses = "font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <MagneticButton
      as="button"
      config={{
        strength: 0.4,
        radius: 80,
        restoreSpeed: 0.2
      }}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <RippleButton
        config={{
          color: variant === 'outline' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.3)',
          duration: 500,
          size: 120
        }}
        disabled={disabled}
        className="w-full h-full"
      >
        {children}
      </RippleButton>
    </MagneticButton>
  );
};

// Componente de portfolio item com efeitos
interface PortfolioItemProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  className?: string;
  onClick?: () => void;
}

export const PortfolioItem: React.FC<PortfolioItemProps> = ({
  title,
  description,
  image,
  tags,
  className,
  onClick
}) => {
  return (
    <TiltCard
      config={{
        maxTilt: 10,
        scale: 1.02,
        glare: true,
        glareMaxOpacity: 0.3
      }}
      className={cn(
        "group cursor-pointer overflow-hidden rounded-lg shadow-lg",
        "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
        className
      )}
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </TiltCard>
  );
};