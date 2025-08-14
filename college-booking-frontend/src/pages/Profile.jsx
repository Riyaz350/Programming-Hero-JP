import { useAuth } from '../state/AuthContext'
import { useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { auth } from '../lib/firebase'

export default function Profile() {
  const { user } = useAuth()
  const [form, setForm] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    university: localStorage.getItem('cb_university') || '',
    address: localStorage.getItem('cb_address') || ''
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    if (auth.currentUser && form.displayName !== user.displayName) {
      await updateProfile(auth.currentUser, { displayName: form.displayName })
    }
    // For demo JSON-only app, store extra fields locally
    localStorage.setItem('cb_university', form.university)
    localStorage.setItem('cb_address', form.address)
    setSaving(false)
    alert('Profile updated')
  }

  return (
    <div className="max-w-xl mx-auto card space-y-3">
      <h1 className="text-xl font-semibold">My Profile</h1>
      <div>
        <label className="label">Name</label>
        <input className="input" value={form.displayName} onChange={e=>setForm({...form, displayName: e.target.value})} />
      </div>
      <div>
        <label className="label">Email</label>
        <input className="input" value={form.email} disabled />
        <p className="text-xs text-gray-500 mt-1">Email editing is disabled in this demo (Firebase requires re-auth).</p>
      </div>
      <div>
        <label className="label">University</label>
        <input className="input" value={form.university} onChange={e=>setForm({...form, university: e.target.value})} />
      </div>
      <div>
        <label className="label">Address</label>
        <input className="input" value={form.address} onChange={e=>setForm({...form, address: e.target.value})} />
      </div>
      <button onClick={handleSave} disabled={saving} className="btn bg-blue-600 text-white">
        {saving ? 'Saving...' : 'Save'}
      </button>
    </div>
  )
}
