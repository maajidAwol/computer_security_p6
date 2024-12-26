'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { User, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../../firebase'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ProfileContentProps {
  user: User
  userData: any
  onMFAEnrollment: () => void
  onLogout: () => void
}

export default function ProfileContent({ user, userData, onMFAEnrollment, onLogout }: ProfileContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href) && searchParams.get('mfaSetup') === 'true') {
      const email = user?.email
      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then(async () => {
            await updateDoc(doc(db, 'users', user.uid), { mfaEnabled: true })
            router.push('/dashboard/profile')
          })
          .catch((error) => {
            console.error('Error completing MFA setup:', error)
          })
      }
    }
  }, [user, router, searchParams])

  return (
    <div className="divide-y divide-gray-200">
      <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        <p>Email: {userData.email}</p>
        <p>Username: {userData.username}</p>
        <p>Role: {userData.role}</p>
        <p>MFA Status: {userData.mfaEnabled ? 'Enabled' : 'Disabled'}</p>
      </div>
      <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
        <div className="flex flex-col space-y-4">
          <Link href="/change-password">
            <Button className="w-full">Change Password</Button>
          </Link>
          {!userData.mfaEnabled && (
            <Button 
              onClick={onMFAEnrollment} 
              className="w-full"
            >
              Enable Multi-Factor Authentication
            </Button>
          )}
          <Button 
            onClick={onLogout} 
            variant="destructive"
            className="w-full"
          >
            Logout
          </Button>
          <Link href="/dashboard/home">
            <Button variant="outline" className="w-full">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

