"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Phone, MoreVertical, Copy, Check } from "lucide-react"
import { Card } from "@/components/ui/card"

interface WhatsappPostVSLProps {
  onContinue: () => void
}

const messages = [
  "Terminaste el acceso principal.",
  "Perfecto.",
  "Ahora entiendes algo que la mayoria ignora.",
  "La imagen no es superficialidad.",
  "Es comunicacion silenciosa.",
  "Por eso te habilitamos acceso a nuestro archivo privado.",
  "La contrasena es:",
]

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2">
      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  )
}

function ChatBubble({ message, isTyping, isHighlight }: { message: string; isTyping?: boolean; isHighlight?: boolean }) {
  return (
    <div className="flex justify-start">
      <div className={`rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%] ${
        isHighlight 
          ? "bg-primary/20 border-2 border-primary" 
          : "bg-card border border-border"
      }`}>
        {isTyping ? <TypingIndicator /> : (
          <p className={`text-sm ${isHighlight ? "font-bold text-primary" : ""}`}>{message}</p>
        )}
      </div>
    </div>
  )
}

export default function WhatsappPostVSL({ onContinue }: WhatsappPostVSLProps) {
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (visibleMessages < messages.length) {
      setIsTyping(true)
      const typingTimer = setTimeout(() => {
        setIsTyping(false)
        setVisibleMessages(v => v + 1)
      }, 1500)
      return () => clearTimeout(typingTimer)
    } else {
      setTimeout(() => setShowPassword(true), 500)
    }
  }, [visibleMessages])

  const handleCopy = () => {
    navigator.clipboard.writeText("PRESENCIA")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
        <ChevronLeft className="w-6 h-6 text-white" />
        <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
          <span className="text-primary font-bold">AI</span>
        </div>
        <div className="flex-1">
          <p className="text-white font-medium text-sm">Asesor de Identidad</p>
          <p className="text-white/70 text-xs">En linea</p>
        </div>
        <Phone className="w-5 h-5 text-white" />
        <MoreVertical className="w-5 h-5 text-white" />
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: "linear-gradient(180deg, #0b141a 0%, #111b21 100%)" }}>
        {messages.slice(0, visibleMessages).map((msg, i) => (
          <ChatBubble key={i} message={msg} />
        ))}
        
        {isTyping && visibleMessages < messages.length && (
          <ChatBubble message="" isTyping />
        )}

        {showPassword && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            <Card className="bg-primary/10 border-2 border-primary p-6">
              <p className="text-xs text-muted-foreground mb-2 text-center">CONTRASENA DE ACCESO</p>
              <div className="flex items-center justify-center gap-3">
                <p className="text-2xl font-bold text-primary tracking-[0.3em]">PRESENCIA</p>
                <button 
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4 text-primary" />
                  )}
                </button>
              </div>
            </Card>

            <ChatBubble message="Guardala." />
            <ChatBubble message="La necesitaras en la siguiente fase." />

            <button
              onClick={onContinue}
              className="w-full mt-6 bg-[#25D366] text-white py-4 rounded-xl font-medium hover:bg-[#25D366]/90 transition-colors"
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
