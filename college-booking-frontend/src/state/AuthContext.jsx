import { createContext, useContext, useEffect, useState } from 'react'
import { auth, googleProvider, githubProvider } from '../lib/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth'
import useAxiosPublic from '../hook/useAxiosPublic'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const axiosPublic = useAxiosPublic()

  // Fetch backend user using token
  const fetchBackendUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
      const res = await axiosPublic.get('/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      return res.data
    } catch (err) {
      console.log('Failed to fetch backend user:', err)
      localStorage.removeItem('token')
      return null
    }
  }

  // Initialize on app mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = localStorage.getItem('token')
        if (token) {
          // If backend token exists, fetch backend user
          const backendUser = await fetchBackendUser()
          setUser(backendUser || {
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            uid: firebaseUser.uid,
            photoURL: firebaseUser.photoURL
          })
        } else {
          // No backend token, use Firebase user only
          setUser({
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            uid: firebaseUser.uid,
            photoURL: firebaseUser.photoURL
          })
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Email/password login
  const login = async (email, password) => {
    const res = await axiosPublic.post('/auth/login', { email, password })
    if (res.data?.token) {
      localStorage.setItem('token', res.data.token)
      const backendUser = await fetchBackendUser()
      setUser(backendUser)
    }
  }

  // Email/password registration
  const register = async (name, email, password) => {
    const res = await axiosPublic.post('/auth/register', { name, email, password })
    if (res.data?.token) {
      localStorage.setItem('token', res.data.token)
      const backendUser = await fetchBackendUser()
      setUser(backendUser)
    }
  }

  // Firebase Google login
  const loginWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider)
    const firebaseUser = cred.user

    const token = localStorage.getItem('token')
    if (!token) {
      setUser({
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        uid: firebaseUser.uid
      })
    } else {
      const backendUser = await fetchBackendUser()
      setUser(backendUser)
    }
  }

  // Firebase GitHub login
  const loginWithGithub = async () => {
    const cred = await signInWithPopup(auth, githubProvider)
    const firebaseUser = cred.user

    const token = localStorage.getItem('token')
    if (!token) {
      setUser({
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        uid: firebaseUser.uid
      })
    } else {
      const backendUser = await fetchBackendUser()
      setUser(backendUser)
    }
  }

  // Firebase password reset
  const reset = (email) => sendPasswordResetEmail(auth, email)

  // Logout
  const logout = async () => {
    await signOut(auth)
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
        loginWithGithub
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
