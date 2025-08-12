// src/app/(auth-pages)/login/page.tsx
import { AuthCard } from "@/components/ui/auth-card"
import { LoginForm } from "@/components/auth/login-form"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="w-full max-w-[320px] mx-auto">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Image src="/logo.png" alt="AeroAid" width={64} height={64} className="h-16" />
          <h1 className="text-3xl font-semibold text-center text-green-500">AeroAid</h1>
        </div>
        <p className="text-center text-md text-gray-500">
          New to AeroAid?{'  '}
          <Link href="/signup" className="text-red-500 hover:underline">
            Create an account
          </Link>
        </p>

        <p className="text-center text-md text-gray-500 mb-6">
          Or{'  '}
          <Link href="/reset-password" className="text-red-500 hover:underline">
            Forgot Password?
          </Link>
        </p>

      </div>
      <AuthCard
        title="Welcome back"
        description="Enter your email to sign in to your account"
      >
        <LoginForm />
      </AuthCard>
    </div>
  )
}