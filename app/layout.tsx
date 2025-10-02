import type React from "react"
import type { Metadata } from "next/app"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { AnnouncementBanner } from "@/components/announcement-banner"
import { AppFooter } from "@/components/app-footer"

export const metadata: Metadata = {
  title: "SkyPay - Start Earning Big",
  description: "The best earning and payment platform",
  generator: "v0.app",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen flex flex-col`}>
        <AnnouncementBanner />
        <main className="flex-1 pb-16">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
        <AppFooter />
        <Analytics />
      </body>
    </html>
  )
}
