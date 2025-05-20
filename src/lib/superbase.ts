import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPERBASE_PROJECT_URL_KEY!, process.env.NEXT_PUBLIC_SUPERBASE_ANON_PUBLIC_KEY!)

export default supabase