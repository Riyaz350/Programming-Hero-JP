import { useForm } from 'react-hook-form'
import { useAuth } from '../state/AuthContext'
import { useEffect, useState } from 'react'
import useAxiosPublic from '../hook/useAxiosPublic'
import collegesData from '../data/colleges.json'  

export default function Admission() {
  const { user } = useAuth()
  const axiosPublic = useAxiosPublic()
  const { register, handleSubmit, reset } = useForm()
  const [colleges, setColleges] = useState([])

  useEffect(() => {
    setColleges(collegesData)
  }, [])

  const onSubmit = async (data) => {
    try {
      await axiosPublic.post('/applications', {
        collegeName: data.collegeId
          ? colleges.find(c => c.id === data.collegeId)?.name
          : data.collegeName,
        candidateName: data.candidateName,
        subject: data.subject,
        email: data.email,          
        phone: data.phone,
        address: data.address,
        dob: data.dob,
        image: data.image,
        applicantEmail: user?.email   
      })

      alert('Application submitted!')
      reset()
    } catch (err) {
      console.error(err)
      alert('Failed to submit application')
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admission</h1>
      <div className="card space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Select College</label>
            <select className="input" {...register('collegeId', { required: true })}>
              <option value="">-- choose --</option>
              {colleges.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="label">Candidate Name</label>
              <input className="input" {...register('candidateName', { required: true })} />
            </div>
            <div>
              <label className="label">Subject</label>
              <input className="input" {...register('subject', { required: true })} />
            </div>
            <div>
              <label className="label">Candidate Email</label>
              <input
                type="email"
                className="input"
                {...register('email', { required: true })}
              />
            </div>
            <div>
              <label className="label">Candidate Phone</label>
              <input className="input" {...register('phone', { required: true })} />
            </div>
            <div>
              <label className="label">Address</label>
              <input className="input" {...register('address', { required: true })} />
            </div>
            <div>
              <label className="label">Date of Birth</label>
              <input type="date" className="input" {...register('dob', { required: true })} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Image URL</label>
              <input className="input" placeholder="https://..." {...register('image')} />
            </div>
          </div>

          <button className="btn bg-blue-600 text-white">Submit</button>
        </form>
      </div>
    </div>
  )
}
