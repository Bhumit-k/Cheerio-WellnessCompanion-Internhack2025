"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  Clock,
  Moon,
  Sun,
  Volume2,
  Smartphone,
  Monitor,
  Eye,
  Coffee,
  Activity,
  Heart,
  Brain,
  Zap,
  Crown,
  Headphones,
  MessageSquare,
  BookOpen,
  Users,
} from "lucide-react"
import { toast } from "sonner"

interface SettingsPanelProps {
  userPlan?: "free" | "premium"
}

export function SettingsPanel({ userPlan = "free" }: SettingsPanelProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [settings, setSettings] = useState({
    notifications: {
      enabled: true,
      sound: true,
      desktop: true,
      mobile: true,
      email: false,
      postureReminders: true,
      breakReminders: true,
      hydrationReminders: true,
      eyeStrainReminders: true,
      achievementAlerts: true,
      moodCheckIns: true,
      focusSessionAlerts: true,
      endOfDayReports: false,
      weeklyReports: true,
      frequency: 30, // minutes
      quietHours: {
        enabled: false,
        start: "22:00",
        end: "08:00",
      },
    },
    wellness: {
      dailyGoal: 8,
      workHours: { start: "09:00", end: "17:00" },
      breakInterval: 60, // minutes
      postureCheckInterval: 15, // minutes
      hydrationInterval: 90, // minutes
      eyeStrainInterval: 20, // minutes
      focusSessionLength: 25, // minutes (Pomodoro)
      longBreakInterval: 4, // sessions
    },
    display: {
      theme: "light",
      compactMode: false,
      showWellnessPet: true,
      showProgressBars: true,
      animationsEnabled: true,
    },
    privacy: {
      dataCollection: true,
      analytics: true,
      crashReports: true,
      personalizedTips: true,
    },
  })

  // Load dark mode preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("cheerio-theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark)

    setIsDarkMode(shouldUseDark)
    setSettings((prev) => ({
      ...prev,
      display: { ...prev.display, theme: shouldUseDark ? "dark" : "light" },
    }))

    // Apply theme to document
    if (shouldUseDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }))

    toast.success("Settings updated", {
      description: "Your preferences have been saved",
      duration: 2000,
    })
  }

  const handleNestedSettingChange = (category: string, subCategory: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [subCategory]: {
          ...(prev[category as keyof typeof prev] as any)[subCategory],
          [key]: value,
        },
      },
    }))

    toast.success("Settings updated")
  }

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)

    // Update settings
    setSettings((prev) => ({
      ...prev,
      display: { ...prev.display, theme: newDarkMode ? "dark" : "light" },
    }))

    // Apply to document
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("cheerio-theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("cheerio-theme", "light")
    }

    toast.success(`Switched to ${newDarkMode ? "dark" : "light"} mode`)
  }

  const handleResetSettings = () => {
    toast.info("Settings reset to defaults", {
      description: "All preferences have been restored to default values",
      duration: 3000,
    })
  }

  const isPremiumFeature = (feature: string) => {
    const premiumFeatures = [
      "email",
      "endOfDayReports",
      "focusSessionAlerts",
      "moodCheckIns",
      "analytics",
      "personalizedTips",
    ]
    return premiumFeatures.includes(feature) && userPlan === "free"
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Customize your wellness experience</p>
      </div>

      {/* Theme Settings */}
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
            {isDarkMode ? (
              <Moon className="h-5 w-5 text-blue-600 mr-2" />
            ) : (
              <Sun className="h-5 w-5 text-orange-600 mr-2" />
            )}
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium dark:text-gray-200">Dark Mode</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
            </div>
            <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium dark:text-gray-200">Compact Mode</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Reduce spacing and padding</p>
            </div>
            <Switch
              checked={settings.display.compactMode}
              onCheckedChange={(value) => handleSettingChange("display", "compactMode", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium dark:text-gray-200">Animations</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Enable smooth transitions and effects</p>
            </div>
            <Switch
              checked={settings.display.animationsEnabled}
              onCheckedChange={(value) => handleSettingChange("display", "animationsEnabled", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium dark:text-gray-200">Show Wellness Pet</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Display your AI wellness companion</p>
            </div>
            <Switch
              checked={settings.display.showWellnessPet}
              onCheckedChange={(value) => handleSettingChange("display", "showWellnessPet", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications Settings */}
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
            <Bell className="h-5 w-5 text-blue-600 mr-2" />
            Notifications & Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium dark:text-gray-200">Enable Notifications</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Receive wellness reminders and alerts</p>
            </div>
            <Switch
              checked={settings.notifications.enabled}
              onCheckedChange={(value) => handleSettingChange("notifications", "enabled", value)}
            />
          </div>

          <Separator />

          {/* Notification Types */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700 dark:text-gray-300">Notification Types</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-blue-600" />
                    <Label className="text-sm dark:text-gray-200">Posture Reminders</Label>
                  </div>
                  <Switch
                    checked={settings.notifications.postureReminders}
                    onCheckedChange={(value) => handleSettingChange("notifications", "postureReminders", value)}
                    disabled={!settings.notifications.enabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Coffee className="h-4 w-4 text-orange-600" />
                    <Label className="text-sm dark:text-gray-200">Break Reminders</Label>
                  </div>
                  <Switch
                    checked={settings.notifications.breakReminders}
                    onCheckedChange={(value) => handleSettingChange("notifications", "breakReminders", value)}
                    disabled={!settings.notifications.enabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-cyan-600" />
                    <Label className="text-sm dark:text-gray-200">Hydration Reminders</Label>
                  </div>
                  <Switch
                    checked={settings.notifications.hydrationReminders}
                    onCheckedChange={(value) => handleSettingChange("notifications", "hydrationReminders", value)}
                    disabled={!settings.notifications.enabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-purple-600" />
                    <Label className="text-sm dark:text-gray-200">Eye Strain Reminders</Label>
                  </div>
                  <Switch
                    checked={settings.notifications.eyeStrainReminders}
                    onCheckedChange={(value) => handleSettingChange("notifications", "eyeStrainReminders", value)}
                    disabled={!settings.notifications.enabled}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-600" />
                    <Label className="text-sm dark:text-gray-200">Achievement Alerts</Label>
                  </div>
                  <Switch
                    checked={settings.notifications.achievementAlerts}
                    onCheckedChange={(value) => handleSettingChange("notifications", "achievementAlerts", value)}
                    disabled={!settings.notifications.enabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-pink-600" />
                    <Label className="text-sm dark:text-gray-200">Mood Check-ins</Label>
                    {isPremiumFeature("moodCheckIns") && <Crown className="h-3 w-3 text-purple-600" />}
                  </div>
                  <Switch
                    checked={settings.notifications.moodCheckIns}
                    onCheckedChange={(value) => handleSettingChange("notifications", "moodCheckIns", value)}
                    disabled={!settings.notifications.enabled || isPremiumFeature("moodCheckIns")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <Label className="text-sm dark:text-gray-200">Focus Session Alerts</Label>
                    {isPremiumFeature("focusSessionAlerts") && <Crown className="h-3 w-3 text-purple-600" />}
                  </div>
                  <Switch
                    checked={settings.notifications.focusSessionAlerts}
                    onCheckedChange={(value) => handleSettingChange("notifications", "focusSessionAlerts", value)}
                    disabled={!settings.notifications.enabled || isPremiumFeature("focusSessionAlerts")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-red-600" />
                    <Label className="text-sm dark:text-gray-200">Weekly Reports</Label>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyReports}
                    onCheckedChange={(value) => handleSettingChange("notifications", "weeklyReports", value)}
                    disabled={!settings.notifications.enabled}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Notification Delivery */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700 dark:text-gray-300">Delivery Methods</h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-blue-600" />
                  <Label className="text-sm dark:text-gray-200">Sound</Label>
                </div>
                <Switch
                  checked={settings.notifications.sound}
                  onCheckedChange={(value) => handleSettingChange("notifications", "sound", value)}
                  disabled={!settings.notifications.enabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Monitor className="h-4 w-4 text-green-600" />
                  <Label className="text-sm dark:text-gray-200">Desktop</Label>
                </div>
                <Switch
                  checked={settings.notifications.desktop}
                  onCheckedChange={(value) => handleSettingChange("notifications", "desktop", value)}
                  disabled={!settings.notifications.enabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-purple-600" />
                  <Label className="text-sm dark:text-gray-200">Mobile</Label>
                </div>
                <Switch
                  checked={settings.notifications.mobile}
                  onCheckedChange={(value) => handleSettingChange("notifications", "mobile", value)}
                  disabled={!settings.notifications.enabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-orange-600" />
                  <Label className="text-sm dark:text-gray-200">Email</Label>
                  {isPremiumFeature("email") && <Crown className="h-3 w-3 text-purple-600" />}
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(value) => handleSettingChange("notifications", "email", value)}
                  disabled={!settings.notifications.enabled || isPremiumFeature("email")}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Frequency Settings */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium dark:text-gray-200">
                General Reminder Frequency: {settings.notifications.frequency} minutes
              </Label>
              <Slider
                value={[settings.notifications.frequency]}
                onValueChange={(value) => handleSettingChange("notifications", "frequency", value[0])}
                min={15}
                max={120}
                step={15}
                disabled={!settings.notifications.enabled}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium dark:text-gray-200">
                  Posture Check: {settings.wellness.postureCheckInterval} minutes
                </Label>
                <Slider
                  value={[settings.wellness.postureCheckInterval]}
                  onValueChange={(value) => handleSettingChange("wellness", "postureCheckInterval", value[0])}
                  min={10}
                  max={60}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium dark:text-gray-200">
                  Break Interval: {settings.wellness.breakInterval} minutes
                </Label>
                <Slider
                  value={[settings.wellness.breakInterval]}
                  onValueChange={(value) => handleSettingChange("wellness", "breakInterval", value[0])}
                  min={30}
                  max={180}
                  step={15}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium dark:text-gray-200">
                  Hydration Reminder: {settings.wellness.hydrationInterval} minutes
                </Label>
                <Slider
                  value={[settings.wellness.hydrationInterval]}
                  onValueChange={(value) => handleSettingChange("wellness", "hydrationInterval", value[0])}
                  min={30}
                  max={240}
                  step={30}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium dark:text-gray-200">
                  Eye Strain Break: {settings.wellness.eyeStrainInterval} minutes
                </Label>
                <Slider
                  value={[settings.wellness.eyeStrainInterval]}
                  onValueChange={(value) => handleSettingChange("wellness", "eyeStrainInterval", value[0])}
                  min={10}
                  max={60}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Quiet Hours */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium dark:text-gray-200">Quiet Hours</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">Disable notifications during specific hours</p>
              </div>
              <Switch
                checked={settings.notifications.quietHours.enabled}
                onCheckedChange={(value) => handleNestedSettingChange("notifications", "quietHours", "enabled", value)}
              />
            </div>

            {settings.notifications.quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium dark:text-gray-200">Start Time</Label>
                  <Input
                    type="time"
                    value={settings.notifications.quietHours.start}
                    onChange={(e) => handleNestedSettingChange("notifications", "quietHours", "start", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium dark:text-gray-200">End Time</Label>
                  <Input
                    type="time"
                    value={settings.notifications.quietHours.end}
                    onChange={(e) => handleNestedSettingChange("notifications", "quietHours", "end", e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Wellness Goals */}
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
            <Clock className="h-5 w-5 text-orange-600 mr-2" />
            Wellness Goals & Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium dark:text-gray-200">
              Daily Activity Goal: {settings.wellness.dailyGoal} activities
            </Label>
            <Slider
              value={[settings.wellness.dailyGoal]}
              onValueChange={(value) => handleSettingChange("wellness", "dailyGoal", value[0])}
              min={3}
              max={20}
              step={1}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium dark:text-gray-200">Work Start Time</Label>
              <Input
                type="time"
                value={settings.wellness.workHours.start}
                onChange={(e) => handleNestedSettingChange("wellness", "workHours", "start", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium dark:text-gray-200">Work End Time</Label>
              <Input
                type="time"
                value={settings.wellness.workHours.end}
                onChange={(e) => handleNestedSettingChange("wellness", "workHours", "end", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium dark:text-gray-200">
              Focus Session Length: {settings.wellness.focusSessionLength} minutes
            </Label>
            <Slider
              value={[settings.wellness.focusSessionLength]}
              onValueChange={(value) => handleSettingChange("wellness", "focusSessionLength", value[0])}
              min={15}
              max={60}
              step={5}
            />
          </div>

          <Separator />

          <div className="flex justify-center">
            <Button variant="outline" size="sm" onClick={handleResetSettings}>
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Support Settings */}
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
            <Headphones className="h-5 w-5 text-green-600 mr-2" />
            Support & Help
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {userPlan === "premium" ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                <div className="flex items-center space-x-3 mb-3">
                  <Crown className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-green-800 dark:text-green-200">Priority Support Active</h3>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                  You have access to 24/7 priority support with dedicated wellness specialists.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">&lt; 2h</div>
                    <div className="text-xs text-green-600">Response Time</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">24/7</div>
                    <div className="text-xs text-green-600">Availability</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Headphones className="h-4 w-4 mr-2" />
                  Contact Priority Support
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Live Chat
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Bell className="h-4 w-4 mr-2" />
                    Schedule Call
                  </Button>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Support Preferences</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm dark:text-gray-200">Email notifications for support updates</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm dark:text-gray-200">SMS alerts for urgent issues</Label>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Crown className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Priority Support</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Upgrade to Premium for 24/7 priority support with dedicated wellness specialists.
                </p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center p-2 bg-white/50 dark:bg-gray-700/50 rounded">
                    <div className="text-sm font-bold text-purple-600">&lt; 2h</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Response</div>
                  </div>
                  <div className="text-center p-2 bg-white/50 dark:bg-gray-700/50 rounded">
                    <div className="text-sm font-bold text-purple-600">24/7</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Available</div>
                  </div>
                  <div className="text-center p-2 bg-white/50 dark:bg-gray-700/50 rounded">
                    <div className="text-sm font-bold text-purple-600">Expert</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Specialists</div>
                  </div>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade for Priority Support
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Community Support</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Help Center
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Community
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Premium Features Notice */}
      {userPlan === "free" && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Crown className="h-6 w-6 text-purple-600" />
              <div>
                <h3 className="font-semibold text-purple-800 dark:text-purple-200">Unlock Premium Features</h3>
                <p className="text-sm text-purple-600 dark:text-purple-300">
                  Upgrade to Premium for advanced notifications, email alerts, mood check-ins, and personalized
                  insights.
                </p>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Upgrade Now</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
