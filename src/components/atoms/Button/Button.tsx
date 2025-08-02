/**
 * Button - Componente atom fundamental
 * Botão reutilizável com múltiplas variantes e estados
 */

import React, { forwardRef, useMemo } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { DESIGN_TOKENS } from '@/constants/design-tokens';
import type { 
  BaseComponentProps, 
  LoadingProps, 
  DisabledProps,
  ClickHandler 
} from '@/types/base';

// === VARIANTES DO BOTÃO ===
const buttonVariants = cva(
  // Classes base
  [
    'inline-flex items-center justify-center gap-2',
    'whitespace-nowrap rounded-lg text-sm font-medium',
    'ring-offset-background transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    'relative overflow-hidden',
  ],
  {
    variants: {
      variant: {
        // Botão primário com gradiente
        primary: [
          'bg-gradient-to-r from-primary to-primary-glow',
          'text-primary-foreground shadow-soft',
          'hover:shadow-elegant hover:scale-105',
          'active:scale-95 active:shadow-sm',
          'focus-visible:ring-primary/50',
        ],
        
        // Botão secundário
        secondary: [
          'bg-secondary text-secondary-foreground',
          'border border-secondary/20 shadow-sm',
          'hover:bg-secondary/80 hover:shadow-md',
          'focus-visible:ring-secondary/50',
        ],
        
        // Botão de destaque
        accent: [
          'bg-gradient-to-r from-accent to-accent/80',
          'text-accent-foreground shadow-soft',
          'hover:shadow-elegant hover:scale-105',
          'active:scale-95',
          'focus-visible:ring-accent/50',
        ],
        
        // Botão fantasma
        ghost: [
          'bg-transparent border-2 border-primary/30',
          'text-primary hover:bg-primary/10',
          'hover:border-primary hover:shadow-soft',
          'focus-visible:ring-primary/50',
        ],
        
        // Botão outline
        outline: [
          'border border-input bg-background',
          'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:ring-ring/50',
        ],
        
        // Botão de link
        link: [
          'text-primary underline-offset-4',
          'hover:underline hover:text-primary-glow',
          'focus-visible:ring-primary/50',
        ],
        
        // Botão destrutivo
        destructive: [
          'bg-error text-error-foreground',
          'hover:bg-error/90 shadow-md',
          'focus-visible:ring-error/50',
        ],
      },
      
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-6 text-base',
        xl: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10 p-0',
      },
      
      loading: {
        true: 'cursor-wait',
        false: '',
      },
      
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      loading: false,
      fullWidth: false,
    },
  }
);

// === INTERFACES ===
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
    BaseComponentProps,
    LoadingProps,
    DisabledProps,
    VariantProps<typeof buttonVariants> {
  /** Se deve renderizar como Slot (para composição) */
  readonly asChild?: boolean;
  /** Ícone à esquerda do texto */
  readonly leftIcon?: React.ReactNode;
  /** Ícone à direita do texto */
  readonly rightIcon?: React.ReactNode;
  /** Handler de clique tipado */
  readonly onClick?: ClickHandler;
  /** Se o botão deve ocupar toda a largura */
  readonly fullWidth?: boolean;
  /** Texto alternativo para loading */
  readonly loadingText?: string;
}

// === COMPONENTE LOADING SPINNER ===
const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <svg
      className={cn('animate-spin', sizeClasses[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

// === COMPONENTE PRINCIPAL ===
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      loadingText,
      disabled,
      fullWidth,
      asChild = false,
      leftIcon,
      rightIcon,
      children,
      onClick,
      testId,
      ...props
    },
    ref
  ) => {
    // Componente a ser renderizado (button ou Slot)
    const Comp = asChild ? Slot : 'button';
    
    // Estado final de disabled
    const isDisabled = disabled || loading;
    
    // Classes computadas com memoização
    const computedClassName = useMemo(
      () =>
        cn(
          buttonVariants({
            variant,
            size,
            loading,
            fullWidth,
            className,
          })
        ),
      [variant, size, loading, fullWidth, className]
    );

    // Tamanho do spinner baseado no tamanho do botão
    const spinnerSize = useMemo(() => {
      switch (size) {
        case 'xs':
        case 'sm':
          return 'sm';
        case 'lg':
        case 'xl':
          return 'lg';
        default:
          return 'md';
      }
    }, [size]);

    // Handler de clique com prevenção durante loading
    const handleClick = useMemo(
      () =>
        loading
          ? undefined
          : onClick,
      [loading, onClick]
    );

    return (
      <Comp
        ref={ref}
        className={computedClassName}
        disabled={isDisabled}
        onClick={handleClick}
        data-testid={testId}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {/* Ícone esquerdo ou spinner */}
        {loading ? (
          <LoadingSpinner size={spinnerSize} />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}

        {/* Conteúdo do botão */}
        <span className={cn(loading && 'opacity-70')}>
          {loading && loadingText ? loadingText : children}
        </span>

        {/* Ícone direito (não mostrar durante loading) */}
        {!loading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}

        {/* Efeito de ripple (opcional) */}
        <span
          className="absolute inset-0 overflow-hidden rounded-[inherit]"
          aria-hidden="true"
        >
          <span className="absolute inset-0 rounded-[inherit] bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </span>
      </Comp>
    );
  }
);

Button.displayName = 'Button';

// === EXPORTS ===
export { buttonVariants };
export type { ButtonProps };