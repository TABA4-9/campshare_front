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
            const accessToken = response.data.kakaoAccessToken;
            console.log("accessToken:", accessToken);
            console.log(response.data);

            setUserInfo(response.data[0])
 
            setAccessTokenFetching(false); // Reset fetching to false
            navigate("/");
        } catch (error) {
            console.error("Error:", error);
            setAccessTokenFetching(false); // Reset fetching even in case of error
        }
    };

    const getProfile = async () => {
        try {
            console.log("getProfile 호출");
            // Check if accessToken is available
            if (userInfo.kakaoAccessToken) {
                console.log("accessToken in getProfile:", userInfo.kakaoAccessToken);
                const response = await axios.get(
                    "/login",
                    {
                        headers: {
                            Authorization: `${userInfo.kakaoAccessToken}`,
                        },
                    }
                );
                console.log(response);
                // setUserInfo({
                //     ...userInfo,
                //     id: response.data.result.id,
                //     name: response.data.result.name,
                //     email: response.data.result.email,
                //     nickname: response.data.result.nickname,
                //     profileImage: response.data.result.profile_image_url,
                //     isLogin: true,
                // });
                navigate("/");
            } else {
                console.log("No accessToken available");
            }
        } catch (error) {
            console.error("Error:", error);
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