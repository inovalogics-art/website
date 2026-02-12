-- Inovalogics Database Schema

-- Admin Users Table (for pre-seeded admin access)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'code',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  features JSONB DEFAULT '[]',
  icon TEXT DEFAULT 'code',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio/Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  client_name TEXT,
  image_url TEXT,
  results JSONB DEFAULT '[]',
  tech_stack JSONB DEFAULT '[]',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_role TEXT,
  client_company TEXT,
  client_image TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  image_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quote Requests Table
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  budget TEXT,
  timeline TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'converted', 'closed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Consultation Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  timezone TEXT DEFAULT 'America/New_York',
  meeting_type TEXT DEFAULT 'video' CHECK (meeting_type IN ('video', 'phone', 'in_person')),
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  calendly_event_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'bot', 'admin')),
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Form Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Available Time Slots Table
CREATE TABLE IF NOT EXISTS available_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blocked Dates Table (for holidays, vacations, etc.)
CREATE TABLE IF NOT EXISTS blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE available_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

-- Public read policies for public content
CREATE POLICY "Public can view active categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active projects" ON projects FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active team members" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view active time slots" ON available_slots FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view blocked dates" ON blocked_dates FOR SELECT USING (true);

-- Public insert policies for submissions
CREATE POLICY "Public can submit quotes" ON quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit contact forms" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can send chat messages" ON chat_messages FOR INSERT WITH CHECK (true);

-- Admin policies (using service role for admin operations)
CREATE POLICY "Service role full access to admin_users" ON admin_users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to services" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to projects" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to testimonials" ON testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to team_members" ON team_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to quote_requests" ON quote_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to bookings" ON bookings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to chat_messages" ON chat_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to contact_submissions" ON contact_submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to available_slots" ON available_slots FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to blocked_dates" ON blocked_dates FOR ALL USING (true) WITH CHECK (true);

-- Insert default admin user (password: 1234 - hashed with bcrypt)
INSERT INTO admin_users (email, password_hash, name)
VALUES ('admin@admin.com', '$2a$10$rQEY6j9xgHLPLQlJPJJxSOqZNhQkMpYqT7vpVU.rP8FJyELUBkFi2', 'Admin User')
ON CONFLICT (email) DO NOTHING;

-- Insert default categories
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES
('Web Development', 'web-development', 'Custom web applications and websites built with modern technologies', 'globe', 1),
('Mobile Development', 'mobile-development', 'Native and cross-platform mobile applications for iOS and Android', 'smartphone', 2),
('UI/UX Design', 'ui-ux-design', 'User-centered design solutions that enhance user experience', 'palette', 3),
('Custom Software', 'custom-software', 'Tailored software solutions for your unique business needs', 'code', 4),
('Graphic Design', 'graphic-design', 'Visual design services including branding and marketing materials', 'image', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
('company', '{"name": "Inovalogics", "tagline": "Innovative Software Solutions", "email": "contact@inovalogics.com", "phone": "+1 (555) 123-4567", "address": "123 Tech Street, San Francisco, CA 94105"}'),
('hero', '{"title": "Transform Your Ideas Into Digital Reality", "subtitle": "We build innovative software solutions that drive business growth", "cta_primary": "Get a Free Quote", "cta_secondary": "Book a Consultation"}'),
('about', '{"title": "Why Choose Inovalogics?", "description": "We are a team of passionate developers and designers committed to delivering exceptional digital solutions.", "years_experience": 10, "projects_completed": 250, "clients_worldwide": 100, "team_members": 35}'),
('social', '{"linkedin": "https://linkedin.com/company/inovalogics", "twitter": "https://twitter.com/inovalogics", "facebook": "https://facebook.com/inovalogics", "instagram": "https://instagram.com/inovalogics", "github": "https://github.com/inovalogics"}'),
('calendly', '{"url": "", "enabled": false}'),
('booking_settings', '{"duration_minutes": 30, "buffer_minutes": 15, "advance_days": 30, "timezone": "America/New_York"}')
ON CONFLICT (key) DO NOTHING;

-- Insert default services
INSERT INTO services (category_id, title, description, features, icon, sort_order)
SELECT c.id, 'Full-Stack Web Development', 'End-to-end web application development using modern frameworks and technologies.',
'["React/Next.js Development", "Node.js Backend", "Database Design", "API Integration", "Cloud Deployment"]', 'globe', 1
FROM categories c WHERE c.slug = 'web-development';

INSERT INTO services (category_id, title, description, features, icon, sort_order)
SELECT c.id, 'E-commerce Solutions', 'Custom e-commerce platforms with secure payment processing and inventory management.',
'["Custom Shopping Cart", "Payment Gateway Integration", "Inventory Management", "Order Tracking", "Analytics Dashboard"]', 'shopping-cart', 2
FROM categories c WHERE c.slug = 'web-development';

INSERT INTO services (category_id, title, description, features, icon, sort_order)
SELECT c.id, 'iOS App Development', 'Native iOS applications built with Swift for optimal performance.',
'["Swift/SwiftUI", "App Store Optimization", "Push Notifications", "In-App Purchases", "Analytics Integration"]', 'smartphone', 1
FROM categories c WHERE c.slug = 'mobile-development';

INSERT INTO services (category_id, title, description, features, icon, sort_order)
SELECT c.id, 'Android App Development', 'Native Android applications using Kotlin and modern architecture.',
'["Kotlin Development", "Material Design", "Google Play Publishing", "Firebase Integration", "Performance Optimization"]', 'smartphone', 2
FROM categories c WHERE c.slug = 'mobile-development';

INSERT INTO services (category_id, title, description, features, icon, sort_order)
SELECT c.id, 'User Experience Design', 'Research-driven UX design that puts users first.',
'["User Research", "Wireframing", "Prototyping", "Usability Testing", "Information Architecture"]', 'users', 1
FROM categories c WHERE c.slug = 'ui-ux-design';

INSERT INTO services (category_id, title, description, features, icon, sort_order)
SELECT c.id, 'User Interface Design', 'Beautiful, intuitive interfaces that engage and delight users.',
'["Visual Design", "Design Systems", "Responsive Design", "Interaction Design", "Accessibility"]', 'layout', 2
FROM categories c WHERE c.slug = 'ui-ux-design';

INSERT INTO services (category_id, title, description, features, icon, sort_order)
SELECT c.id, 'Enterprise Software', 'Scalable enterprise solutions tailored to your business processes.',
'["Process Automation", "ERP Integration", "Custom Dashboards", "Role-Based Access", "Audit Logging"]', 'building', 1
FROM categories c WHERE c.slug = 'custom-software';

INSERT INTO services (category_id, title, description, features, icon, sort_order)
SELECT c.id, 'Brand Identity Design', 'Comprehensive branding that tells your story.',
'["Logo Design", "Brand Guidelines", "Color Palette", "Typography", "Brand Assets"]', 'image', 1
FROM categories c WHERE c.slug = 'graphic-design';

-- Insert default testimonials
INSERT INTO testimonials (client_name, client_role, client_company, content, rating, is_featured, sort_order) VALUES
('Sarah Johnson', 'CEO', 'TechStart Inc.', 'Inovalogics transformed our outdated system into a modern, efficient platform. Their team was professional, responsive, and delivered beyond our expectations.', 5, true, 1),
('Michael Chen', 'CTO', 'DataFlow Systems', 'Working with Inovalogics was a game-changer for our mobile app. They understood our vision and executed flawlessly. Highly recommended!', 5, true, 2),
('Emily Rodriguez', 'Product Manager', 'RetailPlus', 'The UI/UX redesign by Inovalogics increased our conversion rate by 40%. Their attention to detail and user-centric approach is outstanding.', 5, true, 3),
('David Kim', 'Founder', 'HealthTech Solutions', 'From concept to deployment, Inovalogics delivered a robust healthcare platform that our users love. Their expertise in compliance and security was invaluable.', 5, false, 4);

-- Insert default projects
INSERT INTO projects (category_id, title, description, client_name, results, tech_stack, is_featured, sort_order)
SELECT c.id, 'E-Commerce Platform Redesign', 'Complete redesign and development of a B2B e-commerce platform serving 10,000+ businesses.',
'RetailPlus', '["150% increase in sales", "40% faster load times", "99.9% uptime"]',
'["Next.js", "Node.js", "PostgreSQL", "AWS", "Stripe"]', true, 1
FROM categories c WHERE c.slug = 'web-development';

INSERT INTO projects (category_id, title, description, client_name, results, tech_stack, is_featured, sort_order)
SELECT c.id, 'Healthcare Mobile App', 'HIPAA-compliant mobile application for patient management and telemedicine.',
'HealthTech Solutions', '["50K+ downloads", "4.8 star rating", "30% reduction in no-shows"]',
'["React Native", "Node.js", "MongoDB", "WebRTC", "AWS"]', true, 2
FROM categories c WHERE c.slug = 'mobile-development';

INSERT INTO projects (category_id, title, description, client_name, results, tech_stack, is_featured, sort_order)
SELECT c.id, 'FinTech Dashboard Redesign', 'Complete UX overhaul of a financial analytics dashboard used by Fortune 500 companies.',
'DataFlow Systems', '["60% faster task completion", "95% user satisfaction", "40% reduction in support tickets"]',
'["Figma", "React", "D3.js", "Tailwind CSS"]', true, 3
FROM categories c WHERE c.slug = 'ui-ux-design';

INSERT INTO projects (category_id, title, description, client_name, results, tech_stack, is_featured, sort_order)
SELECT c.id, 'Enterprise Resource Planning System', 'Custom ERP solution integrating inventory, HR, and financial management.',
'TechStart Inc.', '["$2M annual savings", "80% process automation", "Real-time reporting"]',
'["Python", "Django", "PostgreSQL", "Redis", "Docker"]', true, 4
FROM categories c WHERE c.slug = 'custom-software';

-- Insert default available time slots (Monday to Friday, 9 AM to 5 PM)
INSERT INTO available_slots (day_of_week, start_time, end_time) VALUES
(1, '09:00', '17:00'),
(2, '09:00', '17:00'),
(3, '09:00', '17:00'),
(4, '09:00', '17:00'),
(5, '09:00', '17:00');
