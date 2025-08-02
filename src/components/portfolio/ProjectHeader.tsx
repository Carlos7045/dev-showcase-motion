import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Project } from '@/types/portfolio';
import { ContentImage } from '@/components/OptimizedImage';

interface ProjectHeaderProps {
  project: Project;
  className?: string;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project, className = '' }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long'
    }).format(date);
  };

  const getProjectDuration = () => {
    if (!project.endDate) return 'Em andamento';
    
    const start = new Date(project.startDate);
    const end = new Date(project.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.ceil(diffDays / 7);
    const diffMonths = Math.ceil(diffDays / 30);
    
    if (diffDays < 14) return `${diffDays} dias`;
    if (diffWeeks < 8) return `${diffWeeks} semanas`;
    return `${diffMonths} meses`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'concept': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'in-progress': return 'Em Andamento';
      case 'concept': return 'Conceito';
      default: return status;
    }
  };

  const heroImage = project.images.find(img => img.type === 'hero') || project.images[0];

  return (
    <header className={className}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border mb-8">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/portfolio"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Portfolio</span>
            </Link>
            
            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Código
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      {heroImage && (
        <div className="relative aspect-[21/9] mb-8 rounded-2xl overflow-hidden">
          <ContentImage
            src={heroImage.url}
            alt={heroImage.alt}
            width={1200}
            height={500}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Project Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge 
                variant="secondary"
                style={{ backgroundColor: `${project.category.color}20`, color: project.category.color }}
                className="backdrop-blur-sm"
              >
                {project.category.name}
              </Badge>
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                <span className="text-xs font-medium">{getStatusLabel(project.status)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Title and Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gradient leading-tight mb-4">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-xl text-muted-foreground leading-relaxed mb-4">
              {project.subtitle}
            </p>
          )}
          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Project Meta Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Timeline */}
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-medium">Timeline</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <div>{formatDate(project.startDate)}</div>
                {project.endDate && <div>até {formatDate(project.endDate)}</div>}
              </div>
            </CardContent>
          </Card>

          {/* Duration */}
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-accent" />
                <span className="font-medium">Duração</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {getProjectDuration()}
              </div>
            </CardContent>
          </Card>

          {/* Client */}
          {project.client && (
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-primary-glow" />
                  <span className="font-medium">Cliente</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="font-medium text-foreground">{project.client.name}</div>
                  <div>{project.client.industry}</div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Role */}
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-accent" />
                <span className="font-medium">Papel</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Full-Stack Developer
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technologies */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Tecnologias Utilizadas</h3>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <Badge 
                key={tech.name} 
                variant="outline" 
                className="px-3 py-1"
                style={{ borderColor: `${tech.color}40`, color: tech.color }}
              >
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-6" />
      </div>
    </header>
  );
};