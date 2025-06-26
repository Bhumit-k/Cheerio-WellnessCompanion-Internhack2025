"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, Clock, Star, Zap, Eye, Coffee, Heart, Brain } from "lucide-react"
import { toast } from "sonner"

interface Challenge {
  id: string
  title: string
  description: string
  progress: number
  target: number
  points: number
  icon: any
  timeRemaining?: string
  category: string
  isActive: boolean
  startTime?: number
  lastUpdate?: number
}

interface WellnessChallengesProps {
  onPointsEarned?: (points: number) => void
  onChallengeCompleted?: (challenge: Challenge) => void
}

export function WellnessChallenges({ onPointsEarned, onChallengeCompleted }: WellnessChallengesProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "Posture Perfect",
      description: "Maintain good posture for 4 hours today",
      progress: 0,
      target: 4,
      points: 50,
      icon: Target,
      timeRemaining: "8h left",
      category: "posture",
      isActive: false,
    },
    {
      id: "2",
      title: "Hydration Hero",
      description: "Drink 8 glasses of water throughout the day",
      progress: 0,
      target: 8,
      points: 30,
      icon: Coffee,
      timeRemaining: "8h left",
      category: "health",
      isActive: false,
    },
    {
      id: "3",
      title: "Break Master",
      description: "Take 6 micro-breaks this week",
      progress: 0,
      target: 6,
      points: 100,
      icon: Clock,
      timeRemaining: "3d left",
      category: "breaks",
      isActive: false,
    },
    {
      id: "4",
      title: "Eye Care Champion",
      description: "Complete 20-20-20 rule 10 times today",
      progress: 0,
      target: 10,
      points: 40,
      icon: Eye,
      timeRemaining: "5h left",
      category: "health",
      isActive: false,
    },
    {
      id: "5",
      title: "Mindful Moments",
      description: "Practice 3 breathing exercises today",
      progress: 0,
      target: 3,
      points: 60,
      icon: Heart,
      timeRemaining: "7h left",
      category: "mental",
      isActive: false,
    },
    {
      id: "6",
      title: "Focus Flow",
      description: "Maintain focus for 2 hours straight",
      progress: 0,
      target: 2,
      points: 80,
      icon: Brain,
      timeRemaining: "4h left",
      category: "mental",
      isActive: false,
    },
  ])

  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])

  // Auto-progress tracking for active challenges
  useEffect(() => {
    const interval = setInterval(() => {
      setChallenges((prevChallenges) =>
        prevChallenges.map((challenge) => {
          if (challenge.isActive && !completedChallenges.includes(challenge.id)) {
            const now = Date.now()
            const timeSinceStart = challenge.startTime ? (now - challenge.startTime) / 1000 : 0
            const timeSinceLastUpdate = challenge.lastUpdate ? (now - challenge.lastUpdate) / 1000 : 0

            // Different progress rates for different challenge types
            let progressIncrement = 0

            switch (challenge.category) {
              case "posture":
                // Progress every 30 seconds = 0.1 hours
                if (timeSinceLastUpdate >= 30) {
                  progressIncrement = 0.1
                }
                break
              case "health":
                // Progress every 45 seconds = 1 glass/exercise
                if (timeSinceLastUpdate >= 45) {
                  progressIncrement = 1
                }
                break
              case "breaks":
                // Progress every 60 seconds = 1 break
                if (timeSinceLastUpdate >= 60) {
                  progressIncrement = 1
                }
                break
              case "mental":
                // Progress every 40 seconds = 0.2 hours or 1 exercise
                if (timeSinceLastUpdate >= 40) {
                  progressIncrement = challenge.id === "6" ? 0.2 : 1
                }
                break
            }

            if (progressIncrement > 0) {
              const newProgress = Math.min(challenge.progress + progressIncrement, challenge.target)

              // Check if challenge is completed
              if (newProgress >= challenge.target && !completedChallenges.includes(challenge.id)) {
                setCompletedChallenges((prev) => [...prev, challenge.id])
                onPointsEarned?.(challenge.points)
                onChallengeCompleted?.(challenge)

                toast.success(`🏆 Challenge Completed!`, {
                  description: `You earned ${challenge.points} points for "${challenge.title}"`,
                  duration: 4000,
                })
              }

              return {
                ...challenge,
                progress: newProgress,
                lastUpdate: now,
              }
            }
          }
          return challenge
        }),
      )
    }, 1000) // Check every second

    return () => clearInterval(interval)
  }, [completedChallenges, onPointsEarned, onChallengeCompleted])

  const handleStartChallenge = (challengeId: string) => {
    const challenge = challenges.find((c) => c.id === challengeId)
    if (challenge && !challenge.isActive) {
      const now = Date.now()

      setChallenges((prevChallenges) =>
        prevChallenges.map((c) =>
          c.id === challengeId
            ? {
                ...c,
                isActive: true,
                startTime: now,
                lastUpdate: now,
                progress: 0, // Reset progress when starting
              }
            : c,
        ),
      )

      toast.success(`🎯 Started: ${challenge.title}`, {
        description: `Track your progress and earn ${challenge.points} points!`,
        duration: 3000,
      })
    }
  }

  const handlePauseChallenge = (challengeId: string) => {
    setChallenges((prevChallenges) => prevChallenges.map((c) => (c.id === challengeId ? { ...c, isActive: false } : c)))

    const challenge = challenges.find((c) => c.id === challengeId)
    toast.info(`⏸️ Paused: ${challenge?.title}`, {
      description: "You can resume this challenge anytime",
      duration: 2000,
    })
  }

  const handleCompleteChallenge = (challengeId: string) => {
    const challenge = challenges.find((c) => c.id === challengeId)
    if (challenge && !completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId])
      setChallenges(challenges.map((c) => (c.id === challengeId ? { ...c, progress: c.target, isActive: false } : c)))

      onPointsEarned?.(challenge.points)
      onChallengeCompleted?.(challenge)

      toast.success(`🏆 Challenge Completed!`, {
        description: `You earned ${challenge.points} points for "${challenge.title}"`,
        duration: 4000,
      })
    }
  }

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "posture":
        return "from-blue-500 to-cyan-500"
      case "health":
        return "from-green-500 to-emerald-500"
      case "breaks":
        return "from-purple-500 to-pink-500"
      case "mental":
        return "from-orange-500 to-red-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getCategoryBg = (category: string) => {
    switch (category) {
      case "posture":
        return "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200"
      case "health":
        return "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
      case "breaks":
        return "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
      case "mental":
        return "bg-gradient-to-br from-orange-50 to-red-50 border-orange-200"
      default:
        return "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200"
    }
  }

  const totalPoints = challenges.reduce((sum, challenge) => {
    return sum + (completedChallenges.includes(challenge.id) ? challenge.points : 0)
  }, 0)

  const completionRate = Math.round((completedChallenges.length / challenges.length) * 100)
  const activeCount = challenges.filter((c) => c.isActive).length

  return (
    <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-800">Wellness Challenges</CardTitle>
              <p className="text-sm text-gray-600">
                {activeCount > 0 ? `${activeCount} active challenges` : "Start challenges to earn points"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              {totalPoints}
            </div>
            <div className="text-xs text-gray-600">Points Earned</div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-blue-600">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>{completedChallenges.length} completed</span>
            <span>{activeCount} active</span>
            <span>{challenges.length - completedChallenges.length - activeCount} pending</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {challenges.map((challenge) => {
          const IconComponent = challenge.icon
          const isCompleted = completedChallenges.includes(challenge.id)
          const isActive = challenge.isActive
          const progressPercentage = (challenge.progress / challenge.target) * 100
          const canComplete = progressPercentage >= 100

          return (
            <div
              key={challenge.id}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                isCompleted
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-md"
                  : isActive
                    ? `${getCategoryBg(challenge.category)} border-2 shadow-lg scale-[1.02] ring-2 ring-blue-200`
                    : `${getCategoryBg(challenge.category)} hover:shadow-md hover:scale-[1.01]`
              }`}
            >
              {isActive && (
                <div className="absolute -top-1 -right-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              )}

              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${getCategoryGradient(challenge.category)} shadow-md`}
                  >
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-800 text-base">{challenge.title}</h3>
                      {isCompleted && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      {isActive && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>

                    <div className="flex items-center space-x-3 mb-3">
                      <Badge
                        className={`bg-gradient-to-r ${getCategoryGradient(challenge.category)} text-white text-xs px-3 py-1`}
                      >
                        +{challenge.points} pts
                      </Badge>
                      {challenge.timeRemaining && !isActive && (
                        <Badge variant="outline" className="text-xs text-gray-600 border-gray-300">
                          <Clock className="h-3 w-3 mr-1" />
                          {challenge.timeRemaining}
                        </Badge>
                      )}
                      {isActive && (
                        <Badge className="bg-blue-100 text-blue-700 px-3 py-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></div>
                          In Progress
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  {!isCompleted && canComplete && (
                    <Button
                      size="sm"
                      onClick={() => handleCompleteChallenge(challenge.id)}
                      className={`bg-gradient-to-r ${getCategoryGradient(challenge.category)} hover:shadow-lg text-white border-0 px-4 py-2`}
                    >
                      <Trophy className="h-4 w-4 mr-1" />
                      Complete
                    </Button>
                  )}

                  {!isCompleted && !canComplete && !isActive && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStartChallenge(challenge.id)}
                      className="border-2 hover:shadow-md px-4 py-2"
                    >
                      <Zap className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  )}

                  {isActive && !isCompleted && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePauseChallenge(challenge.id)}
                      className="border-2 hover:shadow-md px-4 py-2"
                    >
                      ⏸️ Pause
                    </Button>
                  )}

                  {isCompleted && (
                    <Badge className="bg-green-100 text-green-700 px-3 py-1">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Completed
                    </Badge>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">
                    {challenge.progress.toFixed(1)} / {challenge.target}{" "}
                    {challenge.category === "health"
                      ? challenge.id === "2"
                        ? "glasses"
                        : "exercises"
                      : challenge.category === "breaks"
                        ? "breaks"
                        : challenge.category === "mental"
                          ? challenge.id === "6"
                            ? "hours"
                            : "exercises"
                          : "hours"}
                  </span>
                  <span className="font-bold text-gray-800">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="relative">
                  <Progress value={progressPercentage} className="h-3 bg-gray-200" />
                  <div
                    className={`absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r ${getCategoryGradient(challenge.category)} transition-all duration-500`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                {isActive && (
                  <div className="text-xs text-blue-600 font-medium">
                    ⚡ Auto-tracking progress...{" "}
                    {challenge.progress < challenge.target ? "Keep going!" : "Almost done!"}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
