"use client"

import { useState, useEffect } from "react"
import { Check, ChevronLeft, Phone, MoreVertical } from "lucide-react"
import { Card } from "@/components/ui/card"

interface QuizProps {
  onContinue: (result: string) => void
}

const messages = [
  "Acabo de revisar tu escaner.",
  "Hay algo interesante...",
  "Tu potencial proyecta mas de lo que tu imagen comunica.",
  "Por eso necesito hacerte unas preguntas rapidas.",
  "No toman mas de 60 segundos.",
  "Quiero descubrir cual es tu identidad dominante.",
  "Te reconoces mas como alguien que lidera...",
  "...o alguien que inspira?",
]

const quizOptions = [
  { id: "lider", label: "Lider" },
  { id: "visionario", label: "Visionario" },
  { id: "elegante", label: "Elegante" },
  { id: "ambicioso", label: "Ambicioso" },
  { id: "disciplinado", label: "Disciplinado" },
  { id: "influyente", label: "Influyente" },
]

const results: Record<string, { title: string; description: string }> = {
  lider: {
    title: "LIDER",
    description: "Tu presencia transmite direccion. Las personas buscan senales de seguridad antes de seguir a alguien. Tu imagen debe respaldar esa autoridad."
  },
  visionario: {
    title: "VISIONARIO",
    description: "Ves oportunidades antes que otros. Ahora necesitas una imagen que comunique vision."
  },
  elegante: {
    title: "ELEGANTE",
    description: "Valoras los detalles. La sofisticacion silenciosa es parte de tu identidad."
  },
  ambicioso: {
    title: "AMBICIOSO",
    description: "No te conformas. Tu imagen deberia reflejar esa evolucion."
  },
  disciplinado: {
    title: "DISCIPLINADO",
    description: "Tu constancia merece ser percibida."
  },
  influyente: {
    title: "INFLUYENTE",
    description: "La influencia comienza mucho antes de hablar."
  }
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2">
      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  )
}

function ChatBubble({ message, isTyping }: { message: string; isTyping?: boolean }) {
  return (
    <div className="flex justify-start">
      <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%]">
        {isTyping ? <TypingIndicator /> : <p className="text-sm">{message}</p>}
      </div>
    </div>
  )
}

export default function IdentityQuiz({ onContinue }: QuizProps) {
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (visibleMessages < messages.length) {
      setIsTyping(true)
      const typingTimer = setTimeout(() => {
        setIsTyping(false)
        setVisibleMessages(v => v + 1)
      }, 1500)
      return () => clearTimeout(typingTimer)
    } else {
      setTimeout(() => setShowQuiz(true), 500)
    }
  }, [visibleMessages])

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId)
    setTimeout(() => setShowResult(true), 800)
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

        {showQuiz && !showResult && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-6">
            <p className="text-xs text-muted-foreground text-center mb-4">Selecciona tu identidad dominante</p>
            <div className="grid grid-cols-2 gap-3">
              {quizOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`px-4 py-3 rounded-xl border transition-all ${
                    selectedOption === option.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {showResult && selectedOption && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-6">
            <Card className="bg-card border-primary/50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-primary font-bold tracking-wider">
                  {results[selectedOption].title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {results[selectedOption].description}
              </p>
            </Card>

            <button
              onClick={() => onContinue(selectedOption)}
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
