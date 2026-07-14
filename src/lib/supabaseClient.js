import { createClient } from '@supabase/supabase-js'

// SupabaseのProject URLとPublishable keyは.envファイルで管理する
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabaseの環境変数(VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY)が設定されていません。')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
