// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import { Database } from './types'

// Function to create a Supabase client
export function createClientSupabaseClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// Create a singleton instance to be used across the application
export const supabase = createClientSupabaseClient()