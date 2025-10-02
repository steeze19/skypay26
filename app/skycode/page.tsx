"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function SkyCodePage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("userData")
    if (userData) {
      const parsed = JSON.parse(userData)
      setUserName(parsed.name || "")
      setUserEmail(parsed.email || "")
    }
  }, [])

  const handleContinue = () => {
    router.push("/skycode/payment")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <Image src="/skypay-logo.png" alt="SkyPay" width={100} height={40} className="object-contain" />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Purchase Sky Code</h1>
          <p className="text-gray-400">Get your access code to purchase airtime and data online</p>

          <div className="bg-zinc-900 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-yellow-500">Your Details</h2>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Name</label>
              <div className="bg-zinc-800 rounded-xl p-4 text-white">{userName || "Not available"}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Email</label>
              <div className="bg-zinc-800 rounded-xl p-4 text-white">{userEmail || "Not available"}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Amount to Pay</label>
              <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-xl p-4">
                <span className="text-2xl font-bold text-yellow-500">₦4,800</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 space-y-3">
            <h3 className="font-semibold text-yellow-500">What you'll get:</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">✓</span>
                <span>Access code to purchase airtime and data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">✓</span>
                <span>Instant activation after payment confirmation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">✓</span>
                <span>24/7 customer support</span>
              </li>
            </ul>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full h-14 text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-300"
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  )
}
