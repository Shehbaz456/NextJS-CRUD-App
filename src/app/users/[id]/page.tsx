'use client'
import { use, useEffect, useState, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User } from '@/app/types/user'

interface UserDetailPageProps {
  params: Promise<{ id: string }> 
}

interface FormData {
  name: string
  email: string
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
 
  const { id } = use(params)
  
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' })

  useEffect(() => {
    fetchUser()
  }, [id])  

  const fetchUser = async (): Promise<void> => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      const data: User = await response.json()
      setUser(data)
      setFormData({ name: data.name, email: data.email })
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    
    if (!user) return
    
    const previousUser: User = { ...user }
    setUser({ ...user, ...formData })
    setIsEditing(false)

    try {
      const response = await fetch( `https://jsonplaceholder.typicode.com/users/${id}`,  
        {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...user, name: formData.name, email: formData.email})
        }
      )
      
      if (!response.ok) throw new Error('Update failed')
      
      const updatedUser: User = await response.json()
      console.log('update success:', updatedUser)
      alert('User updated successfully!')
      
    } catch (error) {
      setUser(previousUser)
      setFormData({ name: previousUser.name, email: previousUser.email })
      alert('failed to update user')
      console.error('Error updating user:', error)
    }
  }

  const handleDelete = async (): Promise<void> => {
    if (!user) return
    if (!confirm(`Are you sure you want to delete ${user.name}?`)) return

    router.push('/users')

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{ method: 'DELETE' })
      if (!response.ok) throw new Error('Delete failed')
      console.log('User deleted successfully')
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading user...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">User not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-400 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/users"
          className="text-blue-500 hover:text-blue-600 mb-6 inline-block"
        >
          ← Back to Users
        </Link>

        <div className="bg-gray-300 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">User Details</h1>

          {!isEditing ? (
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Name
                </label>
                <p className="text-lg text-gray-800">{user.name}</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <p className="text-lg text-gray-800">{user.email}</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Username
                </label>
                <p className="text-lg text-gray-800">{user.username}</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Phone
                </label>
                <p className="text-lg text-gray-800">{user.phone}</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Website
                </label>
                <p className="text-lg text-gray-800">{user.website}</p>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Save Changes
                </button>
               
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
