"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function SkyCodePaymentPage() {
  const router = useRouter()
  const [receipt, setReceipt] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploading(true)
      const reader = new FileReader()
      reader.onloadend = () => {
        setReceipt(reader.result as string)
        setUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePaymentConfirm = () => {
    if (receipt) {
      localStorage.setItem("skyCodeReceipt", receipt)
      localStorage.setItem("skyCodePurchased", "true")
      router.push("/skycode/confirmed")
    }
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
          <h1 className="text-3xl font-bold">Payment Details</h1>
          <p className="text-gray-400">Make payment to the account below</p>

          <div className="bg-zinc-900 rounded-2xl p-6 space-y-4 border-2 border-yellow-500/20">
            <h2 className="text-xl font-semibold text-yellow-500">Transfer to:</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-zinc-800 rounded-xl">
                <span className="text-gray-400">Amount</span>
                <span className="text-2xl font-bold text-yellow-500">₦4,800</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-zinc-800 rounded-xl">
                <span className="text-gray-400">Account Number</span>
                <span className="text-xl font-bold">9136574323</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-zinc-800 rounded-xl">
                <span className="text-gray-400">Bank Name</span>
                <span className="font-semibold">Momo PSB</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-zinc-800 rounded-xl">
                <span className="text-gray-400">Account Name</span>
                <span className="font-semibold">Isamaila Ayo</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-yellow-500">Upload Payment Receipt</h3>

            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-yellow-500/30 rounded-xl cursor-pointer hover:border-yellow-500/50 transition-colors bg-zinc-800/50">
              <div className="flex flex-col items-center justify-center gap-2">
                {receipt ? (
                  <>
                    <Check className="h-12 w-12 text-yellow-500" />
                    <span className="text-sm text-yellow-500 font-medium">Receipt uploaded</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400" />
                    <span className="text-sm text-gray-400">Click to upload receipt</span>
                  </>
                )}
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>

            {receipt && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden">
                <Image src={receipt || "/placeholder.svg"} alt="Payment receipt" fill className="object-cover" />
              </div>
            )}
          </div>

          <Button
            onClick={handlePaymentConfirm}
            disabled={!receipt}
            className="w-full h-14 text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            I Have Made My Payment
          </Button>
        </div>
      </div>
    </div>
  )
}
