"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Plus,
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  MoreHorizontal,
  Home,
  Search,
} from "lucide-react"

const phases = [
  {
    id: 1,
    label: "ANTES",
    description: "Sin presencia definida",
    bg: "linear-gradient(to bottom, #1a1a2e, #16213e)",
  },
  {
    id: 2,
    label: "PROCESO",
    description: "Descubriendo su identidad",
    bg: "linear-gradient(to bottom, #2d2d44, #1a1a2e)",
  },
  {
    id: 3,
    label: "DESPUES",
    description: "Presencia transformada",
    bg: "linear-gradient(to bottom, #1a2f1a, #0f1f0f)",
  },
  {
    id: 4,
    label: "IMPACTO",
    description: "Resultados en su vida",
    bg: "linear-gradient(to bottom, #2a2010, #1a1508)",
  },
]

function TopBar() {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-3 pb-2">
      <div className="flex items-center justify-between">
        <button aria-label="Crear" className="text-white">
          <Plus className="w-7 h-7" strokeWidth={2.5} />
        </button>

        <div className="flex items-center gap-3">
          <span className="text-white text-xl font-bold">Reels</span>
          <div className="flex items-center gap-1">
            <span className="text-white/50 text-xl font-bold">Friends</span>
            <div className="flex -space-x-2 ml-1">
              <div className="w-6 h-6 rounded-full bg-zinc-600 border border-black" />
              <div className="w-6 h-6 rounded-full bg-zinc-400 border border-black" />
              <div className="w-6 h-6 rounded-full bg-zinc-500 border border-black" />
            </div>
          </div>
        </div>

        <button aria-label="Ajustes" className="text-white">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="7" cy="8" r="2.2" />
            <line x1="9.2" y1="8" x2="20" y2="8" />
            <line x1="4" y1="8" x2="4.8" y2="8" />
            <path d="M14 16a2.2 2.2 0 1 0 4.4 0 2.2 2.2 0 1 0 -4.4 0" />
            <line x1="14" y1="16" x2="4" y2="16" />
            <line x1="18.4" y1="16" x2="20" y2="16" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function SideActions() {
  const [liked, setLiked] = useState(false)
  return (
    <div className="absolute right-3 bottom-36 z-20 flex flex-col items-center gap-5">
      <button
        onClick={(e) => {
          e.stopPropagation()
          setLiked((v) => !v)
        }}
        className="flex flex-col items-center gap-1"
      >
        <Heart
          className={`w-8 h-8 drop-shadow-lg ${liked ? "text-red-500" : "text-white"}`}
          fill={liked ? "currentColor" : "none"}
          strokeWidth={2}
        />
        <span className="text-white text-xs font-semibold">51K</span>
      </button>

      <button className="flex flex-col items-center gap-1">
        <MessageCircle className="w-8 h-8 drop-shadow-lg -scale-x-100 text-white" strokeWidth={2} />
        <span className="text-white text-xs font-semibold">387</span>
      </button>

      <button className="flex flex-col items-center gap-1">
        <Repeat2 className="w-8 h-8 drop-shadow-lg text-white" strokeWidth={2} />
        <span className="text-white text-xs font-semibold">434</span>
      </button>

      <button className="flex flex-col items-center gap-1">
        <Send className="w-8 h-8 drop-shadow-lg text-white" strokeWidth={2} />
        <span className="text-white text-xs font-semibold">5,371</span>
      </button>

      <button className="flex flex-col items-center gap-1">
        <MoreHorizontal className="w-7 h-7 drop-shadow-lg text-white" strokeWidth={2.5} />
      </button>
    </div>
  )
}

function BottomInfo() {
  const [following, setFollowing] = useState(false)
  return (
    <div className="absolute bottom-[60px] left-0 right-0 z-20 px-3 pb-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
          <Image src="/igs-logo.jpeg" alt="Imperial Golden Store" width={32} height={32} className="object-cover" />
        </div>
        <span className="text-white text-sm font-semibold">Imperial Golden Store</span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setFollowing((v) => !v)
          }}
          className="ml-1 px-3 py-[3px] rounded-md border border-white/70 text-white text-xs font-semibold"
        >
          {following ? "Following" : "Follow"}
        </button>
      </div>

      <p className="text-white text-sm pr-12 leading-relaxed">No es por gusto, es puro estilo</p>
    </div>
  )
}

function BottomNav() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 h-[56px] bg-black border-t border-zinc-800 flex items-center justify-around px-4">
      <Home className="w-7 h-7 text-white" strokeWidth={2} />
      <div className="w-7 h-7 rounded-md border-2 border-white flex items-center justify-center">
        <div className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-white ml-0.5" />
      </div>
      <div className="relative">
        <Send className="w-7 h-7 text-white" strokeWidth={2} />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500" />
      </div>
      <Search className="w-7 h-7 text-white" strokeWidth={2} />
      <div className="w-7 h-7 rounded-md bg-white overflow-hidden">
        <Image src="/igs-logo.jpeg" alt="Imperial Golden Store" width={28} height={28} className="object-cover" />
      </div>
    </div>
  )
}

export default function TransformacionPage() {
  const router = useRouter()
  const [currentPhase, setCurrentPhase] = useState(0)
  const touchStartY = useRef<number | null>(null)

  const phase = phases[currentPhase]
  const isLast = currentPhase === phases.length - 1

  const goNext = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase((prev) => prev + 1)
    }
  }

  const goPrev = () => {
    if (currentPhase > 0) {
      setCurrentPhase((prev) => prev - 1)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return
    const deltaY = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0) goNext()
      else goPrev()
    }
    touchStartY.current = null
  }

  return (
    <div
      className="relative w-full h-screen bg-black overflow-hidden select-none"
      onClick={goNext}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Fondo degradado segun fase */}
      <div className="absolute inset-0 transition-all duration-700" style={{ background: phase.bg }} />

      {/* Degradado superior */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10" />
      {/* Degradado inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 to-transparent z-10" />

      {/* Etiqueta de fase + indicador de progreso */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 pointer-events-none">
        <div className="px-4 py-1 rounded-full border border-white/70 mb-6">
          <span className="text-sm font-bold text-white tracking-widest">{phase.label}</span>
        </div>
        <p className="text-white/85 text-center text-lg mb-6">{phase.description}</p>
        <div className="flex gap-2">
          {phases.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-8 rounded-full transition-all duration-300 ${
                index <= currentPhase ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
        {!isLast && <p className="text-white/50 text-sm mt-8 animate-pulse">Desliza para continuar</p>}
      </div>

      <TopBar />
      <SideActions />
      <BottomInfo />
      <BottomNav />

      {/* Boton continuar (aparece en ultima fase) */}
      {isLast && (
        <div className="absolute bottom-[70px] left-0 right-0 z-30 px-4 animate-in fade-in slide-in-from-bottom-4">
          <button
            onClick={(e) => {
              e.stopPropagation()
              router.push("/vsl")
            }}
            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-all"
          >
            Ver Como Lograrlo
          </button>
        </div>
      )}
    </div>
  )
}
