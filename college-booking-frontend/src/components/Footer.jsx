export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container py-6 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} CollegeBooking</p>
        <p>Built with React, Tailwind & Firebase</p>
      </div>
    </footer>
  )
}
