import { useMemo, useState } from 'react'
import { useData } from '../state/DataContext'
import { useAuth } from '../state/AuthContext'

export default function MyCollege() {
  const { applications, colleges, addReview } = useData()
  const { user } = useAuth()
  const myApps = useMemo(() => applications.filter(a => a.userId === user.uid), [applications, user])
  const [review, setReview] = useState({ collegeId: '', rating: 5, text: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!review.collegeId || !review.text) return
    addReview({
      id: crypto.randomUUID(),
      collegeId: review.collegeId,
      user: user.displayName || user.email,
      rating: Number(review.rating),
      text: review.text,
      createdAt: new Date().toISOString()
    })
    setReview({ collegeId: '', rating: 5, text: '' })
    alert('Review added! It will show on the Home page.')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My College</h1>
      {!myApps.length ? (
        <p>You haven't submitted any applications yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {myApps.map(app => {
            const college = colleges.find(c => c.id === app.collegeId)
            return (
              <div key={app.id} className="card">
                <div className="flex gap-3">
                  <img src={college.image} className="w-28 h-28 object-cover rounded-xl" />
                  <div>
                    <h3 className="text-lg font-semibold">{college.name}</h3>
                    <p className="text-sm text-gray-600">Applied: {new Date(app.createdAt).toLocaleString()}</p>
                    <p className="text-sm">Subject: {app.subject}</p>
                    <p className="text-sm">Email: {app.email}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Review form */}
      <div className="card max-w-xl">
        <h2 className="text-xl font-semibold mb-2">Add a Review</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="label">College</label>
            <select className="input" value={review.collegeId} onChange={e=>setReview(v=>({...v, collegeId: e.target.value}))}>
              <option value="">-- choose applied college --</option>
              {myApps.map(a => {
                const c = colleges.find(cc => cc.id === a.collegeId)
                return <option value={c.id} key={c.id}>{c.name}</option>
              })}
            </select>
          </div>
          <div>
            <label className="label">Rating</label>
            <input type="number" min="1" max="5" className="input" value={review.rating} onChange={e=>setReview(v=>({...v, rating: e.target.value}))} />
          </div>
          <div>
            <label className="label">Feedback</label>
            <textarea className="input h-28" value={review.text} onChange={e=>setReview(v=>({...v, text: e.target.value}))} />
          </div>
          <button className="btn bg-blue-600 text-white">Submit Review</button>
        </form>
      </div>
    </div>
  )
}
