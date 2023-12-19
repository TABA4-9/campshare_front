import { Link, useLocation } from "react-router-dom"

import { useNavigate } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useEffect, useState } from "react";
import { campingItemAtom } from "../data/campingItemAtom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { userInfoAtom } from "../data/userInfoAtom";

import Carousel from "react-material-ui-carousel";
import { Paper } from '@mui/material'

import moment from "moment";
import CalendarModal from "../components/form/modal/CalendarModal";

export default function Detail() {

    const [isSetted, setIsSetted] = useState<boolean>(false);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom);
    const [recommandItem, setRecommandItem] = useState<CampingItemType[]>([]);
    const location = useLocation();
    const data = location.state.item;
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const checkLogin = () => {
        if (userInfo.account.name === '') {
            alert("로그인 후 이용 가능한 서비스입니다.");
            return ;
        }
        if(data.isRented === true) alert("이미 대여 중인 상품입니다.");
        else {
            if (!isSetted) {
                alert("대여 희망 날짜를 먼저 선택해주세요!");
                return ;
            }
            else if(startDate < data.startDate || data.endDate < endDate ){
                alert("대여 가능 기간 내에서 선택해주세요!");
                return ;
            }
            else if(isSetted){
                // 날짜 선택된 경우에만 다음 페이지로 넘어가도록 동작
                console.log("상품 클릭! 날짜:", startDate, "~", endDate);
                navigate(`/payment/${data.id}`, {
                    // props로 받는 list 스테이트를 넘겨준다.
                    state:{item : data, startDate : startDate, endDate : endDate}
                })
            }//endElseIf
        }//endElse
    }//endCheckLogin

    const handleClose = () => {
        setShowCalendar(false);
        setIsSetted(true);
    }
    const onChangeDate = (e:any) :void => {
        const startDateFormat = moment(e[0]).format("YYYY[년] MM[월] DD[일]");
        const endDateFormat = moment(e[1]).format("YYYY[년] MM[월] DD[일]");
        setStartDate(startDateFormat);
        setEndDate(endDateFormat);
        setIsSetted(true);
    }

    // utc time => kor time
    const currentDateTime = new Date();
    const formattedDateTime = moment(currentDateTime).format('YYYY-MM-DD HH:mm:ss');

    const newImagePathArr: string[] = data.imagePath.filter((element: string) => element !== null);



    const DeleteProduct = async () => {
        try {
            // front + back
            await axios.post(`http://43.200.250.149:8080/product/delete`,{
                productId : data.id
            })
            .then(response => {
                console.log(response);
                setUserInfo(prev => ({    
                    ...prev,
                    lendItem: response.data.lendItem
                }));
            })
            alert("삭제가 완료되었습니다.");
            navigate("/");
        } catch (error) {
            console.error('게시글 삭제 에러', error);
        }
    };
    
    useEffect(()=>{
        const postLog = async () => {
            try {
                // front + back
                await axios.post(`http://43.200.250.149:8080/detail/${data.id}`,{
                    userId : userInfo.account.id,
                    detailPageLog : formattedDateTime,
                })
                .then(response=>{console.log(response.data); setRecommandItem(response.data)})
            } catch (error) {
                console.error('로그를 게시하는 중 오류 발생:', error);
            }
        };
        window.scrollTo(0, 0);
        postLog();
    },[data])

    return (
        <div className="flex flex-col px-10">
            <div className="flex justify-around w-full h-full">
                <div className="flex flex-col m-4">
                    <div>
                        {
                            newImagePathArr.length >= 2 ? (
                                <Carousel autoPlay={false} className="w-[500px] h-[500px]">
                                {
                                    newImagePathArr.map((item:string, index:number) => (
                                        <img className="w-[500px] h-[500px]" src={item} alt="camping item img" key={index} />
                                    ))
                                }
                                </Carousel>
                            ) : <img className="w-[500px] h-[500px]" src={data.imagePath[0]} alt="camping item img" />
                        }
                    </div>
                </div>
                <div className="flex mt-16 w-[40%] h-full flex-col m-4 pr-8">
                    <div className="flex flex-col mt-2">
                        <div className="text-base">
                            <div className="text-lg"><strong>{data.name}</strong></div>
                            {
                                data.postUserId === userInfo.account.id ? ( 
                                <div className="flex">
                                    <Link to={`/modify/${data.id}`} state={{item : data}}><div className="mr-3">수정</div></Link>
                                    <button onClick={()=>DeleteProduct()}>삭제</button>
                                </div> 
                                ) :
                                <div/>
                            }
                        </div>
                        <div className="flex w-[400px] justify-between text-sm mt-4">
                            <div className=""><strong>호스트</strong></div>
                            <div className="">{data.postUserName}</div>
                        </div>
                        <div className="flex w-[400px] justify-between text-sm mt-4">
                            <div className=""><strong>사용 인원</strong></div>
                            <div className="">{data.headcount}용</div>
                        </div>
                        <div className="flex w-[400px] justify-between text-sm mt-4">
                            <div className=""><strong>거래 희망 주소</strong></div>
                            <div className="">{data.address}</div>
                        </div>
                        <div className="flex w-[400px] justify-between text-sm mt-4">
                            <div className=""><strong>대여가 (1박 당)</strong></div>
                            <div className="">{data.price}원</div>
                        </div>
                        <div className="flex w-[400px] justify-between text-sm mt-4">
                            <div className=""><strong>대여 여부</strong></div>
                            <div className="">{data.isRented === true ? "불가능" : "가능"}</div>
                        </div>
                        <div className="flex w-[400px] justify-between text-sm mt-4">
                            <div className=""><strong>대여 가능 기간</strong></div>
                            <div className="">{data.startDate} ~ {data.endDate}</div>
                        </div>
                        <div className="flex w-[400px] justify-between text-sm mt-4">
                            <div className=""><strong>대여 희망 기간</strong></div>
                            <button className={`w-[200px] md:w-[300px] h-[30px] md:h-[50px] bg-zinc-300 font-bold rounded-[10px]
                                        ${isSetted ? "bg-blue-500 hover:bg-blue-700" : "hover:bg-zinc-400"}`}
                                    onClick={() => { setShowCalendar(true); setIsSetted(false); }}>
                                {isSetted ? `${startDate} ~ ${endDate}` : "설정"}
                            </button>
                        </div>
                        <div className="mt-4 mb-4 w-full h-[0px] border border-black"/>
                        <div className="flex flex-col w-full justify-between text-sm">
                            <div className=""><strong>상세 설명</strong></div>
                            <div className="mt-2">{data.explanation}</div>
                        </div>
                        {
                            data.postUserId !== userInfo.account.id ? ( <div className="mt-4">
                                <div onClick={(e)=>{checkLogin();}} className={`cursor-pointer flex justify-center items-center w-full h-[58px] bg-zinc-300 rounded-[10px] border border-zinc-300
                                ${isSetted ? "bg-blue-500 hover:bg-blue-700" : "hover:bg-zinc-400"}`}>
                                    <div><strong>대여 하기</strong></div>
                                </div>
                            </div> ) : null
                        }
                    </div>
                </div>
            </div>       
            <div className="flex w-full flex-col mt-8">
                <div>
                    이런 게 필요하지는 않으세요?
                </div>
                <div className="flex my-4 mb-8 justify-around w-full">
                    {
                        // 문제가 recommandItem은 그에 맞는 recommandItem을 가지지않음..
                        // 이에 따라 새롭게 찾아서 item을 할당해줘야 함.
                        recommandItem.map((item:CampingItemType,index:number)=>{
                            return (
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <Link to={`/detail/${item.id}`} state={{item : item}}><img className="object-cover w-[300px] h-[200px] rounded-t-lg" src={`${item.imagePath[0]}`} alt="recommandImage" /></Link>
                                    <div className="p-5 text-center">
                                        <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.headcount}용</p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.price} ₩ / 박</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <CalendarModal
                showCalendar={showCalendar}
                handleClose={handleClose}
                onChangeDate={onChangeDate}
            />
        </div>
    )
}