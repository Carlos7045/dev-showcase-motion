import { Code2, Database, Zap, Users, Brain, Target } from 'lucide-react';
import avatar from '@/assets/avatar.png';
import { GlareCard } from '@/components/ui/GlareCard';

const AboutSection = () => {

  const technologies = [
    { icon: Code2, name: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { icon: Database, name: 'Backend', skills: ['Node.js', 'Supabase', 'PostgreSQL', 'REST APIs'] },
    { icon: Zap, name: 'Automação', skills: ['n8n', 'Webhooks', 'Python', 'Integrations'] }
  ];

  const softSkills = [
    { icon: Brain, title: 'Pensamento Analítico', description: 'Capacidade de decompor problemas complexos em soluções simples' },
    { icon: Users, title: 'Colaboração', description: 'Trabalho eficiente em equipe e comunicação clara com stakeholders' },
    { icon: Target, title: 'Foco em Resultados', description: 'Orientado para entrega de valor e impacto real no negócio' }
  ];

  return (
    <section 
      id="about" 
      className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Background Elements - Decorative only */}
        <div className="absolute top-10 right-10 w-20 h-20 sm:w-40 sm:h-40 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-20 left-10 w-30 h-30 sm:w-60 sm:h-60 bg-accent/5 rounded-full blur-3xl" aria-hidden="true" />

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          {/* Avatar Side */}
          <div className="relative">
            {/* Orbiting Particles - Ao Redor do Card */}
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

            <div className="relative max-w-md mx-auto lg:mx-0 z-10">
              {/* Animated Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-2xl opacity-20" />

              {/* Main Card with GlareCard */}
              <GlareCard className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm overflow-hidden">
                <div className="relative p-8 h-full">
                  {/* Subtle Border Lines */}
                  <div className="absolute inset-0 rounded-2xl">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-70" />
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-70" />
                    <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-primary-glow/60 to-transparent opacity-70" />
                    <div className="absolute right-0 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-primary/60 to-transparent opacity-70" />
                  </div>

                  {/* Photo Container - APENAS transição simples na foto */}
                  <div className="relative overflow-hidden rounded-xl mb-6">
                    <img
                      src={avatar}
                      alt="Developer Avatar"
                      className="w-full h-80 object-cover rounded-xl glow transition-all duration-700 ease-in-out hover:scale-110 hover:rotate-2 hover:brightness-110 hover:contrast-110"
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-accent/10 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                  </div>

                  {/* Text Content */}
                  <div className="text-center relative z-10">
                    <h3 className="text-2xl font-bold text-gradient mb-2 hover:scale-105 transition-transform duration-300">
                      DEV: Carlos Salgado
                    </h3>
                    <h2 className="text-xl font-bold text-gradient mb-2 hover:text-accent transition-colors duration-300">
                      Desenvolvedor Full-Stack
                    </h2>
                    <p className="text-muted-foreground hover:text-primary transition-colors duration-300">
                      Especialista em Soluções Digitais
                    </p>

                    {/* Status Indicator */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full opacity-90" />
                      <span className="text-sm text-green-500 font-medium">Disponível para projetos</span>
                    </div>
                  </div>

                  {/* Corner Decorations */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-primary/40 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-accent/40 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-primary-glow/40 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-primary/40 rounded-br-lg" />
                </div>
              </GlareCard>
            </div>
          </div>

          {/* Content Side */}
          <div className="px-2 sm:px-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-space-grotesk font-semibold tracking-tight text-gradient mb-6 sm:mb-8">
              Sobre Mim
            </h2>

            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
              <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed">
                Sou um desenvolvedor apaixonado por transformar ideias complexas em soluções
                digitais elegantes e funcionais. Com foco em criar experiências que realmente
                fazem a diferença na vida das pessoas e no crescimento dos negócios.
              </p>

              <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed">
                Minha missão é democratizar a tecnologia, criando ferramentas acessíveis
                que automatizam processos, integram sistemas e geram valor real para
                organizações de todos os tamanhos.
              </p>
            </div>

            {/* Technologies */}
            <section className="mb-8 sm:mb-12" aria-labelledby="technologies-heading">
              <h3 id="technologies-heading" className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-foreground">Tecnologias Dominadas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6" role="list">
                {technologies.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="card-premium group"
                  >
                    <tech.icon 
                      className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4 group-hover:text-accent transition-colors duration-300" 
                      aria-hidden="true"
                    />
                    <h4 className="font-semibold mb-2 sm:mb-3 text-card-foreground text-sm sm:text-base">{tech.name}</h4>
                    <ul className="flex flex-wrap gap-1 sm:gap-2" role="list" aria-label={`Tecnologias de ${tech.name}`}>
                      {tech.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md border border-primary/20"
                          role="listitem"
                        >
                          {skill}
                        </span>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Soft Skills */}
            <section aria-labelledby="skills-heading">
              <h3 id="skills-heading" className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-foreground">Diferenciais</h3>
              <div className="space-y-3 sm:space-y-4" role="list">
                {softSkills.map((skill, index) => (
                  <GlareCard key={skill.title} className="bg-card/30 backdrop-blur-sm">
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 h-full">
                      <skill.icon 
                        className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 flex-shrink-0" 
                        aria-hidden="true"
                      />
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-1 text-sm sm:text-base">{skill.title}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                      </div>
                    </div>
                  </GlareCard>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;