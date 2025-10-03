"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function SkyCodeConfirmedPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("userData")
    if (userData) {
      const parsed = JSON.parse(userData)
      setUserName(parsed.name || "User")
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-6 space-y-6">
        <div className="flex items-center justify-center">
          <Image src="/skypay-logo.png" alt="SkyPay" width={120} height={48} className="object-contain" />
        </div>

        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse" />
              <XCircle className="h-24 w-24 text-red-500 relative" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-red-500">Payment Not Confirmed</h1>
            <p className="text-xl text-gray-300">
              <span className="text-yellow-500 font-semibold">{userName}</span>
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 space-y-4">
            <p className="text-gray-300">Your payment has not been confirmed yet</p>

            <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border-2 border-red-500 rounded-xl p-6 space-y-3">
              <h2 className="text-sm text-gray-400 uppercase tracking-wide">Payment Amount</h2>
              <div className="flex items-center justify-center">
                <span className="text-4xl font-bold text-yellow-500">₦4,800</span>
              </div>
            </div>

            <p className="text-sm text-gray-400">Please contact support if you have made the payment</p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full h-14 text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-300"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
