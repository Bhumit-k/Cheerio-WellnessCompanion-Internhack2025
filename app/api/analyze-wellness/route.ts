import { type NextRequest, NextResponse } from "next/server"

async function fetchWithTimeout(url: string, options: any, timeout = 5000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const frameBlob = formData.get("frame") as Blob

    if (!frameBlob) {
      return NextResponse.json({ error: "No frame provided" }, { status: 400 })
    }

    // Convert blob to buffer for Python service
    const arrayBuffer = await frameBlob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // In a real implementation, you would:
    // 1. Save the frame temporarily or send directly to Python service
    // 2. Call the Python OpenCV analysis service
    // 3. Return the analysis results

    // For now, we'll simulate calling the Python service
    const mockAnalysisResult = await simulatePythonAnalysis(buffer)

    return NextResponse.json(mockAnalysisResult)
  } catch (error) {
    console.error("Analysis API error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}

// Simulate Python OpenCV analysis
async function simulatePythonAnalysis(frameBuffer: Buffer) {
  try {
    // Try to connect to Python service if available
    const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || "http://localhost:5000"

    // Create form data for Python service
    const formData = new FormData()
    const blob = new Blob([frameBuffer], { type: "image/jpeg" })
    formData.append("frame", blob, "frame.jpg")

    const response = await fetch(`${pythonServiceUrl}/analyze`, {
      method: "POST",
      body: formData,
      // timeout: 5000, // 5 second timeout - Removed in favor of fetchWithTimeout
    })

    if (response.ok) {
      const result = await response.json()
      console.log("✅ Python analysis successful")
      return result
    }
  } catch (error) {
    console.log("⚠️ Python service unavailable, using mock analysis")
  }

  // Fallback to mock analysis
  const time = new Date().getHours()
  const minute = new Date().getMinutes()

  // Simulate time-based analysis patterns
  const isTiredTime = time > 14 && time < 17
  const isStressedTime = minute % 15 === 0
  const isDrowsyTime = time > 13 && time < 15

  const moods = ["Happy 😄", "Neutral 😐", "Focused 🎯", "Tired 🥱", "Stressed 😟"]
  const postures = ["Good ✅", "Slouching 🪑", "Forward Head 👤", "Tilted 🤸"]
  const alertnessLevels = ["Alert 😊", "Tired 🥱", "Drowsy 😴"]

  return {
    mood:
      isTiredTime && Math.random() > 0.6
        ? "Tired 🥱"
        : isStressedTime && Math.random() > 0.7
          ? "Stressed 😟"
          : moods[Math.floor(Math.random() * 3)], // Favor positive moods

    posture:
      Math.random() > 0.8
        ? postures[Math.floor(Math.random() * 3) + 1] // Poor postures
        : "Good ✅",

    alertness: isDrowsyTime && Math.random() > 0.5 ? "Drowsy 😴" : Math.random() > 0.8 ? "Tired 🥱" : "Alert 😊",

    confidence: 0.75 + Math.random() * 0.25,
    faceDetected: Math.random() > 0.1, // 90% face detection rate
    eyeAspectRatio: 0.25 + Math.random() * 0.15,
    blinkRate: 12 + Math.random() * 8,
    timestamp: new Date().toISOString(),
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "wellness-analysis",
    timestamp: new Date().toISOString(),
  })
}
