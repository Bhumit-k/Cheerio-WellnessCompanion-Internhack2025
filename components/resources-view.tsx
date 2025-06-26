"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Video,
  Headphones,
  Clock,
  Star,
  Music,
  Globe,
  Play,
  Lock,
  ExternalLink,
  Download,
} from "lucide-react"

interface ResourcesViewProps {
  userPlan?: "free" | "premium"
}

export function ResourcesView({ userPlan = "free" }: ResourcesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const resources = [
    // Exercise Resources
    {
      id: 1,
      title: "5-Minute Desk Stretches",
      type: "Video",
      duration: "5 min",
      category: "Exercise",
      rating: 4.8,
      description: "Quick stretching routine to improve posture and reduce tension",
      icon: Video,
      color: "bg-blue-500",
      url: "https://www.youtube.com/watch?v=RqcOCBb4arc",
      premium: false,
    },
    {
      id: 2,
      title: "Office Yoga for Beginners",
      type: "Video",
      duration: "15 min",
      category: "Exercise",
      rating: 4.9,
      description: "Gentle yoga poses you can do at your desk or in a small space",
      icon: Video,
      color: "bg-green-500",
      url: "https://www.youtube.com/watch?v=M-8FvS8nvCs",
      premium: false,
    },
    {
      id: 3,
      title: "Neck and Shoulder Relief",
      type: "Video",
      duration: "8 min",
      category: "Exercise",
      rating: 4.7,
      description: "Target neck and shoulder tension from computer work",
      icon: Video,
      color: "bg-blue-600",
      url: "https://www.youtube.com/watch?v=VaoV1PrYft4",
      premium: false,
    },
    {
      id: 4,
      title: "10-Minute Morning Energizer",
      type: "Video",
      duration: "10 min",
      category: "Exercise",
      rating: 4.8,
      description: "Start your day with energy-boosting movements",
      icon: Video,
      color: "bg-orange-500",
      url: "https://www.youtube.com/watch?v=ji8WkgQz1vQ",
      premium: false,
    },
    {
      id: 5,
      title: "Chair Exercises for Office Workers",
      type: "Video",
      duration: "12 min",
      category: "Exercise",
      rating: 4.6,
      description: "Full body workout you can do sitting in your chair",
      icon: Video,
      color: "bg-purple-500",
      url: "https://www.youtube.com/watch?v=fPKYlqYAhOM",
      premium: false,
    },

    // Meditation Resources
    {
      id: 6,
      title: "Mindful Breathing Techniques",
      type: "Audio",
      duration: "10 min",
      category: "Meditation",
      rating: 4.9,
      description: "Guided breathing exercises for stress relief and focus",
      icon: Headphones,
      color: "bg-green-500",
      url: "https://www.headspace.com/meditation/breathing",
      premium: false,
    },
    {
      id: 7,
      title: "5-Minute Meditation for Busy People",
      type: "Video",
      duration: "5 min",
      category: "Meditation",
      rating: 4.8,
      description: "Quick meditation session perfect for work breaks",
      icon: Video,
      color: "bg-purple-500",
      url: "https://www.youtube.com/watch?v=inpok4MKVLM",
      premium: false,
    },
    {
      id: 8,
      title: "Body Scan Relaxation",
      type: "Audio",
      duration: "12 min",
      category: "Meditation",
      rating: 4.7,
      description: "Progressive muscle relaxation for deep stress relief",
      icon: Headphones,
      color: "bg-indigo-500",
      url: "https://www.youtube.com/watch?v=15q-N-_kkrU",
      premium: false,
    },
    {
      id: 9,
      title: "Workplace Stress Relief Meditation",
      type: "Video",
      duration: "8 min",
      category: "Meditation",
      rating: 4.9,
      description: "Specifically designed for reducing work-related stress",
      icon: Video,
      color: "bg-teal-500",
      url: "https://www.youtube.com/watch?v=ZToicYcHIOU",
      premium: false,
    },
    {
      id: 10,
      title: "Mindfulness at Work",
      type: "Video",
      duration: "15 min",
      category: "Meditation",
      rating: 4.8,
      description: "Learn to stay present and focused during work hours",
      icon: Video,
      color: "bg-cyan-500",
      url: "https://www.youtube.com/watch?v=6p_yaNFSYao",
      premium: false,
    },

    // Ergonomics Resources
    {
      id: 11,
      title: "Ergonomic Workspace Setup",
      type: "Guide",
      duration: "15 min read",
      category: "Ergonomics",
      rating: 4.7,
      description: "Complete guide to setting up your workspace for optimal health",
      icon: BookOpen,
      color: "bg-purple-500",
      url: "https://www.mayoclinic.org/healthy-living/adult-health/in-depth/office-ergonomics/art-20046169",
      premium: false,
    },
    {
      id: 12,
      title: "Perfect Posture Guide",
      type: "Video",
      duration: "12 min",
      category: "Ergonomics",
      rating: 4.8,
      description: "Learn proper sitting and standing posture techniques",
      icon: Video,
      color: "bg-red-500",
      url: "https://www.youtube.com/watch?v=RqcOCBb4arc",
      premium: false,
    },
    {
      id: 13,
      title: "Eye Strain Prevention Tips",
      type: "Guide",
      duration: "8 min read",
      category: "Ergonomics",
      rating: 4.6,
      description: "Protect your eyes from computer screen fatigue",
      icon: BookOpen,
      color: "bg-cyan-500",
      url: "https://www.aoa.org/healthy-eyes/eye-and-vision-conditions/computer-vision-syndrome",
      premium: false,
    },
    {
      id: 14,
      title: "Standing Desk Benefits",
      type: "Guide",
      duration: "10 min read",
      category: "Ergonomics",
      rating: 4.5,
      description: "How to properly use a standing desk for better health",
      icon: BookOpen,
      color: "bg-yellow-500",
      url: "https://www.healthline.com/health/standing-desk-benefits",
      premium: false,
    },

    // Premium Resources
    {
      id: 15,
      title: "Advanced Posture Analysis",
      type: "AI Tool",
      duration: "Real-time",
      category: "Premium",
      rating: 4.9,
      description: "AI-powered posture analysis with personalized recommendations",
      icon: Video,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      url: "#premium-feature",
      premium: true,
    },
    {
      id: 16,
      title: "Personalized Wellness Plan",
      type: "AI Guide",
      duration: "Custom",
      category: "Premium",
      rating: 5.0,
      description: "AI-generated wellness plan based on your work patterns and goals",
      icon: BookOpen,
      color: "bg-gradient-to-r from-blue-500 to-purple-500",
      url: "#premium-feature",
      premium: true,
    },
    {
      id: 17,
      title: "1-on-1 Wellness Coaching",
      type: "Live Session",
      duration: "30-60 min",
      category: "Premium",
      rating: 5.0,
      description: "Personal wellness coaching sessions with certified specialists",
      icon: Video,
      color: "bg-gradient-to-r from-green-500 to-teal-500",
      url: "#premium-feature",
      premium: true,
    },
  ]

  const musicPlaylists = [
    {
      id: 1,
      title: "Focus Flow",
      artist: "Spotify Wellness",
      duration: "2h 15m",
      tracks: 45,
      description: "Ambient sounds and lo-fi beats for deep concentration",
      color: "bg-gradient-to-r from-green-400 to-blue-500",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd",
      premium: false,
      category: "Music",
    },
    {
      id: 2,
      title: "Calm & Centered",
      artist: "Apple Music",
      duration: "1h 45m",
      tracks: 32,
      description: "Peaceful melodies for meditation and relaxation",
      color: "bg-gradient-to-r from-purple-400 to-pink-500",
      url: "https://music.apple.com/us/playlist/calm-meditation/pl.u-8aAVZANu4eqEy0",
      premium: false,
      category: "Music",
    },
    {
      id: 3,
      title: "Productivity Boost",
      artist: "YouTube Music",
      duration: "3h 12m",
      tracks: 67,
      description: "Upbeat instrumental music to enhance productivity",
      color: "bg-gradient-to-r from-yellow-400 to-orange-500",
      url: "https://music.youtube.com/playlist?list=RDCLAK5uy_kmPRjHDECIcuVwnKsx5w-eJhVZgBaWsIg",
      premium: false,
      category: "Music",
    },
    {
      id: 4,
      title: "Nature Sounds Collection",
      artist: "Free Nature Sounds",
      duration: "4h 30m",
      tracks: 25,
      description: "Rain, ocean, forest sounds for relaxation and focus",
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      url: "https://www.youtube.com/watch?v=eKFTSSKCzWA",
      premium: false,
      category: "Music",
    },
    {
      id: 5,
      title: "Classical Focus",
      artist: "Classical Music",
      duration: "2h 45m",
      tracks: 38,
      description: "Classical compositions perfect for concentration",
      color: "bg-gradient-to-r from-indigo-400 to-purple-500",
      url: "https://www.youtube.com/watch?v=jgpJVI3tDbY",
      premium: false,
      category: "Music",
    },
    {
      id: 6,
      title: "Energy Boost Premium",
      artist: "Cheerio AI",
      duration: "3h 30m",
      tracks: 85,
      description: "AI-curated high-energy tracks personalized to your work rhythm",
      color: "bg-gradient-to-r from-orange-400 to-red-500",
      url: "#premium-feature",
      premium: true,
      category: "Music",
    },
  ]

  const liveWebsites = [
    {
      id: 1,
      title: "Noisli - Background Sounds",
      description: "Real-time ambient sounds for focus and relaxation",
      category: "Live Tools",
      icon: Globe,
      color: "bg-teal-500",
      url: "https://www.noisli.com/",
      status: "Live",
      premium: false,
    },
    {
      id: 2,
      title: "Brain.fm - Focus Music",
      description: "Scientifically designed music for concentration",
      category: "Live Tools",
      icon: Music,
      color: "bg-indigo-500",
      url: "https://www.brain.fm/",
      status: "Live",
      premium: false,
    },
    {
      id: 3,
      title: "Calm - Meditation Timer",
      description: "Live meditation sessions and breathing exercises",
      category: "Live Tools",
      icon: Globe,
      color: "bg-blue-500",
      url: "https://www.calm.com/",
      status: "Live",
      premium: false,
    },
    {
      id: 4,
      title: "Forest - Stay Focused",
      description: "Pomodoro timer with virtual tree planting",
      category: "Live Tools",
      icon: Globe,
      color: "bg-green-500",
      url: "https://www.forestapp.cc/",
      status: "Live",
      premium: false,
    },
    {
      id: 5,
      title: "Tide - Sleep & Focus",
      description: "Nature sounds and focus timer combined",
      category: "Live Tools",
      icon: Globe,
      color: "bg-cyan-500",
      url: "https://tide.fm/",
      status: "Live",
      premium: false,
    },
    {
      id: 6,
      title: "Be Focused - Pomodoro Timer",
      description: "Simple and effective productivity timer",
      category: "Live Tools",
      icon: Globe,
      color: "bg-orange-500",
      url: "https://xwavesoft.com/be-focused-pro-for-iphone-ipad-mac-os-x.html",
      status: "Live",
      premium: false,
    },
    {
      id: 7,
      title: "AI Wellness Coach",
      description: "Real-time AI coaching based on your wellness patterns",
      category: "Live Tools",
      icon: Globe,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      url: "#premium-feature",
      status: "Premium",
      premium: true,
    },
  ]

  const categories = ["All", "Exercise", "Meditation", "Ergonomics", "Music", "Live Tools", "Premium"]

  // Filter resources based on selected category
  const getFilteredResources = () => {
    if (selectedCategory === "All") return resources
    if (selectedCategory === "Premium") return resources.filter((r) => r.premium)
    return resources.filter((r) => r.category === selectedCategory)
  }

  const getFilteredPlaylists = () => {
    if (selectedCategory === "All" || selectedCategory === "Music") return musicPlaylists
    if (selectedCategory === "Premium") return musicPlaylists.filter((p) => p.premium)
    return []
  }

  const getFilteredLiveTools = () => {
    if (selectedCategory === "All" || selectedCategory === "Live Tools") return liveWebsites
    if (selectedCategory === "Premium") return liveWebsites.filter((w) => w.premium)
    return []
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

  const handleOpenLink = (url: string, isPremium: boolean) => {
    if (isPremium && userPlan !== "premium") {
      alert("This is a premium feature! Upgrade to access advanced wellness resources.")
      return
    }

    if (url.startsWith("#")) {
      alert("This premium feature is coming soon!")
      return
    }

    window.open(url, "_blank", "noopener,noreferrer")
  }

  const filteredResources = getFilteredResources()
  const filteredPlaylists = getFilteredPlaylists()
  const filteredLiveTools = getFilteredLiveTools()

  return (
    <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Wellness Resources</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Curated content, live tools, and music playlists for your wellness journey
        </p>

        {/* Plan Status - NO EMOJI */}
        <div className="flex justify-center">
          <div
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
              userPlan === "premium"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {userPlan === "premium" ? "Premium Access" : "Free Access - Upgrade for more resources"}
          </div>
        </div>
      </div>

      {/* Category Filter - RESPONSIVE */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === selectedCategory ? "default" : "outline"}
            size="sm"
            className="rounded-full text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
            {category === "Premium" && <Lock className="h-2 w-2 sm:h-3 sm:w-3 ml-1" />}
          </Button>
        ))}
      </div>

      {/* Live Wellness Tools - RESPONSIVE */}
      {filteredLiveTools.length > 0 && (
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-xl">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center text-white text-lg sm:text-xl">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Live Wellness Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredLiveTools.map((site) => {
                const IconComponent = site.icon
                const isPremiumLocked = site.premium && userPlan !== "premium"

                return (
                  <div
                    key={site.id}
                    className={`bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 transition-all cursor-pointer relative ${
                      isPremiumLocked ? "opacity-75" : "hover:bg-white/30"
                    }`}
                    onClick={() => handleOpenLink(site.url, site.premium)}
                  >
                    {isPremiumLocked && (
                      <div className="absolute top-2 right-2">
                        <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-white/80" />
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      <Badge
                        className={`text-xs ${
                          site.premium ? "bg-purple-400 text-purple-900" : "bg-green-400 text-green-900"
                        }`}
                      >
                        {site.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">{site.title}</h3>
                    <p className="text-xs sm:text-sm text-emerald-100 mb-2">{site.description}</p>
                    <Badge className="bg-white/20 text-white text-xs">{site.category}</Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Music Playlists - RESPONSIVE */}
      {filteredPlaylists.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 shadow-xl">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center text-white text-lg sm:text-xl">
              <Music className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Wellness Music Playlists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredPlaylists.map((playlist) => {
                const isPremiumLocked = playlist.premium && userPlan !== "premium"

                return (
                  <div
                    key={playlist.id}
                    className={`bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 transition-all relative ${
                      isPremiumLocked ? "opacity-75" : "hover:bg-white/30"
                    }`}
                  >
                    {isPremiumLocked && (
                      <div className="absolute top-2 right-2">
                        <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-white/80" />
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-3">
                      <Music className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      <Button
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                        onClick={() => handleOpenLink(playlist.url, playlist.premium)}
                      >
                        <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Play
                      </Button>
                    </div>
                    <h3 className="font-bold text-white mb-1 text-sm sm:text-base">{playlist.title}</h3>
                    <p className="text-xs sm:text-sm text-purple-100 mb-2">{playlist.artist}</p>
                    <p className="text-xs text-purple-200 mb-3">{playlist.description}</p>
                    <div className="flex items-center justify-between text-xs text-purple-200">
                      <span>{playlist.tracks} tracks</span>
                      <span>{playlist.duration}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resource Grid - FULLY RESPONSIVE */}
      {filteredResources.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredResources.map((resource) => {
            const IconComponent = resource.icon
            const isPremiumLocked = resource.premium && userPlan !== "premium"

            return (
              <Card
                key={resource.id}
                className={`bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow relative ${
                  isPremiumLocked ? "opacity-90" : ""
                }`}
              >
                {isPremiumLocked && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
                    <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                  </div>
                )}
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-1.5 sm:p-2 rounded-lg ${resource.color}`}>
                      <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {resource.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-base sm:text-lg font-semibold text-gray-800 leading-tight">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{resource.description}</p>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{resource.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current text-yellow-500" />
                      <span>{resource.rating}</span>
                    </div>
                  </div>

                  <Badge className={`${resource.color} text-white border-0 text-xs`}>{resource.category}</Badge>

                  <div className="flex space-x-1 sm:space-x-2">
                    <Button
                      className="flex-1 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
                      size="sm"
                      onClick={() => handleOpenLink(resource.url, resource.premium)}
                      disabled={isPremiumLocked}
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      {isPremiumLocked ? "Premium" : "Open"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isPremiumLocked}
                      className="px-2 sm:px-3 py-1.5 sm:py-2"
                    >
                      <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* No Results Message */}
      {filteredResources.length === 0 && filteredPlaylists.length === 0 && filteredLiveTools.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">No resources found</h3>
          <p className="text-sm sm:text-base text-gray-600">
            Try selecting a different category or upgrade to Premium for more resources.
          </p>
        </div>
      )}

      {/* Quick Tips - RESPONSIVE */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-lg sm:text-xl">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600" />
            Quick Wellness Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2 text-sm sm:text-base">20-20-20 Rule</h4>
              <p className="text-xs sm:text-sm text-blue-600">
                Every 20 minutes, look at something 20 feet away for 20 seconds
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2 text-sm sm:text-base">Posture Check</h4>
              <p className="text-xs sm:text-sm text-green-600">
                Keep your feet flat, back straight, and screen at eye level
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2 text-sm sm:text-base">Hydration</h4>
              <p className="text-xs sm:text-sm text-purple-600">
                Drink water regularly - aim for 8 glasses throughout the day
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Premium Upgrade CTA for Free Users - RESPONSIVE */}
      {userPlan !== "premium" && (
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-xl">
          <CardContent className="p-4 sm:p-6 text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-2">Unlock Premium Resources</h3>
            <p className="text-purple-100 mb-4 text-sm sm:text-base">
              Get access to AI-powered wellness insights, personalized plans, and exclusive content
            </p>
            <Button className="bg-white text-purple-600 hover:bg-gray-100 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
