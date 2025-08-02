import { useEffect, useState } from 'react';
import { Code2, Database, Zap, Users, Brain, Target } from 'lucide-react';
import { ContentImage } from '@/components/OptimizedImage';
import avatar from '@/assets/avatar.jpg';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const technologies = [
    { icon: Code2, name: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { icon: Database, name: 'Backend', skills: ['Node.js', 'Supabase', 'PostgreSQL', 'REST APIs'] },
    { icon: Zap, name: 'Automação', skills: ['N8N', 'Make.com', 'Webhooks', 'Integrations'] }
  ];

  const softSkills = [
    { icon: Brain, title: 'Pensamento Analítico', description: 'Capacidade de decompor problemas complexos em soluções simples' },
    { icon: Users, title: 'Colaboração', description: 'Trabalho eficiente em equipe e comunicação clara com stakeholders' },
    { icon: Target, title: 'Foco em Resultados', description: 'Orientado para entrega de valor e impacto real no negócio' }
  ];

  return (
    <section 
      id="about" 
      className="py-20 px-6 relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Background Elements - Decorative only */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-accent/5 rounded-full blur-3xl" aria-hidden="true" />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Avatar Side */}
          <aside className={`relative ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-2xl opacity-20 animate-pulse-glow" aria-hidden="true" />
              <figure className="relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 backdrop-blur-sm border border-primary/20">
                <ContentImage 
                  src={avatar}
                  alt="Foto profissional do desenvolvedor full-stack"
                  width={400}
                  height={320}
                  className="w-full h-80 object-cover rounded-xl mb-6 glow"
                  quality={85}
                />
                <figcaption className="text-center">
                  <h3 className="text-2xl font-bold text-gradient mb-2">Desenvolvedor Full-Stack</h3>
                  <h3 className="text-2xl font-bold text-gradient mb-2">Carlos Salgado</h3>
                  <p className="text-muted-foreground">Especialista em Soluções Digitais</p>
                </figcaption>
              </figure>
            </div>
          </aside>

          {/* Content Side */}
          <article className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <header>
              <h2 id="about-heading" className="text-section text-gradient mb-8">
                Sobre Mim
              </h2>
            </header>
            
            <div className="space-y-6 mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sou um desenvolvedor apaixonado por transformar ideias complexas em soluções 
                digitais elegantes e funcionais. Com foco em criar experiências que realmente 
                fazem a diferença na vida das pessoas e no crescimento dos negócios.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Minha missão é democratizar a tecnologia, criando ferramentas acessíveis 
                que automatizam processos, integram sistemas e geram valor real para 
                organizações de todos os tamanhos.
              </p>
            </div>

            {/* Technologies */}
            <section className="mb-12" aria-labelledby="technologies-heading">
              <h3 id="technologies-heading" className="text-2xl font-semibold mb-6 text-foreground">Tecnologias Dominadas</h3>
              <div className="grid md:grid-cols-3 gap-6" role="list">
                {technologies.map((tech, index) => (
                  <article 
                    key={tech.name}
                    className={`card-premium group ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 200}ms` }}
                    role="listitem"
                  >
                    <tech.icon 
                      className="w-8 h-8 text-primary mb-4 group-hover:text-accent transition-colors duration-300" 
                      aria-hidden="true"
                    />
                    <h4 className="font-semibold mb-3 text-card-foreground">{tech.name}</h4>
                    <ul className="flex flex-wrap gap-2" role="list" aria-label={`Tecnologias de ${tech.name}`}>
                      {tech.skills.map((skill) => (
                        <li 
                          key={skill}
                          className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md border border-primary/20"
                          role="listitem"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            {/* Soft Skills */}
            <section aria-labelledby="skills-heading">
              <h3 id="skills-heading" className="text-2xl font-semibold mb-6 text-foreground">Diferenciais</h3>
              <div className="space-y-4" role="list">
                {softSkills.map((skill, index) => (
                  <article 
                    key={skill.title}
                    className={`flex items-start gap-4 p-4 rounded-xl bg-card/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:bg-card/50 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${600 + index * 150}ms` }}
                    role="listitem"
                  >
                    <skill.icon 
                      className="w-6 h-6 text-primary mt-1 flex-shrink-0" 
                      aria-hidden="true"
                    />
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-1">{skill.title}</h4>
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;