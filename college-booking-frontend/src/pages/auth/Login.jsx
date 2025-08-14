import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../state/AuthContext'

export default function Login() {
  const { register, handleSubmit } = useForm()
  const { login, loginWithGoogle, loginWithGithub } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const from = loc.state?.from?.pathname || '/'

  const onSubmit = async (data) => {
    await login(data.email, data.password)
    nav(from, { replace: true })
  }

  return (
    <div className="max-w-md mx-auto card space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" {...register('email', { required: true })} />
        </div>
        <div>
          <label className="label">Password</label>
          <input className="input" type="password" {...register('password', { required: true })} />
        </div>
        <button className="btn bg-blue-600 text-white w-full">Login</button>
      </form>
      <button onClick={loginWithGoogle} className="btn w-full bg-white border">Continue with Google</button>
      <button onClick={loginWithGithub} className="btn w-full bg-white border">Continue with GitHub</button>
      <div className="text-sm text-center">
        <Link to="/reset" className="text-blue-600">Forgot password?</Link>
      </div>
      <p className="text-sm text-center">No account? <Link to="/register" className="text-blue-600">Register</Link></p>
    </div>
  )
}
