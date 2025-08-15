import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../state/AuthContext'
import useAxiosPublic from "../../hook/useAxiosPublic";

export default function Login() {
  const axiosPublic = useAxiosPublic();

  const { register, handleSubmit } = useForm()
  const nav = useNavigate()
  const loc = useLocation()
  const from = loc.state?.from?.pathname || '/'

  const onSubmit = async (data) => {
    try {
      // Send user data to the API
      const res = await axiosPublic.post('/auth/login', {
        email: data.email,
        password: data.password
      });
      // Save token locally (e.g., localStorage)
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        nav(from, { replace: true });
      } else {
        // handle error (optional)
        alert('Login failed: No token received');
      }
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
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
      {/* Social logins remain unchanged */}
      <div className="text-sm text-center">
        <Link to="/reset" className="text-blue-600">Forgot password?</Link>
      </div>
      <p className="text-sm text-center">No account? <Link to="/register" className="text-blue-600">Register</Link></p>
    </div>
  )
}
