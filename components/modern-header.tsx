"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Menu,
  X,
  MessageSquare,
  Activity,
  BarChart3,
  BookOpen,
  Clock,
  AlertTriangle,
  User,
  Settings,
  LogOut,
  UserCircle,
  Crown,
  UserCheck,
  Globe,
} from "lucide-react"

interface ModernHeaderProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
  userPlan?: "free" | "premium"
}

export function ModernHeader({ activeTab = "dashboard", onTabChange, userPlan = "premium" }: ModernHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAlarms, setShowAlarms] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [notifications] = useState(3)
  const [alarms] = useState(2)
  const [userProfile, setUserProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
  })

  const notificationRef = useRef<HTMLDivElement>(null)
  const alarmRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (alarmRef.current && !alarmRef.current.contains(event.target as Node)) {
        setShowAlarms(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Load user profile from localStorage and listen for updates
  useEffect(() => {
    const loadUserData = () => {
      const savedProfile = localStorage.getItem("cheerio-user-data")
      if (savedProfile) {
        try {
          const profile = JSON.parse(savedProfile)
          setUserProfile({
            name: profile.name || "Alex Johnson",
            email: profile.email || "alex.johnson@company.com",
          })
        } catch (error) {
          console.error("Error parsing user data:", error)
        }
      }
    }

    loadUserData()

    // Listen for profile updates
    const handleUserUpdate = (event: CustomEvent) => {
      const updatedUser = event.detail
      setUserProfile({
        name: updatedUser.name || "Alex Johnson",
        email: updatedUser.email || "alex.johnson@company.com",
      })
    }

    window.addEventListener("cheerio:userUpdated", handleUserUpdate as EventListener)

    return () => {
      window.removeEventListener("cheerio:userUpdated", handleUserUpdate as EventListener)
    }
  }, [])

  const handleTabClick = (tab: string) => {
    onTabChange?.(tab)
    setIsMobileMenuOpen(false)
  }

  const handleNotificationAction = (action: string) => {
    console.log(`Notification action: ${action}`)
  }

  const handleAlarmAction = (action: string, alarmType: string) => {
    console.log(`Alarm action: ${action} for ${alarmType}`)
  }

  const handleProfileAction = (action: string) => {
    console.log(`Profile action: ${action}`)
    setShowProfile(false)

    if (action === "settings") {
      onTabChange?.("settings")
      return
    }

    if (action === "view-profile") {
      onTabChange?.("profile")
      return
    }

    if (action === "logout") {
      localStorage.removeItem("cheerio-user-data")
      localStorage.removeItem("cheerio-settings")
      alert("You have been signed out successfully!")
      window.location.reload()
    }
  }

  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b border-blue-800/30 sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 py-2">
          {/* Logo - RESPONSIVE */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <div className="relative">
              <Image
                src="/images/cheerio-logo.png"
                alt="Cheerio"
                width={40}
                height={40}
                className="sm:w-12 sm:h-12 rounded-xl shadow-lg"
              />
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <h1 className="text-lg sm:text-2xl font-bold text-white">Cheerio</h1>
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1">
                <span className="hidden sm:inline">AI Wellness</span>
                <span className="sm:hidden">AI</span>
              </Badge>
            </div>
          </div>

          {/* Desktop Navigation - HIDDEN ON MOBILE */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-1 justify-center max-w-4xl">
            <Button
              variant="ghost"
              className={`px-3 xl:px-4 py-2 rounded-lg transition-all text-sm xl:text-base ${
                activeTab === "dashboard"
                  ? "text-white bg-blue-700/60 shadow-lg"
                  : "text-blue-100 hover:text-white hover:bg-blue-800/40"
              }`}
              onClick={() => handleTabClick("dashboard")}
            >
              <Activity className="h-4 w-4 mr-1 xl:mr-2" />
              <span className="hidden xl:inline">Dashboard</span>
              <span className="xl:hidden">Home</span>
            </Button>
            <Button
              variant="ghost"
              className={`px-3 xl:px-4 py-2 rounded-lg transition-all text-sm xl:text-base ${
                activeTab === "analytics"
                  ? "text-white bg-blue-700/60 shadow-lg"
                  : "text-blue-100 hover:text-white hover:bg-blue-800/40"
              }`}
              onClick={() => handleTabClick("analytics")}
            >
              <BarChart3 className="h-4 w-4 mr-1 xl:mr-2" />
              <span className="hidden xl:inline">Analytics</span>
              <span className="xl:hidden">Stats</span>
            </Button>
            <Button
              variant="ghost"
              className={`px-3 xl:px-4 py-2 rounded-lg transition-all text-sm xl:text-base ${
                activeTab === "resources"
                  ? "text-white bg-blue-700/60 shadow-lg"
                  : "text-blue-100 hover:text-white hover:bg-blue-800/40"
              }`}
              onClick={() => handleTabClick("resources")}
            >
              <BookOpen className="h-4 w-4 mr-1 xl:mr-2" />
              <span className="hidden xl:inline">Resources</span>
              <span className="xl:hidden">Learn</span>
            </Button>
            <Button
              variant="ghost"
              className={`px-3 xl:px-4 py-2 rounded-lg transition-all relative text-sm xl:text-base ${
                activeTab === "consultation"
                  ? "text-white bg-blue-700/60 shadow-lg"
                  : "text-blue-100 hover:text-white hover:bg-blue-800/40"
              } ${userPlan !== "premium" ? "opacity-60" : ""}`}
              onClick={() => {
                if (userPlan !== "premium") {
                  alert("Consultations are only available for Premium users! Upgrade to access this feature.")
                  return
                }
                handleTabClick("consultation")
              }}
              title={userPlan !== "premium" ? "Premium feature - Upgrade to access" : "Consultation"}
            >
              <UserCheck className="h-4 w-4 mr-1 xl:mr-2" />
              <span className="hidden xl:inline">Consultation</span>
              <span className="xl:hidden">Coach</span>
              {userPlan !== "premium" && (
                <Crown className="absolute -top-1 -right-1 h-3 w-3 text-purple-400 bg-slate-900 rounded-full p-0.5" />
              )}
            </Button>
            <Button
              variant="ghost"
              className={`px-3 xl:px-4 py-2 rounded-lg transition-all relative text-sm xl:text-base ${
                activeTab === "integrations"
                  ? "text-white bg-blue-700/60 shadow-lg"
                  : "text-blue-100 hover:text-white hover:bg-blue-800/40"
              } ${userPlan !== "premium" ? "opacity-60" : ""}`}
              onClick={() => {
                if (userPlan !== "premium") {
                  alert("Integrations are only available for Premium users! Upgrade to access this feature.")
                  return
                }
                handleTabClick("integrations")
              }}
              title={userPlan !== "premium" ? "Premium feature - Upgrade to access" : "Integrations"}
            >
              <Globe className="h-4 w-4 mr-1 xl:mr-2" />
              <span className="hidden xl:inline">Integrations</span>
              <span className="xl:hidden">Apps</span>
              {userPlan !== "premium" && (
                <Crown className="absolute -top-1 -right-1 h-3 w-3 text-purple-400 bg-slate-900 rounded-full p-0.5" />
              )}
            </Button>
            <Button
              variant="ghost"
              className={`px-3 xl:px-4 py-2 rounded-lg transition-all text-sm xl:text-base ${
                activeTab === "pricing"
                  ? "text-white bg-blue-700/60 shadow-lg"
                  : "text-blue-100 hover:text-white hover:bg-blue-800/40"
              }`}
              onClick={() => handleTabClick("pricing")}
            >
              <Crown className="h-4 w-4 mr-1 xl:mr-2" />
              <span className="hidden xl:inline">Pricing</span>
              <span className="xl:hidden">Pro</span>
            </Button>
          </nav>

          {/* Actions - RESPONSIVE */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 relative">
            {/* Notifications */}
            <div ref={notificationRef} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-blue-100 hover:text-white hover:bg-blue-800/40 rounded-lg w-8 h-8 sm:w-10 sm:h-10"
                onClick={() => {
                  setShowNotifications(!showNotifications)
                  setShowAlarms(false)
                  setShowProfile(false)
                }}
              >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                {notifications > 0 && (
                  <div className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-[9px] sm:text-[10px] font-medium text-white">
                    {notifications}
                  </div>
                )}
              </Button>

              {/* Notification Panel - RESPONSIVE */}
              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Notifications</h3>
                      <Badge className="bg-red-100 text-red-700 text-xs">{notifications} new</Badge>
                    </div>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      <div className="p-2 sm:p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-medium text-red-800 text-xs sm:text-sm">Posture Alert</h4>
                            <p className="text-red-600 text-xs mt-1">You've been slouching for 15 minutes</p>
                            <div className="flex space-x-1 sm:space-x-2 mt-2">
                              <button
                                onClick={() => handleNotificationAction("take-break")}
                                className="px-2 sm:px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors"
                              >
                                Take Break (+25 pts)
                              </button>
                              <button
                                onClick={() => handleNotificationAction("remind-later")}
                                className="px-2 sm:px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-md hover:bg-gray-300 transition-colors"
                              >
                                Later
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start space-x-2">
                          <Bell className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-medium text-blue-800 text-xs sm:text-sm">Hydration Reminder</h4>
                            <p className="text-blue-600 text-xs mt-1">Time for a water break!</p>
                            <div className="flex space-x-1 sm:space-x-2 mt-2">
                              <button
                                onClick={() => handleNotificationAction("mark-hydrated")}
                                className="px-2 sm:px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors"
                              >
                                Mark Done (+15 pts)
                              </button>
                              <button
                                onClick={() => handleNotificationAction("snooze")}
                                className="px-2 sm:px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-md hover:bg-gray-300 transition-colors"
                              >
                                Snooze
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Alarms */}
            <div ref={alarmRef} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-blue-100 hover:text-white hover:bg-blue-800/40 rounded-lg w-8 h-8 sm:w-10 sm:h-10"
                onClick={() => {
                  setShowAlarms(!showAlarms)
                  setShowNotifications(false)
                  setShowProfile(false)
                }}
              >
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                {alarms > 0 && (
                  <div className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-[9px] sm:text-[10px] font-medium text-white">
                    {alarms}
                  </div>
                )}
              </Button>

              {/* Alarm Panel - RESPONSIVE */}
              {showAlarms && (
                <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Wellness Alarms</h3>
                      <Badge className="bg-blue-100 text-blue-700 text-xs">{alarms} active</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="p-2 sm:p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <div className="flex items-start space-x-2">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-medium text-amber-800 text-xs sm:text-sm">Break Reminder</h4>
                            <p className="text-amber-600 text-xs mt-1">Every 60 minutes</p>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-xs text-amber-600">Next: 15 min</span>
                              <div className="flex space-x-1 sm:space-x-2">
                                <button
                                  onClick={() => handleAlarmAction("snooze", "break")}
                                  className="px-2 py-1 bg-amber-500 text-white text-xs rounded hover:bg-amber-600 transition-colors"
                                >
                                  Snooze
                                </button>
                                <button
                                  onClick={() => handleAlarmAction("disable", "break")}
                                  className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 transition-colors"
                                >
                                  Disable
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 sm:p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start space-x-2">
                          <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-medium text-green-800 text-xs sm:text-sm">Posture Check</h4>
                            <p className="text-green-600 text-xs mt-1">Every 30 minutes</p>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-xs text-green-600">Next: 8 min</span>
                              <div className="flex space-x-1 sm:space-x-2">
                                <button
                                  onClick={() => handleAlarmAction("snooze", "posture")}
                                  className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                                >
                                  Snooze
                                </button>
                                <button
                                  onClick={() => handleAlarmAction("disable", "posture")}
                                  className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 transition-colors"
                                >
                                  Disable
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div ref={profileRef} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-blue-800/40 rounded-lg w-8 h-8 sm:w-10 sm:h-10"
                onClick={() => {
                  setShowProfile(!showProfile)
                  setShowNotifications(false)
                  setShowAlarms(false)
                }}
              >
                <div className="w-6 h-6 sm:w-9 sm:h-9 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                  <User className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
                </div>
              </Button>

              {/* Profile Panel - RESPONSIVE */}
              {showProfile && (
                <div className="absolute top-full right-0 mt-2 w-64 sm:w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="p-3 sm:p-4">
                    {/* Profile Header */}
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4 pb-3 border-b border-gray-200">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                        <User className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                          {userProfile.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{userProfile.email}</p>
                        <Badge
                          className={`text-xs mt-1 ${userPlan === "premium" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                        >
                          {userPlan === "premium" ? "Premium Member" : "Free Member"}
                        </Badge>
                      </div>
                    </div>

                    {/* Wellness Stats */}
                    <div className="mb-3 sm:mb-4 pb-3 border-b border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2 text-xs sm:text-sm">Today's Progress</h4>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <div className="text-center p-2 bg-blue-50 rounded-lg">
                          <div className="text-base sm:text-lg font-bold text-blue-600">87%</div>
                          <div className="text-xs text-blue-600">Wellness Score</div>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded-lg">
                          <div className="text-base sm:text-lg font-bold text-purple-600">245</div>
                          <div className="text-xs text-purple-600">Points Earned</div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Actions */}
                    <div className="space-y-1 sm:space-y-2">
                      <button
                        onClick={() => handleProfileAction("view-profile")}
                        className="w-full flex items-center space-x-2 sm:space-x-3 p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <UserCircle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                        <span className="text-xs sm:text-sm text-gray-700">View Profile</span>
                      </button>

                      <button
                        onClick={() => handleProfileAction("settings")}
                        className="w-full flex items-center space-x-2 sm:space-x-3 p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Settings className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                        <span className="text-xs sm:text-sm text-gray-700">Settings</span>
                      </button>

                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <button
                          onClick={() => handleProfileAction("logout")}
                          className="w-full flex items-center space-x-2 sm:space-x-3 p-2 text-left hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <LogOut className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                          <span className="text-xs sm:text-sm text-red-600">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-blue-100 hover:text-white rounded-lg w-8 h-8 sm:w-10 sm:h-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - RESPONSIVE */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 sm:py-4 border-t border-blue-800/30">
            <nav className="flex flex-col space-y-1 sm:space-y-2">
              <Button
                variant="ghost"
                className={`justify-start rounded-lg text-sm sm:text-base ${
                  activeTab === "dashboard"
                    ? "text-white bg-blue-700/60"
                    : "text-blue-100 hover:text-white hover:bg-blue-800/40"
                }`}
                onClick={() => handleTabClick("dashboard")}
              >
                <Activity className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className={`justify-start rounded-lg text-sm sm:text-base ${
                  activeTab === "analytics"
                    ? "text-white bg-blue-700/60"
                    : "text-blue-100 hover:text-white hover:bg-blue-800/40"
                }`}
                onClick={() => handleTabClick("analytics")}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button
                variant="ghost"
                className={`justify-start rounded-lg text-sm sm:text-base ${
                  activeTab === "resources"
                    ? "text-white bg-blue-700/60"
                    : "text-blue-100 hover:text-white hover:bg-blue-800/40"
                }`}
                onClick={() => handleTabClick("resources")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Resources
              </Button>
              <Button
                variant="ghost"
                className={`justify-start rounded-lg text-sm sm:text-base relative ${
                  activeTab === "consultation"
                    ? "text-white bg-blue-700/60"
                    : "text-blue-100 hover:text-white hover:bg-blue-800/40"
                } ${userPlan !== "premium" ? "opacity-60" : ""}`}
                onClick={() => {
                  if (userPlan !== "premium") {
                    alert("Consultations are only available for Premium users! Upgrade to access this feature.")
                    return
                  }
                  handleTabClick("consultation")
                }}
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Consultation
                {userPlan !== "premium" && (
                  <Crown className="absolute -top-1 -right-1 h-3 w-3 text-purple-400 bg-slate-900 rounded-full p-0.5" />
                )}
              </Button>
              <Button
                variant="ghost"
                className={`justify-start rounded-lg text-sm sm:text-base relative ${
                  activeTab === "integrations"
                    ? "text-white bg-blue-700/60"
                    : "text-blue-100 hover:text-white hover:bg-blue-800/40"
                } ${userPlan !== "premium" ? "opacity-60" : ""}`}
                onClick={() => {
                  if (userPlan !== "premium") {
                    alert("Integrations are only available for Premium users! Upgrade to access this feature.")
                    return
                  }
                  handleTabClick("integrations")
                }}
              >
                <Globe className="h-4 w-4 mr-2" />
                Integrations
                {userPlan !== "premium" && (
                  <Crown className="absolute -top-1 -right-1 h-3 w-3 text-purple-400 bg-slate-900 rounded-full p-0.5" />
                )}
              </Button>
              <Button
                variant="ghost"
                className={`justify-start rounded-lg text-sm sm:text-base ${
                  activeTab === "pricing"
                    ? "text-white bg-blue-700/60"
                    : "text-blue-100 hover:text-white hover:bg-blue-800/40"
                }`}
                onClick={() => handleTabClick("pricing")}
              >
                <Crown className="h-4 w-4 mr-2" />
                Pricing
              </Button>
              <Button
                variant="ghost"
                className={`justify-start rounded-lg text-sm sm:text-base ${
                  activeTab === "profile"
                    ? "text-white bg-blue-700/60"
                    : "text-blue-100 hover:text-white hover:bg-blue-800/40"
                }`}
                onClick={() => handleTabClick("profile")}
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
