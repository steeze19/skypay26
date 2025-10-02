"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export default function DashboardPage() {
  const router = useRouter()
  const [balance, setBalance] = useState(0)
  const [showBalance, setShowBalance] = useState(true)
  const [userName, setUserName] = useState("user")
  const [hasEarned, setHasEarned] = useState(false)
  const [userAvatar, setUserAvatar] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isEarning, setIsEarning] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("userData")

    if (!userData) {
      router.push("/register")
      return
    }

    const lastRefreshTime = localStorage.getItem("lastBalanceRefresh")
    const currentTime = Date.now()
    const twentyFourHours = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

    // Check if 24 hours have passed since last refresh
    if (lastRefreshTime) {
      const timeSinceRefresh = currentTime - Number.parseInt(lastRefreshTime)
      if (timeSinceRefresh >= twentyFourHours) {
        // Reset balance to ₦300,000
        localStorage.setItem("balance", "300000")
        localStorage.setItem("lastBalanceRefresh", currentTime.toString())
        localStorage.setItem("hasEarned", "true")
      }
    } else {
      // First time, set the refresh timestamp
      localStorage.setItem("lastBalanceRefresh", currentTime.toString())
    }

    // Load user data and balance from localStorage
    const savedBalance = localStorage.getItem("balance")
    const earnedStatus = localStorage.getItem("hasEarned")
    const savedAvatar = localStorage.getItem("userAvatar")

    if (userData) {
      const parsed = JSON.parse(userData)
      setUserName(parsed.name || "user")
    }

    if (savedBalance) {
      setBalance(Number.parseFloat(savedBalance))
    }

    if (earnedStatus === "true") {
      setHasEarned(true)
    }

    if (savedAvatar) {
      setUserAvatar(savedAvatar)
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }, [router])

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleStartEarning = () => {
    if (!hasEarned) {
      setIsEarning(true)

      // Play cash sound
      const audio = new Audio("/cash-sound.mp3")
      audio.play().catch((err) => console.log("Audio play failed:", err))

      setTimeout(() => {
        // Add ₦300,000 to balance
        const newBalance = 300000
        const currentTime = Date.now()
        setBalance(newBalance)
        setHasEarned(true)
        setIsEarning(false)

        // Save to localStorage
        localStorage.setItem("balance", newBalance.toString())
        localStorage.setItem("hasEarned", "true")
        localStorage.setItem("lastBalanceRefresh", currentTime.toString())
      }, 1500)
    }
  }

  const actionIcons = [
    { emoji: "📶", label: "Data", color: "bg-yellow-500/20", route: "/data" },
    { emoji: "📞", label: "Airtime", color: "bg-yellow-500/20", route: "/airtime" },
    { emoji: "🗯", label: "Support", color: "bg-yellow-500/20", route: "/support" },
    { emoji: "👥", label: "Community", color: "bg-yellow-500/20", route: "/community" },
    { emoji: "🛍", label: "Sky Code", color: "bg-yellow-500/20", route: "/skycode" },
    { emoji: "📺", label: "Watch", color: "bg-yellow-500/20", route: "/watch" },
    { emoji: "📡", label: "Investment", color: "bg-yellow-500/20", route: "/investment" },
    { emoji: "📤", label: "Referring", color: "bg-yellow-500/20", route: "/referring" },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-yellow-500 mx-auto" />
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Header with Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => router.push("/profile")} className="group">
              <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-yellow-500 transition-transform group-hover:scale-105">
                {userAvatar ? (
                  <AvatarImage src={userAvatar || "/placeholder.svg"} />
                ) : (
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                )}
                <AvatarFallback className="bg-yellow-500 text-black font-bold">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </button>
            <span className="text-lg sm:text-xl font-medium">{userName}</span>
          </div>
          <Image
            src="/skypay-logo.png"
            alt="SkyPay"
            width={80}
            height={32}
            className="object-contain sm:w-[100px] sm:h-[40px]"
          />
        </div>

        {/* Balance Display */}
        <div className="text-center space-y-2 sm:space-y-3 py-4 sm:py-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {showBalance ? (
              <h1 className="text-3xl sm:text-5xl font-bold">{formatBalance(balance)}</h1>
            ) : (
              <h1 className="text-3xl sm:text-5xl font-bold">₦********</h1>
            )}
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 hover:bg-yellow-500/10 rounded-full transition-colors"
            >
              {showBalance ? (
                <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
              ) : (
                <EyeOff className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Button
            size="lg"
            onClick={handleStartEarning}
            disabled={hasEarned || isEarning}
            className="h-12 sm:h-14 text-base sm:text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEarning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                Earning...
              </>
            ) : hasEarned ? (
              "Already Earned"
            ) : (
              "Start Earning"
            )}
          </Button>
          <Button
            size="lg"
            onClick={() => router.push("/withdraw")}
            className="h-12 sm:h-14 text-base sm:text-lg font-semibold bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl transition-all duration-300"
          >
            Withdraw
          </Button>
        </div>

        {/* Info Card */}
        <div className="bg-zinc-900 rounded-3xl p-4 sm:p-6 space-y-4 sm:space-y-6">
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {hasEarned
              ? "Explore our services below to manage your account."
              : "Click on the start earning button to start receiving your daily bonus."}
          </p>

          {/* Action Icons Grid */}
          <div className="bg-white rounded-3xl p-4 sm:p-6">
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {actionIcons.map((item, index) => (
                <button
                  key={index}
                  onClick={() => router.push(item.route)}
                  className="flex flex-col items-center gap-1 sm:gap-2 group"
                >
                  <div
                    className={`${item.color} p-2 sm:p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-yellow-500/20`}
                  >
                    <span className="text-xl sm:text-2xl">{item.emoji}</span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-600 font-medium text-center leading-tight">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 pt-3 sm:pt-4 bg-black rounded-b-3xl py-4 sm:py-6">
            <div className="w-full h-16 sm:h-20 relative px-4">
              <Image src="/skypay-logo.png" alt="SkyPay Logo" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
