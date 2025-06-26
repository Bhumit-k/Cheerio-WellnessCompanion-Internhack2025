"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorBoundary } from "@/components/error-boundary"

// Dynamically import the dashboard with no SSR
const ModernDashboard = dynamic(
  () => import("@/components/modern-dashboard").then((mod) => ({ default: mod.ModernDashboard })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="container mx-auto space-y-6">
          {/* Header skeleton */}
          <Skeleton className="h-16 w-full" />

          {/* Stats skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>

          {/* Main content skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <Skeleton className="h-96 w-full" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>

          {/* Challenges skeleton */}
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    ),
  },
)

export default function Dashboard() {
  return (
    <ErrorBoundary>
      <ModernDashboard />
    </ErrorBoundary>
  )
}
