import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'

export default function ServiceDetail() {
  const { id } = useParams()
  const [service, setService] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/services/${id}`)
        setService(res.data)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [id])

  if (!service) return <div>Loading...</div>

  return (
    <div className="card">
      <h2>{service.title}</h2>
      <p>{service.description}</p>
      <p>Categories: {(service.categories || []).join(', ')}</p>
      <p>Area: {service.serviceArea}</p>
      <h4>Items</h4>
      <ul>
        {(service.items||[]).map((i, idx) => (
          <li key={idx}>{i.name} - ${i.price}</li>
        ))}
      </ul>
    </div>
  )
}
