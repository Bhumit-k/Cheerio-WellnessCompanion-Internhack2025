"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Target, TrendingUp, Award } from "lucide-react"

const progressData = [
  {
    category: "Daily Goals",
    items: [
      { name: "Micro-breaks taken", current: 6, target: 8, unit: "breaks" },
      { name: "Good posture time", current: 4.2, target: 6, unit: "hours" },
      { name: "Hydration reminders", current: 5, target: 8, unit: "glasses" },
    ],
  },
  {
    category: "Weekly Targets",
    items: [
      { name: "Wellness score", current: 78, target: 85, unit: "%" },
      { name: "Stress reduction", current: 15, target: 20, unit: "%" },
      { name: "Focus improvement", current: 12, target: 15, unit: "%" },
    ],
  },
]

export function ProgressTracker() {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 60) return "bg-blue-500"
    if (percentage >= 40) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Progress Tracker
            </CardTitle>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Calendar className="w-3 h-3 mr-1" />
            Today
          </Badge>
        </div>
        <p className="text-gray-600 text-sm">Track your wellness journey</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {progressData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center">
              {section.category}
              <TrendingUp className="h-4 w-4 ml-2 text-green-600" />
            </h3>

            <div className="space-y-4">
              {section.items.map((item, itemIndex) => {
                const percentage = Math.min((item.current / item.target) * 100, 100)
                return (
                  <div key={itemIndex} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      <span className="text-sm text-gray-600">
                        {item.current} / {item.target} {item.unit}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2 mb-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{Math.round(percentage)}% complete</span>
                      {percentage >= 100 && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Award className="w-3 h-3 mr-1" />
                          Goal Achieved!
                        </Badge>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
