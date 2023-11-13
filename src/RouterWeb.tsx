import { Routes, Route } from "react-router-dom"
import {useState} from "react";

import Header from "./components/Header"
import Home from "./pages/Home"

export default function RouterWeb() {
    // 로그인 기능 구현 시, false로 바꿔서 로그인 유무에 따라 true, false로 바꿔줘야 함.
    const [isLogged, setIsLogged] = useState<Boolean>(false);
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                {/* <Route path="/category" element={<Category/>}></Route>
                <Route path="/recommand" element={<Recommand/>}></Route>
                {
                    isLogged 
                    ? <Route path="/myprofile" element={<Myprofile/>}></Route> 
                    : <Route path="/login" element={<UserLogin/>}
                } */}
            </Routes>
        </div>
    )
}