import React, { useRef } from 'react';
import { Mail, Github, Linkedin, Instagram } from 'lucide-react';

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  label: string;
  color: string;
}

const MouseFollowSocials: React.FC = () => {
  const socialLinks: SocialLink[] = [
    { 
      icon: Github, 
      url: 'https://github.com/carlos7045', 
      label: 'GitHub',
      color: 'hover:text-gray-400'
    },
    { 
      icon: Linkedin, 
      url: 'https://linkedin.com/in/carlos-henrique-salgado-8b8b8b8b8', 
      label: 'LinkedIn',
      color: 'hover:text-blue-500'
    },
    { 
      icon: Instagram, 
      url: 'https://instagram.com/carlos_salgado704', 
      label: 'Instagram',
      color: 'hover:text-pink-500'
    },
    { 
      icon: Mail, 
      url: 'mailto:salgadocarloshenrique@gmail.com', 
      label: 'E-mail',
      color: 'hover:text-blue-400'
    }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, buttonRef: React.RefObject<HTMLAnchorElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calcular a distância do mouse em relação ao centro do botão
    const deltaX = (e.clientX - centerX) * 0.15; // Fator de movimento
    const deltaY = (e.clientY - centerY) * 0.15;
    
    // Aplicar transformação apenas neste botão
    button.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.1)`;
  };

  const handleMouseLeave = (buttonRef: React.RefObject<HTMLAnchorElement>) => {
    const button = buttonRef.current;
    if (!button) return;
    
    // Retornar à posição original
    button.style.transform = 'translate(0px, 0px) scale(1)';
  };

  return (
    <div className="flex gap-4">
      {socialLinks.map((social, index) => {
        const buttonRef = useRef<HTMLAnchorElement>(null);
        
        return (
          <a
            key={social.label}
            ref={buttonRef}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-12 h-12 bg-card/50 border border-primary/20 rounded-xl flex items-center justify-center hover:border-primary/40 hover:bg-card transition-all duration-200 ${social.color}`}
            aria-label={social.label}
            onMouseMove={(e) => handleMouseMove(e, buttonRef)}
            onMouseLeave={() => handleMouseLeave(buttonRef)}
            style={{
              transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease',
              transformOrigin: 'center'
            }}
          >
            <social.icon className="w-5 h-5 text-gray-600 dark:text-gray-300 transition-colors duration-300" />
          </a>
        );
      })}
    </div>
  );
};

export { MouseFollowSocials };