"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Terminal, Scan, CheckCircle } from "lucide-react"

const scanLines = [
  "> Iniciando protocolo de analisis...",
  "> Conectando con base de datos de identidad...",
  "> Escaneando patrones de comportamiento...",
  "> Analizando indicadores de presencia...",
  "> Evaluando potencial de autoridad...",
  "> Procesando resultados...",
  "> ANALISIS COMPLETADO",
]

const metrics = [
  { label: "Presencia Visual", value: 45, target: 92 },
  { label: "Autoridad Percibida", value: 38, target: 88 },
  { label: "Confianza Proyectada", value: 52, target: 95 },
  { label: "Impacto de Primera Impresion", value: 41, target: 90 },
]

export default function ScannerPage() {
  const router = useRouter()
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [animatedMetrics, setAnimatedMetrics] = useState(metrics.map((m) => ({ ...m, current: 0 })))

  useEffect(() => {
    if (currentLine < scanLines.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => [...prev, scanLines[currentLine]])
        setCurrentLine((prev) => prev + 1)
      }, 800)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setShowResults(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [currentLine])

  useEffect(() => {
    if (showResults) {
      const interval = setInterval(() => {
        setAnimatedMetrics((prev) =>
          prev.map((m) => ({
            ...m,
            current: Math.min(m.current + 2, m.value),
          }))
        )
      }, 50)

      const timeout = setTimeout(() => {
        clearInterval(interval)
      }, 2000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [showResults])

  return (
    <div className="min-h-screen bg-background p-4 font-mono relative overflow-hidden">
      {/* Grid de fondo estilo terminal */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
          <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-accent">SCANNER DE PRESENCIA</h1>
            <p className="text-xs text-muted-foreground">v2.4.1 // Nueva Identidad Labs</p>
          </div>
          <Scan className="w-5 h-5 text-accent ml-auto animate-pulse" />
        </div>

        {/* Terminal output */}
        <div className="bg-card/50 border border-border rounded-lg p-4 mb-6 min-h-[200px]">
          {displayedText.map((line, index) => (
            <div
              key={index}
              className={`text-sm mb-1 ${
                line.includes("COMPLETADO") ? "text-green-500 font-bold" : "text-accent"
              }`}
            >
              {line}
              {index === displayedText.length - 1 && currentLine < scanLines.length && (
                <span className="animate-pulse">_</span>
              )}
            </div>
          ))}
          {currentLine < scanLines.length && displayedText.length === 0 && (
            <span className="text-accent animate-pulse">_</span>
          )}
        </div>

        {/* Resultados */}
        {showResults && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Resultados del Analisis</span>
            </div>

            {/* Metricas */}
            <div className="space-y-4">
              {animatedMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{metric.label}</span>
                    <span className="text-foreground">
                      {metric.current}% <span className="text-primary">→ {metric.target}%</span>
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full flex">
                      <div
                        className="h-full bg-red-500/70 transition-all duration-500"
                        style={{ width: `${metric.current}%` }}
                      />
                      <div
                        className="h-full bg-primary/30 transition-all duration-500"
                        style={{ width: `${metric.target - metric.current}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mensaje clave */}
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mt-6">
              <p className="text-sm text-foreground text-center">
                <span className="text-primary font-semibold">&quot;Tu potencial actual esta muy por debajo de lo que podrias proyectar.&quot;</span>
                <br />
                <span className="text-muted-foreground text-xs mt-2 block">
                  Descubre como cerrar esta brecha en los siguientes pasos.
                </span>
              </p>
            </div>

            {/* Boton continuar */}
            <button
              onClick={() => router.push("/quiz")}
              className="w-full py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Continuar al Diagnostico
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
