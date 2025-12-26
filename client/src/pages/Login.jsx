import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/login', { email, password })
      const token = res.data.token
      // Note: role is not in token here; minimally derive role by trying protected routes if needed.
      // For MVP, we fetch role via a lightweight approach: store 'unknown' and refresh after navigation.
      login(token, 'unknown')
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}
