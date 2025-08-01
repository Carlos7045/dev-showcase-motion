import { Heart, Code2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Contato', href: '#contact' }
  ];

  const technologies = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL'
  ];

  return (
    <footer className="relative bg-gradient-to-t from-background to-card/20 border-t border-primary/20 py-12 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-gradient">Dev Solutions</h3>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md leading-relaxed">
              Transformando ideias em soluções digitais que fazem a diferença. 
              Especialista em desenvolvimento web, automações e integrações.
            </p>
            <p className="text-sm text-muted-foreground">
              📍 São Paulo, Brasil | 🌍 Atendimento Global
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navegação</h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover-underline"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Tecnologias</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md border border-primary/20 hover:border-primary/40 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © {currentYear} Dev Solutions. Todos os direitos reservados.
            </p>

            {/* Made with Love */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>e muito</span>
              <Code2 className="w-4 h-4 text-primary" />
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover-underline"
            >
              ↑ Voltar ao Topo
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-2xl" />
      </div>
    </footer>
  );
};

export default Footer;