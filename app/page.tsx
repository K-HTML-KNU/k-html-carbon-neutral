'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Camera from '@/components/Camera'
import Food from "@/components/Food"

export default function Home() {
  return (
    <div>
      {/* 탄소 중립 */}
      <section className="mb-8">
        <Card className="w-[100%] p-6">
          <div className="flex gap-[24px] items-center">
            {/* 탄소 절감 수치 */}
            <div className="w-[45%] h-[100%] flex items-center justify-center">
              <h1 className="text-3xl">3000 g</h1>
            </div>
            {/* 탄소 절감에 대한 내용 */}
            <div>
              <span className="text-sm text-gray-600">000님 덕분에</span>
              <div>
                <b>x 그루의 나무가</b>
                <p>한달동안 제거할 수 있는 만큼의 탄소 배출량이 절감되었습니다. </p>
              </div>
            </div>
          </div>
        </Card>
      </section>
      {/* 나와 관련된 레시피 */}
      <section>
        <h1 className="text-xl font-medium mb-4">나를 위한 레시피</h1>
        <div className="flex gap-[12px] flex-wrap">
          <Food type="Grains and Starches" name="계란" description="달걀은 단백질이 풍부하고, 지방과 콜레스테롤 함량이 낮아서 건강에 좋은 식품입니다." nutrition="굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양" storage="잘 저장 잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장" />
          <Food type="Grains and Starches" name="계란" description="달걀은 단백질이 풍부하고, 지방과 콜레스테롤 함량이 낮아서 건강에 좋은 식품입니다." nutrition="굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양" storage="잘 저장 잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장" />
          <Food type="Grains and Starches" name="계란" description="달걀은 단백질이 풍부하고, 지방과 콜레스테롤 함량이 낮아서 건강에 좋은 식품입니다." nutrition="굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양" storage="잘 저장 잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장" />
          <Food type="Grains and Starches" name="계란" description="달걀은 단백질이 풍부하고, 지방과 콜레스테롤 함량이 낮아서 건강에 좋은 식품입니다." nutrition="굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양" storage="잘 저장 잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장" />
        </div>
      </section>
      {/* 카메라 */}
      {/* <section>
        <Camera />
      </section> */}
    </div>
  )
}
