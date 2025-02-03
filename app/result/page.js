"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function Result() {
  const searchParams = useSearchParams()
  const prediction = searchParams.get("prediction")

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!prediction || prediction === "N/A") {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg">No prediction found. Please go back and submit the form again.</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-4 text-lg">Calculating credit rating...</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-4"
    >
      <h2 className="text-2xl font-semibold">Credit Rating Result</h2>
      <div className="text-6xl font-bold text-primary">{prediction}</div>
      <p className="text-lg">
        {prediction === "AAA/AA"
          ? "Excellent credit rating. Extremely low risk."
          : prediction === "A"
          ? "Strong credit rating. Low risk of default."
          : prediction === "BBB"
          ? "Good credit rating. Moderate risk."
          : prediction === "BB"
          ? "Fair credit rating. Considerable risk."
          : "High risk of default."}
      </p>
    </motion.div>
  )
}
