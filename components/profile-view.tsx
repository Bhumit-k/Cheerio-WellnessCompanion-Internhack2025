"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Trophy,
  Clock,
  Edit3,
  Save,
  X,
  Star,
  Award,
  TrendingUp,
  Heart,
  Brain,
  Eye,
  Activity,
  Briefcase,
  Crown,
  Shield,
  Zap,
  BarChart3,
  LogOut,
} from "lucide-react"
import { toast } from "sonner"

interface UserData {
  id: string
  name: string
  email: string
  company?: string
  plan: "free" | "premium"
  joinDate: string
  avatar?: string | null
  phone?: string
  location?: string
  role?: string
  userType?: string
}

interface ProfileViewProps {
  userData: UserData | null
  onUpdateUser: (user: UserData) => void
  onLogout: () => void
}

export function ProfileView({ userData, onUpdateUser, onLogout }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(userData || {})

  const handleSave = () => {
    if (userData) {
      const updatedUser = editData as UserData

      // Update localStorage immediately
      localStorage.setItem("cheerio-user-data", JSON.stringify(updatedUser))

      // Trigger custom event for real-time sync across components
      window.dispatchEvent(
        new CustomEvent("cheerio:userUpdated", {
          detail: updatedUser,
        }),
      )

      onUpdateUser(updatedUser)
      setIsEditing(false)
      toast.success("Profile updated successfully! Changes will appear everywhere.")
    }
  }

  const handleCancel = () => {
    setEditData(userData || {})
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }))
  }

  if (!userData) {
    return (
      <div className="max-w-4xl mx-auto px-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">No user data available.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const userTypeOptions = ["Professional", "Student", "Freelancer", "Working Parent", "Consultant", "Other"]
  const roleOptions = [
    "Software Engineer",
    "Product Designer",
    "Data Scientist",
    "Marketing Manager",
    "Project Manager",
    "Student",
    "Freelancer",
    "Working Parent",
    "Consultant",
    "Other",
  ]

  const achievements = [
    {
      name: "Wellness Warrior",
      description: "7-day wellness streak",
      icon: Trophy,
      color: "text-yellow-600",
      earned: true,
    },
    {
      name: "Posture Pro",
      description: "Perfect posture for 5 hours",
      icon: User,
      color: "text-blue-600",
      earned: true,
    },
    {
      name: "Hydration Hero",
      description: "Met daily water goals for 30 days",
      icon: Heart,
      color: "text-cyan-600",
      earned: true,
    },
    {
      name: "Focus Master",
      description: "2+ hours of deep focus",
      icon: Brain,
      color: "text-purple-600",
      earned: true,
    },
    {
      name: "Break Champion",
      description: "Took all recommended breaks",
      icon: Clock,
      color: "text-green-600",
      earned: false,
    },
    {
      name: "Mood Booster",
      description: "Maintained positive mood for a week",
      icon: Star,
      color: "text-pink-600",
      earned: false,
    },
  ]

  const wellnessStats = [
    {
      label: "Overall Wellness Score",
      value: 87,
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      description: "Your comprehensive wellness rating",
    },
    {
      label: "Mood Analysis",
      value: 92,
      color: "bg-gradient-to-r from-green-400 to-green-600",
      description: "Emotional well-being tracking",
    },
    {
      label: "Posture Tracking",
      value: 85,
      color: "bg-gradient-to-r from-purple-400 to-purple-600",
      description: "Physical posture monitoring",
    },
    {
      label: "Alertness Level",
      value: 88,
      color: "bg-gradient-to-r from-orange-400 to-orange-600",
      description: "Focus and attention tracking",
    },
    {
      label: "Activity Level",
      value: 79,
      color: "bg-gradient-to-r from-pink-400 to-pink-600",
      description: "Movement and break compliance",
    },
  ]

  const activityHistory = [
    { date: "Today", activities: 8, score: 87, mood: "Focused" },
    { date: "Yesterday", activities: 12, score: 92, mood: "Energetic" },
    { date: "2 days ago", activities: 6, score: 78, mood: "Calm" },
    { date: "3 days ago", activities: 10, score: 85, mood: "Productive" },
    { date: "4 days ago", activities: 9, score: 88, mood: "Balanced" },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-600">Manage your account and wellness preferences</p>
      </div>

      {/* Profile Header */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                <p className="text-gray-600">
                  {editData.role || "Professional"} • {editData.userType || "Professional"}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge
                    className={
                      userData.plan === "premium" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
                    }
                  >
                    {userData.plan === "premium" ? (
                      <div className="flex items-center space-x-1">
                        <Crown className="h-3 w-3" />
                        <span>Premium Member</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <Zap className="h-3 w-3" />
                        <span>Free Member</span>
                      </div>
                    )}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Since {new Date(userData.joinDate).toLocaleDateString()}</span>
                    </div>
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="flex items-center space-x-2"
              >
                {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
              </Button>
              <Button
                onClick={onLogout}
                variant="outline"
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                {isEditing ? (
                  <Input
                    value={editData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="flex items-center mt-1 p-3 bg-white/50 rounded-lg">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    {userData.name}
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Email Address</Label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={editData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1"
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="flex items-center mt-1 p-3 bg-white/50 rounded-lg">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    {userData.email}
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                {isEditing ? (
                  <Input
                    type="tel"
                    value={editData.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-1"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="flex items-center mt-1 p-3 bg-white/50 rounded-lg">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    {editData.phone || "Not provided"}
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Location</Label>
                {isEditing ? (
                  <Input
                    value={editData.location || ""}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="mt-1"
                    placeholder="Enter your location"
                  />
                ) : (
                  <div className="flex items-center mt-1 p-3 bg-white/50 rounded-lg">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    {editData.location || "Not provided"}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">User Type</Label>
                {isEditing ? (
                  <Select
                    value={editData.userType || ""}
                    onValueChange={(value) => handleInputChange("userType", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      {userTypeOptions.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center mt-1 p-3 bg-white/50 rounded-lg">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    {editData.userType || "Professional"}
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Role</Label>
                {isEditing ? (
                  <Select value={editData.role || ""} onValueChange={(value) => handleInputChange("role", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center mt-1 p-3 bg-white/50 rounded-lg">
                    <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                    {editData.role || "Professional"}
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Company</Label>
                {isEditing ? (
                  <Input
                    value={editData.company || ""}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="mt-1"
                    placeholder="Enter your company"
                  />
                ) : (
                  <div className="flex items-center mt-1 p-3 bg-white/50 rounded-lg">
                    <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                    {editData.company || "Not provided"}
                  </div>
                )}
              </div>

              <div className="flex items-center mt-1 p-3 bg-white/50 rounded-lg">
                <Shield className="h-4 w-4 mr-2 text-gray-500" />
                <div>
                  <div className="text-sm font-medium text-gray-700">Account Status</div>
                  <div className="text-sm text-green-600">Active & Verified</div>
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex space-x-3 mt-6 pt-4 border-t border-blue-200">
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
              <Button onClick={handleCancel} variant="outline" className="flex items-center space-x-2">
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Wellness Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Wellness Stats */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Current Wellness Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wellnessStats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-800">{stat.label}</span>
                      <p className="text-xs text-gray-500">{stat.description}</p>
                    </div>
                    <span className="text-lg font-bold text-gray-800">{stat.value}%</span>
                  </div>
                  <Progress value={stat.value} className="h-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activityHistory.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800">{day.date}</div>
                    <div className="text-sm text-gray-600">
                      {day.activities} activities • {day.mood}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">{day.score}%</div>
                    <div className="text-xs text-gray-500">Wellness Score</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-yellow-600" />
            Achievements & Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon
              return (
                <div
                  key={achievement.name}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned
                      ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
                      : "bg-gray-50 border-gray-200 opacity-60"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <IconComponent className={`h-6 w-6 ${achievement.earned ? achievement.color : "text-gray-400"}`} />
                    <div className="flex-1">
                      <h4 className={`font-semibold ${achievement.earned ? "text-gray-800" : "text-gray-500"}`}>
                        {achievement.name}
                      </h4>
                      {achievement.earned && <Badge className="bg-green-100 text-green-700 text-xs">Earned</Badge>}
                    </div>
                  </div>
                  <p className={`text-sm ${achievement.earned ? "text-gray-600" : "text-gray-400"}`}>
                    {achievement.description}
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Wellness Score Explanation */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Understanding Your Wellness Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              Your Wellness Score is a comprehensive metric designed for professionals, students, working parents, and
              freelancers. It combines multiple aspects of your well-being throughout your work or study sessions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-800">Mood Analysis (25%)</div>
                    <div className="text-sm text-blue-600">Facial expression recognition</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <User className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-purple-800">Posture Tracking (25%)</div>
                    <div className="text-sm text-purple-600">Ergonomic positioning analysis</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <Eye className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="font-medium text-orange-800">Alertness Level (25%)</div>
                    <div className="text-sm text-orange-600">Focus and attention monitoring</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
                  <Activity className="h-5 w-5 text-pink-600" />
                  <div>
                    <div className="font-medium text-pink-800">Activity Level (25%)</div>
                    <div className="text-sm text-pink-600">Break compliance and movement</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Score Ranges:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="font-medium text-red-700">0-60:</span> Needs Attention
                </div>
                <div>
                  <span className="font-medium text-yellow-700">61-80:</span> Good Progress
                </div>
                <div>
                  <span className="font-medium text-green-700">81-100:</span> Excellent Wellness
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
