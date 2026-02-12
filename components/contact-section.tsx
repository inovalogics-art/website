"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, CheckCircle } from "lucide-react"

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-24">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />


      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4">
            Transform Your Business With Intelligent Technology
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
            Whether you're launching, scaling, or optimizing — we’re ready to build your next competitive advantage.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/30 p-8">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get Started</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
              Let's discuss your project
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Fill out the form below and we'll get back to you within 24 hours with a custom proposal.
            </p>

            {isSubmitted ? (
              <div className="p-8 rounded-xl bg-primary/10 border border-primary/30 text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Thank you!</h3>
                <p className="text-muted-foreground">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      required
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Work Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-foreground">Company</Label>
                    <Input
                      id="company"
                      placeholder="Your Company"
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-foreground">Service Interest</Label>
                    <Select>
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software">Software Development</SelectItem>
                        <SelectItem value="web-mobile">Web & Mobile Apps</SelectItem>
                        <SelectItem value="uiux">UI/UX Design</SelectItem>
                        <SelectItem value="automation">Automation & Optimization</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-foreground">Budget Range</Label>
                    <Select>
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget-500-1000">$500–$1,000</SelectItem>
                        <SelectItem value="budget-1000-5000">$1,000–$5,000</SelectItem>
                        <SelectItem value="budget-5000-10000">$5,000–$10,000</SelectItem>
                        <SelectItem value="budget-10000-plus">$10,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline" className="text-foreground">Project Timeline</Label>
                    <Select>
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent (1-2 weeks)</SelectItem>
                        <SelectItem value="soon">Soon (1-2 months)</SelectItem>
                        <SelectItem value="flexible">Flexible (3+ months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group">
                  Get a Quote
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            )}
          </div>

          {/* CTA Section */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/30 p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">What to Expect</h3>
              <ul className="space-y-4">
                {[
                  "Free consultation to understand your needs",
                  "Custom proposal within 48 hours",
                  "Transparent pricing with no hidden fees",
                  "Dedicated project manager assignment",
                  "Weekly progress updates and reporting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 bg-card border border-primary/20 rounded-2xl p-8 text-center">
                <p className="text-muted-foreground mb-4">Questions? Reach out directly</p>
                <p className="text-sm mb-6">
                  <a href="mailto:info@inovalogics.com" className="text-primary hover:underline font-semibold">
                    info@inovalogics.com
                  </a>
                  <br />
                  <a href="tel:+923066111376" className="text-primary hover:underline font-semibold">
                    +92 (306) 611-1376
                  </a>
                </p>
                <div className="pt-6 border-t border-primary/10">
                  <p className="text-xs text-muted-foreground">Response time: Within 24 hours</p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}
