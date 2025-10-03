"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function PaymentConfirmedPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("user")

  useEffect(() => {
    const userData = localStorage.getItem("userData")
    if (userData) {
      const parsed = JSON.parse(userData)
      setUserName(parsed.name || "user")
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        <Image src="/skypay-logo.png" alt="SkyPay" width={150} height={60} className="mx-auto object-contain" />

        <div className="bg-red-500/10 rounded-full w-32 h-32 mx-auto flex items-center justify-center">
          <XCircle className="h-20 w-20 text-red-500" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-red-500">Payment Not Confirmed</h1>
          <p className="text-xl text-gray-300">Your payment has not been confirmed yet</p>
          <p className="text-2xl font-semibold text-yellow-500">{userName}</p>

          <div className="bg-zinc-900 rounded-2xl p-6 mt-6">
            <p className="text-sm text-gray-400 mb-2">Payment Amount</p>
            <p className="text-4xl font-bold text-yellow-500">₦8,450</p>
          </div>

          <p className="text-sm text-gray-400 mt-4">Please contact support if you have made the payment</p>
        </div>

        <Button
          onClick={() => router.push("/dashboard")}
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/30 mt-8"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
