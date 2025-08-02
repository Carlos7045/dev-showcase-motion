import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, Video, MapPin, Edit, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarEvent, EventStatus, MeetingPreparation } from '@/types/calendar';

interface MeetingManagerProps {
  events: CalendarEvent[];
  onEventUpdate: (eventId: string, updates: Partial<CalendarEvent>) => Promise<void>;
  onEventCancel: (eventId: string) => Promise<void>;
  onPreparationUpdate: (eventId: string, preparation: MeetingPreparation) => Promise<void>;
  className?: string;
}

export const MeetingManager: React.FC<MeetingManagerProps> = ({
  events,
  onEventUpdate,
  onEventCancel,
  onPreparationUpdate,
  className = ''
}) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEditingPreparation, setIsEditingPreparation] = useState(false);
  const [preparation, setPreparation] = useState<Partial<MeetingPreparation>>({});

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'confirmed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      case 'completed': return 'bg-gray-500';
      case 'no-show': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: EventStatus) => {
    switch (status) {
      case 'scheduled': return 'Agendado';
      case 'confirmed': return 'Confirmado';
      case 'cancelled': return 'Cancelado';
      case 'completed': return 'Concluído';
      case 'no-show': return 'Não compareceu';
      default: return status;
    }
  };

  const getMeetingTypeLabel = (type: string) => {
    const types = {
      'consultation': 'Consulta',
      'project-kickoff': 'Kickoff',
      'progress-review': 'Revisão',
      'technical-discussion': 'Discussão Técnica',
      'demo': 'Demo',
      'other': 'Outro'
    };
    return types[type as keyof typeof types] || type;
  };

  const upcomingEvents = events
    .filter(event => event.startTime > new Date() && event.status !== 'cancelled')
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  const pastEvents = events
    .filter(event => event.startTime <= new Date() || event.status === 'completed')
    .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());

  const handleStatusUpdate = async (eventId: string, status: EventStatus) => {
    await onEventUpdate(eventId, { status });
  };

  const handlePreparationSave = async () => {
    if (!selectedEvent) return;

    const meetingPreparation: MeetingPreparation = {
      eventId: selectedEvent.id,
      agenda: preparation.agenda || [],
      documents: preparation.documents || [],
      preparationNotes: preparation.preparationNotes || '',
      questionnaire: preparation.questionnaire || []
    };

    await onPreparationUpdate(selectedEvent.id, meetingPreparation);
    setIsEditingPreparation(false);
  };

  const EventCard: React.FC<{ event: CalendarEvent; isPast?: boolean }> = ({ event, isPast = false }) => (
    <Card className="border-primary/20 hover:border-primary/40 transition-colors duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)}`} />
            <div>
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <CardDescription>{getMeetingTypeLabel(event.meetingType)}</CardDescription>
            </div>
          </div>
          <Badge variant="secondary">{getStatusLabel(event.status)}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date and Time */}
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{formatDateTime(event.startTime)}</span>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-primary" />
          <span>
            {Math.round((event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60))} minutos
          </span>
        </div>

        {/* Attendees */}
        <div className="space-y-2">
          {event.attendees.filter(a => a.role === 'attendee').map((attendee, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-primary" />
              <span>{attendee.name}</span>
              {attendee.email && (
                <a href={`mailto:${attendee.email}`} className="text-primary hover:underline">
                  <Mail className="w-3 h-3" />
                </a>
              )}
              {attendee.phone && (
                <a href={`tel:${attendee.phone}`} className="text-primary hover:underline">
                  <Phone className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Meeting Link */}
        {event.meetingLink && (
          <div className="flex items-center gap-2 text-sm">
            <Video className="w-4 h-4 text-primary" />
            <a 
              href={event.meetingLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Link da reunião
            </a>
          </div>
        )}

        {/* Location */}
        {event.location && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{event.location}</span>
          </div>
        )}

        {/* Description */}
        {event.description && (
          <div className="text-sm text-muted-foreground">
            <p>{event.description}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-border">
          {!isPast && event.status === 'scheduled' && (
            <>
              <Button
                size="sm"
                onClick={() => handleStatusUpdate(event.id, 'confirmed')}
                className="flex items-center gap-1"
              >
                <Check className="w-3 h-3" />
                Confirmar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusUpdate(event.id, 'cancelled')}
                className="flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Cancelar
              </Button>
            </>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedEvent(event)}
                className="flex items-center gap-1"
              >
                <Edit className="w-3 h-3" />
                Detalhes
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{event.title}</DialogTitle>
                <DialogDescription>
                  {formatDateTime(event.startTime)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Event Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Participantes</Label>
                    <div className="space-y-2 mt-2">
                      {event.attendees.map((attendee, index) => (
                        <div key={index} className="text-sm">
                          <div className="font-medium">{attendee.name}</div>
                          <div className="text-muted-foreground">{attendee.email}</div>
                          {attendee.company && (
                            <div className="text-muted-foreground">{attendee.company}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Informações da Reunião</Label>
                    <div className="space-y-2 mt-2 text-sm">
                      <div>Tipo: {getMeetingTypeLabel(event.meetingType)}</div>
                      <div>Status: {getStatusLabel(event.status)}</div>
                      <div>Duração: {Math.round((event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60))} min</div>
                      {event.meetingLink && (
                        <div>
                          <a href={event.meetingLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Link da reunião
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Meeting Preparation */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-sm font-medium">Preparação da Reunião</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingPreparation(!isEditingPreparation)}
                    >
                      {isEditingPreparation ? 'Cancelar' : 'Editar'}
                    </Button>
                  </div>

                  {isEditingPreparation ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="agenda">Agenda</Label>
                        <Textarea
                          id="agenda"
                          placeholder="Tópicos a serem discutidos..."
                          value={preparation.preparationNotes || ''}
                          onChange={(e) => setPreparation(prev => ({ ...prev, preparationNotes: e.target.value }))}
                        />
                      </div>
                      <Button onClick={handlePreparationSave}>
                        Salvar Preparação
                      </Button>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      {preparation.preparationNotes || 'Nenhuma preparação adicionada ainda.'}
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Upcoming Meetings */}
      <div>
        <h2 className="text-2xl font-bold text-gradient mb-6">Próximas Reuniões</h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <Card className="border-primary/20">
            <CardContent className="text-center py-12">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma reunião agendada</h3>
              <p className="text-muted-foreground">
                Suas próximas reuniões aparecerão aqui.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Past Meetings */}
      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gradient mb-6">Reuniões Anteriores</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {pastEvents.slice(0, 4).map((event) => (
              <EventCard key={event.id} event={event} isPast />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};