"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
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

        <div className="bg-yellow-500/10 rounded-full w-32 h-32 mx-auto flex items-center justify-center">
          <CheckCircle className="h-20 w-20 text-yellow-500" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Payment Confirmed!</h1>
          <p className="text-xl text-gray-300">Transfer successfully credited into your account</p>
          <p className="text-2xl font-semibold text-yellow-500">{userName}</p>
        </div>

        <Button
          onClick={() => router.push("/dashboard")}
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/30 mt-8"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}
