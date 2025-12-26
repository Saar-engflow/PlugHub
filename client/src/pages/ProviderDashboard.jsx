import React, { useState } from 'react'
import api from '../api'

export default function ProviderDashboard() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState('')
  const [items, setItems] = useState([{ name: '', price: '' }])
  const [serviceArea, setServiceArea] = useState('')
  const [message, setMessage] = useState('')

  const addItem = () => setItems([...items, { name: '', price: '' }])
  const updateItem = (idx, key, value) => {
    const copy = items.slice()
    copy[idx][key] = value
    setItems(copy)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const payload = {
        title,
        description,
        categories: categories.split(',').map(c => c.trim()).filter(Boolean),
        items: items.map(i => ({ name: i.name, price: Number(i.price) })),
        serviceArea
      }
      const res = await api.post('/services', payload)
      setMessage(`Service submitted. Status: ${res.data.status}`)
    } catch (e) {
      console.error(e)
      setMessage('Error creating service')
    }
  }

  return (
    <div className="card">
      <h2>Provider: Create Service</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input placeholder="Categories (comma separated)" value={categories} onChange={e => setCategories(e.target.value)} />
        <input placeholder="Service Area" value={serviceArea} onChange={e => setServiceArea(e.target.value)} />
        <div>
          <h4>Items</h4>
          {items.map((it, idx) => (
            <div key={idx} className="row">
              <input placeholder="Name" value={it.name} onChange={e => updateItem(idx, 'name', e.target.value)} />
              <input placeholder="Price" value={it.price} onChange={e => updateItem(idx, 'price', e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={addItem}>Add Item</button>
        </div>
        <button type="submit">Create</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  )
}
