'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function MainPage() {
  const { data: session } = useSession()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Home</h1>
        <p className="mb-6">Welcome to the K-HTML-KNU app!</p>
        {session ? (
          <div>
            <div className="mb-4">Logged in as {session?.user?.email}</div>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors duration-200"
            >
              Sign out
            </button>
            <div className="w-full py-2 flex justify-between items-center">
              <Link
                prefetch
                href="/photo/upload"
                className="block mt-4 px-3 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition-colors duration-200"
              >
                Upload a photo
              </Link>
              <Link
                prefetch
                href="photo/list"
                className="block mt-4 px-3 py-2 border border-purple-500 text-purple-500 rounded hover:bg-purple-500 hover:text-white transition-colors duration-200"
              >
                View my photos
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">Not logged in</div>
            <div className="space-x-4">
              <Link
                prefetch
                href="/auth/login"
                className="px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                prefetch
                href="/auth/signup"
                className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
