"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Phone, Shield, Volume2 } from "lucide-react"

export default function LlamadaActivaPage() {
  const router = useRouter()
  const [callTime, setCallTime] = useState(0)
  const [showContinue, setShowContinue] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCallTime((prev) => prev + 1)
    }, 1000)

    const continueTimer = setTimeout(() => {
      setShowContinue(true)
    }, 5000)

    return () => {
      clearInterval(timer)
      clearTimeout(continueTimer)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ondas de audio */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-accent/20 animate-ping"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Avatar activo */}
        <div className="relative">
          <div className="absolute -inset-2 rounded-full bg-green-500/30 animate-pulse" />
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary-foreground">NI</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Phone className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Estado de llamada */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-semibold text-foreground">Nueva Identidad</h2>
          <p className="text-green-500 font-medium">Conectado</p>
          <p className="text-2xl font-mono text-foreground">{formatTime(callTime)}</p>
        </div>

        {/* Visualizador de audio */}
        <div className="flex items-end gap-1 h-12">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 bg-accent rounded-full animate-pulse"
              style={{
                height: `${20 + Math.random() * 30}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: "0.5s",
              }}
            />
          ))}
        </div>

        {/* Indicador de canal seguro */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card/50 px-4 py-2 rounded-full">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Canal seguro</span>
          <Volume2 className="w-4 h-4 ml-2 text-accent animate-pulse" />
        </div>

        {/* Mensaje de audio simulado */}
        <div className="bg-card border border-border rounded-xl p-4 max-w-sm mt-4">
          <p className="text-sm text-muted-foreground italic text-center">
            &quot;Hola, te estoy contactando porque detectamos que tienes un perfil con alto potencial. 
            Hay algo importante que debes saber sobre tu presencia...&quot;
          </p>
        </div>

        {/* Boton continuar */}
        {showContinue && (
          <button
            onClick={() => router.push("/scanner")}
            className="mt-6 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 animate-pulse"
          >
            Continuar
          </button>
        )}
      </div>
    </div>
  )
}
