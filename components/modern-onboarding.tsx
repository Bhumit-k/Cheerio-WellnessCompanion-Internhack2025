"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronRight, Shield, Camera, Brain, Sparkles } from "lucide-react"

interface ModernOnboardingProps {
  onComplete?: () => void
}

export function ModernOnboarding({ onComplete }: ModernOnboardingProps) {
  const [step, setStep] = useState(1)
  const [consentGiven, setConsentGiven] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNext = () => {
    setIsAnimating(true)
    setTimeout(() => {
      if (step < 4) {
        setStep(step + 1)
      } else {
        // Call onComplete instead of router.push
        onComplete?.()
      }
      setIsAnimating(false)
    }, 300)
  }

  const handlePrevious = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setStep(step - 1)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <Card
        className={`relative w-full max-w-2xl bg-white/80 backdrop-blur-xl border-0 shadow-2xl transition-all duration-500 ${isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg"></div>

        <div className="relative p-8 md:p-12">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Step {step} of 4</span>
              <span className="text-sm text-gray-500">{Math.round((step / 4) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-center mb-6">
                    <Image
                      src="/images/cheerio-logo.png"
                      alt="Cheerio Logo"
                      width={80}
                      height={80}
                      className="rounded-xl shadow-lg"
                    />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Welcome to Cheerio
                  </h1>
                  <p className="text-xl text-gray-600">Your AI-powered wellness companion</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <Brain className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-2">Smart Detection</h3>
                    <p className="text-sm text-gray-600">Advanced AI analyzes your facial expressions and posture</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl">
                    <Sparkles className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-2">Personalized Care</h3>
                    <p className="text-sm text-gray-600">Tailored wellness suggestions just for you</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <Shield className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-2">Privacy First</h3>
                    <p className="text-sm text-gray-600">All processing happens locally on your device</p>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/images/cheerio-logo.png"
                    alt="Cheerio Logo"
                    width={70}
                    height={70}
                    className="rounded-xl shadow-lg"
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Advanced Computer Vision</h2>
                <p className="text-lg text-gray-600">Powered by cutting-edge AI technology</p>

                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-500 rounded-full">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">Facial Expression Analysis</h3>
                      <p className="text-gray-600">Detects micro-expressions to understand your emotional state</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-cyan-500 rounded-full">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">Posture Monitoring</h3>
                      <p className="text-gray-600">Real-time analysis of your sitting position and alignment</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-purple-500 rounded-full">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">Drowsiness Detection</h3>
                      <p className="text-gray-600">Monitors eye movements and blink patterns for fatigue</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/images/cheerio-logo.png"
                    alt="Cheerio Logo"
                    width={70}
                    height={70}
                    className="rounded-xl shadow-lg"
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Privacy & Consent</h2>
                <p className="text-lg text-gray-600">Your data security is our top priority</p>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 space-y-4">
                  <div className="flex items-center justify-center mb-4">
                    <Shield className="h-12 w-12 text-green-600" />
                  </div>

                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">All processing happens locally on your device</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">No video data is stored or transmitted</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">You can revoke consent at any time</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Only wellness insights are shared with Teams</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-6 bg-white rounded-xl border-2 border-gray-200">
                  <Checkbox
                    id="consent"
                    checked={consentGiven}
                    onCheckedChange={(checked) => setConsentGiven(checked === true)}
                    className="mt-1"
                  />
                  <Label htmlFor="consent" className="text-left text-gray-700 leading-relaxed">
                    I consent to Cheerio accessing my camera for facial expression and posture analysis. I understand
                    that all processing happens locally and I can revoke this consent at any time.
                  </Label>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/images/cheerio-logo.png"
                    alt="Cheerio Logo"
                    width={80}
                    height={80}
                    className="rounded-xl shadow-lg"
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">You're All Set!</h2>
                <p className="text-lg text-gray-600">Welcome to your personalized wellness journey</p>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
                  <p className="text-gray-700 mb-4">
                    Cheerio is now ready to support your well-being throughout the day. You'll find it integrated
                    seamlessly into your Microsoft Teams experience.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-blue-600">
                    <Sparkles className="h-5 w-5" />
                    <span className="font-medium">Let's begin your wellness transformation!</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            {step > 1 ? (
              <Button variant="outline" onClick={handlePrevious} className="px-6 py-3 border-gray-300 hover:bg-gray-50">
                Previous
              </Button>
            ) : (
              <div></div>
            )}

            <Button
              onClick={handleNext}
              disabled={step === 3 && !consentGiven}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {step < 4 ? (
                <>
                  {step === 3 ? "Accept & Continue" : "Continue"}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Enter Dashboard"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
