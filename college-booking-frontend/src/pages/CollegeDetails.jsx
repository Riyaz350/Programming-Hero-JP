import { useParams } from 'react-router-dom'
import { useData } from '../state/DataContext'
import { useEffect, useState } from 'react'
import useAxiosPublic from '../hook/useAxiosPublic'

export default function CollegeDetails() {
  const { id } = useParams()
  const { colleges } = useData()
  const college = colleges.find(c => c.id === id)

  const axiosPublic = useAxiosPublic()
  const [ratings, setRatings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!college?.name) return

    const fetchReviews = async () => {
      try {
        const res = await axiosPublic.post('/reviews/filter', {
          collegeName: college.name
        })
        setRatings(res.data)
      } catch (err) {
        console.error('Failed to fetch reviews:', err)
        setRatings([])
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [college?.name, axiosPublic])

  let ratingDisplay
  if (loading) {
    ratingDisplay = <span>Loading ratings...</span>
  } else if (!ratings.length) {
    ratingDisplay = <span>Not yet rated</span>
  } else {
    const avg = (ratings.reduce((sum, r) => sum + Number(r.rating), 0) / ratings.length).toFixed(1)
    ratingDisplay = (
      <span>
        {avg} ⭐ ({ratings.length} review{ratings.length > 1 ? 's' : ''})
      </span>
    )
  }

  if (!college) return <div>College not found.</div>

  return (
    <div className="space-y-6">
      <div className="card">
        <img src={college.image} className="w-full h-64 object-cover rounded-xl" />
        <h1 className="text-2xl font-bold mt-3">{college.name}</h1>
        <p className="text-gray-600">
          Rating: {ratingDisplay}
        </p>
        <p className="text-gray-600">Admission Window: {college.admissionStart} → {college.admissionEnd}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Admission Process</h2>
          <p>{college.admissionProcess}</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Sports</h2>
          <ul className="list-disc pl-5">
            {college.sports.map((s,i)=><li key={i}>{s}</li>)}
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
          <ul className="space-y-2">
            {college.events.map((e,i)=>(
              <li key={i} className="border rounded-xl p-3">
                <p className="font-medium">{e.title}</p>
                <p className="text-sm text-gray-600">{e.date}</p>
                <p className="text-sm">{e.desc}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Research History</h2>
          <ul className="list-disc pl-5 space-y-1">
            {college.researchHistory.map((r,i)=><li key={i}>{r}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
