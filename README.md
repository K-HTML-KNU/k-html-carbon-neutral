#  🌱EatNature
__ __ __
어플 대표 이미지

- 배포 URL : https://k-html-carbon-neutral.vercel.app/
- QRcode ![[assets/EatNature_qrcode.png]]

## 목차
___

1. 프로젝트 소개
2. 팀원소개
3. Background
4. 사용한 기술 및 라이브러리
5. Features
6. 시연 영상
7. 저작권 및 라이선스 정보

## 프로젝트 소개
___
- 🌱EatNature는 새로운 식문화를 통해 환경문제를 해결하기 위한 웹엡어플리케이션입니다. 
-  요리하고 남은 식재료를 관리하고 원하는 식재료를 사진을 찍어 레시피를 얻을 수 있습니다. 
-  환경을 생각한 레시피를 제공합니다.
-  요리를 통해 환경보호를 얼마나 하였는지 직관적으로 확인할 수 있고 지속적으로 환경문제 해결을 위한 정보를 제공합니다. 
-  식재료를 등록하면 자동으로 분류하고 보관/처리방법과 영양정보를 확인할 수 있습니다. 
## 팀원소개
____

|                                         **곽재원**                                          |                        **양동균**                        |                                           **신홍기**                                           |                            **홍기현**                            |
| :--------------------------------------------------------------------------------------: | :---------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------: |
| ![[KakaoTalk_Photo_2024-08-14-01-44-01.jpeg]]<br>@yeon1615](https://github.com/yeon1615) | [!  <br>@Cheorizzang](https://github.com/Cheorizzang) | ![[KakaoTalk_Photo_2024-08-14-01-37-55.png]][!<br>@heejiyang](https://github.com/heejiyang) | ![[증명사진.jpeg]]<br>@journey-ji](https://github.com/journey-ji) |
|                                         백엔드 및 AI                                         |                      프론트앤드 및 백엔드                      |                                            프론트엔드                                            |                              AI                               |
|                                                                                          |                                                       |                                                                                             |                                                               |
|                                                                                          |                                                       |                                                                                             |                                                               |
## 💡 Background
---
> 용인시 주민이 음식물 쓰레기 처리 비용을 더 많이 부담하고 있습니다. 
- 다른 시보다 용인의 종량제봉투의 가격이 더높은 것을 발견하였고 그 원인은 높은 쓰레기 처리비용과 운반비등에 있었습니다. 그중 음식물 쓰레기의 처리 비용이 다른 시/도보다 높았습니다. 
- 음식물 쓰레기의 70%는 가정및 소형음식점에서 발생합니다. 

'개개인의 작은 노력을 통해 음식물 쓰레기를 줄일수 있다' 

라는 결론에 도달했고 이를 위해 낭비되는 식재료로 맛있게 먹을 수 있는 방법을 알려주기로 하였습니다. 



## 사용한 기술 및 라이브러리
___
- Front: React , NextJS
	- React
		- 
- Back : NextJS
- DB : PostgreSQL
- Models: Azer OpenAI, YOLOv8
	- [만개의 래시피](https://www.10000recipe.com/)크롤링을 통해 DB구축후 유사 RAG를 구현하여 Hallucination 을 방지하고 실현 가능한 레시피를 추천
	- yolo의 finetuning을 통해 객체 탐지 진행
	-  OpenAI의 API를 통해 prompt Engineering을 통해 모델의 활용성을 극대화


## 프로젝트 구조

📦k-html-carbon-neutral  
 ┣ 📂.git  
 ┃ ┣ 📂branches  
 ┃ ┣ 📂hooks  
 ┃ ┃ ┣ 📜applypatch-msg.sample  
 ┃ ┃ ┣ 📜commit-msg.sample  
 ┃ ┃ ┣ 📜fsmonitor-watchman.sample  
 ┃ ┃              .
 ┃ ┃              .
 ┃ ┃ ┗ 📜update.sample  
 ┃ ┣ 📂info  
 ┃ ┃ ┗ 📜exclude  
 ┃ ┣ 📂logs  
 ┃ ┃ ┣ 📂refs  
 ┃ ┃ ┃ ┣ 📂heads  
 ┃ ┃ ┃ ┃ ┗ 📜main  
 ┃ ┃ ┃ ┗ 📂remotes  
 ┃ ┃ ┃ ┃ ┗ 📂origin  
 ┃ ┃ ┃ ┃ ┃ ┣ 📂feat  
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜form  
 ┃ ┃ ┃ ┃ ┃ ┣ 📂feature  
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜design-recommend-detail-layout  
 ┃ ┃ ┃ ┃ ┃ ┣ 📜HEAD  
 ┃ ┃ ┃ ┃ ┃ ┣ 📜main  
 ┃ ┃ ┃ ┃ ┃ ┗ 📜recipe-api  
 ┃ ┃ ┗ 📜HEAD  
 ┃ ┣ 📂objects  
 ┃ ┃ ┣ 📂00  
 ┃ ┃ ┃ ┣ 📜40536ae27303ba97de98cdace53828e95203fb  
 ┃ ┃ ┃ ┣ 📜50fbc036ae8d1c6ba865a825a31daeaec482e8  
 ┃ ┃ ┃ ┗ 📜8ebe3e8bd8745ee03ac8e4dc528530c81ceb58  
 ┃ ┃ ┣ 📂01  
 ┃ ┃ ┃ ┣ 📜678fa89f3ddff8ff0d57d3f7ba5685f22f22b9  
 ┃ ┃ ┃ ┗ 📜83faf78ebc38194a9fd410174bdd9cc455b968  
 ┃ ┃ ┣ 📂02  
 ┃ ┃ ┃ ┣ 📜a86a547698b41b28a1c2ebeb44cedb61b7cef0  
 ┃ ┃ ┃ ┣ 📜e111d81dd774038ac483c11b5f5a8f8aceb024  
 ┃ ┃ ┃ ┗ 📜f9ffaf8b6d720a1343bdc2a92deb0ad8e3dd8b  
 ┃ ┃ ┃                                        .
 ┃ ┃ ┃                                        .
 ┃ ┃ ┃                                        .
 ┃ ┃ ┣ 📂fd  
 ┃ ┃ ┃ ┣ 📜9d1f8ec7a0d1b14af7418333d15e03472058af  
 ┃ ┃ ┃ ┣ 📜9e285ecc534fdacbe13d38205a4ba24b6bd38f  
 ┃ ┃ ┃ ┗ 📜cd171815d08ef64f6e6f22341a38f4363da7d2  
 ┃ ┃ ┣ 📂fe  
 ┃ ┃ ┃ ┣ 📜5c862907f684d837ff58c86cde77c8e886a091  
 ┃ ┃ ┃ ┗ 📜af1c9d63106405a321f4ad9f092ef9b5ccbaa4  
 ┃ ┃ ┣ 📂ff  
 ┃ ┃ ┃ ┣ 📜678a3772bb28ac82191ca2ed57ff53f2161287  
 ┃ ┃ ┃ ┗ 📜aee8eb68af33525ca807a5ab9236cb87c55acf  
 ┃ ┃ ┣ 📂info  
 ┃ ┃ ┗ 📂pack  
 ┃ ┃ ┃ ┣ 📜pack-f1e4284114ab34807ebfe2928c4b1300404a5e52.idx  
 ┃ ┃ ┃ ┣ 📜pack-f1e4284114ab34807ebfe2928c4b1300404a5e52.pack  
 ┃ ┃ ┃ ┗ 📜pack-f1e4284114ab34807ebfe2928c4b1300404a5e52.rev  
 ┃ ┣ 📂refs  
 ┃ ┃ ┣ 📂heads  
 ┃ ┃ ┃ ┗ 📜main  
 ┃ ┃ ┣ 📂remotes  
 ┃ ┃ ┃ ┗ 📂origin  
 ┃ ┃ ┃ ┃ ┣ 📂feat  
 ┃ ┃ ┃ ┃ ┃ ┗ 📜form  
 ┃ ┃ ┃ ┃ ┣ 📂feature  
 ┃ ┃ ┃ ┃ ┃ ┗ 📜design-recommend-detail-layout  
 ┃ ┃ ┃ ┃ ┣ 📜HEAD  
 ┃ ┃ ┃ ┃ ┣ 📜main  
 ┃ ┃ ┃ ┃ ┗ 📜recipe-api  
 ┃ ┃ ┗ 📂tags  
 ┃ ┣ 📜FETCH_HEAD  
 ┃ ┣ 📜HEAD  
 ┃ ┣ 📜ORIG_HEAD  
 ┃ ┣ 📜config  
 ┃ ┣ 📜description  
 ┃ ┣ 📜index  
 ┃ ┗ 📜packed-refs  
 ┣ 📂app  
 ┃ ┣ 📂api  
 ┃ ┃ ┣ 📂auth  
 ┃ ┃ ┃ ┗ 📂[...nextauth]  
 ┃ ┃ ┃ ┃ ┗ 📜route.ts  
 ┃ ┃ ┣ 📂generate-recipe  
 ┃ ┃ ┃ ┗ 📜route.ts  
 ┃ ┃ ┣ 📂ingredient  
 ┃ ┃ ┃ ┣ 📂add  
 ┃ ┃ ┃ ┃ ┗ 📜route.ts  
 ┃ ┃ ┃ ┗ 📂get  
 ┃ ┃ ┃ ┃ ┗ 📜route.ts  
 ┃ ┃ ┣ 📂recipe  
 ┃ ┃ ┃ ┗ 📂review  
 ┃ ┃ ┃ ┃ ┗ 📜route.ts  
 ┃ ┃ ┗ 📂recommand-recipe  
 ┃ ┃ ┃ ┗ 📜route.ts  
 ┃ ┣ 📂auth  
 ┃ ┃ ┣ 📂error  
 ┃ ┃ ┃ ┗ 📜page.tsx  
 ┃ ┃ ┣ 📂login  
 ┃ ┃ ┃ ┗ 📜page.tsx  
 ┃ ┃ ┣ 📂signup  
 ┃ ┃ ┃ ┗ 📜page.tsx  
 ┃ ┃ ┗ 📜page.tsx  
 ┃ ┣ 📂fridge  
 ┃ ┃ ┗ 📜page.tsx  
 ┃ ┣ 📂mypage  
 ┃ ┃ ┗ 📜page.tsx  
 ┃ ┣ 📂recommend  
 ┃ ┃ ┣ 📂detail  
 ┃ ┃ ┃ ┗ 📜page.tsx  
 ┃ ┃ ┗ 📜page.tsx  
 ┃ ┣ 📂test  
 ┃ ┃ ┗ 📜page.tsx  
 ┃ ┣ 📜globals.css  
 ┃ ┣ 📜layout.tsx  
 ┃ ┗ 📜page.tsx  
 ┣ 📂components  
 ┃ ┣ 📂ui  
 ┃ ┃ ┣ 📜alert-dialog.tsx  
 ┃ ┃ ┣ 📜button.tsx  
 ┃ ┃ ┣ 📜card.tsx  
 ┃ ┃            .
 ┃ ┃            .
 ┃ ┃ ┣ 📜toaster.tsx  
 ┃ ┃ ┗ 📜use-toast.ts  
 ┃ ┣ 📜Camera.tsx  
 ┃ ┣ 📜CreateIngredient.tsx  
 ┃ ┣ 📜Food.tsx  
 ┃ ┣ 📜Header.tsx  
 ┃ ┣ 📜InputForm.tsx  
 ┃ ┣ 📜Navigation.tsx  
 ┃ ┗ 📜Star.tsx  
 ┣ 📂context  
 ┃ ┗ 📜authContext.tsx  
 ┣ 📂lib  
 ┃ ┣ 📜authOptions.ts  
 ┃ ┗ 📜utils.ts  
 ┣ 📂meta  
 ┃ ┗ 📂images  
 ┃ ┃ ┣ 📂food  
 ┃ ┃ ┃ ┣ 📜egg.png  
 ┃ ┃ ┃ ┗ 📜vegetable.png  
 ┃ ┃ ┣ 📜camera-change.svg  
 ┃ ┃ ┣ 📜capture.png  
 ┃ ┃ ┣ 📜gallery.svg  
 ┃ ┃ ┣ 📜info.svg  
 ┃ ┃ ┣ 📜left-arrow.svg  
 ┃ ┃ ┗ 📜plus.svg  
 ┣ 📂models  
 ┃ ┣ 📜recipe.ts  
 ┃ ┗ 📜user.ts  
 ┣ 📂prisma  
 ┃ ┣ 📜prisma.ts  
 ┃ ┗ 📜schema.prisma  
 ┣ 📂public  
 ┃ ┣ 📂fonts  
 ┃ ┃ ┗ 📜PretendardVariable.woff2  
 ┃ ┣ 📜next.svg  
 ┃ ┗ 📜vercel.svg  
 ┣ 📂utils  
 ┃ ┣ 📜auth.ts  
 ┃ ┗ 📜recipe.ts  
 ┣ 📜.eslintrc.json  
 ┣ 📜.gitignore  
 ┣ 📜.prettierrc  
 ┣ 📜LICENSE  
 ┣ 📜README.md  
 ┣ 📜a.txt  
 ┣ 📜components.json  
 ┣ 📜next.config.mjs  
 ┣ 📜package-lock.json  
 ┣ 📜package.json  
 ┣ 📜postcss.config.mjs  
 ┣ 📜sql.txt  
 ┣ 📜tailwind.config.ts  
 ┗ 📜tsconfig.json

## Features
---
홈 화면 
- 환경을 위한 추천레시피가 있습니다. 
- 지금까지의 환경을 얼마나 지켰는지에 대한 수치가 있습니다. 
![[assets/스크린샷 2024-08-14 오전 2.41.01.png]]

Login
- 구글로그인을 구현하였습니다. 
![[assets/스크린샷 2024-08-14 오전 2.42.43.png]]

카메라로 음식인식
- 카메라를 이용해 음식을 찍을 수 있습니다. 
- 카메라 전환버튼과 겔러리버튼이 있습니다. 
![[assets/스크린샷 2024-08-14 오전 3.03.45.png]]
음식 등록 후
![[assets/스크린샷 2024-08-14 오전 3.04.17.png]]

자동 추가
- 식재료를 인식하고 자동으로 식재료가 추가됩니다. 
- 이후 탄소중립 레시피를 선택하고 레시피 난이도와 시간 인원수를 설정하면 레시피를 생성할 수 있습니다. 

 ![[assets/스크린샷 2024-08-14 오전 4.05.07.png]] 

![[assets/스크린샷 2024-08-14 오전 3.04.53.png]]
레시피 생성

![[assets/스크린샷 2024-08-14 오전 3.08.24.png]]
레시피 리뷰
- 레시피의 리뷰를 남길 수 있고 남은 식재료를 선택하여 냉장고로 옮길 수 있다. 
![[assets/스크린샷 2024-08-14 오전 3.09.26.png]]

냉장고
- 냉장고에 저장되어 있는 식품들을 불러오고 추가할 수 있습니다.
![[assets/스크린샷 2024-08-14 오전 3.38.40.png]]

수치화
![[assets/스크린샷 2024-08-14 오전 3.40.49.png]]
내정보![[assets/스크린샷 2024-08-14 오전 3.41.39.png]]

식품정보
- 식품 정보와 보관방법 처리방법을 알려줍니다. 
![[assets/스크린샷 2024-08-14 오전 4.09.01.png]]
