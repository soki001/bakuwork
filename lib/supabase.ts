import { createClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// null when env vars are missing: the app then runs on the dummy data in lib/data.ts
export const supabase = url && key ? createClient(url, key) : null;
