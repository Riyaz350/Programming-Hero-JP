import { useData } from '../state/DataContext'
import CollegeCard from '../components/CollegeCard'

export default function Colleges() {
  const { colleges } = useData()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Colleges</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {colleges.map(c => <CollegeCard key={c.id} college={c} />)}
      </div>
    </div>
  )
}
