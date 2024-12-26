'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../../firebase'
import Link from 'next/link'
import { UserCircle } from 'lucide-react'
import Product from '@/components/product'

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
        const userData = userDoc.data()
        if (userData) {
          setUser(userData)
        } else {
          router.push('/login')
        }
      } else {
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.email}</h1>
          <Link href="/dashboard/profile">
            <UserCircle className="h-8 w-8 text-gray-500 hover:text-gray-700 cursor-pointer" />
          </Link>
        </div>
      </header>
      <main>
        {/* <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <p className="text-2xl text-gray-500">Your dashboard content goes here</p>
            </div>
          </div>
        </div> */}
        <Product />
      </main>
    </div>
  )
}

