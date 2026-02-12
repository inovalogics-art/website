"use client"

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

const projects = [
  {
    title: "Mindway: Tailored EAP",
    category: "Web & Mobile Application",
    description: "Mindway EAP is a secure digital platform designed to enhance employee mental health and wellbeing. It offers confidential professional support, personalized self-care resources, and 24/7 access to mindfulness tools and digital journals, enabling employees to manage stress, workplace challenges, and personal growth while ensuring complete privacy and employer-covered access.",
    tags: ["Tailwind", "Laravel", "PostgreSQL"],
    result: "40% improvement in employee wellbeing and engagement",
    color: "from-[#0A2E6E] to-[#00A8FF]",
    media: "/projects/mindway-project.jpg",
  },
  {
    title: "holo - Bid on Your Offer",
    category: "Mobile Application",
    description: "holo is Pakistan’s first integrated platform combining hotel bookings and ride services with a unique bidding model. The app empowers users to secure the best possible prices, delivering convenience, affordability, and exclusive member benefits through a seamless, user-centric travel experience.",
    tags: ["React Native", "Node.js", "Flutter", "Dart", "Tailwind"],
    result: "150K+ active users with strong retention growth",
    color: "from-[#00A8FF] to-[#0A2E6E]",
    media: "/projects/holo-project.png",
  },
  {
    title: "BiteTrucks - Food Delivery & Takeaway",
    category: "E-commerce Platform",
    description: "BiteTrucks is a scalable multi-vendor food marketplace powered by AI-driven recommendations. The platform enables fast ordering, secure digital payments, and efficient vendor management while delivering personalized user experiences and reliable delivery operations.",
    tags: ["React.js", "Stripe", "PostgreSQL", "Laravel", "Tailwind"],
    result: "$2M+ in monthly transactions with consistent platform growth",
    color: "from-[#0A2E6E] to-[#00A8FF]",
    media: "/projects/bitetruck.jpg",
  },
  {
    title: "CRM & Automation (GHL Customized Dashboards)",
    category: "Enterprise Software",
    description: "A real-time fleet management and logistics optimization solution featuring customized dashboards, automated workflows, and actionable analytics. The system improves operational visibility, reduces inefficiencies, and enables data-driven decision-making for enhanced service reliability.",
    tags: ["TypeScript", "VanillaJS"],
    result: "30% reduction in delivery times and operational delays",
    color: "from-[#00A8FF] to-[#0A2E6E]",
    media: "/projects/crm-automation.png",
  },
];


export function PortfolioSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="portfolio" className="py-32">
      {/* Background elements with animation */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider animate-fade-in-down eye-catching-heading client-badge">Our Work</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6 animate-fade-in-up">
            Enterprise Solutions Delivering Real Results
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Proven track record of transforming businesses with innovative technology solutions
          </p>
        </div>

        {/* Scrollable Container */}
        <div className="relative group">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-8 pb-4 scroll-smooth scrollbar-hide"
            style={{ scrollBehavior: 'smooth' }}
          >
            {projects.map((project) => (
              <div
                key={project.title}
                className="group/card relative flex-shrink-0 w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21px)] overflow-hidden rounded-2xl bg-card border border-primary/20 hover:border-primary/60 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                {/* Media Image */}
                {project.media && (
                  <div className="h-56 w-full overflow-hidden rounded-t-2xl">
                    <img
                      src={project.media}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-white/30">
                      <ArrowUpRight className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-8">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

                  <div className="bg-muted/40 rounded-lg p-4 mb-6 border border-primary/10">
                    <p className="text-sm font-semibold text-primary mb-1">Results Achieved</p>
                    <p className="text-foreground font-bold">{project.result}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <Button
            onClick={() => scroll('left')}
            size="icon"
            variant="outline"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background border-primary/30 hover:border-primary/60"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => scroll('right')}
            size="icon"
            variant="outline"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background border-primary/30 hover:border-primary/60"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
