"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Phone, MoreVertical, ChevronDown, ChevronUp } from "lucide-react"

interface ObjectionsProps {
  onContinue: () => void
}

const sections = [
  {
    id: "calidad",
    question: "Es realmente buena calidad?",
    intro: "Pregunta frecuente.",
    messages: [
      "Si.",
      "Trabajamos con Oro Laminado 18K, Plata Ley 925 y Oro 18K.",
      "Materiales disenados para conservar presencia y elegancia."
    ]
  },
  {
    id: "durabilidad",
    question: "Cuanto dura?",
    intro: "Otra duda comun.",
    messages: [
      "La duracion depende del cuidado.",
      "Pero las piezas estan fabricadas para acompanarte durante anos.",
      "No son accesorios desechables."
    ]
  },
  {
    id: "precio",
    question: "Por que no cuesta como una joya de lujo tradicional?",
    intro: "Entiendo la pregunta.",
    messages: [
      "Porque buscamos lujo accesible.",
      "Presencia real.",
      "Sin pagar sobreprecios absurdos."
    ]
  },
  {
    id: "confianza",
    question: "Como puedo confiar en una compra por internet?",
    intro: "Comprar por internet requiere confianza.",
    messages: [
      "Por eso mostramos:",
      "Fotografias reales",
      "Videos reales",
      "Detalles reales",
      "Garantia",
      "Queremos que decidas con certeza."
    ]
  }
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

function ChatBubble({ message, isTyping, isQuestion }: { message: string; isTyping?: boolean; isQuestion?: boolean }) {
  return (
    <div className={`flex ${isQuestion ? "justify-end" : "justify-start"}`}>
      <div className={`rounded-2xl px-4 py-2 max-w-[85%] ${
        isQuestion 
          ? "bg-[#005C4B] rounded-tr-sm" 
          : "bg-card border border-border rounded-tl-sm"
      }`}>
        {isTyping ? <TypingIndicator /> : <p className="text-sm">{message}</p>}
      </div>
    </div>
  )
}

function ObjectionSection({ 
  section, 
  isActive, 
  isComplete,
  onActivate, 
  onComplete 
}: { 
  section: typeof sections[0]
  isActive: boolean
  isComplete: boolean
  onActivate: () => void
  onComplete: () => void
}) {
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showIntro, setShowIntro] = useState(false)

  useEffect(() => {
    if (!isActive) return
    
    // Show intro first
    setTimeout(() => setShowIntro(true), 500)
    
    // Then show messages
    const startMessages = setTimeout(() => {
      setIsTyping(true)
    }, 1500)

    return () => clearTimeout(startMessages)
  }, [isActive])

  useEffect(() => {
    if (!isTyping || visibleMessages >= section.messages.length) {
      if (visibleMessages >= section.messages.length && isActive) {
        setTimeout(onComplete, 1000)
      }
      return
    }

    const timer = setTimeout(() => {
      setVisibleMessages(v => v + 1)
      if (visibleMessages + 1 < section.messages.length) {
        setIsTyping(true)
      } else {
        setIsTyping(false)
      }
    }, 1200)

    return () => clearTimeout(timer)
  }, [isTyping, visibleMessages, section.messages.length, isActive, onComplete])

  return (
    <div className="border-b border-border">
      <button
        onClick={onActivate}
        className="w-full px-4 py-4 flex items-center justify-between text-left"
        disabled={isActive}
      >
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isComplete ? "bg-primary" : "bg-muted"}`} />
          <span className={`text-sm ${isActive ? "text-primary font-medium" : "text-foreground"}`}>
            {section.question}
          </span>
        </div>
        {isActive ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {isActive && (
        <div className="px-4 pb-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          {showIntro && (
            <ChatBubble message={section.intro} />
          )}
          <ChatBubble message={section.question} isQuestion />
          {section.messages.slice(0, visibleMessages).map((msg, i) => (
            <ChatBubble key={i} message={msg} />
          ))}
          {isTyping && visibleMessages < section.messages.length && (
            <ChatBubble message="" isTyping />
          )}
        </div>
      )}
    </div>
  )
}

export default function ObjectionsWhatsapp({ onContinue }: ObjectionsProps) {
  const [activeSection, setActiveSection] = useState<string | null>("calidad")
  const [completedSections, setCompletedSections] = useState<string[]>([])

  const handleComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId])
    }
    
    // Auto-advance to next section
    const currentIndex = sections.findIndex(s => s.id === sectionId)
    if (currentIndex < sections.length - 1) {
      setTimeout(() => {
        setActiveSection(sections[currentIndex + 1].id)
      }, 500)
    }
  }

  const allComplete = completedSections.length === sections.length

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
        <ChevronLeft className="w-6 h-6 text-white" />
        <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
          <span className="text-primary font-bold">AI</span>
        </div>
        <div className="flex-1">
          <p className="text-white font-medium text-sm">Preguntas Frecuentes</p>
          <p className="text-white/70 text-xs">En linea</p>
        </div>
        <Phone className="w-5 h-5 text-white" />
        <MoreVertical className="w-5 h-5 text-white" />
      </div>

      {/* Progress */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progreso</span>
          <span className="text-foreground">{completedSections.length}/{sections.length}</span>
        </div>
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(completedSections.length / sections.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto" style={{ background: "linear-gradient(180deg, #0b141a 0%, #111b21 100%)" }}>
        {sections.map((section) => (
          <ObjectionSection
            key={section.id}
            section={section}
            isActive={activeSection === section.id}
            isComplete={completedSections.includes(section.id)}
            onActivate={() => setActiveSection(section.id)}
            onComplete={() => handleComplete(section.id)}
          />
        ))}
      </div>

      {/* CTA */}
      {allComplete && (
        <div className="p-4 border-t border-border bg-card animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button
            onClick={onContinue}
            className="w-full bg-[#25D366] text-white py-4 rounded-xl font-medium hover:bg-[#25D366]/90 transition-colors"
          >
            Ver Colecciones
          </button>
        </div>
      )}
    </div>
  )
}
