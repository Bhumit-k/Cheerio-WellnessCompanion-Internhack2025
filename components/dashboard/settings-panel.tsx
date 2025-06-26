"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function SettingsPanel() {
  const [cameraEnabled, setCameraEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [breakFrequency, setBreakFrequency] = useState(60)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Customize your Cheerio experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="camera">Camera Analysis</Label>
            <p className="text-xs text-gray-500">Enable facial and posture analysis</p>
          </div>
          <Switch id="camera" checked={cameraEnabled} onCheckedChange={setCameraEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifications">Notifications</Label>
            <p className="text-xs text-gray-500">Receive wellness suggestions</p>
          </div>
          <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="break-frequency">Break Reminder Frequency</Label>
            <span className="text-sm">{breakFrequency} minutes</span>
          </div>
          <Slider
            id="break-frequency"
            min={30}
            max={120}
            step={15}
            value={[breakFrequency]}
            onValueChange={(value) => setBreakFrequency(value[0])}
          />
          <p className="text-xs text-gray-500">How often Cheerio should suggest breaks</p>
        </div>
      </CardContent>
    </Card>
  )
}
