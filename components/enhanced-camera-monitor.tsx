"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Pause, Play, Activity, Eye, User, Brain, AlertTriangle, Mic } from "lucide-react"
import { toast } from "sonner"

interface WellnessData {
  mood: string
  posture: string
  alertness: string
  confidence: number
}

interface EnhancedCameraMonitorProps {
  isMonitoring?: boolean
  onStartMonitoring?: () => void
  onPauseMonitoring?: () => void
  wellnessData?: WellnessData
  onWellnessUpdate?: (data: WellnessData) => void
}

export function EnhancedCameraMonitor({
  isMonitoring = false,
  onStartMonitoring,
  onPauseMonitoring,
  wellnessData,
  onWellnessUpdate,
}: EnhancedCameraMonitorProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isActive, setIsActive] = useState(isMonitoring)
  const [isPaused, setIsPaused] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [currentWellnessData, setCurrentWellnessData] = useState<WellnessData>(
    wellnessData || {
      mood: "Neutral",
      posture: "Good",
      alertness: "Alert",
      confidence: 0.85,
    },
  )

  const [analysisMetrics, setAnalysisMetrics] = useState({
    faceDetected: false,
    eyeAspectRatio: 0.3,
    headPose: { pitch: 0, yaw: 0, roll: 0 },
    blinkRate: 15,
    focusScore: 85,
  })

  // Enhanced analysis simulation
  const analyzeWithAdvancedCV = async () => {
    try {
      const time = new Date().getHours()
      const minute = new Date().getMinutes()

      const mockAnalysis = {
        mood:
          time > 14 && Math.random() > 0.6
            ? "Tired"
            : minute % 15 === 0 && Math.random() > 0.7
              ? "Stressed"
              : ["Happy", "Neutral", "Focused"][Math.floor(Math.random() * 3)],
        posture: Math.random() > 0.75 ? "Slouching" : Math.random() > 0.9 ? "Forward Head" : "Good",
        alertness: time > 13 && time < 15 && Math.random() > 0.5 ? "Drowsy" : Math.random() > 0.8 ? "Tired" : "Alert",
        confidence: 0.7 + Math.random() * 0.3,
      }

      const metrics = {
        faceDetected: Math.random() > 0.1,
        eyeAspectRatio: 0.25 + Math.random() * 0.15,
        headPose: {
          pitch: (Math.random() - 0.5) * 30,
          yaw: (Math.random() - 0.5) * 40,
          roll: (Math.random() - 0.5) * 20,
        },
        blinkRate: 12 + Math.random() * 8,
        focusScore: 70 + Math.random() * 30,
      }

      setCurrentWellnessData(mockAnalysis)
      setAnalysisMetrics(metrics)
      onWellnessUpdate?.(mockAnalysis)
    } catch (error) {
      console.error("Analysis error:", error)
    }
  }

  useEffect(() => {
    let stream: MediaStream | null = null

    const setupCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 },
          },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setIsActive(true)
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        toast.error("Camera access denied", {
          description: "Please allow camera access to use wellness monitoring",
        })
      }
    }

    if (isActive && !isPaused) {
      setupCamera()
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isActive, isPaused])

  useEffect(() => {
    if (!isActive || isPaused) return

    const analysisInterval = setInterval(analyzeWithAdvancedCV, 2000)
    return () => clearInterval(analysisInterval)
  }, [isActive, isPaused])

  const toggleCamera = () => {
    if (isActive) {
      setIsPaused(!isPaused)
      if (!isPaused) {
        onPauseMonitoring?.()
      } else {
        onStartMonitoring?.()
      }
    } else {
      setIsActive(true)
      setIsPaused(false)
      onStartMonitoring?.()
    }
  }

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled)
    if (!voiceEnabled) {
      toast.success("🎤 Voice control enabled", {
        description: "Say 'Hey Cheerio' followed by commands",
      })
    } else {
      toast.info("🔇 Voice control disabled")
    }
  }

  const getStatusColor = (status: string, type: string) => {
    if (type === "mood") {
      return status === "Happy"
        ? "bg-green-500"
        : status === "Stressed"
          ? "bg-red-500"
          : status === "Tired"
            ? "bg-amber-500"
            : "bg-blue-500"
    } else if (type === "posture") {
      return status === "Good" ? "bg-green-500" : status === "Forward Head" ? "bg-amber-500" : "bg-red-500"
    } else {
      return status === "Alert" ? "bg-green-500" : status === "Drowsy" ? "bg-red-500" : "bg-amber-500"
    }
  }

  const getStatusIcon = (status: string, type: string) => {
    if (type === "mood") {
      return status === "Happy"
        ? "😊"
        : status === "Stressed"
          ? "😰"
          : status === "Tired"
            ? "😴"
            : status === "Focused"
              ? "🧠"
              : "😐"
    } else if (type === "posture") {
      return status === "Good" ? "✅" : status === "Forward Head" ? "👤" : "🪑"
    } else {
      return status === "Alert" ? "👁️" : status === "Drowsy" ? "😴" : "🥱"
    }
  }

  const getAlertLevel = () => {
    if (currentWellnessData.posture === "Slouching" || currentWellnessData.alertness === "Drowsy") {
      return "high"
    } else if (currentWellnessData.mood === "Stressed" || currentWellnessData.alertness === "Tired") {
      return "medium"
    }
    return "low"
  }

  return (
    <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Enhanced Wellness Monitor
            </CardTitle>
            <p className="text-gray-600">Advanced computer vision with intelligent voice control</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge
              variant="outline"
              className={`${
                getAlertLevel() === "high"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : getAlertLevel() === "medium"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-green-50 text-green-700 border-green-200"
              }`}
            >
              <Activity className="w-3 h-3 mr-1" />
              {isActive && !isPaused ? "Live" : "Offline"}
            </Badge>
            <Button
              variant="outline"
              onClick={toggleVoice}
              className={`shadow-lg hover:shadow-xl transition-all duration-200 ${
                voiceEnabled ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <Mic className={`h-4 w-4 mr-2 ${voiceEnabled ? "text-blue-600" : "text-gray-600"}`} />
              {voiceEnabled ? "Voice On" : "Voice Off"}
            </Button>
            <Button
              variant={isActive && !isPaused ? "destructive" : "default"}
              onClick={toggleCamera}
              className="shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {!isActive ? (
                <>
                  <Camera className="mr-2 h-4 w-4" />
                  Start Monitoring
                </>
              ) : isPaused ? (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enhanced Video Feed - Larger Size */}
          <div className="lg:col-span-2">
            <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              {isActive && !isPaused ? (
                <>
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

                  {/* Analysis Overlay */}
                  <div className="absolute inset-0">
                    {/* Face Detection Box */}
                    {analysisMetrics.faceDetected && (
                      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-green-400 rounded-lg opacity-80">
                        <div className="absolute -top-5 left-0 bg-green-400 text-black text-xs px-2 py-1 rounded">
                          Face Detected
                        </div>
                      </div>
                    )}

                    {/* Alert Indicator */}
                    {getAlertLevel() === "high" && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg animate-pulse">
                        <AlertTriangle className="h-3 w-3 inline mr-1" />
                        Alert
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-medium">Analyzing</span>
                      </div>
                      {voiceEnabled && (
                        <div className="text-white text-sm bg-blue-500/20 px-2 py-1 rounded">🎤 Voice Active</div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Camera Offline</p>
                    <p className="text-sm">Say "Hey Cheerio start monitoring" or click the button</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Status Cards */}
          <div className="lg:col-span-1 grid grid-cols-1 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <span className="text-lg">{getStatusIcon(currentWellnessData.mood, "mood")}</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(currentWellnessData.mood, "mood")}`}></div>
              </div>
              <h3 className="text-sm font-medium text-blue-700 mb-1">Mood Analysis</h3>
              <p className="text-xl font-bold text-blue-900">{currentWellnessData.mood}</p>
              <p className="text-xs text-blue-600 mt-2">Facial expression detection</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-green-600" />
                  <span className="text-lg">{getStatusIcon(currentWellnessData.posture, "posture")}</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(currentWellnessData.posture, "posture")}`}></div>
              </div>
              <h3 className="text-sm font-medium text-green-700 mb-1">Posture Analysis</h3>
              <p className="text-xl font-bold text-green-900">{currentWellnessData.posture}</p>
              <p className="text-xs text-green-600 mt-2">Body alignment tracking</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 border border-amber-200/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-amber-600" />
                  <span className="text-lg">{getStatusIcon(currentWellnessData.alertness, "alertness")}</span>
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${getStatusColor(currentWellnessData.alertness, "alertness")}`}
                ></div>
              </div>
              <h3 className="text-sm font-medium text-amber-700 mb-1">Alertness Level</h3>
              <p className="text-xl font-bold text-amber-900">{currentWellnessData.alertness}</p>
              <p className="text-xs text-amber-600 mt-2">Eye movement analysis</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
