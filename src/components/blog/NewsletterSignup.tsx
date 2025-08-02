import React, { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NewsletterSignupProps {
  className?: string;
  variant?: 'default' | 'inline' | 'sidebar';
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  className = '',
  variant = 'default'
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Por favor, insira um email válido.');
      return;
    }

    setStatus('loading');
    
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aqui você integraria com seu serviço de newsletter (Mailchimp, ConvertKit, etc.)
      console.log('Newsletter signup:', email);
      
      setStatus('success');
      setMessage('Obrigado! Você foi inscrito com sucesso.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Erro ao inscrever. Tente novamente.');
    }
  };

  if (variant === 'inline') {
    return (
      <div className={`bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6 ${className}`}>
        <div className="text-center mb-4">
          <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Gostou do conteúdo?</h3>
          <p className="text-sm text-muted-foreground">
            Receba os melhores artigos sobre desenvolvimento diretamente no seu email.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="text-center"
          />
          <Button 
            type="submit" 
            className="w-full btn-hero"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? (
              'Inscrevendo...'
            ) : status === 'success' ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Inscrito!
              </>
            ) : (
              'Inscrever-se Gratuitamente'
            )}
          </Button>
        </form>

        {message && (
          <Alert className={`mt-3 ${status === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {message}
            </AlertDescription>
          </Alert>
        )}
        
        <p className="text-xs text-muted-foreground text-center mt-3">
          Sem spam. Cancele a qualquer momento.
        </p>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <Card className={`border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Newsletter
          </CardTitle>
          <CardDescription>
            Receba os melhores artigos sobre desenvolvimento diretamente no seu email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
            />
            <Button 
              type="submit" 
              className="w-full btn-hero"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? (
                'Inscrevendo...'
              ) : status === 'success' ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Inscrito!
                </>
              ) : (
                'Inscrever-se'
              )}
            </Button>
          </form>

          {message && (
            <Alert className={`mt-3 ${status === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                {message}
              </AlertDescription>
            </Alert>
          )}
          
          <p className="text-xs text-muted-foreground mt-2">
            Sem spam. Cancele a qualquer momento.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={`border-primary/20 ${className}`}>
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl">Fique por dentro das novidades</CardTitle>
        <CardDescription className="text-base">
          Receba artigos exclusivos sobre desenvolvimento, tutoriais práticos e insights 
          sobre as últimas tecnologias diretamente no seu email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Digite seu melhor email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="text-lg py-3"
          />
          <Button 
            type="submit" 
            size="lg"
            className="w-full btn-hero"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? (
              'Inscrevendo...'
            ) : status === 'success' ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Inscrito com sucesso!
              </>
            ) : (
              'Inscrever-se Gratuitamente'
            )}
          </Button>
        </form>

        {message && (
          <Alert className={`mt-4 ${status === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {message}
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center text-sm text-muted-foreground">
            <div>
              <div className="font-semibold text-foreground">500+</div>
              <div>Desenvolvedores</div>
            </div>
            <div>
              <div className="font-semibold text-foreground">2x/mês</div>
              <div>Frequência</div>
            </div>
            <div>
              <div className="font-semibold text-foreground">0%</div>
              <div>Spam</div>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          Ao se inscrever, você concorda em receber emails sobre desenvolvimento. 
          Cancele a qualquer momento.
        </p>
      </CardContent>
    </Card>
  );
};