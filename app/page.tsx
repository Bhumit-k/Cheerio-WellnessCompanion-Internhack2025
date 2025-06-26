"use client"

import { useState, useEffect } from "react"
import { LoginSignup } from "@/components/auth/login-signup"
import { ModernOnboarding } from "@/components/modern-onboarding"
import { ModernDashboard } from "@/components/modern-dashboard"
import { PricingPage } from "@/components/pricing-page"
import { AnalyticsView } from "@/components/analytics-view"
import { ResourcesView } from "@/components/resources-view"
import { SettingsPanel } from "@/components/settings-panel"
import { ProfileView } from "@/components/profile-view"
import { ModernHeader } from "@/components/modern-header"
import { ConsultationBooking } from "@/components/consultation-booking"
import { IntegrationsPage } from "@/components/integrations-page"

interface UserData {
  id: string
  name: string
  email: string
  company?: string
  plan: "free" | "premium"
  joinDate: string
  avatar?: string | null
  hasCompletedOnboarding?: boolean
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [activeTab, setActiveTab] = useState("dashboard")

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("cheerio-auth-token")
      const storedUserData = localStorage.getItem("cheerio-user-data")
      const onboardingComplete = localStorage.getItem("cheerio-onboarding-complete")

      if (token && storedUserData) {
        try {
          const parsedUserData = JSON.parse(storedUserData)
          setUserData(parsedUserData)
          setIsAuthenticated(true)
          setHasCompletedOnboarding(onboardingComplete === "true")
        } catch (error) {
          console.error("Error parsing user data:", error)
          localStorage.removeItem("cheerio-auth-token")
          localStorage.removeItem("cheerio-user-data")
          localStorage.removeItem("cheerio-onboarding-complete")
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const handleAuthSuccess = (user: UserData) => {
    setUserData(user)
    setIsAuthenticated(true)
    // Don't set onboarding as complete yet - user needs to go through it
    setHasCompletedOnboarding(false)
  }

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true)
    localStorage.setItem("cheerio-onboarding-complete", "true")
    setActiveTab("dashboard")
  }

  const handleLogout = () => {
    localStorage.removeItem("cheerio-auth-token")
    localStorage.removeItem("cheerio-user-data")
    localStorage.removeItem("cheerio-onboarding-complete")
    setUserData(null)
    setIsAuthenticated(false)
    setHasCompletedOnboarding(false)
    setActiveTab("dashboard")
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleSelectPlan = (plan: "free" | "premium") => {
    if (userData) {
      const updatedUserData = { ...userData, plan }
      setUserData(updatedUserData)
      localStorage.setItem("cheerio-user-data", JSON.stringify(updatedUserData))
      setActiveTab("dashboard")
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-100 text-lg">Loading Cheerio...</p>
        </div>
      </div>
    )
  }

  // Show login/signup if not authenticated
  if (!isAuthenticated) {
    return <LoginSignup onAuthSuccess={handleAuthSuccess} />
  }

  // Show onboarding if authenticated but hasn't completed onboarding
  if (!hasCompletedOnboarding) {
    return <ModernOnboarding onComplete={handleOnboardingComplete} />
  }

  // Main application with navigation
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <ModernHeader activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="py-8">
        {activeTab === "dashboard" && <ModernDashboard userPlan={userData?.plan || "free"} />}

        {activeTab === "analytics" && (
          <AnalyticsView
            userPlan={userData?.plan || "free"}
            wellnessData={{
              mood: "Focused",
              posture: "Good",
              alertness: "High",
              confidence: 87,
              timestamp: new Date().toISOString(),
            }}
            stats={{
              wellnessScore: 87,
              activitiesCompleted: 68,
              streakDays: 7,
              totalPoints: 1245,
              weeklyGoal: 100,
              weeklyProgress: 87,
            }}
          />
        )}

        {activeTab === "resources" && <ResourcesView userPlan={userData?.plan || "free"} />}

        {activeTab === "consultation" && (
          <ConsultationBooking userPlan={userData?.plan || "free"} onClose={() => setActiveTab("dashboard")} />
        )}

        {activeTab === "integrations" && (
          <IntegrationsPage userPlan={userData?.plan || "free"} onClose={() => setActiveTab("dashboard")} />
        )}

        {activeTab === "pricing" && (
          <PricingPage onClose={() => setActiveTab("dashboard")} onSelectPlan={handleSelectPlan} />
        )}

        {activeTab === "settings" && (
          <div className="max-w-4xl mx-auto px-6">
            <SettingsPanel userPlan={userData?.plan || "free"} />
          </div>
        )}

        {activeTab === "profile" && (
          <ProfileView userData={userData} onUpdateUser={setUserData} onLogout={handleLogout} />
        )}
      </main>
    </div>
  )
}
