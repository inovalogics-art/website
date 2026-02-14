"use client"
import React, { useEffect } from "react"
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
  Play
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Code2,
    title: "AI-Powered Web Development",
    description: "Custom websites and web apps built for performance, security, and conversions. Not just beautiful — engineered to grow revenue.",
    features: [
      "Enterprise Applications",
      "API & System Integration",
    ],
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
    tag: "Scalable",
    image: "/projects/ai-web.jpg",
    bgPosition: "object-center"
  },
  {
    icon: Smartphone,
    title: "Custom SaaS Development",
    description: "Launch your own scalable SaaS product with secure architecture and future-proof technology.",
    features: [
      "Responsive Web Applications",
      "Cross-Platform Solutions",
    ],
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500",
    tag: "Native",
    image: "/projects/saas-dev.jpg",
    bgPosition: "object-cover"
  },
  {
    icon: Palette,
    title: "AI Business Automation",
    description: "Eliminate manual processes using AI workflows that reduce costs and improve operational efficiency.",
    features: [
      "Wireframing & Prototyping",
      "Design Systems & UI Standards",
    ],
    color: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-500",
    tag: "Creative",
    image: "/projects/ai-business-automation.jpg",
    bgPosition: "object-cover"
  },
  {
    icon: Zap,
    title: "CRM & GHL Automation",
    description: "We design intelligent CRM systems and GoHighLevel automation that streamline your sales, nurture leads, and increase closing rates.",
    features: [
      "Workflow Optimization",
      "System Orchestration",
    ],
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
    tag: "Efficient",
    image: "/projects/ghl-service.png",
    bgPosition: "object-cover"
  },
]

const valueProps = [
  { icon: ShieldCheck, title: "Enterprise SecurityResults-Driven Approach", desc: "We build with ROI in mind — every feature serves a measurable purpose." },
  { icon: BarChart3, title: "Automation First Strategy", desc: "We eliminate inefficiencies and scale your business through smart systems." },
  { icon: Globe, title: "Enterprise-Grade Security", desc: "Your data, systems, and infrastructure are protected at every level." },
  { icon: Rocket, title: "Long-Term Partnership", desc: "We don’t just deliver projects — we build ongoing growth partnerships." },
]
export function ServicesSection() {
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
  return (
    <section id="services" className="py-32">
      {/*  bg-background relative overflow-hidden */}

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_70%)] opacity-50" />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Hero Banner Section with Image */}
        <div className="relative mb-32 rounded-3xl overflow-hidden group">
          <div className="relative h-96 md:h-[500px] w-full overflow-hidden rounded-3xl">
            {/* Background Image */}
            <img
              src="/projects/sky-blue-network.gif"
              alt="Digital Transformation"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 from-background/90 via-background/70 to-transparent" />
            <div className="absolute inset-0 from-background/80 to-transparent" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-xs font-bold tracking-widest uppercase text-primary">Innovation Hub</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]">
                  We Build Systems That <span className="text-primary">Power</span> Modern Businesses
                </h1>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                  Inova Logics partners with startups, agencies, and enterprise teams to design and develop intelligent digital infrastructure.

                </p>
                {/* <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">

                  From AI-powered automation to scalable SaaS platforms, we create technology that works as hard as you do.
                </p> */}

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" onClick={handleBookCall} className="rounded-full px-8 py-7 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                    Get Started
                  </Button>
                  {/* <Button variant="outline" size="lg" className="rounded-full px-8 py-7 text-base font-bold border-primary/30 hover:bg-primary/5">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Demo
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <p className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-6 eye-catching-heading client-badge">Our Expertise</p>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-8 leading-[1.1]">
            Comprehensive IT <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Solutions</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/10 -rotate-1 -z-0"></span>
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
            From strategy and design to development and optimization, we deliver comprehensive IT services that enable scalable and secure digital transformation.
          </p>
        </div>

        {/* Service Cards with Images - Advanced Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group relative overflow-hidden bg-card/50 border-primary/10 hover:border-primary/40 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary/10 backdrop-blur-md h-full flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                <img
                  src={service.image}
                  alt={service.title}
                  className={`absolute inset-0 w-full h-full ${service.bgPosition} group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100`}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 from-card via-transparent to-transparent" />

                {/* Floating Icon Badge */}
                <div className={`absolute top-4 right-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ring-1 ring-primary/20 backdrop-blur-md`}>
                  <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                </div>
              </div>

              {/* Content Container */}
              <CardContent className="p-6 relative z-10 h-full flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-primary/5 border border-primary/10 text-primary/70">
                    {service.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                  {service.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary group-hover/item:scale-125 transition-all duration-300 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground group-hover/item:text-foreground transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button variant="ghost" className="w-full justify-between group/btn border border-primary/5 hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-xl py-6 mt-auto">
                  <span className="text-xs font-bold uppercase tracking-wider">Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Section: Value Propositions */}
        <div className="relative rounded-[2.5rem] p-8 md:p-16 overflow-hidden border border-primary/10 bg-card/30 backdrop-blur-xl">
          {/* Decorative elements for the bottom section */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,hsl(var(--primary)/0.05)_0%,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,hsl(var(--primary)/0.05)_0%,transparent_50%)]" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-6">The Advantage</p>
              <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
                Why Businesses<br />
                <span className="text-primary/80"> Choose Inova Logics</span>
              </h3>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                We combine deep technical proficiency with strategic business thinking to deliver solutions that don't just work—they excel. Our commitment to quality and innovation is built into every line of code.
              </p>
              <Button size="lg" onClick={() => {
                const section = document.getElementById("contact")
                section?.scrollIntoView({ behavior: "smooth" })
              }} className="rounded-full px-8 py-7 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                Start Your Transformation
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {valueProps.map((prop, i) => (
                <div key={i} className="p-6 rounded-3xl bg-background/50 border border-primary/5 hover:border-primary/20 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <prop.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{prop.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{prop.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA / Trust Indicator */}
        <div className="mt-24 text-center">
          <p className="text-muted-foreground text-sm font-medium mb-8">Trusted by forward-thinking companies worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {['TECHFLOW', 'CLOUDCORE', 'DATASYNC', 'NEXUS', 'QUANTUM'].map((logo) => (
              <span key={logo} className="text-xl font-black tracking-tighter hover:text-primary cursor-default transition-colors">{logo}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}