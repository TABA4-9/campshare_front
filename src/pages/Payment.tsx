
import { userInfoAtom } from "../data/userInfoAtom";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";

import picture1 from '../assets/picture1.jpg';

import axios from "axios";

import Checkbox from '@mui/material/Checkbox';

import { Link } from "react-router-dom";

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

export default function Payment() {
    // 확장성을 위한 임시 페이지
    const location = useLocation();
    const data = location.state.item;

    // total price 계산을 위한 일 수 계산
    let startDate = new Date(data?.startDate.replace(/년|월/g, '-').replace('일', '').trim());
    let endDate =   new Date(data?.endDate.replace(/년|월/g, '-').replace('일', '').trim());
    let timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    let rentDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom);

    const rentCheck = async () => {
        // 확인을 누르면 서버에 rent되었음을 전송해야겠네
        // id값을 기반으로 찾아서 isRented 값을 true로 변경(이건 서버에서 하는 일이고 나는 그냥 해당 상품 id 보내면 될듯)
        try {
            // front + back
            await axios.post(`http://43.200.250.149:8080/product/matching`,{
                productId : data.id,
                rentUserId : userInfo.account.id,
            })
            .then(response => {
                setUserInfo(prev => ({
                    ...prev,
                    rentItem: response.data.rentItem  // 여기를 수정
                }));
            })
        } catch (error) {
            console.error(':', error);
        }
    }

    return (
        <div className="flex flex-col pb-3 items-center justify-center w-screen h-screen bg-gray-400" style={{ backgroundImage: `url(${picture1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="flex flex-col w-[550px] h-[550px] bg-white shadow-sharp rounded-md">
                <div className="flex text-xl justify-center mt-8">
                    <strong>주문서</strong>
                </div>
                <div className="flex mt-4 justify-center w-[550px] h-[0px] border border-zinc-400"/>
                <div className="flex flex-col w-full h-[130px] ml-4 mt-4">
                    <strong>상품 정보</strong>
                    <div className="flex mt-2">
                        <img className="w-[100px] h-[100px]" src={data.imagePath[0]} alt="camping item img"/>
                        <div className="flex flex-col">
                            <div className="flex h-full ml-4 items-center text-sm font-bold">{data.name}</div>
                            <div className="flex h-full ml-4 items-center text-sm font-bold">대여기간 : {data.startDate} ~ {data.endDate}</div>
                            <div className="flex h-full ml-4 items-center text-sm font-bold">거래 희망 주소 : {data.address}</div>
                        </div>
                    </div>
                </div>
                <div className="flex mt-4 justify-center w-[550px] h-[0px] border border-zinc-400"/>
                <div className="flex text-base ml-4 mt-4">
                    <div className="flex flex-col">
                        <strong>게스트 정보</strong>
                        <div className="text-sm">이름 : {userInfo.account.name}</div>
                        <div className="text-sm">이메일 : {userInfo.account.email}</div>
                    </div>
                    <div className="flex flex-col ml-8">
                        <strong>호스트 정보</strong>
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
                <div className="flex h-full flex-col items-center justify-center w-full">
                    <div className="text-sm text-slate-400 pb-2">
                        서비스 수수료(5%)가 포함된 가격입니다
                    </div>
                    <div className="h-[50px] w-[300px] bg-gray-300" style={{borderRadius : "30px"}}>
                        <div onClick={()=>{rentCheck()}} className="text-center mt-3 font-medium"><Link to='/completePay'><strong>{Math.round((rentDays * data.price)*1.05)}원 결제하기</strong></Link></div>
                    </div>
                </div>
            </div>
        </div>
    )
}