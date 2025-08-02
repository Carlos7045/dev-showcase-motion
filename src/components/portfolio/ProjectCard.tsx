import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Eye, Calendar, ArrowRight, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/portfolio';
import { ContentImage } from '@/components/OptimizedImage';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  featured = false, 
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'short'
    }).format(date);
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
    <Card 
      className={`group overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-dramatic ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      {heroImage && (
        <div className="relative aspect-video overflow-hidden">
          <ContentImage
            src={heroImage.url}
            alt={heroImage.alt}
            width={800}
            height={450}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
              <span className="text-xs font-medium">{getStatusLabel(project.status)}</span>
            </div>
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary text-primary-foreground">
                Destaque
              </Badge>
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.liveUrl && (
              <Button
                size="sm"
                className="bg-background/90 backdrop-blur-sm text-foreground hover:bg-background"
                asChild
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button
                size="sm"
                className="bg-background/90 backdrop-blur-sm text-foreground hover:bg-background"
                asChild
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            )}
            <Button
              size="sm"
              className="bg-primary/90 backdrop-blur-sm text-primary-foreground hover:bg-primary"
              asChild
            >
              <Link to={`/portfolio/${project.slug}`}>
                <Eye className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Play Button for Demo */}
          {project.liveUrl && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="lg"
                className="bg-primary/90 backdrop-blur-sm text-primary-foreground hover:bg-primary rounded-full w-16 h-16"
                asChild
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Play className="w-6 h-6 ml-1" />
                </a>
              </Button>
            </div>
          )}
        </div>
      )}

      <CardHeader className="pb-4">
        {/* Category and Date */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <Badge 
            variant="secondary" 
            style={{ backgroundColor: `${project.category.color}20`, color: project.category.color }}
          >
            {project.category.name}
          </Badge>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(project.startDate)}</span>
          </div>
        </div>

        {/* Title and Subtitle */}
        <CardTitle className={`group-hover:text-gradient transition-all duration-300 ${featured ? 'text-2xl' : 'text-xl'}`}>
          <Link to={`/portfolio/${project.slug}`} className="hover:underline">
            {project.title}
          </Link>
        </CardTitle>
        {project.subtitle && (
          <CardDescription className="text-base font-medium text-muted-foreground">
            {project.subtitle}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        {/* Description */}
        <CardDescription className={`leading-relaxed mb-4 ${featured ? 'text-base' : 'text-sm'}`}>
          {project.description}
        </CardDescription>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, featured ? 6 : 4).map((tech) => (
            <Badge 
              key={tech.name} 
              variant="outline" 
              className="text-xs"
              style={{ borderColor: `${tech.color}40`, color: tech.color }}
            >
              {tech.name}
            </Badge>
          ))}
          {project.technologies.length > (featured ? 6 : 4) && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - (featured ? 6 : 4)}
            </Badge>
          )}
        </div>

        {/* Metrics Preview */}
        {project.metrics && (
          <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted/30 rounded-lg">
            {project.metrics.performance?.lighthouse && (
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{project.metrics.performance.lighthouse}</div>
                <div className="text-xs text-muted-foreground">Lighthouse</div>
              </div>
            )}
            {project.metrics.business?.conversionRate && (
              <div className="text-center">
                <div className="text-lg font-bold text-accent">{project.metrics.business.conversionRate}</div>
                <div className="text-xs text-muted-foreground">Conversão</div>
              </div>
            )}
          </div>
        )}

        {/* Client Info */}
        {project.client && (
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <span>Cliente:</span>
            <span className="font-medium text-foreground">{project.client.name}</span>
            <Badge variant="outline" className="text-xs">
              {project.client.industry}
            </Badge>
          </div>
        )}

        {/* Action Links */}
        <div className="flex items-center justify-between">
          <Link 
            to={`/portfolio/${project.slug}`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300 font-medium"
          >
            <span>Ver case study</span>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </Link>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <Button variant="ghost" size="sm" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="ghost" size="sm" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};