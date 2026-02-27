// Supabase Configuration
const SUPABASE_URL = "https://bcvkiydfiypgaonbmoyu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_uSjJjhoZsi5ANOsQeOtnXA_QTgxikGE";

// Initialize the Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
