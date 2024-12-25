// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { onAuthStateChanged } from 'firebase/auth'
// import { doc, getDoc, collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
// import { auth, db } from '../../../../firebase'

// export default function AdminLogs() {
//   const [user, setUser] = useState<any>(null)
//   const [logs, setLogs] = useState<any[]>([])
//   const router = useRouter()

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
//         const userData = userDoc.data()
//         if (userData && userData.role === 'admin') {
//           setUser(userData)
//           fetchLogs()
//         } else {
//           router.push('/login')
//         }
//       } else {
//         router.push('/login')
//       }
//     })

//     return () => unsubscribe()
//   }, [router])

//   const fetchLogs = async () => {
//     const logsCollection = collection(db, 'logs')
//     const logsQuery = query(logsCollection, orderBy('timestamp', 'desc'), limit(100))
//     const logsSnapshot = await getDocs(logsQuery)
//     const logsList = logsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
//     setLogs(logsList)
//   }

//   if (!user) return null

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center p-4">
//       <h1 className="text-2xl font-bold mb-4">Admin Logs</h1>
//       <div className="w-full max-w-4xl">
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 p-2">Timestamp</th>
//               <th className="border border-gray-300 p-2">User ID</th>
//               <th className="border border-gray-300 p-2">Action</th>
//               <th className="border border-gray-300 p-2">Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {logs.map(log => (
//               <tr key={log.id}>
//                 <td className="border border-gray-300 p-2">{new Date(log.timestamp).toLocaleString()}</td>
//                 <td className="border border-gray-300 p-2">{log.userId}</td>
//                 <td className="border border-gray-300 p-2">{log.action}</td>
//                 <td className="border border-gray-300 p-2">{JSON.stringify(log.details)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { auth, db } from '../../../../firebase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader2 } from 'lucide-react'

export default function AdminLogs() {
  const [user, setUser] = useState<any>(null)
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
        const userData = userDoc.data()
        if (userData && userData.role === 'admin') {
          setUser(userData)
          fetchLogs()
        } else {
          router.push('/login')
        }
      } else {
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  const fetchLogs = async () => {
    const logsCollection = collection(db, 'logs')
    const logsQuery = query(logsCollection, orderBy('timestamp', 'desc'), limit(100))
    const logsSnapshot = await getDocs(logsQuery)
    const logsList = logsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setLogs(logsList)
    setLoading(false)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Admin Logs</CardTitle>
          <CardDescription>View system activity logs</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map(log => (
                  <TableRow key={log.id}>
                    <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{log.userId}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.ipAddress}</TableCell>
                    <TableCell>{JSON.stringify(log.details)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

