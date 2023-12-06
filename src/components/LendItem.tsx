import { useRecoilState } from "recoil"
import { userInfoAtom } from "../data/userInfoAtom"
import LendItemTable from "./LendItemTable";

export default function LendItem() {
    const [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom);
    // 현재 user의 등록 상품 정보가 없다면.. "현재 등록 중인 상품이 없습니다."를 보여주고
    // 아니라면 등록 상품에 대한 component를 보여줄 것.
    
    return (
        <div className="flex flex-col pr-4">
            <div>
                <strong>등록 상품</strong>
            </div>
             {
                userInfo?.rentItem === null ? 
                <div className="flex w-full pt-16">
                    <strong>현재 대여 중인 상품이 없습니다.</strong>
                </div> : <LendItemTable/>
             }
        </div>
    )
}