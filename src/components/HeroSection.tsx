import { useEffect, useState } from 'react';
import { ChevronDown, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroImage, useImagePreload } from '@/components/OptimizedImage';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  // Preload da imagem hero para melhor performance
  useImagePreload(heroBg, true);
  
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
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label="Seção principal do site"
    >
      {/* Background with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <HeroImage
          src={heroBg}
          alt="Imagem de fundo com tema tecnológico"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ backgroundAttachment: 'fixed' }}
          priority={true}
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Floating Elements - Decorative only */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" aria-hidden="true" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-glow/10 rounded-full blur-lg animate-bounce delay-500" aria-hidden="true" />

      {/* Main Content */}
      <header className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-hero text-gradient mb-6">
            Transformando Ideias em
            <br />
            <span className="block mt-4">Soluções Digitais</span>
          </h1>
          
          <div 
            className="h-16 flex items-center justify-center mb-8"
            role="text"
            aria-live="polite"
            aria-label="Especialidades em rotação"
          >
            <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground">
              {displayText}
              <span className="border-r-2 border-primary animate-blink ml-1 inline-block h-8" aria-hidden="true" />
            </span>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in delay-200">
            Ajudo pessoas e empresas a crescerem através de aplicações web personalizadas, 
            automações inteligentes e integrações que simplificam processos complexos.
          </p>

          <nav className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in delay-400" role="navigation" aria-label="Ações principais">
            <Button 
              className="btn-hero group"
              aria-label="Iniciar conversa sobre projeto"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/contato';
                }
              }}
            >
              <span className="mr-2">Vamos Conversar</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
            
            <Button 
              variant="ghost" 
              className="btn-ghost group"
              aria-label="Baixar currículo em PDF"
              onClick={() => {
                // Criar um link temporário para download
                const link = document.createElement('a');
                link.href = '/cv.pdf'; // Você precisará adicionar o arquivo CV na pasta public
                link.download = 'CV-Desenvolvedor-FullStack.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform" aria-hidden="true" />
              <span>Download CV</span>
            </Button>
          </nav>

          {/* Tech Stack Pills */}
          <div 
            className="flex flex-wrap justify-center gap-3 mt-16 animate-fade-in delay-600"
            role="list"
            aria-label="Principais tecnologias utilizadas"
          >
            {['React', 'Next.js', 'TypeScript', 'Supabase', 'API Integration', 'Automation'].map((tech, index) => (
              <div 
                key={tech}
                className="px-4 py-2 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full text-sm font-medium text-card-foreground hover:border-primary/40 transition-colors duration-300"
                style={{ animationDelay: `${600 + index * 100}ms` }}
                role="listitem"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Scroll Indicator */}
      <button 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2"
        onClick={scrollToNext}
        aria-label="Rolar para a próxima seção"
        type="button"
      >
        <div className="scroll-indicator">
          <div className="scroll-dot" />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Scroll para descobrir</p>
        <ChevronDown className="w-4 h-4 mx-auto mt-1 text-primary" aria-hidden="true" />
      </button>
    </section>
  );
};

export default HeroSection;