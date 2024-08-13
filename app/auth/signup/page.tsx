'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent, method = 'credentials') => {
    e.preventDefault()
    setError(null)

    try {
      let result = null
      if (method === 'google') {
        result = await signIn(method, { redirect: true, callbackUrl: '/' })
      } else if (method === 'credentials') {
        if (!email || !password) {
          setError('Email and password are required')
          return
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          return
        }
        result = await signIn(method, {
          email,
          password,
          method: 'signup',
          redirect: false,
        })
        if (result?.ok) {
          router.push('/')
        } else {
          setError(result?.error || 'Something went wrong')
        }
      }
    } catch (e) {
      setError('Something went wrong')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        {error && (
          <div className="p-2 mb-4 text-red-500 bg-red-100 rounded">
            {error}
          </div>
        )}
        <button
          className="w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={(e) => handleSignUp(e, 'google')}
        >
          Sign up with Google
        </button>
        <form onSubmit={(e) => handleSignUp(e)} className="space-y-4">
          <div>
            <label className="block">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border rounded"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border rounded"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border rounded"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}
