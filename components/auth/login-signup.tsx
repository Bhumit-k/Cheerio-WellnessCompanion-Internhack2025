"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building,
  Sparkles,
  Shield,
  Zap,
  Crown,
  CheckCircle,
  ArrowRight,
} from "lucide-react"

interface LoginSignupProps {
  onAuthSuccess: (userData: any) => void
}

export function LoginSignup({ onAuthSuccess }: LoginSignupProps) {
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium">("free")

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const userData = {
      id: "user_123",
      name: `${loginForm.email.split("@")[0]}`,
      email: loginForm.email,
      plan: "free", // Default to free for existing users
      joinDate: new Date().toISOString(),
      avatar: null,
    }

    localStorage.setItem("cheerio-user-data", JSON.stringify(userData))
    localStorage.setItem("cheerio-auth-token", "mock_token_123")

    setIsLoading(false)
    onAuthSuccess(userData)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (signupForm.password !== signupForm.confirmPassword) {
      alert("Passwords don't match!")
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const userData = {
      id: "user_" + Date.now(),
      name: `${signupForm.firstName} ${signupForm.lastName}`,
      email: signupForm.email,
      company: signupForm.company,
      plan: selectedPlan,
      joinDate: new Date().toISOString(),
      avatar: null,
    }

    localStorage.setItem("cheerio-user-data", JSON.stringify(userData))
    localStorage.setItem("cheerio-auth-token", "mock_token_" + Date.now())

    setIsLoading(false)
    onAuthSuccess(userData)
  }

  const handleDemoLogin = () => {
    const demoUser = {
      id: "demo_user",
      name: "Alex Johnson",
      email: "alex.johnson@company.com",
      company: "Tech Corp",
      plan: "premium",
      joinDate: new Date().toISOString(),
      avatar: null,
    }

    localStorage.setItem("cheerio-user-data", JSON.stringify(demoUser))
    localStorage.setItem("cheerio-auth-token", "demo_token")
    onAuthSuccess(demoUser)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image
              src="/images/cheerio-logo.png"
              alt="Cheerio"
              width={64}
              height={64}
              className="rounded-xl shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-white">Cheerio</h1>
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                AI Wellness Companion
              </Badge>
            </div>
          </div>
          <p className="text-blue-100 text-lg">Transform your workplace wellness with AI-powered insights</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">Welcome to Cheerio</CardTitle>
            <CardDescription className="text-gray-600">Sign in to your account or create a new one</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Sign In</span>
                </TabsTrigger>
                <TabsTrigger value="signup" className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Sign Up</span>
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember-me"
                      checked={loginForm.rememberMe}
                      onCheckedChange={(checked) =>
                        setLoginForm((prev) => ({ ...prev, rememberMe: checked as boolean }))
                      }
                    />
                    <Label htmlFor="remember-me" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Sign In</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Forgot your password?</button>
                </div>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-4">
                {/* Plan Selection */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Choose Your Plan</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPlan("free")}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedPlan === "free" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-gray-800">Free</span>
                      </div>
                      <p className="text-xs text-gray-600">Basic wellness tracking</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPlan("premium")}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedPlan === "premium"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Crown className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-gray-800">Premium</span>
                      </div>
                      <p className="text-xs text-gray-600">Advanced integrations</p>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="first-name"
                          placeholder="First name"
                          className="pl-10"
                          value={signupForm.firstName}
                          onChange={(e) => setSignupForm((prev) => ({ ...prev, firstName: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        placeholder="Last name"
                        value={signupForm.lastName}
                        onChange={(e) => setSignupForm((prev) => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="company"
                        placeholder="Your company name"
                        className="pl-10"
                        value={signupForm.company}
                        onChange={(e) => setSignupForm((prev) => ({ ...prev, company: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm((prev) => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agree-terms"
                      checked={signupForm.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setSignupForm((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                      }
                      required
                    />
                    <Label htmlFor="agree-terms" className="text-sm text-gray-600 leading-relaxed">
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-800">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-800">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className={`w-full ${
                      selectedPlan === "premium"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    }`}
                    disabled={isLoading || !signupForm.agreeToTerms}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Create {selectedPlan === "premium" ? "Premium" : "Free"} Account</span>
                        {selectedPlan === "premium" && <Crown className="h-4 w-4" />}
                        {selectedPlan === "free" && <Zap className="h-4 w-4" />}
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Demo Access */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">Want to try it first?</p>
                <Button
                  variant="outline"
                  onClick={handleDemoLogin}
                  className="w-full border-2 border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <div className="flex items-center space-x-2">
                    <Crown className="h-4 w-4" />
                    <span>Try Premium Demo</span>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 text-center">
          <div className="grid grid-cols-3 gap-4 text-blue-100">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-blue-800/40 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
              <span className="text-sm">Secure & Private</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-blue-800/40 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6" />
              </div>
              <span className="text-sm">AI-Powered</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-blue-800/40 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6" />
              </div>
              <span className="text-sm">Easy Setup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
