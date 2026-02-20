import React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./providers"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const GA_ID = "G-ZWQNB7QYF4"

export const metadata: Metadata = {
  title: "Inova Logics | Custom Software Developmemt & Automation",
  description:
    "Leading software development company offering custom software, web & mobile app development, UI/UX design, and graphic design services. Trusted by US enterprises.",
  icons: {
    icon: [
      {
        url: "/logo/favicon.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo/favicon.ico",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo/favicon.ico",
        type: "image/svg+xml",
      },
    ],
    apple: "/logo/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased dark">
        <Providers>
          {children}
          <Analytics />
        </Providers>

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}