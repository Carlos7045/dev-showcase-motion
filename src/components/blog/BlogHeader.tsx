import React from 'react';
import { Calendar, Clock, User, Share2, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/types/blog';
import { ContentImage } from '@/components/OptimizedImage';

interface BlogHeaderProps {
  post: BlogPost;
  className?: string;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({ post, className = '' }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback para copiar URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleBookmark = () => {
    // Implementar funcionalidade de bookmark
    console.log('Bookmark post:', post.slug);
  };

  return (
    <header className={`${className}`}>
      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative aspect-[21/9] mb-8 rounded-2xl overflow-hidden">
          <ContentImage
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={500}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Categories overlay */}
          <div className="absolute top-6 left-6 flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Badge 
                key={category.id}
                className="bg-background/80 backdrop-blur-sm text-foreground"
              >
                {category.name}
              </Badge>
            ))}
          </div>

          {/* Actions overlay */}
          <div className="absolute top-6 right-6 flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleShare}
              className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleBookmark}
              className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
            >
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Title and Meta */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gradient leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span className="font-medium text-foreground">{post.author.name}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishDate)}</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} min de leitura</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-sm">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-6" />
      </div>
    </header>
  );
};