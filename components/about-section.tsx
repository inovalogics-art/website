"use client"


import React, { useEffect , useState} from "react"
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

const features = [
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Secure development practices aligned with modern compliance and data protection standards",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500"
  },
  {
    icon: Clock,
    title: "Reliable Delivery",
    description: "Structured project planning and execution to ensure predictable timelines",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500"
  },
  {
    icon: Users,
    title: "Dedicated Delivery Teams",
    description: "Skilled engineers, designers, and managers focused on your project goals",
    color: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-500"
  },
  {
    icon: TrendingUp,
    title: "Business-Driven Results",
    description: "Technology solutions designed to improve efficiency, scalability, and performance",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500"
  },
]

const benefits = [
  "Global delivery experience across US, Europe & Middle East",
  "Agile & Scrum-based development approach",
  "Dedicated project and engineering teams",
  "Clear and transparent communication",
  "Flexible and scalable engagement models",
  "Ongoing support and maintenance services",
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
                <span className="text-xs font-bold tracking-widest uppercase text-primary">About Us</span>
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
                  src="/projects/team-collaboration.jpg"
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

        {/* Features Grid with Premium Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden p-8 rounded-2xl bg-card/40 border border-primary/10 hover:border-primary/40 backdrop-blur-md transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
            >
              {/* Decorative Background Gradient */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Content */}
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ring-1 ring-primary/20`}>
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                  {feature.description}
                </p>

                {/* Hover Indicator */}
                <div className="mt-6 pt-4 border-t border-primary/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-semibold text-primary">Explore</span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
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
                              boxShadow: isHovered ? `0 0 20px ${category.color}40` : 'none'
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