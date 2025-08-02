import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface ReadingProgressProps {
  className?: string;
}

export const ReadingProgress: React.FC<ReadingProgressProps> = ({ className = '' }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <Progress 
        value={progress} 
        className="h-1 rounded-none bg-background/20 backdrop-blur-sm"
      />
    </div>
  );
};