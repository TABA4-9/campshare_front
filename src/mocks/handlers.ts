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


export const handlers = [
  http.get('/api/item', ()=>{
    // Camping item API TEST
    return HttpResponse.json([
      {
        id : 1,
        name : "A형 텐트",
        period : "1박 2일",
        category : "텐트",
        image : tent1,
        price : 5000,
        explanation : "그냥 집에 남아서 내놓습니다. 사용한지는 1번이고 그냥 마구잡이로 쓰셔도 됩니다.",
      },
      {
        id : 2,
        name : "신형 텐트",
        period : "1박 2일",
        category : "텐트",
        image : tent2,
        price : 10000,
        explanation : "신형입니다. 한 번도 사용하지 않았구요. 아껴서 써주세요.",
      },
      {
        id : 3,
        name : "구형 텐트",
        period : "1박 2일",
        category : "텐트",
        image : tent3,
        price : 12000,
        explanation : "구형입니다. 구형인데 부모님께 물려받은거라 아껴서 사용해주세요.",
      },
      {
        id : 4,
        name : "O형 텐트",
        period : "1박 2일",
        category : "텐트",
        image : tent4,
        price : 17000,
        explanation : "O형 텐트입니다. 혈액형이 O인 분들이 사용하면 좋더라구요.",
      },
      {
        id : 5,
        name : "무슨 텐트",
        period : "1박 2일",
        category : "텐트",
        image : tent5,
        price : 14000,
        explanation : "무슨 텐트인지 모르겠습니다. 집구석에 먼지쌓여서 돌아다니길래 내놓습니다.",
      },
      {
        id : 6,
        name : "텐트 텐트",
        period : "1박 2일",
        category : "텐트",
        image : tent6,
        price : 19000,
        explanation : "텐트 업그레이드 버전인 텐트 텐트입니다. 사용감 미쳤구요 1번 사용했습니다.",
      },
    ])
  }),
  // kakao login 발급 AccessToken.
  http.get('/login/oauth2/code/kakaoTest', () =>{
    return HttpResponse.json([
      {
        "kakaoAccessToken":"L1Mjs_s09jTR-gDBjmlCBBXbgV8JMsianSUKPXPsAAABi-9-KhTRDLJpR7eCqA"
      }
    ])}
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
      },
      {
        id : 2,
        name : "신형 텐트",
        period : "1박 2일",
        category : "텐트",
        image : tent2,
        price : 10000,
        explanation : "신형입니다. 한 번도 사용하지 않았구요. 아껴서 써주세요.",
      },
      {
        id : 3,
        name : "구형 텐트",
        category : "텐트",
        period : "1박 2일",
        image : tent3,
        price : 12000,
        explanation : "구형입니다. 구형인데 부모님께 물려받은거라 아껴서 사용해주세요.",
      },
      {
        id : 4,
        name : "O형 텐트",
        category : "텐트",
        period : "1박 2일",
        image : tent4,
        price : 17000,
        explanation : "O형 텐트입니다. 혈액형이 O인 분들이 사용하면 좋더라구요.",
      },
      {
        id : 5,
        name : "무슨 텐트",
        category : "텐트",
        period : "1박 2일",
        image : tent5,
        price : 14000,
        explanation : "무슨 텐트인지 모르겠습니다. 집구석에 먼지쌓여서 돌아다니길래 내놓습니다.",
      },
      {
        id : 6,
        name : "텐트 텐트",
        category : "텐트",
        period : "1박 2일",
        image : tent6,
        price : 19000,
        explanation : "텐트 업그레이드 버전인 텐트 텐트입니다. 사용감 미쳤구요 1번 사용했습니다.",
      },
      {
        id : 7,
        name : "트텐",
        category : "텐트",
        period : "1박 2일",
        image : tent2,
        price : 39000,
        explanation : "텐트 업그레이드 버전인 텐트 텐트입니다. 사용감 개구림.",
      },
      {
        id : 8,
        name : "군용 텐트 뽀림",
        category : "텐트",
        period : "1박 2일",
        image : tent3,
        price : 19000,
        explanation : "리얼 군용 텐트입니다. 뽀렸습니다.",
      },
      {
        id : 9,
        name : "옆집 의자",
        category : "캠핑 의자",
        period : "1박 2일",
        image : chair3,
        price : 59000,
        explanation : "옆집 텐트 훔쳤습니다. 그래서 사용감 좋습니다.",
      },
      {
        id : 10,
        name : "앞집 의자",
        category : "캠핑 의자",
        period : "1박 2일",
        image : chair1,
        price : 590000,
        explanation : "앞집 의자 훔쳤습니다. 존나 구립니다.",
      },
      {
        id : 11,
        name : "뒷집 의자",
        category : "텐트",
        period : "1박 2일",
        image : chair2,
        price : 9000,
        explanation : "뒷집 의자 훔쳤습니다. 그래서 사용감 좋습니다.",
      },
    ])
  }),

  // login 후 서버로 부터 받는 user 정보
  http.get('/login', () =>{
    return HttpResponse.json(
      {
        name: '함상억',
        email: 'hamsoo159@naver.com',
        accessToken: 'L1Mjs_s09jTR-gDBjmlCBBXbgV8JMsianSUKPXPsAAABi-9-KhTRDLJpR7eCqA',
        LendItem : [
          {
            id : 1,
            name : "A형 텐트",
            period : "1박 2일",
            category : "텐트",
            image : tent1,
            price : 5000,
            explanation : "그냥 집에 남아서 내놓습니다. 사용한지는 1번이고 그냥 마구잡이로 쓰셔도 됩니다.",
            isLended : true,
          },
          {
            id : 2,
            name : "신형 텐트",
            category : "텐트",
            period : "1박 2일",
            image : tent2,
            price : 10000,
            explanation : "신형입니다. 한 번도 사용하지 않았구요. 아껴서 써주세요.",
            isLended : true,
          },
          {
            id : 3,
            name : "구형 텐트",
            category : "텐트",
            period : "1박 2일",
            image : tent3,
            price : 12000,
            explanation : "구형입니다. 구형인데 부모님께 물려받은거라 아껴서 사용해주세요.",
            isLended : false,
          },
        ],
        RentItem : [
          {
            id : 7,
            name : "트텐",
            category : "텐트",
            period : "1박 2일",
            image : tent2,
            price : 39000,
            explanation : "텐트 업그레이드 버전인 텐트 텐트입니다. 사용감 개구림.",
          },
          {
            id : 8,
            name : "군용 텐트 뽀림",
            category : "텐트",
            period : "1박 2일",
            image : tent3,
            price : 19000,
            explanation : "리얼 군용 텐트입니다. 뽀렸습니다.",
          },
          {
            id : 9,
            name : "옆집 텐트",
            category : "텐트",
            period : "1박 2일",
            image : tent4,
            price : 59000,
            explanation : "옆집 텐트 훔쳤습니다. 그래서 사용감 좋습니다.",
          },
        ],
      }
    )}
  ),
]