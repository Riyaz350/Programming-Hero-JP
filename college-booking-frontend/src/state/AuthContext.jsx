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

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const register = (email, password, displayName) =>
    createUserWithEmailAndPassword(auth, email, password).then(async ({ user }) => {
      if (displayName) {
        await updateProfile(user, { displayName })
      }
    })
  const reset = (email) => sendPasswordResetEmail(auth, email)
  const logout = () => signOut(auth)
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider)
  const loginWithGithub = () => signInWithPopup(auth, githubProvider)

  const value = { user, loading, login, register, reset, logout, loginWithGoogle, loginWithGithub }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
