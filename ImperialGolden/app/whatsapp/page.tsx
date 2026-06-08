"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Phone, Video, MoreVertical, ArrowLeft, Plus, Mic } from "lucide-react"

export default function WhatsAppMenuPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Array<{ type: "received" | "sent"; text: string }>>([])
  const [isTyping, setIsTyping] = useState(true)
  const [showContinue, setShowContinue] = useState(false)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    const sequence = [
      { delay: 1200, message: "Hola, Bienvenido a Imperial Golden Store." },
      { delay: 2800, message: "Soy tu Asesor de Identidad personal." },
      {
        delay: 4600,
        message:
          "Estoy aqui para ayudarte a proyectar presencia, elegancia y autoridad con la joya correcta.",
      },
      {
        delay: 6800,
        message:
          "La contraseña es Imperialgolden",
      },
      {
        delay: 9200,
        message: "Para continuar, necesito verificar tu acceso. Toca el boton de abajo.",
      },
    ]

    sequence.forEach(({ delay, message }) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "received", text: message }])
      }, delay)
    })

    setTimeout(() => {
      setIsTyping(false)
      setShowContinue(true)
    }, 10000)
  }, [])

  return (
    <div className="min-h-screen bg-[#0b141a] flex flex-col max-w-md mx-auto">
      {/* Header WhatsApp */}
      <div className="bg-[#075e54] px-3 py-2 flex items-center gap-3 sticky top-0 z-10">
        <button aria-label="Volver" onClick={() => router.push("/")} className="text-white/90">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 rounded-full bg-black overflow-hidden shrink-0 ring-1 ring-primary/40">
          <img
            src="/igs-logo.png"
            alt="Imperial Golden Store"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-semibold text-sm truncate">Imperial Golden Store</h2>
          <p className="text-white/70 text-xs">{isTyping ? "escribiendo..." : "en linea"}</p>
        </div>
        <div className="flex items-center gap-4 text-white/90">
          <Video className="w-5 h-5" />
          <Phone className="w-5 h-5" />
          <MoreVertical className="w-5 h-5" />
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
        {/* Date pill */}
        <div className="flex justify-center pb-2">
          <span className="bg-[#1d2a32] text-gray-300 text-[11px] px-3 py-1 rounded-md">HOY</span>
        </div>

        {/* Encrypted notice */}
        <div className="flex justify-center pb-2">
          <span className="bg-[#182229] text-amber-200/70 text-[11px] px-3 py-1.5 rounded-md text-center max-w-[85%] leading-relaxed">
            Los mensajes estan cifrados de extremo a extremo. Solo tu y Imperial Golden Store pueden leerlos.
          </span>
        </div>

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                msg.type === "sent"
                  ? "bg-[#005c4b] text-white rounded-tr-none"
                  : "bg-[#202c33] text-white rounded-tl-none"
              }`}
            >
              {msg.text}
              <span className="block text-[10px] text-white/50 text-right mt-1">
                {msg.type === "sent" ? "Leido" : "12:0" + (index + 1)}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#202c33] px-4 py-3 rounded-lg rounded-tl-none">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* Continue CTA */}
        {showContinue && (
          <div className="pt-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <button
              onClick={() => router.push("/acceso")}
              className="w-full py-4 bg-[#25d366] text-white rounded-lg font-semibold hover:bg-[#1da851] transition-colors"
            >
              Continuar
            </button>
          </div>
        )}
        </div>
      </div>

      {/* Input bar (decorative) */}
      <div className="bg-[#0b141a] px-2 py-2 flex items-center gap-2">
        <div className="flex-1 bg-[#202c33] rounded-full px-4 py-2.5 flex items-center gap-2">
          <Plus className="w-5 h-5 text-gray-400 shrink-0" />
          <span className="text-gray-500 text-sm flex-1">Escribe un mensaje...</span>
        </div>
        <button
          aria-label="Mensaje de voz"
          className="w-11 h-11 rounded-full bg-[#25d366] flex items-center justify-center shrink-0"
        >
          <Mic className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )
}
