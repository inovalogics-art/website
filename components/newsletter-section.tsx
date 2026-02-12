"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Mail } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    // Simulate subscription
    setIsSubscribed(true)
    setEmail("")
    
    // Reset after 4 seconds
    setTimeout(() => {
      setIsSubscribed(false)
    }, 4000)
  }

  return (
    <section id="newsletter">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Card Background */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/30 p-12 md:p-16">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-6">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-muted-foreground text-lg">
                Get the latest insights, industry trends, and product updates delivered to your inbox every week.
              </p>
            </div>

            {/* Success State */}
            {isSubscribed ? (
              <div className="p-8 rounded-xl bg-primary/10 border border-primary/30 text-center space-y-4">
                <div className="inline-flex items-center justify-center">
                  <CheckCircle className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Successfully Subscribed!</h3>
                <p className="text-muted-foreground">
                  Thank you for subscribing. Check your email for a confirmation message.
                </p>
              </div>
            ) : (
              /* Form State */
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError("")
                    }}
                    className="flex-1 bg-background border-border text-foreground placeholder:text-muted-foreground h-12"
                    aria-label="Email address"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 font-semibold whitespace-nowrap"
                  >
                    Subscribe
                  </Button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm text-red-600 font-medium">{error}</p>
                  </div>
                )}

                {/* Terms */}
                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>

          {/* Trust Statement */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Join <span className="text-primary font-semibold">500+</span> subscribers receiving weekly insights
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
