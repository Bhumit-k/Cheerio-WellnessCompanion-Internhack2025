"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [consentGiven, setConsentGiven] = useState(false)

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0099e5] p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-48">
            <Image src="/images/cheerio-logo.png" alt="Cheerio Logo" width={200} height={100} priority />
          </div>
          <CardTitle className="text-2xl font-bold">
            {step === 1 && "Welcome to Cheerio!"}
            {step === 2 && "How Cheerio Works"}
            {step === 3 && "Privacy & Consent"}
            {step === 4 && "You're All Set!"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Your AI-powered wellness companion for Microsoft Teams"}
            {step === 2 && "Understanding how Cheerio supports your well-being"}
            {step === 3 && "Your privacy is our priority"}
            {step === 4 && "Let's start your wellness journey"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <p>Cheerio helps you stay energized and focused throughout your workday by:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Detecting early signs of fatigue or stress</li>
                <li>Suggesting timely micro-breaks</li>
                <li>Providing personalized wellness tips</li>
                <li>Making wellness fun with gamified challenges</li>
              </ul>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p>Cheerio uses your device's camera to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Analyze facial expressions to detect mood changes</li>
                <li>Monitor posture to prevent strain and fatigue</li>
                <li>Recognize signs of eye strain or concentration loss</li>
              </ul>
              <p className="font-medium mt-4">All processing happens locally on your device for maximum privacy.</p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <p>Before we begin, we need your consent to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access your camera for facial expression and posture analysis</li>
                <li>Send you notifications within Microsoft Teams</li>
                <li>Store your wellness preferences and progress data</li>
              </ul>
              <div className="flex items-start space-x-2 pt-4">
                <Checkbox
                  id="consent"
                  checked={consentGiven}
                  onCheckedChange={(checked) => setConsentGiven(checked === true)}
                />
                <Label htmlFor="consent" className="text-sm">
                  I consent to Cheerio accessing my camera and processing my facial expressions and posture data to
                  provide wellness recommendations. I understand I can revoke this consent at any time.
                </Label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 text-center">
              <p>You're all set to start your wellness journey with Cheerio!</p>
              <p className="font-medium">
                Cheerio will now appear in your Microsoft Teams sidebar, ready to support your well-being throughout the
                day.
              </p>
              <div className="py-4">
                <div className="w-24 h-24 bg-[#0099e5] rounded-full mx-auto flex items-center justify-center">
                  <span className="text-4xl">🎉</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <Button
            onClick={handleNext}
            disabled={step === 3 && !consentGiven}
            className="bg-[#0099e5] hover:bg-[#0088cc]"
          >
            {step < 4 ? "Next" : "Get Started"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
