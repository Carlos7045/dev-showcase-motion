import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types/blog';
import { ContentImage } from '@/components/OptimizedImage';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ 
  post, 
  featured = false, 
  className = '' 
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Card className={`group overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-dramatic ${className}`}>
      {post.coverImage && (
        <div className="relative aspect-video overflow-hidden">
          <ContentImage
            src={post.coverImage}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-primary-foreground">
                Destaque
              </Badge>
            </div>
          )}
          
          <div className="absolute top-4 right-4 flex flex-wrap gap-2">
            {post.categories.slice(0, 2).map((category) => (
              <Badge 
                key={category.id} 
                variant="secondary" 
                className="bg-background/80 backdrop-blur-sm"
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{post.author.name}</span>
          </div>
        </div>
        
        <CardTitle className={`group-hover:text-gradient transition-all duration-300 ${featured ? 'text-2xl' : 'text-xl'}`}>
          <Link to={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <CardDescription className={`leading-relaxed mb-4 ${featured ? 'text-base' : 'text-sm'}`}>
          {post.excerpt}
        </CardDescription>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
        
        <Link 
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300 font-medium"
        >
          <span>Ler artigo</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </CardContent>
    </Card>
  );
};