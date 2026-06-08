"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, MessageCircle, Bookmark, Share2, Volume2, Play } from "lucide-react"

const phases = [
  { id: 1, label: "ANTES", description: "Sin presencia definida", color: "text-red-500" },
  { id: 2, label: "PROCESO", description: "Descubriendo su identidad", color: "text-yellow-500" },
  { id: 3, label: "DESPUES", description: "Presencia transformada", color: "text-green-500" },
  { id: 4, label: "IMPACTO", description: "Resultados en su vida", color: "text-primary" },
]

export default function TransformacionPage() {
  const router = useRouter()
  const [currentPhase, setCurrentPhase] = useState(0)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  const phase = phases[currentPhase]

  const handleTap = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase((prev) => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col relative">
      {/* Video/Content area */}
      <div 
        className="flex-1 relative cursor-pointer"
        onClick={handleTap}
      >
        {/* Fondo degradado segun fase */}
        <div 
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: currentPhase === 0 
              ? "linear-gradient(to bottom, #1a1a2e, #16213e)"
              : currentPhase === 1
              ? "linear-gradient(to bottom, #2d2d44, #1a1a2e)"
              : currentPhase === 2
              ? "linear-gradient(to bottom, #1a2f1a, #0f1f0f)"
              : "linear-gradient(to bottom, #2a2010, #1a1508)"
          }}
        />

        {/* Overlay de contenido */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
          {/* Etiqueta de fase */}
          <div className={`px-4 py-1 rounded-full border ${phase.color} border-current mb-6`}>
            <span className={`text-sm font-bold ${phase.color}`}>{phase.label}</span>
          </div>

          {/* Icono de play (simulando video) */}
          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
            <Play className="w-10 h-10 text-white/80 ml-1" />
          </div>

          {/* Descripcion */}
          <p className="text-white/80 text-center text-lg mb-4">{phase.description}</p>

          {/* Indicador de progreso */}
          <div className="flex gap-2 mt-4">
            {phases.map((_, index) => (
              <div
                key={index}
                className={`h-1 w-8 rounded-full transition-all duration-300 ${
                  index <= currentPhase ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Instruccion */}
          {currentPhase < phases.length - 1 && (
            <p className="text-white/50 text-sm mt-8 animate-pulse">
              Toca para continuar
            </p>
          )}
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">NI</span>
            </div>
            <span className="text-white font-semibold text-sm">Archivo Privado</span>
            <span className="text-white/50 text-xs">Solo para ti</span>
          </div>
          <Volume2 className="w-5 h-5 text-white/70" />
        </div>

        {/* Acciones laterales estilo TikTok */}
        <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6">
          <button 
            onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
            className="flex flex-col items-center gap-1"
          >
            <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center ${liked ? "text-red-500" : "text-white"}`}>
              <Heart className={`w-6 h-6 ${liked ? "fill-current" : ""}`} />
            </div>
            <span className="text-white text-xs">2.4K</span>
          </button>

          <button className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-white text-xs">847</span>
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); setSaved(!saved) }}
            className="flex flex-col items-center gap-1"
          >
            <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center ${saved ? "text-primary" : "text-white"}`}>
              <Bookmark className={`w-6 h-6 ${saved ? "fill-current" : ""}`} />
            </div>
            <span className="text-white text-xs">Guardar</span>
          </button>

          <button className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="text-white text-xs">Compartir</span>
          </button>
        </div>

        {/* Info inferior */}
        <div className="absolute bottom-4 left-4 right-20">
          <p className="text-white font-semibold mb-1">@nuevaidentidad</p>
          <p className="text-white/80 text-sm mb-2">
            Esta es la transformacion que tu tambien puedes vivir. La presencia se construye, no se nace con ella.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-white/60 text-xs">#Presencia</span>
            <span className="text-white/60 text-xs">#Elegancia</span>
            <span className="text-white/60 text-xs">#Identidad</span>
            <span className="text-white/60 text-xs">#Transformacion</span>
          </div>
        </div>
      </div>

      {/* Boton continuar (aparece en ultima fase) */}
      {currentPhase === phases.length - 1 && (
        <div className="absolute bottom-4 left-4 right-4 animate-in fade-in slide-in-from-bottom-4">
          <button
            onClick={() => router.push("/vsl")}
            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-all"
          >
            Ver Como Lograrlo
          </button>
        </div>
      )}
    </div>
  )
}
