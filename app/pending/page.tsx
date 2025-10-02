"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PendingPage() {
  const router = useRouter()
  const [withdrawalAmount, setWithdrawalAmount] = useState(0)

  useEffect(() => {
    const pendingWithdrawal = localStorage.getItem("pendingWithdrawal")
    if (pendingWithdrawal) {
      const data = JSON.parse(pendingWithdrawal)
      setWithdrawalAmount(data.amount)
    }
  }, [])

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="p-6 bg-zinc-800 rounded-full">
            <Clock className="h-20 w-20 text-gray-400" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Pending Withdrawal</h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            You are about to withdraw the sum of {formatAmount(withdrawalAmount)} to your Bank Account please proceed to
            activate and continue
          </p>
        </div>

        <Button
          onClick={() => router.push("/activate")}
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/30"
        >
          Proceed to activate
        </Button>
      </div>
    </div>
  )
}
