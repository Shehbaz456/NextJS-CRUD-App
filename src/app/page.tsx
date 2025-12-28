import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-300">Next.js CRUD App</h1>
        <p className="text-gray-600 mb-8">Manage users with full CRUD functionality</p>
        <Link 
          href="/users"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg transition-colors inline-block"
        >
          View All Users
        </Link>
      </div>
    </div>
  )
}
