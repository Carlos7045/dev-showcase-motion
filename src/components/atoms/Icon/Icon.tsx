/**
 * Icon - Componente atom para ícones
 * Sistema de ícones consistente com lazy loading e acessibilidade
 */

import React, { forwardRef, useMemo, Suspense, lazy } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { DESIGN_TOKENS } from '@/constants/design-tokens';
import type { BaseComponentProps, ComponentSize, ColorVariant } from '@/types/base';

// === VARIANTES DO ÍCONE ===
const iconVariants = cva(
  // Classes base
  [
    'inline-flex items-center justify-center',
    'shrink-0 transition-all duration-200',
  ],
  {
    variants: {
      size: {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8',
        '2xl': 'w-10 h-10',
        '3xl': 'w-12 h-12',
      },
      
      color: {
        default: 'text-current',
        muted: 'text-muted-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error',
        info: 'text-info',
      },
      
      variant: {
        default: '',
        filled: 'bg-current text-background rounded-full p-1',
        outlined: 'border-2 border-current rounded-full p-1',
        ghost: 'hover:bg-current/10 rounded-full p-1 transition-colors',
      },
      
      spin: {
        true: 'animate-spin',
        false: '',
      },
      
      pulse: {
        true: 'animate-pulse',
        false: '',
      },
      
      bounce: {
        true: 'animate-bounce',
        false: '',
      },
    },
    
    defaultVariants: {
      size: 'md',
      color: 'default',
      variant: 'default',
      spin: false,
      pulse: false,
      bounce: false,
    },
  }
);

// === INTERFACES ===
export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'color'>,
    BaseComponentProps,
    VariantProps<typeof iconVariants> {
  /** Nome do ícone (para ícones do Lucide React) */
  readonly name?: string;
  /** Componente de ícone customizado */
  readonly icon?: React.ComponentType<any>;
  /** Título para acessibilidade */
  readonly title?: string;
  /** Se o ícone é decorativo (aria-hidden) */
  readonly decorative?: boolean;
  /** Stroke width para ícones SVG */
  readonly strokeWidth?: number;
}

// === COMPONENTE DE LOADING ===
const IconSkeleton: React.FC<{ size?: ComponentSize }> = ({ size = 'md' }) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-muted rounded',
        sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.md
      )}
      aria-hidden="true"
    />
  );
};

// === CACHE DE ÍCONES LAZY ===
const iconCache = new Map<string, React.ComponentType<any>>();

// === FUNÇÃO PARA CARREGAR ÍCONES DINAMICAMENTE ===
const loadIcon = (iconName: string) => {
  if (iconCache.has(iconName)) {
    return iconCache.get(iconName)!;
  }

  const LazyIcon = lazy(async () => {
    try {
      // Tentar carregar do Lucide React
      const lucideModule = await import('lucide-react');
      const IconComponent = (lucideModule as any)[iconName];
      
      if (IconComponent) {
        return { default: IconComponent };
      }
      
      // Fallback para ícone não encontrado
      return { default: lucideModule.HelpCircle };
    } catch (error) {
      console.warn(`Failed to load icon: ${iconName}`, error);
      // Fallback para erro de carregamento
      const { HelpCircle } = await import('lucide-react');
      return { default: HelpCircle };
    }
  });

  iconCache.set(iconName, LazyIcon);
  return LazyIcon;
};

// === COMPONENTE PRINCIPAL ===
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      className,
      size,
      color,
      variant,
      spin,
      pulse,
      bounce,
      name,
      icon: CustomIcon,
      title,
      decorative = false,
      strokeWidth = 2,
      testId,
      children,
      ...props
    },
    ref
  ) => {
    // Classes computadas
    const computedClassName = useMemo(
      () =>
        cn(
          iconVariants({
            size,
            color,
            variant,
            spin,
            pulse,
            bounce,
          }),
          className
        ),
      [size, color, variant, spin, pulse, bounce, className]
    );

    // Determinar qual ícone renderizar
    const IconComponent = useMemo(() => {
      if (CustomIcon) return CustomIcon;
      if (name) return loadIcon(name);
      return null;
    }, [CustomIcon, name]);

    // Props de acessibilidade
    const accessibilityProps = useMemo(() => {
      const props: Record<string, any> = {};
      
      if (decorative) {
        props['aria-hidden'] = true;
      } else if (title) {
        props['aria-label'] = title;
        props['role'] = 'img';
      }
      
      return props;
    }, [decorative, title]);

    // Props do SVG
    const svgProps = useMemo(
      () => ({
        ref,
        className: computedClassName,
        strokeWidth,
        'data-testid': testId,
        ...accessibilityProps,
        ...props,
      }),
      [ref, computedClassName, strokeWidth, testId, accessibilityProps, props]
    );

    // Renderizar ícone customizado ou children
    if (CustomIcon) {
      return <CustomIcon {...svgProps}>{children}</CustomIcon>;
    }

    // Renderizar children diretamente (SVG customizado)
    if (children && !name) {
      return (
        <svg
          {...svgProps}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          {title && <title>{title}</title>}
          {children}
        </svg>
      );
    }

    // Renderizar ícone do Lucide com lazy loading
    if (IconComponent && name) {
      return (
        <Suspense fallback={<IconSkeleton size={size} />}>
          <IconComponent {...svgProps}>
            {title && <title>{title}</title>}
          </IconComponent>
        </Suspense>
      );
    }

    // Fallback para quando não há ícone
    return (
      <div
        className={computedClassName}
        data-testid={testId}
        {...accessibilityProps}
      >
        <span className="text-xs">?</span>
      </div>
    );
  }
);

Icon.displayName = 'Icon';

// === COMPONENTES DE CONVENIÊNCIA ===
export const LoadingIcon: React.FC<Omit<IconProps, 'name' | 'spin'>> = (props) => (
  <Icon name="Loader2" spin {...props} />
);

export const CheckIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="Check" {...props} />
);

export const XIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="X" {...props} />
);

export const ChevronDownIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="ChevronDown" {...props} />
);

export const ChevronUpIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="ChevronUp" {...props} />
);

export const ChevronLeftIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="ChevronLeft" {...props} />
);

export const ChevronRightIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="ChevronRight" {...props} />
);

export const ExternalLinkIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="ExternalLink" {...props} />
);

export const GithubIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="Github" {...props} />
);

export const LinkedinIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="Linkedin" {...props} />
);

export const MailIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="Mail" {...props} />
);

export const PhoneIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="Phone" {...props} />
);

export const MapPinIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="MapPin" {...props} />
);

// === EXPORTS ===
export { iconVariants };
export type { IconProps };