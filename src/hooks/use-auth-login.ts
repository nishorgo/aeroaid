// src/hooks/use-auth-login.ts
import { useState } from "react";
import { useAuthStore } from "@/lib/stores/use-auth-store";
import { LoginFormData } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";

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
      setError(null); // Clear previous errors
      
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = errorData.error || "Failed to login";
        
        // Provide user-friendly message for email not confirmed
        if (errorMessage.toLowerCase().includes("email not confirmed") || 
            errorMessage.toLowerCase().includes("email not verified") ||
            errorMessage.toLowerCase().includes("please confirm your email")) {
          errorMessage = "Please check your email and click the confirmation link before signing in.";
        }
        
        setError(errorMessage);
        return;
      }

      const { data: responseData } = await response.json();
      setUser(responseData.user);

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