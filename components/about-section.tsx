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
      <div className="relative w-full py-32 px-6 md:px-12 overflow-hidden bg-[#000000] selection:bg-primary/30">
  {/* High-Impact Mesh Gradient Background */}
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
    
    {/* Animated Liquid Waves at Bottom */}
    <div className="absolute bottom-0 left-0 w-full h-64 overflow-hidden">
      <div className="absolute bottom-[-50px] left-[-10%] w-[120%] h-48 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent blur-[60px] transform -rotate-2 animate-[wave_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-30px] left-[-10%] w-[120%] h-32 bg-gradient-to-t from-blue-500/20 via-blue-500/5 to-transparent blur-[40px] transform rotate-1 animate-[wave_7s_ease-in-out_infinite_reverse]" />
    </div>
  </div>

  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
    
    {/* Left Side: Cinematic Branding & Content */}
    <div className="lg:w-[45%] space-y-10 z-20">
      <div className="relative group">
        <div className="flex items-baseline gap-0">
          <span className="text-[160px] md:text-[220px] font-black text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary/80 to-blue-600 leading-[0.7] tracking-tighter drop-shadow-[0_0_30px_rgba(var(--primary),0.3)]">O</span>
          <div className="flex flex-col -ml-4 md:-ml-8">
            <span className="text-4xl md:text-6xl font-black text-primary leading-none mb-3">ur</span>
            <h3 className="text-6xl md:text-8xl font-black text-white leading-[0.8] tracking-tighter">
              Stories Of  
Success
            </h3>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <p className="text-xl md:text-2xl font-bold text-white/90 leading-tight">
          Trusted by Businesses Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Global Industries</span>
        </p>
        <p className="text-lg text-slate-400 max-w-lg leading-relaxed font-medium border-l-2 border-primary/30 pl-6">
          We engineer high-performance digital ecosystems for enterprises that demand precision, security, and scalable growth.
        </p>
      </div>

      {/* <button className="relative px-10 py-5 rounded-2xl bg-primary text-white font-bold overflow-hidden group transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_50px_rgba(var(--primary),0.4)]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <span className="relative z-10 flex items-center gap-3">
          Initialize Partnership
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </button> */}
    </div>

    {/* Right Side: The IT-Core & Industry Nebula */}
    <div className="lg:w-[55%] relative flex justify-center items-center py-24 lg:py-0">
      
      {/* Central Portrait Anchor with Glow */}
      <div className="relative w-80 h-80 md:w-[460px] md:h-[460px]">
        {/* Pulsing Core Glow */}
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-[100px] animate-pulse" />
        
        {/* Floating Structural Rings */}
        <div className="absolute inset-[-40px] rounded-full border border-white/5 scale-110 animate-[spin_50s_linear_infinite]" />
        <div className="absolute inset-[-80px] rounded-full border border-dashed border-primary/10 scale-125 animate-[spin_80s_linear_infinite_reverse]" />
        
        {/* High-End Professional Portrait */}
        <div className="relative w-full h-full rounded-full border-[1px] border-white/20 p-4 backdrop-blur-3xl z-10">
          <div className="w-full h-full rounded-full overflow-hidden border-[8px] border-[#020617] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000" 
              alt="IT Strategic Leader" 
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        {/* Industry Nodes (Orbiting Layout ) */}
        {industries.map((industry, idx) => {
          const Icon = industry.icon;
          const angle = (idx * 60 - 30) * (Math.PI / 180);
          const radius = 280;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div 
              key={industry.name}
              className="absolute z-20 group"
              style={{ 
                left: `calc(50% + ${x}px)`, 
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="relative p-5 rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 hover:border-primary/40 transition-all duration-500 hover:-translate-y-3 w-52 group-hover:bg-white/[0.07] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                {/* Node Accent */}
                <div 
                  className="absolute top-0 left-0 w-full h-1 rounded-t-2xl opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: industry.color }}
                />
                
                <div className="flex items-center gap-4 mb-3">
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:rotate-[360deg]"
                    style={{ background: `${industry.color}20`, border: `1px solid ${industry.color}40` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: industry.color }} />
                  </div>
                  <p className="text-[12px] font-black text-white leading-tight tracking-tight">{industry.name}</p>
                </div>
                
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed group-hover:text-slate-200 transition-colors">
                  {industry.desc}
                </p>

                {/* Connection Beam */}
                <div 
                  className="absolute -z-10 w-24 h-[1px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ 
                    background: `linear-gradient(to ${x > 0 ? 'left' : 'right'}, ${industry.color}, transparent)`,
                    left: x > 0 ? '-90px' : 'auto',
                    right: x < 0 ? '-90px' : 'auto',
                    top: '50%'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>

  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes wave {
      0%, 100% { transform: translateY(0) rotate(-2deg); }
      50% { transform: translateY(-20px) rotate(-1deg); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `}} />
</div>

      </div>
    </section>
  )
}