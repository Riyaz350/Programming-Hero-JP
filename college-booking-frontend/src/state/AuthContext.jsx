import { createContext, useContext, useEffect, useState } from 'react'
import { auth, googleProvider, githubProvider } from '../lib/firebase'
import {
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
      setUser(res.data)
    } catch (err) {
      console.log('Failed to fetch backend user:', err)
      setUser(null)
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBackendUser()
  }, [])

  // Email/password login
  const login = async (email, password) => {
    const res = await axiosPublic.post('/auth/login', { email, password })
    if (res.data?.token) {
      localStorage.setItem('token', res.data.token)
      await fetchBackendUser()
    }
  }

  // Email/password registration
  const register = async (name, email, password) => {
    const res = await axiosPublic.post('/auth/register', { name, email, password })
    if (res.data?.token) {
      localStorage.setItem('token', res.data.token)
      await fetchBackendUser()
    }
  }

  // Firebase social login (use Firebase user if no backend token)
  const loginWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider)
    const firebaseUser = cred.user

    const token = localStorage.getItem('token')
    if (!token) {
      // No backend token, just use Firebase user
      setUser({
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        uid: firebaseUser.uid,
      })
    } else {
      // Optional: fetch backend user if token exists
      await fetchBackendUser()
    }
  }

  const loginWithGithub = async () => {
    const cred = await signInWithPopup(auth, githubProvider)
    const firebaseUser = cred.user

    const token = localStorage.getItem('token')
    if (!token) {
      setUser({
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        uid: firebaseUser.uid,
      })
    } else {
      await fetchBackendUser()
    }
  }

  // Firebase password reset (optional)
  const reset = (email) => sendPasswordResetEmail(auth, email)

  // Logout
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        register,
        reset,
        logout,
        loginWithGoogle,
        loginWithGithub,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
