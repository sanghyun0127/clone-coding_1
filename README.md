## twitter-clone-coding

https://www.youtube.com/watch?v=5Wak0iyGCrc&list=WL&index=2&t=3890s

웹 연습 클론코딩 입니다.

### html / css

- icon 클릭 이벤트 ( ex. input )

1. input 에 ref 를 주고 hidden 으로 처리
2. 부모 div onClick 에 ref.current.click 으로 처리해서 아이콘 클릭 시 input 이 실행되게 하기

### Next js

- NextAuth

### Firebase v9

### Firebase Extension

- firebase image resizer

1. 콘솔에서 설치하는 법, cli 로 설치하는 법이 있는데 콘솔에서 설치하는 것이 편함
2. 원본 삭제 + 200\*200 + jpeg변환 => 140kb -> 7kb
3. uploadString 으로 업데이트 하고 downloadURL 로 url 가져오면 resizedImage 가 아니라 원본 Image url 을 가져옴
4. resize 하고 저장할 때 url 이 달라지는 문제
5. 임시방편: url 에서 token 지우고 image 이름을 바꿔서 url을 firestore 에 저장

### tailwind css

- space-x, space-y : children 간의 간격
- divide-x, divide-y : 구분선 만드는 css. x는 left, y는 top 에 선을 긋는 것이 기준
