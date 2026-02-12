import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { VisionSection } from "@/components/vision-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { VideoTestimonialsSection } from "@/components/video-testimonials-section"
import { ContactSection } from "@/components/contact-section"
// import { ChatWidget } from "@/components/chat-widget"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <VisionSection />
      <TestimonialsSection />
      <VideoTestimonialsSection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
      {/* <ChatWidget /> */}
    </main>
  )
}
