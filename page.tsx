"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"
import { useSearchParams } from "next/navigation"

export default function ValentinePage() {
  const searchParams = useSearchParams()
  const name = searchParams.get("to") || "Valentine"

  const [noButtonStyle, setNoButtonStyle] = useState({
    position: "static",
    transform: "none",
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleYesClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
    setShowSuccess(true)
  }

  const moveButton = () => {
    const x = Math.random() * (window.innerWidth - 100)
    const y = Math.random() * (window.innerHeight - 40)
    setNoButtonStyle({
      position: "absolute",
      transform: `translate(${x}px, ${y}px)`,
      transition: "all 0.2s ease",
    })
  }

  const copyLink = () => {
    const link = `${window.location.origin}?to=${encodeURIComponent(name)}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kay-kRLIMoAxn75fv0LWgDTGfZPIb0liyW.jpeg"
            alt="Valentine's photo"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Heart className="w-8 h-8 text-red-500 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Will you be my Valentine, {name}? ❤️</h1>

          {showSuccess ? (
            <div className="py-4 text-lg text-pink-600 font-semibold animate-fade-in">
              Yay! Can&apos;t wait for our date! 🥰
            </div>
          ) : (
            <div className="flex justify-center gap-4 py-4">
              <Button onClick={handleYesClick} className="bg-pink-500 hover:bg-pink-600 text-white">
                Yes
              </Button>
              <Button onMouseEnter={moveButton} variant="destructive" style={noButtonStyle} className="absolute">
                No
              </Button>
            </div>
          )}
        </div>
      </div>

      <Button variant="outline" onClick={copyLink} className="mt-4 bg-white">
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-2" />
            Copy Share Link
          </>
        )}
      </Button>
    </div>
  )
}

