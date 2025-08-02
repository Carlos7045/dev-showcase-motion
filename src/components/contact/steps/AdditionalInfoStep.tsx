import React from 'react';
import { Globe, Palette, Info } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ContactFormData } from '@/types/contact';

interface AdditionalInfoStepProps {
  data: Partial<ContactFormData>;
  onChange: (data: Partial<ContactFormData>) => void;
}

export const AdditionalInfoStep: React.FC<AdditionalInfoStepProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof ContactFormData, value: any) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Info className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Informações adicionais</h3>
        <p className="text-muted-foreground">
          Estes detalhes nos ajudam a entender melhor seu contexto e necessidades.
        </p>
      </div>

      {/* Existing Website */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-base font-medium">
          <Globe className="w-4 h-4" />
          Você já tem um website?
        </Label>
        <RadioGroup
          value={data.hasExistingWebsite?.toString()}
          onValueChange={(value) => handleChange('hasExistingWebsite', value === 'true')}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="has-website-yes" />
            <Label htmlFor="has-website-yes" className="cursor-pointer">Sim</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="has-website-no" />
            <Label htmlFor="has-website-no" className="cursor-pointer">Não</Label>
          </div>
        </RadioGroup>

        {data.hasExistingWebsite && (
          <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
            <Label htmlFor="currentWebsite">URL do website atual</Label>
            <Input
              id="currentWebsite"
              type="url"
              placeholder="https://seusite.com.br"
              value={data.currentWebsite || ''}
              onChange={(e) => handleChange('currentWebsite', e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
            <p className="text-xs text-muted-foreground">
              Isso nos ajuda a entender o que você já tem e o que pode ser aproveitado.
            </p>
          </div>
        )}
      </div>

      {/* Design Preferences */}
      <div className="space-y-2">
        <Label htmlFor="designPreferences" className="flex items-center gap-2 text-base font-medium">
          <Palette className="w-4 h-4" />
          Preferências de design *
        </Label>
        <Textarea
          id="designPreferences"
          placeholder="Descreva o estilo visual que você imagina: cores, estilo (moderno, clássico, minimalista), sites de referência, etc..."
          value={data.designPreferences || ''}
          onChange={(e) => handleChange('designPreferences', e.target.value)}
          className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          required
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Mínimo 5 caracteres</span>
          <span>{(data.designPreferences || '').length} caracteres</span>
        </div>
        {data.designPreferences && data.designPreferences.length < 5 && (
          <p className="text-sm text-red-500">Descrição deve ter pelo menos 5 caracteres</p>
        )}
      </div>

      {/* Additional Information */}
      <div className="space-y-2">
        <Label htmlFor="additionalInfo" className="flex items-center gap-2 text-base font-medium">
          <Info className="w-4 h-4" />
          Informações adicionais
        </Label>
        <Textarea
          id="additionalInfo"
          placeholder="Qualquer outra informação que considere importante: concorrentes, inspirações, restrições técnicas, etc..."
          value={data.additionalInfo || ''}
          onChange={(e) => handleChange('additionalInfo', e.target.value)}
          className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
        <p className="text-xs text-muted-foreground">
          Opcional - Qualquer detalhe adicional que possa ser relevante para o projeto.
        </p>
      </div>

      {/* Design Inspiration Examples */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <h4 className="font-medium text-accent mb-3">💡 Exemplos de preferências de design</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <h5 className="font-medium text-foreground mb-2">Estilo Visual:</h5>
            <ul className="space-y-1">
              <li>• Moderno e minimalista</li>
              <li>• Clássico e elegante</li>
              <li>• Colorido e vibrante</li>
              <li>• Profissional e corporativo</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-foreground mb-2">Referências:</h5>
            <ul className="space-y-1">
              <li>• "Gosto do site da Apple"</li>
              <li>• "Algo como o Airbnb"</li>
              <li>• "Estilo do Stripe"</li>
              <li>• "Design do Notion"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};