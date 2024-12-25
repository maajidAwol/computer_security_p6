'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, collection, getDocs, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../../../firebase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function UserManagement() {
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [promotingUser, setPromotingUser] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
        const userData = userDoc.data()
        if (userData && userData.role === 'admin') {
          setUser(userData)
          fetchUsers()
        } else {
          router.push('/login')
        }
      } else {
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  const fetchUsers = async () => {
    const usersCollection = collection(db, 'users')
    const usersSnapshot = await getDocs(usersCollection)
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setUsers(usersList)
    setLoading(false)
  }

  const promoteToAdmin = async (userId: string) => {
    setPromotingUser(userId)
    try {
      await updateDoc(doc(db, 'users', userId), { role: 'admin' })
      await fetchUsers()
    } catch (error) {
      console.error('Error promoting user:', error)
    }
    setPromotingUser(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage system users</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {users.map(user => (
              <li key={user.id} className="flex items-center justify-between bg-white bg-opacity-10 p-4 rounded-lg">
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm opacity-70">{user.username}</p>
                  <p className="text-xs mt-1 bg-blue-500 inline-block px-2 py-1 rounded">
                    {user.role}
                  </p>
                </div>
                {user.role !== 'admin' && (
                  <Button 
                    onClick={() => promoteToAdmin(user.id)}
                    disabled={promotingUser === user.id}
                  >
                    {promotingUser === user.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Promote to Admin'
                    )}
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

