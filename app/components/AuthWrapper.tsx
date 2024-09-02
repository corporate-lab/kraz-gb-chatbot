'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.email) {
      localStorage.setItem('userEmail', session.user.email)
    }
  }, [session])

  useEffect(() => {
    if (session?.user?.email) {
      localStorage.setItem('userEmail', session.user.email)
    }
  }, [session])

  if (status === "loading") {
    return <div className={`flex flex-col items-center justify-center min-h-screen bg-white`}>
      <div className={`w-full max-w-md`}>
        <div className={`flex justify-center mb-8`}>
          <img src="/atria-logo.png" alt="Atria Logo" className={`w-12`} />
        </div>
      </div>
    </div>
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}