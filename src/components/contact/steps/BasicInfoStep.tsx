import React from 'react';
import { User, Mail, Phone, Building } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ContactFormData } from '@/types/contact';

interface BasicInfoStepProps {
  data: Partial<ContactFormData>;
  onChange: (data: Partial<ContactFormData>) => void;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof ContactFormData, value: string) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Vamos nos conhecer!</h3>
        <p className="text-muted-foreground">
          Suas informações de contato são seguras e nunca serão compartilhadas.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Nome */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Nome completo *
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Seu nome completo"
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            required
          />
          {data.name && data.name.length < 3 && (
            <p className="text-sm text-red-500">Nome deve ter pelo menos 3 caracteres</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            required
          />
          {data.email && !data.email.includes('@') && (
            <p className="text-sm text-red-500">Email deve ser válido</p>
          )}
        </div>

        {/* Telefone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Telefone
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(11) 99999-9999"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
          <p className="text-xs text-muted-foreground">
            Opcional - Para contato mais rápido via WhatsApp
          </p>
        </div>

        {/* Empresa */}
        <div className="space-y-2">
          <Label htmlFor="company" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Empresa
          </Label>
          <Input
            id="company"
            type="text"
            placeholder="Nome da sua empresa"
            value={data.company || ''}
            onChange={(e) => handleChange('company', e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
          <p className="text-xs text-muted-foreground">
            Opcional - Nos ajuda a entender melhor seu contexto
          </p>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-primary mb-2">Por que precisamos dessas informações?</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Para entrar em contato e agendar uma conversa</li>
          <li>• Para enviar a proposta personalizada</li>
          <li>• Para entender o contexto do seu negócio</li>
        </ul>
      </div>
    </div>
  );
};