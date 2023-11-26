import { useRecoilState } from "recoil";
import RentItemTable from "./RentItemTable";
import { userInfoAtom } from "../data/userInfoAtom";

export default function RentItem() {
    const [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom);

    return (
        <div className="flex flex-col pr-8">
            <div>
            <strong>대여 상품</strong>
            </div>
            {
                userInfo?.name === '' ? 
                <div className="flex w-full pt-16">
                    <strong>현재 대여 중인 상품이 없습니다.</strong>
                </div> : <RentItemTable/>
            }
        </div>
    )
}