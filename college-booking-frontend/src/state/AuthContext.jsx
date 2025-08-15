import { createContext, useContext, useEffect, useState } from 'react'
import { auth, googleProvider, githubProvider } from '../lib/firebase'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  signInWithPopup
} from 'firebase/auth'
import useAxiosPublic from '../hook/useAxiosPublic'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const axiosPublic = useAxiosPublic()

  // Fetch backend user using token from localStorage
  const fetchBackendUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      const res = await axiosPublic.get('/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      }) 
      setUser(res.data) // assuming backend returns user object
    } catch (err) {
      console.log('Failed to fetch backend user:', err)
      setUser(null)
      localStorage.removeItem('token') // optional: remove invalid token
    } finally {
      setLoading(false)
    }
  }

  // Run on app start
  useEffect(() => {
    fetchBackendUser()
  }, [])

  const login = async (email, password) => {
    const res = await axiosPublic.post('/auth/login', { email, password })
    if (res.data?.token) {
      localStorage.setItem('token', res.data.token)
      await fetchBackendUser()
    }
  }

  const register = async (name, email, password) => {
    const res = await axiosPublic.post('/auth/register', { name, email, password })
    if (res.data?.token) {
      localStorage.setItem('token', res.data.token)
      await fetchBackendUser()
    }
  }

  const reset = (email) => sendPasswordResetEmail(auth, email) // optional if using Firebase
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const value = { user, loading, login, register, reset, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
