import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../state/AuthContext'

export default function Register() {
  const { register: reg, handleSubmit } = useForm()
  const { register: registerUser } = useAuth()
  const nav = useNavigate()

  const onSubmit = async (data) => {
    await registerUser(data.email, data.password, data.name)
    nav('/')
  }

  return (
    <div className="max-w-md mx-auto card space-y-4">
      <h1 className="text-2xl font-bold">Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="label">Full Name</label>
          <input className="input" {...reg('name', { required: true })} />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" {...reg('email', { required: true })} />
        </div>
        <div>
          <label className="label">Password</label>
          <input className="input" type="password" {...reg('password', { required: true, minLength: 6 })} />
        </div>
        <button className="btn bg-blue-600 text-white w-full">Register</button>
      </form>
      <p className="text-sm text-center">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
    </div>
  )
}
