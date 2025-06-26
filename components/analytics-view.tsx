"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Clock, Target, Brain, Heart, Eye, User, BarChart3, Activity } from "lucide-react"
import { useState } from "react"

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

interface AnalyticsViewProps {
  wellnessData?: WellnessData
  stats?: DashboardStats
  userPlan?: "free" | "premium"
}

export function AnalyticsView({
  wellnessData = {
    mood: "Focused",
    posture: "Good",
    alertness: "High",
    confidence: 85,
    timestamp: new Date().toISOString(),
  },
  stats = {
    wellnessScore: 87,
    activitiesCompleted: 68,
    streakDays: 7,
    totalPoints: 1245,
    weeklyGoal: 100,
    weeklyProgress: 87,
  },
  userPlan = "free",
}: AnalyticsViewProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; data: any } | null>(null)
  const [selectedDataset, setSelectedDataset] = useState<"weekly" | "hourly" | "both">("both")

  const weeklyData = [
    { day: "Mon", score: 85, activities: 8, date: "Dec 16" },
    { day: "Tue", score: 92, activities: 12, date: "Dec 17" },
    { day: "Wed", score: 78, activities: 6, date: "Dec 18" },
    { day: "Thu", score: 88, activities: 10, date: "Dec 19" },
    { day: "Fri", score: 95, activities: 14, date: "Dec 20" },
    { day: "Sat", score: 82, activities: 7, date: "Dec 21" },
    { day: "Sun", score: 90, activities: 11, date: "Dec 22" },
  ]

  const hourlyData = [
    { hour: "9AM", score: 95, period: "Morning" },
    { hour: "10AM", score: 92, period: "Morning" },
    { hour: "11AM", score: 88, period: "Morning" },
    { hour: "12PM", score: 85, period: "Noon" },
    { hour: "1PM", score: 78, period: "Afternoon" },
    { hour: "2PM", score: 88, period: "Afternoon" },
    { hour: "3PM", score: 85, period: "Afternoon" },
    { hour: "4PM", score: 82, period: "Afternoon" },
    { hour: "5PM", score: 80, period: "Evening" },
    { hour: "6PM", score: 85, period: "Evening" },
  ]

  const moodBreakdown = [
    { mood: "Focused", percentage: 45, color: "from-blue-500 to-cyan-400", count: 32 },
    { mood: "Happy", percentage: 30, color: "from-green-500 to-emerald-400", count: 21 },
    { mood: "Neutral", percentage: 20, color: "from-gray-500 to-slate-400", count: 14 },
    { mood: "Tired", percentage: 5, color: "from-amber-500 to-orange-400", count: 4 },
  ]

  const handleMouseMove = (event: React.MouseEvent<SVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Check if hovering over data points
    const tolerance = 15

    // Check weekly data points
    weeklyData.forEach((d, i) => {
      const pointX = 100 + i * 85
      const pointY = 260 - (d.score / 100) * 220

      if (Math.abs(x - pointX) < tolerance && Math.abs(y - pointY) < tolerance) {
        setHoveredPoint({
          x: pointX,
          y: pointY,
          data: { ...d, type: "weekly" },
        })
        return
      }
    })

    // Check hourly data points
    hourlyData.slice(0, 7).forEach((d, i) => {
      const pointX = 120 + i * 65
      const pointY = 250 - (d.score / 100) * 200

      if (Math.abs(x - pointX) < tolerance && Math.abs(y - pointY) < tolerance) {
        setHoveredPoint({
          x: pointX,
          y: pointY,
          data: { ...d, type: "hourly" },
        })
        return
      }
    })
  }

  const handleMouseLeave = () => {
    setHoveredPoint(null)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Interactive Analytics
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Hover over data points for detailed insights and interactive exploration
        </p>
      </div>

      {/* Key Metrics - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Wellness Score</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  {stats.wellnessScore}%
                </p>
                <p className="text-xs text-green-600 font-medium">↗ +5% from last week</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl">
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Activities</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  68
                </p>
                <p className="text-xs text-green-600 font-medium">↗ +12 this week</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                <Target className="h-8 w-8 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Active Hours</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  24.5
                </p>
                <p className="text-xs text-green-600 font-medium">↗ +2.3 hours</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Improvement</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
                  +12%
                </p>
                <p className="text-xs text-green-600 font-medium">↗ Trending up</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl">
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Chart Controls */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
              <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
              Interactive Performance Chart
            </CardTitle>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedDataset("weekly")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedDataset === "weekly"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setSelectedDataset("hourly")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedDataset === "hourly"
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                Hourly
              </button>
              <button
                onClick={() => setSelectedDataset("both")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedDataset === "both"
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                Both
              </button>
            </div>
          </div>
          <p className="text-slate-600 text-sm">Hover over data points for detailed information</p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="relative h-[26rem] bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-slate-200 shadow-inner">
            <div className="absolute inset-4">
              <svg
                className="w-full h-full cursor-crosshair"
                viewBox="0 0 840 315"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Enhanced Grid Background */}
                <defs>
                  <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.7" />
                  </pattern>
                  <linearGradient id="weeklyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="hourlyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Enhanced Grid */}
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Enhanced Y-axis with better visibility */}
                <line x1="60" y1="20" x2="60" y2="260" stroke="#475569" strokeWidth="3" />
                {/* Enhanced X-axis */}
                <line x1="60" y1="260" x2="740" y2="260" stroke="#475569" strokeWidth="3" />

                {/* Enhanced Y-axis labels with better contrast */}
                <text x="35" y="30" className="text-sm font-bold fill-slate-800" textAnchor="end">
                  100%
                </text>
                <text x="35" y="80" className="text-sm font-bold fill-slate-700" textAnchor="end">
                  80%
                </text>
                <text x="35" y="130" className="text-sm font-bold fill-slate-700" textAnchor="end">
                  60%
                </text>
                <text x="35" y="180" className="text-sm font-bold fill-slate-700" textAnchor="end">
                  40%
                </text>
                <text x="35" y="230" className="text-sm font-bold fill-slate-700" textAnchor="end">
                  20%
                </text>
                <text x="35" y="270" className="text-sm font-bold fill-slate-800" textAnchor="end">
                  0%
                </text>

                {/* Horizontal grid lines for better readability */}
                <line x1="60" y1="30" x2="740" y2="30" stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />
                <line x1="60" y1="80" x2="740" y2="80" stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />
                <line x1="60" y1="130" x2="740" y2="130" stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />
                <line x1="60" y1="180" x2="740" y2="180" stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />
                <line x1="60" y1="230" x2="740" y2="230" stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />

                {/* Weekly Data Line */}
                {(selectedDataset === "weekly" || selectedDataset === "both") && (
                  <>
                    <path
                      d={`M ${weeklyData.map((d, i) => `${100 + i * 85},${260 - (d.score / 100) * 220}`).join(" L ")}`}
                      fill="none"
                      stroke="url(#weeklyGrad)"
                      strokeWidth="4"
                      filter="url(#glow)"
                      className="transition-all duration-300"
                    />

                    {/* Weekly data points with hover effects */}
                    {weeklyData.map((d, i) => (
                      <g key={d.day}>
                        <circle
                          cx={100 + i * 85}
                          cy={260 - (d.score / 100) * 220}
                          r="8"
                          fill="#3b82f6"
                          stroke="white"
                          strokeWidth="3"
                          filter="url(#glow)"
                          className="cursor-pointer hover:r-12 transition-all duration-200"
                        />
                        <text x={100 + i * 85} y="285" className="text-sm font-bold fill-slate-800" textAnchor="middle">
                          {d.day}
                        </text>
                      </g>
                    ))}
                  </>
                )}

                {/* Hourly Data Line */}
                {(selectedDataset === "hourly" || selectedDataset === "both") && (
                  <>
                    <path
                      d={`M ${hourlyData
                        .slice(0, 7)
                        .map((d, i) => `${120 + i * 65},${250 - (d.score / 100) * 200}`)
                        .join(" L ")}`}
                      fill="none"
                      stroke="url(#hourlyGrad)"
                      strokeWidth="3"
                      strokeDasharray="8,4"
                      filter="url(#glow)"
                      className="transition-all duration-300"
                    />

                    {/* Hourly data points */}
                    {hourlyData.slice(0, 7).map((d, i) => (
                      <g key={d.hour}>
                        <circle
                          cx={120 + i * 65}
                          cy={250 - (d.score / 100) * 200}
                          r="6"
                          fill="#10b981"
                          stroke="white"
                          strokeWidth="2"
                          filter="url(#glow)"
                          className="cursor-pointer hover:r-10 transition-all duration-200"
                        />
                        <text
                          x={120 + i * 65}
                          y="295"
                          className="text-xs font-medium fill-slate-700"
                          textAnchor="middle"
                          transform={`rotate(-45, ${120 + i * 65}, 295)`}
                        >
                          {d.hour}
                        </text>
                      </g>
                    ))}
                  </>
                )}
              </svg>

              {/* Interactive Tooltip */}
              {hoveredPoint && (
                <div
                  className="absolute bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border-2 border-blue-200 pointer-events-none z-10 transition-all duration-200"
                  style={{
                    left: `${(hoveredPoint.x / 840) * 100}%`,
                    top: `${(hoveredPoint.y / 315) * 100}%`,
                    transform: "translate(-50%, -120%)",
                  }}
                >
                  <div className="text-sm font-bold text-slate-800 mb-2">
                    {hoveredPoint.data.type === "weekly" ? "Weekly Data" : "Hourly Data"}
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">{hoveredPoint.data.type === "weekly" ? "Day:" : "Time:"}</span>
                      <span className="font-medium">
                        {hoveredPoint.data.type === "weekly" ? hoveredPoint.data.day : hoveredPoint.data.hour}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Score:</span>
                      <span className="font-bold text-blue-600">{hoveredPoint.data.score}%</span>
                    </div>
                    {hoveredPoint.data.type === "weekly" && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Activities:</span>
                          <span className="font-medium">{hoveredPoint.data.activities}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Date:</span>
                          <span className="font-medium">{hoveredPoint.data.date}</span>
                        </div>
                      </>
                    )}
                    {hoveredPoint.data.type === "hourly" && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Period:</span>
                        <span className="font-medium">{hoveredPoint.data.period}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Enhanced Legend */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-slate-200">
                <div className="space-y-3">
                  <div className="text-sm font-bold text-slate-800 mb-2">Data Series</div>
                  {(selectedDataset === "weekly" || selectedDataset === "both") && (
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded"></div>
                      <span className="text-slate-700 text-sm font-medium">Weekly Trend</span>
                    </div>
                  )}
                  {(selectedDataset === "hourly" || selectedDataset === "both") && (
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded border-dashed border border-green-400"></div>
                      <span className="text-slate-700 text-sm font-medium">Hourly Pattern</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Performance Insights */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-slate-200">
                <div className="text-xs text-slate-600">
                  <div className="font-bold text-slate-800 mb-2">Peak Performance</div>
                  <div className="space-y-1">
                    <div>📈 Best Day: Friday (95%)</div>
                    <div>⏰ Best Hour: 9AM (95%)</div>
                    <div>📊 Average: 87%</div>
                    <div>🎯 Trend: ↗ Improving</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Analysis Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Mood Analysis */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
              <Brain className="h-6 w-6 mr-3 text-purple-600" />
              Interactive Mood Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {moodBreakdown.map((mood, index) => (
              <div
                key={mood.mood}
                className="space-y-2 group cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 group-hover:text-slate-900">{mood.mood}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-600">{mood.percentage}%</span>
                    <div className="text-xs text-slate-500">{mood.count} sessions</div>
                  </div>
                </div>
                <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${mood.color} rounded-full transition-all duration-1000 ease-out shadow-sm group-hover:shadow-md`}
                    style={{
                      width: `${mood.percentage}%`,
                      animationDelay: `${index * 200}ms`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Enhanced Wellness Metrics */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
              <Activity className="h-6 w-6 mr-3 text-green-600" />
              Wellness Metrics Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-center space-x-3">
                <Brain className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-semibold text-slate-800">Mood Analysis</span>
                  <div className="text-xs text-slate-600">Real-time emotion tracking</div>
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-600">{wellnessData.mood}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-center space-x-3">
                <User className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-semibold text-slate-800">Posture Tracking</span>
                  <div className="text-xs text-slate-600">Ergonomic monitoring</div>
                </div>
              </div>
              <span className="text-2xl font-bold text-green-600">{wellnessData.posture}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-center space-x-3">
                <Eye className="h-6 w-6 text-amber-600 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-semibold text-slate-800">Alertness Monitor</span>
                  <div className="text-xs text-slate-600">Focus level detection</div>
                </div>
              </div>
              <span className="text-2xl font-bold text-amber-600">{wellnessData.alertness}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
