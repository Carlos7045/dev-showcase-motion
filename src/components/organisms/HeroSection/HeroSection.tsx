/**
 * HeroSection - Componente organism refatorado
 * Seção hero otimizada usando atomic design
 */

import React, { useEffect, useState, useMemo, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { Typography, H1, P } from '@/components/atoms/Typography';
import { Icon } from '@/components/atoms/Icon';
import { DESIGN_TOKENS } from '@/constants/design-tokens';
import { useStableCallback, useStableValue } from '@/hooks/useOptimizedRender';
import { useMemoizedValue, useMemoizedArray } from '@/hooks/useMemoizedValue';
import type { BaseComponentProps } from '@/types/base';

// === INTERFACES ===
export interface HeroSectionProps extends BaseComponentProps {
  /** Título principal */
  readonly title?: string;
  /** Subtítulo */
  readonly subtitle?: string;
  /** Descrição */
  readonly description?: string;
  /** Textos para animação de typing */
  readonly typingTexts?: readonly string[];
  /** Velocidade da animação de typing (ms) */
  readonly typingSpeed?: number;
  /** Tecnologias para exibir como pills */
  readonly technologies?: readonly string[];
  /** Handler para botão primário */
  readonly onPrimaryAction?: () => void;
  /** Handler para botão secundário */
  readonly onSecondaryAction?: () => void;
  /** Texto do botão primário */
  readonly primaryButtonText?: string;
  /** Texto do botão secundário */
  readonly secondaryButtonText?: string;
}

// === HOOK PARA ANIMAÇÃO DE TYPING ===
const useTypingAnimation = (
  texts: readonly string[],
  speed: number = 100
) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!texts.length || !isTyping) return;

    const currentText = texts[currentIndex];
    
    if (displayText.length < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIsTyping(false);
        setTimeout(() => {
          setDisplayText('');
          setCurrentIndex((prev) => (prev + 1) % texts.length);
          setIsTyping(true);
        }, 2000);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [displayText, currentIndex, isTyping, texts, speed]);

  return displayText;
};

// === COMPONENTE DE ELEMENTOS FLUTUANTES ===
const FloatingElements: React.FC = memo(() => (
  <>
    <div 
      className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl opacity-60 animate-float"
      aria-hidden="true"
      style={{ animationDelay: '0s' }}
    />
    <div 
      className="absolute bottom-32 right-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl opacity-50 animate-float"
      aria-hidden="true"
      style={{ animationDelay: '2s' }}
    />
    <div 
      className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-glow/10 rounded-full blur-lg opacity-60 animate-float"
      aria-hidden="true"
      style={{ animationDelay: '4s' }}
    />
  </>
));
FloatingElements.displayName = 'FloatingElements';

// === COMPONENTE DE TECH PILLS ===
const TechPills: React.FC<{
  technologies: readonly string[];
}> = memo(({ technologies }) => {
  const memoizedTechnologies = useMemoizedArray(
    () => technologies.map((tech, index) => ({ tech, index })),
    [technologies]
  );

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-16">
      {memoizedTechnologies.map(({ tech, index }) => (
        <div
          key={tech}
          className={cn(
            'px-4 py-2 bg-card/50 backdrop-blur-sm',
            'border border-primary/20 rounded-full',
            'text-sm font-medium text-card-foreground',
            'hover:border-primary/40 transition-colors duration-300',
            'animate-fade-in'
          )}
          style={{ 
            animationDelay: `${600 + index * 100}ms`,
            animationFillMode: 'both'
          }}
          role="listitem"
        >
          {tech}
        </div>
      ))}
    </div>
  );
});
TechPills.displayName = 'TechPills';

// === COMPONENTE DE SCROLL INDICATOR ===
const ScrollIndicator: React.FC<{
  onClick: () => void;
}> = memo(({ onClick }) => {
  const stableOnClick = useStableCallback(onClick);

  return (
    <button
      className={cn(
        'absolute bottom-8 left-1/2 transform -translate-x-1/2',
        'cursor-pointer hover:scale-110 transition-transform duration-300',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'rounded-lg p-2 group'
      )}
      onClick={stableOnClick}
      aria-label="Rolar para a próxima seção"
      type="button"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center items-start p-1 animate-pulse">
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
        </div>
        <Typography variant="small" color="muted" className="group-hover:text-primary transition-colors">
          Scroll para descobrir
        </Typography>
        <Icon 
          name="ChevronDown" 
          size="sm" 
          color="primary"
          className="animate-bounce"
        />
      </div>
    </button>
  );
});
ScrollIndicator.displayName = 'ScrollIndicator';

// === COMPONENTE PRINCIPAL ===
export const HeroSection: React.FC<HeroSectionProps> = memo(({
  className,
  title = 'Transformando Ideias em Soluções Digitais',
  subtitle,
  description = 'Ajudo pessoas e empresas a crescerem através de aplicações web personalizadas, automações inteligentes e integrações que simplificam processos complexos.',
  typingTexts = [
    'Desenvolvedor Full-Stack',
    'Especialista em Automações',
    'Criador de Soluções SaaS',
    'Expert em Integrações API'
  ],
  typingSpeed = 100,
  technologies = [
    'React', 'Next.js', 'TypeScript', 'Supabase', 'API Integration', 'Automation'
  ],
  onPrimaryAction,
  onSecondaryAction,
  primaryButtonText = 'Vamos Conversar',
  secondaryButtonText = 'Ver Portfólio',
  testId,
}) => {
  // Animação de typing com memoização
  const stableTypingTexts = useStableValue(typingTexts);
  const typingText = useTypingAnimation(stableTypingTexts, typingSpeed);

  // Handlers com valores padrão e memoização
  const handlePrimaryAction = useStableCallback(() => {
    if (onPrimaryAction) {
      onPrimaryAction();
    } else {
      window.open(
        'https://wa.me/5599984870193?text=Olá%20vim%20da%20sua%20pagina%20de%20desenvolvedor,%20gostaria%20de%20conversar%20com%20você%20sobre%20um%20projeto.',
        '_blank'
      );
    }
  }, [onPrimaryAction]);

  const handleSecondaryAction = useStableCallback(() => {
    if (onSecondaryAction) {
      onSecondaryAction();
    } else {
      const portfolioSection = document.getElementById('portfolio');
      portfolioSection?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [onSecondaryAction]);

  const handleScrollToNext = useStableCallback(() => {
    const nextSection = document.getElementById('about');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  });

  // Classes computadas com memoização otimizada
  const sectionClasses = useMemoizedValue(
    () =>
      cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden',
        className
      ),
    [className]
  );

  return (
    <section
      className={sectionClasses}
      role="banner"
      aria-label="Seção principal do site"
      data-testid={testId}
    >
      {/* Background com gradiente */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Elementos flutuantes */}
      <FloatingElements />

      {/* Conteúdo principal */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Título principal */}
          <div className="space-y-6">
            <H1 className="text-gradient animate-fade-in">
              {title}
            </H1>
            
            {subtitle && (
              <Typography 
                variant="lead" 
                className="animate-fade-in"
                style={{ animationDelay: '200ms', animationFillMode: 'both' }}
              >
                {subtitle}
              </Typography>
            )}
          </div>

          {/* Animação de typing */}
          <div
            className="h-16 flex items-center justify-center"
            role="text"
            aria-live="polite"
            aria-label="Especialidades em rotação"
          >
            <Typography
              variant="large"
              className="text-muted-foreground animate-fade-in"
              style={{ animationDelay: '400ms', animationFillMode: 'both' }}
            >
              {typingText}
              <span className="border-r-2 border-primary ml-1 inline-block h-8 opacity-80 animate-pulse" />
            </Typography>
          </div>

          {/* Descrição */}
          <P 
            className={cn(
              'max-w-3xl mx-auto leading-relaxed animate-fade-in',
              'text-lg md:text-xl'
            )}
            style={{ animationDelay: '600ms', animationFillMode: 'both' }}
          >
            {description}
          </P>

          {/* Botões de ação */}
          <div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in"
            style={{ animationDelay: '800ms', animationFillMode: 'both' }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handlePrimaryAction}
              leftIcon={<Icon name="MessageCircle" />}
              className="group"
            >
              {primaryButtonText}
              <Icon 
                name="ExternalLink" 
                className="group-hover:translate-x-1 transition-transform" 
              />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={handleSecondaryAction}
              leftIcon={<Icon name="Eye" />}
              className="group"
            >
              {secondaryButtonText}
            </Button>
          </div>

          {/* Tech Stack Pills */}
          <div role="list" aria-label="Tecnologias utilizadas">
            <TechPills technologies={technologies} />
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <ScrollIndicator onClick={handleScrollToNext} />
    </section>
  );
};

});

HeroSection.displayName = 'HeroSection';