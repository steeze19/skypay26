"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Mail, MessageCircle, Send, Phone } from "lucide-react"
import Image from "next/image"

export default function SupportPage() {
  const router = useRouter()

  const supportOptions = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email",
      value: "SkyPayservice26@gmail.com",
      action: () => window.open("mailto:SkyPayservice26@gmail.com"),
    },
    {
      icon: Phone,
      title: "WhatsApp",
      description: "Chat with us on WhatsApp",
      value: "+2347085767123",
      action: () => window.open("https://wa.me/2347085767123"),
    },
    {
      icon: Send,
      title: "Telegram",
      description: "Join our Telegram support",
      value: "t.me/SkyPay26",
      action: () => window.open("https://t.me/SkyPay26"),
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      value: "Start Chat",
      action: () => alert("Live chat feature coming soon!"),
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <Image src="/skypay-logo.png" alt="SkyPay" width={100} height={40} className="object-contain" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Support</h1>
          <p className="text-gray-400">Get help from our support team</p>
        </div>

        {/* Support Options */}
        <div className="space-y-4 mt-8">
          {supportOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="w-full bg-zinc-900 hover:bg-zinc-800 rounded-2xl p-6 transition-all duration-300 border border-yellow-500/20 hover:border-yellow-500/40 group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500/20 p-4 rounded-full group-hover:bg-yellow-500/30 transition-colors">
                  <option.icon className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-lg">{option.title}</h3>
                  <p className="text-sm text-gray-400">{option.description}</p>
                  <p className="text-sm text-yellow-500 mt-1">{option.value}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
