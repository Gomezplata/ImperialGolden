"use client"

import { useState, useEffect } from "react"
import { Phone, PhoneOff, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IncomingCallProps {
  onContinue: () => void
}

function CallTimer({ isActive }: { isActive: boolean }) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!isActive) return
    const interval = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isActive])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return (
    <span className="font-mono text-lg">
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </span>
  )
}

function WaveAnimation() {
  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-accent rounded-full animate-pulse"
          style={{
            height: `${Math.random() * 32 + 8}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: "0.5s"
          }}
        />
      ))}
    </div>
  )
}

function PresenceGlow({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse" />
      <div className="relative">{children}</div>
    </div>
  )
}

function ParticlesOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  )
}

export default function IncomingCall({ onContinue }: IncomingCallProps) {
  const [isAnswered, setIsAnswered] = useState(false)
  const [showContinue, setShowContinue] = useState(false)
  const [isVibrating, setIsVibrating] = useState(true)

  useEffect(() => {
    if (isAnswered) {
      const timer = setTimeout(() => setShowContinue(true), 5000)
      return () => clearTimeout(timer)
    }
  }, [isAnswered])

  useEffect(() => {
    if (!isAnswered) {
      const interval = setInterval(() => {
        setIsVibrating(v => !v)
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isAnswered])

  if (!isAnswered) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <ParticlesOverlay />
        
        <div className="flex flex-col items-center gap-8 relative z-10">
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Llamada Privada
          </p>

          <PresenceGlow>
            <div 
              className={`w-28 h-28 rounded-full bg-card border border-border flex items-center justify-center transition-transform ${isVibrating ? "translate-x-1" : "-translate-x-1"}`}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/50 to-primary/20 flex items-center justify-center">
                <Phone className="w-8 h-8 text-primary" />
              </div>
            </div>
          </PresenceGlow>

          <p className="text-muted-foreground animate-pulse">
            Llamada entrante
          </p>

          <div className="flex gap-8 mt-8">
            <button
              onClick={() => setIsAnswered(true)}
              className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center hover:bg-green-500/30 transition-colors"
            >
              <Phone className="w-6 h-6 text-green-400" />
            </button>
            <button
              onClick={onContinue}
              className="w-16 h-16 rounded-full bg-destructive/20 border border-destructive/50 flex items-center justify-center hover:bg-destructive/30 transition-colors"
            >
              <PhoneOff className="w-6 h-6 text-destructive" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 w-32 h-1 bg-muted rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <ParticlesOverlay />
      
      <div className="flex flex-col items-center gap-6 relative z-10">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Llamada Privada
        </p>

        <PresenceGlow>
          <div className="w-28 h-28 rounded-full bg-card border border-primary/50 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/50 to-primary/20 flex items-center justify-center">
              <Phone className="w-8 h-8 text-primary" />
            </div>
          </div>
        </PresenceGlow>

        <div className="flex flex-col items-center gap-2">
          <p className="text-primary font-medium">Conectado</p>
          <CallTimer isActive={true} />
        </div>

        <WaveAnimation />

        <div className="flex items-center gap-2 text-accent text-sm">
          <Shield className="w-4 h-4" />
          <span>Canal seguro</span>
        </div>

        {showContinue && (
          <Button 
            onClick={onContinue}
            className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            Continuar
          </Button>
        )}
      </div>

      <div className="absolute bottom-8 w-32 h-1 bg-muted rounded-full" />
    </div>
  )
}
