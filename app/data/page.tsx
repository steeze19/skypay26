"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export default function DataPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [network, setNetwork] = useState("")
  const [dataPlan, setDataPlan] = useState("")
  const [accessCode, setAccessCode] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("userData")

    if (!userData) {
      router.push("/register")
      return
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [router])

  const dataPlans = {
    mtn: [
      { label: "500MB - ₦200", value: "500mb-200" },
      { label: "1GB - ₦350", value: "1gb-350" },
      { label: "2GB - ₦700", value: "2gb-700" },
      { label: "5GB - ₦1,500", value: "5gb-1500" },
      { label: "10GB - ₦2,800", value: "10gb-2800" },
    ],
    glo: [
      { label: "1GB - ₦300", value: "1gb-300" },
      { label: "2GB - ₦600", value: "2gb-600" },
      { label: "5GB - ₦1,400", value: "5gb-1400" },
      { label: "10GB - ₦2,600", value: "10gb-2600" },
    ],
    airtel: [
      { label: "750MB - ₦250", value: "750mb-250" },
      { label: "1.5GB - ₦500", value: "1.5gb-500" },
      { label: "3GB - ₦1,000", value: "3gb-1000" },
      { label: "10GB - ₦2,700", value: "10gb-2700" },
    ],
    "9mobile": [
      { label: "1GB - ₦350", value: "1gb-350" },
      { label: "2.5GB - ₦800", value: "2.5gb-800" },
      { label: "5GB - ₦1,500", value: "5gb-1500" },
      { label: "10GB - ₦2,900", value: "10gb-2900" },
    ],
  }

  const handlePurchase = () => {
    if (accessCode === "200718" && phoneNumber && network && dataPlan) {
      setIsPurchasing(true)

      setTimeout(() => {
        setIsPurchasing(false)
        alert("Data purchase successful!")
        router.push("/dashboard")
      }, 1500)
    } else if (accessCode !== "200718") {
      alert("Invalid access code. Please enter the correct code.")
    } else {
      alert("Please fill in all fields")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-yellow-500 mx-auto" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
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
          <div>
            <h1 className="text-3xl font-bold">Buy Data</h1>
            <p className="text-gray-400 mt-2">Purchase data bundles at affordable rates</p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="08012345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-zinc-800 border-yellow-500/30 focus:border-yellow-500 text-white h-12 rounded-xl"
                disabled={isPurchasing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="network" className="text-gray-300">
                Select Network
              </Label>
              <Select value={network} onValueChange={setNetwork} disabled={isPurchasing}>
                <SelectTrigger className="bg-zinc-800 border-yellow-500/30 focus:border-yellow-500 text-white h-12 rounded-xl">
                  <SelectValue placeholder="Choose network" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-yellow-500/30 text-white">
                  <SelectItem value="mtn">MTN</SelectItem>
                  <SelectItem value="glo">Glo</SelectItem>
                  <SelectItem value="airtel">Airtel</SelectItem>
                  <SelectItem value="9mobile">9mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {network && (
              <div className="space-y-2">
                <Label htmlFor="plan" className="text-gray-300">
                  Select Data Plan
                </Label>
                <Select value={dataPlan} onValueChange={setDataPlan} disabled={isPurchasing}>
                  <SelectTrigger className="bg-zinc-800 border-yellow-500/30 focus:border-yellow-500 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Choose data plan" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-yellow-500/30 text-white">
                    {dataPlans[network as keyof typeof dataPlans]?.map((plan) => (
                      <SelectItem key={plan.value} value={plan.value}>
                        {plan.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="accessCode" className="text-gray-300">
                Access Code
              </Label>
              <Input
                id="accessCode"
                type="text"
                placeholder="Enter your access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="bg-zinc-800 border-yellow-500/30 focus:border-yellow-500 text-white h-12 rounded-xl"
                disabled={isPurchasing}
              />
              <p className="text-xs text-gray-500">
                Don't have an access code?{" "}
                <button onClick={() => router.push("/skycode")} className="text-yellow-500 hover:underline">
                  Purchase Sky Code
                </button>
              </p>
            </div>
          </div>

          <Button
            onClick={handlePurchase}
            disabled={isPurchasing}
            className="w-full h-14 text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-300 disabled:opacity-50"
          >
            {isPurchasing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Purchase Data"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
