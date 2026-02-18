import Link from "next/link"
import { Linkedin, Twitter, Github, Instagram, Facebook } from "lucide-react"
import Image from "next/image";

const footerLinks = {
  services: [
    { label: "Software Development", href: "#" },
    { label: "Web & Mobile Apps", href: "#" },
    { label: "UI/UX Design", href: "#" },
    { label: "Graphic Design", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
  ],
  resources: [
    { label: "Case Studies", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "Support", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/inova-logics-a554533aa/", label: "LinkedIn" },
  { icon: Twitter, href: "https://www.twitter.com/inovalogics", label: "Twitter" },
  { icon: Github, href: "https://github.com/inovalogics-art", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/inovalogics", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/inovalogics", label: "Facebook" },

]

export function Footer() {
  return (
    <footer className="bg-background border-t border-primary/10 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="rounded-xl overflow-hidden group-hover:shadow-lg transition-all">
                <Image
                  src="/invologics-logo.png"
                  alt="InovaLogics Logo"
                  width={185}
                  height={185}
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Building digital products that transform businesses. Your trusted partner for software development excellence.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          {/* <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} InovaLogics Solutions. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span>info@inovalogics.com</span>
              {/* <span>+92 306 1161376</span> */}
              {/* <span>Chungi # 6 Multan Pakistan</span> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
