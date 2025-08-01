import React from 'react';
import { AnimatedSection, StaggeredList, ParallaxSection, AnimatedGrid } from '@/components/AnimatedSection';
import { ParticleBackground, SectionParticles } from '@/components/ParticleBackground';
import { 
  TiltCard, 
  MagneticButton, 
  RippleButton, 
  GlowCard, 
  ServiceCard, 
  CTAButton, 
  PortfolioItem 
} from '@/components/InteractiveElements';
import { AnimationProvider } from '@/components/AnimationProvider';
import { defaultAnimations } from '@/config/animations';
import { particlePresets } from '@/config/particlePresets';

const AnimationTest: React.FC = () => {
  return (
    <AnimationProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        
        {/* Hero Section com Partículas */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <SectionParticles preset="hero" className="absolute inset-0" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <AnimatedSection
              animation={defaultAnimations.slideDown}
              className="mb-6"
            >
              <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
                Sistema de Animações
              </h1>
            </AnimatedSection>
            
            <AnimatedSection
              animation={{...defaultAnimations.fadeIn, delay: 0.3}}
              className="mb-8"
            >
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Testando o framework completo de animações avançadas
              </p>
            </AnimatedSection>
            
            <AnimatedSection
              animation={{...defaultAnimations.bounce, delay: 0.6}}
            >
              <CTAButton size="lg" onClick={() => console.log('CTA clicked!')}>
                Explorar Animações
              </CTAButton>
            </AnimatedSection>
          </div>
        </section>

        {/* Seção de Cards com Tilt Effect */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection
              animation={defaultAnimations.slideUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Efeitos 3D Tilt
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Cards interativos com efeito de inclinação 3D
              </p>
            </AnimatedSection>

            <AnimatedGrid
              animation={defaultAnimations.scaleIn}
              staggerDelay={0.1}
              columns={3}
              className="gap-8"
            >
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <TiltCard
                  key={item}
                  config={{
                    maxTilt: 15,
                    scale: 1.05,
                    glare: true,
                    glareMaxOpacity: 0.4
                  }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{item}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Card {item}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Passe o mouse para ver o efeito 3D tilt em ação
                    </p>
                  </div>
                </TiltCard>
              ))}
            </AnimatedGrid>
          </div>
        </section>

        {/* Seção de Botões Magnéticos */}
        <section className="py-20 px-6 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection
              animation={defaultAnimations.slideUp}
              className="mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Efeitos Magnéticos
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Botões que são atraídos pelo cursor
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['Primary', 'Secondary', 'Outline'].map((variant, index) => (
                <AnimatedSection
                  key={variant}
                  animation={{...defaultAnimations.slideUp, delay: index * 0.1}}
                >
                  <MagneticButton
                    config={{
                      strength: 0.4,
                      radius: 100,
                      restoreSpeed: 0.2
                    }}
                    className={`
                      px-8 py-4 rounded-lg font-semibold transition-colors
                      ${variant === 'Primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                      ${variant === 'Secondary' ? 'bg-gray-600 text-white hover:bg-gray-700' : ''}
                      ${variant === 'Outline' ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' : ''}
                    `}
                    onClick={() => console.log(`${variant} clicked!`)}
                  >
                    {variant} Button
                  </MagneticButton>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Service Cards */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection
              animation={defaultAnimations.slideUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Service Cards
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Cards de serviço com múltiplos efeitos combinados
              </p>
            </AnimatedSection>

            <StaggeredList
              animation={defaultAnimations.slideUp}
              staggerDelay={0.15}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  title: 'Desenvolvimento Web',
                  description: 'Criação de sites e aplicações web modernas',
                  icon: '🌐'
                },
                {
                  title: 'Automações',
                  description: 'Automatização de processos e workflows',
                  icon: '🤖'
                },
                {
                  title: 'Integrações',
                  description: 'Integração entre sistemas e APIs',
                  icon: '🔗'
                },
                {
                  title: 'Consultoria',
                  description: 'Consultoria técnica especializada',
                  icon: '💡'
                },
                {
                  title: 'Design UI/UX',
                  description: 'Design de interfaces e experiência do usuário',
                  icon: '🎨'
                },
                {
                  title: 'Mobile Apps',
                  description: 'Desenvolvimento de aplicativos móveis',
                  icon: '📱'
                }
              ].map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={<span className="text-4xl">{service.icon}</span>}
                  onClick={() => console.log(`${service.title} clicked!`)}
                />
              ))}
            </StaggeredList>
          </div>
        </section>

        {/* Seção com Efeito Parallax */}
        <section className="relative py-32 overflow-hidden">
          <ParallaxSection speed={0.5} className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-20"></div>
          </ParallaxSection>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <AnimatedSection
              animation={defaultAnimations.fadeIn}
              className="text-white"
            >
              <h2 className="text-5xl font-bold mb-6">
                Efeito Parallax
              </h2>
              <p className="text-xl opacity-90">
                Esta seção tem um fundo com efeito parallax que se move em velocidade diferente do scroll
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Seção de Portfolio Items */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection
              animation={defaultAnimations.slideUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Portfolio Items
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Items de portfolio com efeitos tilt e hover
              </p>
            </AnimatedSection>

            <AnimatedGrid
              animation={defaultAnimations.scaleIn}
              staggerDelay={0.1}
              columns={2}
              className="gap-8"
            >
              {[
                {
                  title: 'E-commerce Platform',
                  description: 'Plataforma completa de e-commerce com React e Node.js',
                  image: '/api/placeholder/400/300',
                  tags: ['React', 'Node.js', 'MongoDB', 'Stripe']
                },
                {
                  title: 'Dashboard Analytics',
                  description: 'Dashboard de analytics com visualizações interativas',
                  image: '/api/placeholder/400/300',
                  tags: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL']
                },
                {
                  title: 'Mobile App',
                  description: 'Aplicativo móvel para gestão de tarefas',
                  image: '/api/placeholder/400/300',
                  tags: ['React Native', 'Firebase', 'Redux']
                },
                {
                  title: 'API Gateway',
                  description: 'Gateway de APIs com autenticação e rate limiting',
                  image: '/api/placeholder/400/300',
                  tags: ['Node.js', 'Express', 'Redis', 'JWT']
                }
              ].map((project, index) => (
                <PortfolioItem
                  key={index}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  onClick={() => console.log(`${project.title} clicked!`)}
                />
              ))}
            </AnimatedGrid>
          </div>
        </section>

        {/* Seção com Partículas de Fundo */}
        <section className="relative py-20">
          <ParticleBackground
            config={particlePresets.stars.config}
            className="absolute inset-0"
            interactive={true}
            mouseInfluence={{
              enabled: true,
              radius: 150,
              strength: 0.3,
              type: 'attract'
            }}
          />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <AnimatedSection
              animation={defaultAnimations.fadeIn}
              className="text-white"
            >
              <h2 className="text-4xl font-bold mb-6">
                Partículas Interativas
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Mova o mouse para interagir com as partículas de fundo
              </p>
              
              <RippleButton
                config={{
                  color: 'rgba(255, 255, 255, 0.3)',
                  duration: 800,
                  size: 150
                }}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm rounded-lg text-white font-semibold hover:bg-white/30 transition-colors"
                onClick={() => console.log('Ripple button clicked!')}
              >
                Clique para Ripple Effect
              </RippleButton>
            </AnimatedSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center px-6">
            <AnimatedSection
              animation={defaultAnimations.fadeIn}
            >
              <p className="text-lg">
                Sistema de Animações Avançadas - Teste Completo
              </p>
              <p className="text-gray-400 mt-2">
                Todos os efeitos implementados e funcionando
              </p>
            </AnimatedSection>
          </div>
        </footer>
      </div>
    </AnimationProvider>
  );
};

export default AnimationTest;