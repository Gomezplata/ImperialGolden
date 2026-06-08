"use client"

import { useState } from "react"
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
  Glasses,
  ChevronUp,
} from "lucide-react"

interface TransformationFeedProps {
  onContinue: () => void
}

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

function SideAction({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode
  label?: string
  onClick?: () => void
  active?: boolean
}) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1">
      <div className={active ? "text-red-500" : "text-white"}>{icon}</div>
      {label && <span className="text-white text-xs font-semibold">{label}</span>}
    </button>
  )
}

function SideActions() {
  const [liked, setLiked] = useState(false)
  return (
    <div className="absolute right-3 bottom-36 z-20 flex flex-col items-center gap-5">
      <SideAction
        icon={
          <Heart
            className="w-8 h-8 drop-shadow-lg"
            fill={liked ? "currentColor" : "none"}
            strokeWidth={2}
          />
        }
        label="51K"
        active={liked}
        onClick={(e: any) => {
          e?.stopPropagation?.()
          setLiked((v) => !v)
        }}
      />
      <SideAction
        icon={<MessageCircle className="w-8 h-8 drop-shadow-lg -scale-x-100" strokeWidth={2} />}
        label="387"
      />
      <SideAction
        icon={<Repeat2 className="w-8 h-8 drop-shadow-lg" strokeWidth={2} />}
        label="434"
      />
      <SideAction
        icon={<Send className="w-8 h-8 drop-shadow-lg" strokeWidth={2} />}
        label="5,371"
      />
      <SideAction icon={<MoreHorizontal className="w-7 h-7 drop-shadow-lg" strokeWidth={2.5} />} />
    </div>
  )
}

function BottomInfo({ onContinue }: { onContinue: () => void }) {
  const [following, setFollowing] = useState(false)
  return (
    <div className="absolute bottom-[60px] left-0 right-0 z-20 px-3 pb-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center overflow-hidden">
          <Image src="/igs-logo.png" alt="Perfil" width={32} height={32} className="object-cover" />
        </div>
        <span className="text-white text-sm font-semibold">keno.rdz and jesyy.ai</span>
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

      <div className="flex items-center gap-1.5 mb-2">
        <Glasses className="w-4 h-4 text-white/80" />
        <span className="text-white/80 text-xs">Ray-Ban Meta glasses</span>
      </div>

      <p className="text-white text-sm pr-12 leading-relaxed">
        No es por gusto, es puro estilo
      </p>
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
      <div className="w-7 h-7 rounded-md bg-zinc-500 overflow-hidden">
        <Image src="/placeholder-user.jpg" alt="Tu perfil" width={28} height={28} className="object-cover" />
      </div>
    </div>
  )
}

export default function TransformationFeed({ onContinue }: TransformationFeedProps) {
  const [showContinue, setShowContinue] = useState(false)

  return (
    <div
      className="relative w-full h-screen bg-black overflow-hidden select-none"
      onClick={() => setShowContinue(true)}
    >
      {/* Video / imagen de fondo */}
      <Image
        src="/reel-cocina.png"
        alt="Reel de restaurante"
        fill
        priority
        className="object-cover"
      />

      {/* Degradado superior */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10" />
      {/* Degradado inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 to-transparent z-10" />

      <TopBar />
      <SideActions />
      <BottomInfo onContinue={onContinue} />
      <BottomNav />

      {/* Continuar al siguiente paso del funnel */}
      {showContinue && (
        <div className="absolute inset-x-0 bottom-[70px] z-30 px-4 animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onContinue()
            }}
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <ChevronUp className="w-4 h-4" />
            Continuar
          </button>
        </div>
      )}
    </div>
  )
}
