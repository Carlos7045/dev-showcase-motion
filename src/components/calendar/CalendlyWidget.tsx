import React, { useEffect } from 'react';
import { Calendar, Clock, Video, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CalendlyWidgetProps {
  url?: string;
  prefill?: {
    name?: string;
    email?: string;
    customAnswers?: Record<string, string>;
  };
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
    utmContent?: string;
    utmTerm?: string;
  };
  className?: string;
}

export const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({
  url = 'https://calendly.com/seudominio/30min',
  prefill,
  utm,
  className = ''
}) => {
  useEffect(() => {
    // Carregar o script do Calendly
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const buildCalendlyUrl = () => {
    const baseUrl = url;
    const params = new URLSearchParams();

    // Adicionar prefill data
    if (prefill?.name) params.append('name', prefill.name);
    if (prefill?.email) params.append('email', prefill.email);
    
    // Adicionar custom answers
    if (prefill?.customAnswers) {
      Object.entries(prefill.customAnswers).forEach(([key, value]) => {
        params.append(`a${key}`, value);
      });
    }

    // Adicionar UTM parameters
    if (utm?.utmCampaign) params.append('utm_campaign', utm.utmCampaign);
    if (utm?.utmSource) params.append('utm_source', utm.utmSource);
    if (utm?.utmMedium) params.append('utm_medium', utm.utmMedium);
    if (utm?.utmContent) params.append('utm_content', utm.utmContent);
    if (utm?.utmTerm) params.append('utm_term', utm.utmTerm);

    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  };

  const openCalendlyPopup = () => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: buildCalendlyUrl()
      });
    }
  };

  const meetingTypes = [
    {
      title: 'Consulta Inicial',
      duration: '30 min',
      description: 'Conversa gratuita para entender seu projeto',
      icon: User,
      color: 'text-primary'
    },
    {
      title: 'Reunião Técnica',
      duration: '45 min',
      description: 'Discussão detalhada sobre requisitos técnicos',
      icon: Calendar,
      color: 'text-accent'
    },
    {
      title: 'Demo de Projeto',
      duration: '30 min',
      description: 'Apresentação de progresso ou entrega',
      icon: Video,
      color: 'text-primary-glow'
    }
  ];

  return (
    <div className={className}>
      {/* Meeting Types */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {meetingTypes.map((meeting, index) => (
          <Card key={meeting.title} className="border-primary/20 hover:border-primary/40 transition-colors duration-300">
            <CardHeader className="text-center pb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-${meeting.color.split('-')[1]}-100 dark:bg-${meeting.color.split('-')[1]}-900/30`}>
                <meeting.icon className={`w-6 h-6 ${meeting.color}`} />
              </div>
              <CardTitle className="text-lg">{meeting.title}</CardTitle>
              <Badge variant="secondary">{meeting.duration}</Badge>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="mb-4">{meeting.description}</CardDescription>
              <Button 
                onClick={openCalendlyPopup}
                className="w-full btn-hero"
              >
                Agendar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calendly Inline Widget */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Escolha o Melhor Horário
          </CardTitle>
          <CardDescription>
            Selecione um horário que funcione para você. Todas as reuniões são por videochamada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="calendly-inline-widget" 
            data-url={buildCalendlyUrl()}
            style={{ minWidth: '320px', height: '700px' }}
          />
        </CardContent>
      </Card>

      {/* Meeting Info */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-primary" />
              O que esperar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Conversa descontraída sobre seu projeto</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Análise de viabilidade e escopo</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Estimativa inicial de prazo e investimento</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Próximos passos definidos</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Video className="w-5 h-5 text-primary" />
              Detalhes da Reunião
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plataforma:</span>
                <span className="font-medium">Google Meet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duração:</span>
                <span className="font-medium">30-45 minutos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Custo:</span>
                <span className="font-medium text-green-600">Gratuito</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cancelamento:</span>
                <span className="font-medium">Até 2h antes</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-primary/5 rounded-lg">
              <p className="text-xs text-center text-muted-foreground">
                Você receberá um email de confirmação com o link da reunião
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};