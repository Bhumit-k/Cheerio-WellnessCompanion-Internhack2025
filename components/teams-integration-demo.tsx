"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Maximize2, Minimize2, MessageSquare } from "lucide-react"

export function TeamsIntegrationDemo() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "posture",
      message: "I noticed you've been slouching. Try sitting up straight for better focus.",
      time: "Just now",
    },
    {
      id: 2,
      type: "break",
      message: "Time for a quick break! You've been working for 50 minutes straight.",
      time: "5 minutes ago",
    },
  ])

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Microsoft Teams Integration</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-[#2b2a33] text-white overflow-hidden">
            <div className="bg-[#464775] p-3 flex items-center">
              <Image src="/images/cheerio-logo.png" alt="Teams" width={24} height={24} className="mr-2" />
              <span className="font-medium">Microsoft Teams</span>
            </div>
            <CardContent className="p-0">
              <div className="flex h-[600px]">
                <div className="w-16 bg-[#33333d] flex flex-col items-center py-4 space-y-6">
                  <div className="w-8 h-8 bg-[#464775] rounded-full flex items-center justify-center">
                    <span className="text-xs">AC</span>
                  </div>
                  <div className="w-8 h-8 bg-[#464775] rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="w-8 h-8 bg-[#0099e5] rounded-full flex items-center justify-center">
                    <Image src="/images/cheerio-logo.png" alt="Cheerio" width={20} height={20} />
                  </div>
                </div>
                <div className="flex-1 bg-[#2b2a33] p-4">
                  <div className="flex items-center mb-6">
                    <Image src="/images/cheerio-logo.png" alt="Cheerio" width={32} height={32} className="mr-3" />
                    <div>
                      <h2 className="font-bold">Cheerio</h2>
                      <p className="text-xs text-gray-400">Your wellness companion</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-[#33333d] p-3 rounded-lg">
                      <p className="text-sm">
                        👋 Hi there! I'm Cheerio, your wellness companion. I'll help you stay energized and focused
                        throughout your workday.
                      </p>
                    </div>

                    <div className="bg-[#33333d] p-3 rounded-lg">
                      <p className="text-sm">
                        I've noticed you've been working for a while. Would you like to take a quick break?
                      </p>
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="default" className="bg-[#464775] hover:bg-[#5b5a9a]">
                          Yes, suggest a break
                        </Button>
                        <Button size="sm" variant="outline" className="text-white border-gray-600">
                          Later
                        </Button>
                      </div>
                    </div>

                    <div className="bg-[#33333d] p-3 rounded-lg">
                      <p className="text-sm">Here's a quick stretch you can do at your desk:</p>
                      <div className="bg-[#2b2a33] p-3 rounded-lg mt-2">
                        <h4 className="font-medium text-sm">Desk Stretch</h4>
                        <p className="text-xs text-gray-400 mt-1">1. Sit up straight and roll your shoulders back</p>
                        <p className="text-xs text-gray-400">2. Gently tilt your head from side to side</p>
                        <p className="text-xs text-gray-400">3. Stretch your arms overhead</p>
                        <p className="text-xs text-gray-400">4. Hold each position for 10 seconds</p>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="default" className="bg-[#464775] hover:bg-[#5b5a9a]">
                          I did it!
                        </Button>
                        <Button size="sm" variant="outline" className="text-white border-gray-600">
                          Skip
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Cheerio in Teams</h2>
              <p className="text-gray-600 mb-4">
                Cheerio integrates seamlessly with Microsoft Teams to provide wellness support throughout your workday.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="bg-[#0099e5] rounded-full p-1 mr-2 mt-0.5">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Chat directly with Cheerio for wellness tips</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#0099e5] rounded-full p-1 mr-2 mt-0.5">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Receive timely wellness notifications</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#0099e5] rounded-full p-1 mr-2 mt-0.5">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Track your wellness goals and achievements</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#0099e5] rounded-full p-1 mr-2 mt-0.5">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Get personalized wellness recommendations</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="relative">
            <Card className={`transition-all duration-300 ${isExpanded ? "h-96" : "h-20"}`}>
              <div className="absolute top-0 right-0 p-2 flex space-x-1">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className={`p-4 ${isExpanded ? "block" : "hidden"}`}>
                <div className="flex items-center mb-4">
                  <Image src="/images/cheerio-logo.png" alt="Cheerio" width={32} height={32} className="mr-2" />
                  <h3 className="font-bold">Cheerio Notifications</h3>
                </div>

                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">
                          {notification.type === "posture"
                            ? "Posture Check"
                            : notification.type === "break"
                              ? "Break Time"
                              : "Wellness Tip"}
                        </h4>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-sm mt-1">{notification.message}</p>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="default" className="text-xs h-7 bg-[#0099e5] hover:bg-[#0088cc]">
                          Take Action
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs h-7">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <div className={`flex items-center p-4 ${isExpanded ? "hidden" : "block"}`}>
                <Image src="/images/cheerio-logo.png" alt="Cheerio" width={24} height={24} className="mr-2" />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">Cheerio Notifications</h3>
                  <p className="text-xs text-gray-500">2 new notifications</p>
                </div>
              </div>
            </Card>

            <div className={`fixed bottom-4 right-4 ${isChatOpen ? "hidden" : "block"}`}>
              <Button
                className="h-12 w-12 rounded-full bg-[#0099e5] hover:bg-[#0088cc] shadow-lg"
                onClick={() => setIsChatOpen(true)}
              >
                <Image src="/images/cheerio-logo.png" alt="Cheerio" width={32} height={32} />
              </Button>
            </div>

            <div
              className={`fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl ${isChatOpen ? "block" : "hidden"}`}
            >
              <div className="bg-[#0099e5] text-white p-3 rounded-t-lg flex justify-between items-center">
                <div className="flex items-center">
                  <Image src="/images/cheerio-logo.png" alt="Cheerio" width={24} height={24} className="mr-2" />
                  <span className="font-medium">Cheerio</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-white" onClick={() => setIsChatOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="h-80 p-3 overflow-y-auto">
                <div className="bg-gray-100 p-2 rounded-lg mb-3 max-w-[80%]">
                  <p className="text-sm">
                    Hi there! I noticed you've been working for a while. Would you like to take a quick break?
                  </p>
                </div>
                <div className="bg-[#0099e5] text-white p-2 rounded-lg mb-3 max-w-[80%] ml-auto">
                  <p className="text-sm">Yes, what do you suggest?</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg mb-3 max-w-[80%]">
                  <p className="text-sm">
                    How about a quick 2-minute stretch? Stand up, reach for the sky, and then touch your toes. Repeat 3
                    times.
                  </p>
                </div>
              </div>
              <div className="p-3 border-t">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#0099e5]"
                  />
                  <Button className="rounded-l-none bg-[#0099e5] hover:bg-[#0088cc]">Send</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
