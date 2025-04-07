// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

interface Database {
  public: {
    Tables: {
      customer_service: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
        }
      }
    }
  }
}

// Use Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(`
    Missing Supabase credentials! Verify:
    - VITE_SUPABASE_URL
    - VITE_SUPABASE_ANON_KEY
    are set in Replit secrets
  `);
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);