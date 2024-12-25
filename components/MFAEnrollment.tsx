// 'use client'

// import { useState } from 'react'
// import { User, multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator } from 'firebase/auth'
// import { auth } from '../firebase'
// import { logAction } from '../app/utils/logging'

// export default function MFAEnrollment({ user, onEnrollmentComplete }: { user: User, onEnrollmentComplete: () => void }) {
//   const [phoneNumber, setPhoneNumber] = useState('')
//   const [verificationId, setVerificationId] = useState('')
//   const [verificationCode, setVerificationCode] = useState('')
//   const [error, setError] = useState('')

//   const handleSendCode = async () => {
//     try {
//       const session = await multiFactor(user).getSession()
//       const phoneInfoOptions = {
//         phoneNumber: phoneNumber,
//         session: session
//       }
//       const phoneAuthProvider = new PhoneAuthProvider(auth)
//       const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions)
//       setVerificationId(verificationId)
//     } catch (error: any) {
//       setError(error.message)
//     }
//   }

//   const handleVerifyCode = async () => {
//     try {
//       const cred = PhoneAuthProvider.credential(verificationId, verificationCode)
//       const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred)
//       await multiFactor(user).enroll(multiFactorAssertion, 'Phone Number')
//       await logAction(user.uid, 'mfa_enrolled', { method: 'phone' })
//       onEnrollmentComplete()
//     } catch (error: any) {
//       setError(error.message)
//     }
//   }

//   return (
//     <div className="mt-4">
//       <h2 className="text-xl font-bold mb-4">Enroll in Multi-Factor Authentication</h2>
//       {!verificationId ? (
//         <div>
//           <input
//             type="tel"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             placeholder="Phone Number"
//             className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//           />
//           <button onClick={handleSendCode} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//             Send Verification Code
//           </button>
//         </div>
//       ) : (
//         <div>
//           <input
//             type="text"
//             value={verificationCode}
//             onChange={(e) => setVerificationCode(e.target.value)}
//             placeholder="Verification Code"
//             className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//           />
//           <button onClick={handleVerifyCode} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//             Verify Code
//           </button>
//         </div>
//       )}
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { User, sendSignInLinkToEmail, ActionCodeSettings } from 'firebase/auth'
import { auth } from '@/firebase'
import { logAction } from '@/app/utils/logging'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function MFAEnrollment({ user, onEnrollmentComplete }: { user: User, onEnrollmentComplete: () => void }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleEnrollMFA = async () => {
    setLoading(true)
    setError('')
    try {
      const actionCodeSettings: ActionCodeSettings = {
        url: `${window.location.origin}/verify-mfa`,
        handleCodeInApp: true,
      }
      await sendSignInLinkToEmail(auth, user.email!, actionCodeSettings)
      await logAction(user.uid, 'mfa_enrolled', { method: 'email' })
      setSuccess(true)
      setTimeout(onEnrollmentComplete, 3000)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enroll in Multi-Factor Authentication</CardTitle>
        <CardDescription>Enhance your account security with email-based MFA</CardDescription>
      </CardHeader>
      <CardContent>
        {!success ? (
          <div className="space-y-4">
            <p>Click the button below to enable MFA using your email: {user.email}</p>
            <Button onClick={handleEnrollMFA} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enable MFA'}
            </Button>
          </div>
        ) : (
          <p className="text-green-500">MFA enrollment successful! You'll be redirected shortly.</p>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </CardContent>
    </Card>
  )
}

