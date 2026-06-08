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
  X,
} from "lucide-react"

type Comment = {
  user: string
  text: string
  likes: string
  time: string
}

const phases = [
  {
    id: 1,
    label: "ANTES",
    description: "Sin presencia definida",
    bg: "linear-gradient(to bottom, #1a1a2e, #16213e)",
    comments: [
      { user: "carlos_mendez", text: "Real, antes ni sabía qué ponerme 😅", likes: "1,204", time: "2 d" },
      { user: "andrea.lugo", text: "Me identifico full con esta etapa", likes: "892", time: "2 d" },
      { user: "jdrodriguez", text: "Así andaba yo, sin estilo definido", likes: "654", time: "1 d" },
      { user: "mariana_g", text: "El primer paso es reconocerlo 🙌", likes: "433", time: "1 d" },
      { user: "luismsoto", text: "Nadie nace sabiendo de estilo", likes: "321", time: "1 d" },
      { user: "valeria.cruz", text: "Esperando ver el después 👀", likes: "287", time: "23 h" },
      { user: "the_oscar", text: "Necesitaba ver esto hoy", likes: "199", time: "20 h" },
      { user: "fer_ramirez", text: "Tal cual mi situación ahora mismo", likes: "156", time: "18 h" },
      { user: "danny.style", text: "Empieza el viaje 🔥", likes: "98", time: "12 h" },
      { user: "pao_torres", text: "Vamos a transformar esto", likes: "54", time: "5 h" },
    ] as Comment[],
  },
  {
    id: 2,
    label: "PROCESO",
    description: "Descubriendo su identidad",
    bg: "linear-gradient(to bottom, #2d2d44, #1a1a2e)",
    comments: [
      { user: "alex_jimenez", text: "El proceso es lo más importante 💪", likes: "1,567", time: "3 d" },
      { user: "sofia.m", text: "Aquí es donde todo cambia", likes: "1,021", time: "2 d" },
      { user: "ricardo_p", text: "Paso a paso se construye la identidad", likes: "743", time: "2 d" },
      { user: "natalia.vega", text: "Me encanta ver la evolución 😍", likes: "512", time: "1 d" },
      { user: "kevin_dlc", text: "El detalle de las joyas marca la diferencia", likes: "389", time: "1 d" },
      { user: "isabela.r", text: "Qué buen acompañamiento dan", likes: "276", time: "22 h" },
      { user: "marco.aurelio", text: "Justo lo que estaba buscando", likes: "201", time: "19 h" },
      { user: "gaby_flores", text: "Esto sí es asesoría real 🙏", likes: "167", time: "15 h" },
      { user: "elmariano", text: "Confianza pura en el proceso", likes: "112", time: "9 h" },
      { user: "lucia.sanz", text: "Ya quiero llegar a esta etapa", likes: "67", time: "4 h" },
    ] as Comment[],
  },
  {
    id: 3,
    label: "DESPUES",
    description: "Presencia transformada",
    bg: "linear-gradient(to bottom, #1a2f1a, #0f1f0f)",
    comments: [
      { user: "diego_castro", text: "Brutal el cambio, otra persona 🔥🔥", likes: "2,341", time: "3 d" },
      { user: "camila.ortiz", text: "Wow, se nota la diferencia enorme", likes: "1,789", time: "2 d" },
      { user: "santiago_l", text: "La joya correcta lo cambia todo", likes: "1,203", time: "2 d" },
      { user: "renata.m", text: "Qué elegancia, me encanta 😍", likes: "876", time: "1 d" },
      { user: "pablo_ruiz", text: "Esto es presencia de verdad", likes: "654", time: "1 d" },
      { user: "antonella.v", text: "El glow up que necesitaba ver", likes: "498", time: "20 h" },
      { user: "joseignacio", text: "Increíble transformación 👏", likes: "342", time: "17 h" },
      { user: "melissa.q", text: "Se ve con mucha más autoridad", likes: "245", time: "13 h" },
      { user: "tomas_rev", text: "De verdad funciona, lo confirmo", likes: "178", time: "8 h" },
      { user: "carolina.h", text: "Necesito esta asesoría ya 🙌", likes: "89", time: "3 h" },
    ] as Comment[],
  },
  {
    id: 4,
    label: "IMPACTO",
    description: "Resultados en su vida",
    bg: "linear-gradient(to bottom, #2a2010, #1a1508)",
    comments: [
      { user: "emilio_vargas", text: "El impacto va más allá del look 💯", likes: "3,102", time: "4 d" },
      { user: "daniela.cano", text: "La confianza que da es impagable", likes: "2,456", time: "3 d" },
      { user: "raul_mtz", text: "Cambió cómo me ven en el trabajo", likes: "1,890", time: "2 d" },
      { user: "luciana.b", text: "Resultados reales, no es por gusto 🔥", likes: "1,344", time: "2 d" },
      { user: "andres_gil", text: "Mejor inversión en mi imagen", likes: "987", time: "1 d" },
      { user: "fernanda.r", text: "Es puro estilo, tal cual 👌", likes: "765", time: "1 d" },
      { user: "matias.lop", text: "La autoridad se siente al instante", likes: "543", time: "21 h" },
      { user: "valentina_s", text: "Imperial Golden nunca falla 🙏", likes: "398", time: "16 h" },
      { user: "gonzalo.p", text: "Lo recomiendo al 100%", likes: "234", time: "10 h" },
      { user: "rosa.delgado", text: "Quiero empezar mi transformación", likes: "121", time: "2 h" },
    ] as Comment[],
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

function SideActions({ onOpenComments }: { onOpenComments: () => void }) {
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

      <button
        onClick={(e) => {
          e.stopPropagation()
          onOpenComments()
        }}
        className="flex flex-col items-center gap-1"
      >
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

function CommentsPanel({
  comments,
  onClose,
}: {
  comments: Comment[]
  onClose: () => void
}) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative bg-[#1c1c1e] rounded-t-2xl max-h-[72%] flex flex-col animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-zinc-600" />
        </div>
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
          <span className="text-white font-semibold">{comments.length} comentarios</span>
          <button onClick={onClose} aria-label="Cerrar comentarios" className="text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2">
          {comments.map((c, i) => (
            <div key={i} className="flex gap-3 py-3">
              <div className="w-9 h-9 rounded-full bg-zinc-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400 text-xs">{c.user}</span>
                  <span className="text-zinc-500 text-xs">{c.time}</span>
                </div>
                <p className="text-white text-sm mt-0.5 break-words">{c.text}</p>
                <button className="text-zinc-500 text-xs font-semibold mt-1">Responder</button>
              </div>
              <button className="flex flex-col items-center gap-0.5 shrink-0">
                <Heart className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-400 text-[10px]">{c.likes}</span>
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 px-4 py-3 border-t border-zinc-800">
          <div className="w-8 h-8 rounded-full bg-white overflow-hidden shrink-0">
            <Image src="/igs-logo.jpeg" alt="Tu perfil" width={32} height={32} className="object-cover" />
          </div>
          <div className="flex-1 bg-zinc-800 rounded-full px-4 py-2">
            <span className="text-zinc-500 text-sm">Agrega un comentario...</span>
          </div>
        </div>
      </div>
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
  const [commentsOpen, setCommentsOpen] = useState(false)
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
    if (commentsOpen) return
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (commentsOpen) return
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
      onClick={() => {
        if (!commentsOpen) goNext()
      }}
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
      <SideActions onOpenComments={() => setCommentsOpen(true)} />
      <BottomInfo />
      <BottomNav />

      {commentsOpen && (
        <CommentsPanel comments={phase.comments} onClose={() => setCommentsOpen(false)} />
      )}

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
