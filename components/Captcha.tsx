// 'use client'

// import { useState, useEffect } from 'react'

// export default function Captcha({ onValidate }: { onValidate: (isValid: boolean) => void }) {
//   const [captchaText, setCaptchaText] = useState('')
//   const [userInput, setUserInput] = useState('')

//   const generateCaptcha = () => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//     let result = ''
//     for (let i = 0; i < 6; i++) {
//       result += chars.charAt(Math.floor(Math.random() * chars.length))
//     }
//     setCaptchaText(result)
//   }

//   useEffect(() => {
//     generateCaptcha()
//   }, [])

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onValidate(userInput === captchaText)
//   }

//   return (
//     <div className="mt-4">
//       <div className="bg-gray-200 p-2 mb-2 text-center font-bold">{captchaText}</div>
//       <form onSubmit={handleSubmit} className="flex space-x-2">
//         <input
//           type="text"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           placeholder="Enter captcha"
//           className="flex-grow px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//         />
//         <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//           Verify
//         </button>
//       </form>
//     </div>
//   )
// }
'use client'

import { useState, useEffect } from 'react'

export default function Captcha({ onValidate }: { onValidate: (isValid: boolean) => void }) {
  const [captchaText, setCaptchaText] = useState('')
  const [userInput, setUserInput] = useState('')

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaText(result)
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleVerify = () => {
    onValidate(userInput === captchaText)
    if (userInput !== captchaText) {
      generateCaptcha()
      setUserInput('')
    }
  }

  return (
    <div className="mt-4">
      <div className="bg-gray-200 p-2 mb-2 text-center font-bold">{captchaText}</div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter captcha"
          className="flex-grow px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
        <button 
          type="button" 
          onClick={handleVerify}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Verify
        </button>
      </div>
    </div>
  )
}


