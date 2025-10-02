"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function SkyCodeConfirmedPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [copied, setCopied] = useState(false)
  const accessCode = "200718"

  useEffect(() => {
    const userData = localStorage.getItem("userData")
    if (userData) {
      const parsed = JSON.parse(userData)
      setUserName(parsed.name || "User")
    }
  }, [])

  const handleCopyCode = () => {
    navigator.clipboard.writeText(accessCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-6 space-y-6">
        <div className="flex items-center justify-center">
          <Image src="/skypay-logo.png" alt="SkyPay" width={120} height={48} className="object-contain" />
        </div>

        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 rounded-full animate-ping" />
              <CheckCircle className="h-24 w-24 text-yellow-500 relative" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Payment Confirmed!</h1>
            <p className="text-xl text-gray-300">
              Welcome, <span className="text-yellow-500 font-semibold">{userName}</span>
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 space-y-4">
            <p className="text-gray-300">Transfer successfully credited into your account</p>

            <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-2 border-yellow-500 rounded-xl p-6 space-y-3">
              <h2 className="text-sm text-gray-400 uppercase tracking-wide">Your Access Code</h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl font-bold text-yellow-500 tracking-wider">{accessCode}</span>
                <button onClick={handleCopyCode} className="p-2 hover:bg-yellow-500/10 rounded-lg transition-colors">
                  <Copy className={`h-6 w-6 ${copied ? "text-green-500" : "text-yellow-500"}`} />
                </button>
              </div>
              {copied && <p className="text-sm text-green-500">Copied to clipboard!</p>}
            </div>

            <p className="text-sm text-gray-400">Use this code to purchase airtime and data online</p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => router.push("/data")}
              className="w-full h-14 text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-300"
            >
              Buy Data Now
            </Button>
            <Button
              onClick={() => router.push("/airtime")}
              className="w-full h-14 text-lg font-semibold bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl transition-all duration-300"
            >
              Buy Airtime
            </Button>
            <Button
              onClick={() => router.push("/dashboard")}
              variant="ghost"
              className="w-full text-gray-400 hover:text-white"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
