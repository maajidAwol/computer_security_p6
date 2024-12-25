import { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'

type PasswordStrength = 'weak' | 'medium' | 'strong'

const PasswordStrengthMeter = ({ password }: { password: string }) => {
  const [strength, setStrength] = useState<PasswordStrength>('weak')
  const [score, setScore] = useState(0)

  useEffect(() => {
    const calculateStrength = () => {
      let newScore = 0
      
      if (password.length >= 8) newScore += 20
      if (password.match(/[a-z]/)) newScore += 20
      if (password.match(/[A-Z]/)) newScore += 20
      if (password.match(/[0-9]/)) newScore += 20
      if (password.match(/[^a-zA-Z0-9]/)) newScore += 20

      setScore(newScore)

      if (newScore < 40) setStrength('weak')
      else if (newScore < 80) setStrength('medium')
      else setStrength('strong')
    }

    calculateStrength()
  }, [password])

  const getColor = () => {
    switch (strength) {
      case 'weak':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'strong':
        return 'bg-green-500'
      default:
        return 'bg-gray-200'
    }
  }

  return (
    <div className="mt-2">
      <Progress value={score} className={`w-full h-2 ${getColor()}`} />
      <p className="text-sm mt-1 text-gray-600">
        Password strength: <span className="font-semibold">{strength}</span>
      </p>
    </div>
  )
}

export default PasswordStrengthMeter

