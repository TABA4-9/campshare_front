import KakaoLogin from "../components/KakaoLogin"

import {useState} from "react";

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ServiceAgreeModal from "../components/form/modal/ServiceAgreeModal";


export default function Login() {
    const [showAgreeModal, setShowAgreeModal] = useState<boolean>(false);
    const [Agree, setAgree] = useState<boolean>(false);

    const onChange = () => {
        setAgree(Agree=>!Agree);
    }

    const handleClose = () => {
        setShowAgreeModal(false);
    }

    return (
        <div className="flex flex-col" style={{minHeight:"400px"}}>
            <div className="flex w-full h-full flex-col justify-around" style={{minHeight:"400px"}}>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center flex-col w-[400px] h-[100px] shadow-2xl border-solid border-4">
                        <strong className="mr-3">약관 동의</strong>
                        <FormControlLabel required defaultChecked={true} onChange={onChange} control={<Checkbox />} label="서비스 이용 관련 약관 동의(필수)" />
                        <button onClick={()=>setShowAgreeModal(true)}>자세히보기...</button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center mt-8">
                    <strong>로그인/회원가입</strong>
                    <div className="mr-4 mt-4">
                        <KakaoLogin Agree={Agree}/>
                    </div>
                </div>
            </div>
            <ServiceAgreeModal
                handleClose={handleClose}
                showAgreeModal={showAgreeModal}
            />
        </div>
    )
}
