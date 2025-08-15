import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const navLink = ({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"

  return (
    <header className="bg-white border-b">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="text-xl font-bold">🎓 CollegeBooking</Link>
        <nav className="hidden md:flex gap-6">
          <NavLink to="/" className={navLink}>Home</NavLink>
          <NavLink to="/colleges" className={navLink}>Colleges</NavLink>
          <NavLink to="/admission" className={navLink}>Admission</NavLink>
          <NavLink to="/my-college" className={navLink}>My College</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button onClick={() => navigate('/profile')} className="btn bg-gray-100">{user.name || user.email}</button>
              <button onClick={handleLogout} className="btn bg-red-50">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn bg-blue-600 text-white">Login</Link>
              <Link to="/register" className="btn bg-gray-100">Register</Link>
            </>
          )}
        </div>
      </div>
      <div className="md:hidden border-t">
        <div className="container flex gap-6 py-2">
          <NavLink to="/" className={navLink}>Home</NavLink>
          <NavLink to="/colleges" className={navLink}>Colleges</NavLink>
          <NavLink to="/admission" className={navLink}>Admission</NavLink>
          <NavLink to="/my-college" className={navLink}>My College</NavLink>
        </div>
      </div>
    </header>
  )
}
