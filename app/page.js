// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronLeft, ChevronRight, HelpCircle } from "lucide-react"
// import { Button } from "../components/ui/button"
// import { Input } from "../components/ui/input"
// import { Label } from "../components/ui/label"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"

// const steps = [
//   { title: "Company Information", fields: ["CIK", "Binary Rating", "SIC Code"] },
//   { title: "Financial Ratios", fields: ["Current Ratio", "Long-term Debt / Capital", "Debt/Equity Ratio"] },
//   { title: "Profitability Margins", fields: ["Gross Margin", "Operating Margin", "EBIT Margin", "EBITDA Margin"] },
//   { title: "Profit Margins", fields: ["Pre-Tax Profit Margin", "Net Profit Margin"] },
//   {
//     title: "Performance Metrics",
//     fields: [
//       "Asset Turnover",
//       "ROE (Return on Equity)",
//       "Return on Tangible Equity",
//       "ROA (Return on Assets)",
//       "ROI (Return on Investment)",
//     ],
//   },
//   { title: "Cash Flow Metrics", fields: ["Operating Cash Flow Per Share", "Free Cash Flow Per Share"] },
// ]

// const tooltips = {
//   CIK: "Central Index Key, a unique identifier assigned by the SEC",
//   "Binary Rating": "1 for investment grade, 0 for non-investment grade",
//   "SIC Code": "Standard Industrial Classification code",
//   "Current Ratio": "Current assets divided by current liabilities",
//   "Long-term Debt / Capital": "Long-term debt divided by total capital",
//   "Debt/Equity Ratio": "Total liabilities divided by shareholders' equity",
//   "Gross Margin": "Gross profit divided by revenue",
//   "Operating Margin": "Operating income divided by revenue",
//   "EBIT Margin": "Earnings Before Interest and Taxes divided by revenue",
//   "EBITDA Margin": "Earnings Before Interest, Taxes, Depreciation, and Amortization divided by revenue",
//   "Pre-Tax Profit Margin": "Earnings before taxes divided by revenue",
//   "Net Profit Margin": "Net income divided by revenue",
//   "Asset Turnover": "Revenue divided by average total assets",
//   "ROE (Return on Equity)": "Net income divided by shareholders' equity",
//   "Return on Tangible Equity": "Net income divided by tangible equity",
//   "ROA (Return on Assets)": "Net income divided by average total assets",
//   "ROI (Return on Investment)": "Net income divided by total investment",
//   "Operating Cash Flow Per Share": "Operating cash flow divided by number of outstanding shares",
//   "Free Cash Flow Per Share": "Free cash flow divided by number of outstanding shares",
// }

// const fieldMappings = {
//   "CIK": "cik",
//   "Binary Rating": "binary_rating",
//   "SIC Code": "sic_code",
//   "Current Ratio": "current_ratio",
//   "Long-term Debt / Capital": "long_term_debt_capital",
//   "Debt/Equity Ratio": "debt_equity_ratio",
//   "Gross Margin": "gross_margin",
//   "Operating Margin": "operating_margin",
//   "EBIT Margin": "ebit_margin",
//   "EBITDA Margin": "ebitda_margin",
//   "Pre-Tax Profit Margin": "pre_tax_profit_margin",
//   "Net Profit Margin": "net_profit_margin",
//   "Asset Turnover": "asset_turnover",
//   "ROE (Return on Equity)": "roe",
//   "Return on Tangible Equity": "return_on_tangible_equity",
//   "ROA (Return on Assets)": "roa",
//   "ROI (Return on Investment)": "roi",
//   "Operating Cash Flow Per Share": "operating_cash_flow_per_share",
//   "Free Cash Flow Per Share": "free_cash_flow_per_share"
// }

// export default function CreditRatingCalculator() {
//   const [currentStep, setCurrentStep] = useState(0)
//   const [formData, setFormData] = useState({})
//   const router = useRouter()

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [fieldMappings[field]]: value }))
//   }

//   const nextStep = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep((prev) => prev + 1)
//     }
//   }

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prev) => prev - 1)
//     }
//   }

//   const handleSubmit = () => {
//     const queryParams = new URLSearchParams(formData).toString()
//     router.push(`/summary?${queryParams}`)
//   }

//   return (
//     <div>
//       <div className="bg-gray-800 py-5 shadow-2xl">
//         <h1 className="text-3xl font-poppins font-bold text-white text-center">Corporate Credit Rating Calculator</h1>
//       </div>
//       <div className="max-w-2xl mx-auto p-6 space-y-8 shadow-lg mt-10 rounded">
//         {/* <h1 className="text-3xl font-bold text-center">Corporate Credit Rating Calculator</h1> */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentStep}
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -50 }}
//             transition={{ duration: 0.3 }}
//           >
//             {currentStep < steps.length ? (
//               <>
//                 <h2 className="text-2xl font-semibold mb-4">{steps[currentStep].title}</h2>
//                 <div className="space-y-4">
//                   {steps[currentStep].fields.map((field) => (
//                     <div key={field} className="space-y-2">
//                       <div className="flex items-center space-x-2">
//                         <Label htmlFor={field}>{field}</Label>
//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger>
//                               <HelpCircle className="h-4 w-4 text-muted-foreground" />
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>{tooltips[field]}</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>
//                       </div>
//                       <Input
//                         id={field}
//                         type="number"
//                         step="any"
//                         value={formData[fieldMappings[field]] || ""}
//                         onChange={(e) => handleInputChange(field, e.target.value)}
//                         placeholder={`Enter ${field}`}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <Button onClick={handleSubmit}>Submit</Button>
//             )}
//           </motion.div>
//         </AnimatePresence>
//         <div className="flex justify-between mt-8">
//           <Button onClick={prevStep} disabled={currentStep === 0}>
//             <ChevronLeft className="mr-2 h-4 w-4" /> Previous
//           </Button>
//           <Button onClick={nextStep} disabled={currentStep === steps.length}>
//             {currentStep === steps.length ? "Submit" : "Next"} <ChevronRight className="ml-2 h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, HelpCircle } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"

const steps = [
  { title: "Company Information", fields: ["CIK", "Binary Rating", "SIC Code"] },
  { title: "Financial Ratios", fields: ["Current Ratio", "Long-term Debt / Capital", "Debt/Equity Ratio"] },
  { title: "Profitability Margins", fields: ["Gross Margin", "Operating Margin", "EBIT Margin", "EBITDA Margin"] },
  { title: "Profit Margins", fields: ["Pre-Tax Profit Margin", "Net Profit Margin"] },
  {
    title: "Performance Metrics",
    fields: [
      "Asset Turnover",
      "ROE (Return on Equity)",
      "Return on Tangible Equity",
      "ROA (Return on Assets)",
      "ROI (Return on Investment)",
    ],
  },
  { title: "Cash Flow Metrics", fields: ["Operating Cash Flow Per Share", "Free Cash Flow Per Share"] },
]

const tooltips = {
  CIK: "Central Index Key, a unique identifier assigned by the SEC",
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

  return (
    <div>
      <div className="bg-gray-800 py-5 shadow-2xl">
        <h1 className="text-3xl font-poppins font-bold text-white text-center">Corporate Credit Rating Calculator</h1>
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
            <h2 className="text-2xl font-semibold mb-4">{steps[currentStep].title}</h2>
            <div className="space-y-4">
              {steps[currentStep].fields.map((field) => (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>{field}</Label>
                  <Input
                    id={field}
                    type="number"
                    step="any"
                    value={formData[fieldMappings[field]] || ""}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
            </div>
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
  )
}
