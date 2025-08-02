import React from 'react';
import { User, Briefcase, Settings, Info, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ContactFormData } from '@/types/contact';

interface FormSummaryProps {
  data: Partial<ContactFormData>;
  currentStep: number;
  className?: string;
}

export const FormSummary: React.FC<FormSummaryProps> = ({ data, currentStep, className = '' }) => {
  const getProjectTypeLabel = (type: string) => {
    const types = {
      'website': 'Website Institucional',
      'webapp': 'Aplicação Web',
      'ecommerce': 'E-commerce',
      'automation': 'Automação',
      'integration': 'Integração',
      'consultation': 'Consultoria',
      'other': 'Outro'
    };
    return types[type as keyof typeof types] || type;
  };

  const getBudgetLabel = (budget: string) => {
    const budgets = {
      'under-5k': 'Até R$ 5.000',
      '5k-15k': 'R$ 5.000 - R$ 15.000',
      '15k-30k': 'R$ 15.000 - R$ 30.000',
      '30k-50k': 'R$ 30.000 - R$ 50.000',
      'over-50k': 'Acima de R$ 50.000',
      'discuss': 'Prefiro discutir'
    };
    return budgets[budget as keyof typeof budgets] || budget;
  };

  const getTimelineLabel = (timeline: string) => {
    const timelines = {
      'asap': 'O mais rápido possível',
      '1-month': '1 mês',
      '2-3-months': '2-3 meses',
      '3-6-months': '3-6 meses',
      'flexible': 'Flexível',
      'discuss': 'Vamos discutir'
    };
    return timelines[timeline as keyof typeof timelines] || timeline;
  };

  const getContactMethodLabel = (method: string) => {
    const methods = {
      'email': 'Email',
      'phone': 'Telefone',
      'whatsapp': 'WhatsApp',
      'video-call': 'Videochamada',
      'in-person': 'Presencial'
    };
    return methods[method as keyof typeof methods] || method;
  };

  const getUrgencyLabel = (urgency: string) => {
    const urgencies = {
      'low': 'Baixa',
      'medium': 'Média',
      'high': 'Alta',
      'urgent': 'Urgente'
    };
    return urgencies[urgency as keyof typeof urgencies] || urgency;
  };

  return (
    <Card className={`border-primary/20 ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg">Resumo do Projeto</CardTitle>
        <CardDescription>
          Informações coletadas até agora
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        {currentStep > 1 && data.name && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <User className="w-4 h-4 text-primary" />
              Informações Básicas
            </div>
            <div className="pl-6 space-y-1 text-sm text-muted-foreground">
              <p><strong>Nome:</strong> {data.name}</p>
              <p><strong>Email:</strong> {data.email}</p>
              {data.phone && <p><strong>Telefone:</strong> {data.phone}</p>}
              {data.company && <p><strong>Empresa:</strong> {data.company}</p>}
            </div>
          </div>
        )}

        {/* Project Details */}
        {currentStep > 2 && data.projectType && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Briefcase className="w-4 h-4 text-primary" />
              Detalhes do Projeto
            </div>
            <div className="pl-6 space-y-1 text-sm text-muted-foreground">
              <p><strong>Tipo:</strong> {getProjectTypeLabel(data.projectType)}</p>
              {data.budget && <p><strong>Orçamento:</strong> {getBudgetLabel(data.budget)}</p>}
              {data.timeline && <p><strong>Prazo:</strong> {getTimelineLabel(data.timeline)}</p>}
              {data.description && (
                <p><strong>Descrição:</strong> {data.description.substring(0, 100)}{data.description.length > 100 ? '...' : ''}</p>
              )}
            </div>
          </div>
        )}

        {/* Requirements */}
        {currentStep > 3 && data.services && data.services.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Settings className="w-4 h-4 text-primary" />
              Requisitos
            </div>
            <div className="pl-6 space-y-2 text-sm text-muted-foreground">
              <div>
                <strong>Serviços:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {data.services.slice(0, 3).map((service) => (
                    <Badge key={service} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {data.services.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{data.services.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              {data.features && data.features.length > 0 && (
                <p><strong>Funcionalidades:</strong> {data.features.length} especificadas</p>
              )}
              {data.integrations && data.integrations.length > 0 && (
                <p><strong>Integrações:</strong> {data.integrations.length} necessárias</p>
              )}
            </div>
          </div>
        )}

        {/* Additional Info */}
        {currentStep > 4 && data.designPreferences && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Info className="w-4 h-4 text-primary" />
              Informações Adicionais
            </div>
            <div className="pl-6 space-y-1 text-sm text-muted-foreground">
              <p><strong>Website existente:</strong> {data.hasExistingWebsite ? 'Sim' : 'Não'}</p>
              {data.currentWebsite && <p><strong>URL atual:</strong> {data.currentWebsite}</p>}
              <p><strong>Preferências de design:</strong> {data.designPreferences.substring(0, 80)}{data.designPreferences.length > 80 ? '...' : ''}</p>
            </div>
          </div>
        )}

        {/* Contact Preferences */}
        {currentStep > 5 && data.preferredContact && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MessageSquare className="w-4 h-4 text-primary" />
              Preferências de Contato
            </div>
            <div className="pl-6 space-y-1 text-sm text-muted-foreground">
              <p><strong>Método:</strong> {getContactMethodLabel(data.preferredContact)}</p>
              {data.urgency && <p><strong>Urgência:</strong> {getUrgencyLabel(data.urgency)}</p>}
              {data.availability && <p><strong>Disponibilidade:</strong> {data.availability.substring(0, 50)}{data.availability.length > 50 ? '...' : ''}</p>}
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progresso do formulário</span>
            <span>{Math.round((currentStep / 5) * 100)}% completo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};