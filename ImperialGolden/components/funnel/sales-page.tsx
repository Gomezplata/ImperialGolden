"use client"

import { useState } from "react"
import { Check, ChevronDown, ChevronUp, Crown, Gem, Star, Shield, Sparkles, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const collections = [
  { id: "lider", name: "Coleccion Lider", icon: Crown },
  { id: "visionario", name: "Coleccion Visionario", icon: Eye },
  { id: "elegante", name: "Coleccion Elegante", icon: Gem },
  { id: "ambicioso", name: "Coleccion Ambicioso", icon: Star },
  { id: "disciplinado", name: "Coleccion Disciplinado", icon: Shield },
  { id: "influyente", name: "Coleccion Influyente", icon: Sparkles },
]

const faqs = [
  {
    q: "Que materiales utilizan?",
    a: "Trabajamos con Oro Laminado 18K, Plata Genuina Ley 925 y Oro 18 Kilates. Cada pieza esta disenada para conservar presencia y elegancia."
  },
  {
    q: "Cuanto tiempo dura el bano de oro?",
    a: "La duracion depende del cuidado personal. Con los cuidados adecuados, las piezas pueden acompanarte durante anos."
  },
  {
    q: "Tienen garantia?",
    a: "Si, todas nuestras piezas cuentan con garantia de respaldo. Queremos que decidas con certeza."
  },
  {
    q: "Como es el proceso de envio?",
    a: "Realizamos envios a todo el pais. Cada pieza se empaca de forma premium para garantizar que llegue en perfectas condiciones."
  },
  {
    q: "Puedo devolver mi compra?",
    a: "Ofrecemos politica de devolucion. Tu satisfaccion es nuestra prioridad."
  }
]

function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl text-center">
        <p className="text-xs tracking-[0.3em] text-primary uppercase mb-8">
          Nueva Identidad
        </p>
        
        <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-6 text-balance">
          LA MAYORIA DE LAS PERSONAS TRABAJAN DURAMENTE PARA CONVERTIRSE EN ALGUIEN MEJOR...
        </h1>
        
        <p className="text-xl md:text-2xl text-primary font-medium mb-8">
          PERO SU IMAGEN SIGUE PRESENTANDO UNA VERSION ANTIGUA DE ELLOS.
        </p>
        
        <p className="text-muted-foreground leading-relaxed mb-12 max-w-lg mx-auto">
          Descubre como proyectar presencia, elegancia y autoridad sin pagar precios absurdos por lujo tradicional.
        </p>

        <Button 
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-6 text-base tracking-wider"
          onClick={() => document.getElementById("colecciones")?.scrollIntoView({ behavior: "smooth" })}
        >
          ELIGE TU PIEZA
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  )
}

function Apertura() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-xl mx-auto space-y-6 text-center">
        <p className="text-muted-foreground">Has invertido tiempo.</p>
        <p className="text-muted-foreground">Has trabajado.</p>
        <p className="text-muted-foreground">Has crecido.</p>
        <p className="text-muted-foreground">Has aprendido.</p>
        
        <div className="py-8">
          <p className="text-lg text-foreground font-medium">
            Pero existe una pregunta incomoda:
          </p>
          <p className="text-2xl text-primary font-bold mt-4">
            Tu imagen comunica todo eso?
          </p>
        </div>

        <div className="space-y-4 text-muted-foreground">
          <p>Porque el mundo no puede ver tu disciplina.</p>
          <p>No puede ver tus sacrificios.</p>
          <p>No puede ver tus metas.</p>
          <p className="text-foreground pt-4">
            Solo puede interpretar las senales visibles que proyectas.
          </p>
        </div>
      </div>
    </section>
  )
}

function Villano() {
  return (
    <section className="py-20 px-6 bg-card">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] text-primary uppercase mb-6">
          El Problema
        </p>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          La Invisibilidad Social
        </h2>

        <div className="space-y-4 text-muted-foreground">
          <p>La condicion donde una persona tiene valor...</p>
          <p className="text-foreground font-medium">pero su imagen no logra comunicarlo.</p>
        </div>

        <div className="mt-12 space-y-3">
          <p className="text-muted-foreground">No es falta de talento.</p>
          <p className="text-muted-foreground">No es falta de capacidad.</p>
          <p className="text-primary font-medium pt-4">Es falta de presencia visual.</p>
        </div>
      </div>
    </section>
  )
}

function Revelacion() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] text-primary uppercase mb-6">
          La Realidad
        </p>

        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Las personas crean percepciones en segundos
        </h2>

        <div className="space-y-4 text-muted-foreground">
          <p>Antes de escuchar tu historia.</p>
          <p>Antes de conocer tus logros.</p>
          <p>Antes de saber quien eres.</p>
        </div>

        <p className="text-foreground font-medium mt-12">
          Y esas percepciones nacen de pequenos detalles.
        </p>
      </div>
    </section>
  )
}

function Mecanismo() {
  const simbolos = [
    "Elegancia",
    "Disciplina",
    "Ambicion",
    "Autoridad",
    "Confianza"
  ]

  return (
    <section className="py-20 px-6 bg-card">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] text-primary uppercase mb-6">
          El Mecanismo
        </p>

        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          La identidad se comunica mediante simbolos
        </h2>

        <p className="text-muted-foreground mb-12">
          Los simbolos correctos transmiten:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {simbolos.map((simbolo, i) => (
            <Card key={i} className="bg-background border-border p-4">
              <p className="text-foreground font-medium">{simbolo}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ComoFunciona() {
  const materiales = [
    "Oro Laminado 18K",
    "Plata Genuina Ley 925",
    "Oro 18 Kilates"
  ]

  const beneficios = [
    "Presencia",
    "Sofisticacion",
    "Versatilidad",
    "Durabilidad"
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-primary uppercase mb-6 text-center">
          Como Funciona
        </p>

        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
          Materiales Premium
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-muted-foreground mb-4">Disponibles en:</p>
            <div className="space-y-3">
              {materiales.map((mat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-foreground">{mat}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-muted-foreground mb-4">Beneficios:</p>
            <div className="space-y-3">
              {beneficios.map((ben, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{ben}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Prueba() {
  const pruebas = [
    "Fotografias reales",
    "Videos reales",
    "Acabados detallados",
    "Materiales certificados",
    "Garantia de respaldo"
  ]

  return (
    <section className="py-20 px-6 bg-card">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] text-primary uppercase mb-6">
          Prueba Social
        </p>

        <h2 className="text-2xl md:text-3xl font-bold mb-12">
          Transparencia Total
        </h2>

        <div className="space-y-4">
          {pruebas.map((prueba, i) => (
            <div key={i} className="flex items-center justify-center gap-3">
              <Check className="w-5 h-5 text-primary" />
              <span className="text-foreground">{prueba}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Colecciones() {
  return (
    <section id="colecciones" className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-primary uppercase mb-6 text-center">
          Oferta
        </p>

        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Elige Tu Coleccion
        </h2>

        <p className="text-muted-foreground text-center mb-12">
          Cada coleccion esta disenada para una identidad unica
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {collections.map((col) => {
            const Icon = col.icon
            return (
              <Card 
                key={col.id}
                className="bg-card border-border hover:border-primary/50 transition-colors p-6 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{col.name}</h3>
                    <p className="text-sm text-muted-foreground">Ver piezas</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-6 bg-card">
      <div className="max-w-xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-primary uppercase mb-6 text-center">
          Preguntas Frecuentes
        </p>

        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
          Resolvemos tus dudas
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i} className="bg-background border-border overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <span className="font-medium text-foreground">{faq.q}</span>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTAFinal() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-2xl font-bold mb-6">
          Tu evolucion ya comenzo.
        </p>

        <p className="text-muted-foreground mb-4">La pregunta es:</p>
        
        <p className="text-lg text-foreground mb-2">
          Tu imagen va a seguir viviendo en el pasado?
        </p>
        
        <p className="text-muted-foreground mb-2">O...</p>
        
        <p className="text-lg text-primary font-medium mb-12">
          Vas a proyectar la persona en la que te has convertido?
        </p>

        <div className="space-y-4">
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-6 text-base tracking-wider"
            onClick={() => document.getElementById("colecciones")?.scrollIntoView({ behavior: "smooth" })}
          >
            ELIGE TU PIEZA
          </Button>
          
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Asume tu presencia
          </p>
          
          <p className="text-primary font-bold tracking-wider">
            ACTIVA TU NUEVA IDENTIDAD
          </p>
        </div>
      </div>
    </section>
  )
}

function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border z-50">
      <Button 
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base tracking-wider"
        onClick={() => document.getElementById("colecciones")?.scrollIntoView({ behavior: "smooth" })}
      >
        ELIGE TU PIEZA
      </Button>
    </div>
  )
}

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Hero />
      <Apertura />
      <Villano />
      <Revelacion />
      <Mecanismo />
      <ComoFunciona />
      <Prueba />
      <Colecciones />
      <FAQ />
      <CTAFinal />
      <StickyCTA />
    </div>
  )
}
