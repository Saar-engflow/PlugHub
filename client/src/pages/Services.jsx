import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/services')
        setServices(res.data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2>Services</h2>
      <div className="grid">
        {services.map(s => (
          <Link to={`/services/${s._id}`} key={s._id} className="card">
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <small>{(s.categories||[]).join(', ')}</small>
          </Link>
        ))}
      </div>
    </div>
  )
}
