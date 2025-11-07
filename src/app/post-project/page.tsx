"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Check, Network } from "lucide-react"
import { useRouter } from "next/navigation"
import { ChainSelector } from "@/components/crosschain/ChainSelector"
import { useWdkNetwork } from "@/hooks/scaffold-eth/useWdkNetwork"
import { useCrossChain } from "@/hooks/useCrossChain"
import { motion } from "framer-motion"

export default function PostProjectPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isCrossChain, setIsCrossChain] = useState(false)
  const [destinationChainId, setDestinationChainId] = useState<number | null>(null)
  const router = useRouter()
  const { chainId } = useWdkNetwork()
  const { createCrossChainProject, isCrossChainLoading } = useCrossChain()
  const totalSteps = 4

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      if (isCrossChain && destinationChainId) {
        // TODO: Implement real cross-chain project creation
        // const title = (document.getElementById("title") as HTMLInputElement)?.value
        // const description = (document.getElementById("description") as HTMLTextAreaElement)?.value
        // const budget = (document.getElementById("budget") as HTMLInputElement)?.value
        // const deadline = // calcular deadline
        // await createCrossChainProject(...)
        alert(`Cross-chain project will be created on chain ${destinationChainId}! (Demo Mode)`)
      } else {
        alert("Project posted successfully! (Demo Mode)")
      }
      router.push("/")
    } catch (error) {
      console.error("Error posting project:", error)
      alert("Error posting project. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
            <div>
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" placeholder="e.g., Build a mobile app" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea 
                id="description"
                className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Describe your project in detail..."
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <select id="category" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                <option>Web Development</option>
                <option>Mobile Development</option>
                <option>Design</option>
                <option>Writing</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Skills Required</h2>
            <div>
              <Label>Required Skills</Label>
              <Input placeholder="e.g., React, Node.js, TypeScript" />
              <p className="text-sm text-gray-500 mt-2">Separate skills with commas</p>
            </div>
            <div>
              <Label htmlFor="experience">Experience Level</Label>
              <select id="experience" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                <option>Entry Level</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </select>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Budget & Timeline</h2>
            <div>
              <Label htmlFor="budget">Budget (AVAX)</Label>
              <Input id="budget" type="number" placeholder="e.g., 10" step="0.01" />
            </div>
            <div>
              <Label htmlFor="budgetType">Budget Type</Label>
              <select id="budgetType" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                <option>Fixed Price</option>
                <option>Hourly Rate</option>
              </select>
            </div>
            <div>
              <Label htmlFor="duration">Project Duration</Label>
              <select id="duration" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                <option>Less than 1 month</option>
                <option>1-3 months</option>
                <option>3-6 months</option>
                <option>More than 6 months</option>
              </select>
            </div>
            
            {/* Cross-Chain Option */}
            <div className="pt-4 border-t">
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="checkbox"
                  id="crossChain"
                  checked={isCrossChain}
                  onChange={(e) => setIsCrossChain(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <Label htmlFor="crossChain" className="flex items-center gap-2 cursor-pointer">
                  <Network className="h-4 w-4" />
                  Create as Cross-Chain Project
                </Label>
              </div>
              {isCrossChain && (
                <div className="mt-3 p-4 bg-blue-50 rounded-md border border-blue-200">
                  <p className="text-sm text-blue-800 mb-3">
                    This project will be created on multiple Avalanche blockchains, allowing freelancers from different chains to participate.
                  </p>
                  <ChainSelector
                    selectedChainId={destinationChainId}
                    onChainSelect={setDestinationChainId}
                    label="Select Destination Chain"
                    currentChainId={chainId || undefined}
                    excludeCurrentChain={true}
                  />
                </div>
              )}
            </div>
          </div>
        )
      case 4:
        const summaryDetails = [
          { label: "Title", value: "Build a mobile app" },
          { label: "Category", value: "Mobile Development" },
          { label: "Duration", value: "1-3 months" },
          { label: "Experience", value: "Intermediate" }
        ]

        const checklistItems = [
          "Double-check that milestones match the expected deliverables.",
          "Escrow releases once each milestone is approved by your team.",
          "Payments settle in USDT on Avalanche with transparent fees."
        ]

        return (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-semibold text-[#002333]">Review & Submit</h2>
              <p className="text-sm text-gray-600 mt-1">
                Confirm the summary below before publishing your project.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-[1fr_260px]">
              <Card className="p-6 bg-[#f6fbfc] border border-[#d4ecef]">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[#0f5b66]">Budget</p>
                    <p className="text-2xl font-semibold text-[#002333]">5,000 USDT</p>
                    <p className="text-xs text-[#3c6f79]">Fixed price · Split across 3 milestones</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-[#16c0c9]/20 px-3 py-1 text-xs font-semibold text-[#0f5b66]">
                    Escrow protected
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {summaryDetails.map((item) => (
                    <div key={item.label} className="rounded-lg border border-white/0 bg-white/70 p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-wide text-[#3c6f79]">{item.label}</p>
                      <p className="mt-1 font-semibold text-[#002333] text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3 text-sm text-[#0f5b66]">
                  <div className="rounded-lg border border-[#d4ecef] bg-white/80 p-4">
                    <p className="font-semibold text-[#002333]">Milestones</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-md bg-[#eef8f9] p-3 text-sm">
                        <p className="font-medium text-[#002333]">Discovery & wireframes</p>
                        <p className="text-xs text-[#3c6f79] mt-1">ETA · 5 days · Approved</p>
                      </div>
                      <div className="rounded-md bg-[#fff3dd] p-3 text-sm">
                        <p className="font-medium text-[#5c420f]">Smart contract handoff</p>
                        <p className="text-xs text-[#936d28] mt-1">ETA · 7 days · Pending review</p>
                      </div>
                    </div>
                  </div>

                  {isCrossChain && destinationChainId && (
                    <div className="rounded-lg border border-[#16c0c9]/30 bg-[#16c0c9]/10 p-3">
                      <p className="font-semibold text-[#0f5b66] flex items-center gap-2">
                        <Network className="h-4 w-4" /> Cross-chain project enabled
                      </p>
                      <p className="text-xs text-[#0f5b66] mt-1">
                        Destination chain ID: {destinationChainId}. Talent from multiple Avalanche networks can participate.
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-6 bg-white border border-gray-200 shadow-sm">
                <h3 className="text-base font-semibold text-[#002333] mb-4">Before you post</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  {checklistItems.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#15949C]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <p className="text-xs text-gray-500">
              By posting this project, you agree that this is a demo and no real project will be created.
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <motion.section
          className="bg-gradient-to-r from-[#002333] to-[#15949C] text-white py-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-3xl font-bold mb-2">Post a Project</h1>
            <p className="opacity-90">Find the perfect freelancer for your project</p>
          </div>
        </motion.section>

        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Progress Steps */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep 
                    ? "bg-[#15949C] text-white" 
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {step < currentStep ? <Check className="h-5 w-5" /> : step}
                </div>
                {step < totalSteps && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step < currentStep ? "bg-[#15949C]" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </motion.div>

          {/* Step Content */}
          {currentStep === 4 ? (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {renderStepContent()}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Card className="p-6 mb-6">
                {renderStepContent()}
              </Card>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <motion.div
            className="flex justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={handleNext} className="bg-[#15949C] hover:bg-[#15949C]/90">
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={isLoading}
                isLoading={isLoading}
                className="bg-[#15949C] hover:bg-[#15949C]/90"
              >
                {isLoading ? "Posting..." : "Post Project"}
              </Button>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

