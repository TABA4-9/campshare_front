import kakaoPicture from "../assets/kakao.png"

interface propsType {
    Agree : boolean,
}

export default function KakaoLogin({Agree} : propsType) {
    const CLIENT_ID = process.env.REACT_APP_KAKAO_REST_API_KEY;
    // 서버 연결 시, env에서 3000이 아니라 8080으로
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

    const handleLogin = () => {
        if(!Agree) {
            alert("필수 약관을 동의해주세요.");
            return ;
        }
        else window.location.href = kakaoURL;
    }

    return(
        <div>
            <img className="h-[45px] cursor-pointer" src={kakaoPicture}
                 alt="카카오 로그인"
                 onClick={() => handleLogin()}
            />
        </div>
    )
}