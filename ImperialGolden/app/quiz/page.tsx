"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

const questions = [
  {
    id: 1,
    question: "Cuando entras a un lugar, como quieres que te perciban?",
    options: [
      { id: "lider", label: "Lider", description: "Alguien que toma el control y dirige" },
      { id: "visionario", label: "Visionario", description: "Alguien con ideas innovadoras" },
      { id: "elegante", label: "Elegante", description: "Alguien refinado y sofisticado" },
      { id: "poderoso", label: "Poderoso", description: "Alguien con presencia imponente" },
    ],
  },
]

const results: Record<string, { title: string; description: string }> = {
  lider: {
    title: "LIDER",
    description: "Tu energia natural es de liderazgo. La joyeria correcta amplificara tu autoridad y hara que otros te sigan instintivamente.",
  },
  visionario: {
    title: "VISIONARIO",
    description: "Ves mas alla de lo obvio. Piezas unicas y distintivas resonaran con tu capacidad de ver el futuro antes que otros.",
  },
  elegante: {
    title: "ELEGANTE",
    description: "La sofisticacion es tu lenguaje. Piezas clasicas con toques modernos proyectaran tu refinamiento natural.",
  },
  poderoso: {
    title: "PODEROSO",
    description: "Tu presencia llena cualquier espacio. Joyeria bold y statement pieces complementaran tu energia dominante.",
  },
}

export default function QuizPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Array<{ type: "received" | "sent"; text: string }>>([])
  const [showOptions, setShowOptions] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(true)
  const [showResult, setShowResult] = useState(false)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    const sequence = [
      { delay: 1000, message: "Acabo de revisar tu escaner." },
      { delay: 2500, message: "Tienes un potencial MUY alto..." },
      { delay: 4000, message: "Pero necesito hacerte una pregunta importante para darte tu diagnostico personalizado." },
      { delay: 6000, message: questions[0].question },
    ]

    sequence.forEach(({ delay, message }) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "received", text: message }])
      }, delay)
    })

    setTimeout(() => {
      setIsTyping(false)
      setShowOptions(true)
    }, 7000)
  }, [])

  const handleSelect = (optionId: string) => {
    setSelectedAnswer(optionId)
    const option = questions[0].options.find((o) => o.id === optionId)
    if (option) {
      setMessages((prev) => [...prev, { type: "sent", text: option.label }])
    }
    setShowOptions(false)
    setIsTyping(true)

    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "received", text: "Perfecto! Ya tengo tu resultado..." }])
      setTimeout(() => {
        setIsTyping(false)
        setShowResult(true)
      }, 1500)
    }, 1000)
  }

  const result = selectedAnswer ? results[selectedAnswer] : null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header WhatsApp */}
      <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center">
          <span className="text-sm font-bold text-primary-foreground">AI</span>
        </div>
        <div className="flex-1">
          <h2 className="text-white font-semibold text-sm">Asesor de Identidad</h2>
          <p className="text-white/70 text-xs">
            {isTyping ? "escribiendo..." : "en linea"}
          </p>
        </div>
        <div className="w-2 h-2 bg-green-400 rounded-full" />
      </div>

      {/* Chat area */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-[#0b141a]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                msg.type === "sent"
                  ? "bg-[#005c4b] text-white rounded-tr-none"
                  : "bg-[#202c33] text-white rounded-tl-none"
              }`}
            >
              {msg.text}
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

        {/* Opciones del quiz */}
        {showOptions && (
          <div className="space-y-2 pt-4">
            {questions[0].options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className="w-full bg-[#202c33] border border-[#2a3942] rounded-lg p-3 text-left hover:bg-[#2a3942] transition-colors"
              >
                <span className="text-white font-medium">{option.label}</span>
                <p className="text-gray-400 text-xs mt-1">{option.description}</p>
              </button>
            ))}
          </div>
        )}

        {/* Resultado */}
        {showResult && result && (
          <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-primary font-bold">Tu Perfil:</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">{result.title}</h3>
              <p className="text-sm text-gray-300">{result.description}</p>
            </div>

            <button
              onClick={() => router.push("/transformacion")}
              className="w-full py-4 bg-[#25d366] text-white rounded-lg font-semibold hover:bg-[#1da851] transition-colors"
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
