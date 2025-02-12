"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, HelpCircle, Info } from "lucide-react"
import { Button } from "../components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"

const steps = [
  {
    title: "Company Information",
    fields: [
      { name: "CIK", type: "text", placeholder: "e.g., 0001018724" },
      { name: "Binary Rating", type: "select", options: ["0 - Non-Investment Grade", "1 - Investment Grade"] },
      { name: "SIC Code", type: "text", placeholder: "e.g., 7370" },
    ],
  },
  {
    title: "Financial Ratios",
    fields: [
      { name: "Current Ratio", type: "number", placeholder: "e.g., 1.5" },
      { name: "Long-term Debt / Capital", type: "number", placeholder: "e.g., 0.4" },
      { name: "Debt/Equity Ratio", type: "number", placeholder: "e.g., 1.2" },
    ],
  },
  {
    title: "Profitability Margins",
    fields: [
      { name: "Gross Margin", type: "number", placeholder: "e.g., 40.5" },
      { name: "Operating Margin", type: "number", placeholder: "e.g., 15.2" },
      { name: "EBIT Margin", type: "number", placeholder: "e.g., 14.8" },
      { name: "EBITDA Margin", type: "number", placeholder: "e.g., 20.3" },
    ],
  },
  {
    title: "Profit Margins",
    fields: [
      { name: "Pre-Tax Profit Margin", type: "number", placeholder: "e.g., 13.5" },
      { name: "Net Profit Margin", type: "number", placeholder: "e.g., 10.2" },
    ],
  },
  {
    title: "Performance Metrics",
    fields: [
      { name: "Asset Turnover", type: "number", placeholder: "e.g., 0.8" },
      { name: "ROE (Return on Equity)", type: "number", placeholder: "e.g., 15.5" },
      { name: "Return on Tangible Equity", type: "number", placeholder: "e.g., 18.2" },
      { name: "ROA (Return on Assets)", type: "number", placeholder: "e.g., 7.3" },
      { name: "ROI (Return on Investment)", type: "number", placeholder: "e.g., 12.1" },
    ],
  },
  {
    title: "Cash Flow Metrics",
    fields: [
      { name: "Operating Cash Flow Per Share", type: "number", placeholder: "e.g., 5.2" },
      { name: "Free Cash Flow Per Share", type: "number", placeholder: "e.g., 3.8" },
    ],
  },
]

const tooltips = {
  "CIK": "Central Index Key, a unique identifier assigned by the SEC",
  "Binary Rating": "1 for investment grade, 0 for non-investment grade",
  "SIC Code": "Standard Industrial Classification code",
  "Current Ratio": "Current assets divided by current liabilities",
  "Long-term Debt / Capital": "Long-term debt divided by total capital",
  "Debt/Equity Ratio": "Total liabilities divided by shareholders' equity",
  "Gross Margin": "Gross profit divided by revenue",
  "Operating Margin": "Operating income divided by revenue",
  "EBIT Margin": "Earnings Before Interest and Taxes divided by revenue",
  "EBITDA Margin": "Earnings Before Interest, Taxes, Depreciation, and Amortization divided by revenue",
  "Pre-Tax Profit Margin": "Earnings before taxes divided by revenue",
  "Net Profit Margin": "Net income divided by revenue",
  "Asset Turnover": "Revenue divided by average total assets",
  "ROE (Return on Equity)": "Net income divided by shareholders' equity",
  "Return on Tangible Equity": "Net income divided by tangible equity",
  "ROA (Return on Assets)": "Net income divided by average total assets",
  "ROI (Return on Investment)": "Net income divided by total investment",
  "Operating Cash Flow Per Share": "Operating cash flow divided by number of outstanding shares",
  "Free Cash Flow Per Share": "Free cash flow divided by number of outstanding shares",
}

const fieldMappings = {
  "CIK": "cik",
  "Binary Rating": "binary_rating",
  "SIC Code": "sic_code",
  "Current Ratio": "current_ratio",
  "Long-term Debt / Capital": "long_term_debt_capital",
  "Debt/Equity Ratio": "debt_equity_ratio",
  "Gross Margin": "gross_margin",
  "Operating Margin": "operating_margin",
  "EBIT Margin": "ebit_margin",
  "EBITDA Margin": "ebitda_margin",
  "Pre-Tax Profit Margin": "pre_tax_profit_margin",
  "Net Profit Margin": "net_profit_margin",
  "Asset Turnover": "asset_turnover",
  "ROE (Return on Equity)": "roe",
  "Return on Tangible Equity": "return_on_tangible_equity",
  "ROA (Return on Assets)": "roa",
  "ROI (Return on Investment)": "roi",
  "Operating Cash Flow Per Share": "operating_cash_flow_per_share",
  "Free Cash Flow Per Share": "free_cash_flow_per_share"
}

export default function CreditRatingCalculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const router = useRouter()

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [fieldMappings[field]]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    const queryParams = new URLSearchParams(formData).toString()
    router.push(`/summary?${queryParams}`)
  }

  const progress = ((currentStep + 1) / (steps.length + 1)) * 100

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Corporate Credit Rating Calculator</h1>
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Important Note</AlertTitle>
        <AlertDescription>
          This calculator provides an estimate based on the input data. For accurate and official credit ratings, please
          consult with professional rating agencies.
        </AlertDescription>
      </Alert>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-foreground bg-primary">
              Step {currentStep + 1} of {steps.length + 1}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-primary">{Math.round(progress)}% Complete</span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/20">
          <motion.div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-8 shadow-lg mt-10 rounded">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep < steps.length ? (
            <Card>
              <CardHeader>
                <CardTitle>{steps[currentStep].title}</CardTitle>
                <CardDescription>Please enter the following financial information:</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps[currentStep].fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={field.name}>{field.name}</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{tooltips[field.name]}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id={field.name}
                        type="number"
                        step="any"
                        value={formData[fieldMappings[field.name]] || ""}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={`Enter ${field.name}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Summary formData={formData} onEdit={() => setCurrentStep(0)} onSubmit={handleSubmit} />
          )}
            {currentStep === steps.length - 1 && (
              <div className="flex justify-between mt-8">
                <Button onClick={prevStep}>Previous</Button>
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between mt-8">
          <Button className={(currentStep === 0 || currentStep === steps.length - 1) ? 'hidden' : ''} onClick={prevStep} disabled={currentStep === 0 && currentStep === steps.length - 1}>Previous</Button>
          <Button className={currentStep === steps.length - 1 ? 'hidden' : ''} onClick={nextStep} disabled={currentStep === steps.length - 1}>Next</Button>
        </div>
      </div>
    </div>
  </div>  
  )
}
