import React, { useEffect, useState } from 'react'
import api from '../api'

export default function AdminPanel() {
  const [pending, setPending] = useState([])

  const load = async () => {
    const res = await api.get('/services')
    // The public list returns approved; for pending, we could add admin-only endpoint.
    // For MVP, show all and allow approve/reject via guess; better: backend should have /admin/services?status=pending.
    setPending(res.data.filter(s => s.status !== 'approved'))
  }

  const act = async (id, action) => {
    await api.patch(`/admin/services/${id}/${action}`)
    await load()
  }

  useEffect(() => { load() }, [])

  return (
    <div className="card">
      <h2>Admin: Approvals</h2>
      <ul>
        {pending.map(s => (
          <li key={s._id} className="row">
            <span>{s.title} — {s.status}</span>
            <div>
              <button onClick={() => act(s._id, 'approve')}>Approve</button>
              <button onClick={() => act(s._id, 'reject')}>Reject</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
