/**
 * AboutSection - Componente organism refatorado
 * Seção sobre otimizada usando atomic design
 */

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Typography, H2, H3, H4, P } from '@/components/atoms/Typography';
import { Icon } from '@/components/atoms/Icon';
import { Card, CardContent } from '@/components/molecules/Card';
import { DESIGN_TOKENS } from '@/constants/design-tokens';
import type { BaseComponentProps } from '@/types/base';
import type { Technology, Skill } from '@/types/portfolio';

// === INTERFACES ===
export interface AboutSectionProps extends BaseComponentProps {
  /** Título da seção */
  readonly title?: string;
  /** Descrição principal */
  readonly description?: readonly string[];
  /** Imagem do avatar */
  readonly avatarImage?: string;
  /** Nome da pessoa */
  readonly name?: string;
  /** Cargo/título */
  readonly jobTitle?: string;
  /** Especialidade */
  readonly specialty?: string;
  /** Status de disponibilidade */
  readonly availability?: {
    readonly available: boolean;
    readonly text: string;
  };
  /** Tecnologias organizadas por categoria */
  readonly technologies?: readonly {
    readonly category: string;
    readonly icon: string;
    readonly items: readonly Technology[];
  }[];
  /** Soft skills */
  readonly softSkills?: readonly Skill[];
}

// === COMPONENTE DE ELEMENTOS DE FUNDO ===
const BackgroundElements: React.FC = React.memo(() => (
  <>
    <div 
      className="absolute top-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float"
      aria-hidden="true"
      style={{ animationDelay: '0s' }}
    />
    <div 
      className="absolute bottom-20 left-10 w-60 h-60 bg-accent/5 rounded-full blur-3xl animate-float"
      aria-hidden="true"
      style={{ animationDelay: '3s' }}
    />
  </>
));
BackgroundElements.displayName = 'BackgroundElements';

// === COMPONENTE DE PARTÍCULAS ORBITANTES ===
const OrbitingParticles: React.FC = React.memo(() => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
    <div
      className="absolute w-4 h-4 bg-blue-500 rounded-full simple-orbit-1"
      style={{
        boxShadow: '0 0 20px #3b82f6, 0 0 30px #3b82f650',
        zIndex: 1
      }}
    />
    <div
      className="absolute w-3 h-3 bg-purple-500 rounded-full simple-orbit-2"
      style={{
        boxShadow: '0 0 15px #8b5cf6, 0 0 25px #8b5cf650',
        zIndex: 1
      }}
    />
    <div
      className="absolute w-5 h-5 bg-green-500 rounded-full simple-orbit-3"
      style={{
        boxShadow: '0 0 25px #10b981, 0 0 35px #10b98150',
        zIndex: 1
      }}
    />
  </div>
));
OrbitingParticles.displayName = 'OrbitingParticles';

// === COMPONENTE DE AVATAR CARD ===
const AvatarCard: React.FC<{
  image?: string;
  name?: string;
  jobTitle?: string;
  specialty?: string;
  availability?: AboutSectionProps['availability'];
}> = React.memo(({ 
  image, 
  name = 'DEV: Carlos Salgado',
  jobTitle = 'Desenvolvedor Full-Stack',
  specialty = 'Especialista em Soluções Digitais',
  availability = { available: true, text: 'Disponível para projetos' }
}) => (
  <div className="relative max-w-md mx-auto lg:mx-0 z-10">
    {/* Glow de fundo animado */}
    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-2xl opacity-20 animate-pulse" />

    {/* Card principal */}
    <Card variant="premium" className="overflow-hidden">
      <CardContent className="p-8 h-full">
        {/* Bordas decorativas */}
        <div className="absolute inset-0 rounded-2xl">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-70" />
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-70" />
          <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-primary-glow/60 to-transparent opacity-70" />
          <div className="absolute right-0 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-primary/60 to-transparent opacity-70" />
        </div>

        {/* Container da foto */}
        <div className="relative overflow-hidden rounded-xl mb-6">
          {image ? (
            <img
              src={image}
              alt={`Avatar de ${name}`}
              className={cn(
                'w-full h-80 object-cover rounded-xl glow',
                'transition-all duration-700 ease-in-out',
                'hover:scale-110 hover:rotate-2 hover:brightness-110 hover:contrast-110'
              )}
            />
          ) : (
            <div className="w-full h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
              <Icon name="User" size="xl" color="primary" />
            </div>
          )}
          
          {/* Overlay sutil no hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-accent/10 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        </div>

        {/* Conteúdo de texto */}
        <div className="text-center relative z-10 space-y-2">
          <H3 className="text-gradient hover:scale-105 transition-transform duration-300">
            {name}
          </H3>
          
          <H4 className="text-gradient hover:text-accent transition-colors duration-300">
            {jobTitle}
          </H4>
          
          <P color="muted" className="hover:text-primary transition-colors duration-300">
            {specialty}
          </P>

          {/* Indicador de status */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className={cn(
              'w-3 h-3 rounded-full',
              availability.available ? 'bg-success animate-pulse' : 'bg-warning'
            )} />
            <Typography 
              variant="small" 
              color={availability.available ? 'success' : 'warning'}
              weight="medium"
            >
              {availability.text}
            </Typography>
          </div>
        </div>

        {/* Decorações dos cantos */}
        <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-primary/40 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-accent/40 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-primary-glow/40 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-primary/40 rounded-br-lg" />
      </CardContent>
    </Card>
  </div>
));
AvatarCard.displayName = 'AvatarCard';

// === COMPONENTE DE TECNOLOGIAS ===
const TechnologiesSection: React.FC<{
  technologies: AboutSectionProps['technologies'];
}> = React.memo(({ technologies = [] }) => (
  <section className="mb-12" aria-labelledby="technologies-heading">
    <H3 id="technologies-heading" className="mb-6">
      Tecnologias Dominadas
    </H3>
    
    <div className="grid md:grid-cols-3 gap-6" role="list">
      {technologies.map((tech, index) => (
        <Card
          key={tech.category}
          variant="premium"
          className="group animate-fade-in"
          style={{ 
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'both'
          }}
        >
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon 
                  name={tech.icon}
                  size="lg"
                  color="default"
                  className="text-primary-foreground"
                />
              </div>
              <H4 className="group-hover:text-gradient transition-colors duration-300">
                {tech.category}
              </H4>
            </div>
            
            <div className="flex flex-wrap gap-2" role="list">
              {tech.items.map((item) => (
                <span
                  key={item.name}
                  className={cn(
                    'text-xs px-2 py-1 rounded-md border',
                    'bg-primary/10 text-primary border-primary/20',
                    'hover:bg-primary/20 hover:border-primary/40',
                    'transition-colors duration-200'
                  )}
                  role="listitem"
                  title={`${item.name}${item.proficiency ? ` - ${item.proficiency}` : ''}`}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
));
TechnologiesSection.displayName = 'TechnologiesSection';

// === COMPONENTE DE SOFT SKILLS ===
const SoftSkillsSection: React.FC<{
  skills: AboutSectionProps['softSkills'];
}> = React.memo(({ skills = [] }) => (
  <section aria-labelledby="skills-heading">
    <H3 id="skills-heading" className="mb-6">
      Diferenciais
    </H3>
    
    <div className="space-y-4" role="list">
      {skills.map((skill, index) => (
        <Card
          key={skill.name}
          variant="ghost"
          className="animate-fade-in hover:bg-card/30"
          style={{ 
            animationDelay: `${index * 150}ms`,
            animationFillMode: 'both'
          }}
        >
          <CardContent className="flex items-start gap-4 p-4">
            <Icon 
              name={skill.icon || 'Star'}
              size="lg"
              color="primary"
              className="mt-1 flex-shrink-0"
            />
            <div className="space-y-1">
              <H4 className="text-card-foreground">
                {skill.name}
              </H4>
              <P variant="small" color="muted">
                {skill.description}
              </P>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
));
SoftSkillsSection.displayName = 'SoftSkillsSection';

// === COMPONENTE PRINCIPAL ===
export const AboutSection: React.FC<AboutSectionProps> = ({
  className,
  title = 'Sobre Mim',
  description = [
    'Sou um desenvolvedor apaixonado por transformar ideias complexas em soluções digitais elegantes e funcionais. Com foco em criar experiências que realmente fazem a diferença na vida das pessoas e no crescimento dos negócios.',
    'Minha missão é democratizar a tecnologia, criando ferramentas acessíveis que automatizam processos, integram sistemas e geram valor real para organizações de todos os tamanhos.'
  ],
  avatarImage,
  name,
  jobTitle,
  specialty,
  availability,
  technologies = [
    {
      category: 'Frontend',
      icon: 'Code2',
      items: [
        { name: 'React', category: 'frontend' },
        { name: 'Next.js', category: 'frontend' },
        { name: 'TypeScript', category: 'frontend' },
        { name: 'Tailwind CSS', category: 'frontend' }
      ]
    },
    {
      category: 'Backend',
      icon: 'Database',
      items: [
        { name: 'Node.js', category: 'backend' },
        { name: 'Supabase', category: 'backend' },
        { name: 'PostgreSQL', category: 'backend' },
        { name: 'REST APIs', category: 'backend' }
      ]
    },
    {
      category: 'Automação',
      icon: 'Zap',
      items: [
        { name: 'n8n', category: 'automation' },
        { name: 'Webhooks', category: 'automation' },
        { name: 'Python', category: 'automation' },
        { name: 'Integrations', category: 'automation' }
      ]
    }
  ],
  softSkills = [
    {
      name: 'Pensamento Analítico',
      description: 'Capacidade de decompor problemas complexos em soluções simples',
      category: 'soft',
      proficiency: 'expert',
      icon: 'Brain'
    },
    {
      name: 'Colaboração',
      description: 'Trabalho eficiente em equipe e comunicação clara com stakeholders',
      category: 'soft',
      proficiency: 'expert',
      icon: 'Users'
    },
    {
      name: 'Foco em Resultados',
      description: 'Orientado para entrega de valor e impacto real no negócio',
      category: 'soft',
      proficiency: 'expert',
      icon: 'Target'
    }
  ],
  testId,
}) => {
  // Classes computadas
  const sectionClasses = useMemo(
    () =>
      cn(
        'py-20 px-6 relative overflow-hidden',
        className
      ),
    [className]
  );

  return (
    <section
      id="about"
      className={sectionClasses}
      aria-labelledby="about-heading"
      data-testid={testId}
    >
      <div className="max-w-7xl mx-auto">
        {/* Elementos de fundo */}
        <BackgroundElements />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Lado do Avatar */}
          <div className="relative">
            <OrbitingParticles />
            <AvatarCard
              image={avatarImage}
              name={name}
              jobTitle={jobTitle}
              specialty={specialty}
              availability={availability}
            />
          </div>

          {/* Lado do Conteúdo */}
          <div className="space-y-8">
            <div className="space-y-6">
              <H2 
                id="about-heading"
                className="text-gradient animate-fade-in"
              >
                {title}
              </H2>

              <div className="space-y-6">
                {description.map((paragraph, index) => (
                  <P
                    key={index}
                    className={cn(
                      'text-lg leading-relaxed animate-fade-in',
                      'text-muted-foreground'
                    )}
                    style={{ 
                      animationDelay: `${200 + index * 200}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    {paragraph}
                  </P>
                ))}
              </div>
            </div>

            {/* Seção de Tecnologias */}
            <TechnologiesSection technologies={technologies} />

            {/* Seção de Soft Skills */}
            <SoftSkillsSection skills={softSkills} />
          </div>
        </div>
      </div>
    </section>
  );
};

AboutSection.displayName = 'AboutSection';