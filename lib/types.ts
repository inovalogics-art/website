export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  category_id: string | null;
  title: string;
  description: string | null;
  features: string[];
  icon: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Project {
  id: string;
  category_id: string | null;
  title: string;
  description: string | null;
  client_name: string | null;
  image_url: string | null;
  results: string[];
  tech_stack: string[];
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_role: string | null;
  client_company: string | null;
  client_image: string | null;
  content: string;
  rating: number;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface QuoteRequest {
  id: string;
  category_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  budget: string | null;
  timeline: string | null;
  message: string | null;
  status: "new" | "contacted" | "in_progress" | "converted" | "closed";
  notes: string | null;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Booking {
  id: string;
  category_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  scheduled_date: string;
  scheduled_time: string;
  timezone: string;
  meeting_type: "video" | "phone" | "in_person";
  message: string | null;
  status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
  calendly_event_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  sender: "user" | "bot" | "admin";
  message: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface AvailableSlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: string;
}

export interface BlockedDate {
  id: string;
  date: string;
  reason: string | null;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  updated_at: string;
}

// Settings types
export interface CompanySettings {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
}

export interface HeroSettings {
  title: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
}

export interface AboutSettings {
  title: string;
  description: string;
  years_experience: number;
  projects_completed: number;
  clients_worldwide: number;
  team_members: number;
}

export interface SocialSettings {
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
  github: string;
}

export interface CalendlySettings {
  url: string;
  enabled: boolean;
}

export interface BookingSettings {
  duration_minutes: number;
  buffer_minutes: number;
  advance_days: number;
  timezone: string;
}
