'use client'

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import LEFT_ARROW from '@/src/images/left-arrow.svg';

const TITLE_MAP: { [key: string]: string } = {
  "/": "홈페이지",
  "/mypage": "내정보",
  "/recommend": "추천",
  "/fridge": "냉장고"
}

export default function Header() {
  const pathname = usePathname();

  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    setTitle(TITLE_MAP[pathname] || "");
  }, [pathname])

  return (
    <header className="flex justify-center items-center h-[56px] box-content border-b-[1px] border-black relative px-[16px]">
      {pathname !== "/" && (
        <Link href="/" className="absolute left-0">
          <Image src={LEFT_ARROW as string} alt="뒤로가기" />
        </Link>
      )}
      <h1 className="text-xl">{title}</h1>
    </header>
  )
}