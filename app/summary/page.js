"use client"

const API_URL = "https://corporate-credit-rating-model.onrender.com/predict";

import { useSearchParams, useRouter } from "next/navigation"
import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

function SummaryContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const formData = Object.fromEntries(searchParams.entries())

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGetRating = async () => {
    setIsLoading(true)
    setError(null)

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        //   const response = await fetch("http://127.0.0.1:5000/predict", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(formData),
        //   })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        const prediction = data.prediction || "N/A"

        // Redirect to result page with prediction
        router.push(`/result?prediction=${encodeURIComponent(prediction)}`)
    } catch (error) {
        console.error("Prediction error:", error)
        setError("Failed to get prediction. Please try again.")
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Summary</h1>
      <ScrollArea className="h-[400px] rounded-md border p-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="flex justify-between py-2 border-b last:border-b-0">
            <span className="font-medium">{key}:</span>
            <span>{value}</span>
          </div>
        ))}
      </ScrollArea>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex justify-between mt-8">
        <Button onClick={() => router.push("/")} variant="outline">Edit Inputs</Button>
        <Button onClick={handleGetRating} disabled={isLoading}>
          {isLoading ? "Processing..." : "Get Rating"}
        </Button>
      </div>
    </div>
  )
}

export default function Summary() {
    return (
      <Suspense fallback={<p className="text-lg text-center">Loading summary...</p>}>
        <SummaryContent />
      </Suspense>
    );
  }