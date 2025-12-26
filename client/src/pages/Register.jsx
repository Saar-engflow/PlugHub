import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('client')
  const [location, setLocation] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/register', { name, email, password, role, location })
      login(res.data.token, role)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="client">Client</option>
          <option value="provider">Provider</option>
          <option value="admin">Admin</option>
        </select>
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <button type="submit">Create account</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}
