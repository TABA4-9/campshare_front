import {useState} from 'react';
import LendItem from '../components/LendItem';
import RentItem from '../components/RentItem';
import { userInfoAtom } from '../data/userInfoAtom';
import { useRecoilState } from 'recoil';
import KakaoLogout from '../components/KakoLogout';

export default function MyPage() {
    let [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom);
    const [myPageComponent, setMyPageComponent] = useState<string>("등록 상품");
    
    return (
        <div className="flex">
            <div className="w-[25vw] flex flex-col pl-8">
                <div className="text-lg font-semibold">My page</div>
                <div className="w-[200px] h-[0px] border border-black my-4 "/>
                <div className="mb-1"><strong>{userInfo.account.name}님. 반갑습니다. </strong></div>
                <div onClick={()=>setMyPageComponent("등록 상품")} className={`mb-1 cursor-pointer ${myPageComponent === "등록 상품" ? "font-bold" : null}`}>등록 상품</div>
                <div onClick={()=>setMyPageComponent("이용 중인 상품")} className={`mb-1 cursor-pointer ${myPageComponent === "이용 중인 상품" ? "font-bold" : null}`}>이용 중인 상품</div>
                <KakaoLogout/>
            </div>
            <div className="w-[75vw]">
                {
                    (myPageComponent === "등록 상품") && <LendItem/>
                }
                {
                    (myPageComponent === "대여 상품") && <RentItem/>
                }
            </div>
        </div>
    )
}