import {useState, useEffect, useRef} from 'react';

import { useNavigate } from "react-router"

import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../data/userInfoAtom';

export default function Kakaoauth() {
    const navigate = useNavigate();
    const effectRan = useRef(false);
    const PARAMS = new URL(window.location.href).searchParams;
    const KAKAO_CODE: string | null = PARAMS?.get("code");
    const [accessTokenFetching, setAccessTokenFetching] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom);
 
    console.log("KAKAO_CODE:", KAKAO_CODE);
 
    // 기존 getAccessToken
    const getAccessToken = async () => {
        if (accessTokenFetching) return; // Return early if fetching
        console.log("getAccessToken 호출");

        try {
            setAccessTokenFetching(true); // Set fetching to true
            const response = await axios.get(                
                // "http://localhost:8080/login/oauth2/code/kakao",
                "/login/oauth2/code/kakao",
                {
                    params:{"code":KAKAO_CODE},
                    headers:{"Content-Type": "application/json"}
                }
            );
            console.log("response");
            console.log(response)
            const accessToken = response.data.kakaoAccessToken;
            console.log("accessToken:", accessToken);
            console.log(response.data.account);

            setUserInfo(response.data);
 
            setAccessTokenFetching(false); // Reset fetching to false
            navigate("/");
        } catch (error) {
            console.error("Error:", error);
            setAccessTokenFetching(false); // Reset fetching even in case of error
        }
    };
 
 
    useEffect(() => {
        if (!effectRan.current) {
            getAccessToken();
        }

        return() => {
            effectRan.current = true;
        }
    }, []);
 
    return (
        <div>
           Loading...
        </div>
    );
}
