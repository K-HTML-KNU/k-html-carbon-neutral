import Nature from '@/meta/images/nature.png'

export default function Loading({ isOpen }: { isOpen: boolean }) {

  return (
    <div className={`absolute top-0 left-0 w-[100%] h-[100%] flex items-center justify-center z-[100] ${!isOpen && 'hidden'}`}>
      <div className="w-[320px] h-[320px] bg-white z-10 flex justify-center items-center rounded-xl flex-col gap-4">
        <img width={120} height={310} src={Nature.src} alt="nature" />
        <h1 className="text-xl z-10">로딩중입니다...</h1>
      </div>
      <div className="absolute w-[100%] h-[100%] bg-gray-400  opacity-50" />
    </div>
  )
}