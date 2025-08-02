import React from 'react';
import { Settings, Plus, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ContactFormData, Service } from '@/types/contact';

interface RequirementsStepProps {
  data: Partial<ContactFormData>;
  onChange: (data: Partial<ContactFormData>) => void;
}

export const RequirementsStep: React.FC<RequirementsStepProps> = ({ data, onChange }) => {
  const handleServiceChange = (service: Service, checked: boolean) => {
    const currentServices = data.services || [];
    const updatedServices = checked
      ? [...currentServices, service]
      : currentServices.filter(s => s !== service);
    
    onChange({ services: updatedServices });
  };

  const handleFeatureAdd = (feature: string) => {
    if (!feature.trim()) return;
    
    const currentFeatures = data.features || [];
    if (!currentFeatures.includes(feature.trim())) {
      onChange({ features: [...currentFeatures, feature.trim()] });
    }
  };

  const handleFeatureRemove = (feature: string) => {
    const currentFeatures = data.features || [];
    onChange({ features: currentFeatures.filter(f => f !== feature) });
  };

  const handleIntegrationAdd = (integration: string) => {
    if (!integration.trim()) return;
    
    const currentIntegrations = data.integrations || [];
    if (!currentIntegrations.includes(integration.trim())) {
      onChange({ integrations: [...currentIntegrations, integration.trim()] });
    }
  };

  const handleIntegrationRemove = (integration: string) => {
    const currentIntegrations = data.integrations || [];
    onChange({ integrations: currentIntegrations.filter(i => i !== integration) });
  };

  const services = [
    { value: 'frontend' as Service, label: 'Frontend Development', description: 'Interface do usuário' },
    { value: 'backend' as Service, label: 'Backend Development', description: 'Servidor e APIs' },
    { value: 'fullstack' as Service, label: 'Full-Stack Development', description: 'Desenvolvimento completo' },
    { value: 'design' as Service, label: 'UI/UX Design', description: 'Design de interface' },
    { value: 'seo' as Service, label: 'SEO Optimization', description: 'Otimização para buscadores' },
    { value: 'hosting' as Service, label: 'Hospedagem', description: 'Deploy e infraestrutura' },
    { value: 'maintenance' as Service, label: 'Manutenção', description: 'Suporte contínuo' },
    { value: 'consulting' as Service, label: 'Consultoria', description: 'Orientação técnica' }
  ];

  const commonFeatures = [
    'Sistema de login',
    'Painel administrativo',
    'Integração com pagamentos',
    'Sistema de busca',
    'Chat/Suporte',
    'Notificações',
    'Relatórios',
    'API REST',
    'Responsivo mobile',
    'Multi-idioma'
  ];

  const commonIntegrations = [
    'Google Analytics',
    'Stripe/PayPal',
    'Mailchimp',
    'WhatsApp',
    'Google Maps',
    'Social Login',
    'CRM (HubSpot, RD)',
    'ERP',
    'Zapier',
    'AWS/Vercel'
  ];

  const [newFeature, setNewFeature] = React.useState('');
  const [newIntegration, setNewIntegration] = React.useState('');

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Quais serviços você precisa?</h3>
        <p className="text-muted-foreground">
          Selecione os serviços e funcionalidades que seu projeto necessita.
        </p>
      </div>

      {/* Services */}
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Serviços necessários *
        </Label>
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div key={service.value} className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary/40 transition-colors">
              <Checkbox
                id={service.value}
                checked={(data.services || []).includes(service.value)}
                onCheckedChange={(checked) => handleServiceChange(service.value, checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor={service.value} className="font-medium cursor-pointer">
                  {service.label}
                </Label>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        {(!data.services || data.services.length === 0) && (
          <p className="text-sm text-red-500">Selecione pelo menos um serviço</p>
        )}
      </div>

      {/* Features */}
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Funcionalidades específicas
        </Label>
        <p className="text-sm text-muted-foreground">
          Clique nas funcionalidades comuns ou adicione suas próprias necessidades.
        </p>
        
        {/* Common Features */}
        <div className="flex flex-wrap gap-2">
          {commonFeatures.map((feature) => (
            <Button
              key={feature}
              variant="outline"
              size="sm"
              onClick={() => handleFeatureAdd(feature)}
              disabled={(data.features || []).includes(feature)}
              className="text-xs"
            >
              <Plus className="w-3 h-3 mr-1" />
              {feature}
            </Button>
          ))}
        </div>

        {/* Custom Feature Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Digite uma funcionalidade personalizada..."
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleFeatureAdd(newFeature);
                setNewFeature('');
              }
            }}
          />
          <Button
            type="button"
            onClick={() => {
              handleFeatureAdd(newFeature);
              setNewFeature('');
            }}
            disabled={!newFeature.trim()}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Selected Features */}
        {data.features && data.features.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Funcionalidades selecionadas:</Label>
            <div className="flex flex-wrap gap-2">
              {data.features.map((feature) => (
                <Badge key={feature} variant="secondary" className="flex items-center gap-1">
                  {feature}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 hover:bg-transparent"
                    onClick={() => handleFeatureRemove(feature)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Integrations */}
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Integrações necessárias
        </Label>
        <p className="text-sm text-muted-foreground">
          Quais sistemas ou serviços precisam ser integrados?
        </p>
        
        {/* Common Integrations */}
        <div className="flex flex-wrap gap-2">
          {commonIntegrations.map((integration) => (
            <Button
              key={integration}
              variant="outline"
              size="sm"
              onClick={() => handleIntegrationAdd(integration)}
              disabled={(data.integrations || []).includes(integration)}
              className="text-xs"
            >
              <Plus className="w-3 h-3 mr-1" />
              {integration}
            </Button>
          ))}
        </div>

        {/* Custom Integration Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Digite uma integração personalizada..."
            value={newIntegration}
            onChange={(e) => setNewIntegration(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleIntegrationAdd(newIntegration);
                setNewIntegration('');
              }
            }}
          />
          <Button
            type="button"
            onClick={() => {
              handleIntegrationAdd(newIntegration);
              setNewIntegration('');
            }}
            disabled={!newIntegration.trim()}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Selected Integrations */}
        {data.integrations && data.integrations.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Integrações selecionadas:</Label>
            <div className="flex flex-wrap gap-2">
              {data.integrations.map((integration) => (
                <Badge key={integration} variant="secondary" className="flex items-center gap-1">
                  {integration}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 hover:bg-transparent"
                    onClick={() => handleIntegrationRemove(integration)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h4 className="font-medium text-primary mb-2">📋 Resumo dos Requisitos</h4>
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>Serviços:</strong> {(data.services || []).length} selecionados</p>
          <p><strong>Funcionalidades:</strong> {(data.features || []).length} especificadas</p>
          <p><strong>Integrações:</strong> {(data.integrations || []).length} necessárias</p>
        </div>
      </div>
    </div>
  );
};