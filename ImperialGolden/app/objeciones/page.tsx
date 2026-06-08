"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronRight } from "lucide-react"

const objections = [
  {
    id: 1,
    question: "Es muy caro para mi...",
    answer: "Entiendo. Pero piensa en esto: cuanto te ha costado NO proyectar la imagen correcta? Oportunidades perdidas, no ser tomado en serio, pasar desapercibido... El verdadero costo es seguir igual. Ademas, tenemos opciones de pago que se ajustan a cualquier presupuesto.",
  },
  {
    id: 2,
    question: "No estoy seguro si funciona...",
    answer: "Es normal tener dudas. Por eso ofrecemos garantia de satisfaccion. Si no notas una diferencia en como te perciben los demas en 30 dias, te devolvemos tu dinero. Sin preguntas. Cero riesgo para ti.",
  },
  {
    id: 3,
    question: "Necesito pensarlo...",
    answer: "Claro, tomate tu tiempo. Solo recuerda que cada dia que pasa es un dia mas proyectando una imagen que no te representa. La oferta especial que tienes disponible ahora es por tiempo limitado. Pero la decision es tuya.",
  },
  {
    id: 4,
    question: "Ya tengo joyeria...",
    answer: "Genial! Eso significa que ya entiendes el poder de los accesorios. La diferencia es que nuestra joyeria esta especificamente disenada para proyectar autoridad y presencia. No es solo decoracion, es una herramienta de comunicacion no verbal.",
  },
]

export default function ObjecionesPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Array<{ type: "received" | "sent"; text: string; isButton?: boolean }>>([])
  const [, setCurrentObjection] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showOptions, setShowOptions] = useState(false)
  const [answeredObjections, setAnsweredObjections] = useState<number[]>([])
  const [showFinal, setShowFinal] = useState(false)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    const initialMessages = [
      { delay: 1000, text: "Antes de continuar..." },
      { delay: 2500, text: "Se que puedes tener algunas dudas." },
      { delay: 4000, text: "Es completamente normal." },
      { delay: 5500, text: "Dejame resolver cualquier pregunta que tengas:" },
    ]

    initialMessages.forEach(({ delay, text }) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "received", text }])
      }, delay)
    })

    setTimeout(() => {
      setIsTyping(false)
      setShowOptions(true)
    }, 7000)
  }, [])

  const handleSelectObjection = (index: number) => {
    const objection = objections[index]
    setShowOptions(false)
    setMessages((prev) => [...prev, { type: "sent", text: objection.question }])
    setIsTyping(true)

    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "received", text: objection.answer }])
      setAnsweredObjections((prev) => [...prev, index])
      setIsTyping(false)

      setTimeout(() => {
        if (answeredObjections.length >= 1) {
          // Ya contesto suficientes, mostrar opcion final
          setShowFinal(true)
        } else {
          setShowOptions(true)
        }
      }, 1000)
    }, 2000)
  }

  const handleContinue = () => {
    setShowOptions(false)
    setShowFinal(false)
    setIsTyping(true)
    
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "received", text: "Perfecto! Estas listo para dar el siguiente paso." }])
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "received", text: "Te llevo a ver las opciones disponibles..." }])
        setTimeout(() => {
          router.push("/ventas")
        }, 2000)
      }, 1500)
    }, 1000)
  }

  const remainingObjections = objections.filter((_, i) => !answeredObjections.includes(i))

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header WhatsApp */}
      <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center">
          <span className="text-sm font-bold text-primary-foreground">NI</span>
        </div>
        <div className="flex-1">
          <h2 className="text-white font-semibold text-sm">Soporte Nueva Identidad</h2>
          <p className="text-white/70 text-xs">
            {isTyping ? "escribiendo..." : "en linea"}
          </p>
        </div>
        <div className="flex items-center gap-1 text-white/60 text-xs">
          <Check className="w-3 h-3" />
          <span>Respuesta rapida</span>
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
              className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
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

        {/* Opciones de objeciones */}
        {showOptions && remainingObjections.length > 0 && (
          <div className="space-y-2 pt-4">
            <p className="text-gray-500 text-xs text-center mb-3">Selecciona tu duda:</p>
            {remainingObjections.map((objection, index) => {
              const originalIndex = objections.findIndex(o => o.id === objection.id)
              return (
                <button
                  key={objection.id}
                  onClick={() => handleSelectObjection(originalIndex)}
                  className="w-full bg-[#202c33] border border-[#2a3942] rounded-lg p-3 text-left hover:bg-[#2a3942] transition-colors flex items-center justify-between"
                >
                  <span className="text-white text-sm">{objection.question}</span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </button>
              )
            })}
            
            {answeredObjections.length >= 1 && (
              <button
                onClick={handleContinue}
                className="w-full mt-4 py-4 bg-[#25d366] text-white rounded-lg font-semibold hover:bg-[#1da851] transition-colors"
              >
                No tengo mas dudas, continuar
              </button>
            )}
          </div>
        )}

        {/* Boton final */}
        {showFinal && (
          <div className="pt-4 space-y-3 animate-in fade-in slide-in-from-bottom-4">
            <p className="text-gray-400 text-xs text-center">Tienes alguna otra duda?</p>
            
            {remainingObjections.length > 0 && (
              <button
                onClick={() => { setShowFinal(false); setShowOptions(true) }}
                className="w-full bg-[#202c33] border border-[#2a3942] rounded-lg p-3 text-white text-sm hover:bg-[#2a3942] transition-colors"
              >
                Si, tengo otra pregunta
              </button>
            )}
            
            <button
              onClick={handleContinue}
              className="w-full py-4 bg-[#25d366] text-white rounded-lg font-semibold hover:bg-[#1da851] transition-colors"
            >
              No, estoy listo para continuar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
