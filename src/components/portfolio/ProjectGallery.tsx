import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProjectImage } from '@/types/portfolio';
import { ContentImage } from '@/components/OptimizedImage';

interface ProjectGalleryProps {
  images: ProjectImage[];
  className?: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, className = '' }) => {
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getImageTypeLabel = (type: string) => {
    switch (type) {
      case 'hero': return 'Principal';
      case 'screenshot': return 'Screenshot';
      case 'mockup': return 'Mockup';
      case 'diagram': return 'Diagrama';
      case 'before': return 'Antes';
      case 'after': return 'Depois';
      default: return type;
    }
  };

  const getImageTypeColor = (type: string) => {
    switch (type) {
      case 'hero': return 'bg-primary text-primary-foreground';
      case 'screenshot': return 'bg-accent text-accent-foreground';
      case 'mockup': return 'bg-primary-glow text-primary-glow-foreground';
      case 'diagram': return 'bg-blue-500 text-white';
      case 'before': return 'bg-red-500 text-white';
      case 'after': return 'bg-green-500 text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const openLightbox = (image: ProjectImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + images.length) % images.length
      : (currentIndex + 1) % images.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const sortedImages = [...images].sort((a, b) => a.order - b.order);

  return (
    <>
      <section className={`space-y-8 ${className}`}>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gradient mb-4">Galeria do Projeto</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore as diferentes telas e funcionalidades desenvolvidas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-video overflow-hidden rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer"
              onClick={() => openLightbox(image, index)}
            >
              <ContentImage
                src={image.url}
                alt={image.alt}
                width={600}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              
              {/* Type Badge */}
              <div className="absolute top-3 left-3">
                <Badge className={getImageTypeColor(image.type)}>
                  {getImageTypeLabel(image.type)}
                </Badge>
              </div>
              
              {/* Zoom Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-gray-900" />
                </div>
              </div>
              
              {/* Caption */}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-black/95 border-0">
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateImage('prev')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateImage('next')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}

              {/* Image */}
              <div className="relative max-w-full max-h-full">
                <ContentImage
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className={getImageTypeColor(selectedImage.type)}>
                    {getImageTypeLabel(selectedImage.type)}
                  </Badge>
                  <span className="text-white/60 text-sm">
                    {currentIndex + 1} de {images.length}
                  </span>
                </div>
                {selectedImage.caption && (
                  <p className="text-white text-lg font-medium">{selectedImage.caption}</p>
                )}
                <p className="text-white/80 text-sm mt-1">{selectedImage.alt}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};