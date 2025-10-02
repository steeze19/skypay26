"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function WatchPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <Image src="/skypay-logo.png" alt="SkyPay" width={100} height={40} className="object-contain" />
        </div>
        <h1 className="text-3xl font-bold">Watch</h1>
        <p className="text-gray-400">Coming soon...</p>
      </div>
    </div>
  )
}
