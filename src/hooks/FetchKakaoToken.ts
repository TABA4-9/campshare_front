import axios from "axios";
import { useNavigate } from "react-router"

export const FetchKakaoToken = (KAKAO_CODE : string | null, accessTokenFetching : boolean, setAccessTokenFetching : React.Dispatch<React.SetStateAction<boolean>> ) => {
    // const navigate = useNavigate();

    const getKakaoAccessToken = async () => {
        if (accessTokenFetching) return; // Return early if fetching
        console.log("getAccessToken 호출");

        try {
            setAccessTokenFetching(true); // Set fetching to true
            const response = await axios.get(
                "http://43.200.250.149:8080/login/oauth2/code/kakao",
                {
                    params:{"code":KAKAO_CODE},
                    headers:{"Content-Type": "application/json"}
                }
            );
            const accessToken = response.data.accessToken;
            console.log("accessToken:", accessToken);
 
            setAccessTokenFetching(false); // Reset fetching to false
            return {message : "success"}
            
        } catch (error) {
            console.error("Error:", error);
            setAccessTokenFetching(false); // Reset fetching even in case of error
            return {message : "fail"}
            
        }
    }
    return {getKakaoAccessToken}
}