"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export default function AirtimePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [network, setNetwork] = useState("")
  const [amount, setAmount] = useState("")
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

  const airtimeAmounts = [
    { label: "₦100", value: "100" },
    { label: "₦200", value: "200" },
    { label: "₦500", value: "500" },
    { label: "₦1,000", value: "1000" },
    { label: "₦2,000", value: "2000" },
    { label: "₦5,000", value: "5000" },
    { label: "Custom", value: "custom" },
  ]

  const handlePurchase = () => {
    if (accessCode === "200718" && phoneNumber && network && amount) {
      setIsPurchasing(true)

      setTimeout(() => {
        setIsPurchasing(false)
        alert(`Airtime purchase of ₦${amount} successful!`)
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
            <h1 className="text-3xl font-bold">Buy Airtime</h1>
            <p className="text-gray-400 mt-2">Recharge your phone instantly</p>
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

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-gray-300">
                Select Amount
              </Label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {airtimeAmounts.slice(0, 6).map((amt) => (
                  <button
                    key={amt.value}
                    onClick={() => setAmount(amt.value)}
                    disabled={isPurchasing}
                    className={`p-3 rounded-xl font-semibold transition-all disabled:opacity-50 ${
                      amount === amt.value ? "bg-yellow-500 text-black" : "bg-zinc-800 text-white hover:bg-zinc-700"
                    }`}
                  >
                    {amt.label}
                  </button>
                ))}
              </div>
              <Input
                id="amount"
                type="number"
                placeholder="Enter custom amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-zinc-800 border-yellow-500/30 focus:border-yellow-500 text-white h-12 rounded-xl"
                disabled={isPurchasing}
              />
            </div>

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
              "Purchase Airtime"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
