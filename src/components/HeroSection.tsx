import { useEffect, useState } from 'react';
import { ChevronDown, Download, ExternalLink, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const texts = [
    'Desenvolvedor Full-Stack',
    'Especialista em Automações',
    'Criador de Soluções SaaS',
    'Expert em Integrações API'
  ];

  useEffect(() => {
    if (!isTyping) return;

    const currentText = texts[currentIndex];
    
    if (displayText.length < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, 100);
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
  }, [displayText, currentIndex, isTyping, texts]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Parallax Effect */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl opacity-60" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl opacity-50" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-glow/10 rounded-full blur-lg opacity-60" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div>
          <h1 className="text-hero text-gradient mb-6">
            Transformando Ideias em
            <br />
            <span className="block mt-4">Soluções Digitais</span>
          </h1>
          
          <div className="h-16 flex items-center justify-center mb-8">
            <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground">
              {displayText}
              <span className="border-r-2 border-primary ml-1 inline-block h-8 opacity-80" />
            </span>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Ajudo pessoas e empresas a crescerem através de aplicações web personalizadas, 
            automações inteligentes e integrações que simplificam processos complexos.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              className="btn-hero group"
              onClick={() => window.open('https://wa.me/5599984870193?text=Olá%20vim%20da%20sua%20pagina%20de%20desenvolvedor,%20gostaria%20de%20conversar%20com%20você%20sobre%20um%20projeto.', '_blank')}
            >
              <span className="mr-2">Vamos Conversar</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="ghost" 
              className="btn-ghost group"
              onClick={() => {
                const portfolioSection = document.getElementById('portfolio');
                portfolioSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Eye className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              <span>Ver Portfólio</span>
            </Button>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-16">
            {['React', 'Next.js', 'TypeScript', 'Supabase', 'API Integration', 'Automation'].map((tech, index) => (
              <div 
                key={tech}
                className="px-4 py-2 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full text-sm font-medium text-card-foreground hover:border-primary/40 transition-colors duration-300"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform duration-300"
        onClick={scrollToNext}
      >
        <div className="scroll-indicator">
          <div className="scroll-dot" />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Scroll para descobrir</p>
      </div>
    </section>
  );
};

export default HeroSection;