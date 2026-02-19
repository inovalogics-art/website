"use client"


import React, { useEffect, useState } from "react"
import {
  CheckCircle,
  Shield,
  Clock,
  Users,
  TrendingUp,
  Zap,
  Award,
  Target,
  Lightbulb,
  Code,
  ArrowRight,
  Play
} from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  "Global delivery experience across US, Europe & Middle East",
  "Agile & Scrum-based development approach",
  "Dedicated project and engineering teams",
  "Clear and transparent communication",
  "Flexible and scalable engagement models",
  "Ongoing support and maintenance services",
]

const awards = [
  { name: "Top Software Developers 2026", image: "/awards/software_developers.svg" },
  { name: "2025 Winner Custom Software", image: "/awards/banner_winner_2025_csd_black_bc72e6dd38.webp" },
  { name: "GoodFirms Research Partner", image: "/awards/goodfirms_research_partner_97cb9601dc.svg" },
  { name: "Databricks Consulting Partner", image: "/awards/consulting_partner_badge_registered_2x_8370a886e6.webp" },
  { name: "Best of Clutch Websites 2025", image: "/awards/zb_C97zhw_83a8175232.webp" },
  { name: "Top Software Developers 2025", image: "/awards/software_developers_ea365cd51d.svg" },
  { name: "Clutch Global Fall 2024", image: "/awards/clutch_global_61fb4abaaf.webp" },
  { name: "Clutch Champion Fall 2024", image: "/awards/clutch_champion_53b2d4bddc.webp" },
  { name: "Top Android App Developers 2024", image: "/awards/Android_f1c59441c4.svg" },
  { name: "Clutch Asia 2020", image: "/awards/clutch_b2b_883a442d63.webp" },
  { name: "ISO 27001 Certified", image: "/awards/iso_e06258b80b.webp" },
  { name: "Zyte Partner", image: "/awards/zyte_ca784a25e4.webp" },
  { name: "Open edX Partner", image: "/awards/open_edx_ed4352097f.webp" },
  { name: "AWS Partner", image: "/awards/aws-award.webp" },
]

const industries = [
  { name: "Enterprise Solutions", desc: "Large-scale systems & platforms", icon: Code, color: "#3B82F6" },
  { name: "Technology Companies", desc: "Product & platform development", icon: Lightbulb, color: "#8B5CF6" },
  { name: "Healthcare & Life Sciences", desc: "Secure and compliant systems", icon: Shield, color: "#EC4899" },
  { name: "Financial Services", desc: "Scalable & secure applications", icon: TrendingUp, color: "#F59E0B" },
  { name: "Retail & E-Commerce", desc: "Digital commerce solutions", icon: Target, color: "#10B981" },
  { name: "SaaS & Cloud Products", desc: "Subscription-based platforms", icon: Zap, color: "#06B6D4" },
]



export function AboutSection() {
  useEffect(() => {
    // Load CSS
    const link = document.createElement("link")
    link.href = "https://assets.calendly.com/assets/external/widget.css"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    // Load JS
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link)
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
      if (existingScript && document.body.contains(existingScript)) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  const handleBookCall = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/inovalogics/30min'
      });
    } else {
      alert("Calendly is still loading. Please try again in a moment.")
    }
  }
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null)

  return (
    <section id="about">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute -top-[15%] -right-[15%] w-[50%] h-[50%] bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute -bottom-[15%] -left-[15%] w-[50%] h-[50%] bg-gradient-to-tr from-primary/10 to-primary/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,hsl(var(--background))_100%)] opacity-40" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Hero Section with Image */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Left Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs font-bold tracking-widest uppercase text-primary client-badge-boarderless">About Us</span>
              </div>

              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-8 leading-[1.1]">
                Your Long-Term Technology  <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Growth Partner</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/10 -rotate-1 -z-0"></span>
                </span>
              </h2>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Technology should accelerate growth — not slow it down.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              At Inova Logics, we design digital ecosystems that evolve with your business. Whether you're scaling revenue, launching a new product, or automating operations — we build systems that support your next stage of growth.
            </p>
            {/* Benefits Grid with Enhanced Styling */}
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 p-3 rounded-xl bg-card/30 border border-primary/10 hover:border-primary/30 backdrop-blur-sm transition-all group"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" onClick={handleBookCall} className="rounded-full px-8 py-7 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                Get In Touch
              </Button>
              {/* <Button variant="outline" size="lg" className="rounded-full px-8 py-7 text-base font-bold border-primary/30 hover:bg-primary/5">
                <Play className="w-4 h-4 mr-2" />
                Learn More
              </Button> */}
            </div>
          </div>

          {/* Right Image Section with Premium Styling */}
          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-all duration-500">
                <img
                  src="/projects/growth-partner.webp"
                  alt="Team collaboration"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-card to-card/80 border border-primary/20 rounded-2xl p-8 shadow-2xl backdrop-blur-xl max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 group-hover:shadow-primary/20 transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Achievement</p>
                    <p className="text-3xl font-bold text-foreground">50+</p>
                    <p className="text-xs text-muted-foreground">Solutions Delivered</p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>

        {/* Awards Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Your Vision, <span className="text-primary">Our Expertise</span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              If You Can Imagine It, We Can Build It. Recognized for excellence across global platforms.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {awards.map((award, idx) => (
              <div
                key={idx}
                className="group relative w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-2xl bg-card/30 border border-primary/10 hover:border-primary/30 backdrop-blur-sm transition-all duration-500 flex items-center justify-center p-4 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <img
                    src={award.image}
                    alt={award.name}
                    className="max-w-full max-h-full object-contain filter group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Tooltip on hover */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                  <div className="bg-popover text-popover-foreground text-[10px] font-bold py-1 px-2 rounded border border-primary/20 whitespace-nowrap shadow-lg">
                    {award.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise Trust Section */}
        <div className="relative rounded-3xl p-12 md:p-20 overflow-hidden border border-primary/10 bg-card/30 backdrop-blur-xl mb-32">
          {/* Decorative background */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,hsl(var(--primary)/0.05)_0%,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,hsl(var(--primary)/0.05)_0%,transparent_50%)]" />

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <p className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 eye-catching-heading client-badge">Trusted by Leaders</p>
              <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Trusted by Businesses Across <span className="text-primary">Industries</span>
              </h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From established enterprises to fast-growing SMEs, organizations across multiple industries rely on us to deliver secure, scalable, and high-quality digital solutions.
              </p>
            </div>



            {/* Industries Grid - Enhanced with Glassmorphism */}
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
              {industries.map((category, idx) => {
                const IconComponent = category.icon
                const isHovered = hoveredIndustry === category.name

                return (
                  <div
                    key={category.name}
                    onMouseEnter={() => setHoveredIndustry(category.name)}
                    onMouseLeave={() => setHoveredIndustry(null)}
                    className="group relative h-full"
                  >
                    {/* Glow effect on hover */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10`}
                      style={{
                        background: `linear-gradient(135deg, ${category.color}40, ${category.color}20)`,
                      }}
                    />

                    {/* Main Card */}
                    <div className="relative p-6 h-full rounded-2xl bg-gradient-to-br from-card/80 to-card/40 border border-primary/20 hover:border-primary/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl cursor-pointer group overflow-hidden">
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                        background: `radial-gradient(circle at top right, ${category.color}15, transparent 70%)`
                      }} />

                      {/* Content */}
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Icon Container with Glow */}
                        <div className="relative mb-4">
                          <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                            style={{
                              background: `linear-gradient(135deg, ${category.color}25, ${category.color}10)`,
                            }}
                          >
                            <IconComponent
                              className="w-7 h-7 transition-all duration-500 group-hover:animate-pulse"
                              style={{ color: category.color }}
                            />
                          </div>
                        </div>

                        {/* Text Content */}
                        <p className="font-bold text-foreground mb-2 text-sm leading-tight group-hover:text-primary transition-colors duration-300">
                          {category.name}
                        </p>
                        <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors flex-grow">
                          {category.desc}
                        </p>

                        {/* Animated Divider */}
                        <div className="mt-4 pt-4 border-t border-primary/20 group-hover:border-primary/50 transition-colors">
                          <div className="flex justify-center gap-1">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-150 group-hover:animate-pulse transition-all" />
                            <div className="w-1.5 h-1.5 bg-primary/50 rounded-full group-hover:scale-125 transition-all" style={{ animationDelay: '0.1s' }} />
                            <div className="w-1.5 h-1.5 bg-primary/30 rounded-full group-hover:scale-100 transition-all" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}