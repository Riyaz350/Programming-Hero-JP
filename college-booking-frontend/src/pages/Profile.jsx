import useAxiosPublic from './../hook/useAxiosPublic' // adjust path if needed
import { useAuth } from '../state/AuthContext'
import { useState, useEffect } from 'react'

export default function Profile() {
  const axiosPublic = useAxiosPublic()
  const { user, setUser } = useAuth()
  const [form, setForm] = useState({
    displayName: '',
    email: '',
    university: '',
    address: ''
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user) {
      setForm({
        displayName: user.name || '',
        email: user.email || '',
        university: user.university || localStorage.getItem('cb_university') || '',
        address: user.address || localStorage.getItem('cb_address') || ''
      })
    }
  }, [user])

  const handleSave = async () => {
  setSaving(true)
  try {
    const token = localStorage.getItem('token')
    const res = await axiosPublic.put(
      '/users/profile',
      {
        name: form.displayName,
        university: form.university,
        address: form.address
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log('Profile updated:', res.data)
    if (setUser) setUser(res.data)
    localStorage.setItem('cb_university', form.university)
    localStorage.setItem('cb_address', form.address)
    alert('Profile updated')
  } catch (err) {
    alert('Failed to update profile')
  }
  setSaving(false)
}

  if (!user) return <p className="text-center mt-4">Loading profile...</p>

  return (
    <div className="max-w-xl mx-auto card space-y-3">
      <h1 className="text-xl font-semibold">My Profile</h1>

      <div>
        <label className="label">Name</label>
        <input
          className="input"
          value={form.displayName}
          onChange={e => setForm({ ...form, displayName: e.target.value })}
        />
      </div>

      <div>
        <label className="label">Email</label>
        <input
          className="input"
          value={form.email}
          disabled
        />
        <p className="text-xs text-gray-500 mt-1">
          Email editing is disabled.
        </p>
      </div>

      <div>
        <label className="label">University</label>
        <input
          className="input"
          value={form.university}
          onChange={e => setForm({ ...form, university: e.target.value })}
        />
      </div>

      <div>
        <label className="label">Address</label>
        <input
          className="input"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="btn bg-blue-600 text-white"
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
    </div>
  )
}
