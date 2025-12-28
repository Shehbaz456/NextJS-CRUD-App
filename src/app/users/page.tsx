'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { User } from '@/app/types/user'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data: User[] = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading users...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-400 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Users List</h1>
        
        <div className="grid gap-6">
          {users.map((user) => (
            <div 
              key={user.id} 
              className="bg-gray-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 mt-1">{user.email}</p>
                </div>
                <Link 
                  href={`/users/${user.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
