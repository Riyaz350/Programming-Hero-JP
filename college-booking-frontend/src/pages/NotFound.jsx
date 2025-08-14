import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <div className="text-7xl">🧭</div>
      <h1 className="text-3xl font-bold mt-4">Lost in Campus</h1>
      <p className="text-gray-600 mt-2">This page wandered off to a different lecture hall.</p>
      <Link to="/" className="btn bg-blue-600 text-white mt-6 inline-block">Go Home</Link>
    </div>
  )
}
