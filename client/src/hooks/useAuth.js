import { useEffect, useState } from 'react'

const KEY = 'plughub_auth'

export function useAuth() {
  const [token, setToken] = useState(null)
  const [role, setRole] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const { token, role } = JSON.parse(raw)
      setToken(token)
      setRole(role)
    }
  }, [])

  const login = (token, role) => {
    setToken(token)
    setRole(role)
    localStorage.setItem(KEY, JSON.stringify({ token, role }))
  }

  const logout = () => {
    setToken(null)
    setRole(null)
    localStorage.removeItem(KEY)
  }

  return { token, role, login, logout }
}
