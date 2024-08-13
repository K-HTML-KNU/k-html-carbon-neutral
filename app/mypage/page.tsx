'use client'

import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

export default function Mypage() {
  const { data: session } = useSession()

  console.log(session?.user?.email)

  return (
    <div className="">
      <div className="flex flex-col gap-4">
        <>
          <h1 className="font-semibold text-lg">User Info</h1>
          <div className="flex flex-col gap-2">
            <div>
              <h2 className="font-medium">Email</h2>
              <p className="text-slate-600">{session?.user?.email}</p>
            </div>

            <div>
              <h2 className="font-medium">Name</h2>
              <p className="text-slate-600">
                {session?.user?.name ?? 'Guest User'}
              </p>
            </div>
          </div>
        </>

        <>
          <h1 className="font-semibold text-lg">Developed By</h1>
          <div className="flex flex-col gap-2">
            <div>
              <h2 className="font-medium">곽재원</h2>
              <p className="text-slate-600">importjaewone@gmail.com</p>
            </div>

            <div>
              <h2 className="font-medium">신홍기</h2>
              <p className="text-slate-600">hin6150@gmail.com</p>
            </div>

            <div>
              <h2 className="font-medium">양동균</h2>
              <p className="text-slate-600">importjaewone@gmail.com</p>
            </div>

            <div>
              <h2 className="font-medium">홍기현</h2>
              <p className="text-slate-600">kpj45123@gmail.com</p>
            </div>

            <div>
              <h2 className="font-medium">Team Github</h2>
              <a
                href="https://github.com/K-HTML-KNU/k-html-carbon-neutral"
                target="_blank"
              >
                <p className="text-slate-600">
                  https://github.com/K-HTML-KNU/k-html-carbon-neutral
                </p>
              </a>
            </div>
          </div>
        </>

        <div>
          <h1 className="font-semibold text-lg">Updated At</h1>
          <p className="text-slate-600">
            Developed At 2024.08.14(Wed) AM 06:00
          </p>
        </div>
      </div>

      <Button className="mt-12" variant="destructive">
        로그아웃
      </Button>
    </div>
  )
}
