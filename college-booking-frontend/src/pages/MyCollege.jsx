import { useEffect, useState } from 'react'
import { useAuth } from '../state/AuthContext'
import useAxiosPublic from '../hook/useAxiosPublic'

export default function MyCollege() {
  const { user } = useAuth()
  const axiosPublic = useAxiosPublic()
  const [applications, setApplications] = useState([])
  const [review, setReview] = useState({ collegeId: '', rating: 5, text: '' })
  const [loading, setLoading] = useState(true)

  // Fetch user's applications using their email
  useEffect(() => {
    if (!user?.email) return
    const fetchApplications = async () => {
      try {
        const res = await axiosPublic.get(`/applications?applicantEmail=${encodeURIComponent(user.email)}`)
        setApplications(res.data)
      } catch (err) {
        console.error('Failed to fetch applications:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchApplications()
  }, [user])

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!review.collegeId || !review.text) return

    // Mock review submission
    const newReview = {
      id: crypto.randomUUID(),
      collegeId: review.collegeId,
      user: user?.name || user?.email,
      rating: Number(review.rating),
      text: review.text,
      createdAt: new Date().toISOString()
    }

    alert('Review added! It will show on the Home page.')
    setReview({ collegeId: '', rating: 5, text: '' })
  }

  if (loading) return <p className="text-center mt-4">Loading your applications...</p>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My College</h1>

      {!applications.length ? (
        <p>You haven't submitted any applications yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {applications.map(app => (
            <div key={app._id} className="card">
              <div className="flex gap-3">
                {app.image && (
                  <img src={app.image} className="w-28 h-28 object-cover rounded-xl" />
                )}
                <div>
                  <h3 className="text-lg font-semibold">{app.collegeName}</h3>
                  <p className="text-sm text-gray-600">Applied: {new Date(app.createdAt).toLocaleString()}</p>
                  <p className="text-sm">Subject: {app.subject}</p>
                  <p className="text-sm">Candidate Email: {app.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review form */}
      <div className="card max-w-xl">
        <h2 className="text-xl font-semibold mb-2">Add a Review</h2>
        <form onSubmit={handleSubmitReview} className="space-y-3">
          <div>
            <label className="label">College</label>
            <select
              className="input"
              value={review.collegeId}
              onChange={e => setReview(v => ({ ...v, collegeId: e.target.value }))}
            >
              <option value="">-- choose applied college --</option>
              {applications.map(a => (
                <option value={a._id} key={a._id}>
                  {a.collegeName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              className="input"
              value={review.rating}
              onChange={e => setReview(v => ({ ...v, rating: e.target.value }))}
            />
          </div>
          <div>
            <label className="label">Feedback</label>
            <textarea
              className="input h-28"
              value={review.text}
              onChange={e => setReview(v => ({ ...v, text: e.target.value }))}
            />
          </div>
          <button className="btn bg-blue-600 text-white">Submit Review</button>
        </form>
      </div>
    </div>
  )
}
