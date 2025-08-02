export interface ContactFormData {
  // Step 1: Basic Info
  name: string;
  email: string;
  phone?: string;
  company?: string;
  
  // Step 2: Project Details
  projectType: ProjectType;
  budget: BudgetRange;
  timeline: Timeline;
  description: string;
  
  // Step 3: Requirements
  services: Service[];
  features: string[];
  integrations: string[];
  
  // Step 4: Additional Info
  hasExistingWebsite: boolean;
  currentWebsite?: string;
  designPreferences: string;
  additionalInfo?: string;
  
  // Step 5: Contact Preferences
  preferredContact: ContactMethod;
  availability: string;
  urgency: UrgencyLevel;
  marketingConsent: boolean;
}

export type ProjectType = 
  | 'website'
  | 'webapp'
  | 'ecommerce'
  | 'automation'
  | 'integration'
  | 'consultation'
  | 'other';

export type BudgetRange = 
  | 'under-5k'
  | '5k-15k'
  | '15k-30k'
  | '30k-50k'
  | 'over-50k'
  | 'discuss';

export type Timeline = 
  | 'asap'
  | '1-month'
  | '2-3-months'
  | '3-6-months'
  | 'flexible'
  | 'discuss';

export type Service = 
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'design'
  | 'seo'
  | 'hosting'
  | 'maintenance'
  | 'consulting';

export type ContactMethod = 
  | 'email'
  | 'phone'
  | 'whatsapp'
  | 'video-call'
  | 'in-person';

export type UrgencyLevel = 
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

export interface FormStep {
  id: number;
  title: string;
  description: string;
  fields: string[];
  isValid: (data: Partial<ContactFormData>) => boolean;
}

export interface FormValidation {
  field: string;
  message: string;
  isValid: boolean;
}

export interface ContactSubmission {
  id: string;
  data: ContactFormData;
  submittedAt: Date;
  status: 'pending' | 'contacted' | 'quoted' | 'closed';
  source: string;
}