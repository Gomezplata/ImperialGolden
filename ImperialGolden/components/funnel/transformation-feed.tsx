"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, Bookmark, Play, ChevronUp } from "lucide-react"

interface TransformationFeedProps {
  onContinue: () => void
}

function ProfileHeader() {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/30 border-2 border-primary" />
        <div>
          <p className="text-white text-sm font-medium">Archivo Privado</p>
          <p className="text-white/60 text-xs">Acceso exclusivo</p>
        </div>
      </div>
    </div>
  )
}

function FeedActions() {
  return (
    <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6">
      <button className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <span className="text-white text-xs">24.5K</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <span className="text-white text-xs">1.2K</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Bookmark className="w-5 h-5 text-white" />
        </div>
      </button>
      <button className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Share2 className="w-5 h-5 text-white" />
        </div>
      </button>
    </div>
  )
}

function VideoSlide({ 
  phase, 
  onSwipe 
}: { 
  phase: number
  onSwipe: () => void 
}) {
  const content = [
    { text: "", label: "ANTES" },
    { text: "Mismo esfuerzo.", label: "" },
    { text: "Distinta percepcion.", label: "" },
    { text: "", label: "DESPUES" },
    { text: "Las personas responden a lo que ven.", label: "" },
  ]

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center transition-all duration-500"
      onClick={onSwipe}
    >
      {/* Video mockup background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Before/After visual representation */}
            <div className="flex items-center gap-8">
              {phase < 3 ? (
                <div className="w-32 h-44 bg-muted/30 rounded-lg flex items-center justify-center border border-muted">
                  <div className="w-12 h-12 rounded-full bg-muted/50" />
                </div>
              ) : (
                <div className="w-32 h-44 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg flex items-center justify-center border border-primary/50">
                  <div className="w-12 h-12 rounded-full bg-primary/50 border-2 border-primary" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Label overlay */}
      {content[phase].label && (
        <div className="absolute top-20 left-4">
          <span className="px-3 py-1 bg-primary/80 text-primary-foreground text-xs font-bold tracking-wider rounded">
            {content[phase].label}
          </span>
        </div>
      )}

      {/* Text overlay */}
      {content[phase].text && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-2xl font-bold text-center px-8 drop-shadow-lg">
            {content[phase].text}
          </p>
        </div>
      )}

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Play className="w-8 h-8 text-white fill-white" />
        </div>
      </div>
    </div>
  )
}

export default function TransformationArchive({ onContinue }: TransformationFeedProps) {
  const [phase, setPhase] = useState(0)

  const handleSwipe = () => {
    if (phase < 4) {
      setPhase(p => p + 1)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      <ProfileHeader />
      
      <VideoSlide phase={phase} onSwipe={handleSwipe} />
      
      <FeedActions />

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
        <p className="text-white text-sm mb-2">
          La percepcion cambia cuando los detalles cambian.
        </p>
        <p className="text-primary text-xs">
          #Presencia #Elegancia #Identidad
        </p>

        {phase >= 4 && (
          <button
            onClick={onContinue}
            className="w-full mt-4 bg-primary text-primary-foreground py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <ChevronUp className="w-4 h-4" />
            Continuar al siguiente paso
          </button>
        )}

        {phase < 4 && (
          <p className="text-white/50 text-xs text-center mt-4">
            Toca para continuar ({phase + 1}/5)
          </p>
        )}
      </div>
    </div>
  )
}
