import React, { useState } from 'react'
import api from '../api'

export default function ClientRequest() {
  const [serviceRequested, setServiceRequested] = useState('')
  const [budget, setBudget] = useState('')
  const [location, setLocation] = useState('')
  const [categories, setCategories] = useState('')
  const [result, setResult] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/clients/requests', {
        serviceRequested,
        budget: budget ? Number(budget) : undefined,
        location,
        categories: categories.split(',').map(c => c.trim()).filter(Boolean)
      })
      setResult(res.data)
    } catch (e) {
      console.error(e)
      alert('Error')
    }
  }

  return (
    <div>
      <div className="card">
        <h2>Client Request</h2>
        <form onSubmit={onSubmit}>
          <input placeholder="What do you need?" value={serviceRequested} onChange={e => setServiceRequested(e.target.value)} />
          <input placeholder="Budget" value={budget} onChange={e => setBudget(e.target.value)} />
          <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
          <input placeholder="Categories (comma)" value={categories} onChange={e => setCategories(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </div>

      {result && (
        <div className="card">
          <h3>Top Matches</h3>
          <ul>
            {result.ranked.map(s => (
              <li key={s._id}>{s.title} — {(s.categories||[]).join(', ')} — {s.serviceArea}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
