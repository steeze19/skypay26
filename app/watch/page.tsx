"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function WatchPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <Image src="/skypay-logo.png" alt="SkyPay" width={100} height={40} className="object-contain" />
        </div>
        <h1 className="text-2xl font-bold">Watch</h1>

        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-zinc-900">
          <iframe
            src="https://www.dailymotion.com/embed/video/x9rle5y"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>

        <div className="bg-zinc-900 rounded-lg p-4 border border-yellow-500/20">
          <h2 className="font-semibold text-lg mb-2">About This Video</h2>
          <p className="text-sm text-gray-400">
            Learn how to maximize your earnings with SkyPay. Watch this tutorial to get started.
          </p>
        </div>
      </div>
    </div>
  )
}
