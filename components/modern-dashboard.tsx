"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heart, Target, Trophy, TrendingUp, Calendar, ChevronDown } from "lucide-react"
import { EnhancedCameraMonitor } from "./enhanced-camera-monitor"
import { WellnessHub } from "./wellness-hub"
import { WellnessChallenges } from "./wellness-challenges"
import { WellnessPet } from "./wellness-pet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface WellnessData {
  mood: string
  posture: string
  alertness: string
  confidence: number
  timestamp: string
}

interface DashboardStats {
  wellnessScore: number
  activitiesCompleted: number
  streakDays: number
  totalPoints: number
  weeklyGoal: number
  weeklyProgress: number
}

interface ModernDashboardProps {
  userPlan?: "free" | "premium"
}

export function ModernDashboard({ userPlan = "free" }: ModernDashboardProps) {
  const [showWellnessPet, setShowWellnessPet] = useState(true)
  const [userName, setUserName] = useState("Alex")

  const [wellnessData, setWellnessData] = useState<WellnessData>({
    mood: "Focused",
    posture: "Good",
    alertness: "Alert",
    confidence: 0.85,
    timestamp: new Date().toISOString(),
  })

  const [stats, setStats] = useState<DashboardStats>({
    wellnessScore: 85,
    activitiesCompleted: 12,
    streakDays: 7,
    totalPoints: 1250,
    weeklyGoal: 50,
    weeklyProgress: 32,
  })

  const [isMonitoring, setIsMonitoring] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Load user data from localStorage and listen for updates
  useEffect(() => {
    const loadUserData = () => {
      const userData = localStorage.getItem("cheerio-user-data")
      if (userData) {
        try {
          const parsedData = JSON.parse(userData)
          if (parsedData.name) {
            setUserName(parsedData.name.split(" ")[0]) // Get first name
          }
        } catch (error) {
          console.error("Error parsing user data:", error)
        }
      }
    }

    // Load initial data
    loadUserData()

    // Listen for profile updates
    const handleUserUpdate = (event: CustomEvent) => {
      const updatedUser = event.detail
      if (updatedUser.name) {
        setUserName(updatedUser.name.split(" ")[0])
      }
    }

    window.addEventListener("cheerio:userUpdated", handleUserUpdate as EventListener)

    return () => {
      window.removeEventListener("cheerio:userUpdated", handleUserUpdate as EventListener)
    }
  }, [])

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Simulate wellness data updates
  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        setWellnessData((prev) => ({
          ...prev,
          confidence: Math.max(0.6, Math.min(0.95, prev.confidence + (Math.random() - 0.5) * 0.1)),
          timestamp: new Date().toISOString(),
        }))
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isMonitoring])

  // Update stats when activities are completed (simulate)
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        activitiesCompleted: prev.activitiesCompleted + Math.floor(Math.random() * 2),
        totalPoints: prev.totalPoints + Math.floor(Math.random() * 25),
      }))
    }, 30000) // Update every 30 seconds for demo

    return () => clearInterval(interval)
  }, [])

  const handleStartMonitoring = () => {
    setIsMonitoring(true)
  }

  const handlePauseMonitoring = () => {
    setIsMonitoring(false)
  }

  const handleTakeBreak = (type = "general", duration = 5) => {
    // Handle break without toast
  }

  // Get time-based greeting with real time
  const getTimeBasedGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) {
      return `Good morning, ${userName}!`
    } else if (hour < 17) {
      return `Good afternoon, ${userName}!`
    } else {
      return `Good evening, ${userName}!`
    }
  }

  return (
    <div className="container mx-auto px-6 py-6 space-y-6">
      {/* Welcome Section with Time-based Greeting */}
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{getTimeBasedGreeting()}</h1>
        <p className="text-gray-600">Let's make today a wellness-focused day</p>

        {/* Plan Badge - NO EMOJI */}
        <div className="flex justify-center">
          <div
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              userPlan === "premium"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {userPlan === "premium" ? "Premium Plan" : "Free Plan"}
          </div>
        </div>

        {/* Wellness Score Explanation - Now Collapsible */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-sm mt-4 cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 flex items-center">
                    <Heart className="h-4 w-4 text-red-500 mr-2" />
                    What is your Wellness Score?
                  </h3>
                  <ChevronDown className="h-4 w-4 text-gray-600 transition-transform group-data-[state=open]:rotate-180" />
                </div>
              </CardContent>
            </Card>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-sm mt-2">
              <CardContent className="p-4">
                <div className="text-left space-y-3">
                  <p className="text-sm text-gray-600">
                    Your wellness score is calculated from four key components (25% each):
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="text-center">
                      <div className="font-medium text-blue-600">Mood Analysis</div>
                      <div className="text-gray-500">Facial expressions</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-green-600">Posture Tracking</div>
                      <div className="text-gray-500">Body positioning</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-purple-600">Alertness Level</div>
                      <div className="text-gray-500">Focus & attention</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-orange-600">Activity Level</div>
                      <div className="text-gray-500">Movement & breaks</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 pt-2 border-t">
                    <strong>Score Ranges:</strong> 0-60 (Needs Attention) • 61-80 (Good Progress) • 81-100 (Excellent
                    Wellness)
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Quick Stats - Now Collapsible */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md mb-4 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                  Your Wellness Stats
                </h3>
                <ChevronDown className="h-4 w-4 text-gray-600 transition-transform group-data-[state=open]:rotate-180" />
              </div>
            </CardContent>
          </Card>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="h-5 w-5 text-red-500" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.wellnessScore}%</div>
                <div className="text-xs text-gray-600">Wellness Score</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.activitiesCompleted}</div>
                <div className="text-xs text-gray-600">Activities Today</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.streakDays}</div>
                <div className="text-xs text-gray-600">Day Streak</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stats.totalPoints}</div>
                <div className="text-xs text-gray-600">Total Points</div>
              </CardContent>
            </Card>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Main Dashboard Grid - Adjusted Monitor Size */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        {/* Camera Monitor - Takes up 3 columns for smaller size */}
        <div className="lg:col-span-3">
          <EnhancedCameraMonitor
            isMonitoring={isMonitoring}
            onStartMonitoring={handleStartMonitoring}
            onPauseMonitoring={handlePauseMonitoring}
            wellnessData={wellnessData}
            onWellnessUpdate={setWellnessData}
          />
        </div>

        {/* Wellness Hub - Takes up 2 columns for more space */}
        <div className="lg:col-span-2">
          <WellnessHub wellnessData={wellnessData} totalPoints={stats.totalPoints} recentActivity={[]} />
        </div>
      </div>

      {/* Wellness Challenges - Now under monitor section */}
      <WellnessChallenges />

      {/* Weekly Progress */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
            <Calendar className="h-5 w-5 text-purple-600 mr-2" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {stats.weeklyProgress} of {stats.weeklyGoal} activities completed
              </span>
              <span className="font-medium text-gray-800">
                {Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100)}%
              </span>
            </div>
            <Progress value={(stats.weeklyProgress / stats.weeklyGoal) * 100} className="h-2" />
            <div className="text-xs text-gray-500">
              {stats.weeklyGoal - stats.weeklyProgress} activities remaining to reach your weekly goal
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wellness Pet - Always visible on dashboard */}
      {showWellnessPet && (
        <WellnessPet
          wellnessScore={stats.wellnessScore}
          activitiesCompleted={stats.activitiesCompleted}
          totalPoints={stats.totalPoints}
          onClose={() => setShowWellnessPet(false)}
        />
      )}
    </div>
  )
}
