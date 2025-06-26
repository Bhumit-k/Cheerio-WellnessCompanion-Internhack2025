"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Calendar,
  Mail,
  Users,
  FileText,
  Video,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Crown,
  ExternalLink,
  Bell,
  BarChart3,
  Loader2,
} from "lucide-react"

interface Microsoft365Props {
  userPlan: "free" | "premium"
}

export function Microsoft365Integration({ userPlan }: Microsoft365Props) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStage, setConnectionStage] = useState<"idle" | "connecting" | "authorizing" | "connected" | "error">(
    "idle",
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [integrations, setIntegrations] = useState({
    calendar: false,
    teams: false,
    outlook: false,
    onedrive: false,
    planner: false,
    toDo: false,
  })

  const [calendarEvents, setCalendarEvents] = useState([
    {
      id: 1,
      title: "Team Standup",
      time: "9:00 AM - 9:30 AM",
      type: "meeting",
      wellnessImpact: "high",
    },
    {
      id: 2,
      title: "Project Review",
      time: "2:00 PM - 3:00 PM",
      type: "meeting",
      wellnessImpact: "medium",
    },
    {
      id: 3,
      title: "Focus Time",
      time: "10:00 AM - 12:00 PM",
      type: "focus",
      wellnessImpact: "low",
    },
  ])

  const [teamsStatus, setTeamsStatus] = useState<"available" | "busy" | "away" | "offline">("available")

  useEffect(() => {
    // Simulate fetching Teams status
    const fetchTeamsStatus = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const statuses = ["available", "busy", "away", "offline"]
      setTeamsStatus(statuses[Math.floor(Math.random() * statuses.length)])
    }

    if (isConnected && integrations.teams) {
      fetchTeamsStatus()
    }
  }, [isConnected, integrations.teams])

  const handleConnect = async () => {
    if (userPlan !== "premium") {
      alert("Microsoft 365 integration is only available for Premium users!")
      return
    }

    setIsConnecting(true)
    setConnectionStage("connecting")
    setErrorMessage(null)

    try {
      // Step 1: Initiate connection
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setConnectionStage("authorizing")

      // Step 2: Simulate OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Step 3: Enable integrations
      setIntegrations({
        calendar: true,
        teams: true,
        outlook: true,
        onedrive: true,
        planner: true,
        toDo: true,
      })

      setIsConnected(true)
      setConnectionStage("connected")
    } catch (error: any) {
      console.error("Connection error:", error)
      setErrorMessage("Failed to connect to Microsoft 365. Please try again.")
      setConnectionStage("error")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setIntegrations({
      calendar: false,
      teams: false,
      outlook: false,
      onedrive: false,
      planner: false,
      toDo: false,
    })
    setConnectionStage("idle")
    setErrorMessage(null)
  }

  const toggleIntegration = (service: keyof typeof integrations) => {
    if (!isConnected) return

    setIntegrations((prev) => ({
      ...prev,
      [service]: !prev[service],
    }))
  }

  if (userPlan !== "premium") {
    return (
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Crown className="h-6 w-6 text-purple-600" />
            <CardTitle className="text-xl text-purple-800">Premium Feature</CardTitle>
          </div>
          <CardDescription className="text-purple-600">
            Microsoft 365 integration is available for Premium users
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center space-y-2 p-4 bg-white/50 rounded-lg">
                <Calendar className="h-8 w-8 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Calendar Sync</span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 bg-white/50 rounded-lg">
                <Users className="h-8 w-8 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Teams Integration</span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 bg-white/50 rounded-lg">
                <Mail className="h-8 w-8 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Outlook Sync</span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 bg-white/50 rounded-lg">
                <BarChart3 className="h-8 w-8 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Smart Insights</span>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Premium
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Microsoft 365 Integration</CardTitle>
                <CardDescription>Connect your Microsoft 365 account for enhanced wellness insights</CardDescription>
              </div>
            </div>
            <Badge
              className={
                isConnected
                  ? "bg-green-100 text-green-700"
                  : connectionStage === "connecting" || connectionStage === "authorizing"
                    ? "bg-yellow-100 text-yellow-700 animate-pulse"
                    : "bg-gray-100 text-gray-700"
              }
            >
              {connectionStage === "connecting" || connectionStage === "authorizing" ? (
                <div className="flex items-center space-x-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Connecting...</span>
                </div>
              ) : isConnected ? (
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Connected</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>Not Connected</span>
                </div>
              )}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

          {!isConnected ? (
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Connect your Microsoft 365 account to enable smart calendar integration, Teams wellness notifications,
                and personalized insights.
              </p>
              <Button onClick={handleConnect} disabled={isConnecting} className="bg-blue-600 hover:bg-blue-700">
                {isConnecting ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{connectionStage === "authorizing" ? "Authorizing..." : "Connecting..."}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>Connect Microsoft 365</span>
                  </div>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Integration Toggles */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <Label className="font-medium">Calendar</Label>
                      <p className="text-xs text-gray-600">Sync meeting schedules</p>
                    </div>
                  </div>
                  <Switch checked={integrations.calendar} onCheckedChange={() => toggleIntegration("calendar")} />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <Label className="font-medium">Teams</Label>
                      <p className="text-xs text-gray-600">Wellness notifications</p>
                    </div>
                  </div>
                  <Switch checked={integrations.teams} onCheckedChange={() => toggleIntegration("teams")} />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <Label className="font-medium">Outlook</Label>
                      <p className="text-xs text-gray-600">Email wellness tips</p>
                    </div>
                  </div>
                  <Switch checked={integrations.outlook} onCheckedChange={() => toggleIntegration("outlook")} />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <Label className="font-medium">OneDrive</Label>
                      <p className="text-xs text-gray-600">Backup wellness data</p>
                    </div>
                  </div>
                  <Switch checked={integrations.onedrive} onCheckedChange={() => toggleIntegration("onedrive")} />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <Label className="font-medium">Planner</Label>
                      <p className="text-xs text-gray-600">Sync Planner tasks</p>
                    </div>
                  </div>
                  <Switch checked={integrations.planner} onCheckedChange={() => toggleIntegration("planner")} />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <Label className="font-medium">To Do</Label>
                      <p className="text-xs text-gray-600">Sync To Do tasks</p>
                    </div>
                  </div>
                  <Switch checked={integrations.toDo} onCheckedChange={() => toggleIntegration("toDo")} />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <Button variant="outline" onClick={handleDisconnect}>
                  Disconnect Account
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Settings
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Calendar Integration Preview */}
      {isConnected && integrations.calendar && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Today's Schedule & Wellness Impact</span>
            </CardTitle>
            <CardDescription>AI-powered insights on how your meetings affect your wellness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {calendarEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {event.type === "meeting" ? (
                      <Video className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-green-600" />
                    )}
                    <div>
                      <p className="font-medium text-gray-800">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.time}</p>
                    </div>
                  </div>
                  <Badge
                    className={
                      event.wellnessImpact === "high"
                        ? "bg-red-100 text-red-700"
                        : event.wellnessImpact === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    }
                  >
                    {event.wellnessImpact} impact
                  </Badge>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Bell className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">Smart Recommendation</span>
              </div>
              <p className="text-sm text-blue-700">
                You have 3 back-to-back meetings today. Consider scheduling a 10-minute wellness break between your 9:30
                AM and 2:00 PM meetings.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Teams Status Integration */}
      {isConnected && integrations.teams && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Teams Status</span>
            </CardTitle>
            <CardDescription>Reflect your Teams status for better focus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              <Badge
                className={
                  teamsStatus === "available"
                    ? "bg-green-100 text-green-700"
                    : teamsStatus === "busy"
                      ? "bg-red-100 text-red-700"
                      : teamsStatus === "away"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                }
              >
                {teamsStatus}
              </Badge>
              <p className="text-sm text-gray-600">
                Your current Teams status is set to <b>{teamsStatus}</b>.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
