import { BackgroundBeamsWithCollision } from '@/components/ui/BackgroundBeamsWithCollision';
import { Code, Zap, Rocket } from 'lucide-react';

const BeamsSection = () => {
  return (
    <section className="relative">
      <BackgroundBeamsWithCollision className="min-h-[600px]">
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-6">
              Energia em Movimento
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Cada linha de código é como um feixe de energia que transforma ideias em realidade digital.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-card/20 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 hover:border-primary/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-2">50+</h3>
              <p className="text-muted-foreground">Projetos Entregues</p>
            </div>

            <div className="bg-card/20 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 hover:border-primary/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary-glow rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-2">100%</h3>
              <p className="text-muted-foreground">Satisfação dos Clientes</p>
            </div>

            <div className="bg-card/20 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 hover:border-primary/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-glow to-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-2">3+</h3>
              <p className="text-muted-foreground">Anos de Experiência</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16">
            <p className="text-lg text-muted-foreground mb-6">
              Pronto para ver sua ideia ganhar vida?
            </p>
            <button 
              className="btn-hero hover:scale-105 transition-transform duration-300"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Vamos Começar
            </button>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </section>
  );
};

export default BeamsSection;