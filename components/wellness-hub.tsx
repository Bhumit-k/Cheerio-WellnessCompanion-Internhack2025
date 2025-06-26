"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Zap, Target, Trophy, Clock, CheckCircle, AlertTriangle, Bell } from "lucide-react"
import { toast } from "sonner"

interface WellnessData {
  mood?: string
  posture?: string
  alertness?: string
  confidence?: number
  sleepHours?: number
  stepsTaken?: number
  waterIntake?: number
}

interface WellnessHubProps {
  wellnessData: WellnessData
  totalPoints?: number
  recentActivity?: string[]
}

export function WellnessHub({ wellnessData, totalPoints = 0, recentActivity = [] }: WellnessHubProps) {
  const [activeTab, setActiveTab] = useState("suggestions")
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [completedActions, setCompletedActions] = useState<number[]>([])

  // Dynamic suggestions based on wellness data and time
  useEffect(() => {
    const currentHour = new Date().getHours()
    const allSuggestions = [
      // Morning activities
      {
        id: 1,
        type: "morning",
        title: "Morning Stretch",
        description: "Start your day with a 2-minute stretch routine",
        action: "Begin stretching",
        priority: "high",
        icon: Zap,
        points: 25,
        category: "Physical",
      },
      {
        id: 2,
        type: "morning",
        title: "Deep Breathing",
        description: "Take 5 deep breaths to center yourself",
        action: "Start breathing",
        priority: "medium",
        icon: Heart,
        points: 15,
        category: "Mental",
      },
      // Posture & Physical
      {
        id: 3,
        type: "posture",
        title: "Posture Check",
        description: "Adjust your sitting position and straighten your back",
        action: "Fix posture",
        priority: "high",
        icon: AlertTriangle,
        points: 30,
        category: "Physical",
      },
      {
        id: 4,
        type: "physical",
        title: "Desk Exercises",
        description: "Do some simple desk exercises to stay active",
        action: "Exercise now",
        priority: "medium",
        icon: Zap,
        points: 35,
        category: "Physical",
      },
      {
        id: 5,
        type: "physical",
        title: "Walk Break",
        description: "Take a 5-minute walk around your workspace",
        action: "Take a walk",
        priority: "medium",
        icon: Target,
        points: 40,
        category: "Physical",
      },
      // Health & Hydration
      {
        id: 6,
        type: "hydration",
        title: "Stay Hydrated",
        description: "Drink a glass of water to stay refreshed",
        action: "Drink water",
        priority: "low",
        icon: Heart,
        points: 15,
        category: "Health",
      },
      {
        id: 7,
        type: "health",
        title: "Healthy Snack",
        description: "Have a nutritious snack to fuel your energy",
        action: "Eat snack",
        priority: "low",
        icon: Heart,
        points: 20,
        category: "Health",
      },
      // Eye Care & Breaks
      {
        id: 8,
        type: "break",
        title: "Eye Rest",
        description: "Look away from your screen for 2 minutes",
        action: "Rest eyes",
        priority: "medium",
        icon: Clock,
        points: 20,
        category: "Health",
      },
      {
        id: 9,
        type: "break",
        title: "Micro Break",
        description: "Take a 30-second break to relax your mind",
        action: "Take break",
        priority: "low",
        icon: Clock,
        points: 10,
        category: "Mental",
      },
      // Mental Wellness
      {
        id: 10,
        type: "mental",
        title: "Mindfulness Moment",
        description: "Practice 1 minute of mindfulness meditation",
        action: "Be mindful",
        priority: "medium",
        icon: Target,
        points: 25,
        category: "Mental",
      },
      {
        id: 11,
        type: "mental",
        title: "Gratitude Practice",
        description: "Think of 3 things you're grateful for today",
        action: "Practice gratitude",
        priority: "low",
        icon: Heart,
        points: 20,
        category: "Mental",
      },
      // Afternoon/Evening
      {
        id: 12,
        type: "afternoon",
        title: "Energy Boost",
        description: "Do some light stretching to re-energize",
        action: "Stretch now",
        priority: "medium",
        icon: Zap,
        points: 30,
        category: "Physical",
      },
    ]

    // Add time-based filtering but keep all suggestions
    let filteredSuggestions = allSuggestions

    // Prioritize certain activities based on wellness data
    if (wellnessData.posture === "Slouching") {
      filteredSuggestions = filteredSuggestions.map((s) => (s.type === "posture" ? { ...s, priority: "high" } : s))
    }

    if (wellnessData.alertness === "Drowsy") {
      filteredSuggestions = filteredSuggestions.map((s) =>
        s.type === "physical" || s.type === "break" ? { ...s, priority: "high" } : s,
      )
    }

    setSuggestions(filteredSuggestions)
  }, [wellnessData])

  // Dynamic notifications
  useEffect(() => {
    const newNotifications = [
      {
        id: 1,
        title: "Daily Goal Progress",
        message: `You've earned ${totalPoints} wellness points today`,
        time: "Just now",
        type: "success",
        icon: Trophy,
      },
      {
        id: 2,
        title: "Wellness Streak",
        message: "You're on a 3-day wellness activity streak!",
        time: "5 minutes ago",
        type: "info",
        icon: CheckCircle,
      },
      {
        id: 3,
        title: "Break Reminder",
        message: "Consider taking a 5-minute walking break",
        time: "15 minutes ago",
        type: "suggestion",
        icon: Bell,
      },
    ]

    setNotifications(newNotifications)
  }, [totalPoints])

  const handleSuggestionAction = (suggestion: any) => {
    if (completedActions.includes(suggestion.id)) return

    setCompletedActions([...completedActions, suggestion.id])

    toast.success(`${suggestion.action} completed! +${suggestion.points} points`, {
      description: "Great job on your wellness activity!",
      duration: 3000,
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "info":
        return "bg-blue-50 border-blue-200"
      case "suggestion":
        return "bg-purple-50 border-purple-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const wellnessScore = wellnessData.confidence ? Math.round(wellnessData.confidence * 100) : 85
  const activitiesCompleted = completedActions.length + Math.floor(totalPoints / 25)

  return (
    <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-md h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
          <Target className="h-5 w-5 text-purple-600 mr-2" />
          Wellness Hub
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="suggestions" className="text-sm">
              Suggestions
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-sm">
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="suggestions" className="space-y-3">
            <div className="max-h-96 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {suggestions.map((suggestion) => {
                const IconComponent = suggestion.icon
                const isCompleted = completedActions.includes(suggestion.id)

                return (
                  <div
                    key={suggestion.id}
                    className={`p-4 rounded-lg border border-gray-200 transition-all duration-300 ${
                      isCompleted
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 opacity-75"
                        : "bg-gradient-to-r from-white to-gray-50 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-full ${isCompleted ? "bg-green-100" : "bg-purple-100"}`}>
                          <IconComponent className={`h-4 w-4 ${isCompleted ? "text-green-600" : "text-purple-600"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className={`font-medium text-sm ${isCompleted ? "text-green-800" : "text-gray-800"}`}>
                              {suggestion.title}
                            </h4>
                            <Badge className={`text-xs px-2 py-0.5 ${getPriorityColor(suggestion.priority)}`}>
                              {suggestion.priority}
                            </Badge>
                            <Badge
                              className={`text-xs px-2 py-0.5 ${
                                isCompleted
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-purple-100 text-purple-800 border-purple-200"
                              }`}
                            >
                              +{suggestion.points} pts
                            </Badge>
                            <Badge className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 border-gray-200">
                              {suggestion.category}
                            </Badge>
                          </div>
                          <p className={`text-xs mb-2 ${isCompleted ? "text-green-700" : "text-gray-600"}`}>
                            {suggestion.description}
                          </p>
                          <Button
                            size="sm"
                            variant={isCompleted ? "outline" : "default"}
                            className={`text-xs h-7 ${
                              isCompleted
                                ? "bg-green-50 text-green-700 border-green-200 cursor-default"
                                : "bg-purple-600 hover:bg-purple-700 text-white"
                            }`}
                            onClick={() => handleSuggestionAction(suggestion)}
                            disabled={isCompleted}
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Completed
                              </>
                            ) : (
                              suggestion.action
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Activity Summary */}
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-purple-800">
                    {completedActions.length} of {suggestions.length} activities completed
                  </p>
                  <p className="text-xs text-purple-600">Keep going! Each activity helps improve your wellness.</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600">
                    {completedActions.reduce((total, id) => {
                      const suggestion = suggestions.find((s) => s.id === id)
                      return total + (suggestion?.points || 0)
                    }, 0)}
                  </div>
                  <div className="text-xs text-purple-600">Points from activities</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-3">
            {notifications.map((notification) => {
              const IconComponent = notification.icon
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${getNotificationColor(notification.type)} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-white/80">
                      <IconComponent className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 text-sm mb-1">{notification.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{wellnessScore}%</div>
              <div className="text-xs text-gray-600">Wellness Score</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{activitiesCompleted}</div>
              <div className="text-xs text-gray-600">Activities Today</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
