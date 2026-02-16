"use client"

import { Play, Pause } from "lucide-react"
import { useState } from "react"

const videoTestimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Chief Executive Officer",
    title: "A Reliable Technology Partner",
    thumbnail: "bg-gradient-to-br from-slate-700 to-slate-900",
    description:
      "We were looking for a long-term technology partner who could understand our business requirements and deliver consistently. The collaboration was structured, transparent, and aligned with our growth plans.",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "VP of Engineering",
    title: "Strong Technical Execution",
    thumbnail: "bg-gradient-to-br from-indigo-700 to-indigo-900",
    description:
      "Their engineering team integrated well with our internal processes. Code quality, documentation, and communication met our enterprise standards throughout the engagement.",
  },
  {
    id: 3,
    name: "Lisa Wang",
    role: "Founder",
    title: "Clear Process and Communication",
    thumbnail: "bg-gradient-to-br from-emerald-700 to-emerald-900",
    description:
      "They took the time to understand domain-specific challenges and proposed solutions that were practical and scalable. The overall delivery process was smooth and predictable.",
  },
  {
    id: 4,
    name: "James Rodriguez",
    role: "Chief Technology Officer",
    title: "Security and Compliance Focused Delivery",
    thumbnail: "bg-gradient-to-br from-neutral-700 to-neutral-900",
    description:
      "Security and compliance were critical requirements for us. The team followed best practices and delivered a solution that aligned with our internal governance standards.",
  },
]

// export function VideoTestimonialsSection() {
//   const [playingId, setPlayingId] = useState<number | null>(null)

//   return (
//     <section id="video-testimonials" className="py-24">
//       {/* Background accents */}
//       <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

//       <div className="container mx-auto px-4 lg:px-8 relative z-10">
//         <div className="max-w-3xl mx-auto text-center mb-16">
//           <span className="text-primary font-semibold text-sm uppercase tracking-wider eye-catching-heading client-badge">Video Testimonials</span>
//           <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
//             Explore Our Work
//           </h2>
//           <p className="text-muted-foreground text-lg">
//             Hear directly from clients as they share their experience working with our team on complex digital initiatives
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8 mb-12">
//           {videoTestimonials.map((video) => (
//             <div
//               key={video.id}
//               className="group cursor-pointer"
//               onClick={() => setPlayingId(playingId === video.id ? null : video.id)}
//             >
//               {/* Video Thumbnail */}
//               <div className="relative mb-6 rounded-2xl overflow-hidden border border-primary/20 group-hover:border-primary/60 transition-all duration-300">
//                 <div className={`aspect-video ${video.thumbnail} flex items-center justify-center relative`}>
//                   {/* Play button */}
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300">
//                     <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
//                       {playingId === video.id ? (
//                         <Pause className="w-8 h-8 text-white" />
//                       ) : (
//                         <Play className="w-8 h-8 text-white ml-1" />
//                       )}
//                     </div>
//                   </div>

//                   {/* Video duration badge */}
//                   <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-lg text-white text-xs font-semibold">
//                     2:45
//                   </div>
//                 </div>

//                 {/* Video player overlay when playing */}
//                 {playingId === video.id && (
//                   <div className="absolute inset-0 bg-black flex items-center justify-center">
//                     <iframe
//                       className="w-full h-full"
//                       src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
//                       title="Video testimonial"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* Video Info */}
//               <div>
//                 <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
//                   {video.title}
//                 </h3>
//                 <p className="text-muted-foreground text-sm mb-4">{video.description}</p>

//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
//                     <span className="text-primary font-bold text-sm">
//                       {video.name.split(" ").map((n) => n[0]).join("")}
//                     </span>
//                   </div>
//                   <div className="min-w-0">
//                     <p className="font-semibold text-foreground text-sm">{video.name}</p>
//                     <p className="text-xs text-muted-foreground truncate">{video.role}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* CTA */}
//         <div className="text-center">
//           <p className="text-muted-foreground mb-6 client-badge-boarderless">
//             Looking for a reliable technology partner for your next initiative?
//           </p>
//           {/* <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold">
//             Schedule a Consultation
//             <span>→</span>
//           </button> */}
//         </div>
//       </div>
//     </section>
//   )
// }
