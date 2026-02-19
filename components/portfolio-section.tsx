"use client"

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRef, useEffect, useState } from "react"

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

// Triple the projects for a truly seamless infinite scroll
const displayProjects = [...projects, ...projects, ...projects, ...projects, ...projects, ...projects, ...projects, ...projects, ...projects, ...projects, ...projects, ...projects, ...projects, ...projects, ...projects];

export function PortfolioSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const innerContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    let animationFrameId: number;

    const updateActiveCard = () => {
      const container = scrollContainerRef.current;
      const inner = innerContainerRef.current;
      if (!container || !inner) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      const cards = inner.querySelectorAll('.project-card');
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
      animationFrameId = requestAnimationFrame(updateActiveCard);
    };

    animationFrameId = requestAnimationFrame(updateActiveCard);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    // Add animation styles for infinite scroll
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes scroll-portfolio {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-33.33% - 10.66px)); }
      }
      .animate-scroll-portfolio {
        animation: scroll-portfolio 40s linear infinite;
      }
      .group:hover .animate-scroll-portfolio {
        animation-play-state: paused;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `
    document.head.appendChild(style)
    return () => {
      if (document.head.contains(style)) document.head.removeChild(style)
    }
  }, [])

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
    <section id="portfolio" className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider eye-catching-heading client-badge">Our Work</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Helping Businesses Work Smarter and Grow Faster
          </h2>
          <p className="text-muted-foreground text-lg">
            Proven track record of transforming businesses with innovative technology solutions
          </p>
        </div>

        {/* Infinite Scrollable Container */}
        <div className="relative group">
          {/* Gradient Fades */}

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide py-10"
          >
            <div
              ref={innerContainerRef}
              className="flex gap-8 animate-scroll-portfolio w-max px-[20vw]"
            >
              {displayProjects.map((project, idx) => {
                const isActive = activeIndex === idx

                return (
                  <div
                    key={`${project.title}-${idx}`}
                    className={`project-card relative flex-shrink-0 w-[320px] md:w-[450px] lg:w-[500px] overflow-hidden rounded-3xl bg-card/50 border transition-all duration-500 cursor-pointer
                      ${isActive
                        ? 'scale-105 border-primary/40 shadow-2xl shadow-primary/10 opacity-100 z-20'
                        : 'scale-95 border-primary/10 opacity-50 grayscale-[0.5]'
                      }
                    `}
                  >
                    {/* Media Image */}
                    {project.media && (
                      <div className="h-64 w-full overflow-hidden relative">
                        <img
                          src={project.media}
                          alt={project.title}
                          className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'scale-100'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

                        <div className="absolute top-6 left-6">
                          <div className="client-badge-boarderless px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                            {project.category}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-8 space-y-6">
                      <div>
                        <h3 className={`text-2xl md:text-3xl font-bold mb-3 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-foreground'}`}>
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed line-clamp-3 text-sm md:text-base">
                          {project.description}
                        </p>
                      </div>

                      <div className={`relative p-5 rounded-2xl bg-primary/5 border transition-all duration-300 ${isActive ? 'border-primary/30' : 'border-primary/10'}`}>
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-50" />
                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">Impact Delivered</p>
                        <p className="text-foreground font-bold text-lg leading-tight">
                          {project.result}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-3 py-1 text-[10px] font-medium rounded-lg bg-secondary/50 border transition-colors ${isActive ? 'border-primary/20 text-foreground' : 'border-border text-muted-foreground'}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={() => scroll('left')}
              size="icon"
              variant="outline"
              className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary hover:text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => scroll('right')}
              size="icon"
              variant="outline"
              className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary hover:text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}