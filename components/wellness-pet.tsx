"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Sparkles, Zap, Trophy, Settings, X, Mic, MicOff } from "lucide-react"
import { toast } from "sonner"
import dynamic from "next/dynamic"

// Dynamically import 3D component to avoid SSR issues
const Realistic3DPets = dynamic(() => import("./realistic-3d-pets").then((mod) => mod.Realistic3DPets), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center animate-pulse">
      <Heart className="h-8 w-8 md:h-12 md:w-12 text-white" />
    </div>
  ),
})

interface WellnessPetProps {
  wellnessScore: number
  activitiesCompleted: number
  totalPoints: number
  onClose?: () => void
}

type PetType = "dog" | "cat" | "panda" | "penguin" | "bunny" | "hamster"
type PetMood = "happy" | "neutral" | "sad" | "excited" | "sleeping"
type PetSize = "baby" | "young" | "adult" | "elder"

interface Pet {
  type: PetType
  name: string
  level: number
  experience: number
  mood: PetMood
  size: PetSize
  hunger: number
  happiness: number
  lastFed: number
}

export function WellnessPet({ wellnessScore, activitiesCompleted, totalPoints, onClose }: WellnessPetProps) {
  const [pet, setPet] = useState<Pet>({
    type: "dog",
    name: "Wellness Buddy",
    level: 1,
    experience: 0,
    mood: "happy",
    size: "baby",
    hunger: 80,
    happiness: 85,
    lastFed: Date.now(),
  })

  const [showSettings, setShowSettings] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [petAnimation, setPetAnimation] = useState("")
  const [isInteracting, setIsInteracting] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [currentMessage, setCurrentMessage] = useState("")
  const [showPetPopup, setShowPetPopup] = useState(false)

  // Pet responses without emojis
  const petResponses = {
    dog: {
      happy: ["Woof! I'm so happy!", "Let's play!", "You're doing great!"],
      excited: ["WOOF WOOF! Amazing!", "I'm so excited!", "You're the best!"],
      neutral: ["Woof... how are you?", "Maybe some exercise?", "I'm here for you"],
      sad: ["Whimper... I'm worried about you", "You seem stressed", "Let's take a break"],
      sleeping: ["Zzz... peaceful dreams", "So sleepy...", "Good night"],
    },
    cat: {
      happy: ["Purr... I'm content", "Meow! Nice work", "You're purrfect"],
      excited: ["MEOW! Fantastic!", "I'm so proud!", "Purr purr purr!"],
      neutral: ["Meow... how are you feeling?", "Perhaps some relaxation?", "I'm watching over you"],
      sad: ["Mew... you seem down", "I sense your stress", "Let me comfort you"],
      sleeping: ["Purr... sweet dreams", "So cozy...", "Nap time"],
    },
    panda: {
      happy: ["I'm bamboo-zled by your progress!", "You're doing great!", "So peaceful and happy"],
      excited: ["WOW! You're amazing!", "I'm so excited for you!", "Incredible work!"],
      neutral: ["How are you feeling?", "Maybe some mindfulness?", "I'm here with you"],
      sad: ["I sense you need comfort", "You seem overwhelmed", "Let's find some peace"],
      sleeping: ["Dreaming of bamboo...", "So restful...", "Peaceful slumber"],
    },
  }

  // Update pet mood based on wellness score
  useEffect(() => {
    let newMood: PetMood = "neutral"

    if (wellnessScore >= 90) {
      newMood = "excited"
    } else if (wellnessScore >= 70) {
      newMood = "happy"
    } else if (wellnessScore >= 50) {
      newMood = "neutral"
    } else {
      newMood = "sad"
    }

    // Check if it's sleeping time (late hours)
    const currentHour = new Date().getHours()
    if (currentHour >= 22 || currentHour <= 6) {
      newMood = "sleeping"
    }

    setPet((prev) => ({ ...prev, mood: newMood, happiness: wellnessScore }))
  }, [wellnessScore])

  // Update pet experience and level based on activities
  useEffect(() => {
    const newExperience = activitiesCompleted * 10 + Math.floor(totalPoints / 10)
    const newLevel = Math.floor(newExperience / 100) + 1

    let newSize: PetSize = "baby"
    if (newLevel >= 10) newSize = "elder"
    else if (newLevel >= 6) newSize = "adult"
    else if (newLevel >= 3) newSize = "young"

    setPet((prev) => ({
      ...prev,
      experience: newExperience,
      level: newLevel,
      size: newSize,
      hunger: Math.max(0, prev.hunger - (Date.now() - prev.lastFed) / (1000 * 60 * 30)),
    }))
  }, [activitiesCompleted, totalPoints])

  const feedPet = () => {
    if (pet.hunger >= 90) {
      toast.info(`${pet.name} is already full!`)
      return
    }

    setPet((prev) => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 20),
      happiness: Math.min(100, prev.happiness + 10),
      lastFed: Date.now(),
    }))

    setIsInteracting(true)
    setPetAnimation("bounce")
    setTimeout(() => {
      setPetAnimation("")
      setIsInteracting(false)
    }, 2000)

    // Pet speaks when fed
    const responses = petResponses[pet.type]?.[pet.mood] || ["Thank you!"]
    const response = responses[Math.floor(Math.random() * responses.length)]
    setCurrentMessage(response)
    setTimeout(() => setCurrentMessage(""), 3000)

    toast.success(`${pet.name} enjoyed the treat! +10 happiness`)
  }

  const petPet = () => {
    setPet((prev) => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 5),
    }))

    setIsInteracting(true)
    setPetAnimation("wiggle")
    setTimeout(() => {
      setPetAnimation("")
      setIsInteracting(false)
    }, 1500)

    // Pet responds to petting
    const responses = petResponses[pet.type]?.[pet.mood] || ["I love attention!"]
    const response = responses[Math.floor(Math.random() * responses.length)]
    setCurrentMessage(response)
    setTimeout(() => setCurrentMessage(""), 3000)

    toast.success(`${pet.name} loves the attention!`)
  }

  const talkToPet = () => {
    setIsListening(!isListening)
    setIsInteracting(!isListening)

    if (!isListening) {
      // Simulate listening
      toast.info("Listening... Say something to your pet!")
      setTimeout(() => {
        setIsListening(false)
        setIsInteracting(false)
        const responses = petResponses[pet.type]?.[pet.mood] || ["I hear you!"]
        const response = responses[Math.floor(Math.random() * responses.length)]
        setCurrentMessage(response)
        setTimeout(() => setCurrentMessage(""), 4000)
      }, 3000)
    } else {
      toast.info("Stopped listening")
    }
  }

  const changePetType = (newType: PetType) => {
    setPet((prev) => ({ ...prev, type: newType }))
    setShowSettings(false)
    toast.success(`Your new ${newType} companion is ready!`)
  }

  const getPetStatusColor = () => {
    if (pet.happiness >= 80) return "text-green-600"
    if (pet.happiness >= 60) return "text-yellow-600"
    if (pet.happiness >= 40) return "text-orange-600"
    return "text-red-600"
  }

  const getPetMessage = () => {
    if (currentMessage) return currentMessage

    if (pet.mood === "excited") return `${pet.name} is thriving! Your wellness is amazing!`
    if (pet.mood === "happy") return `${pet.name} is happy and healthy! Keep it up!`
    if (pet.mood === "neutral") return `${pet.name} is doing okay. Maybe some activities?`
    if (pet.mood === "sad") return `${pet.name} is feeling low. Time for some wellness care!`
    if (pet.mood === "sleeping") return `${pet.name} is sleeping peacefully...`
    return `${pet.name} is here to support your wellness journey!`
  }

  const getPetTypeDisplayName = (type: PetType) => {
    const names = {
      dog: "Dog",
      cat: "Cat",
      panda: "Panda",
      penguin: "Penguin",
      bunny: "Bunny",
      hamster: "Hamster",
    }
    return names[type]
  }

  // Responsive minimized state
  if (isMinimized) {
    return (
      <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg p-2"
        >
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </div>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-50">
      <Card className="w-72 sm:w-80 bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <CardContent className="p-3 sm:p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-pink-500" />
              <span className="font-semibold text-gray-800 text-sm sm:text-base">{pet.name}</span>
              <Badge className="bg-purple-100 text-purple-800 text-xs">Level {pet.level}</Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="h-6 w-6 sm:h-8 sm:w-8 p-0"
              >
                <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="h-6 w-6 sm:h-8 sm:w-8 p-0"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>

          {/* Pet Settings */}
          {showSettings && (
            <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
              <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                Choose your wellness companion:
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {(["dog", "cat", "panda"] as PetType[]).map((type) => (
                  <Button
                    key={type}
                    variant={pet.type === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => changePetType(type)}
                    className="flex flex-col items-center p-1 sm:p-2 h-auto text-xs"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 mb-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <span className="text-xs">{getPetTypeDisplayName(type)}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* 3D Pet Display */}
          <div className="text-center mb-3 sm:mb-4">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2 sm:mb-3 relative cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => setShowPetPopup(true)}
            >
              <Realistic3DPets
                petType={pet.type}
                mood={pet.mood}
                size={pet.size}
                interactive={true}
                animation={petAnimation}
                className={`w-full h-full transition-transform duration-300 ${
                  petAnimation === "bounce" ? "animate-bounce" : petAnimation === "wiggle" ? "animate-pulse" : ""
                } ${isInteracting ? "animate-pulse" : ""}`}
              />
              {/* Click indicator */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-xs">👆</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-2">Click pet to enlarge</p>
            <div
              className={`text-xs sm:text-sm font-medium ${getPetStatusColor()} min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center px-2`}
            >
              {currentMessage && (
                <div className="bg-white/90 rounded-lg px-2 sm:px-3 py-1 sm:py-2 shadow-lg border animate-in slide-in-from-bottom-2 text-center">
                  "{getPetMessage()}"
                </div>
              )}
              {!currentMessage && <p className="text-center">{getPetMessage()}</p>}
            </div>
          </div>

          {/* Pet Stats */}
          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Happiness</span>
                <span>{Math.round(pet.happiness)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                <div
                  className="bg-gradient-to-r from-pink-400 to-red-400 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                  style={{ width: `${pet.happiness}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Hunger</span>
                <span>{Math.round(pet.hunger)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-400 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                  style={{ width: `${pet.hunger}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Experience</span>
                <span>{pet.experience % 100}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                <div
                  className="bg-gradient-to-r from-purple-400 to-pink-400 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                  style={{ width: `${pet.experience % 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-1 sm:space-x-2 mb-2">
            <Button
              onClick={feedPet}
              size="sm"
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xs sm:text-sm"
              disabled={pet.hunger >= 90}
            >
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Feed
            </Button>
            <Button
              onClick={petPet}
              size="sm"
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs sm:text-sm"
            >
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Pet
            </Button>
          </div>

          {/* Talk Button */}
          <Button
            onClick={talkToPet}
            size="sm"
            className={`w-full text-xs sm:text-sm ${
              isListening
                ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            } text-white`}
          >
            {isListening ? (
              <MicOff className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            ) : (
              <Mic className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            )}
            {isListening ? "Stop Listening" : "Talk to Pet"}
          </Button>

          {/* Pet Info */}
          <div className="mt-2 sm:mt-3 text-center">
            <div className="flex justify-center space-x-2 sm:space-x-4 text-xs text-gray-600">
              <span className="flex items-center">
                <Trophy className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                {pet.size} {getPetTypeDisplayName(pet.type)}
              </span>
              <span className="flex items-center">
                <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                {activitiesCompleted} activities
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Big Pet Popup Modal */}
      {showPetPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Heart className="h-6 w-6 text-pink-500" />
                  <h2 className="text-2xl font-bold text-gray-800">{pet.name}</h2>
                  <Badge className="bg-purple-100 text-purple-800">Level {pet.level}</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPetPopup(false)}
                  className="h-10 w-10 p-0 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Large 3D Pet Display */}
              <div className="text-center mb-6">
                <div className="w-80 h-80 mx-auto mb-4 relative">
                  <Realistic3DPets
                    petType={pet.type}
                    mood={pet.mood}
                    size={pet.size}
                    interactive={true}
                    animation={petAnimation}
                    className={`w-full h-full transition-transform duration-300 ${
                      petAnimation === "bounce" ? "animate-bounce" : petAnimation === "wiggle" ? "animate-pulse" : ""
                    } ${isInteracting ? "animate-pulse" : ""}`}
                  />
                </div>

                {/* Large Pet Message */}
                <div className={`text-lg font-medium ${getPetStatusColor()} mb-4`}>
                  {currentMessage && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl px-6 py-4 shadow-lg border-2 border-blue-100 animate-in slide-in-from-bottom-2">
                      <p className="text-xl">"{getPetMessage()}"</p>
                    </div>
                  )}
                  {!currentMessage && (
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl px-6 py-4">
                      <p className="text-lg">{getPetMessage()}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Pet Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-r from-pink-50 to-red-50 p-4 rounded-xl">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="font-medium">Happiness</span>
                    <span className="font-bold">{Math.round(pet.happiness)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-pink-400 to-red-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${pet.happiness}%` }}
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="font-medium">Hunger</span>
                    <span className="font-bold">{Math.round(pet.hunger)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${pet.hunger}%` }}
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="font-medium">Experience</span>
                    <span className="font-bold">{pet.experience % 100}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${pet.experience % 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <Button
                  onClick={feedPet}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                  disabled={pet.hunger >= 90}
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Feed {pet.name}
                </Button>
                <Button
                  onClick={petPet}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Pet {pet.name}
                </Button>
                <Button
                  onClick={talkToPet}
                  size="lg"
                  className={`${
                    isListening
                      ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  } text-white`}
                >
                  {isListening ? <MicOff className="h-5 w-5 mr-2" /> : <Mic className="h-5 w-5 mr-2" />}
                  {isListening ? "Stop Listening" : "Talk to Pet"}
                </Button>
              </div>

              {/* Pet Info */}
              <div className="text-center bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4">
                <div className="flex justify-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Trophy className="h-4 w-4 mr-2" />
                    {pet.size} {getPetTypeDisplayName(pet.type)}
                  </span>
                  <span className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />
                    {activitiesCompleted} activities completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
