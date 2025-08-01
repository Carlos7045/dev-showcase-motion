import React from 'react';
import { cn } from '@/lib/utils';

interface SkipLink {
  href: string;
  label: string;
}

interface SkipLinksProps {
  links?: SkipLink[];
  className?: string;
}

const defaultLinks: SkipLink[] = [
  { href: '#main-content', label: 'Pular para o conteúdo principal' },
  { href: '#navigation', label: 'Pular para a navegação' },
  { href: '#footer', label: 'Pular para o rodapé' }
];

export const SkipLinks: React.FC<SkipLinksProps> = ({ 
  links = defaultLinks, 
  className 
}) => {
  const handleSkipClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    
    const target = document.querySelector(href) as HTMLElement;
    if (target) {
      // Torna o elemento focável temporariamente se necessário
      const originalTabIndex = target.tabIndex;
      if (target.tabIndex < 0) {
        target.tabIndex = -1;
      }
      
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Restaura o tabIndex original após um tempo
      setTimeout(() => {
        if (originalTabIndex >= 0) {
          target.tabIndex = originalTabIndex;
        } else {
          target.removeAttribute('tabindex');
        }
      }, 100);
    }
  };

  return (
    <nav 
      className={cn(
        'skip-links fixed top-0 left-0 z-[9999] p-2',
        className
      )}
      aria-label="Links de navegação rápida"
    >
      <ul className="flex flex-col gap-1">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              onClick={(e) => handleSkipClick(e, link.href)}
              className={cn(
                'skip-link',
                'inline-block px-4 py-2 bg-primary text-primary-foreground',
                'font-medium text-sm rounded-md shadow-lg',
                'transform -translate-y-full opacity-0',
                'focus:translate-y-0 focus:opacity-100',
                'transition-all duration-200 ease-in-out',
                'focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2'
              )}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Componente para marcar regiões principais da página
export const LandmarkRegion: React.FC<{
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  label?: string;
  labelledBy?: string;
  className?: string;
}> = ({ 
  children, 
  as: Component = 'div', 
  id, 
  label, 
  labelledBy, 
  className 
}) => {
  const props: any = {
    id,
    className,
    ...(label && { 'aria-label': label }),
    ...(labelledBy && { 'aria-labelledby': labelledBy })
  };

  return React.createElement(Component, props, children);
};

// Componente para conteúdo principal
export const MainContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <LandmarkRegion
    as="main"
    id="main-content"
    label="Conteúdo principal"
    className={cn('focus:outline-none', className)}
  >
    {children}
  </LandmarkRegion>
);

// Componente para navegação principal
export const MainNavigation: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <LandmarkRegion
    as="nav"
    id="navigation"
    label="Navegação principal"
    className={className}
  >
    {children}
  </LandmarkRegion>
);

// Componente para rodapé
export const MainFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <LandmarkRegion
    as="footer"
    id="footer"
    label="Rodapé"
    className={className}
  >
    {children}
  </LandmarkRegion>
);

// Hook para gerenciar skip links dinamicamente
export const useSkipLinks = () => {
  const [links, setLinks] = React.useState<SkipLink[]>(defaultLinks);

  const addSkipLink = (link: SkipLink) => {
    setLinks(prev => [...prev, link]);
  };

  const removeSkipLink = (href: string) => {
    setLinks(prev => prev.filter(link => link.href !== href));
  };

  const updateSkipLink = (href: string, newLink: Partial<SkipLink>) => {
    setLinks(prev => prev.map(link => 
      link.href === href ? { ...link, ...newLink } : link
    ));
  };

  return {
    links,
    addSkipLink,
    removeSkipLink,
    updateSkipLink
  };
};