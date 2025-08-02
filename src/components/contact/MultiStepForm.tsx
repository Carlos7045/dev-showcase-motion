import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ContactFormData, FormStep } from '@/types/contact';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { ProjectDetailsStep } from './steps/ProjectDetailsStep';
import { RequirementsStep } from './steps/RequirementsStep';
import { AdditionalInfoStep } from './steps/AdditionalInfoStep';
import { ContactPreferencesStep } from './steps/ContactPreferencesStep';
import { FormSummary } from './FormSummary';

interface MultiStepFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  className?: string;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({ onSubmit, className = '' }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    services: [],
    features: [],
    integrations: [],
    hasExistingWebsite: false,
    marketingConsent: false
  });

  const steps: FormStep[] = [
    {
      id: 1,
      title: 'Informações Básicas',
      description: 'Vamos começar com suas informações de contato',
      fields: ['name', 'email', 'phone', 'company'],
      isValid: (data) => !!(data.name && data.email && data.name.length > 2 && data.email.includes('@'))
    },
    {
      id: 2,
      title: 'Detalhes do Projeto',
      description: 'Conte-nos sobre seu projeto',
      fields: ['projectType', 'budget', 'timeline', 'description'],
      isValid: (data) => !!(data.projectType && data.budget && data.timeline && data.description && data.description.length > 10)
    },
    {
      id: 3,
      title: 'Requisitos',
      description: 'Quais serviços você precisa?',
      fields: ['services', 'features', 'integrations'],
      isValid: (data) => !!(data.services && data.services.length > 0)
    },
    {
      id: 4,
      title: 'Informações Adicionais',
      description: 'Detalhes que nos ajudam a entender melhor',
      fields: ['hasExistingWebsite', 'currentWebsite', 'designPreferences', 'additionalInfo'],
      isValid: (data) => !!(data.designPreferences && data.designPreferences.length > 5)
    },
    {
      id: 5,
      title: 'Preferências de Contato',
      description: 'Como prefere que entremos em contato?',
      fields: ['preferredContact', 'availability', 'urgency', 'marketingConsent'],
      isValid: (data) => !!(data.preferredContact && data.availability && data.urgency)
    }
  ];

  const updateFormData = (stepData: Partial<ContactFormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const getCurrentStepData = () => {
    return steps.find(step => step.id === currentStep);
  };

  const isCurrentStepValid = () => {
    const step = getCurrentStepData();
    return step ? step.isValid(formData) : false;
  };

  const nextStep = () => {
    if (currentStep < steps.length && isCurrentStepValid()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isCurrentStepValid()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData as ContactFormData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProgressPercentage = () => {
    return (currentStep / steps.length) * 100;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep data={formData} onChange={updateFormData} />;
      case 2:
        return <ProjectDetailsStep data={formData} onChange={updateFormData} />;
      case 3:
        return <RequirementsStep data={formData} onChange={updateFormData} />;
      case 4:
        return <AdditionalInfoStep data={formData} onChange={updateFormData} />;
      case 5:
        return <ContactPreferencesStep data={formData} onChange={updateFormData} />;
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <Card className={`max-w-2xl mx-auto ${className}`}>
        <CardContent className="pt-12 pb-12 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gradient mb-4">
            Formulário Enviado com Sucesso!
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Obrigado pelo seu interesse! Analisaremos suas informações e entraremos em contato 
            em até 24 horas para discutir seu projeto.
          </p>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <strong>Próximos passos:</strong>
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 max-w-sm mx-auto">
              <li>• Análise dos requisitos (2-4 horas)</li>
              <li>• Proposta inicial (24 horas)</li>
              <li>• Reunião de alinhamento</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentStepData = getCurrentStepData();

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gradient">
            {currentStepData?.title}
          </h2>
          <Badge variant="secondary">
            Etapa {currentStep} de {steps.length}
          </Badge>
        </div>
        
        <p className="text-muted-foreground mb-4">
          {currentStepData?.description}
        </p>
        
        <Progress value={getProgressPercentage()} className="h-2" />
        
        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-2 ${
                step.id < currentStep 
                  ? 'text-primary' 
                  : step.id === currentStep 
                    ? 'text-foreground' 
                    : 'text-muted-foreground'
              }`}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step.id < currentStep 
                  ? 'bg-primary text-primary-foreground' 
                  : step.id === currentStep 
                    ? 'bg-primary/20 text-primary border-2 border-primary' 
                    : 'bg-muted text-muted-foreground'
                }
              `}>
                {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span className="hidden sm:inline text-sm font-medium">
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <Card className="border-primary/20">
        <CardContent className="pt-8">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>

        <div className="flex items-center gap-4">
          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              disabled={!isCurrentStepValid()}
              className="flex items-center gap-2 btn-hero"
            >
              Próximo
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isCurrentStepValid() || isSubmitting}
              className="flex items-center gap-2 btn-hero"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar Formulário
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Form Summary Sidebar */}
      {currentStep > 1 && (
        <div className="mt-8">
          <FormSummary data={formData} currentStep={currentStep} />
        </div>
      )}
    </div>
  );
};