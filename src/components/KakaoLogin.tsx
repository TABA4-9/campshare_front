import kakaoPicture from "../assets/kakao.png"

export default function KakaoLogin() {
    const CLIENT_ID = "b15b67e6f175f8c87a66eeec8c6d85e7";
    // 서버 연결 시, 3000 이 아니라 8080으로
    // const REDIRECT_URI = "http://localhost:8080/kakaoauth";
    const REDIRECT_URI = "http://localhost:3000/kakaoauth";
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

    return(
        <div>
            <img className="w-[255px] h-[35px]" src={kakaoPicture}
                 alt="카카오 로그인"
                 onClick={() => window.location.href = kakaoURL}
            />
        </div>

    )
}