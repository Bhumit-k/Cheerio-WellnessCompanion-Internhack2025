"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Crown, Calendar, Users, FileText, CheckCircle, Settings } from "lucide-react"
import { Microsoft365Integration } from "@/components/integrations/microsoft-365"

interface IntegrationsPageProps {
  userPlan: "free" | "premium"
  onClose?: () => void
}

export function IntegrationsPage({ userPlan, onClose }: IntegrationsPageProps) {
  const [showIntegration, setShowIntegration] = useState(false)

  if (userPlan !== "premium") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 pt-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Crown className="h-8 w-8 text-purple-400" />
              <h1 className="text-4xl font-bold text-white">Premium Integration</h1>
            </div>
            <p className="text-xl text-blue-100 mb-6">Connect Microsoft 365 to enhance your wellness experience</p>
          </div>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 mb-8">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Crown className="h-6 w-6 text-purple-600" />
                <CardTitle className="text-2xl text-purple-800">Upgrade to Premium</CardTitle>
              </div>
              <CardDescription className="text-purple-600">
                Unlock Microsoft 365 integration to supercharge your wellness journey
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="p-6 bg-white/50 rounded-lg mb-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 2h10v10H2V2zm0 10h10v10H2V12zm10-10h10v10H12V2zm0 10h10v10H12V12z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-purple-800">Microsoft 365</h3>
                    <Badge className="bg-green-100 text-green-700 mt-1">Available Now</Badge>
                  </div>
                </div>
                <p className="text-purple-700 mb-4">
                  Connect your Microsoft 365 account for enhanced wellness insights and seamless integration
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-700">Calendar sync</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-700">Teams integration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-700">Outlook wellness tips</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-700">OneDrive backup</span>
                  </div>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Premium Benefits:</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Automatic wellness data sync across all Microsoft apps</li>
                    <li>• Smart meeting break suggestions based on calendar</li>
                    <li>• Personalized wellness tips in Outlook</li>
                    <li>• Secure backup of all wellness data to OneDrive</li>
                  </ul>
                </div>
              </div>

              <Button
                onClick={() => onClose?.()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>

          {onClose && (
            <div className="text-center">
              <Button
                onClick={onClose}
                variant="outline"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                Back to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Microsoft 365 Integration</h1>
          </div>
          <p className="text-xl text-blue-100 mb-6">
            Connect your Microsoft 365 account to enhance your wellness experience
          </p>
        </div>

        {/* Microsoft 365 Integration Card */}
        <Card className="bg-white/95 backdrop-blur-sm border-2 border-blue-200 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h10v10H2V2zm0 10h10v10H2V12zm10-10h10v10H12V2zm0 10h10v10H12V12z" />
                  </svg>
                </div>
                <div>
                  <CardTitle className="text-2xl">Microsoft 365</CardTitle>
                  <CardDescription className="text-lg">
                    Connect your Microsoft 365 account for enhanced wellness insights
                  </CardDescription>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4" />
                  <span>Available</span>
                </div>
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-800">Calendar Sync</h4>
                    <p className="text-sm text-blue-600">Smart break suggestions</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-800">Teams Integration</h4>
                    <p className="text-sm text-green-600">Status & wellness updates</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600" />
                  <div>
                    <h4 className="font-medium text-purple-800">Outlook Tips</h4>
                    <p className="text-sm text-purple-600">Personalized wellness</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <Globe className="h-6 w-6 text-orange-600" />
                  <div>
                    <h4 className="font-medium text-orange-800">OneDrive Backup</h4>
                    <p className="text-sm text-orange-600">Secure data storage</p>
                  </div>
                </div>
              </div>

              {/* Integration Button */}
              <div className="text-center">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
                  onClick={() => setShowIntegration(!showIntegration)}
                >
                  <div className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>{showIntegration ? "Hide Integration" : "Configure Integration"}</span>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Configuration */}
        {showIntegration && (
          <div className="mb-8">
            <Microsoft365Integration userPlan={userPlan} />
          </div>
        )}

        {onClose && (
          <div className="text-center">
            <Button
              onClick={onClose}
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              Back to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
