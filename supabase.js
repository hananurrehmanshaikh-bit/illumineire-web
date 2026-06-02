import { createClient } from '@supabase/supabase-js'

let supabaseInstance = null

export const supabase = new Proxy({}, {
  get(target, prop) {
    if (!supabaseInstance && typeof window!== 'undefined') {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_KEY
      if (!url ||!key) throw new Error('Supabase env vars missing')
      supabaseInstance = createClient(url, key)
    }
    return supabaseInstance?.[prop]
  }
})
