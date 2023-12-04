import { Routes, Route } from "react-router-dom"
import {useState} from "react";

import Home from "./pages/Home"
import Posts from "./pages/Posts";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Kakaoauth from "./components/Kakaoauth";
import Category from "./pages/Category";
import MyPage from "./pages/MyPage";
import { userInfoAtom } from "./data/userInfoAtom";
import { useRecoilState } from "recoil";
import SearchResult from "./pages/SearchResult";

export default function RouterWeb() {
    // 로그인 기능 구현 시, false로 바꿔서 로그인 유무에 따라 true, false로 바꿔줘야 함.
    let [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom);

    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/detail/:id" element={<Detail/>}></Route>
            <Route path="/modify/:id" element={<Posts/>}></Route>
            <Route path="/loginOauth2" element={<Login/>}/>
            <Route path="/login/oauth2/code/kakao" element={<Kakaoauth/>}></Route>
            <Route path="/category" element={<Category/>}></Route>
            <Route path="/search" element={<SearchResult/>}></Route>
            {
                userInfo.name === '' 
                ? <Route path="/login" element={<Login/>}></Route>
                : <Route path="/mypage" element={<MyPage/>}></Route> 
            }
            <Route path="/posts" element={<Posts/>}></Route>
        </Routes>

    )
}