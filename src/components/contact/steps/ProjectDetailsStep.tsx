import React from 'react';
import { Briefcase, DollarSign, Calendar, FileText } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ContactFormData, ProjectType, BudgetRange, Timeline } from '@/types/contact';

interface ProjectDetailsStepProps {
  data: Partial<ContactFormData>;
  onChange: (data: Partial<ContactFormData>) => void;
}

export const ProjectDetailsStep: React.FC<ProjectDetailsStepProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof ContactFormData, value: any) => {
    onChange({ [field]: value });
  };

  const projectTypes = [
    { value: 'website' as ProjectType, label: 'Website Institucional', description: 'Site para apresentar sua empresa' },
    { value: 'webapp' as ProjectType, label: 'Aplicação Web', description: 'Sistema web interativo' },
    { value: 'ecommerce' as ProjectType, label: 'E-commerce', description: 'Loja virtual completa' },
    { value: 'automation' as ProjectType, label: 'Automação', description: 'Automatizar processos' },
    { value: 'integration' as ProjectType, label: 'Integração', description: 'Conectar sistemas existentes' },
    { value: 'consultation' as ProjectType, label: 'Consultoria', description: 'Orientação técnica' },
    { value: 'other' as ProjectType, label: 'Outro', description: 'Projeto personalizado' }
  ];

  const budgetRanges = [
    { value: 'under-5k' as BudgetRange, label: 'Até R$ 5.000', description: 'Projetos simples' },
    { value: '5k-15k' as BudgetRange, label: 'R$ 5.000 - R$ 15.000', description: 'Projetos médios' },
    { value: '15k-30k' as BudgetRange, label: 'R$ 15.000 - R$ 30.000', description: 'Projetos complexos' },
    { value: '30k-50k' as BudgetRange, label: 'R$ 30.000 - R$ 50.000', description: 'Projetos avançados' },
    { value: 'over-50k' as BudgetRange, label: 'Acima de R$ 50.000', description: 'Projetos enterprise' },
    { value: 'discuss' as BudgetRange, label: 'Prefiro discutir', description: 'Vamos conversar' }
  ];

  const timelines = [
    { value: 'asap' as Timeline, label: 'O mais rápido possível', description: 'Urgente' },
    { value: '1-month' as Timeline, label: '1 mês', description: 'Prazo apertado' },
    { value: '2-3-months' as Timeline, label: '2-3 meses', description: 'Prazo ideal' },
    { value: '3-6-months' as Timeline, label: '3-6 meses', description: 'Sem pressa' },
    { value: 'flexible' as Timeline, label: 'Flexível', description: 'Quando possível' },
    { value: 'discuss' as Timeline, label: 'Vamos discutir', description: 'A definir' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Conte-nos sobre seu projeto</h3>
        <p className="text-muted-foreground">
          Essas informações nos ajudam a preparar uma proposta mais precisa.
        </p>
      </div>

      {/* Tipo de Projeto */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-base font-medium">
          <Briefcase className="w-4 h-4" />
          Que tipo de projeto você tem em mente? *
        </Label>
        <RadioGroup
          value={data.projectType}
          onValueChange={(value) => handleChange('projectType', value as ProjectType)}
          className="grid md:grid-cols-2 gap-4"
        >
          {projectTypes.map((type) => (
            <div key={type.value} className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary/40 transition-colors">
              <RadioGroupItem value={type.value} id={type.value} />
              <div className="flex-1">
                <Label htmlFor={type.value} className="font-medium cursor-pointer">
                  {type.label}
                </Label>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Orçamento */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-base font-medium">
          <DollarSign className="w-4 h-4" />
          Qual seu orçamento aproximado? *
        </Label>
        <RadioGroup
          value={data.budget}
          onValueChange={(value) => handleChange('budget', value as BudgetRange)}
          className="grid md:grid-cols-2 gap-4"
        >
          {budgetRanges.map((budget) => (
            <div key={budget.value} className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary/40 transition-colors">
              <RadioGroupItem value={budget.value} id={budget.value} />
              <div className="flex-1">
                <Label htmlFor={budget.value} className="font-medium cursor-pointer">
                  {budget.label}
                </Label>
                <p className="text-sm text-muted-foreground">{budget.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-base font-medium">
          <Calendar className="w-4 h-4" />
          Qual o prazo desejado? *
        </Label>
        <RadioGroup
          value={data.timeline}
          onValueChange={(value) => handleChange('timeline', value as Timeline)}
          className="grid md:grid-cols-2 gap-4"
        >
          {timelines.map((timeline) => (
            <div key={timeline.value} className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary/40 transition-colors">
              <RadioGroupItem value={timeline.value} id={timeline.value} />
              <div className="flex-1">
                <Label htmlFor={timeline.value} className="font-medium cursor-pointer">
                  {timeline.label}
                </Label>
                <p className="text-sm text-muted-foreground">{timeline.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Descrição */}
      <div className="space-y-2">
        <Label htmlFor="description" className="flex items-center gap-2 text-base font-medium">
          <FileText className="w-4 h-4" />
          Descreva seu projeto *
        </Label>
        <Textarea
          id="description"
          placeholder="Conte-nos mais sobre seu projeto, objetivos, público-alvo e qualquer detalhe importante..."
          value={data.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          required
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Mínimo 10 caracteres</span>
          <span>{(data.description || '').length} caracteres</span>
        </div>
        {data.description && data.description.length < 10 && (
          <p className="text-sm text-red-500">Descrição deve ter pelo menos 10 caracteres</p>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <h4 className="font-medium text-accent mb-2">💡 Dica</h4>
        <p className="text-sm text-muted-foreground">
          Quanto mais detalhes você fornecer, melhor poderemos entender suas necessidades 
          e preparar uma proposta personalizada.
        </p>
      </div>
    </div>
  );
};