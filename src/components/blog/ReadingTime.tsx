import React from 'react';
import { Clock, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ReadingTimeProps {
  content: string;
  wordsPerMinute?: number;
  className?: string;
  showIcon?: boolean;
  variant?: 'default' | 'detailed';
}

export const ReadingTime: React.FC<ReadingTimeProps> = ({
  content,
  wordsPerMinute = 200,
  className = '',
  showIcon = true,
  variant = 'default'
}) => {
  const calculateReadingTime = (text: string) => {
    // Remove markdown syntax and HTML tags
    const cleanText = text
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/`[^`]*`/g, '') // Remove inline code
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    const words = cleanText.split(' ').filter(word => word.length > 0);
    const wordCount = words.length;
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    
    // Calculate additional time for code blocks and images
    const codeBlocks = (content.match(/```[\s\S]*?```/g) || []).length;
    const images = (content.match(/!\[.*?\]\(.*?\)/g) || []).length;
    
    // Add extra time for code blocks (30 seconds each) and images (10 seconds each)
    const additionalTime = Math.ceil((codeBlocks * 0.5) + (images * 0.17));
    
    const totalTime = readingTimeMinutes + additionalTime;
    
    return {
      minutes: totalTime,
      words: wordCount,
      codeBlocks,
      images
    };
  };

  const stats = calculateReadingTime(content);

  if (variant === 'detailed') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {showIcon && <Clock className="w-4 h-4" />}
          <span>{stats.minutes} min de leitura</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <span>{stats.words.toLocaleString()} palavras</span>
          </div>
          {stats.codeBlocks > 0 && (
            <Badge variant="secondary" className="text-xs">
              {stats.codeBlocks} código{stats.codeBlocks > 1 ? 's' : ''}
            </Badge>
          )}
          {stats.images > 0 && (
            <Badge variant="secondary" className="text-xs">
              {stats.images} imagem{stats.images > 1 ? 'ns' : ''}
            </Badge>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      {showIcon && <Clock className="w-4 h-4" />}
      <span>{stats.minutes} min de leitura</span>
    </div>
  );
};