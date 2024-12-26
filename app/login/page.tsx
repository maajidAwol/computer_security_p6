// // // // // 'use client'

// // // // // import { useState } from 'react'
// // // // // import { useRouter } from 'next/navigation'
// // // // // import { signInWithEmailAndPassword, sendEmailVerification, MultiFactorError, PhoneAuthProvider, PhoneMultiFactorGenerator } from 'firebase/auth'
// // // // // import { doc, getDoc } from 'firebase/firestore'
// // // // // import { auth, db, multiFactor } from '../../firebase'
// // // // // import { logAction } from '../utils/logging'
// // // // // import MFAEnrollment from '../../components/MFAEnrollment'

// // // // // export default function Login() {
// // // // //   const [email, setEmail] = useState('')
// // // // //   const [password, setPassword] = useState('')
// // // // //   const [verificationId, setVerificationId] = useState('')
// // // // //   const [verificationCode, setVerificationCode] = useState('')
// // // // //   const [error, setError] = useState('')
// // // // //   const [user, setUser] = useState<any>(null)
// // // // //   const [showMFAEnrollment, setShowMFAEnrollment] = useState(false)
// // // // //   const router = useRouter()

// // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // //     e.preventDefault()
// // // // //     try {
// // // // //       const userCredential = await signInWithEmailAndPassword(auth, email, password)
// // // // //       if (!userCredential.user.emailVerified) {
// // // // //         await sendEmailVerification(userCredential.user)
// // // // //         setError('Please verify your email before logging in.')
// // // // //         return
// // // // //       }
// // // // //       setUser(userCredential.user)
// // // // //       const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
// // // // //       const userData = userDoc.data()
// // // // //       if (userData) {
// // // // //         await logAction(userCredential.user.uid, 'user_logged_in', { email: userData.email })
// // // // //         router.push(`/dashboard/${userData.role}`)
// // // // //       } else {
// // // // //         setError('User data not found')
// // // // //       }
// // // // //     } catch (error: any) {
// // // // //       if (error.code === 'auth/multi-factor-auth-required') {
// // // // //         const resolver = multiFactor(auth).getResolver(error as MultiFactorError)
// // // // //         const phoneInfoOptions = {
// // // // //           multiFactorHint: resolver.hints[0],
// // // // //           session: resolver.session
// // // // //         }
// // // // //         const phoneAuthProvider = new PhoneAuthProvider(auth)
// // // // //         const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, auth)
// // // // //         setVerificationId(verificationId)
// // // // //       } else {
// // // // //         setError(error.message)
// // // // //       }
// // // // //     }
// // // // //   }

// // // // //   const handleVerifyCode = async (e: React.FormEvent) => {
// // // // //     e.preventDefault()
// // // // //     try {
// // // // //       const resolver = multiFactor(auth).getResolver(error as MultiFactorError)
// // // // //       const credential = PhoneAuthProvider.credential(verificationId, verificationCode)
// // // // //       const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(credential)
// // // // //       const userCredential = await resolver.resolveSignIn(multiFactorAssertion)
// // // // //       setUser(userCredential.user)
// // // // //       const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
// // // // //       const userData = userDoc.data()
// // // // //       if (userData) {
// // // // //         await logAction(userCredential.user.uid, 'user_logged_in_mfa', { email: userData.email })
// // // // //         router.push(`/dashboard/${userData.role}`)
// // // // //       } else {
// // // // //         setError('User data not found')
// // // // //       }
// // // // //     } catch (error: any) {
// // // // //       setError(error.message)
// // // // //     }
// // // // //   }

// // // // //   const handleMFAEnrollmentComplete = () => {
// // // // //     setShowMFAEnrollment(false)
// // // // //     router.push('/dashboard/user')
// // // // //   }

// // // // //   return (
// // // // //     <div className="flex min-h-screen flex-col items-center justify-center">
// // // // //       <h1 className="text-2xl font-bold mb-4">Login</h1>
// // // // //       {!verificationId ? (
// // // // //         <form onSubmit={handleSubmit} className="w-full max-w-xs">
// // // // //           <input
// // // // //             type="email"
// // // // //             value={email}
// // // // //             onChange={(e) => setEmail(e.target.value)}
// // // // //             placeholder="Email"
// // // // //             required
// // // // //             className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// // // // //           />
// // // // //           <input
// // // // //             type="password"
// // // // //             value={password}
// // // // //             onChange={(e) => setPassword(e.target.value)}
// // // // //             placeholder="Password"
// // // // //             required
// // // // //             className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// // // // //           />
// // // // //           <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
// // // // //             Login
// // // // //           </button>
// // // // //         </form>
// // // // //       ) : (
// // // // //         <form onSubmit={handleVerifyCode} className="w-full max-w-xs">
// // // // //           <input
// // // // //             type="text"
// // // // //             value={verificationCode}
// // // // //             onChange={(e) => setVerificationCode(e.target.value)}
// // // // //             placeholder="Verification Code"
// // // // //             required
// // // // //             className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// // // // //           />
// // // // //           <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
// // // // //             Verify Code
// // // // //           </button>
// // // // //         </form>
// // // // //       )}
// // // // //       {error && <p className="text-red-500 mt-4">{error}</p>}
// // // // //       {showMFAEnrollment && user && (
// // // // //         <MFAEnrollment user={user} onEnrollmentComplete={handleMFAEnrollmentComplete} />
// // // // //       )}
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // 'use client'

// // // // import { useState } from 'react'
// // // // import { useRouter } from 'next/navigation'
// // // // import { signInWithEmailAndPassword, sendEmailVerification, MultiFactorError, PhoneAuthProvider, PhoneMultiFactorGenerator, getMultiFactorResolver, RecaptchaVerifier } from 'firebase/auth'
// // // // import { doc, getDoc } from 'firebase/firestore'
// // // // import { auth, db, multiFactor } from '../../firebase'
// // // // import { logAction } from '../utils/logging'
// // // // import MFAEnrollment from '../../components/MFAEnrollment'

// // // // export default function Login() {
// // // //   const [email, setEmail] = useState('')
// // // //   const [password, setPassword] = useState('')
// // // //   const [verificationId, setVerificationId] = useState('')
// // // //   const [verificationCode, setVerificationCode] = useState('')
// // // //   const [error, setError] = useState('')
// // // //   const [user, setUser] = useState<any>(null)
// // // //   const [showMFAEnrollment, setShowMFAEnrollment] = useState(false)
// // // //   const router = useRouter()

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault()
// // // //     try {
// // // //       const userCredential = await signInWithEmailAndPassword(auth, email, password)
// // // //       if (!userCredential.user.emailVerified) {
// // // //         await sendEmailVerification(userCredential.user)
// // // //         setError('Please verify your email before logging in.')
// // // //         return
// // // //       }
// // // //       setUser(userCredential.user)
// // // //       const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
// // // //       const userData = userDoc.data()
// // // //       if (userData) {
// // // //         await logAction(userCredential.user.uid, 'user_logged_in', { email: userData.email })
// // // //         router.push(`/dashboard/${userData.role}`)
// // // //       } else {
// // // //         setError('User data not found')
// // // //       }
// // // //     } catch (error: any) {
// // // //       if (error.code === 'auth/multi-factor-auth-required') {
// // // //         const resolver = getMultiFactorResolver(auth, error as unknown as MultiFactorError)
// // // //         const phoneInfoOptions = {
// // // //           multiFactorHint: resolver.hints[0],
// // // //           session: resolver.session
// // // //         }
// // // //         const phoneAuthProvider = new PhoneAuthProvider(auth)
// // // //         const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, new RecaptchaVerifier(auth, 'recaptcha-container', {}))
// // // //         setVerificationId(verificationId)
// // // //       } else {
// // // //         setError(error.message)
// // // //       }
// // // //     }
// // // //   }

// // // //   const handleVerifyCode = async (e: React.FormEvent) => {
// // // //     e.preventDefault()
// // // //     try {
// // // //       const resolver = getMultiFactorResolver(auth, error as unknown as MultiFactorError)
// // // //       const credential = PhoneAuthProvider.credential(verificationId, verificationCode)
// // // //       const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(credential)
// // // //       const userCredential = await resolver.resolveSignIn(multiFactorAssertion)
// // // //       setUser(userCredential.user)
// // // //       const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
// // // //       const userData = userDoc.data()
// // // //       if (userData) {
// // // //         await logAction(userCredential.user.uid, 'user_logged_in_mfa', { email: userData.email })
// // // //         router.push(`/dashboard/${userData.role}`)
// // // //       } else {
// // // //         setError('User data not found')
// // // //       }
// // // //     } catch (error: any) {
// // // //       setError(error.message)
// // // //     }
// // // //   }

// // // //   const handleMFAEnrollmentComplete = () => {
// // // //     setShowMFAEnrollment(false)
// // // //     router.push('/dashboard/user')
// // // //   }

// // // //   return (
// // // //     <div className="flex min-h-screen flex-col items-center justify-center">
// // // //       <h1 className="text-2xl font-bold mb-4">Login</h1>
// // // //       {!verificationId ? (
// // // //         <form onSubmit={handleSubmit} className="w-full max-w-xs">
// // // //           <input
// // // //             type="email"
// // // //             value={email}
// // // //             onChange={(e) => setEmail(e.target.value)}
// // // //             placeholder="Email"
// // // //             required
// // // //             className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// // // //           />
// // // //           <input
// // // //             type="password"
// // // //             value={password}
// // // //             onChange={(e) => setPassword(e.target.value)}
// // // //             placeholder="Password"
// // // //             required
// // // //             className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// // // //           />
// // // //           <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
// // // //             Login
// // // //           </button>
// // // //         </form>
// // // //       ) : (
// // // //         <form onSubmit={handleVerifyCode} className="w-full max-w-xs">
// // // //           <input
// // // //             type="text"
// // // //             value={verificationCode}
// // // //             onChange={(e) => setVerificationCode(e.target.value)}
// // // //             placeholder="Verification Code"
// // // //             required
// // // //             className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// // // //           />
// // // //           <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
// // // //             Verify Code
// // // //           </button>
// // // //         </form>
// // // //       )}
// // // //       {error && <p className="text-red-500 mt-4">{error}</p>}
// // // //       {showMFAEnrollment && user && (
// // // //         <MFAEnrollment user={user} onEnrollmentComplete={handleMFAEnrollmentComplete} />
// // // //       )}
// // // //       <div id="recaptcha-container"></div>
// // // //     </div>
// // // //   )
// // // // }
// // // 'use client'

// // // import { useState } from 'react'
// // // import { useRouter } from 'next/navigation'
// // // import { signInWithEmailAndPassword, sendEmailVerification, MultiFactorError, PhoneAuthProvider, PhoneMultiFactorGenerator, getMultiFactorResolver, RecaptchaVerifier } from 'firebase/auth'
// // // import { doc, getDoc } from 'firebase/firestore'
// // // import { auth, db, multiFactor } from '../../firebase'
// // // import { logAction } from '../utils/logging'
// // // import MFAEnrollment from '../../components/MFAEnrollment'

// // // export default function Login() {
// // //   const [email, setEmail] = useState('')
// // //   const [password, setPassword] = useState('')
// // //   const [verificationId, setVerificationId] = useState('')
// // //   const [verificationCode, setVerificationCode] = useState('')
// // //   const [error, setError] = useState('')
// // //   const [user, setUser] = useState<any>(null)
// // //   const [showMFAEnrollment, setShowMFAEnrollment] = useState(false)
// // //   const router = useRouter()

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault()
// // //     try {
// // //       const userCredential = await signInWithEmailAndPassword(auth, email, password)
// // //       if (!userCredential.user.emailVerified) {
// // //         await sendEmailVerification(userCredential.user)
// // //         setError('Please verify your email before logging in.')
// // //         return
// // //       }
// // //       setUser(userCredential.user)
// // //       const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
// // //       const userData = userDoc.data()
// // //       if (userData) {
// // //         await logAction(userCredential.user.uid, 'user_logged_in', { email: userData.email })
// // //         router.push('/dashboard/home')
// // //       } else {
// // //         setError('User data not found')
// // //       }
// // //     } catch (error: any) {
// // //       if (error.code === 'auth/multi-factor-auth-required') {
// // //         const resolver = getMultiFactorResolver(auth, error as unknown as MultiFactorError)
// // //         const phoneInfoOptions = {
// // //           multiFactorHint: resolver.hints[0],
// // //           session: resolver.session
// // //         }
// // //         const phoneAuthProvider = new PhoneAuthProvider(auth)
// // //         const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, new RecaptchaVerifier(auth, 'recaptcha-container', {}))
// // //         setVerificationId(verificationId)
// // //       } else {
// // //         setError(error.message)
// // //       }
// // //     }
// // //   }

// // //   const handleVerifyCode = async (e: React.FormEvent) => {
// // //     e.preventDefault()
// // //     try {
// // //       const resolver = getMultiFactorResolver(auth, error as unknown as MultiFactorError)
// // //       const credential = PhoneAuthProvider.credential(verificationId, verificationCode)
// // //       const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(credential)
// // //       const userCredential = await resolver.resolveSignIn(multiFactorAssertion)
// // //       setUser(userCredential.user)
// // //       const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
// // //       const userData = userDoc.data()
// // //       if (userData) {
// // //         await logAction(userCredential.user.uid, 'user_logged_in_mfa', { email: userData.email })
// // //         router.push('/dashboard/home')
// // //       } else {
// // //         setError('User data not found')
// // //       }
// // //     } catch (error: any) {
// // //       setError(error.message)
// // //     }
// // //   }

// // //   const handleMFAEnrollmentComplete = () => {
// // //     setShowMFAEnrollment(false)
// // //     router.push('/dashboard/home')
// // //   }

// // //   return (
// // //     <div className="flex min-h-screen flex-col items-center justify-center">
// // //       <h1 className="text-2xl font-bold mb-4">Login</h1>
// // //       {!verificationId ? (
// // //         <form onSubmit={handleSubmit} className="w-full max-w-xs">
// // //           <input
// // //             type="email"
// // //             value={email}
// // //             onChange={(e) => setEmail(e.target.value)}
// // //             placeholder="Email"
// // //             required
// // //             className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// // //           />
// // //           <input
// // //             type="password"
// // //             value={password}
// // //             onChange={(e) => setPassword(e.target.value)}
// // //             placeholder="Password"
// // //             required
// // //             className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// // //           />
// // //           <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
// // //             Login
// // //           </button>
// // //         </form>
// // //       ) : (
// // //         <form onSubmit={handleVerifyCode} className="w-full max-w-xs">
// // //           <input
// // //             type="text"
// // //             value={verificationCode}
// // //             onChange={(e) => setVerificationCode(e.target.value)}
// // //             placeholder="Verification Code"
// // //             required
// // //             className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// // //           />
// // //           <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
// // //             Verify Code
// // //           </button>
// // //         </form>
// // //       )}
// // //       {error && <p className="text-red-500 mt-4">{error}</p>}
// // //       {showMFAEnrollment && user && (
// // //         <MFAEnrollment user={user} onEnrollmentComplete={handleMFAEnrollmentComplete} />
// // //       )}
// // //       <div id="recaptcha-container"></div>
// // //     </div>
// // //   )
// // // }


// // 'use client'

// // import { useState } from 'react'
// // import { useRouter } from 'next/navigation'
// // import { signInWithEmailAndPassword, sendEmailVerification, MultiFactorError, PhoneAuthProvider, PhoneMultiFactorGenerator, getMultiFactorResolver, RecaptchaVerifier } from 'firebase/auth'
// // import { doc, getDoc } from 'firebase/firestore'
// // import { auth, db, multiFactor } from '../../firebase'
// // import { logAction } from '../utils/logging'
// // import MFAEnrollment from '../../components/MFAEnrollment'
// // import Captcha from '../../components/Captcha'

// // export default function Login() {
// //   const [email, setEmail] = useState('')
// //   const [password, setPassword] = useState('')
// //   const [verificationId, setVerificationId] = useState('')
// //   const [verificationCode, setVerificationCode] = useState('')
// //   const [error, setError] = useState('')
// //   const [user, setUser] = useState<any>(null)
// //   const [showMFAEnrollment, setShowMFAEnrollment] = useState(false)
// //   const [captchaValidated, setCaptchaValidated] = useState(false)
// //   const router = useRouter()

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     if (!captchaValidated) {
// //       setError('Please validate the captcha')
// //       return
// //     }
// //     try {
// //       const userCredential = await signInWithEmailAndPassword(auth, email, password)
// //       if (!userCredential.user.emailVerified) {
// //         await sendEmailVerification(userCredential.user)
// //         setError('Please verify your email before logging in.')
// //         return
// //       }
// //       setUser(userCredential.user)
// //       const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
// //       const userData = userDoc.data()
// //       if (userData) {
// //         await logAction(userCredential.user.uid, 'user_logged_in', { email: userData.email })
// //         router.push(userData.role === 'admin' ? '/dashboard/admin' : '/dashboard/home')
// //       } else {
// //         setError('User data not found')
// //       }
// //     } catch (error: any) {
// //       if (error.code === 'auth/multi-factor-auth-required') {
// //         const resolver = getMultiFactorResolver(auth, error as unknown as MultiFactorError)
// //         const phoneInfoOptions = {
// //           multiFactorHint: resolver.hints[0],
// //           session: resolver.session
// //         }
// //         const phoneAuthProvider = new PhoneAuthProvider(auth)
// //         const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, new RecaptchaVerifier(auth, 'recaptcha-container', {}))
// //         setVerificationId(verificationId)
// //       } else {
// //         setError(error.message)
// //       }
// //     }
// //   }

// //   const handleVerifyCode = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     try {
// //       const resolver = getMultiFactorResolver(auth, error as unknown as MultiFactorError)
// //       const credential = PhoneAuthProvider.credential(verificationId, verificationCode)
// //       const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(credential)
// //       const userCredential = await resolver.resolveSignIn(multiFactorAssertion)
// //       setUser(userCredential.user)
// //       const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
// //       const userData = userDoc.data()
// //       if (userData) {
// //         await logAction(userCredential.user.uid, 'user_logged_in_mfa', { email: userData.email })
// //         router.push(userData.role === 'admin' ? '/dashboard/admin' : '/dashboard/home')
// //       } else {
// //         setError('User data not found')
// //       }
// //     } catch (error: any) {
// //       setError(error.message)
// //     }
// //   }

// //   const handleMFAEnrollmentComplete = () => {
// //     setShowMFAEnrollment(false)
// //     router.push('/dashboard/home')
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
// //       <h1 className="text-2xl font-bold mb-4">Login</h1>
// //       {!verificationId ? (
// //         <form onSubmit={handleSubmit} className="w-full max-w-xs">
// //           <input
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             placeholder="Email"
// //             required
// //             className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// //           />
// //           <input
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             placeholder="Password"
// //             required
// //             className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// //           />
// //           <Captcha onValidate={handleCaptchaValidate} />
// //           <button 
// //             type="submit" 
// //             className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
// //             disabled={!captchaValidated}
// //           >
// //             Login
// //           </button>
// //         </form>
// //       ) : (
// //         <form onSubmit={handleVerifyCode} className="w-full max-w-xs">
// //           <input
// //             type="text"
// //             value={verificationCode}
// //             onChange={(e) => setVerificationCode(e.target.value)}
// //             placeholder="Verification Code"
// //             required
// //             className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// //           />
// //           <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
// //             Verify Code
// //           </button>
// //         </form>
// //       )}
// //       {error && <p className="text-red-500 mt-4">{error}</p>}
// //       {showMFAEnrollment && user && (
// //         <MFAEnrollment user={user} onEnrollmentComplete={handleMFAEnrollmentComplete} />
// //       )}
// //       <div id="recaptcha-container"></div>
// //     </div>
// //   )
// // }

// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { signInWithEmailAndPassword, sendEmailVerification, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
// import { doc, getDoc } from 'firebase/firestore'
// import { auth, db } from '../../firebase'
// import { logAction } from '../utils/logging'
// import Captcha from '../../components/Captcha'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Loader2 } from 'lucide-react'

// export default function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [captchaValidated, setCaptchaValidated] = useState(false)
//   const [mfaRequired, setMfaRequired] = useState(false)
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!captchaValidated) {
//       setError('Please validate the captcha')
//       return
//     }
//     setLoading(true)
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password)
//       if (!userCredential.user.emailVerified) {
//         await sendEmailVerification(userCredential.user)
//         setError('Please verify your email before logging in.')
//         setLoading(false)
//         return
//       }
//       const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
//       const userData = userDoc.data()
//       if (userData) {
//         if (userData.mfaEnabled) {
//           setMfaRequired(true)
//           await sendSignInLinkToEmail(auth, email, {
//             url: window.location.href,
//             handleCodeInApp: true,
//           })
//           localStorage.setItem('emailForSignIn', email)
//           setError('Please check your email for the login link.')
//         } else {
//           await logAction(userCredential.user.uid, 'user_logged_in', { email: userData.email })
//           router.push(userData.role === 'admin' ? '/dashboard/admin' : '/dashboard/home')
//         }
//       } else {
//         setError('User data not found')
//       }
//     } catch (error: any) {
//       setError(error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleMfaVerify = async () => {
//     if (isSignInWithEmailLink(auth, window.location.href)) {
//       const email = localStorage.getItem('emailForSignIn')
//       if (email) {
//         setLoading(true)
//         try {
//           const result = await signInWithEmailLink(auth, email, window.location.href)
//           const userDoc = await getDoc(doc(db, 'users', result.user.uid))
//           const userData = userDoc.data()
//           if (userData) {
//             await logAction(result.user.uid, 'user_logged_in_mfa', { email: userData.email })
//             router.push(userData.role === 'admin' ? '/dashboard/admin' : '/dashboard/home')
//           } else {
//             setError('User data not found')
//           }
//         } catch (error: any) {
//           setError(error.message)
//         } finally {
//           setLoading(false)
//         }
//       } else {
//         setError('Unable to complete sign in. Please try again.')
//       }
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
//     <div className="min-h-screen bg-gray-100  flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>Login</CardTitle>
//           <CardDescription>Access your account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           {!mfaRequired ? (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <Input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 required
//               />
//               <Input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 required
//               />
//               {!captchaValidated && <Captcha onValidate={handleCaptchaValidate} />}
//               <Button type="submit" className="w-full" disabled={loading || !captchaValidated}>
//                 {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Login'}
//               </Button>
//             </form>
//           ) : (
//             <div className="space-y-4">
//               <p>Please check your email for the login link.</p>
//               <Button onClick={handleMfaVerify} className="w-full" disabled={loading}>
//                 {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify Email Link'}
//               </Button>
//             </div>
//           )}
//           {error && <p className="text-red-500 mt-4">{error}</p>}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, sendEmailVerification, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { logAction } from '../utils/logging'
import Captcha from '../../components/Captcha'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [captchaValidated, setCaptchaValidated] = useState(false)
  const [mfaRequired, setMfaRequired] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if the current URL is a sign-in link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        email = window.prompt('Please provide your email for confirmation')
      }
      if (email) {
        setLoading(true)
        signInWithEmailLink(auth, email, window.location.href)
          .then(async (result) => {
            window.localStorage.removeItem('emailForSignIn')
            const userDoc = await getDoc(doc(db, 'users', result.user.uid))
            const userData = userDoc.data()
            if (userData) {
              await logAction(result.user.uid, 'user_logged_in_mfa', { email: userData.email })
              router.push(userData.role === 'admin' ? '/dashboard/admin' : '/dashboard/home')
            } else {
              setError('User data not found')
            }
          })
          .catch((error) => {
            setError(error.message)
          })
          .finally(() => {
            setLoading(false)
          })
      }
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!captchaValidated) {
      setError('Please validate the captcha')
      return
    }
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user)
        setError('Please verify your email before logging in.')
        setLoading(false)
        return
      }
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
      const userData = userDoc.data()
      if (userData) {
        if (userData.mfaEnabled) {
          setMfaRequired(true)
          await sendSignInLinkToEmail(auth, email, {
            url: window.location.href,
            handleCodeInApp: true,
          })
          window.localStorage.setItem('emailForSignIn', email)
          setError('Please check your email for the login link.')
        } else {
          await logAction(userCredential.user.uid, 'user_logged_in', { email: userData.email })
          router.push(userData.role === 'admin' ? '/dashboard/admin' : '/dashboard/home')
        }
      } else {
        setError('User data not found')
      }
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
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Access your account</CardDescription>
        </CardHeader>
        <CardContent>
          {!mfaRequired ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              {!captchaValidated && <Captcha onValidate={handleCaptchaValidate} />}
              <Button type="submit" className="w-full" disabled={loading || !captchaValidated}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Login'}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <p>Please check your email for the login link.</p>
              <Button onClick={() => window.location.reload()} className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'I\'ve clicked the email link'}
              </Button>
            </div>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </CardContent>
      </Card>
    </div>
  )
}

