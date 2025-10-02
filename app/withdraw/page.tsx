"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export default function WithdrawPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [balance, setBalance] = useState(300000)
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
    amount: "",
  })

  useEffect(() => {
    const userData = localStorage.getItem("userData")

    if (!userData) {
      router.push("/register")
      return
    }

    const savedBalance = localStorage.getItem("balance")

    if (savedBalance) {
      setBalance(Number.parseFloat(savedBalance))
    }

    if (userData) {
      const parsed = JSON.parse(userData)
      setFormData((prev) => ({
        ...prev,
        accountNumber: parsed.accountNumber || "",
        accountName: parsed.accountName || "",
        bankName: parsed.bankName || "",
      }))
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [router])

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const handleWithdraw = () => {
    const withdrawAmount = Number.parseFloat(formData.amount)

    if (!withdrawAmount || withdrawAmount <= 0) {
      alert("Please enter a valid amount")
      return
    }

    if (withdrawAmount > balance) {
      alert("Insufficient balance")
      return
    }

    if (!formData.accountNumber || !formData.accountName || !formData.bankName) {
      alert("Please fill in all bank details")
      return
    }

    setIsProcessing(true)

    setTimeout(() => {
      // Store withdrawal details
      const withdrawalData = {
        amount: withdrawAmount,
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
        bankName: formData.bankName,
        date: new Date().toISOString(),
      }

      localStorage.setItem("pendingWithdrawal", JSON.stringify(withdrawalData))
      setIsProcessing(false)

      // Navigate to pending page
      router.push("/pending")
    }, 1500)
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
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <Image src="/skypay-logo.png" alt="SkyPay" width={100} height={40} className="object-contain" />
        </div>

        <h1 className="text-3xl font-bold">Withdraw to your Bank</h1>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Account Number"
            value={formData.accountNumber}
            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
            className="h-14 bg-transparent border-2 border-yellow-500 rounded-2xl text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/20"
            disabled={isProcessing}
          />

          <Input
            type="text"
            placeholder="Account name"
            value={formData.accountName}
            onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
            className="h-14 bg-transparent border-2 border-yellow-500 rounded-2xl text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/20"
            disabled={isProcessing}
          />

          <Select
            value={formData.bankName}
            onValueChange={(value) => setFormData({ ...formData, bankName: value })}
            disabled={isProcessing}
          >
            <SelectTrigger className="h-14 bg-transparent border-2 border-yellow-500 rounded-2xl text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/20">
              <SelectValue placeholder="Access Bank" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-yellow-500/50">
              <SelectItem value="access">Access Bank</SelectItem>
              <SelectItem value="gtb">GTBank</SelectItem>
              <SelectItem value="firstbank">First Bank</SelectItem>
              <SelectItem value="uba">UBA</SelectItem>
              <SelectItem value="zenith">Zenith Bank</SelectItem>
              <SelectItem value="palmpay">PalmPay</SelectItem>
              <SelectItem value="opay">OPay</SelectItem>
              <SelectItem value="kuda">Kuda Bank</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="h-14 bg-transparent border-2 border-yellow-500 rounded-2xl text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/20"
            disabled={isProcessing}
          />

          <p className="text-yellow-500 text-lg font-semibold">Available balance: {formatBalance(balance)}</p>
        </div>

        <Button
          onClick={handleWithdraw}
          size="lg"
          disabled={isProcessing}
          className="w-full h-14 text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/30 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Withdraw"
          )}
        </Button>
      </div>
    </div>
  )
}
