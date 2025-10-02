import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between p-6 pb-8">
      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="w-32 h-32 relative mb-4">
          <Image src="/skypay-logo.png" alt="SkyPay Logo" fill className="object-contain" priority />
        </div>

        <div className="relative w-full aspect-square max-w-sm rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-500/20 via-yellow-600/10 to-transparent p-8 flex items-center justify-center border border-yellow-500/20">
          <div className="text-center space-y-6">
            <div className="text-6xl font-bold text-yellow-500">SkyPay</div>
            <div className="space-y-4 text-white">
              <div className="text-2xl font-semibold">Would you rather have?</div>
              <div className="flex justify-around items-center gap-4">
                <div className="bg-yellow-500 text-black px-6 py-4 rounded-2xl font-bold">
                  <div className="text-sm">₦10K</div>
                  <div className="text-xs">Right Now</div>
                </div>
                <div className="text-3xl text-yellow-500">?</div>
                <div className="bg-yellow-500 text-black px-6 py-4 rounded-2xl font-bold">
                  <div className="text-sm">₦120K</div>
                  <div className="text-xs">after 10 months</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight text-balance">
            It is time to start earning big
          </h1>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed text-pretty">
            Welcome to the best earning site SkyPay. We are trusted and fast in crediting. We are here to help and
            support the interested once.
          </p>
        </div>
      </div>

      <Link href="/register" className="w-full max-w-md">
        <Button
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/30 hover:scale-[1.02]"
        >
          Start
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  )
}
