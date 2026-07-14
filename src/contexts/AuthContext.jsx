import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

// 認証状態(ログインユーザー情報)をアプリ全体で共有するためのコンテキスト
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  // 初回のセッション確認が終わるまでのローディング状態
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // アプリ起動時に現在のセッションを取得する
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    // ログイン・ログアウトなど認証状態の変化を監視する
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // メールアドレス＋パスワードで会員登録する
  const signUp = (email, password) => {
    return supabase.auth.signUp({ email, password })
  }

  // メールアドレス＋パスワードでログインする
  const signIn = (email, password) => {
    return supabase.auth.signInWithPassword({ email, password })
  }

  // ログアウトする
  const signOut = () => {
    return supabase.auth.signOut()
  }

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 認証状態を利用するためのカスタムフック
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthはAuthProviderの内部で使用してください。')
  }
  return context
}
