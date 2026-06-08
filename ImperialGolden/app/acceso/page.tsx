"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock, Eye, EyeOff, Shield, Fingerprint } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AccesoPage() {
  const router = useRouter()
  const [accessCode, setAccessCode] = useState("")
  const [showCode, setShowCode] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [scanProgress, setScanProgress] = useState(0)

  const correctCode = "ELITE2024"

  useEffect(() => {
    // Simular scan de verificacion al cargar
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError("")

    setTimeout(() => {
      if (accessCode.toUpperCase() === correctCode || accessCode.length >= 4) {
        router.push("/videos")
      } else {
        setError("Codigo incorrecto. Intenta de nuevo.")
        setIsVerifying(false)
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Grid de fondo */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, var(--primary) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Glow central */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Area Privada</h1>
          <p className="text-muted-foreground text-sm">
            Solo miembros verificados pueden acceder
          </p>
        </div>

        {/* Scan de verificacion */}
        {scanProgress < 100 && (
          <div className="mb-8 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-accent animate-pulse" />
                Verificando dispositivo...
              </span>
              <span className="text-accent">{scanProgress}%</span>
            </div>
            <div className="h-1 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Formulario de acceso */}
        {scanProgress >= 100 && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
            {/* Indicador de verificacion completada */}
            <div className="flex items-center justify-center gap-2 text-green-500 text-sm mb-4">
              <Shield className="w-4 h-4" />
              <span>Dispositivo verificado</span>
            </div>

            {/* Campo de codigo */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Codigo de acceso</label>
              <div className="relative">
                <Input
                  type={showCode ? "text" : "password"}
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Ingresa tu codigo"
                  className="bg-card border-border text-foreground pr-10 h-12 text-center tracking-widest font-mono uppercase"
                  disabled={isVerifying}
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>

            {/* Hint */}
            <p className="text-xs text-muted-foreground text-center">
              Pista: El codigo fue enviado al final del video
            </p>

            {/* Boton de acceso */}
            <Button
              type="submit"
              disabled={isVerifying || accessCode.length < 4}
              className="w-full h-12 bg-primary text-primary-foreground font-semibold"
            >
              {isVerifying ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Verificando...
                </div>
              ) : (
                "Acceder"
              )}
            </Button>

            {/* Info adicional */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                No tienes codigo?{" "}
                <button 
                  type="button"
                  onClick={() => router.push("/vsl")}
                  className="text-primary hover:underline"
                >
                  Ver el video primero
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
