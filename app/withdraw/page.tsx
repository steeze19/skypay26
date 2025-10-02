"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WithdrawPage() {
  const router = useRouter()
  const [balance, setBalance] = useState(300000)
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
    amount: "",
  })

  useEffect(() => {
    const savedBalance = localStorage.getItem("balance")
    const userData = localStorage.getItem("userData")

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
  }, [])

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

    // Store withdrawal details
    const withdrawalData = {
      amount: withdrawAmount,
      accountNumber: formData.accountNumber,
      accountName: formData.accountName,
      bankName: formData.bankName,
      date: new Date().toISOString(),
    }

    localStorage.setItem("pendingWithdrawal", JSON.stringify(withdrawalData))

    // Navigate to pending page
    router.push("/pending")
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Withdraw to your Bank</h1>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Account Number"
            value={formData.accountNumber}
            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
            className="h-14 bg-transparent border-2 border-yellow-500 rounded-2xl text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/20"
          />

          <Input
            type="text"
            placeholder="Account name"
            value={formData.accountName}
            onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
            className="h-14 bg-transparent border-2 border-yellow-500 rounded-2xl text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/20"
          />

          <Select value={formData.bankName} onValueChange={(value) => setFormData({ ...formData, bankName: value })}>
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
          />

          <p className="text-yellow-500 text-lg font-semibold">Available balance: {formatBalance(balance)}</p>
        </div>

        <Button
          onClick={handleWithdraw}
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/30"
        >
          Withdraw
        </Button>
      </div>
    </div>
  )
}
