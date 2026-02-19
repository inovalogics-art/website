import Link from "next/link"
import { Linkedin, Github, Instagram, Facebook } from "lucide-react"
import Image from "next/image"

const footerLinks = {
  services: [
    { label: "Custom Software Development", href: "#services" },
    { label: "Web & Mobile Applications", href: "#services" },
    { label: "AI & Automation Solutions", href: "#services" },
    { label: "System Integration", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Work", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/inova-logics-a554533aa/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/inovalogics-art", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/inovalogics", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/inovalogics", label: "Facebook" },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-primary/10 relative overflow-hidden">

      {/* soft glow background */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-8 py-20 relative z-10">

        {/* ============ TOP SECTION ============ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ===== Brand ===== */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/invologics-logo.png"
                alt="InovaLogics Logo"
                width={170}
                height={170}
                className="object-contain"
              />
            </Link>

            <h3 className="text-foreground font-semibold text-lg mb-3">
              Intelligent Software. Scalable Growth.
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mb-6">
              We build custom software, AI-powered systems, and automation solutions
              that streamline operations, eliminate manual work, and help businesses grow faster.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* ===== Services ===== */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Company ===== */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ============ BOTTOM BAR ============ */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">

          <span>
            © {new Date().getFullYear()} InovaLogics Solutions. All rights reserved.
          </span>

          <div className="flex flex-wrap items-center gap-6">
            <span>info@inovalogics.com</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
