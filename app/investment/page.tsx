"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InvestmentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("userData")
    if (!userData) {
      router.push("/register")
      return
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 600)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-yellow-500 mx-auto" />
          <p className="text-gray-400">Loading investment options...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold">Investment</h1>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-zinc-900 rounded-3xl p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-yellow-500/20 p-6 rounded-full">
              <TrendingUp className="h-16 w-16 text-yellow-500" />
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Coming Soon</h2>
            <p className="text-gray-400 leading-relaxed">
              Investment opportunities will be available soon. Grow your wealth with SkyPay's secure investment
              platform.
            </p>
          </div>
          <Button
            onClick={() => router.push("/dashboard")}
            className="w-full h-12 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-2xl"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
