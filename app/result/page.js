"use client"

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function ResultContent() {
  const searchParams = useSearchParams();
  const prediction = searchParams.get("prediction");

  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!prediction || prediction === "N/A") {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg">No prediction found. Please go back and submit the form again.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Card className="max-w-lg mx-auto mt-10 shadow-lg">
        <CardHeader>
          <CardTitle>Analyzing Data</CardTitle>
          <CardDescription>Please wait while we process your information</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <Progress value={progress} className="w-[60%]" />
          <p className="mt-4 text-lg">Calculating credit rating...</p>
        </CardContent>
      </Card>
    );
  }

  const getRiskLevel = (rating) => {
    if (rating === "AAA/AA") return "Very Low";
    if (rating === "A") return "Low";
    if (rating === "BBB") return "Moderate";
    if (rating === "BB") return "High";
    return "Very High";
  };

  const getRatingDescription = (rating) => {
    if (rating === "AAA/AA") return "Exceptional credit rating with minimal risk.";
    if (rating === "A") return "Strong financial position with low risk.";
    if (rating === "BBB") return "Good credit standing with moderate risk.";
    if (rating === "BB") return "Fair credit rating with considerable risk.";
    return "High risk of default.";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen"
    >
      <Card className="max-w-lg mx-auto mt-10 shadow-xl">
        <CardHeader>
          <CardTitle>Credit Rating Result</CardTitle>
          <CardDescription>Based on the provided financial information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-6xl font-bold text-primary">{prediction}</div>
            <div className="text-2xl font-semibold mt-2">{getRiskLevel(prediction)}</div>
          </div>
          <div className="space-y-2">
            <p>
              <strong>Rating Description:</strong> {getRatingDescription(prediction)}
            </p>
            <p>
              <strong>Risk Level:</strong> {getRiskLevel(prediction)}
            </p>
            <p>
              <strong>Interpretation:</strong>{" "}
              {prediction === "AAA/AA"
                ? "This credit rating indicates an extremely strong financial position with minimal risk."
                : prediction === "A"
                ? "This credit rating suggests a strong financial standing with a low probability of default."
                : prediction === "BBB"
                ? "This credit rating suggests a moderate level of financial stability, with some risks."
                : prediction === "BB"
                ? "This credit rating indicates a fair standing but with noticeable risks in financial obligations."
                : "This credit rating suggests a high risk of default, requiring financial improvements."}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Result() {
  return (
    <Suspense fallback={<p className="text-lg text-center">Loading result...</p>}>
      <ResultContent />
    </Suspense>
  );
}

