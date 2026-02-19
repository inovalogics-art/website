/**
 * Production-Ready Multi-Layout Services Section Component
 * 
 * LAYOUT CONFIGURATION - Change this to switch layouts instantly:
 * - 'staggered': Asymmetric staggered layout with overlapping cards
 * - 'carousel': Horizontal scrolling carousel with large images
 * - 'alternating': Left-right alternating layout with full-width sections
 * - 'featured': Large hero card + grid layout
 * - 'geometric': Hexagonal/geometric grid pattern
 * - 'fullwidth': Full-width horizontal sections with bold typography
 */

"use client"
import React, { useEffect, useState } from "react"
import {
  Code2,
  Smartphone,
  Palette,
  Zap,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Globe,
  Layers,
  ShieldCheck,
  BarChart3,
  Rocket,
  TrendingUp,
  ChevronRight,
  ChevronLeft
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { text } from "stream/consumers"

// ============================================
// LAYOUT CONFIGURATION - CHANGE THIS VALUE
// ============================================
const LAYOUT_MODE: 'staggered' | 'carousel' | 'alternating' | 'featured' | 'geometric' | 'fullwidth' = 'staggered'
// ============================================

const services = [
  {
    icon: Code2,
    title: "AI-Powered Web Development",
    description: "Custom websites and web apps engineered for performance, security, and revenue growth. Enterprise-grade solutions that scale with your business.",
    longDescription: "We build stunning, high-performance web applications using cutting-edge technologies. From responsive design to complex integrations, we deliver solutions that drive measurable results.",
    features: [
      "Enterprise Applications",
      "API & System Integration",
      "Performance Optimization",
      "Security Hardening"
    ],
    color: "from-blue-600 to-blue-400",
    iconBg: "bg-blue-500/20",
    image: "/projects/ai-web.png",
    bgPosition: "object-cover",
    stats: "100+ Projects"
  },
  {
    icon: Smartphone,
    title: "Custom SaaS Development",
    description: "Launch scalable SaaS products with secure architecture, intuitive interfaces, and future-proof technology stacks.",
    longDescription: "Transform your business idea into a market-ready SaaS platform. We handle everything from architecture design to deployment, ensuring your product is scalable, secure, and user-friendly.",
    features: [
      "Responsive Web Applications",
      "Cross-Platform Solutions",
      "Cloud Infrastructure",
      "User Analytics"
    ],
    color: "from-purple-600 to-purple-400",
    iconBg: "bg-purple-500/20",
    image: "/projects/saas.png",
    bgPosition: "object-cover",
    stats: "20+ SaaS Platforms"
  },
  {
    icon: Palette,
    title: "AI Business Automation",
    description: "Eliminate manual processes with intelligent AI workflows. Reduce costs, improve efficiency, and scale operations seamlessly.",
    longDescription: "Automate your business processes with AI-powered workflows. Save time, reduce errors, and focus on strategic growth while our systems handle repetitive tasks.",
    features: [
      "Workflow Optimization",
      "Process Automation",
      "AI Integration",
      "Cost Reduction"
    ],
    color: "from-amber-600 to-amber-400",
    iconBg: "bg-amber-500/20",
    image: "/projects/ai-automation.png",
    bgPosition: "object-cover",
    stats: "250+ Workflows"
  },
  {
    icon: Zap,
    title: "CRM & GHL Automation",
    description: "Intelligent CRM systems and GoHighLevel automation that streamline sales, nurture leads, and increase closing rates.",
    longDescription: "Supercharge your sales pipeline with intelligent CRM automation. Nurture leads automatically, track interactions, and close deals faster with GoHighLevel integration.",
    features: [
      "Sales Pipeline Management",
      "Lead Nurturing Automation",
      "Email Sequences",
      "Performance Analytics"
    ],
    color: "from-emerald-600 to-emerald-400",
    iconBg: "bg-emerald-500/20",
    image: "/projects/crm-expert.png",
    bgPosition: "object-cover",
    stats: "50+ Agencies"
  },
]

const valueProps = [
  { icon: TrendingUp, title: "Results-Driven", desc: "Every feature serves a measurable business purpose with clear ROI." },
  { icon: BarChart3, title: "Automation First", desc: "We eliminate inefficiencies and scale your business through smart systems." },
  { icon: ShieldCheck, title: "Enterprise Security", desc: "Your data, systems, and infrastructure protected at every level." },
  { icon: Rocket, title: "Long-Term Partnership", desc: "We build ongoing growth partnerships, not just deliver projects." },
]

// Layout Components
const StaggeredLayout = ({ services, handleBookCall }: any) => (
  <div className="space-y-12">
    {services.map((service: any, index: number) => (
      <div
        key={service.title}
        className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
      >
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4">
            <service.icon className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold text-blue-400 client-badge-boarderless">{service.stats}</span>
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-4">{service.title}</h3>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{service.longDescription}</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {service.features.map((feature: string) => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
          <Button onClick={handleBookCall} className="bg-primary hover:bg-blue-700 text-white">
            Learn More <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="group flex-1 rounded-2xl overflow-hidden shadow-2xl">
          <img src={service.image} alt={service.title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" onClick={handleBookCall} />
        </div>
      </div>
    ))}
  </div>
)

const CarouselLayout = ({ services, handleBookCall }: any) => {
  const [scrollPos, setScrollPos] = useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 400
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {services.map((service: any) => (
          <div key={service.title} className="flex-shrink-0 w-96">
            <Card className="overflow-hidden h-full bg-card/60 border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
              <div className="group h-64 overflow-hidden relative">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <div className="space-y-2 mb-4">
                  {service.features.slice(0, 2).map((feature: string) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-blue-400" />
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={handleBookCall} className="w-full bg-primary hover:bg-blue-700 text-white text-sm">
                  Explore
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-primary hover:bg-blue-700 text-white p-2 rounded-full transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-primary hover:bg-blue-700 text-white p-2 rounded-full transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}

const AlternatingLayout = ({ services, handleBookCall }: any) => (
  <div className="space-y-0">
    {services.map((service: any, index: number) => (
      <div
        key={service.title}
        className={`grid md:grid-cols-2 gap-0 items-center ${index % 2 === 0 ? '' : 'md:grid-cols-2'}`}
      >
        <div className={`p-12 ${index % 2 === 0 ? 'order-1' : 'order-2'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4">
            <span className="text-xs font-semibold text-blue-400 client-badge-boarderless">{service.stats}</span>
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-4">{service.title}</h3>
          <p className="text-base text-muted-foreground mb-6 leading-relaxed">{service.longDescription}</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {service.features.map((feature: string) => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
          <Button onClick={handleBookCall} className="bg-primary hover:bg-blue-700 text-white">
            Get Started <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className={`group h-96 overflow-hidden ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
          <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
      </div>
    ))}
  </div>
)

const FeaturedLayout = ({ services, handleBookCall }: any) => (
  <div>
    {/* Featured Card */}
    <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl">
      <div className="grid md:grid-cols-2 gap-0 items-center">
        <div className="p-12 bg-gradient-to-br from-blue-600 to-blue-700">
          <h3 className="text-4xl font-bold text-white mb-4">{services[0].title}</h3>
          <p className="text-lg text-blue-100 mb-8">{services[0].longDescription}</p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {services[0].features.map((feature: string) => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-200" />
                <span className="text-sm text-blue-100">{feature}</span>
              </div>
            ))}
          </div>
          <Button onClick={handleBookCall} className="bg-white hover:bg-blue-50 text-blue-600 font-semibold">
            Explore Now <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="group h-96 overflow-hidden">
          <img src={services[0].image} alt={services[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
      </div>
    </div>

    {/* Grid Cards */}
    <div className="grid md:grid-cols-3 gap-6">
      {services.slice(1).map((service: any) => (
        <Card key={service.title} className="overflow-hidden bg-card/60 border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
          <div className="h-48 overflow-hidden">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
            <Button onClick={handleBookCall} variant="ghost" className="w-full justify-between text-xs font-semibold">
              Learn More <ArrowRight className="w-3 h-3" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)

const GeometricLayout = ({ services, handleBookCall }: any) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
    {services.map((service: any, index: number) => (
      <div
        key={service.title}
        className={`${index % 4 === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
      >
        <Card className={`overflow-hidden bg-card/60 border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 h-full hover:shadow-xl hover:shadow-blue-500/10 ${index % 4 === 0 ? 'rounded-3xl' : 'rounded-2xl'}`}>
          <div className={`overflow-hidden ${index % 4 === 0 ? 'h-96' : 'h-48'}`}>
            <img src={service.image} alt={service.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" onClick={handleBookCall} />
          </div>
          <CardContent className={`p-6 ${index % 4 === 0 ? 'p-8' : ''}`}>
            <h3 className={`font-bold text-foreground mb-2 ${index % 4 === 0 ? 'text-2xl' : 'text-lg'}`}>{service.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{index % 4 === 0 ? service.longDescription : service.description}</p>
            {index % 4 === 0 && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                {service.features.slice(0, 2).map((feature: string) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-blue-400" />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            )}
            <Button onClick={handleBookCall} className={`w-full bg-primary hover:bg-blue-700 text-white ${index % 4 === 0 ? 'py-2' : 'py-1 text-xs'}`}>
              {index % 4 === 0 ? 'Get Started' : 'Learn'} <ArrowRight className="w-3 h-3 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    ))}
  </div>
)

const FullWidthLayout = ({ services, handleBookCall }: any) => (
  <div className="space-y-0">
    {services.map((service: any, index: number) => (
      <div
        key={service.title}
        className="relative h-96 overflow-hidden rounded-2xl mb-8 group"
      >
        <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        <div className="absolute inset-0 flex items-center p-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 mb-4">
              <span className="text-xs font-semibold text-blue-300">{service.stats}</span>
            </div>
            <h3 className="text-4xl font-bold text-white mb-4">{service.title}</h3>
            <p className="text-lg text-blue-100 mb-6 leading-relaxed max-w-xl">{service.longDescription}</p>
            <Button onClick={handleBookCall} className="bg-primary hover:bg-blue-700 text-white font-semibold">
              Explore Service <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    ))}
  </div>
)

export function ServicesSection() {
  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://assets.calendly.com/assets/external/widget.css"
    link.rel = "stylesheet"
    document.head.appendChild(link)

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
    const calendlyWindow = window as any
    if (calendlyWindow.Calendly) {
      calendlyWindow.Calendly.initPopupWidget({
        url: 'https://calendly.com/inovalogics/30min'
      });
    } else {
      alert("Calendly is still loading. Please try again in a moment.")
    }
  }

  const renderLayout = () => {
    switch (LAYOUT_MODE) {
      case 'staggered':
        return <StaggeredLayout services={services} handleBookCall={handleBookCall} />
      case 'carousel':
        return <CarouselLayout services={services} handleBookCall={handleBookCall} />
      case 'alternating':
        return <AlternatingLayout services={services} handleBookCall={handleBookCall} />
      case 'featured':
        return <FeaturedLayout services={services} handleBookCall={handleBookCall} />
      case 'geometric':
        return <GeometricLayout services={services} handleBookCall={handleBookCall} />
      case 'fullwidth':
        return <FullWidthLayout services={services} handleBookCall={handleBookCall} />
      default:
        return <StaggeredLayout services={services} handleBookCall={handleBookCall} />
    }
  }

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-400 client-badge-boarderless">Our Services</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            Intelligent Technology Solutions Built for <span className="text-primary">Growth</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-4 leading-relaxed max-w-2xl mx-auto">
            From custom software and AI-driven automation to seamless system integration, we design and deliver scalable digital solutions that streamline operations, boost efficiency, and accelerate your business success.
          </p>

          {/* <p className="text-sm text-muted-foreground/60 italic">
            💡 Tip: Change LAYOUT_MODE variable in ServicesSection.tsx to try different layouts: 'staggered' | 'carousel' | 'alternating' | 'featured' | 'geometric' | 'fullwidth'
          </p> */}
        </div>

        {/* Dynamic Layout */}
        {renderLayout()}

        {/* Value Propositions */}
       <div className="relative mt-40 mb-40 px-6 max-w-7xl mx-auto overflow-visible">
  {/* Background Structural Graphics */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.03] rounded-full pointer-events-none" />
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/[0.05] rounded-full pointer-events-none" />

  <div className="relative z-10 flex flex-col items-center">
    
    {/* Central Heading Anchor */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 hidden lg:block">
      <div className="space-y-2 bg-[#02040a]/80 backdrop-blur-md p-8 rounded-full border border-white/5">
        <h3 className="text-5xl font-black text-white leading-none tracking-tighter">
          Inova<span className="text-slate-500">Logics</span>
        </h3>
        <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-8 bg-blue-500/50" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-400">Excellence</span>
            <div className="h-[1px] w-8 bg-blue-500/50" />
        </div>
      </div>
    </div>

    {/* Responsive Heading for Mobile/Tablet */}
    <div className="lg:hidden text-center mb-16">
       <h3 className="text-5xl font-black text-white leading-none tracking-tighter mb-4">
          Inova<span className="text-slate-500">Logics</span>
       </h3>
       <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400">Why Us</span>
      </div>
    </div>

    {/* Orbiting Feature Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-64 gap-y-12 w-full max-w-6xl">
      {valueProps.map((prop, index) => (
        <div 
          key={prop.title} 
          className={`group relative p-10 rounded-3xl transition-all duration-700
            ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}
            ${index === 0 ? 'lg:-translate-y-12' : ''}
            ${index === 1 ? 'lg:-translate-y-12' : ''}
            ${index === 2 ? 'lg:translate-y-12' : ''}
            ${index === 3 ? 'lg:translate-y-12' : ''}
            bg-[#030e21] border border-white/5 hover:border-blue-500/20 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]`}
        >
          {/* Visual Accents */}
          <div style={{borderColor: '#00a8ff'}} className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-12 h-12 border-t ${index % 2 === 0 ? 'border-r' : 'border-l'} border-white/10 rounded-tr-3xl rounded-tl-3xl group-hover:border-blue-500/40 transition-colors duration-500`} />
          
          {/* Index Number */}
          <span style={{textAlign:'left', color:'#00a8ff'}} className="block text-5xl font-black text-white/[0.03] mb-6 group-hover:text-blue-500/10 transition-colors duration-500">
            0{index + 1}
          </span>

          {/* Icon Container */}
          <div className={`flex ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-end'} mb-8`}>
            <div className="w-14 h-14 flex items-center justify-center bg-[#0f172a] border border-white/10 rounded-2xl group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-500">
              <prop.icon className="w-6 h-6 text-blue-400/80 group-hover:text-blue-400" />
            </div>
          </div>

          {/* Content Text */}
          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
              {prop.title}
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed font-medium group-hover:text-slate-300 transition-colors max-w-xs inline-block">
              {prop.desc}
            </p>
          </div>

          {/* Hover Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />
        </div>
      ))}
    </div>
  </div>

  {/* Connection Lines (Desktop Only) */}
  <div className="absolute inset-0 pointer-events-none hidden lg:block">
    <div className="absolute top-1/2 left-[30%] w-[15%] h-[1px] bg-gradient-to-r from-transparent to-white/10" />
    <div className="absolute top-1/2 right-[30%] w-[15%] h-[1px] bg-gradient-to-l from-transparent to-white/10" />
  </div>
</div>


        {/* CTA */}
        <div className="max-w-3xl mx-auto text-center mt-24">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-base text-muted-foreground mb-8 leading-relaxed">
            Let's discuss how our comprehensive IT solutions can drive growth, efficiency, and innovation.
          </p>
          <Button onClick={handleBookCall} className="rounded-lg px-8 py-6 text-base font-semibold bg-primary hover:bg-blue-700 text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/30">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}
