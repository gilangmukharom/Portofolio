import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { api, setAccessToken, setUnauthorisedHandler } from './api'

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'EDITOR'
  lastLoginAt: string | null
}

interface AuthValue {
  user: AdminUser | null
  status: 'checking' | 'authenticated' | 'anonymous'
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  reload: () => Promise<void>
}

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [status, setStatus] = useState<AuthValue['status']>('checking')

  const reload = useCallback(async () => {
    const me = await api.get<AdminUser>('/auth/me')
    setUser(me)
  }, [])

  // On boot the access token is gone but the refresh cookie may still be good,
  // so a silent refresh is what decides whether the session survives a reload.
  useEffect(() => {
    let cancelled = false

    void (async () => {
      const refreshed = await api.refresh()
      if (cancelled) return
      if (!refreshed) {
        setStatus('anonymous')
        return
      }
      try {
        await reload()
        if (!cancelled) setStatus('authenticated')
      } catch {
        if (!cancelled) setStatus('anonymous')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [reload])

  // A failed refresh mid-session must drop the user back to the login screen.
  useEffect(() => {
    setUnauthorisedHandler(() => {
      setUser(null)
      setStatus('anonymous')
    })
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const result = await api.post<{ user: AdminUser; accessToken: string }>('/auth/login', {
      email,
      password,
    })
    setAccessToken(result.accessToken)
    setUser(result.user)
    setStatus('authenticated')
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      setAccessToken(null)
      setUser(null)
      setStatus('anonymous')
    }
  }, [])

  const value = useMemo(
    () => ({ user, status, login, logout, reload }),
    [user, status, login, logout, reload],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside <AuthProvider>')
  return value
}
