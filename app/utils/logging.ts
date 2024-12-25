// import { addDoc, collection } from 'firebase/firestore'
// import { db } from '../../firebase'

// export async function logAction(userId: string, action: string, details: any) {
//   try {
//     await addDoc(collection(db, 'logs'), {
//       userId,
//       action,
//       details,
//       timestamp: new Date().toISOString()
//     })
//   } catch (error) {
//     console.error('Error logging action:', error)
//   }
// }

import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'

export async function logAction(userId: string, action: string, details: any) {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    const ipAddress = data.ip

    await addDoc(collection(db, 'logs'), {
      userId,
      action,
      details,
      ipAddress,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error logging action:', error)
  }
}

