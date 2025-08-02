import { BackgroundBeamsWithCollision } from '@/components/ui/BackgroundBeamsWithCollision';
import { Code, Zap, Rocket } from 'lucide-react';

const BeamsSection = () => {
  return (
    <section className="relative py-6 sm:py-0">
      <BackgroundBeamsWithCollision className="min-h-[450px] sm:min-h-[600px]">
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto py-6 sm:py-12 flex flex-col justify-center min-h-[450px] sm:min-h-[600px]">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-3 sm:mb-6">
              Energia em Movimento
            </h2>
            <p className="text-sm sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
              Cada linha de código é como um feixe de energia que transforma ideias em realidade digital.
            </p>
          </div>

          {/* Stats Cards - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mt-6 sm:mt-12 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="bg-card/20 backdrop-blur-sm border border-primary/20 rounded-xl p-4 sm:p-6 hover:border-primary/40 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-card-foreground mb-1">Varios</h3>
              <p className="text-xs sm:text-base text-muted-foreground">Projetos Entregues</p>
            </div>

            {/* Card 2 */}
            <div className="bg-card/20 backdrop-blur-sm border border-primary/20 rounded-xl p-4 sm:p-6 hover:border-primary/40 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-primary-glow rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-card-foreground mb-1">100%</h3>
              <p className="text-xs sm:text-base text-muted-foreground">Satisfação dos Clientes</p>
            </div>

            {/* Card 3 */}
            <div className="bg-card/20 backdrop-blur-sm border border-primary/20 rounded-xl p-4 sm:p-6 hover:border-primary/40 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-glow to-primary rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-card-foreground mb-1">5+</h3>
              <p className="text-xs sm:text-base text-muted-foreground leading-tight">
                <span className="sm:hidden">Anos de Experiência</span>
                <span className="hidden sm:inline">Anos de estudo e prática, e agora desenvolvendo soluções reais</span>
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-6 sm:mt-12">
            <p className="text-sm sm:text-lg text-muted-foreground mb-4 sm:mb-6 px-2">
              Pronto para ver sua ideia ganhar vida?
            </p>
            <button 
              className="btn-hero hover:scale-105 transition-transform duration-300 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
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