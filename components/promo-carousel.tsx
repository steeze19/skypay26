"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const promoImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20251002-WA0041-qvoD5tDCeRNxC9oG4fYdTHwVPCc2aH.jpg",
    alt: "Earn More Easier - Skyrocket your earnings",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20251002-152748-EjKXwR7tUa0zMV1HO1QRgQPpKuq74m.jpg",
    alt: "Would you rather have - Start earning big",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20251002-WA0042-hz8K7AweqwTqeaVaequ382iO5e4MeG.jpg",
    alt: "Earn More Easier - Sky high earnings",
  },
]

export function PromoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promoImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-black shadow-lg">
      {promoImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-contain"
            priority={index === 0}
          />
        </div>
      ))}

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
        {promoImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-6 bg-yellow-500" : "w-1.5 bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
