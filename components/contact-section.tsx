"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, CheckCircle, Calendar, Mail, Phone, MessageSquare, Sparkles, ShieldCheck } from "lucide-react"

// Extend Window interface for Calendly
declare global {
  interface Window {
    Calendly: any;
  }
}

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [bookingData, setBookingData] = useState({
    service: "",
    notes: ""
  })

  // Load Calendly assets
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handlePopupBooking = () => {
    if (!bookingData.service) {
      alert("Please select a service first")
      return
    }

    if (window.Calendly) {
      // Combine service and notes into the description field for maximum visibility
      const combinedNotes = `Service Interest: ${bookingData.service}\n\nAdditional Notes: ${bookingData.notes || 'None provided'}`;
      
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/inovalogics/30min',
        prefill: {
          // Passing to description ensures it shows up in the event details
          notes: combinedNotes,
          // Also passing to custom questions (a1, a2) as backup
          customAnswers: {
            a1: bookingData.service,
            a2: bookingData.notes
          }
        }
      });
    } else {
      alert("Calendly is still loading. Please try again in a moment.")
    }
  }

  return (
    <section id="contact" className="py-24">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="client-badge-boarderless">Partner with Inovalogics</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Ready to <span className="text-primary">Innovate?</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Whether you're looking to build a new product or optimize existing systems, our team is ready to help you scale.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Redesigned Contact Form - Production Ready */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-border rounded-[2rem] p-8 md:p-12 shadow-sm flex-grow flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Send us a message</h3>
                <p className="text-muted-foreground">Fill out the form and we'll get back to you within 24 hours.</p>
              </div>

              {isSubmitted ? (
                <div className="flex-grow flex flex-col items-center justify-center py-12 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground text-center max-w-xs">
                    Your message has been sent successfully. We'll be in touch shortly.
                  </p>
                  <Button 
                    variant="link" 
                    className="mt-6 text-primary"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6 flex-grow">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium ml-1">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        required
                        className="h-12 rounded-xl bg-muted/20 border-border focus:border-primary focus:ring-primary/10 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium ml-1">Work Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        required
                        className="h-12 rounded-xl bg-muted/20 border-border focus:border-primary focus:ring-primary/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest" className="text-sm font-medium ml-1">Service Interest</Label>
                    <Select>
                      <SelectTrigger className="w-full h-12 rounded-xl bg-muted/20 border-border">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software">Software Development</SelectItem>
                        <SelectItem value="web-mobile">Web & Mobile Apps</SelectItem>
                        <SelectItem value="uiux">UI/UX Design</SelectItem>
                        <SelectItem value="automation">Automation & AI</SelectItem>
                        <SelectItem value="other">Other Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium ml-1">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project..."
                      className="min-h-[160px] rounded-xl bg-muted/20 border-border focus:border-primary focus:ring-primary/10 transition-all resize-none"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/10 group">
                    Send Message
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Booking & Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Booking Card - Polished */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-[2rem] p-8 md:p-10 shadow-xl relative overflow-hidden flex-grow p-8 md:p-10 relative overflow-hidden flex-grow">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Book a Call</h3>
                </div>
                
                <p className="mb-8 text-lg">
                  Prefer a direct conversation? Schedule a 30-minute discovery session with our experts.
                </p>

                <div className="space-y-5 mt-auto">
                  <div className="space-y-2">
                    <Label className="w-full text-white/80 text-xs font-bold uppercase tracking-widest ml-1">Select Service</Label>
                    <Select onValueChange={(val) => setBookingData({ ...bookingData, service: val })}>
                      <SelectTrigger className="w-full h-12 bg-white/10 border-white/20 text-white rounded-xl focus:ring-white/20">
                        <SelectValue placeholder="What do you need?" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="Software Development">Software Development</SelectItem>
                        <SelectItem value="Web & Mobile Apps">Web & Mobile Apps</SelectItem>
                        <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                        <SelectItem value="Automation & AI">Automation & AI</SelectItem>
                        <SelectItem value="Other Inquiry">Other Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80 text-xs font-bold uppercase tracking-widest ml-1">Additional Notes</Label>
                    <Input 
                      placeholder="Briefly describe your goal..."
                      className="h-12 bg-white/10 border-white/20 text-white rounded-xl placeholder:text-white/40 focus:ring-white/20"
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                    />
                  </div>

                  <Button 
                    onClick={handlePopupBooking}
                    className="w-full h-14 rounded-xl font-bold text-lg shadow-lg"
                  >
                    Schedule Now
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-white/60 text-xs pt-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>No commitment required</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <a href="mailto:info@inovalogics.com" className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Email</p>
                  <p className="font-bold text-sm">info@inovalogics.com</p>
                </div>
              </a>

              <a href="tel:+923061161376" className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Call</p>
                  <p className="font-bold text-sm">+92 (306) 116-1376</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}