"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Play, Check } from "lucide-react"

export default function VSLPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Array<{ type: "received" | "sent"; text: string; hasVideo?: boolean }>>([])
  const [isTyping, setIsTyping] = useState(true)
  const [videoWatched, setVideoWatched] = useState(false)
  const [showContinue, setShowContinue] = useState(false)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    const sequence = [
      { delay: 1000, message: "Oye, vi que completaste el escaner..." },
      { delay: 2500, message: "Tengo algo que mostrarte." },
      { delay: 4000, message: "Es un video privado que explica exactamente como funciona el sistema de presencia." },
      { delay: 6000, message: "Dale play:", hasVideo: true },
    ]

    sequence.forEach(({ delay, message, hasVideo }) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "received", text: message, hasVideo }])
        if (hasVideo) {
          setIsTyping(false)
        }
      }, delay)
    })
  }, [])

  const handleWatchVideo = () => {
    setVideoWatched(true)
    setIsTyping(true)
    
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "received", text: "Viste todo el video?" }])
      setTimeout(() => {
        setIsTyping(false)
        setShowContinue(true)
      }, 1500)
    }, 2000)
  }

  const handleConfirmWatched = () => {
    setMessages((prev) => [...prev, { type: "sent", text: "Si, lo vi completo" }])
    setShowContinue(false)
    setIsTyping(true)

    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "received", text: "Perfecto! Ahora tienes acceso al area privada. Ahi encontraras todo lo que necesitas." }])
      setTimeout(() => {
        setIsTyping(false)
        setTimeout(() => {
          router.push("/acceso")
        }, 1500)
      }, 1500)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header WhatsApp */}
      <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center">
          <span className="text-sm font-bold text-primary-foreground">NI</span>
        </div>
        <div className="flex-1">
          <h2 className="text-white font-semibold text-sm">Nueva Identidad</h2>
          <p className="text-white/70 text-xs">
            {isTyping ? "escribiendo..." : "en linea"}
          </p>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-[#0b141a]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg text-sm ${
                msg.type === "sent"
                  ? "bg-[#005c4b] text-white rounded-tr-none px-3 py-2"
                  : "bg-[#202c33] text-white rounded-tl-none"
              } ${msg.hasVideo ? "p-2" : "px-3 py-2"}`}
            >
              {msg.text}
              
              {msg.hasVideo && !videoWatched && (
                <button
                  onClick={handleWatchVideo}
                  className="mt-3 w-full aspect-video bg-black/50 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-black/70 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </div>
                  <span className="text-xs text-gray-400">Video Privado - 4:32</span>
                </button>
              )}

              {msg.hasVideo && videoWatched && (
                <div className="mt-3 w-full aspect-video bg-black/50 rounded-lg flex flex-col items-center justify-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <span className="text-xs text-green-400">Video visto</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#202c33] px-4 py-2 rounded-lg rounded-tl-none">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {showContinue && (
          <div className="pt-4 animate-in fade-in slide-in-from-bottom-4">
            <button
              onClick={handleConfirmWatched}
              className="w-full py-4 bg-[#25d366] text-white rounded-lg font-semibold hover:bg-[#1da851] transition-colors"
            >
              Si, lo vi completo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
