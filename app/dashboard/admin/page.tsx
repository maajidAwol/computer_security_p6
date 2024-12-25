// // // 'use client'

// // // import { useEffect, useState } from 'react'
// // // import { useRouter } from 'next/navigation'
// // // import { onAuthStateChanged, signOut } from 'firebase/auth'
// // // import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
// // // import { auth, db } from '../../../firebase'
// // // import Link from 'next/link';

// // // export default function AdminDashboard() {
// // //   const [user, setUser] = useState<any>(null)
// // //   const [users, setUsers] = useState<any[]>([])
// // //   const router = useRouter()

// // //   useEffect(() => {
// // //     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
// // //       if (currentUser) {
// // //         const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
// // //         const userData = userDoc.data()
// // //         if (userData && userData.role === 'admin') {
// // //           setUser(userData)
// // //           fetchUsers()
// // //         } else {
// // //           router.push('/login')
// // //         }
// // //       } else {
// // //         router.push('/login')
// // //       }
// // //     })

// // //     return () => unsubscribe()
// // //   }, [router])

// // //   const fetchUsers = async () => {
// // //     const usersCollection = collection(db, 'users')
// // //     const usersSnapshot = await getDocs(usersCollection)
// // //     const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
// // //     setUsers(usersList)
// // //   }

// // //   const handleLogout = async () => {
// // //     try {
// // //       await signOut(auth)
// // //       router.push('/login')
// // //     } catch (error) {
// // //       console.error('Error signing out:', error)
// // //     }
// // //   }

// // //   if (!user) return null

// // //   return (
// // //     <div className="flex min-h-screen flex-col items-center justify-center">
// // //       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
// // //       <p>Welcome, {user.email}</p>
// // //       <h2 className="text-xl font-bold mt-8 mb-4">User List</h2>
// // //       <ul>
// // //         {users.map(user => (
// // //           <li key={user.id}>{user.email} - {user.role}</li>
// // //         ))}
// // //       </ul>
// // //       <Link href="/dashboard/admin/logs" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
// // //         View Logs
// // //       </Link>
// // //       <button onClick={handleLogout} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
// // //         Logout
// // //       </button>
// // //     </div>
// // //   )
// // // }

// // 'use client'

// // import { useEffect, useState } from 'react'
// // import { useRouter } from 'next/navigation'
// // import { onAuthStateChanged, signOut } from 'firebase/auth'
// // import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
// // import { auth, db } from '../../../firebase'
// // import Link from 'next/link'

// // export default function AdminDashboard() {
// //   const [user, setUser] = useState<any>(null)
// //   const [users, setUsers] = useState<any[]>([])
// //   const router = useRouter()

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
// //       if (currentUser) {
// //         const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
// //         const userData = userDoc.data()
// //         if (userData && userData.role === 'admin') {
// //           setUser(userData)
// //           fetchUsers()
// //         } else {
// //           router.push('/login')
// //         }
// //       } else {
// //         router.push('/login')
// //       }
// //     })

// //     return () => unsubscribe()
// //   }, [router])

// //   const fetchUsers = async () => {
// //     const usersCollection = collection(db, 'users')
// //     const usersSnapshot = await getDocs(usersCollection)
// //     const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
// //     setUsers(usersList)
// //   }

// //   const handleLogout = async () => {
// //     try {
// //       await signOut(auth)
// //       router.push('/login')
// //     } catch (error) {
// //       console.error('Error signing out:', error)
// //     }
// //   }

// //   if (!user) return null

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <header className="bg-white shadow">
// //         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
// //           <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
// //           <button 
// //             onClick={handleLogout} 
// //             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
// //           >
// //             Logout
// //           </button>
// //         </div>
// //       </header>
// //       <main>
// //         <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
// //           <div className="px-4 py-6 sm:px-0">
// //             <h2 className="text-xl font-bold mb-4">User List</h2>
// //             <ul className="bg-white shadow overflow-hidden sm:rounded-md">
// //               {users.map(user => (
// //                 <li key={user.id} className="border-b border-gray-200 last:border-b-0">
// //                   <div className="px-4 py-4 sm:px-6">
// //                     <div className="flex items-center justify-between">
// //                       <p className="text-sm font-medium text-indigo-600 truncate">{user.email}</p>
// //                       <div className="ml-2 flex-shrink-0 flex">
// //                         <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
// //                           {user.role}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </li>
// //               ))}
// //             </ul>
// //             <div className="mt-4">
// //               <Link href="/dashboard/admin/logs" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
// //                 View Logs
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   )
// // }

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { onAuthStateChanged, signOut } from 'firebase/auth'
// import { doc, getDoc, collection, getDocs, updateDoc } from 'firebase/firestore'
// import { auth, db } from '../../../firebase'
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Loader2 } from 'lucide-react'

// export default function AdminDashboard() {
//   const [user, setUser] = useState<any>(null)
//   const [users, setUsers] = useState<any[]>([])
//   const [loading, setLoading] = useState(false)
//   const [promotingUser, setPromotingUser] = useState<string | null>(null)
//   const router = useRouter()

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
//         const userData = userDoc.data()
//         if (userData && userData.role === 'admin') {
//           setUser(userData)
//           fetchUsers()
//         } else {
//           router.push('/login')
//         }
//       } else {
//         router.push('/login')
//       }
//     })

//     return () => unsubscribe()
//   }, [router])

//   const fetchUsers = async () => {
//     setLoading(true)
//     const usersCollection = collection(db, 'users')
//     const usersSnapshot = await getDocs(usersCollection)
//     const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
//     setUsers(usersList)
//     setLoading(false)
//   }

//   const handleLogout = async () => {
//     try {
//       await signOut(auth)
//       router.push('/login')
//     } catch (error) {
//       console.error('Error signing out:', error)
//     }
//   }

//   const promoteToAdmin = async (userId: string) => {
//     setPromotingUser(userId)
//     try {
//       await updateDoc(doc(db, 'users', userId), { role: 'admin' })
//       await fetchUsers()
//     } catch (error) {
//       console.error('Error promoting user:', error)
//     }
//     setPromotingUser(null)
//   }

//   if (!user) return null

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
//       <header className="bg-white bg-opacity-10 backdrop-blur-lg shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//           <Button variant="destructive" onClick={handleLogout}>
//             Logout
//           </Button>
//         </div>
//       </header>
//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>User Management</CardTitle>
//                 <CardDescription>View and manage system users</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Button asChild className="w-full">
//                   <Link href="#user-list">View Users</Link>
//                 </Button>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>System Logs</CardTitle>
//                 <CardDescription>View system activity logs</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Button asChild className="w-full">
//                   <Link href="/dashboard/admin/logs">View Logs</Link>
//                 </Button>
//               </CardContent>
//             </Card>
//             {/* Add more admin functionalities here */}
//           </div>
          
//           <Card className="mt-8" id="user-list">
//             <CardHeader>
//               <CardTitle>User List</CardTitle>
//               <CardDescription>Manage system users</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {loading ? (
//                 <div className="flex justify-center">
//                   <Loader2 className="h-8 w-8 animate-spin" />
//                 </div>
//               ) : (
//                 <ul className="space-y-4">
//                   {users.map(user => (
//                     <li key={user.id} className="flex items-center justify-between bg-white bg-opacity-10 p-4 rounded-lg">
//                       <div>
//                         <p className="font-medium">{user.email}</p>
//                         <p className="text-sm opacity-70">{user.username}</p>
//                         <p className="text-xs mt-1 bg-blue-500 inline-block px-2 py-1 rounded">
//                           {user.role}
//                         </p>
//                       </div>
//                       {user.role !== 'admin' && (
//                         <Button 
//                           onClick={() => promoteToAdmin(user.id)}
//                           disabled={promotingUser === user.id}
//                         >
//                           {promotingUser === user.id ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             'Promote to Admin'
//                           )}
//                         </Button>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../../firebase'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Users, FileText, ShieldAlert } from 'lucide-react'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
        const userData = userDoc.data()
        if (userData && userData.role === 'admin') {
          setUser(userData)
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100 text-white">
      <header className="bg-white bg-opacity-10 backdrop-blur-lg shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-semibold mb-6">Welcome, {user.email}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2" />
                  User Management
                </CardTitle>
                <CardDescription>View and manage system users</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/dashboard/admin/users">Manage Users</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2" />
                  System Logs
                </CardTitle>
                <CardDescription>View system activity logs</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/dashboard/admin/logs">View Logs</Link>
                </Button>
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShieldAlert className="mr-2" />
                  Security Overview
                </CardTitle>
                <CardDescription>Monitor system security status</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/dashboard/admin/security">View Security</Link>
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>
        
      </main>
    </div>
  )
}

