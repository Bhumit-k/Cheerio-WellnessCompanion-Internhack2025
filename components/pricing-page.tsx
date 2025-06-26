"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Check, Crown, Zap, Building2, Star, Sparkles, ChevronDown } from "lucide-react"

interface PricingPageProps {
  onClose?: () => void
  onSelectPlan?: (plan: "free" | "premium" | "enterprise") => void
}

export function PricingPage({ onClose, onSelectPlan }: PricingPageProps) {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium" | "enterprise" | null>(null)
  const [showComparison, setShowComparison] = useState(false)

  const handleSelectPlan = (plan: "free" | "premium" | "enterprise") => {
    setSelectedPlan(plan)
    onSelectPlan?.(plan)
  }

  // Standardized feature list - all plans have same number of features for alignment
  const allFeatures = [
    {
      free: "Basic wellness monitoring",
      premium: "Advanced wellness monitoring",
      enterprise: "Enterprise wellness monitoring",
    },
    { free: "Simple break reminders", premium: "Smart break reminders", enterprise: "Company-wide wellness alerts" },
    {
      free: "Basic analytics",
      premium: "Advanced analytics & reports",
      enterprise: "Advanced team analytics & insights",
    },
    { free: "Core settings", premium: "Full customization", enterprise: "Full enterprise customization" },
    { free: "Mobile responsive", premium: "Mobile app access", enterprise: "Mobile app + desktop suite" },
    { free: null, premium: "Calendar integration", enterprise: "Full calendar & scheduling integration" },
    { free: null, premium: "Team collaboration", enterprise: "Unlimited team collaboration" },
    { free: null, premium: "AI-powered insights", enterprise: "AI-powered company insights" },
    { free: null, premium: "2 specialist consultations/month", enterprise: "Unlimited specialist consultations" },
    { free: null, premium: "Priority support", enterprise: "Dedicated account manager" },
    { free: null, premium: "Microsoft 365 integration", enterprise: "Full Microsoft 365 + Google Workspace" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Choose Your Plan</h1>
          </div>
          <p className="text-xl text-blue-100 mb-6">Transform your workplace wellness with AI-powered insights</p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Label htmlFor="billing-toggle" className="text-blue-100">
              Monthly
            </Label>
            <Switch id="billing-toggle" checked={isYearly} onCheckedChange={setIsYearly} />
            <Label htmlFor="billing-toggle" className="text-blue-100">
              Yearly
              <Badge className="ml-2 bg-green-500 text-white">Save 20%</Badge>
            </Label>
          </div>
        </div>

        {/* Pricing Cards - Optimized Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-700 flex flex-col h-full">
            {/* Header Section */}
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Zap className="h-6 w-6 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Free</h3>
              </div>
              <p className="text-slate-300 text-sm mb-4">Perfect for individuals getting started</p>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">$0</span>
                <span className="text-slate-400 ml-1">/month</span>
              </div>
            </div>

            {/* Features Section */}
            <div className="px-6 flex-1">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">Basic wellness monitoring</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">Simple break reminders</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">Basic analytics</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">Core settings</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">Mobile responsive</span>
                </div>
              </div>
            </div>

            {/* Button Section */}
            <div className="p-6 pt-4">
              <Button
                onClick={() => handleSelectPlan("free")}
                variant="outline"
                className="w-full h-11 bg-transparent border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-slate-500 rounded-xl"
              >
                Get Started Free
              </Button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border-2 border-purple-500 flex flex-col h-full relative">
            {/* Popular Badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs">
                <Star className="h-3 w-3 mr-1" />
                Most Popular
              </Badge>
            </div>

            {/* Header Section */}
            <div className="p-6 pt-8">
              <div className="flex items-center space-x-3 mb-3">
                <Crown className="h-6 w-6 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Premium</h3>
              </div>
              <p className="text-slate-300 text-sm mb-4">Advanced features for teams and power users</p>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">${isYearly ? "9.99" : "11.99"}</span>
                <span className="text-slate-400 ml-1">/month</span>
                {isYearly && <div className="text-green-400 text-xs mt-1">Save $24/year</div>}
              </div>
            </div>

            {/* Features Section */}
            <div className="px-6 flex-1">
              <div className="space-y-2">
                {/* Inherited Features */}
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-300 text-sm font-medium">Everything in Free</span>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-600 my-3"></div>

                {/* New Features */}
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-purple-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">Advanced wellness monitoring</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-purple-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">Smart break reminders</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-purple-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">Advanced analytics & reports</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-purple-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">AI-powered insights</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-purple-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">Team collaboration</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-purple-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">Microsoft 365 integration</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-purple-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">2 specialist consultations/month</span>
                </div>
              </div>
            </div>

            {/* Special Box */}
            <div className="px-6 py-4">
              <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3">
                <div className="text-purple-300 text-xs font-medium">Consultation Credits</div>
                <div className="text-purple-200 text-xs">2 free monthly (worth $200)</div>
              </div>
            </div>

            {/* Button Section */}
            <div className="p-6 pt-0">
              <Button
                onClick={() => handleSelectPlan("premium")}
                className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl"
              >
                Start Premium Trial
              </Button>
              <p className="text-slate-400 text-xs text-center mt-2">14-day free trial • No credit card required</p>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-700 flex flex-col h-full">
            {/* Header Section */}
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Building2 className="h-6 w-6 text-amber-400" />
                <h3 className="text-2xl font-bold text-white">Enterprise</h3>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                Comprehensive employee wellness ecosystem with HR integration
              </p>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">Custom</span>
                <div className="text-amber-400 text-xs mt-1">Contact for pricing</div>
              </div>
            </div>

            {/* Features Section */}
            <div className="px-6 flex-1">
              <div className="space-y-2">
                {/* Inherited Features */}
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-300 text-sm font-medium">Everything in Premium</span>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-600 my-3"></div>

                {/* New Features */}
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-amber-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">Complete employee wellness ecosystem</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-amber-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">HR integration & benefits management</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-amber-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">Company-wide wellness programs</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-amber-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">Employee resource access & tools</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-amber-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">Wellness benefits administration</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-amber-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">Team wellness challenges & leaderboards</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-amber-400 flex-shrink-0 mr-3" />
                  <span className="text-slate-200 text-sm">Executive wellness dashboards</span>
                </div>
              </div>
            </div>

            {/* Special Box */}
            <div className="px-6 py-4">
              <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-3">
                <div className="text-amber-300 text-xs font-medium">Complete Wellness Ecosystem</div>
                <div className="text-amber-200 text-xs">Full HR integration, benefits & employee resources</div>
              </div>
            </div>

            {/* Button Section */}
            <div className="p-6 pt-0">
              <Button
                onClick={() => handleSelectPlan("enterprise")}
                className="w-full h-11 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl"
              >
                Contact Sales
              </Button>
              <p className="text-slate-400 text-xs text-center mt-2">Custom implementation • Dedicated support</p>
            </div>
          </div>
        </div>

        {/* Feature Comparison - Collapsible */}
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-12 max-w-6xl mx-auto">
          <div
            className="flex items-center justify-between cursor-pointer hover:bg-slate-700/50 rounded-xl p-4 -m-4 mb-4 transition-colors"
            onClick={() => setShowComparison(!showComparison)}
          >
            <h2 className="text-2xl font-bold text-white">Detailed Feature Comparison</h2>
            <ChevronDown
              className={`h-6 w-6 text-slate-400 transition-transform duration-200 ${showComparison ? "rotate-180" : ""}`}
            />
          </div>

          {showComparison && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-4 px-4 font-medium text-slate-200">Features</th>
                    <th className="text-center py-4 px-4 font-medium text-slate-200">Free</th>
                    <th className="text-center py-4 px-4 font-medium text-slate-200">Premium</th>
                    <th className="text-center py-4 px-4 font-medium text-slate-200">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <tr>
                    <td className="py-4 px-4 text-slate-300">Wellness Monitoring</td>
                    <td className="py-4 px-4 text-center text-blue-400">Basic</td>
                    <td className="py-4 px-4 text-center text-purple-400">Advanced</td>
                    <td className="py-4 px-4 text-center text-amber-400">Enterprise</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-slate-300">AI-Powered Insights</td>
                    <td className="py-4 px-4 text-center text-slate-500">—</td>
                    <td className="py-4 px-4 text-center">
                      <Check className="h-5 w-5 text-green-400 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="h-5 w-5 text-green-400 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-slate-300">Specialist Consultations</td>
                    <td className="py-4 px-4 text-center text-slate-500">—</td>
                    <td className="py-4 px-4 text-center text-purple-400">2/month</td>
                    <td className="py-4 px-4 text-center text-amber-400">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-slate-300">Microsoft 365 Integration</td>
                    <td className="py-4 px-4 text-center text-slate-500">—</td>
                    <td className="py-4 px-4 text-center">
                      <Check className="h-5 w-5 text-green-400 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="h-5 w-5 text-green-400 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-slate-300">Team Collaboration</td>
                    <td className="py-4 px-4 text-center text-slate-500">—</td>
                    <td className="py-4 px-4 text-center">
                      <Check className="h-5 w-5 text-green-400 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="h-5 w-5 text-green-400 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-slate-300">Priority Support</td>
                    <td className="py-4 px-4 text-center text-slate-500">Community</td>
                    <td className="py-4 px-4 text-center text-purple-400">24/7 Priority</td>
                    <td className="py-4 px-4 text-center text-amber-400">Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-12 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-200 mb-2">How do consultation credits work?</h3>
              <p className="text-slate-400 text-sm">
                Premium users get 2 free specialist consultations each month. Additional sessions can be purchased at
                discounted rates.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-200 mb-2">What is priority support?</h3>
              <p className="text-slate-400 text-sm">
                Premium users get 24/7 priority support with dedicated specialists and faster response times.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-200 mb-2">Can I upgrade or downgrade anytime?</h3>
              <p className="text-slate-400 text-sm">
                Yes! You can change your plan at any time. Changes take effect immediately.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-200 mb-2">Is there a free trial for Premium?</h3>
              <p className="text-slate-400 text-sm">
                Yes, we offer a 14-day free trial for Premium with no credit card required.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-200 mb-2">What's included in Enterprise?</h3>
              <p className="text-slate-400 text-sm">
                Enterprise includes unlimited users, custom integrations, dedicated support, and a complete wellness
                ecosystem for your organization.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-200 mb-2">How does HR integration work?</h3>
              <p className="text-slate-400 text-sm">
                We integrate with your existing HR systems to track employee wellness metrics, manage benefits, and
                provide comprehensive wellness reporting.
              </p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        {onClose && (
          <div className="text-center">
            <Button
              onClick={onClose}
              variant="outline"
              className="bg-slate-800/50 border-slate-600 text-slate-200 hover:bg-slate-700"
            >
              Back to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
