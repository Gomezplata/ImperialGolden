"use client"

import { useState, useEffect } from "react"
import { Scan } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ScannerProps {
  onContinue: () => void
}

function TypingEffect({ text, delay = 0, onComplete }: { text: string; delay?: number; onComplete?: () => void }) {
  const [displayText, setDisplayText] = useState("")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1))
      }, 30)
      return () => clearTimeout(timer)
    } else {
      onComplete?.()
    }
  }, [displayText, text, started, onComplete])

  return (
    <span>
      {displayText}
      {displayText.length < text.length && started && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}

function ProgressBar({ progress, delay }: { progress: number; delay: number }) {
  const [currentProgress, setCurrentProgress] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (currentProgress < progress) {
      const timer = setTimeout(() => {
        setCurrentProgress(p => Math.min(p + 5, progress))
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [currentProgress, progress, started])

  if (!started) return null

  const filled = Math.floor(currentProgress / 10)
  const empty = 10 - filled

  return (
    <span className="font-mono text-accent">
      [{"\u2588".repeat(filled)}{"\u2591".repeat(empty)}] {currentProgress}%
    </span>
  )
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />
    </div>
  )
}

export default function PresenceScanner({ onContinue }: ScannerProps) {
  const [phase, setPhase] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const phases = [
    { type: "text", content: "Iniciando protocolo de presencia...", delay: 0 },
    { type: "text", content: "Escaneando senales visuales...", delay: 2000 },
    { type: "progress", progress: 25, delay: 3500 },
    { type: "text", content: "Analizando autoridad percibida...", delay: 5000 },
    { type: "progress", progress: 75, delay: 6500 },
    { type: "text", content: "Detectando nivel de impacto visual...", delay: 8000 },
    { type: "text", content: "Resultado listo.", delay: 10000 },
  ]

  useEffect(() => {
    const timers = phases.map((p, i) => {
      return setTimeout(() => {
        setPhase(i + 1)
        if (i === phases.length - 1) {
          setTimeout(() => setShowResult(true), 1000)
        }
      }, p.delay)
    })
    return () => timers.forEach(t => clearTimeout(t))
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <GridBackground />
      
      <div className="w-full max-w-md relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <Scan className="w-5 h-5 text-accent" />
          <span className="text-xs tracking-[0.3em] text-accent uppercase">
            Scanner de Presencia
          </span>
        </div>

        <Card className="bg-card/80 border-accent/30 p-6 backdrop-blur-sm">
          <div className="font-mono text-sm space-y-3 text-muted-foreground min-h-[280px]">
            <p className="text-accent">{"> "}<span className="animate-pulse">_</span></p>
            
            {phase >= 1 && (
              <p><TypingEffect text="Iniciando protocolo de presencia..." delay={0} /></p>
            )}
            {phase >= 2 && (
              <p><TypingEffect text="Escaneando senales visuales..." delay={0} /></p>
            )}
            {phase >= 3 && (
              <p><ProgressBar progress={25} delay={0} /></p>
            )}
            {phase >= 4 && (
              <p><TypingEffect text="Analizando autoridad percibida..." delay={0} /></p>
            )}
            {phase >= 5 && (
              <p><ProgressBar progress={75} delay={0} /></p>
            )}
            {phase >= 6 && (
              <p><TypingEffect text="Detectando nivel de impacto visual..." delay={0} /></p>
            )}
            {phase >= 7 && (
              <p className="text-primary"><TypingEffect text="Resultado listo." delay={0} /></p>
            )}
          </div>
        </Card>

        {showResult && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="bg-card border-primary/50 p-6">
              <p className="text-foreground leading-relaxed text-center">
                {'"'}Las personas forman una impresion sobre ti antes de escuchar una sola palabra.{'"'}
              </p>
            </Card>

            <Button 
              onClick={onContinue}
              className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base tracking-wider"
            >
              INICIAR ESCANER
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
