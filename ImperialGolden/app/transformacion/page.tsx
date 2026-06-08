"use client"

import { useRouter } from "next/navigation"
import TransformationFeed from "@/components/funnel/transformation-feed"

export default function TransformacionPage() {
  const router = useRouter()

  return <TransformationFeed onContinue={() => router.push("/vsl")} />
}
