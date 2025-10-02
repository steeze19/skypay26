"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Camera, User, Mail, Phone, Save, Loader2, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function ProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [userAvatar, setUserAvatar] = useState("")

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData")

    if (!savedUserData) {
      router.push("/register")
      return
    }

    const savedAvatar = localStorage.getItem("userAvatar")

    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData)
      setUserData({
        name: parsedData.name || "",
        email: parsedData.email || "",
        phone: parsedData.phone || "",
      })
    }

    if (savedAvatar) {
      setUserAvatar(savedAvatar)
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [router])

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setUserAvatar(result)
        localStorage.setItem("userAvatar", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setIsSaving(true)

    setTimeout(() => {
      localStorage.setItem("userData", JSON.stringify(userData))
      setIsSaving(false)
      alert("Profile updated successfully!")
      router.back()
    }, 1000)
  }

  const handleLogout = () => {
    const confirmLogout = confirm("Are you sure you want to logout?")
    if (confirmLogout) {
      // Clear all user data from localStorage
      localStorage.removeItem("userData")
      localStorage.removeItem("balance")
      localStorage.removeItem("hasEarned")
      localStorage.removeItem("userAvatar")
      localStorage.removeItem("lastBalanceRefresh")

      // Redirect to welcome page
      router.push("/")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-yellow-500 mx-auto" />
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <Image src="/skypay-logo.png" alt="SkyPay" width={100} height={40} className="object-contain" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-gray-400">Update your personal information</p>
        </div>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
            <Avatar className="h-32 w-32 border-4 border-yellow-500">
              {userAvatar ? (
                <AvatarImage src={userAvatar || "/placeholder.svg"} />
              ) : (
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
              )}
              <AvatarFallback className="bg-yellow-500 text-black font-bold text-3xl">
                {userData.name.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          <p className="text-sm text-gray-400">Click to upload photo</p>
        </div>

        {/* Profile Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name
            </label>
            <Input
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className="bg-zinc-900 border-yellow-500/30 focus:border-yellow-500 rounded-xl h-12 text-white"
              placeholder="Enter your name"
              disabled={isSaving}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </label>
            <Input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="bg-zinc-900 border-yellow-500/30 focus:border-yellow-500 rounded-xl h-12 text-white"
              placeholder="Enter your email"
              disabled={isSaving}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </label>
            <Input
              type="tel"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              className="bg-zinc-900 border-yellow-500/30 focus:border-yellow-500 rounded-xl h-12 text-white"
              placeholder="Enter your phone number"
              disabled={isSaving}
            />
          </div>
        </div>

        <Button
          onClick={handleSave}
          size="lg"
          disabled={isSaving}
          className="w-full h-14 text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/30 mt-8 disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </>
          )}
        </Button>

        <Button
          onClick={handleLogout}
          size="lg"
          variant="outline"
          className="w-full h-14 text-lg font-semibold bg-transparent border-2 border-red-500 hover:bg-red-500/10 text-red-500 rounded-2xl transition-all duration-300"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}
