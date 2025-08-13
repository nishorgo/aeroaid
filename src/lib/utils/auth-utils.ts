// src/lib/utils/auth-utils.ts
import { createClientSupabaseClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/stores/use-auth-store";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useSignOut() {
  const router = useRouter();
  const { setLoading, clearSession } = useAuthStore();
  const supabase = createClientSupabaseClient();

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      
      // Clear session first to immediately update UI state
      clearSession();
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Small delay to ensure auth state has propagated
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Navigate to login page
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
      // Even if signout fails, redirect to login for security
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [supabase, clearSession, setLoading, router]);

  return signOut;
}

export function useAuthSession() {
  const { user, isLoading, profile } = useAuthStore();

  return {
    user,
    isLoading,
    profile,
  };
}