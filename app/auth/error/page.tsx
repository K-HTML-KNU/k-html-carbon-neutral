import Link from 'next/link'

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-red-500">Error</h1>
        <div className="p-2 mb-4 text-red-500 bg-red-100 rounded">
          Something went wrong.
        </div>
        <Link
          prefetch
          href="/auth/login"
          className="block w-full px-4 py-2 text-center text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Go back to login
        </Link>
      </div>
    </div>
  )
}
