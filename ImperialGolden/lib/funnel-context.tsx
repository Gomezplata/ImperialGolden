"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type FunnelStep = 
  | "llamada"
  | "scanner"
  | "quiz"
  | "archivo"
  | "whatsapp-post"
  | "login"
  | "videos"
  | "objeciones"
  | "ventas"

interface FunnelContextType {
  currentStep: FunnelStep
  setCurrentStep: (step: FunnelStep) => void
  quizResult: string | null
  setQuizResult: (result: string) => void
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void
}

const FunnelContext = createContext<FunnelContextType | undefined>(undefined)

export function FunnelProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<FunnelStep>("llamada")
  const [quizResult, setQuizResult] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <FunnelContext.Provider value={{
      currentStep,
      setCurrentStep,
      quizResult,
      setQuizResult,
      isAuthenticated,
      setIsAuthenticated
    }}>
      {children}
    </FunnelContext.Provider>
  )
}

export function useFunnel() {
  const context = useContext(FunnelContext)
  if (!context) {
    throw new Error("useFunnel must be used within a FunnelProvider")
  }
  return context
}
