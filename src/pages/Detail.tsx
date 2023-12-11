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

export default function Detail() {
    const navigate = useNavigate();
    const [campItem, setCampItem] = useRecoilState<CampingItemType[]>(campingItemAtom);
    const [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom);
    const [recommandItem, setRecommandItem] = useState<CampingItemType[]>([]);
    const location = useLocation();
    const data = location.state.item;

    // utc time => kor time
    const currentDateTime = new Date();
    const formattedDateTime = moment(currentDateTime).format('YYYY-MM-DD HH:mm:ss');

    const checkLogin = () => {
        if (userInfo.account.name === '') {
            alert("로그인 후 이용 가능한 서비스입니다.");
            return ;
        }
        else {
            navigate(`/payment/${data.id}`, {
                // props로 받는 list 스테이트를 넘겨준다.
                state:{item : data}
            })
        }
    }

    const DeleteProduct = async () => {
        try {
            // front + back
            await axios.post(`http://localhost:8080/product/delete`,{
                productId : data.id
            })
            .then(response => {
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
                await axios.post(`http://localhost:8080/detail/${data.id}`,{
                    userId : userInfo.account.id,
                    detailPageLog : formattedDateTime,
                })
                .then(response=>{console.log(response); setRecommandItem(response.data)})
            } catch (error) {
                console.error('로그를 게시하는 중 오류 발생:', error);
            }
        };
        window.scrollTo(0, 0);
        postLog();
    },[])

    return (
        <div className="flex flex-col px-10">
            <div className="flex justify-around w-full h-full">
                <div className="flex flex-col m-4">
                    <div>
                        <Carousel navButtonsAlwaysInvisible={data.imagePath.length < 2}  className="w-[500px] h-[500px]">
                        {
                            data.imagePath.map((item:string, index:number) => (
                                <img className="w-[500px] h-[500px]" src={item} alt="camping item img" key={index} />
                            ))
                        } 
                        </Carousel>
                    </div>
                </div>
                <div className="flex mt-16 w-[40%] h-full flex-col m-4 pr-8">
                    <div className="flex flex-col mt-2">
                        <div className="text-base">
                            <strong>{data.name}</strong>
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
                            <div className=""><strong>대여자</strong></div>
                            <div className="">{data.postUserName}</div>
                        </div>
                        <div className="flex w-[400px] justify-between text-sm mt-4">
                            <div className=""><strong>대여가</strong></div>  
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
                        <div className="mt-4 mb-4 w-full h-[0px] border border-black"/>
                        <div className="flex flex-col w-full justify-between text-sm">
                            <div className=""><strong>상세 설명</strong></div>
                            <div className="mt-2">{data.explanation}</div>
                        </div>
                        <div className="mt-4">
                            <div className="cursor-pointer flex justify-center items-center w-full h-[58px] bg-zinc-300 rounded-[10px] border border-zinc-300">
                                <div onClick={()=>checkLogin()}><strong>대여 하기</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>       
            <div className="flex w-full flex-col mt-8">
                <div>
                    이런게 필요하진 않으세요?
                </div>
                <div className="flex my-4 mb-8 justify-around w-full">
                    {
                        // 문제가 recommandItem은 그에 맞는 recommandItem을 가지지않음..
                        // 이에 따라 새롭게 찾아서 item을 할당해줘야 함.
                        recommandItem.map((item:CampingItemType,index:number)=>{
                            return (
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <Link to={`/detail/${item.id}`} state={{item : item}}><img className="rounded-t-lg" src={`${item.imagePath[0]}`} alt="recommandImage" /></Link>
                                    <div className="p-5">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name} ({data.brand && data.brand})</h5>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.headcount}</p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.price}원</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}