import React from 'react';
import { MessageSquare, Clock, AlertCircle, Shield } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ContactFormData, ContactMethod, UrgencyLevel } from '@/types/contact';

interface ContactPreferencesStepProps {
  data: Partial<ContactFormData>;
  onChange: (data: Partial<ContactFormData>) => void;
}

export const ContactPreferencesStep: React.FC<ContactPreferencesStepProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof ContactFormData, value: any) => {
    onChange({ [field]: value });
  };

  const contactMethods = [
    { value: 'email' as ContactMethod, label: 'Email', description: 'Resposta em até 4 horas' },
    { value: 'phone' as ContactMethod, label: 'Telefone', description: 'Ligação direta' },
    { value: 'whatsapp' as ContactMethod, label: 'WhatsApp', description: 'Mensagem rápida' },
    { value: 'video-call' as ContactMethod, label: 'Videochamada', description: 'Google Meet ou Zoom' },
    { value: 'in-person' as ContactMethod, label: 'Presencial', description: 'Reunião no escritório' }
  ];

  const urgencyLevels = [
    { value: 'low' as UrgencyLevel, label: 'Baixa', description: 'Sem pressa, vamos com calma', color: 'text-green-600' },
    { value: 'medium' as UrgencyLevel, label: 'Média', description: 'Prazo normal de projeto', color: 'text-yellow-600' },
    { value: 'high' as UrgencyLevel, label: 'Alta', description: 'Preciso começar logo', color: 'text-orange-600' },
    { value: 'urgent' as UrgencyLevel, label: 'Urgente', description: 'É para ontem!', color: 'text-red-600' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Como prefere que entremos em contato?</h3>
        <p className="text-muted-foreground">
          Vamos respeitar suas preferências de comunicação e disponibilidade.
        </p>
      </div>

      {/* Preferred Contact Method */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-base font-medium">
          <MessageSquare className="w-4 h-4" />
          Método de contato preferido *
        </Label>
        <RadioGroup
          value={data.preferredContact}
          onValueChange={(value) => handleChange('preferredContact', value as ContactMethod)}
          className="grid md:grid-cols-2 gap-4"
        >
          {contactMethods.map((method) => (
            <div key={method.value} className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary/40 transition-colors">
              <RadioGroupItem value={method.value} id={method.value} />
              <div className="flex-1">
                <Label htmlFor={method.value} className="font-medium cursor-pointer">
                  {method.label}
                </Label>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Availability */}
      <div className="space-y-2">
        <Label htmlFor="availability" className="flex items-center gap-2 text-base font-medium">
          <Clock className="w-4 h-4" />
          Qual sua disponibilidade? *
        </Label>
        <Textarea
          id="availability"
          placeholder="Ex: Manhãs de segunda a sexta, após 18h, finais de semana, etc..."
          value={data.availability || ''}
          onChange={(e) => handleChange('availability', e.target.value)}
          className="min-h-[80px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          required
        />
        <p className="text-xs text-muted-foreground">
          Isso nos ajuda a agendar o melhor horário para conversar.
        </p>
      </div>

      {/* Urgency Level */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-base font-medium">
          <AlertCircle className="w-4 h-4" />
          Nível de urgência *
        </Label>
        <RadioGroup
          value={data.urgency}
          onValueChange={(value) => handleChange('urgency', value as UrgencyLevel)}
          className="grid md:grid-cols-2 gap-4"
        >
          {urgencyLevels.map((urgency) => (
            <div key={urgency.value} className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary/40 transition-colors">
              <RadioGroupItem value={urgency.value} id={urgency.value} />
              <div className="flex-1">
                <Label htmlFor={urgency.value} className={`font-medium cursor-pointer ${urgency.color}`}>
                  {urgency.label}
                </Label>
                <p className="text-sm text-muted-foreground">{urgency.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Marketing Consent */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-base font-medium">
          <Shield className="w-4 h-4" />
          Consentimento e Privacidade
        </Label>
        
        <div className="space-y-4 p-4 border border-border rounded-lg">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="marketingConsent"
              checked={data.marketingConsent || false}
              onCheckedChange={(checked) => handleChange('marketingConsent', checked as boolean)}
            />
            <div className="flex-1">
              <Label htmlFor="marketingConsent" className="cursor-pointer text-sm">
                Aceito receber comunicações sobre projetos, dicas técnicas e novidades por email.
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Você pode cancelar a qualquer momento. Não compartilhamos seus dados.
              </p>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground border-t border-border pt-3">
            <p className="mb-2">
              <strong>Política de Privacidade:</strong> Seus dados são utilizados apenas para:
            </p>
            <ul className="space-y-1 ml-4">
              <li>• Entrar em contato sobre seu projeto</li>
              <li>• Enviar a proposta comercial</li>
              <li>• Comunicações relacionadas ao projeto (se contratado)</li>
              <li>• Newsletter técnica (apenas se consentir acima)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Next Steps Info */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h4 className="font-medium text-primary mb-3">🚀 Próximos passos após o envio</h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">1</div>
            <span><strong>Confirmação imediata</strong> - Você receberá um email confirmando o recebimento</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">2</div>
            <span><strong>Análise (2-4h)</strong> - Vou analisar seus requisitos e preparar questões</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">3</div>
            <span><strong>Primeiro contato (24h)</strong> - Entro em contato para agendar uma conversa</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">4</div>
            <span><strong>Proposta (48-72h)</strong> - Envio proposta detalhada após nossa conversa</span>
          </div>
        </div>
      </div>
    </div>
  );
};