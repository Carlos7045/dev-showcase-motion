/**
 * SocialLink - Componente molecule
 * Link para redes sociais com ícone e animações
 */

import React, { forwardRef, useMemo, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import type { 
  BaseComponentProps, 
  SocialPlatform,
  ComponentSize 
} from '@/types/base';

// === VARIANTES DO SOCIAL LINK ===
const socialLinkVariants = cva(
  // Classes base
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-xl transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-offset-2 focus-visible:ring-primary',
    'group relative overflow-hidden',
  ],
  {
    variants: {
      variant: {
        // Ícone apenas
        icon: [
          'bg-card/50 border border-primary/20',
          'hover:border-primary/40 hover:bg-card',
          'hover:scale-110 active:scale-95',
        ],
        
        // Com texto
        text: [
          'bg-transparent text-muted-foreground',
          'hover:text-primary hover:bg-primary/10',
          'px-3 py-2 rounded-lg',
        ],
        
        // Botão completo
        button: [
          'bg-card border border-primary/20',
          'hover:border-primary/40 hover:shadow-md',
          'px-4 py-2 hover:scale-105',
        ],
        
        // Estilo fantasma
        ghost: [
          'bg-transparent hover:bg-card/30',
          'border border-transparent hover:border-primary/30',
        ],
        
        // Com cor da plataforma
        branded: [
          'text-white shadow-md',
          'hover:shadow-lg hover:scale-105',
          'active:scale-95',
        ],
      },
      
      size: {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-12 h-12 text-base',
        lg: 'w-14 h-14 text-lg',
        xl: 'w-16 h-16 text-xl',
      },
      
      mouseFollow: {
        true: '',
        false: '',
      },
    },
    
    defaultVariants: {
      variant: 'icon',
      size: 'md',
      mouseFollow: false,
    },
  }
);

// === CONFIGURAÇÕES DAS PLATAFORMAS ===
const platformConfig: Record<SocialPlatform, {
  icon: string;
  color: string;
  hoverColor: string;
  label: string;
}> = {
  github: {
    icon: 'Github',
    color: '#333333',
    hoverColor: '#24292e',
    label: 'GitHub',
  },
  linkedin: {
    icon: 'Linkedin',
    color: '#0077b5',
    hoverColor: '#005885',
    label: 'LinkedIn',
  },
  twitter: {
    icon: 'Twitter',
    color: '#1da1f2',
    hoverColor: '#0d8bd9',
    label: 'Twitter',
  },
  instagram: {
    icon: 'Instagram',
    color: '#e4405f',
    hoverColor: '#d62976',
    label: 'Instagram',
  },
  facebook: {
    icon: 'Facebook',
    color: '#1877f2',
    hoverColor: '#166fe5',
    label: 'Facebook',
  },
  youtube: {
    icon: 'Youtube',
    color: '#ff0000',
    hoverColor: '#cc0000',
    label: 'YouTube',
  },
  email: {
    icon: 'Mail',
    color: '#ea4335',
    hoverColor: '#d33b2c',
    label: 'E-mail',
  },
  whatsapp: {
    icon: 'MessageCircle',
    color: '#25d366',
    hoverColor: '#1ebe57',
    label: 'WhatsApp',
  },
  telegram: {
    icon: 'Send',
    color: '#0088cc',
    hoverColor: '#006699',
    label: 'Telegram',
  },
};

// === INTERFACES ===
export interface SocialLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    BaseComponentProps,
    VariantProps<typeof socialLinkVariants> {
  /** Plataforma social */
  readonly platform: SocialPlatform;
  /** URL do perfil */
  readonly href: string;
  /** Nome de usuário (opcional) */
  readonly username?: string;
  /** Texto customizado */
  readonly label?: string;
  /** Se deve abrir em nova aba */
  readonly external?: boolean;
  /** Se deve seguir o mouse */
  readonly mouseFollow?: boolean;
  /** Ícone customizado */
  readonly customIcon?: string;
  /** Cor customizada */
  readonly customColor?: string;
}

// === COMPONENTE PRINCIPAL ===
export const SocialLink = forwardRef<HTMLAnchorElement, SocialLinkProps>(
  (
    {
      className,
      variant,
      size,
      mouseFollow = false,
      platform,
      href,
      username,
      label,
      external = true,
      customIcon,
      customColor,
      testId,
      children,
      ...props
    },
    ref
  ) => {
    const linkRef = useRef<HTMLAnchorElement>(null);
    
    // Configuração da plataforma
    const config = useMemo(
      () => platformConfig[platform],
      [platform]
    );

    // Classes computadas
    const computedClassName = useMemo(() => {
      const baseClasses = socialLinkVariants({
        variant,
        size,
        mouseFollow,
      });

      // Adicionar cor da plataforma para variant branded
      const brandedStyles = variant === 'branded' ? {
        backgroundColor: customColor || config.color,
      } : {};

      return cn(baseClasses, className);
    }, [variant, size, mouseFollow, className, customColor, config.color]);

    // Estilos inline para cores customizadas
    const inlineStyles = useMemo(() => {
      if (variant !== 'branded') return {};
      
      return {
        backgroundColor: customColor || config.color,
        '--hover-color': customColor || config.hoverColor,
      } as React.CSSProperties;
    }, [variant, customColor, config.color, config.hoverColor]);

    // Props do link
    const linkProps = useMemo(() => {
      const baseProps = {
        href,
        'aria-label': label || `${config.label}${username ? ` - ${username}` : ''}`,
        'data-testid': testId,
        ...props,
      };

      if (external) {
        return {
          ...baseProps,
          target: '_blank',
          rel: 'noopener noreferrer',
        };
      }

      return baseProps;
    }, [href, label, config.label, username, testId, external, props]);

    // Handler para mouse follow
    const handleMouseMove = useMemo(() => {
      if (!mouseFollow) return undefined;

      return (e: React.MouseEvent<HTMLAnchorElement>) => {
        const link = linkRef.current;
        if (!link) return;

        const rect = link.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * 0.15;
        const deltaY = (e.clientY - centerY) * 0.15;
        
        link.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.1)`;
      };
    }, [mouseFollow]);

    const handleMouseLeave = useMemo(() => {
      if (!mouseFollow) return undefined;

      return () => {
        const link = linkRef.current;
        if (!link) return;
        
        link.style.transform = 'translate(0px, 0px) scale(1)';
      };
    }, [mouseFollow]);

    // Tamanho do ícone baseado no tamanho do componente
    const iconSize = useMemo(() => {
      const sizeMap: Record<ComponentSize, ComponentSize> = {
        xs: 'xs',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
      };
      return sizeMap[size as ComponentSize] || 'md';
    }, [size]);

    return (
      <a
        ref={(node) => {
          linkRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={computedClassName}
        style={{
          ...inlineStyles,
          transition: mouseFollow 
            ? 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease, border-color 0.3s ease'
            : undefined,
          transformOrigin: 'center',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...linkProps}
      >
        {/* Ícone */}
        <Icon
          name={customIcon || config.icon}
          size={iconSize}
          color={variant === 'branded' ? 'default' : 'primary'}
          className={cn(
            'transition-colors duration-300',
            variant === 'text' && 'group-hover:text-primary',
            variant === 'icon' && 'group-hover:text-primary'
          )}
        />

        {/* Texto (para variants com texto) */}
        {(variant === 'text' || variant === 'button') && (
          <Typography
            variant="small"
            className="font-medium transition-colors duration-300 group-hover:text-primary"
          >
            {children || label || username || config.label}
          </Typography>
        )}

        {/* Efeito de ripple */}
        <span
          className="absolute inset-0 overflow-hidden rounded-[inherit]"
          aria-hidden="true"
        >
          <span className="absolute inset-0 rounded-[inherit] bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </span>
      </a>
    );
  }
);

SocialLink.displayName = 'SocialLink';

// === COMPONENTES DE CONVENIÊNCIA ===
export const GitHubLink: React.FC<Omit<SocialLinkProps, 'platform'>> = (props) => (
  <SocialLink platform="github" {...props} />
);

export const LinkedInLink: React.FC<Omit<SocialLinkProps, 'platform'>> = (props) => (
  <SocialLink platform="linkedin" {...props} />
);

export const TwitterLink: React.FC<Omit<SocialLinkProps, 'platform'>> = (props) => (
  <SocialLink platform="twitter" {...props} />
);

export const InstagramLink: React.FC<Omit<SocialLinkProps, 'platform'>> = (props) => (
  <SocialLink platform="instagram" {...props} />
);

export const EmailLink: React.FC<Omit<SocialLinkProps, 'platform'>> = (props) => (
  <SocialLink platform="email" {...props} />
);

export const WhatsAppLink: React.FC<Omit<SocialLinkProps, 'platform'>> = (props) => (
  <SocialLink platform="whatsapp" {...props} />
);

// === EXPORTS ===
export { socialLinkVariants, platformConfig };
export type { SocialLinkProps };