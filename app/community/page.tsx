"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, MessageCircle, Send } from "lucide-react"
import Image from "next/image"

export default function CommunityPage() {
  const router = useRouter()

  const communityOptions = [
    {
      icon: MessageCircle,
      title: "WhatsApp Community",
      description: "Join our WhatsApp community",
      action: () => window.open("https://chat.whatsapp.com/skypay"),
    },
    {
      icon: Send,
      title: "Telegram Community",
      description: "Join our Telegram channel",
      value: "https://t.me/Skypay261",
      action: () => window.open("https://t.me/Skypay261"),
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
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-gray-400">Connect with other SkyPay users</p>
        </div>

        {/* Community Options */}
        <div className="space-y-4 mt-8">
          {communityOptions.map((option, index) => (
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
                  {option.value && <p className="text-sm text-yellow-500 mt-1">{option.value}</p>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
