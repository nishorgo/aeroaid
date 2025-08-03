// src/lib/providers/auth-provider.tsx
"use client";

import { useEffect, useCallback } from "react";
import { useAuthStore } from "@/lib/stores/use-auth-store";
import { supabase } from "@/lib/supabase/client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading, setProfile } = useAuthStore()
  

  
  // Function to fetch user profile from the API - memoized with useCallback
  const fetchUserProfile = useCallback(async () => {
    try {
      console.log("Fetching profile from API")
      const response = await fetch('/api/profile')
      
      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.status}`)
      }
      
      const { data } = await response.json()
      
      if (data) {
        setProfile(data)
        console.log("Fetched profile:", data)
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
    }
  }, [setProfile])

  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        // Fetch and store the user's profile
        fetchUserProfile();
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
      
      // Fetch and store the user's profile when auth state changes
      if (session?.user) {
        fetchUserProfile();
      } else {
        // Clear profile when user is signed out
        setProfile(null);
      }
      
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [setUser, setLoading, setProfile, fetchUserProfile, supabase])

  return <>{children}</>;
}