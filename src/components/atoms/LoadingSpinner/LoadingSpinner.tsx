/**
 * LoadingSpinner - Componente atom para loading
 * Spinner reutilizável com múltiplas variantes
 */

import React, { forwardRef, useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/atoms/Typography';
import type { BaseComponentProps, ComponentSize } from '@/types/base';

// === VARIANTES DO SPINNER ===
const spinnerVariants = cva(
  // Classes base
  ['animate-spin'],
  {
    variants: {
      variant: {
        // Spinner circular padrão
        default: 'border-2 border-current border-t-transparent rounded-full',
        
        // Spinner com dots
        dots: 'flex items-center justify-center gap-1',
        
        // Spinner com pulse
        pulse: 'bg-current rounded-full animate-pulse',
        
        // Spinner com bars
        bars: 'flex items-end justify-center gap-1',
        
        // Spinner customizado
        custom: '',
      },
      
      size: {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
      },
      
      color: {
        default: 'text-current',
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        muted: 'text-muted-foreground',
      },
      
      speed: {
        slow: 'animate-spin-slow',
        normal: 'animate-spin',
        fast: 'animate-spin-fast',
      },
    },
    
    defaultVariants: {
      variant: 'default',
      size: 'md',
      color: 'primary',
      speed: 'normal',
    },
  }
);

// === INTERFACES ===
export interface LoadingSpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    BaseComponentProps,
    VariantProps<typeof spinnerVariants> {
  /** Texto de loading */
  readonly text?: string;
  /** Se deve mostrar o texto */
  readonly showText?: boolean;
  /** Posição do texto */
  readonly textPosition?: 'top' | 'bottom' | 'left' | 'right';
}

// === COMPONENTE DE DOTS ===
const DotsSpinner: React.FC<{ size: ComponentSize; color: string }> = ({ 
  size, 
  color 
}) => {
  const dotSizes = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
    xl: 'w-3 h-3',
  };

  const dotSize = dotSizes[size as keyof typeof dotSizes] || dotSizes.md;

  return (
    <div className="flex items-center justify-center gap-1">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            dotSize,
            'bg-current rounded-full animate-pulse',
            color
          )}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );
};

// === COMPONENTE DE BARS ===
const BarsSpinner: React.FC<{ size: ComponentSize; color: string }> = ({ 
  size, 
  color 
}) => {
  const barSizes = {
    xs: { width: 'w-0.5', heights: ['h-2', 'h-3', 'h-2'] },
    sm: { width: 'w-0.5', heights: ['h-3', 'h-4', 'h-3'] },
    md: { width: 'w-1', heights: ['h-4', 'h-6', 'h-4'] },
    lg: { width: 'w-1', heights: ['h-6', 'h-8', 'h-6'] },
    xl: { width: 'w-1.5', heights: ['h-8', 'h-12', 'h-8'] },
  };

  const { width, heights } = barSizes[size as keyof typeof barSizes] || barSizes.md;

  return (
    <div className="flex items-end justify-center gap-1">
      {heights.map((height, index) => (
        <div
          key={index}
          className={cn(
            width,
            height,
            'bg-current animate-pulse',
            color
          )}
          style={{
            animationDelay: `${index * 0.15}s`,
            animationDuration: '0.8s',
          }}
        />
      ))}
    </div>
  );
};

// === COMPONENTE PRINCIPAL ===
export const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  (
    {
      className,
      variant,
      size,
      color,
      speed,
      text = 'Carregando...',
      showText = false,
      textPosition = 'bottom',
      testId,
      ...props
    },
    ref
  ) => {
    // Classes computadas
    const spinnerClasses = useMemo(() => {
      if (variant === 'dots' || variant === 'bars') {
        return cn(color);
      }
      
      return cn(
        spinnerVariants({
          variant,
          size,
          color,
          speed,
        })
      );
    }, [variant, size, color, speed]);

    // Renderizar spinner baseado na variante
    const renderSpinner = useMemo(() => {
      switch (variant) {
        case 'dots':
          return <DotsSpinner size={size || 'md'} color={color || 'text-primary'} />;
        
        case 'bars':
          return <BarsSpinner size={size || 'md'} color={color || 'text-primary'} />;
        
        case 'pulse':
          return <div className={spinnerClasses} />;
        
        case 'custom':
          return <div className={cn(spinnerClasses, className)} />;
        
        default:
          return <div className={spinnerClasses} />;
      }
    }, [variant, size, color, spinnerClasses, className]);

    // Layout baseado na posição do texto
    const containerClasses = useMemo(() => {
      const baseClasses = 'inline-flex items-center justify-center';
      
      switch (textPosition) {
        case 'top':
          return cn(baseClasses, 'flex-col gap-2');
        case 'bottom':
          return cn(baseClasses, 'flex-col gap-2');
        case 'left':
          return cn(baseClasses, 'flex-row gap-3');
        case 'right':
          return cn(baseClasses, 'flex-row gap-3');
        default:
          return baseClasses;
      }
    }, [textPosition]);

    // Ordem dos elementos
    const isTextFirst = textPosition === 'top' || textPosition === 'left';

    return (
      <div
        ref={ref}
        className={cn(containerClasses, className)}
        role="status"
        aria-label={text}
        data-testid={testId}
        {...props}
      >
        {showText && isTextFirst && (
          <Typography
            variant="small"
            color="muted"
            className="animate-pulse"
          >
            {text}
          </Typography>
        )}
        
        {renderSpinner}
        
        {showText && !isTextFirst && (
          <Typography
            variant="small"
            color="muted"
            className="animate-pulse"
          >
            {text}
          </Typography>
        )}
        
        {/* Screen reader text */}
        <span className="sr-only">{text}</span>
      </div>
    );
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';

// === COMPONENTES DE CONVENIÊNCIA ===
export const SmallSpinner: React.FC<Omit<LoadingSpinnerProps, 'size'>> = (props) => (
  <LoadingSpinner size="sm" {...props} />
);

export const LargeSpinner: React.FC<Omit<LoadingSpinnerProps, 'size'>> = (props) => (
  <LoadingSpinner size="lg" {...props} />
);

export const DotsLoader: React.FC<Omit<LoadingSpinnerProps, 'variant'>> = (props) => (
  <LoadingSpinner variant="dots" {...props} />
);

export const BarsLoader: React.FC<Omit<LoadingSpinnerProps, 'variant'>> = (props) => (
  <LoadingSpinner variant="bars" {...props} />
);

export const PulseLoader: React.FC<Omit<LoadingSpinnerProps, 'variant'>> = (props) => (
  <LoadingSpinner variant="pulse" {...props} />
);

// === EXPORTS ===
export { spinnerVariants };
export type { LoadingSpinnerProps };