import React, { useEffect, useState } from 'react';

interface TechLogo {
  id: string;
  name: string;
  image: string;
  color: string;
  position: {
    top: string;
    left: string;
  };
  scrollTrigger: number; // Porcentagem do scroll para aparecer
}

const ScrollTechLogos: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(-1);

  const techLogos: TechLogo[] = [
    {
      id: 'javascript',
      name: 'JavaScript',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      color: '#F7DF1E',
      position: { top: '15%', left: '85%' },
      scrollTrigger: 10
    },
    {
      id: 'react',
      name: 'React',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: '#61DAFB',
      position: { top: '25%', left: '10%' },
      scrollTrigger: 25
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      color: '#339933',
      position: { top: '35%', left: '90%' },
      scrollTrigger: 40
    },
    {
      id: 'python',
      name: 'Python',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      color: '#3776AB',
      position: { top: '45%', left: '8%' },
      scrollTrigger: 55
    },
    {
      id: 'supabase',
      name: 'Supabase',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
      color: '#3ECF8E',
      position: { top: '55%', left: '88%' },
      scrollTrigger: 70
    },
    {
      id: 'html',
      name: 'HTML5',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      color: '#E34F26',
      position: { top: '65%', left: '12%' },
      scrollTrigger: 85
    },
    {
      id: 'css',
      name: 'CSS3',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      color: '#1572B6',
      position: { top: '75%', left: '92%' },
      scrollTrigger: 95
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);

      // Determinar qual logo deve estar visível baseado no scroll
      let newCurrentIndex = -1;
      for (let i = techLogos.length - 1; i >= 0; i--) {
        if (scrollPercent >= techLogos[i].scrollTrigger) {
          newCurrentIndex = i;
          break;
        }
      }
      
      setCurrentLogoIndex(newCurrentIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar posição inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, [techLogos]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {techLogos.map((logo, index) => {
        const isVisible = currentLogoIndex === index;
        
        return (
          <div
            key={logo.id}
            className={`absolute transition-all duration-1000 ease-out transform ${
              isVisible
                ? 'opacity-100 scale-100 translate-y-0 rotate-0'
                : 'opacity-0 scale-75 translate-y-4 rotate-12'
            }`}
            style={{
              top: logo.position.top,
              left: logo.position.left,
            }}
          >
            {/* Logo Container */}
            <div className="relative group">
              {/* Glow Effect */}
              <div 
                className={`absolute inset-0 rounded-full blur-xl transition-all duration-1000 ${
                  isVisible ? 'opacity-60 scale-110' : 'opacity-0 scale-100'
                }`}
                style={{ backgroundColor: logo.color }}
              />
              
              {/* Outer Ring */}
              <div 
                className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${
                  isVisible ? 'scale-125 opacity-30' : 'scale-100 opacity-0'
                }`}
                style={{ borderColor: logo.color }}
              />
              
              {/* Logo */}
              <div 
                className={`relative w-16 h-16 rounded-full flex items-center justify-center bg-card/90 backdrop-blur-sm border-2 transition-all duration-1000 shadow-2xl ${
                  isVisible ? 'border-opacity-60 scale-100' : 'border-opacity-20 scale-90'
                }`}
                style={{ 
                  borderColor: logo.color,
                  boxShadow: isVisible ? `0 8px 32px ${logo.color}40` : `0 4px 16px ${logo.color}20`
                }}
              >
                <img 
                  src={logo.image} 
                  alt={logo.name}
                  className="w-10 h-10 filter drop-shadow-sm"
                  onError={(e) => {
                    // Fallback se a imagem não carregar
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Tooltip */}
              <div className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-500 pointer-events-none ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}>
                <div 
                  className="bg-card/95 backdrop-blur-sm border rounded-lg px-3 py-1 text-sm font-medium text-card-foreground whitespace-nowrap shadow-lg"
                  style={{ borderColor: `${logo.color}40` }}
                >
                  {logo.name}
                </div>
              </div>

              {/* Floating Particles */}
              {isVisible && (
                <>
                  <div 
                    className="absolute w-2 h-2 rounded-full opacity-60"
                    style={{ 
                      backgroundColor: logo.color,
                      top: '-8px',
                      right: '-8px'
                    }}
                  />
                  <div 
                    className="absolute w-1 h-1 rounded-full opacity-50"
                    style={{ 
                      backgroundColor: logo.color,
                      bottom: '-6px',
                      left: '-6px'
                    }}
                  />
                  <div 
                    className="absolute w-1.5 h-1.5 rounded-full opacity-70"
                    style={{ 
                      backgroundColor: logo.color,
                      top: '-4px',
                      left: '50%'
                    }}
                  />
                </>
              )}
            </div>
          </div>
        );
      })}

      {/* Progress Indicator */}
      <div className="fixed bottom-6 right-6 w-3 h-24 bg-card/30 rounded-full overflow-hidden border border-primary/20">
        <div 
          className="bg-gradient-to-t from-primary to-primary-glow transition-all duration-300 ease-out rounded-full"
          style={{ height: `${Math.min(scrollProgress, 100)}%` }}
        />
        
        {/* Current Tech Indicator */}
        {currentLogoIndex >= 0 && (
          <div 
            className="absolute right-6 w-8 h-8 rounded-full border-2 bg-card/90 backdrop-blur-sm flex items-center justify-center transition-all duration-500"
            style={{ 
              top: `${(currentLogoIndex / (techLogos.length - 1)) * 80 + 10}%`,
              borderColor: techLogos[currentLogoIndex]?.color,
              boxShadow: `0 4px 16px ${techLogos[currentLogoIndex]?.color}40`
            }}
          >
            <img 
              src={techLogos[currentLogoIndex]?.image} 
              alt={techLogos[currentLogoIndex]?.name}
              className="w-5 h-5"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollTechLogos;