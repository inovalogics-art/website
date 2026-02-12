"use client"

import React, { useState } from "react"
import { ArrowRight, Zap, Users, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const statsData = [
  {
    label: "Projects Completed",
    description: "Delivered excellence across diverse industries",
    icon: Zap,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    label: "Global Clients",
    description: "Trusted partners worldwide",
    icon: Users,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    label: "Uptime Guarantee",
    description: "Enterprise-grade reliability",
    icon: Shield,
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    label: "Support Available",
    description: "Always here when you need us",
    icon: Clock,
    color: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-500",
    gradient: "from-orange-500 to-amber-500"
  },
]

export function VisionSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="vision">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Radial gradient vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,hsl(var(--background))_100%)] opacity-40" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-primary font-bold text-xs uppercase tracking-widest client-badge-boarderless">Your Success is Our Mission</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-8 mb-24 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
          Your vision isn’t just a project —
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">it’s a growth opportunity.</span>
              </span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              That’s why we bring together elite engineering, intelligent automation, and strategic insight to build digital products designed for scale, performance, and real business results.
            </p>

            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-7 rounded-full font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 group">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-7 rounded-full border-primary/30 text-foreground hover:bg-primary/5 hover:border-primary/60 font-bold transition-all"
              >
                Contact Us
              </Button>
            </div> */}
          </div>

          {/* Premium Stats Grid with Logo Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => {
              const StatIcon = stat.icon
              const isHovered = hoveredIndex === index

              return (
                <div
                  key={stat.label}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-6 cursor-pointer"
                >
                  {/* Glow effect on hover */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500 -z-10`}
                    style={{
                      background: `linear-gradient(135deg, ${stat.gradient})`,
                      opacity: isHovered ? 0.3 : 0
                    }}
                  />

                  {/* Main Card */}
                  <div className="relative p-8 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 border border-primary/20 hover:border-primary/60 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl h-full flex flex-col">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" style={{
                      background: `radial-gradient(circle at top right, ${stat.gradient}15, transparent 70%)`
                    }} />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full items-center text-center">
                      {/* Logo/Icon Container with Premium Styling */}
                      <div className="mb-8 relative">
                        {/* Outer glow ring */}
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                          background: `linear-gradient(135deg, ${stat.gradient})`,
                          filter: 'blur(20px)',
                          transform: 'scale(1.2)'
                        }} />

                        {/* Icon Container */}
                        <div
                          className={`relative w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border border-primary/20 group-hover:border-primary/60`}
                          style={{
                            background: `linear-gradient(135deg, ${stat.color})`
                          }}
                        >
                          <StatIcon
                            className={`w-12 h-12 ${stat.iconColor} transition-all duration-500 group-hover:animate-pulse`}
                          />
                        </div>

                        {/* Decorative dots */}
                        <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all" />
                        <div className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary/60 group-hover:scale-150 transition-all" />
                      </div>

                      {/* Text Content */}
                      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {stat.label}
                      </h3>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-grow">
                        {stat.description}
                      </p>

                      {/* Bottom accent bar */}
                      <div className="mt-6 pt-6 border-t border-primary/10 group-hover:border-primary/40 transition-colors w-full">
                        <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full w-0 group-hover:w-full transition-all duration-500" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}