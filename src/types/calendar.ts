export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  attendees: Attendee[];
  meetingType: MeetingType;
  status: EventStatus;
  meetingLink?: string;
  location?: string;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attendee {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role: 'organizer' | 'attendee';
  status: AttendeeStatus;
}

export type MeetingType = 
  | 'consultation'
  | 'project-kickoff'
  | 'progress-review'
  | 'technical-discussion'
  | 'demo'
  | 'other';

export type EventStatus = 
  | 'scheduled'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'no-show';

export type AttendeeStatus = 
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'tentative';

export interface TimeSlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  available: boolean;
  timezone: string;
}

export interface CalendarAvailability {
  date: Date;
  slots: TimeSlot[];
  isAvailable: boolean;
}

export interface BookingRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  meetingType: MeetingType;
  preferredDate: Date;
  preferredTime: string;
  duration: number; // in minutes
  timezone: string;
  message?: string;
  projectDetails?: string;
}

export interface CalendarIntegration {
  provider: 'google' | 'outlook' | 'calendly' | 'custom';
  isConnected: boolean;
  accountEmail?: string;
  calendarId?: string;
  webhookUrl?: string;
}

export interface MeetingPreparation {
  eventId: string;
  agenda: string[];
  documents: Document[];
  preparationNotes?: string;
  questionnaire?: QuestionnaireItem[];
}

export interface Document {
  id: string;
  name: string;
  url: string;
  type: 'pdf' | 'doc' | 'link' | 'other';
  description?: string;
}

export interface QuestionnaireItem {
  id: string;
  question: string;
  type: 'text' | 'select' | 'multiselect' | 'boolean';
  options?: string[];
  required: boolean;
  answer?: string | string[] | boolean;
}