"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    accountName: "",
    accountNumber: "",
    bankName: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email) {
      alert("Please fill in your name and email")
      return
    }

    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(formData))
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-8">
      <div className="max-w-md mx-auto space-y-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Personal Information</h1>

          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-14 bg-transparent border-2 border-yellow-500 rounded-2xl text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/20"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-14 bg-transparent border-2 border-yellow-500 rounded-2xl text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/20"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Bank Details</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Account Name"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                className="h-14 bg-transparent border-2 border-yellow-500 rounded-2xl text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/20"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                className="h-14 bg-transparent border-2 border-yellow-500 rounded-2xl text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/20"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Select
                value={formData.bankName}
                onValueChange={(value) => setFormData({ ...formData, bankName: value })}
                disabled={isLoading}
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
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          size="lg"
          disabled={isLoading}
          className="w-full h-14 text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Registering...
            </>
          ) : (
            <>
              continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
