"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Play, Lock, Check, Star, Clock } from "lucide-react"

const videos = [
  {
    id: 1,
    title: "El Secreto de la Primera Impresion",
    duration: "8:45",
    thumbnail: "bg-gradient-to-br from-purple-900 to-purple-600",
    locked: false,
    description: "Por que los primeros 7 segundos definen todo",
  },
  {
    id: 2,
    title: "Joyeria como Comunicacion No Verbal",
    duration: "12:30",
    thumbnail: "bg-gradient-to-br from-amber-900 to-amber-600",
    locked: false,
    description: "Lo que tus accesorios dicen de ti sin hablar",
  },
  {
    id: 3,
    title: "El Codigo de los Lideres",
    duration: "15:20",
    thumbnail: "bg-gradient-to-br from-emerald-900 to-emerald-600",
    locked: false,
    description: "Patrones de presencia de CEOs y ejecutivos",
  },
  {
    id: 4,
    title: "Transformacion Completa: Casos Reales",
    duration: "20:00",
    thumbnail: "bg-gradient-to-br from-rose-900 to-rose-600",
    locked: true,
    description: "Desbloquea con tu primera compra",
  },
]

export default function VideosPage() {
  const router = useRouter()
  const [watchedVideos, setWatchedVideos] = useState<number[]>([])
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)

  const handleWatchVideo = (videoId: number) => {
    if (videos.find(v => v.id === videoId)?.locked) return
    
    setSelectedVideo(videoId)
    
    // Simular ver video
    setTimeout(() => {
      if (!watchedVideos.includes(videoId)) {
        setWatchedVideos(prev => [...prev, videoId])
      }
      setSelectedVideo(null)
    }, 2000)
  }

  const unlockedVideosWatched = watchedVideos.filter(id => !videos.find(v => v.id === id)?.locked).length
  const canContinue = unlockedVideosWatched >= 2

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Biblioteca Secreta</h1>
              <p className="text-xs text-muted-foreground">Contenido exclusivo para miembros</p>
            </div>
          </div>
          
          {/* Progreso */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tu progreso</span>
              <span className="text-primary">{unlockedVideosWatched}/3 videos</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(unlockedVideosWatched / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de videos */}
      <div className="max-w-lg mx-auto p-4 space-y-4">
        {videos.map((video) => {
          const isWatched = watchedVideos.includes(video.id)
          const isPlaying = selectedVideo === video.id

          return (
            <div
              key={video.id}
              onClick={() => handleWatchVideo(video.id)}
              className={`bg-card border border-border rounded-xl overflow-hidden transition-all ${
                video.locked 
                  ? "opacity-60 cursor-not-allowed" 
                  : "cursor-pointer hover:border-primary/50"
              }`}
            >
              <div className="flex gap-4 p-4">
                {/* Thumbnail */}
                <div className={`relative w-28 h-20 rounded-lg ${video.thumbnail} flex items-center justify-center flex-shrink-0`}>
                  {video.locked ? (
                    <Lock className="w-6 h-6 text-white/80" />
                  ) : isPlaying ? (
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isWatched ? (
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                  )}
                  
                  {/* Duracion */}
                  <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded text-xs text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                  {isWatched && (
                    <span className="inline-flex items-center gap-1 text-xs text-green-500 mt-2">
                      <Check className="w-3 h-3" /> Completado
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {/* Mensaje de progreso */}
        {!canContinue && (
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-center">
            <p className="text-sm text-foreground">
              Mira al menos <span className="text-primary font-semibold">2 videos</span> para desbloquear el siguiente paso
            </p>
          </div>
        )}

        {/* Boton continuar */}
        {canContinue && (
          <button
            onClick={() => router.push("/objeciones")}
            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all animate-in fade-in slide-in-from-bottom-4"
          >
            Continuar al Siguiente Paso
          </button>
        )}
      </div>
    </div>
  )
}
