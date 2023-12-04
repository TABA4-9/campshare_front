import { useEffect, useState } from "react"
import { userInfoAtom } from "../data/userInfoAtom";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";

import Checkbox from '@mui/material/Checkbox';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

export default function Payment() {
    const location = useLocation();
    const data = location.state.item;

    console.log(data);

    const [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom);

    return (
        <div className="flex flex-col pb-3 items-center justify-center w-screen h-screen">
            <div className="flex flex-col w-[550px] h-[550px] bg-white shadow-sharp rounded-md">
                <div className="flex text-xl justify-center mt-8">
                    <strong>주문서</strong>
                </div>
                <div className="flex mt-4 justify-center w-[550px] h-[0px] border border-zinc-400"/>
                <div className="flex flex-col w-full h-[130px] ml-4 mt-4">
                    <strong>상품 정보</strong>
                    <div className="flex mt-2">
                        <img className="w-[100px] h-[100px]" src={data.image} alt="camping item img"/>
                        <div className="flex h-full ml-4 items-center text-sm font-bold">{data.name}</div>
                    </div>
                </div>
                <div className="flex mt-4 justify-center w-[550px] h-[0px] border border-zinc-400"/>
                <div className="flex text-base ml-4 mt-4">
                    <div className="flex flex-col">
                        <strong>내 정보</strong>
                        <div className="text-sm">이름 : {userInfo.name}</div>
                        <div className="text-sm">이메일 : {userInfo.email}</div>
                    </div>
                    <div className="flex flex-col ml-8">
                        <strong>대여자 정보</strong>
                        <div className="text-sm">이름 : {data.postUserName}</div>
                        <div className="text-sm">이메일 : {data.postUserEmail}</div>
                    </div>
                </div>
                <div className="flex mt-4 justify-center w-[550px] h-[0px] border border-zinc-400"/>
                <div className="flex flex-col text-base ml-4 mt-4 mr-5">
                    <strong>결제 방식</strong>
                    <div className="flex justify-between">
                        <div className="flex">
                            <Checkbox
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon />}
                            />
                            <div className="mt-2">신용/체크카드</div>
                        </div>
                        <div className="flex">
                            <Checkbox
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon />}
                            />
                            <div className="mt-2">무통장 입금</div>
                        </div>
                        <div className="flex">
                            <Checkbox
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon />}
                            />
                            <div className="mt-2">만나서 결제</div>
                        </div>
                    </div>
                </div>
                <div className="flex mt-4 justify-center w-[550px] h-[0px] border border-zinc-400"/>
                <div className="flex h-full items-center justify-center w-full">
                    <div className="h-[50px] w-[300px] bg-gray-300" style={{borderRadius : "30px"}}>
                        <div className="text-center mt-3 font-medium"><strong>{data.price}원 결제하기</strong></div>
                    </div>
                </div>
            </div>
        </div>
    )
}