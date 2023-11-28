import {useState, useEffect} from 'react';
import { FetchKakaoToken } from '../hooks/FetchKakaoToken';

import { useNavigate } from "react-router"

import axios from 'axios';

export default function Kakaoauth() {
    const navigate = useNavigate();
    const PARAMS = new URL(window.location.href).searchParams;
    const KAKAO_CODE: string | null = PARAMS?.get("code");
    const [accessTokenFetching, setAccessTokenFetching] = useState<boolean>(false);
 
    console.log("KAKAO_CODE:", KAKAO_CODE);

    // const getAccessToken = async () => {
    //     FetchKakaoToken(KAKAO_CODE, accessTokenFetching, setAccessTokenFetching);
    //     if(accessTokenFetching) {
    //         console.log("FetchKakaoToken Success")
    //         navigate("/")
    //     }
    //     else {
    //         alert("FetchKakaoToken fail");
    //         navigate("/")
    //     }
    // }
    
 
    // 기존 getAccessToken
    const getAccessToken = async () => {
        if (accessTokenFetching) return; // Return early if fetching
        console.log("getAccessToken 호출");

        try {
            setAccessTokenFetching(true); // Set fetching to true
            const response = await axios.get(
                "http://localhost:8080/login/oauth2/code/kakao",
                {
                    params:{"code":KAKAO_CODE},
                    headers:{"Content-Type": "application/json"}
                }
            );
            const accessToken = response.data.accessToken;
            console.log("accessToken:", accessToken);
 
            setAccessTokenFetching(false); // Reset fetching to false
            navigate("/");
        } catch (error) {
            console.error("Error:", error);
            setAccessTokenFetching(false); // Reset fetching even in case of error
        }
    };
 
 
    useEffect(() => {
        if (KAKAO_CODE) {
            getAccessToken();
        }
    }, [KAKAO_CODE]);
 
    return (
        <div>
           Loading...
        </div>
    );
}