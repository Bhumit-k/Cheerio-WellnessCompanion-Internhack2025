"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  UserCheck,
  CalendarIcon,
  Video,
  Phone,
  MessageSquare,
  Crown,
  CheckCircle,
  Star,
  Heart,
  Brain,
  Activity,
  Eye,
  Coffee,
  Users,
  X,
} from "lucide-react"
import { toast } from "sonner"

interface ConsultationBookingProps {
  userPlan: "free" | "premium"
  onClose?: () => void
}

interface Specialist {
  id: string
  name: string
  title: string
  specialties: string[]
  rating: number
  experience: string
  avatar: string
  availability: string[]
  price: number
}

export function ConsultationBooking({ userPlan, onClose }: ConsultationBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null)
  const [consultationType, setConsultationType] = useState("")
  const [description, setDescription] = useState("")
  const [isBooking, setIsBooking] = useState(false)

  const specialists: Specialist[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      title: "Wellness Psychologist",
      specialties: ["Stress Management", "Work-Life Balance", "Mental Health"],
      rating: 4.9,
      experience: "8+ years",
      avatar: "/placeholder.svg?height=64&width=64",
      availability: ["09:00", "10:00", "14:00", "15:00", "16:00"],
      price: 120,
    },
    {
      id: "2",
      name: "Dr. Michael Rodriguez",
      title: "Ergonomics Specialist",
      specialties: ["Posture Correction", "Workplace Ergonomics", "Physical Wellness"],
      rating: 4.8,
      experience: "12+ years",
      avatar: "/placeholder.svg?height=64&width=64",
      availability: ["09:30", "11:00", "13:00", "15:30"],
      price: 110,
    },
    {
      id: "3",
      name: "Dr. Emily Watson",
      title: "Nutrition & Lifestyle Coach",
      specialties: ["Nutrition Planning", "Energy Management", "Healthy Habits"],
      rating: 4.9,
      experience: "6+ years",
      avatar: "/placeholder.svg?height=64&width=64",
      availability: ["10:00", "12:00", "14:30", "16:30"],
      price: 100,
    },
    {
      id: "4",
      name: "Dr. James Park",
      title: "Occupational Health Expert",
      specialties: ["Eye Strain", "Repetitive Strain", "Workplace Safety"],
      rating: 4.7,
      experience: "10+ years",
      avatar: "/placeholder.svg?height=64&width=64",
      availability: ["08:30", "11:30", "13:30", "17:00"],
      price: 115,
    },
  ]

  const consultationTypes = [
    { value: "stress", label: "Stress & Anxiety Management", icon: Brain },
    { value: "posture", label: "Posture & Ergonomics", icon: Activity },
    { value: "nutrition", label: "Nutrition & Energy", icon: Heart },
    { value: "eye-strain", label: "Eye Strain & Vision", icon: Eye },
    { value: "sleep", label: "Sleep & Recovery", icon: Coffee },
    { value: "team", label: "Team Wellness Strategy", icon: Users },
  ]

  const handleBookConsultation = async () => {
    if (!selectedSpecialist || !selectedDate || !selectedTime || !consultationType) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsBooking(true)

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success("Consultation booked successfully!", {
      description: `Your session with ${selectedSpecialist.name} is confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTime}`,
      duration: 5000,
    })

    setIsBooking(false)
    onClose?.()
  }

  if (userPlan !== "premium") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 pt-8">
            {onClose && (
              <Button variant="ghost" onClick={onClose} className="absolute top-4 right-4 text-white hover:bg-white/10">
                <X className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Crown className="h-8 w-8 text-purple-400" />
              <h1 className="text-4xl font-bold text-white">Premium Feature</h1>
            </div>
            <p className="text-xl text-purple-100 mb-8">1-on-1 Specialist Consultations</p>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm border-2 border-purple-300">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-purple-800">Unlock Expert Guidance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">What You Get:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">45-minute one-on-one sessions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Certified wellness specialists</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Personalized action plans</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Follow-up resources</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Video or phone sessions</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Specialization Areas:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {consultationTypes.map((type) => (
                      <div key={type.value} className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
                        <type.icon className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-purple-800">{type.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <p className="text-purple-800 font-medium">Premium members get 2 free consultations per month</p>
                  <p className="text-purple-600 text-sm">Additional sessions available at member rates</p>
                </div>

                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Premium
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 pt-8">
          {onClose && (
            <Button variant="ghost" onClick={onClose} className="absolute top-4 right-4">
              <X className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <UserCheck className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Book a Consultation</h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">Get personalized guidance from certified wellness specialists</p>
          <Badge className="bg-green-100 text-green-700">Premium Member - 2 Free Sessions This Month</Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Specialist Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Choose Your Specialist</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {specialists.map((specialist) => (
                    <div
                      key={specialist.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedSpecialist?.id === specialist.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedSpecialist(specialist)}
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={specialist.avatar || "/placeholder.svg"}
                          alt={specialist.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-800">{specialist.name}</h3>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{specialist.rating}</span>
                            </div>
                          </div>
                          <p className="text-blue-600 font-medium mb-2">{specialist.title}</p>
                          <p className="text-sm text-gray-600 mb-2">{specialist.experience} experience</p>
                          <div className="flex flex-wrap gap-2">
                            {specialist.specialties.map((specialty) => (
                              <Badge key={specialty} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">${specialist.price}</p>
                          <p className="text-xs text-gray-500">per session</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Consultation Type */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <span>Consultation Focus</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {consultationTypes.map((type) => (
                    <div
                      key={type.value}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        consultationType === type.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setConsultationType(type.value)}
                    >
                      <div className="flex items-center space-x-3">
                        <type.icon className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-800">{type.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  <Label htmlFor="description">Additional Details (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your specific concerns or goals for this consultation..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                  <span>Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    className="rounded-md border"
                  />
                </div>

                {selectedSpecialist && selectedDate && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Available Times</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedSpecialist.availability.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className="text-xs"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium mb-2 block">Session Type</Label>
                  <Select defaultValue="video">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">
                        <div className="flex items-center space-x-2">
                          <Video className="h-4 w-4" />
                          <span>Video Call</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="phone">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>Phone Call</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            {selectedSpecialist && selectedDate && selectedTime && consultationType && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Specialist:</span>
                    <span className="font-medium">{selectedSpecialist.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="font-medium">
                      {consultationTypes.find((t) => t.value === consultationType)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">45 minutes</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost:</span>
                      <div className="text-right">
                        <span className="line-through text-gray-400">${selectedSpecialist.price}</span>
                        <span className="font-bold text-green-600 ml-2">FREE</span>
                      </div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Premium member benefit</p>
                  </div>

                  <Button
                    onClick={handleBookConsultation}
                    disabled={isBooking}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isBooking ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Booking...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Confirm Booking</span>
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
