import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import ProviderDashboard from './pages/ProviderDashboard'
import ClientRequest from './pages/ClientRequest'
import AdminPanel from './pages/AdminPanel'
import { useAuth } from './hooks/useAuth'

function Nav() {
  const { token, role, logout } = useAuth()
  return (
    <nav className="nav">
      <Link to="/">PlugHub</Link>
      <div>
        <Link to="/services">Services</Link>
        {role === 'provider' && <Link to="/provider">Provider</Link>}
        {role === 'client' && <Link to="/request">Request</Link>}
        {role === 'admin' && <Link to="/admin">Admin</Link>}
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </nav>
  )
}

const Protected = ({ roles, children }) => {
  const { token, role } = useAuth()
  if (!token) return <Navigate to="/login" />
  if (roles && !roles.includes(role)) return <Navigate to="/" />
  return children
}

export default function App() {
  return (
    <div className="container">
      <Nav />
      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/provider" element={<Protected roles={["provider"]}><ProviderDashboard /></Protected>} />
        <Route path="/request" element={<Protected roles={["client"]}><ClientRequest /></Protected>} />
        <Route path="/admin" element={<Protected roles={["admin"]}><AdminPanel /></Protected>} />
      </Routes>
    </div>
  )
}
