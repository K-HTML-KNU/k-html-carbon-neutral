import Link from "next/link";

export default function Navigation() {
  return (
    <div>
      {/* Empty div */}
      <div className="h-[56px]" />
      <nav className="fixed bottom-0 w-[100%] max-w-[640px] h-[56px] border-black border-t-[1px] flex items-center px-[16px] bg-white">
        <ul className="w-[100%] flex justify-between">
          <li>
            <Link href="/">
              홈
            </Link>
          </li>
          <li>
            <Link href="/recommend">
              추천
            </Link>
          </li>
          <li>
            <Link href="/fridge">
              냉장고
            </Link>
          </li>
          <li>
            <Link href="/mypage">
              내정보
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}