'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut, User, multiFactor } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../../firebase'
import Link from 'next/link'
import MFAEnrollment from '../../../components/MFAEnrollment'

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [showMFAEnrollment, setShowMFAEnrollment] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
        const data = userDoc.data()
        if (data && data.role === 'user') {
          setUserData(data)
        } else {
          router.push('/login')
        }
      } else {
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleMFAEnrollmentComplete = () => {
    setShowMFAEnrollment(false)
  }

  if (!user || !userData) return null

  const mfaEnrolled = multiFactor(user).enrolledFactors.length > 0

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <p className="mb-4">Welcome, {userData.email}</p>
      <div className="flex flex-col space-y-4">
        <Link href="/change-password" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Change Password
        </Link>
        {!mfaEnrolled && (
          <button onClick={() => setShowMFAEnrollment(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Enable Multi-Factor Authentication
          </button>
        )}
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Logout
        </button>
      </div>
      {showMFAEnrollment && (
        <MFAEnrollment user={user} onEnrollmentComplete={handleMFAEnrollmentComplete} />
      )}
    </div>
  )
}

