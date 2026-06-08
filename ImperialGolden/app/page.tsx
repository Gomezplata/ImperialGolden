"use client"

import { useState } from "react"
import IncomingCall from "@/components/funnel/incoming-call"
import PresenceScanner from "@/components/funnel/presence-scanner"
import IdentityQuiz from "@/components/funnel/identity-quiz"
import TransformationFeed from "@/components/funnel/transformation-feed"
import WhatsappPostVSL from "@/components/funnel/whatsapp-post-vsl"
import PrivateLogin from "@/components/funnel/private-login"
import SecretVideos from "@/components/funnel/secret-videos"
import ObjectionsWhatsapp from "@/components/funnel/objections-whatsapp"
import SalesPage from "@/components/funnel/sales-page"

type FunnelStep = 
  | "llamada"
  | "scanner"
  | "quiz"
  | "archivo"
  | "whatsapp-post"
  | "login"
  | "videos"
  | "objeciones"
  | "ventas"

export default function FunnelPage() {
  const [currentStep, setCurrentStep] = useState<FunnelStep>("llamada")
  const [, setQuizResult] = useState<string | null>(null)

  const handleQuizComplete = (result: string) => {
    setQuizResult(result)
    setCurrentStep("archivo")
  }

  switch (currentStep) {
    case "llamada":
      return <IncomingCall onContinue={() => setCurrentStep("scanner")} />
    
    case "scanner":
      return <PresenceScanner onContinue={() => setCurrentStep("quiz")} />
    
    case "quiz":
      return <IdentityQuiz onContinue={handleQuizComplete} />
    
    case "archivo":
      return <TransformationFeed onContinue={() => setCurrentStep("whatsapp-post")} />
    
    case "whatsapp-post":
      return <WhatsappPostVSL onContinue={() => setCurrentStep("login")} />
    
    case "login":
      return <PrivateLogin onContinue={() => setCurrentStep("videos")} />
    
    case "videos":
      return <SecretVideos onContinue={() => setCurrentStep("objeciones")} />
    
    case "objeciones":
      return <ObjectionsWhatsapp onContinue={() => setCurrentStep("ventas")} />
    
    case "ventas":
      return <SalesPage />
    
    default:
      return <IncomingCall onContinue={() => setCurrentStep("scanner")} />
  }
}
