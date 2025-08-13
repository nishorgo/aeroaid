// src/hooks/use-auth-login.ts
import { useState } from "react";
import { useAuthStore } from "@/lib/stores/use-auth-store";
import { LoginFormData } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

interface UseAuthLogin {
  isLoading: boolean;
  error: string | null;
  login: (data: LoginFormData) => Promise<void>;
  clearError: () => void;
}

export function useAuthLogin(): UseAuthLogin {
  const { setUser, setLoading, isLoading } = useAuthStore();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  async function login(data: LoginFormData) {
    try {
      setLoading(true);
      setError(null);
      
      // Use Supabase client-side auth instead of API route
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        let errorMessage = error.message;
        
        // Provide user-friendly message for email not confirmed
        if (errorMessage.toLowerCase().includes("email not confirmed") || 
            errorMessage.toLowerCase().includes("email not verified") ||
            errorMessage.toLowerCase().includes("please confirm your email")) {
          errorMessage = "Please check your email and click the confirmation link before signing in.";
        }
        
        setError(errorMessage);
        return;
      }

      // No need to manually set user or fetch profile
      // AuthProvider will detect the auth state change and handle everything
      router.push("/profile");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to login";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return { isLoading, error, login, clearError };
}