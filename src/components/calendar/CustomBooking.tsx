import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, Building, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { BookingRequest, MeetingType, TimeSlot, CalendarAvailability } from '@/types/calendar';

interface CustomBookingProps {
  onBookingSubmit: (booking: BookingRequest) => Promise<void>;
  className?: string;
}

export const CustomBooking: React.FC<CustomBookingProps> = ({ onBookingSubmit, className = '' }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availability, setAvailability] = useState<CalendarAvailability[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState<Partial<BookingRequest>>({
    duration: 30,
    timezone: 'America/Sao_Paulo',
    meetingType: 'consultation'
  });

  // Mock availability data
  useEffect(() => {
    const generateAvailability = () => {
      const availability: CalendarAvailability[] = [];
      const today = new Date();
      
      for (let i = 1; i <= 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue;
        
        const slots: TimeSlot[] = [];
        const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
        
        timeSlots.forEach((time, index) => {
          slots.push({
            id: `${date.toISOString().split('T')[0]}-${time}`,
            date,
            startTime: time,
            endTime: `${parseInt(time.split(':')[0]) + 1}:00`,
            available: Math.random() > 0.3, // 70% chance of being available
            timezone: 'America/Sao_Paulo'
          });
        });
        
        availability.push({
          date,
          slots,
          isAvailable: slots.some(slot => slot.available)
        });
      }
      
      setAvailability(availability);
    };

    generateAvailability();
  }, []);

  const meetingTypes = [
    { value: 'consultation' as MeetingType, label: 'Consulta Inicial (30 min)', description: 'Conversa gratuita sobre seu projeto' },
    { value: 'technical-discussion' as MeetingType, label: 'Discussão Técnica (45 min)', description: 'Análise detalhada de requisitos' },
    { value: 'demo' as MeetingType, label: 'Demo/Apresentação (30 min)', description: 'Demonstração de progresso' },
    { value: 'project-kickoff' as MeetingType, label: 'Kickoff de Projeto (60 min)', description: 'Início oficial do projeto' }
  ];

  const updateBookingData = (data: Partial<BookingRequest>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !bookingData.name || !bookingData.email) return;

    setIsSubmitting(true);
    try {
      const booking: BookingRequest = {
        ...bookingData,
        preferredDate: selectedDate,
        preferredTime: selectedTime,
        timezone: 'America/Sao_Paulo'
      } as BookingRequest;

      await onBookingSubmit(booking);
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1: return bookingData.meetingType;
      case 2: return selectedDate && selectedTime;
      case 3: return bookingData.name && bookingData.email;
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Que tipo de reunião você precisa?</h3>
              <p className="text-muted-foreground">Escolha o formato que melhor se adequa ao seu objetivo.</p>
            </div>

            <RadioGroup
              value={bookingData.meetingType}
              onValueChange={(value) => updateBookingData({ meetingType: value as MeetingType })}
              className="space-y-4"
            >
              {meetingTypes.map((type) => (
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
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Escolha data e horário</h3>
              <p className="text-muted-foreground">Selecione o melhor horário para nossa conversa.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Calendar */}
              <div>
                <h4 className="font-medium mb-4">Datas disponíveis</h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {availability.filter(day => day.isAvailable).map((day) => (
                    <button
                      key={day.date.toISOString()}
                      onClick={() => setSelectedDate(day.date)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedDate?.toDateString() === day.date.toDateString()
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <div className="font-medium">{formatDate(day.date)}</div>
                      <div className="text-sm text-muted-foreground">
                        {day.slots.filter(slot => slot.available).length} horários disponíveis
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h4 className="font-medium mb-4">
                  Horários {selectedDate ? `para ${formatDate(selectedDate)}` : 'disponíveis'}
                </h4>
                {selectedDate ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availability
                      .find(day => day.date.toDateString() === selectedDate.toDateString())
                      ?.slots.filter(slot => slot.available)
                      .map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedTime(slot.startTime)}
                          className={`p-3 rounded-lg border text-center transition-colors ${
                            selectedTime === slot.startTime
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/40'
                          }`}
                        >
                          {slot.startTime}
                        </button>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Selecione uma data para ver os horários disponíveis
                  </div>
                )}
              </div>
            </div>

            {selectedDate && selectedTime && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-medium text-primary mb-2">Reunião agendada para:</h4>
                <p className="text-sm">
                  <strong>{formatDate(selectedDate)}</strong> às <strong>{selectedTime}</strong>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Fuso horário: Brasília (GMT-3)
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Suas informações</h3>
              <p className="text-muted-foreground">Para confirmarmos o agendamento e enviarmos o link da reunião.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nome completo *
                </Label>
                <Input
                  id="name"
                  value={bookingData.name || ''}
                  onChange={(e) => updateBookingData({ name: e.target.value })}
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email || ''}
                  onChange={(e) => updateBookingData({ email: e.target.value })}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefone
                </Label>
                <Input
                  id="phone"
                  value={bookingData.phone || ''}
                  onChange={(e) => updateBookingData({ phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Empresa
                </Label>
                <Input
                  id="company"
                  value={bookingData.company || ''}
                  onChange={(e) => updateBookingData({ company: e.target.value })}
                  placeholder="Nome da empresa"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Mensagem adicional
              </Label>
              <Textarea
                id="message"
                value={bookingData.message || ''}
                onChange={(e) => updateBookingData({ message: e.target.value })}
                placeholder="Conte-nos brevemente sobre o que gostaria de discutir..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDetails">Detalhes do projeto (opcional)</Label>
              <Textarea
                id="projectDetails"
                value={bookingData.projectDetails || ''}
                onChange={(e) => updateBookingData({ projectDetails: e.target.value })}
                placeholder="Descreva brevemente seu projeto para que possamos nos preparar melhor..."
                className="min-h-[80px]"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={className}>
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Agendar Reunião
            </CardTitle>
            <Badge variant="secondary">
              Etapa {currentStep} de 3
            </Badge>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center gap-2 ${
                  step < currentStep 
                    ? 'text-primary' 
                    : step === currentStep 
                      ? 'text-foreground' 
                      : 'text-muted-foreground'
                }`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${step < currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : step === currentStep 
                      ? 'bg-primary/20 text-primary border-2 border-primary' 
                      : 'bg-muted text-muted-foreground'
                  }
                `}>
                  {step}
                </div>
                <span className="hidden sm:inline text-sm font-medium">
                  {step === 1 ? 'Tipo' : step === 2 ? 'Data/Hora' : 'Informações'}
                </span>
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          {renderStepContent()}
        </CardContent>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>

          <div className="flex items-center gap-4">
            {currentStep < 3 ? (
              <Button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!isStepValid(currentStep)}
                className="flex items-center gap-2 btn-hero"
              >
                Próximo
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid(currentStep) || isSubmitting}
                className="flex items-center gap-2 btn-hero"
              >
                {isSubmitting ? 'Agendando...' : 'Confirmar Agendamento'}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};