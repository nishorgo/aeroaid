// src/components/auth/login-form.tsx
"use client";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginFormData, loginSchema } from "@/lib/validations/auth"
import { useAuthLogin } from "@/hooks/use-auth-login"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function LoginForm() {
  const { isLoading, error, login, clearError } = useAuthLogin()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Clear error when user starts typing
  const handleInputChange = () => {
    if (error) {
      clearError()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(login)} className="space-y-4 mx-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="you@example.com" 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e)
                    handleInputChange()
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e)
                    handleInputChange()
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-yellow-400 text-gray-700 py-3 rounded font-semibold hover:bg-yellow-500" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  )
}