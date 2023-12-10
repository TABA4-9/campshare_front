import axios from "axios"
import { userInfoAtom } from "../data/userInfoAtom";
import { useRecoilState } from "recoil";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "./form/modal/LogoutModal";


export default function KakaoLogout() {
    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

    const handleClose = () => setShowLogoutModal(false);

    return (
        <div>
            <button onClick={()=>setShowLogoutModal(true)}>로그아웃</button>
            <LogoutModal showLogoutModal={showLogoutModal} setShowLogoutModal={setShowLogoutModal} handleClose={handleClose}/>
        </div>
    )
}