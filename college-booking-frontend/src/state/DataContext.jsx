import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import collegesData from '../data/colleges.json'
import initialReviews from '../data/reviews.json'

const DataContext = createContext(null)

const LS_KEYS = {
  applications: 'cb_apps',
  reviews: 'cb_reviews'
}

export function DataProvider({ children }) {
  const [applications, setApplications] = useState([])
  const [reviews, setReviews] = useState(initialReviews)

  // hydrate
  useEffect(() => {
    const a = localStorage.getItem(LS_KEYS.applications)
    const r = localStorage.getItem(LS_KEYS.reviews)
    if (a) setApplications(JSON.parse(a))
    if (r) setReviews(JSON.parse(r))
  }, [])

  useEffect(() => {
    localStorage.setItem(LS_KEYS.applications, JSON.stringify(applications))
  }, [applications])

  useEffect(() => {
    localStorage.setItem(LS_KEYS.reviews, JSON.stringify(reviews))
  }, [reviews])

  const addApplication = (app) => setApplications(prev => [app, ...prev])
  const addReview = (review) => setReviews(prev => [review, ...prev])

  const value = useMemo(() => ({
    colleges: collegesData,
    applications,
    addApplication,
    reviews,
    addReview
  }), [applications, reviews])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)
