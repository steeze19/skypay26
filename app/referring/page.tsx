"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Share2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ReferringPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState("user")
  const [referralCode, setReferralCode] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("userData")
    if (!userData) {
      router.push("/register")
      return
    }

    const parsed = JSON.parse(userData)
    setUserName(parsed.name || "user")

    // Generate referral code based on username
    const code = `SKY${parsed.name.substring(0, 3).toUpperCase()}${Math.floor(Math.random() * 9999)}`
    setReferralCode(code)

    setTimeout(() => {
      setIsLoading(false)
    }, 600)
  }, [router])

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    const shareText = `Join SkyPay and start earning! Use my referral code: ${referralCode}`
    if (navigator.share) {
      navigator.share({
        title: "Join SkyPay",
        text: shareText,
      })
    } else {
      handleCopyCode()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-yellow-500 mx-auto" />
          <p className="text-gray-400">Loading referral details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold">Refer & Earn</h1>
        </div>

        {/* Referral Card */}
        <div className="bg-zinc-900 rounded-3xl p-6 space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-yellow-500/20 p-6 rounded-full">
                <Share2 className="h-12 w-12 text-yellow-500" />
              </div>
            </div>
            <h2 className="text-xl font-bold">Invite Friends & Earn</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Share your referral code with friends and earn rewards when they join SkyPay!
            </p>
          </div>

          {/* Referral Code */}
          <div className="bg-black rounded-2xl p-6 space-y-4">
            <p className="text-sm text-gray-400 text-center">Your Referral Code</p>
            <div className="flex items-center justify-center gap-3">
              <p className="text-3xl font-bold text-yellow-500 tracking-wider">{referralCode}</p>
              <button onClick={handleCopyCode} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          {/* Share Button */}
          <Button
            onClick={handleShare}
            className="w-full h-12 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-2xl"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share Referral Code
          </Button>

          {/* Benefits */}
          <div className="space-y-3 pt-4 border-t border-zinc-800">
            <h3 className="font-semibold">Referral Benefits:</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5">•</span>
                <span>Earn ₦1,000 for each friend who joins</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5">•</span>
                <span>Your friend gets ₦500 bonus on signup</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5">•</span>
                <span>Unlimited referrals, unlimited earnings</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
