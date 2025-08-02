/**
 * Card - Componente molecule
 * Container reutilizável com múltiplas variantes e efeitos
 */

import React, { forwardRef, useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { DESIGN_TOKENS } from '@/constants/design-tokens';
import type { 
  BaseComponentProps, 
  AnimationProps,
  ClickHandler 
} from '@/types/base';

// === VARIANTES DO CARD ===
const cardVariants = cva(
  // Classes base
  [
    'relative overflow-hidden rounded-2xl',
    'transition-all duration-500 ease-out',
    'border border-border/50',
  ],
  {
    variants: {
      variant: {
        // Card padrão
        default: [
          'bg-card text-card-foreground',
          'shadow-sm hover:shadow-md',
        ],
        
        // Card premium com gradiente
        premium: [
          'bg-gradient-to-br from-card to-card/80',
          'backdrop-blur-sm border-primary/20',
          'shadow-soft hover:shadow-elegant',
          'hover:border-primary/40 hover:-translate-y-2',
        ],
        
        // Card de projeto
        project: [
          'bg-gradient-to-br from-card to-muted/20',
          'border-border hover:border-primary/30',
          'shadow-sm hover:shadow-dramatic hover:scale-105',
        ],
        
        // Card com glow
        glow: [
          'bg-card/90 backdrop-blur-sm',
          'border-primary/30 shadow-glow',
          'hover:shadow-[0_0_80px_hsl(var(--primary-glow)_/_0.4)]',
        ],
        
        // Card fantasma
        ghost: [
          'bg-transparent border-primary/20',
          'hover:bg-card/50 hover:border-primary/40',
        ],
        
        // Card outline
        outline: [
          'bg-transparent border-2 border-border',
          'hover:bg-card/30 hover:border-primary/50',
        ],
      },
      
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      
      interactive: {
        true: [
          'cursor-pointer select-none',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-primary focus-visible:ring-offset-2',
          'active:scale-[0.98] active:transition-transform active:duration-100',
        ],
        false: '',
      },
      
      loading: {
        true: 'animate-pulse cursor-wait',
        false: '',
      },
    },
    
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
      loading: false,
    },
  }
);

// === INTERFACES ===
export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>,
    BaseComponentProps,
    AnimationProps,
    VariantProps<typeof cardVariants> {
  /** Handler de clique (torna o card interativo automaticamente) */
  readonly onClick?: ClickHandler;
  /** Se deve mostrar estado de loading */
  readonly loading?: boolean;
  /** Elemento de header do card */
  readonly header?: React.ReactNode;
  /** Elemento de footer do card */
  readonly footer?: React.ReactNode;
  /** Imagem de fundo */
  readonly backgroundImage?: string;
  /** Overlay sobre a imagem de fundo */
  readonly overlay?: boolean;
  /** Intensidade do blur do backdrop */
  readonly blurIntensity?: 'sm' | 'md' | 'lg';
}

// === COMPONENTE DE LOADING ===
const CardSkeleton: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({ 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6', 
    lg: 'p-8',
    xl: 'p-10',
  };

  return (
    <div className={cn('animate-pulse bg-muted rounded-2xl', sizeClasses[size])}>
      <div className="space-y-4">
        <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
        <div className="h-4 bg-muted-foreground/20 rounded w-1/2" />
        <div className="h-20 bg-muted-foreground/20 rounded" />
      </div>
    </div>
  );
};

// === COMPONENTE PRINCIPAL ===
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      size,
      interactive,
      loading = false,
      onClick,
      header,
      footer,
      children,
      backgroundImage,
      overlay = false,
      blurIntensity = 'md',
      animate = true,
      animationDelay = 0,
      animationDirection = 'up',
      testId,
      ...props
    },
    ref
  ) => {
    // Determinar se é interativo
    const isInteractive = useMemo(
      () => interactive || !!onClick,
      [interactive, onClick]
    );

    // Classes computadas
    const computedClassName = useMemo(() => {
      const baseClasses = cardVariants({
        variant,
        size,
        interactive: isInteractive,
        loading,
      });

      const blurClasses = {
        sm: 'backdrop-blur-sm',
        md: 'backdrop-blur-md',
        lg: 'backdrop-blur-lg',
      };

      const animationClasses = animate
        ? `animate-fade-in-${animationDirection}`
        : '';

      return cn(
        baseClasses,
        backgroundImage && blurClasses[blurIntensity],
        animationClasses,
        className
      );
    }, [
      variant,
      size,
      isInteractive,
      loading,
      backgroundImage,
      blurIntensity,
      animate,
      animationDirection,
      className,
    ]);

    // Estilos inline para imagem de fundo
    const backgroundStyles = useMemo(() => {
      if (!backgroundImage) return {};
      
      return {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
    }, [backgroundImage]);

    // Props de animação
    const animationProps = useMemo(() => {
      if (!animate) return {};
      
      return {
        style: {
          animationDelay: `${animationDelay}ms`,
          ...backgroundStyles,
        },
      };
    }, [animate, animationDelay, backgroundStyles]);

    // Handler de clique com prevenção durante loading
    const handleClick = useMemo(
      () => (loading ? undefined : onClick),
      [loading, onClick]
    );

    // Renderizar skeleton durante loading
    if (loading) {
      return <CardSkeleton size={size} />;
    }

    return (
      <div
        ref={ref}
        className={computedClassName}
        onClick={handleClick}
        data-testid={testId}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={
          isInteractive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClick?.(e as any);
                }
              }
            : undefined
        }
        {...animationProps}
        {...props}
      >
        {/* Overlay para imagem de fundo */}
        {backgroundImage && overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        )}

        {/* Header */}
        {header && (
          <div className="relative z-10 mb-4 border-b border-border/50 pb-4">
            {header}
          </div>
        )}

        {/* Conteúdo principal */}
        <div className="relative z-10 flex-1">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="relative z-10 mt-4 border-t border-border/50 pt-4">
            {footer}
          </div>
        )}

        {/* Efeito de hover para cards interativos */}
        {isInteractive && (
          <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300 hover:opacity-100 pointer-events-none" />
        )}

        {/* Indicador de loading */}
        {loading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

// === COMPONENTES DE CONVENIÊNCIA ===
export const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & BaseComponentProps
>(({ className, children, testId, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    data-testid={testId}
    {...props}
  >
    {children}
  </div>
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & BaseComponentProps
>(({ className, children, testId, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    data-testid={testId}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & BaseComponentProps
>(({ className, children, testId, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    data-testid={testId}
    {...props}
  >
    {children}
  </p>
));
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & BaseComponentProps
>(({ className, children, testId, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1', className)}
    data-testid={testId}
    {...props}
  >
    {children}
  </div>
));
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & BaseComponentProps
>(({ className, children, testId, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center', className)}
    data-testid={testId}
    {...props}
  >
    {children}
  </div>
));
CardFooter.displayName = 'CardFooter';

// === EXPORTS ===
export { cardVariants };
export type { CardProps };