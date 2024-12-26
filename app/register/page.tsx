// // // 'use client'

// // // import { useState } from 'react'
// // // import { useRouter } from 'next/navigation'
// // // import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
// // // import { doc, setDoc } from 'firebase/firestore'
// // // import { auth, db } from '../../firebase'
// // // import Captcha from '../../components/Captcha'
// // // import { logAction } from '../utils/logging'

// // // export default function Register() {
// // //   const [email, setEmail] = useState('')
// // //   const [password, setPassword] = useState('')
// // //   const [error, setError] = useState('')
// // //   const [captchaValidated, setCaptchaValidated] = useState(false)
// // //   const router = useRouter()

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault()
// // //     if (!captchaValidated) {
// // //       setError('Please validate the captcha')
// // //       return
// // //     }
// // //     try {
// // //       const userCredential = await createUserWithEmailAndPassword(auth, email, password)
// // //       await sendEmailVerification(userCredential.user)
// // //       await setDoc(doc(db, 'users', userCredential.user.uid), {
// // //         email: email,
// // //         role: 'user',
// // //         createdAt: new Date().toISOString(),
// // //       })
// // //       await logAction(userCredential.user.uid, 'user_registered', { email })
// // //       router.push('/login')
// // //     } catch (error: any) {
// // //       setError(error.message)
// // //     }
// // //   }

// // //   return (
// // //     <div className="flex min-h-screen flex-col items-center justify-center">
// // //       <h1 className="text-2xl font-bold mb-4">Register</h1>
// // //       <form onSubmit={handleSubmit} className="w-full max-w-xs">
// // //         <input
// // //           type="email"
// // //           value={email}
// // //           onChange={(e) => setEmail(e.target.value)}
// // //           placeholder="Email"
// // //           required
// // //           className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// // //         />
// // //         <input
// // //           type="password"
// // //           value={password}
// // //           onChange={(e) => setPassword(e.target.value)}
// // //           placeholder="Password"
// // //           required
// // //           className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// // //         />
// // //         <Captcha onValidate={(isValid) => setCaptchaValidated(isValid)} />
// // //         <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
// // //           Register
// // //         </button>
// // //       </form>
// // //       {error && <p className="text-red-500 mt-4">{error}</p>}
// // //     </div>
// // //   )
// // // }

// // 'use client'

// // import { useState } from 'react'
// // import { useRouter } from 'next/navigation'
// // import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
// // import { doc, setDoc } from 'firebase/firestore'
// // import { auth, db } from '../../firebase'
// // import Captcha from '../../components/Captcha'
// // import { logAction } from '../utils/logging'

// // export default function Register() {
// //   const [email, setEmail] = useState('')
// //   const [password, setPassword] = useState('')
// //   const [error, setError] = useState('')
// //   const [captchaValidated, setCaptchaValidated] = useState(false)
// //   const router = useRouter()

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     if (!captchaValidated) {
// //       setError('Please validate the captcha')
// //       return
// //     }
// //     try {
// //       const userCredential = await createUserWithEmailAndPassword(auth, email, password)
// //       await sendEmailVerification(userCredential.user)
// //       await setDoc(doc(db, 'users', userCredential.user.uid), {
// //         email: email,
// //         role: 'user',
// //         createdAt: new Date().toISOString(),
// //       })
// //       await logAction(userCredential.user.uid, 'user_registered', { email })
// //       router.push('/login')
// //     } catch (error: any) {
// //       setError(error.message)
// //     }
// //   }

// //   const handleCaptchaValidate = (isValid: boolean) => {
// //     setCaptchaValidated(isValid)
// //     if (!isValid) {
// //       setError('Captcha validation failed. Please try again.')
// //     } else {
// //       setError('')
// //     }
// //   }

// //   return (
// //     <div className="flex min-h-screen flex-col items-center justify-center">
// //       <h1 className="text-2xl font-bold mb-4">Register</h1>
// //       <form onSubmit={handleSubmit} className="w-full max-w-xs">
// //         <input
// //           type="email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           placeholder="Email"
// //           required
// //           className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// //         />
// //         <input
// //           type="password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           placeholder="Password"
// //           required
// //           className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// //         />
// //         <Captcha onValidate={handleCaptchaValidate} />
// //         <button 
// //           type="submit" 
// //           className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
// //           disabled={!captchaValidated}
// //         >
// //           Register
// //         </button>
// //       </form>
// //       {error && <p className="text-red-500 mt-4">{error}</p>}
// //     </div>
// //   )
// // }

// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
// import { doc, setDoc } from 'firebase/firestore'
// import { auth, db } from '../../firebase'
// import Captcha from '../../components/Captcha'
// import { logAction } from '../utils/logging'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Loader2 } from 'lucide-react'

// export default function Register() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [username, setUsername] = useState('')
//   const [error, setError] = useState('')
//   const [captchaValidated, setCaptchaValidated] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!captchaValidated) {
//       setError('Please validate the captcha')
//       return
//     }
//     setLoading(true)
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password)
//       await sendEmailVerification(userCredential.user)
//       await setDoc(doc(db, 'users', userCredential.user.uid), {
//         email: email,
//         username: username,
//         role: 'user',
//         createdAt: new Date().toISOString(),
//       })
//       await logAction(userCredential.user.uid, 'user_registered', { email, username })
//       router.push('/login')
//     } catch (error: any) {
//       setError(error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCaptchaValidate = (isValid: boolean) => {
//     setCaptchaValidated(isValid)
//     if (!isValid) {
//       setError('Captcha validation failed. Please try again.')
//     } else {
//       setError('')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>Register</CardTitle>
//           <CardDescription>Create a new account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Username"
//               required
//             />
//             <Input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               required
//             />
//             <Input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               required
//             />
//             {!captchaValidated && <Captcha onValidate={handleCaptchaValidate} />}
//             <Button type="submit" className="w-full" disabled={loading || !captchaValidated}>
//               {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Register'}
//             </Button>
//           </form>
//           {error && <p className="text-red-500 mt-4">{error}</p>}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import Captcha from '../../components/Captcha'
import { logAction } from '../utils/logging'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [captchaValidated, setCaptchaValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const router = useRouter()

  useEffect(() => {
    validatePassword(password)
  }, [password])

  const validatePassword = (password: string) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasNonalphas = /\W/.test(password)

    setIsPasswordValid(
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasNonalphas
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!captchaValidated) {
      setError('Please validate the captcha')
      return
    }
    if (!isPasswordValid) {
      setError('Please ensure your password meets all the requirements')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(userCredential.user)
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        username: username,
        role: 'user',
        createdAt: new Date().toISOString(),
      })
      await logAction(userCredential.user.uid, 'user_registered', { email, username })
      router.push('/login')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCaptchaValidate = (isValid: boolean) => {
    setCaptchaValidated(isValid)
    if (!isValid) {
      setError('Captcha validation failed. Please try again.')
    } else {
      setError('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <PasswordStrengthMeter password={password} />
            </div>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Password Requirements</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside">
                  <li>At least 8 characters long</li>
                  <li>Contains at least one uppercase letter</li>
                  <li>Contains at least one lowercase letter</li>
                  <li>Contains at least one number</li>
                  <li>Contains at least one special character</li>
                </ul>
              </AlertDescription>
            </Alert>
            {!captchaValidated && <Captcha onValidate={handleCaptchaValidate} />}
            <Button type="submit" className="w-full" disabled={loading || !captchaValidated || !isPasswordValid}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Register'}
            </Button>
          </form>
          <Link href="/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </CardContent>
      </Card>
    </div>
  )
}

