/**
 * Typography - Componente atom para texto
 * Sistema tipográfico consistente e acessível
 */

import React, { forwardRef, useMemo } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { DESIGN_TOKENS } from '@/constants/design-tokens';
import type { BaseComponentProps } from '@/types/base';

// === VARIANTES DE TIPOGRAFIA ===
const typographyVariants = cva(
  // Classes base
  ['transition-colors duration-200'],
  {
    variants: {
      variant: {
        // Títulos
        h1: [
          'scroll-m-20 text-4xl font-bold tracking-tight',
          'lg:text-5xl xl:text-6xl',
          'font-heading',
        ],
        h2: [
          'scroll-m-20 text-3xl font-semibold tracking-tight',
          'lg:text-4xl xl:text-5xl',
          'font-heading',
        ],
        h3: [
          'scroll-m-20 text-2xl font-semibold tracking-tight',
          'lg:text-3xl',
          'font-heading',
        ],
        h4: [
          'scroll-m-20 text-xl font-semibold tracking-tight',
          'lg:text-2xl',
          'font-heading',
        ],
        h5: [
          'scroll-m-20 text-lg font-semibold tracking-tight',
          'lg:text-xl',
          'font-heading',
        ],
        h6: [
          'scroll-m-20 text-base font-semibold tracking-tight',
          'lg:text-lg',
          'font-heading',
        ],
        
        // Parágrafos
        p: [
          'leading-7 text-base',
          '[&:not(:first-child)]:mt-6',
        ],
        lead: [
          'text-xl text-muted-foreground leading-relaxed',
          'lg:text-2xl',
        ],
        large: [
          'text-lg font-semibold leading-relaxed',
        ],
        small: [
          'text-sm font-medium leading-none',
        ],
        
        // Texto especial
        muted: [
          'text-sm text-muted-foreground leading-relaxed',
        ],
        code: [
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem]',
          'font-mono text-sm font-semibold',
        ],
        
        // Listas
        list: [
          'my-6 ml-6 list-disc [&>li]:mt-2',
        ],
        
        // Citações
        blockquote: [
          'mt-6 border-l-2 border-primary/50 pl-6 italic',
          'text-muted-foreground',
        ],
        
        // Links
        link: [
          'font-medium text-primary underline underline-offset-4',
          'hover:text-primary-glow transition-colors',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-primary focus-visible:ring-offset-2',
        ],
        
        // Gradiente
        gradient: [
          'bg-gradient-to-r from-primary via-primary-glow to-accent',
          'bg-clip-text text-transparent font-bold',
        ],
      },
      
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
        '6xl': 'text-6xl',
        '7xl': 'text-7xl',
        '8xl': 'text-8xl',
        '9xl': 'text-9xl',
      },
      
      weight: {
        thin: 'font-thin',
        extralight: 'font-extralight',
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
        black: 'font-black',
      },
      
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
      
      color: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error',
        info: 'text-info',
      },
      
      truncate: {
        true: 'truncate',
        false: '',
      },
      
      uppercase: {
        true: 'uppercase',
        false: '',
      },
      
      italic: {
        true: 'italic',
        false: '',
      },
    },
    
    defaultVariants: {
      variant: 'p',
      align: 'left',
      color: 'default',
      truncate: false,
      uppercase: false,
      italic: false,
    },
  }
);

// === MAPEAMENTO DE ELEMENTOS HTML ===
const variantElementMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  lead: 'p',
  large: 'div',
  small: 'small',
  muted: 'p',
  code: 'code',
  list: 'ul',
  blockquote: 'blockquote',
  link: 'a',
  gradient: 'span',
} as const;

// === INTERFACES ===
export interface TypographyProps
  extends BaseComponentProps,
    VariantProps<typeof typographyVariants> {
  /** Se deve renderizar como Slot (para composição) */
  readonly asChild?: boolean;
  /** Elemento HTML a ser renderizado (sobrescreve o padrão da variant) */
  readonly as?: keyof JSX.IntrinsicElements;
  /** Número máximo de linhas antes de truncar */
  readonly lineClamp?: number;
  /** Se deve aplicar animação de typing */
  readonly typing?: boolean;
  /** Velocidade da animação de typing (ms por caractere) */
  readonly typingSpeed?: number;
}

// === COMPONENTE PRINCIPAL ===
export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant = 'p',
      size,
      weight,
      align,
      color,
      truncate,
      uppercase,
      italic,
      asChild = false,
      as,
      children,
      testId,
      lineClamp,
      typing = false,
      typingSpeed = 50,
      ...props
    },
    ref
  ) => {
    // Determinar o elemento HTML
    const Element = useMemo(() => {
      if (asChild) return Slot;
      if (as) return as;
      return variantElementMap[variant as keyof typeof variantElementMap] || 'div';
    }, [asChild, as, variant]);

    // Classes computadas
    const computedClassName = useMemo(() => {
      const baseClasses = typographyVariants({
        variant,
        size,
        weight,
        align,
        color,
        truncate,
        uppercase,
        italic,
      });

      const lineClampClasses = lineClamp
        ? `line-clamp-${lineClamp} overflow-hidden`
        : '';

      const typingClasses = typing
        ? 'overflow-hidden whitespace-nowrap border-r-2 border-primary animate-typing'
        : '';

      return cn(baseClasses, lineClampClasses, typingClasses, className);
    }, [
      variant,
      size,
      weight,
      align,
      color,
      truncate,
      uppercase,
      italic,
      lineClamp,
      typing,
      className,
    ]);

    // Props para animação de typing
    const typingProps = useMemo(() => {
      if (!typing) return {};
      
      return {
        style: {
          animationDuration: `${(children?.toString().length || 0) * typingSpeed}ms`,
        },
      };
    }, [typing, children, typingSpeed]);

    return (
      <Element
        ref={ref}
        className={computedClassName}
        data-testid={testId}
        {...typingProps}
        {...props}
      >
        {children}
      </Element>
    );
  }
);

Typography.displayName = 'Typography';

// === COMPONENTES DE CONVENIÊNCIA ===
export const H1 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h1" {...props} />
);
H1.displayName = 'H1';

export const H2 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h2" {...props} />
);
H2.displayName = 'H2';

export const H3 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h3" {...props} />
);
H3.displayName = 'H3';

export const H4 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h4" {...props} />
);
H4.displayName = 'H4';

export const H5 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h5" {...props} />
);
H5.displayName = 'H5';

export const H6 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h6" {...props} />
);
H6.displayName = 'H6';

export const P = forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="p" {...props} />
);
P.displayName = 'P';

export const Lead = forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="lead" {...props} />
);
Lead.displayName = 'Lead';

export const Large = forwardRef<HTMLDivElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="large" {...props} />
);
Large.displayName = 'Large';

export const Small = forwardRef<HTMLElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="small" {...props} />
);
Small.displayName = 'Small';

export const Muted = forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="muted" {...props} />
);
Muted.displayName = 'Muted';

export const Code = forwardRef<HTMLElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="code" {...props} />
);
Code.displayName = 'Code';

export const Blockquote = forwardRef<HTMLQuoteElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="blockquote" {...props} />
);
Blockquote.displayName = 'Blockquote';

export const Link = forwardRef<HTMLAnchorElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="link" {...props} />
);
Link.displayName = 'Link';

export const GradientText = forwardRef<HTMLSpanElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="gradient" {...props} />
);
GradientText.displayName = 'GradientText';

// === EXPORTS ===
export { typographyVariants };
export type { TypographyProps };