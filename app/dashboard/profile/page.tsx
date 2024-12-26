// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { onAuthStateChanged, signOut, User, multiFactor } from 'firebase/auth'
// import { doc, getDoc } from 'firebase/firestore'
// import { auth, db } from '../../../firebase'
// import Link from 'next/link'
// import MFAEnrollment from '../../../components/MFAEnrollment'

// export default function UserProfile() {
//   const [user, setUser] = useState<User | null>(null)
//   const [userData, setUserData] = useState<any>(null)
//   const [showMFAEnrollment, setShowMFAEnrollment] = useState(false)
//   const router = useRouter()

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser)
//         const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
//         const data = userDoc.data()
//         if (data) {
//           setUserData(data)
//         } else {
//           router.push('/login')
//         }
//       } else {
//         router.push('/login')
//       }
//     })

//     return () => unsubscribe()
//   }, [router])

//   const handleLogout = async () => {
//     try {
//       await signOut(auth)
//       router.push('/login')
//     } catch (error) {
//       console.error('Error signing out:', error)
//     }
//   }

//   const handleMFAEnrollmentComplete = () => {
//     setShowMFAEnrollment(false)
//   }

//   if (!user || !userData) return null

//   const mfaEnrolled = multiFactor(user).enrolledFactors.length > 0

//   return (
//     <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//       <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//         <div className="absolute inset-0 bg-gray-100 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//         <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//           <div className="max-w-md mx-auto">
//             <div>
//               <h1 className="text-2xl font-semibold">User Profile</h1>
//             </div>
//             <div className="divide-y divide-gray-200">
//               <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//                 <p>Email: {userData.email}</p>
//                 <p>Role: {userData.role}</p>
//                 <p>MFA Status: {mfaEnrolled ? 'Enabled' : 'Disabled'}</p>
//               </div>
//               <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
//                 <div className="flex flex-col space-y-4">
//                   <Link href="/change-password" className="text-cyan-600 hover:text-cyan-700">
//                     Change Password
//                   </Link>
//                   {!mfaEnrolled && (
//                     <button 
//                       onClick={() => setShowMFAEnrollment(true)} 
//                       className="text-cyan-600 hover:text-cyan-700"
//                     >
//                       Enable Multi-Factor Authentication
//                     </button>
//                   )}
//                   <button 
//                     onClick={handleLogout} 
//                     className="text-red-600 hover:text-red-700"
//                   >
//                     Logout
//                   </button>
//                   <Link href="/dashboard/home" className="text-cyan-600 hover:text-cyan-700">
//                     Back to Dashboard
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {showMFAEnrollment && user && (
//         <MFAEnrollment user={user} onEnrollmentComplete={handleMFAEnrollmentComplete} />
//       )}
//     </div>
//   )
// }

'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut, User, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../../firebase'
import Link from 'next/link'
import MFAEnrollment from '../../../components/MFAEnrollment'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import ProfileContent from './ProfileContent'

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [showMFAEnrollment, setShowMFAEnrollment] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
        const data = userDoc.data()
        if (data) {
          setUserData(data)
        } else {
          router.push('/login')
        }
      } else {
        router.push('/login')
      }
      setLoading(false)
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
    setUserData((prevData: any) => ({ ...prevData, mfaEnabled: true }))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user || !userData) return null

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <Card className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
              <ProfileContent 
                user={user} 
                userData={userData} 
                onMFAEnrollment={() => setShowMFAEnrollment(true)}
                onLogout={handleLogout}
              />
            </Suspense>
          </CardContent>
        </Card>
      </div>
      {showMFAEnrollment && user && (
        <MFAEnrollment user={user} onEnrollmentComplete={handleMFAEnrollmentComplete} />
      )}
    </div>
  )
}

