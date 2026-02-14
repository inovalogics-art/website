"use client"

import React, { useState } from "react"
import { Star, Quote, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Valid star ratings: 3.5, 4.0, 4.5, 5.0
const VALID_RATINGS = [3.5, 4.0, 4.5, 5.0]

const testimonials = [
  {
    name: "Michael Chen",
    role: "Founder & CTO",
    company: "Healthcare Innovation Startup",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663137821364/MCrNCCudMIwONjko.jpg",
    content:
      "From concept to production-ready mobile application, they delivered exceptional results. The development team demonstrated deep technical knowledge, maintained transparent communication throughout, and collaborated seamlessly with our internal stakeholders. The final product exceeded our expectations.",
    result: "Successful Product Launch in 6 Months",
    rating: 5.0,
  },
  {
    name: "Emily Rodriguez",
    role: "VP of Product",
    company: "Retail & E-Commerce Leader",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663137821364/WFXBILXNaBrbKoJN.webp",
    content:
      "The UI/UX redesign significantly enhanced user engagement and conversion rates. Their designers conducted thorough user research, created intuitive interfaces, and delivered a cohesive design system. Customer satisfaction scores improved by 35% post-launch.",
    result: "35% Increase in User Engagement",
    rating: 4.5,
  },
  {
    name: "David Park",
    role: "VP Engineering",
    company: "Cloud Infrastructure Provider",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663137821364/lncxgaghvZwPJmgr.jpg",
    content:
      "Their infrastructure modernization initiative was transformative. The team architected scalable, cloud-native solutions with strong technical ownership and best-practice implementations. System uptime improved to 99.99%, and we achieved 50% cost optimization.",
    result: "99.99% Uptime & 50% Cost Reduction",
    rating: 5.0,
  },
  {
    name: "Jessica Williams",
    role: "CEO & Founder",
    company: "Data Analytics & Intelligence",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663137821364/saQxiYazzyTdpKNI.jpg",
    content:
      "They invested time to deeply understand our business requirements and technical constraints. The resulting analytics platform met both our technical specifications and business objectives, enabling data-driven decision-making across the organization. Implementation was on-time and within budget.",
    result: "Enterprise Analytics Platform Delivered",
    rating: 4.5,
  },
  {
    name: "James Thompson",
    role: "Product Lead",
    company: "Financial Services Enterprise",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663137821364/wRaQhytSofSrLNDP.jpg",
    content:
      "Security and regulatory compliance were paramount to our project. Their team demonstrated exceptional expertise in implementing enterprise-grade security protocols, conducting thorough compliance audits, and following industry best practices. The solution passed all regulatory requirements without issues.",
    result: "Full Regulatory Compliance Achieved",
    rating: 4.0,
  },
  {
    name: "Alexandra Carter",
    role: "Lead Developer & Tech Lead",
    company: "E-Commerce Innovation Startup",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663137821364/psEBkceSSeWsRGxc.jpg",
    content:
      "The development team delivered outstanding work with exceptional creativity, precision, and velocity. Their technical expertise, collaborative approach, and commitment to code quality made the entire project seamless. The platform launched successfully and has scaled to handle 10x traffic growth.",
    result: "Successful Launch & 10x Scalability",
    rating: 5.0,
  },
]

// Helper function to render stars based on rating
function StarRating({ rating }: { rating: number }) {
  if (!VALID_RATINGS.includes(rating)) {
    console.warn(`Invalid rating: ${rating}. Using 4.0 as default.`)
    return null
  }

  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
      ))}

      {hasHalfStar && (
        <div key="half" className="relative w-4 h-4">
          <Star className="w-4 h-4 text-[#FFC107]" />
          <div className="absolute inset-0 w-2 overflow-hidden">
            <Star className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
          </div>
        </div>
      )}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground" />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="testimonials" className="py-32">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Radial gradient vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,hsl(var(--background))_100%)] opacity-40" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md mb-8">
            <Sparkles className="w-4 h-4 text-primary animate-spin" />
            <span className="text-xs font-bold tracking-widest uppercase text-primary client-badge-boarderless">Client Success Stories</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-[1.1]">
            Proven Results from <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Industry Leaders</span>
              <span className="absolute bottom-3 left-0 w-full h-4 bg-primary/10 -rotate-1 -z-0"></span>
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Hear directly from our clients about their transformative experiences working with our team and the measurable impact we've delivered to their organizations.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card
              key={testimonial.name}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden bg-card/50 border-primary/10 hover:border-primary/40 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary/10 backdrop-blur-md h-full flex flex-col stagger-item"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              {/* Decorative Background Gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardContent className="p-8 h-full flex flex-col relative z-10">
                {/* Header with Quote Icon and Rating */}
                <div className="flex items-center justify-between mb-6">
                  <Quote className="w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors" />
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Testimonial Content */}
                <p className="text-foreground mb-8 leading-relaxed text-base flex-grow group-hover:text-foreground/90 transition-colors">
                  "{testimonial.content}"
                </p>

                {/* Result Box */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-4 mb-8 group-hover:border-primary/40 transition-colors">
                  <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2">Key Result</p>
                  <p className="text-primary font-bold text-sm group-hover:text-primary/90 transition-colors">{testimonial.result}</p>
                </div>

                {/* Client Info with Professional Headshot */}
                <div className="flex items-center gap-4 pt-6 border-t border-primary/10 group-hover:border-primary/30 transition-colors">
                  {/* Professional Headshot */}
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary/20 group-hover:border-primary/40 transition-all group-hover:scale-110">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                  </div>

                  {/* Client Details */}
                  <div className="min-w-0 flex-grow">
                    <div className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-primary/60 group-hover:text-primary transition-colors font-medium mt-1">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}