/**
 * NavigationItem - Componente molecule
 * Item de navegação reutilizável com estados e animações
 */

import React, { forwardRef, useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import type { 
  BaseComponentProps,
  ClickHandler 
} from '@/types/base';

// === VARIANTES DO NAVIGATION ITEM ===
const navigationItemVariants = cva(
  // Classes base
  [
    'relative inline-flex items-center gap-2',
    'transition-all duration-300 ease-out',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-primary focus-visible:ring-offset-2',
    'group cursor-pointer select-none',
  ],
  {
    variants: {
      variant: {
        // Link padrão
        default: [
          'text-muted-foreground hover:text-foreground',
          'hover:scale-105 active:scale-95',
        ],
        
        // Link com underline animado
        underline: [
          'text-muted-foreground hover:text-foreground',
          'relative after:content-[""] after:absolute after:w-full',
          'after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0',
          'after:bg-gradient-to-r after:from-primary after:to-accent',
          'after:origin-bottom-right after:transition-transform after:duration-300',
          'hover:after:scale-x-100 hover:after:origin-bottom-left',
        ],
        
        // Botão de navegação
        button: [
          'px-4 py-2 rounded-lg bg-card/50 border border-primary/20',
          'text-card-foreground hover:bg-card hover:border-primary/40',
          'hover:shadow-md hover:scale-105',
        ],
        
        // Item de menu
        menu: [
          'w-full px-3 py-2 rounded-md text-left',
          'text-muted-foreground hover:text-foreground',
          'hover:bg-accent/10 hover:translate-x-1',
        ],
        
        // Tab de navegação
        tab: [
          'px-4 py-2 border-b-2 border-transparent',
          'text-muted-foreground hover:text-foreground',
          'hover:border-primary/50 data-[active=true]:border-primary',
          'data-[active=true]:text-primary data-[active=true]:font-medium',
        ],
        
        // Breadcrumb
        breadcrumb: [
          'text-muted-foreground hover:text-primary',
          'text-sm font-medium',
        ],
      },
      
      size: {
        sm: 'text-sm gap-1.5',
        md: 'text-base gap-2',
        lg: 'text-lg gap-2.5',
      },
      
      active: {
        true: 'text-primary font-medium',
        false: '',
      },
      
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    
    defaultVariants: {
      variant: 'default',
      size: 'md',
      active: false,
      disabled: false,
    },
  }
);

// === INTERFACES ===
export interface NavigationItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>,
    BaseComponentProps,
    VariantProps<typeof navigationItemVariants> {
  /** Texto do item */
  readonly label: string;
  /** URL de destino */
  readonly href?: string;
  /** Ícone do item */
  readonly icon?: string;
  /** Se está ativo */
  readonly active?: boolean;
  /** Se está desabilitado */
  readonly disabled?: boolean;
  /** Handler de clique */
  readonly onClick?: ClickHandler;
  /** Se deve abrir em nova aba */
  readonly external?: boolean;
  /** Badge/contador */
  readonly badge?: string | number;
  /** Cor do badge */
  readonly badgeColor?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  /** Se deve fazer scroll suave para âncoras */
  readonly smoothScroll?: boolean;
}

// === COMPONENTE DE BADGE ===
const NavigationBadge: React.FC<{
  value: string | number;
  color: NavigationItemProps['badgeColor'];
}> = ({ value, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-error text-error-foreground',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'min-w-[1.25rem] h-5 px-1.5 rounded-full',
        'text-xs font-medium leading-none',
        colorClasses[color]
      )}
    >
      {value}
    </span>
  );
};

// === COMPONENTE PRINCIPAL ===
export const NavigationItem = forwardRef<HTMLAnchorElement, NavigationItemProps>(
  (
    {
      className,
      variant,
      size,
      active = false,
      disabled = false,
      label,
      href,
      icon,
      onClick,
      external = false,
      badge,
      badgeColor = 'primary',
      smoothScroll = true,
      testId,
      ...props
    },
    ref
  ) => {
    // Classes computadas
    const computedClassName = useMemo(
      () =>
        cn(
          navigationItemVariants({
            variant,
            size,
            active,
            disabled,
          }),
          className
        ),
      [variant, size, active, disabled, className]
    );

    // Props do link
    const linkProps = useMemo(() => {
      const baseProps = {
        'data-active': active,
        'data-testid': testId,
        ...props,
      };

      if (href) {
        const isAnchor = href.startsWith('#');
        
        return {
          ...baseProps,
          href,
          ...(external && !isAnchor && {
            target: '_blank',
            rel: 'noopener noreferrer',
          }),
        };
      }

      return baseProps;
    }, [href, active, external, testId, props]);

    // Handler de clique com scroll suave para âncoras
    const handleClick = useMemo(() => {
      if (disabled) return undefined;

      return (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Chamar handler customizado se existir
        onClick?.(e);

        // Scroll suave para âncoras
        if (href?.startsWith('#') && smoothScroll && !e.defaultPrevented) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
            
            // Atualizar URL sem recarregar
            window.history.pushState(null, '', href);
          }
        }
      };
    }, [disabled, onClick, href, smoothScroll]);

    // Tamanho do ícone baseado no tamanho do componente
    const iconSize = useMemo(() => {
      const sizeMap = {
        sm: 'sm' as const,
        md: 'md' as const,
        lg: 'lg' as const,
      };
      return sizeMap[size || 'md'];
    }, [size]);

    // Elemento a ser renderizado
    const Element = href ? 'a' : 'button';

    return (
      <Element
        ref={ref as any}
        className={computedClassName}
        onClick={handleClick}
        disabled={disabled && Element === 'button'}
        {...linkProps}
      >
        {/* Ícone */}
        {icon && (
          <Icon
            name={icon}
            size={iconSize}
            className={cn(
              'transition-colors duration-300',
              active ? 'text-primary' : 'text-current'
            )}
          />
        )}

        {/* Label */}
        <Typography
          variant="small"
          className={cn(
            'font-medium transition-colors duration-300',
            active && 'text-primary'
          )}
        >
          {label}
        </Typography>

        {/* Badge */}
        {badge && (
          <NavigationBadge value={badge} color={badgeColor} />
        )}

        {/* Indicador de ativo (para variant tab) */}
        {variant === 'tab' && active && (
          <span
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
            aria-hidden="true"
          />
        )}

        {/* Seta para links externos */}
        {external && href && !href.startsWith('#') && (
          <Icon
            name="ExternalLink"
            size="xs"
            className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}
      </Element>
    );
  }
);

NavigationItem.displayName = 'NavigationItem';

// === COMPONENTES DE CONVENIÊNCIA ===
export const NavLink: React.FC<Omit<NavigationItemProps, 'variant'>> = (props) => (
  <NavigationItem variant="default" {...props} />
);

export const NavButton: React.FC<Omit<NavigationItemProps, 'variant'>> = (props) => (
  <NavigationItem variant="button" {...props} />
);

export const NavTab: React.FC<Omit<NavigationItemProps, 'variant'>> = (props) => (
  <NavigationItem variant="tab" {...props} />
);

export const NavMenuItem: React.FC<Omit<NavigationItemProps, 'variant'>> = (props) => (
  <NavigationItem variant="menu" {...props} />
);

export const Breadcrumb: React.FC<Omit<NavigationItemProps, 'variant'>> = (props) => (
  <NavigationItem variant="breadcrumb" {...props} />
);

// === EXPORTS ===
export { navigationItemVariants };
export type { NavigationItemProps };