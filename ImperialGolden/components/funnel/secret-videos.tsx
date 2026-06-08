"use client"

import { useState } from "react"
import { Play, Lock, Check, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SecretVideosProps {
  onContinue: () => void
}

const videos = [
  {
    id: 1,
    title: "LA PSICOLOGIA DE LA PRIMERA IMPRESION",
    description: "Las personas deciden como tratarte antes de conocerte.",
    cta: "Continua al siguiente archivo."
  },
  {
    id: 2,
    title: "COMO LOS SIMBOLOS CONSTRUYEN ESTATUS",
    description: "Relojes. Zapatos. Lenguaje. Detalles.",
    cta: "El siguiente archivo revela el error mas comun."
  },
  {
    id: 3,
    title: "ERRORES QUE DESTRUYEN UNA IMAGEN ELEGANTE",
    description: "Es exceso. Es desorden. Es inconsistencia.",
    cta: "Continua."
  },
  {
    id: 4,
    title: "EL PODER DE LOS DETALLES",
    description: "Acabados. Materiales. Proporciones. Presencia.",
    cta: "Ultimo archivo disponible."
  },
  {
    id: 5,
    title: "HISTORIAS DE TRANSFORMACION",
    description: "La identidad se fortalece cuando existe coherencia visual.",
    cta: "Acceder a seleccion privada."
  }
]

function VideoCard({ 
  video, 
  isUnlocked, 
  isWatched,
  isCurrent,
  onWatch 
}: { 
  video: typeof videos[0]
  isUnlocked: boolean
  isWatched: boolean
  isCurrent: boolean
  onWatch: () => void 
}) {
  return (
    <Card 
      className={`p-4 transition-all duration-300 ${
        isCurrent 
          ? "bg-card border-primary/50 ring-2 ring-primary/20" 
          : isUnlocked 
            ? "bg-card border-border hover:border-primary/30 cursor-pointer" 
            : "bg-muted/30 border-border opacity-60"
      }`}
      onClick={isUnlocked && !isWatched ? onWatch : undefined}
    >
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className={`w-24 h-16 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isUnlocked ? "bg-gradient-to-br from-primary/30 to-primary/10" : "bg-muted"
        }`}>
          {isWatched ? (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-4 h-4 text-primary-foreground" />
            </div>
          ) : isUnlocked ? (
            <Play className="w-6 h-6 text-primary fill-primary" />
          ) : (
            <Lock className="w-5 h-5 text-muted-foreground" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`text-sm font-medium leading-tight ${
              isUnlocked ? "text-foreground" : "text-muted-foreground"
            }`}>
              {video.title}
            </h3>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {video.id}/5
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {video.description}
          </p>
        </div>
      </div>

      {isCurrent && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-primary">{video.cta}</p>
        </div>
      )}
    </Card>
  )
}

export default function SecretVideos({ onContinue }: SecretVideosProps) {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [watchedVideos, setWatchedVideos] = useState<number[]>([])

  const handleWatch = (index: number) => {
    if (!watchedVideos.includes(index)) {
      setWatchedVideos([...watchedVideos, index])
    }
    if (index < videos.length - 1) {
      setTimeout(() => setCurrentVideo(index + 1), 500)
    }
  }

  const allWatched = watchedVideos.length === videos.length

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-medium">Archivo Secreto</h1>
            <p className="text-sm text-muted-foreground">Videos exclusivos desbloqueados</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{watchedVideos.length}/5</span>
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(watchedVideos.length / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            isUnlocked={index <= currentVideo || watchedVideos.includes(index)}
            isWatched={watchedVideos.includes(index)}
            isCurrent={index === currentVideo && !watchedVideos.includes(index)}
            onWatch={() => handleWatch(index)}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="p-4 border-t border-border bg-card">
        {allWatched ? (
          <Button 
            onClick={onContinue}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6"
          >
            <span>Acceder a seleccion privada</span>
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            Completa todos los videos para continuar
          </p>
        )}
      </div>
    </div>
  )
}
