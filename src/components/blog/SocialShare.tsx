import React, { useState } from 'react';
import { Share2, Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BlogPost } from '@/types/blog';

interface SocialShareProps {
  post: BlogPost;
  className?: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({ post, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const currentUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(post.title);
  const encodedText = encodeURIComponent(post.excerpt);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=dev_fullstack`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: currentUrl,
        });
        setIsOpen(false);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleSocialShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            Compartilhar
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <Card className="border-0 shadow-none">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-4">Compartilhar artigo</h4>
              
              <div className="space-y-3">
                {/* Native Share (if available) */}
                {navigator.share && (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3"
                    onClick={handleNativeShare}
                  >
                    <Share2 className="w-4 h-4" />
                    Compartilhar via sistema
                  </Button>
                )}

                {/* Social Media Buttons */}
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950"
                  onClick={() => handleSocialShare('twitter')}
                >
                  <Twitter className="w-4 h-4 text-blue-500" />
                  Compartilhar no Twitter
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950"
                  onClick={() => handleSocialShare('linkedin')}
                >
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  Compartilhar no LinkedIn
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950"
                  onClick={() => handleSocialShare('facebook')}
                >
                  <Facebook className="w-4 h-4 text-blue-700" />
                  Compartilhar no Facebook
                </Button>

                {/* Copy Link */}
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      Link copiado!
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4" />
                      Copiar link
                    </>
                  )}
                </Button>
              </div>

              {/* Share Stats (opcional) */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Ajude outros desenvolvedores compartilhando este conteúdo!
                </p>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};