import { http, HttpResponse } from 'msw'
import tent1 from "../assets/mockPicture/tent1.jpg"
import tent2 from "../assets/mockPicture/tent2.jpg"
import tent3 from "../assets/mockPicture/tent3.jpg"
import tent4 from "../assets/mockPicture/tent4.jpg"
import tent5 from "../assets/mockPicture/tent5.jpg"
import tent6 from "../assets/mockPicture/tent6.jpg"

import chair1 from "../assets/mockPicture/chair1.jpg"
import chair2 from "../assets/mockPicture/chair2.jpg"
import chair3 from "../assets/mockPicture/chair3.jpg"


/*
  함상억의 mypage
  빌려주려는 물건
  1,2(안 빌려짐)
  3(빌려짐)

  빌리려는 물건 4

  홍길동의 mypage
  빌려주려는 물건
  4(빌려짐)
  5,6(안 빌려짐)

  빌리려는 물건 3
*/

/*
 recommand 통일 product id, 1,4,6
 recommandProduct : [
          {
            id : 1,
            name : "A형 텐트",
            category : "텐트",
            period : "1박 2일",
            image : tent1,
            price : 5000,
            explanation : "그냥 집에 남아서 내놓습니다. 사용한지는 1번이고 그냥 마구잡이로 쓰셔도 됩니다.",
            brand : "Nike",
            headcount : "2인",
            // 그냥 유저 정보를 받아야 함.
            postUserName : "함상억",
            postUserEmail : "hamsoo159@naver.com",
            address : "경기도 용인시 수지구 풍덕천동 허경영궁",
            isRented : false,
            postUserId : 5,
            usingYear : "1년 이하",
            startDate : "2023년 12월 8일",
            endDate : "2023년 12월 16일",
            imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
            ],
          },
          {
            id : 4,
            name : "O형 텐트",
            category : "텐트",
            period : "1박 2일",
            image : tent4,
            price : 17000,
            explanation : "O형 텐트입니다. 혈액형이 O인 분들이 사용하면 좋더라구요.",
            brand : "Nike",
            headcount : "2인",
            postUserName : "홍길동",
            postUserEmail : "Hong@naver.com",
            address : "경기도 용인시 수지구 풍덕천동 박스집",
            isRented : true,
            postUserId : 8,
            usingYear : "1년 이하",
            startDate : "2023년 12월 8일",
            endDate : "2023년 12월 16일",
            imagePath : [
                "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
                "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
                ],
          },
          {
            id : 6,
            name : "개쓰레기 의자",
            category : "캠핑 의자",
            period : "1박 2일",
            image : chair1,
            price : 19000,
            explanation : "텐트 업그레이드 버전인 텐트 텐트입니다. 사용감 미쳤구요 1번 사용했습니다.",
            brand : "Nike",
            headcount : "2인",
            postUserName : "홍길동",
            postUserEmail : "Hong@naver.com",
            address : "경기도 용인시 수지구 풍덕천동 박스집",
            isRented : false,
            postUserId : 8,
            usingYear : "1년 이하",
            startDate : "2023년 12월 8일",
            endDate : "2023년 12월 16일",
            imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
            ],
          }
        ]


*/ 


export const handlers = [
  http.get('/api/item', ()=>{
    // Camping item API TEST(for main page)
    return HttpResponse.json([
      {
        id : 1,
        name : "A형 텐트",
        category : "텐트",
        period : "1박 2일",
        image : tent1,
        price : 5000,
        explanation : "그냥 집에 남아서 내놓습니다. 사용한지는 1번이고 그냥 마구잡이로 쓰셔도 됩니다.",
        brand : "Nike",
        headcount : "2인",
        // 그냥 유저 정보를 받아야 함.
        postUserName : "함상억",
        postUserEmail : "hamsoo159@naver.com",
        address : "경기도 용인시 수지구 풍덕천동 허경영궁",
        isRented : false,
        postUserId : 5,
        usingYear : "1년 이하",
        startDate : "2023년 12월 8일",
        endDate : "2023년 12월 16일",
        imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
            ],
        
      },
      {
        id : 2,
        name : "신형 텐트",
        period : "1박 2일",
        category : "텐트",
        image : tent2,
        price : 10000,
        explanation : "신형입니다. 한 번도 사용하지 않았구요. 아껴서 써주세요.",
        brand : "Nike",
        headcount : "2인",
        postUserName : "함상억",
        postUserEmail : "hamsoo159@naver.com",
        address : "경기도 용인시 수지구 풍덕천동 허경영궁",
        isRented : false,
        postUserId : 5,
        usingYear : "1년 이하",
        startDate : "2023년 12월 8일",
        endDate : "2023년 12월 16일",
        imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
            ],
        
      },
      {
        id : 3,
        name : "구형 텐트",
        category : "텐트",
        period : "1박 2일",
        image : tent3,
        price : 12000,
        explanation : "구형입니다. 구형인데 부모님께 물려받은거라 아껴서 사용해주세요.",
        brand : "Nike",
        headcount : "2인",
        postUserName : "함상억",
        postUserEmail : "hamsoo159@naver.com",
        address : "경기도 용인시 수지구 풍덕천동 허경영궁",
        isRented : true,
        postUserId : 5,
        usingYear : "1년 이하",
        startDate : "2023년 12월 8일",
        endDate : "2023년 12월 16일",
        imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
            ],
      },
    ])
  }),

  // kakao login 발급 AccessToken.
  http.get('/login/oauth2/code/kakao', () =>{
    return HttpResponse.json(
      {
        account : {
          name: '함상억',
          id : 5,
          email: 'hamsoo159@naver.com',
        },
        kakaoAccessToken: 'L1Mjs_s09jTR-gDBjmlCBBXbgV8JMsianSUKPXPsAAABi-9-KhTRDLJpR7eCqA',
        lendItem : [
          {
            id : 1,
            name : "A형 텐트",
            period : "1박 2일",
            category : "텐트",
            image : tent1,
            price : 5000,
            explanation : "그냥 집에 남아서 내놓습니다. 사용한지는 1번이고 그냥 마구잡이로 쓰셔도 됩니다.",
            brand : "Nike",
            headcount : "2인",
            postUserName : "함상억",
            postUserEmail : 'hamsoo159@naver.com',
            address : "경기도 용인시 수지구 풍덕천동 허경영궁",
            isRented : false,
            postUserId : 5,
            usingYear : "1년 이하",
            startDate : "2023년 12월 8일",
            endDate : "2023년 12월 16일",
            imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
            ],
            recommandProduct : [
              {
                id : 1,
                name : "A형 텐트",
                category : "텐트",
                period : "1박 2일",
                image : tent1,
                price : 5000,
                explanation : "그냥 집에 남아서 내놓습니다. 사용한지는 1번이고 그냥 마구잡이로 쓰셔도 됩니다.",
                brand : "Nike",
                headcount : "2인",
                // 그냥 유저 정보를 받아야 함.
                postUserName : "함상억",
                postUserEmail : "hamsoo159@naver.com",
                address : "경기도 용인시 수지구 풍덕천동 허경영궁",
                isRented : false,
                postUserId : 5,
                usingYear : "1년 이하",
                startDate : "2023년 12월 8일",
                endDate : "2023년 12월 16일",
                imagePath : [
                "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
   
   "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",           ],
              },
              {
                id : 4,
                name : "O형 텐트",
                category : "텐트",
                period : "1박 2일",
                image : tent4,
                price : 17000,
                explanation : "O형 텐트입니다. 혈액형이 O인 분들이 사용하면 좋더라구요.",
                brand : "Nike",
                headcount : "2인",
                postUserName : "홍길동",
                postUserEmail : "Hong@naver.com",
                address : "경기도 용인시 수지구 풍덕천동 박스집",
                isRented : true,
                postUserId : 8,
                usingYear : "1년 이하",
                startDate : "2023년 12월 8일",
                endDate : "2023년 12월 16일",
                imagePath : [
                    "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
                    ],
              },
              {
                id : 6,
                name : "개쓰레기 의자",
                category : "캠핑 의자",
                period : "1박 2일",
                image : chair1,
                price : 19000,
                explanation : "텐트 업그레이드 버전인 텐트 텐트입니다. 사용감 미쳤구요 1번 사용했습니다.",
                brand : "Nike",
                headcount : "2인",
                postUserName : "홍길동",
                postUserEmail : "Hong@naver.com",
                address : "경기도 용인시 수지구 풍덕천동 박스집",
                isRented : false,
                postUserId : 8,
                usingYear : "1년 이하",
                startDate : "2023년 12월 8일",
                endDate : "2023년 12월 16일",
                imagePath : [
                "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
   
   "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",           ],
              }
            ],
          },
          {
            id : 2,
            name : "신형 텐트",
            category : "텐트",
            period : "1박 2일",
            image : tent2,
            price : 10000,
            explanation : "신형입니다. 한 번도 사용하지 않았구요. 아껴서 써주세요.",
            brand : "Nike",
            isRented : false,
            headcount : "2인",
            postUserName : "함상억",
            postUserEmail : 'hamsoo159@naver.com',
            address : "경기도 용인시 수지구 풍덕천동 허경영궁",
            postUserId : 5,
            usingYear : "1년 이하",
            startDate : "2023년 12월 8일",
            endDate : "2023년 12월 16일",
            imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
            ],
          },
          {
            id : 3,
            name : "구형 텐트",
            category : "텐트",
            period : "1박 2일",
            image : tent3,
            price : 12000,
            explanation : "구형입니다. 구형인데 부모님께 물려받은거라 아껴서 사용해주세요.",
            brand : "Nike",
            isRented : true,
            headcount : "2인",
            postUserName : "함상억",
            postUserEmail : 'hamsoo159@naver.com',
            address : "경기도 용인시 수지구 풍덕천동 허경영궁",
            postUserId : 5,
            usingYear : "1년 이하",
            startDate : "2023년 12월 8일",
            endDate : "2023년 12월 16일",
            imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
            ],
          },
        ],
        rentItem : [
          {
            id : 4,
            name : "O형 텐트",
            category : "텐트",
            period : "1박 2일",
            image : tent4,
            price : 17000,
            explanation : "O형 텐트입니다. 혈액형이 O인 분들이 사용하면 좋더라구요.",
            brand : "Nike",
            headcount : "2인",
            postUserName : "홍길동",
            postUserEmail : "Hong@naver.com",
            address : "경기도 용인시 수지구 풍덕천동 박스집",
            isRented : true,
            postUserId : 8,
            usingYear : "1년 이하",
            startDate : "2023년 12월 8일",
            endDate : "2023년 12월 16일",
            imagePath : [
                "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
                "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
                ],
                
          },
        ],
      }
    )}
  ),

  http.get('/product/data/category', () => {
    return HttpResponse.json([
      {
        id : 1,
        name : "A형 텐트",
        category : "텐트",
        period : "1박 2일",
        image : tent1,
        price : 5000,
        explanation : "그냥 집에 남아서 내놓습니다. 사용한지는 1번이고 그냥 마구잡이로 쓰셔도 됩니다.",
        brand : "Nike",
        headcount : "2인",
        // 그냥 유저 정보를 받아야 함.
        postUserName : "함상억",
        postUserEmail : "hamsoo159@naver.com",
        address : "경기도 용인시 수지구 풍덕천동 허경영궁",
        isRented : false,
        postUserId : 5,
        usingYear : "1년 이하",
        startDate : "2023년 12월 8일",
        endDate : "2023년 12월 16일",
        imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
        ],
        
      },
      {
        id : 2,
        name : "신형 텐트",
        period : "1박 2일",
        category : "텐트",
        image : tent2,
        price : 10000,
        explanation : "신형입니다. 한 번도 사용하지 않았구요. 아껴서 써주세요.",
        brand : "Nike",
        headcount : "2인",
        postUserName : "함상억",
        postUserEmail : "hamsoo159@naver.com",
        address : "경기도 용인시 수지구 풍덕천동 허경영궁",
        isRented : false,
        postUserId : 5,
        usingYear : "1년 이하",
        startDate : "2023년 12월 8일",
        endDate : "2023년 12월 16일",
        imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
            ],
        
      },
      {
        id : 3,
        name : "구형 텐트",
        category : "텐트",
        period : "1박 2일",
        image : tent3,
        price : 12000,
        explanation : "구형입니다. 구형인데 부모님께 물려받은거라 아껴서 사용해주세요.",
        brand : "Nike",
        headcount : "2인",
        postUserName : "함상억",
        postUserEmail : "hamsoo159@naver.com",
        address : "경기도 용인시 수지구 풍덕천동 허경영궁",
        isRented : true,
        postUserId : 5,
        usingYear : "1년 이하",
        startDate : "2023년 12월 8일",
        endDate : "2023년 12월 16일",
        imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
            ],
      },
      {
        id : 4,
        name : "O형 텐트",
        category : "텐트",
        period : "1박 2일",
        image : tent4,
        price : 17000,
        explanation : "O형 텐트입니다. 혈액형이 O인 분들이 사용하면 좋더라구요.",
        brand : "Nike",
        headcount : "2인",
        postUserName : "홍길동",
        postUserEmail : "Hong@naver.com",
        address : "경기도 용인시 수지구 풍덕천동 박스집",
        isRented : true,
        postUserId : 8,
        usingYear : "1년 이하",
        startDate : "2023년 12월 8일",
        endDate : "2023년 12월 16일",
        imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
            ],
      },
      {
        id : 5,
        name : "무슨 텐트",
        category : "텐트",
        period : "1박 2일",
        image : tent5,
        price : 14000,
        explanation : "무슨 텐트인지 모르겠습니다. 집구석에 먼지쌓여서 돌아다니길래 내놓습니다.",
        brand : "Nike",
        headcount : "2인",
        postUserName : "홍길동",
        postUserEmail : "Hong@naver.com",
        address : "경기도 용인시 수지구 풍덕천동 박스집",
        isRented : false,
        postUserId : 8,
        usingYear : "1년 이하",
        startDate : "2023년 12월 8일",
        endDate : "2023년 12월 16일",
        imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
            ],
        
      },
      {
        id : 6,
        name : "개쓰레기 의자",
        category : "캠핑 의자",
        period : "1박 2일",
        image : chair1,
        price : 19000,
        explanation : "텐트 업그레이드 버전인 텐트 텐트입니다. 사용감 미쳤구요 1번 사용했습니다.",
        brand : "Nike",
        headcount : "2인",
        postUserName : "홍길동",
        postUserEmail : "Hong@naver.com",
        address : "경기도 용인시 수지구 풍덕천동 박스집",
        isRented : false,
        postUserId : 8,
        usingYear : "1년 이하",
        startDate : "2023년 12월 8일",
        endDate : "2023년 12월 16일",
        imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
            ],
        
      },
      // {
      //   id : 7,
      //   name : "트텐",
      //   category : "텐트",
      //   period : "1박 2일",
      //   image : tent2,
      //   price : 39000,
      //   explanation : "텐트 업그레이드 버전인 텐트 텐트입니다. 사용감 개구림.",
      //   brand : "Nike",
      //   headcount : "2인",
      //   postUserName : "홍길동",
      //   postUserEmail : "Hong@naver.com",
      //   address : "경기도 용인시 수지구 풍덕천동",
      //   isRented : false,
      //   postUserId : 8,
      //   usingYear : "1년 이하",
      //   startDate : "2023년 12월 8일",
      //   endDate : "2023년 12월 16일",
      //   imagePath : [
      //       "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
      //       ],
        
      // },
      // {
      //   id : 8,
      //   name : "군용 텐트 뽀림",
      //   category : "텐트",
      //   period : "1박 2일",
      //   image : tent3,
      //   price : 19000,
      //   explanation : "리얼 군용 텐트입니다. 뽀렸습니다.",
      //   brand : "Nike",
      //   headcount : "2인",
      //   postUserName : "홍길동",
      //   postUserEmail : "Hong@naver.com",
      //   address : "경기도 용인시 수지구 풍덕천동",
      //   isRented : false,
      //   postUserId : 8,
      //   usingYear : "1년 이하",
      //   startDate : "2023년 12월 8일",
      //   endDate : "2023년 12월 16일",
      //   imagePath : [
      //       "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
      //       ],
        
      // },
      // {
      //   id : 9,
      //   name : "옆집 의자",
      //   category : "캠핑 의자",
      //   period : "1박 2일",
      //   image : chair3,
      //   price : 59000,
      //   explanation : "옆집 텐트 훔쳤습니다. 그래서 사용감 좋습니다.",
      //   brand : "Nike",
      //   headcount : "2인",
      //   postUserName : "홍길동",
      //   postUserEmail : "Hong@naver.com",
      //   address : "경기도 용인시 수지구 풍덕천동",
      //   isRented : false,
      //   postUserId : 8,
      //   usingYear : "1년 이하",
      //   startDate : "2023년 12월 8일",
      //   endDate : "2023년 12월 16일",
      //   imagePath : [
      //       "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
      //       ],
        
      // },
      // {
      //   id : 10,
      //   name : "앞집 의자",
      //   category : "캠핑 의자",
      //   period : "1박 2일",
      //   image : chair1,
      //   price : 590000,
      //   explanation : "앞집 의자 훔쳤습니다. 존나 구립니다.",
      //   brand : "Nike",
      //   headcount : "2인",
      //   postUserName : "홍길동",
      //   postUserEmail : "Hong@naver.com",
      //   address : "경기도 용인시 수지구 풍덕천동",
      //   isRented : false,
      //   postUserId : 8,
      //   usingYear : "1년 이하",
      //   startDate : "2023년 12월 8일",
      //   endDate : "2023년 12월 16일",
      //   imagePath : [
      //       "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
      //       ],
        
      // },
      // {
      //   id : 11,
      //   name : "뒷집 의자",
      //   category : "캠핑 의자",
      //   period : "1박 2일",
      //   image : chair2,
      //   price : 9000,
      //   explanation : "뒷집 의자 훔쳤습니다. 그래서 사용감 좋습니다.",
      //   brand : "Nike",
      //   headcount : "2인",
      //   postUserName : "홍길동",
      //   postUserEmail : "Hong@naver.com",
      //   address : "경기도 용인시 수지구 풍덕천동",
      //   isRented : false,
      //   postUserId : 8,
      //   usingYear : "1년 이하",
      //   startDate : "2023년 12월 8일",
      //   endDate : "2023년 12월 16일",
      //   imagePath : [
      //       "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
      //       ],
        
      // },
    ])
  }),

  // login 후 서버로 부터 받는 user 정보
  http.get('/login', () =>{
    return HttpResponse.json(
      {
        account : {
          name: '함상억',
          id : 5,
          email: 'hamsoo159@naver.com',
        },
        kakaoAccessToken: 'L1Mjs_s09jTR-gDBjmlCBBXbgV8JMsianSUKPXPsAAABi-9-KhTRDLJpR7eCqA',
        lendItem : [
          {
            id : 1,
            name : "A형 텐트",
            period : "1박 2일",
            category : "텐트",
            image : tent1,
            price : 5000,
            explanation : "그냥 집에 남아서 내놓습니다. 사용한지는 1번이고 그냥 마구잡이로 쓰셔도 됩니다.",
            brand : "Nike",
            headcount : "2인",
            postUserName : "함상억",
            postUserEmail : "hamsoo159@naver.com",
            address : "경기도 용인시 수지구 풍덕천동 허경영궁",
            isRented : false,
            postUserId : 5,
            usingYear : "1년 이하",
            startDate : "2023년 12월 8일",
            endDate : "2023년 12월 16일",
            imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
            ],
          },
          {
            id : 2,
            name : "신형 텐트",
            category : "텐트",
            period : "1박 2일",
            image : tent2,
            price : 10000,
            explanation : "신형입니다. 한 번도 사용하지 않았구요. 아껴서 써주세요.",
            brand : "Nike",
            isRented : false,
            headcount : "2인",
            postUserName : "함상억",
            postUserEmail : "hamsoo159@naver.com",
            address : "경기도 용인시 수지구 풍덕천동 허경영궁",
            postUserId : 5,
            usingYear : "1년 이하",
            startDate : "2023년 12월 8일",
            endDate : "2023년 12월 16일",
            imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
            ],
          },
          {
            id : 3,
            name : "구형 텐트",
            category : "텐트",
            period : "1박 2일",
            image : tent3,
            price : 12000,
            explanation : "구형입니다. 구형인데 부모님께 물려받은거라 아껴서 사용해주세요.",
            brand : "Nike",
            isRented : true,
            headcount : "2인",
            postUserName : "함상억",
            postUserEmail : "hamsoo159@naver.com",
            address : "경기도 용인시 수지구 풍덕천동 허경영궁",
            postUserId : 5,
            usingYear : "1년 이하",
            startDate : "2023년 12월 8일",
            endDate : "2023년 12월 16일",
            imagePath : [
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
            "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
            ],
          },
        ],
        rentItem : [
          {
            id : 4,
            name : "O형 텐트",
            category : "텐트",
            period : "1박 2일",
            image : tent4,
            price : 17000,
            explanation : "O형 텐트입니다. 혈액형이 O인 분들이 사용하면 좋더라구요.",
            brand : "Nike",
            headcount : "2인",
            postUserName : "홍길동",
            postUserEmail : "Hong@naver.com",
            address : "경기도 용인시 수지구 풍덕천동 박스집",
            isRented : true,
            postUserId : 8,
            usingYear : "1년 이하",
            startDate : "2023년 12월 8일",
            endDate : "2023년 12월 16일",
            imagePath : [
                "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
                "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/10/c26575a5-6e8b-4525-8b2b-51b44f328cc5~spring.jpg",
                ],
          },
        ],
      }
    )}
  ),

  http.get('/product/data/search', ({ request }) => {
    const url = new URL(request.url)
    const userInput = url.searchParams.get('searchInput')
    if (!userInput) {
      return new HttpResponse(null, { status: 404 })
    }

    if(userInput === "텐트") {
      return HttpResponse.json([
        {
              id : 1,
              name : "A형 텐트",
              category : "텐트",
              period : "1박 2일",
              image : tent1,
              price : 5000,
              explanation : "그냥 집에 남아서 내놓습니다. 사용한지는 1번이고 그냥 마구잡이로 쓰셔도 됩니다.",
              brand : "Nike",
              headcount : "2인",
              // 그냥 유저 정보를 받아야 함.
              postUserName : "함상억",
              postUserEmail : "hamsoo159@naver.com",
              address : "경기도 용인시 수지구 풍덕천동 허경영궁",
              isRented : false,
              postUserId : 5,
              usingYear : "1년 이하",
              startDate : "2023년 12월 8일",
              endDate : "2023년 12월 16일",
              imagePath : [
                  "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
              ],
            },
            {
              id : 2,
              name : "신형 텐트",
              period : "1박 2일",
              category : "텐트",
              image : tent2,
              price : 10000,
              explanation : "신형입니다. 한 번도 사용하지 않았구요. 아껴서 써주세요.",
              brand : "Nike",
              headcount : "2인",
              postUserName : "함상억",
              postUserEmail : "hamsoo159@naver.com",
              address : "경기도 용인시 수지구 풍덕천동 허경영궁",
              isRented : false,
              postUserId : 5,
              usingYear : "1년 이하",
              startDate : "2023년 12월 8일",
              endDate : "2023년 12월 16일",
              imagePath : [
                  "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
                  ],
              
            },
            {
              id : 3,
              name : "구형 텐트",
              category : "텐트",
              period : "1박 2일",
              image : tent3,
              price : 12000,
              explanation : "구형입니다. 구형인데 부모님께 물려받은거라 아껴서 사용해주세요.",
              brand : "Nike",
              headcount : "2인",
              postUserName : "함상억",
              postUserEmail : "hamsoo159@naver.com",
              address : "경기도 용인시 수지구 풍덕천동 허경영궁",
              isRented : true,
              postUserId : 5,
              usingYear : "1년 이하",
              startDate : "2023년 12월 8일",
              endDate : "2023년 12월 16일",
              imagePath : [
                  "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
                  ],
            },
            {
              id : 4,
              name : "O형 텐트",
              category : "텐트",
              period : "1박 2일",
              image : tent4,
              price : 17000,
              explanation : "O형 텐트입니다. 혈액형이 O인 분들이 사용하면 좋더라구요.",
              brand : "Nike",
              headcount : "2인",
              postUserName : "홍길동",
              postUserEmail : "Hong@naver.com",
              address : "경기도 용인시 수지구 풍덕천동 박스집",
              isRented : true,
              postUserId : 8,
              usingYear : "1년 이하",
              startDate : "2023년 12월 8일",
              endDate : "2023년 12월 16일",
              imagePath : [
                  "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
                  ],
            },
            {
              id : 5,
              name : "무슨 텐트",
              category : "텐트",
              period : "1박 2일",
              image : tent5,
              price : 14000,
              explanation : "무슨 텐트인지 모르겠습니다. 집구석에 먼지쌓여서 돌아다니길래 내놓습니다.",
              brand : "Nike",
              headcount : "2인",
              postUserName : "홍길동",
              postUserEmail : "Hong@naver.com",
              address : "경기도 용인시 수지구 풍덕천동 박스집",
              isRented : false,
              postUserId : 8,
              usingYear : "1년 이하",
              startDate : "2023년 12월 8일",
              endDate : "2023년 12월 16일",
              imagePath : [
                  "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
                  ],
              },
      ])
    }
    else {
      return HttpResponse.json("없음");
    }
  }),

  http.post('/product/matching', async ({ request }) => {

    return HttpResponse.json({
      content : "success",
      rentItem : [
        {
          id : 1,
          name : "A형 텐트",
          period : "1박 2일",
          category : "텐트",
          image : tent1,
          price : 5000,
          explanation : "그냥 집에 남아서 내놓습니다. 사용한지는 1번이고 그냥 마구잡이로 쓰셔도 됩니다.",
          brand : "Nike",
          headcount : "2인",
          postUserName : "함상억",
          postUserEmail : "hamsoo159@naver.com",
          address : "경기도 용인시 수지구 풍덕천동 허경영궁",
          isRented : false,
          postUserId : 5,
          usingYear : "1년 이하",
          startDate : "2023년 12월 8일",
          endDate : "2023년 12월 16일",
          imagePath : [
          "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
          ],
        },
        {
          id : 2,
          name : "신형 텐트",
          category : "텐트",
          period : "1박 2일",
          image : tent2,
          price : 10000,
          explanation : "신형입니다. 한 번도 사용하지 않았구요. 아껴서 써주세요.",
          brand : "Nike",
          isRented : false,
          headcount : "2인",
          postUserName : "함상억",
          postUserEmail : "hamsoo159@naver.com",
          address : "경기도 용인시 수지구 풍덕천동 허경영궁",
          postUserId : 5,
          usingYear : "1년 이하",
          startDate : "2023년 12월 8일",
          endDate : "2023년 12월 16일",
          imagePath : [
          "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
          ],
        },
      ],
    })
  }),
  http.post('/product/delete', async ({ request }) => {
    const requestBody : any  = await request.json();

    return HttpResponse.json({
      content : "success"
    })
  }),
  http.post('/detail/log', async ({ request }) => {
    const requestBody : any  = await request.json();

    return HttpResponse.json({
      content : requestBody?.content,
      createdAt : new Date().toLocaleString(),
      recommandProduct : [
        {
          id : 1,
          name : "A형 텐트",
          category : "텐트",
          period : "1박 2일",
          image : tent1,
          price : 5000,
          explanation : "그냥 집에 남아서 내놓습니다. 사용한지는 1번이고 그냥 마구잡이로 쓰셔도 됩니다.",
          brand : "Nike",
          headcount : "2인",
          // 그냥 유저 정보를 받아야 함.
          postUserName : "함상억",
          postUserEmail : "hamsoo159@naver.com",
          address : "경기도 용인시 수지구 풍덕천동 허경영궁",
          isRented : false,
          postUserId : 5,
          usingYear : "1년 이하",
          startDate : "2023년 12월 8일",
          endDate : "2023년 12월 16일",
          imagePath : [
          "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
          ],
        },
        {
          id : 4,
          name : "O형 텐트",
          category : "텐트",
          period : "1박 2일",
          image : tent4,
          price : 17000,
          explanation : "O형 텐트입니다. 혈액형이 O인 분들이 사용하면 좋더라구요.",
          brand : "Nike",
          headcount : "2인",
          postUserName : "홍길동",
          postUserEmail : "Hong@naver.com",
          address : "경기도 용인시 수지구 풍덕천동 박스집",
          isRented : true,
          postUserId : 8,
          usingYear : "1년 이하",
          startDate : "2023년 12월 8일",
          endDate : "2023년 12월 16일",
          imagePath : [
              "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
              ],
        },
        {
          id : 6,
          name : "개쓰레기 의자",
          category : "캠핑 의자",
          period : "1박 2일",
          image : chair1,
          price : 19000,
          explanation : "텐트 업그레이드 버전인 텐트 텐트입니다. 사용감 미쳤구요 1번 사용했습니다.",
          brand : "Nike",
          headcount : "2인",
          postUserName : "홍길동",
          postUserEmail : "Hong@naver.com",
          address : "경기도 용인시 수지구 풍덕천동 박스집",
          isRented : false,
          postUserId : 8,
          usingYear : "1년 이하",
          startDate : "2023년 12월 8일",
          endDate : "2023년 12월 16일",
          imagePath : [
          "https://campshareimg.s3.ap-northeast-2.amazonaws.com/2023/12/08/436de0f3-320e-4157-886a-8951b9c4065e~compressed_camp_icon.jpg",
          ],
        }
      ]
    })
  }),
  http.post('/post/nextPage', async ({ request }) => {
    const requestBody : any  = await request.json();

    // 가격 추천에 대한 값을 의미로 5000이라고 지정함.
    return HttpResponse.json("5000",
      // createdAt : new Date().toLocaleString(),
)
  }),

  http.post('/post/submit', async ({ request }) => {
      const requestBody  = await request.formData();
      const file = requestBody.get('image');
      const userData = requestBody.get('name');
   
      if (!((userData) || (file))) {
        return new HttpResponse('Missing document', { status: 400 })
      }
   
       if (!(userData !== 'string')) {
         return new HttpResponse('userData is not a String', {
           status: 400,
         })
       }

       if (!(file instanceof File)) {
        return new HttpResponse('userFile is not a file', {
          status: 400,
        })
      }
   
      return HttpResponse.json({
        contentsImage: await file.text(),
        contentsText : userData,
      })
    }),
    http.post('/product/update', async ({ request }) => {
      const requestBody  = await request.formData();
      const file = requestBody.get('image');
      const fileUrl = requestBody.get('imageUrl');
      const userData = requestBody.get('name');
   
      if (!((userData) || (file))) {
        return new HttpResponse('Missing document', { status: 400 })
      }
   
       if (!((userData && fileUrl) !== 'string')) {
         return new HttpResponse('userData or fileUrl is not a String', {
           status: 400,
         })
       }

       if (!(file instanceof File)) {
        return new HttpResponse('userFile is not a file', {
          status: 400,
        })
      }
   
      return HttpResponse.json({
        contentsImage: await file.text(),
        contentsImageUrl : fileUrl,
        contentsText : userData,
      })
    }),
]