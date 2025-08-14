import { useMemo, useState } from 'react'
import { useData } from '../state/DataContext'
import CollegeCard from '../components/CollegeCard'
import { Link } from 'react-router-dom'

export default function Home() {
  const { colleges, reviews } = useData()
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return []
    return colleges.filter(c => c.name.toLowerCase().includes(s))
  }, [q, colleges])

  return (
    <div className="space-y-10">
      {/* Hero/Search */}
      <section className="card !p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Find & Book College Services</h1>
            <p className="text-gray-600">Search colleges, explore events, research, and sports — then apply online.</p>
          </div>
          <div className="flex-1 w-full">
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search a college name..." className="input" />
            {q && (
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                {filtered.length ? filtered.map(c => <CollegeCard key={c.id} college={c} compact />) : <p className="text-sm text-gray-600">No results.</p>}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Colleges */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Featured Colleges</h2>
          <Link to="/colleges" className="text-blue-600 text-sm">View all →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {colleges.slice(0,3).map(c => <CollegeCard key={c.id} college={c} />)}
        </div>
      </section>

      {/* Gallery */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Graduates Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1596495577891-5d3adb2c7ab2?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1621211902481-7fb33e64cf62?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1627556704613-cb1bde0a89f9?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop"
          ].map((src, i) => (
            <img key={i} src={src} className="w-full h-28 md:h-36 object-cover rounded-xl" />
          ))}
        </div>
      </section>

      {/* Research Papers */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Student Research Papers</h2>
        <ul className="space-y-2">
          {[
            { title: "Optimizing Solar Microgrids", link: "#" },
            { title: "Interactive AR for Culture", link: "#" },
            { title: "Low-cost Water Purification", link: "#" },
            { title: "Autonomous Drone Swarms", link: "#" }
          ].map((p, i) => (
            <li key={i} className="card flex items-center justify-between">
              <span>{p.title}</span>
              <a href={p.link} className="text-blue-600 text-sm">View PDF</a>
            </li>
          ))}
        </ul>
      </section>

      {/* Reviews */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Recent Reviews</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {reviews.slice(0,6).map(r => (
            <div key={r.id} className="card">
              <p className="text-sm text-gray-600 mb-2">{new Date(r.createdAt).toLocaleDateString()}</p>
              <p className="font-semibold">{r.user}</p>
              <p className="text-yellow-600">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</p>
              <p className="mt-2 text-gray-700">{r.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
