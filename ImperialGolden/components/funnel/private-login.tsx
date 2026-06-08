"use client"

import { useState } from "react"
import { Lock, Eye, EyeOff, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface PrivateLoginProps {
  onContinue: () => void
}

export default function PrivateLogin({ onContinue }: PrivateLoginProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password.toUpperCase() === "PRESENCIA") {
      setIsUnlocking(true)
      setTimeout(() => {
        onContinue()
      }, 1500)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  if (isUnlocking) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center animate-pulse">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <p className="text-primary font-medium tracking-wider animate-pulse">
            Acceso concedido
          </p>
          <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-[loading_1.5s_ease-in-out]" style={{
              animation: "loading 1.5s ease-in-out forwards"
            }} />
          </div>
        </div>
        <style jsx>{`
          @keyframes loading {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-xs tracking-[0.4em] text-muted-foreground uppercase">
            Archivo Privado
          </h1>
        </div>

        <Card className="bg-card/80 border-border p-6 backdrop-blur-sm">
          <div className="text-center mb-6">
            <h2 className="text-lg font-medium text-foreground mb-2">
              ACCESO RESTRINGIDO
            </h2>
            <p className="text-sm text-muted-foreground">
              Solo para miembros con evaluacion completada.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Contrasena"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`bg-background border-border pr-10 ${
                  error ? "border-destructive animate-shake" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {error && (
              <p className="text-destructive text-sm text-center">
                Contrasena incorrecta
              </p>
            )}

            <Button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              INGRESAR
            </Button>
          </form>
        </Card>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Recibiste la contrasena en el paso anterior
        </p>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  )
}
