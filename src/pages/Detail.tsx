import { Link, useLocation } from "react-router-dom"

import { useNavigate } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useEffect } from "react";
import { campingItemAtom } from "../data/campingItemAtom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { userInfoAtom } from "../data/userInfoAtom";

export default function Detail() {
    const navigate = useNavigate();
    const [campItem, setCampItem] = useRecoilState<CampingItemType[]>(campingItemAtom);
    const [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom);
    const location = useLocation();
    const data = location.state.item;

    console.log(data);

    // utc time => kor time
    const today = new Date();
    const utcTime = new Date().toISOString();
    const kor = new Date(utcTime);
    kor.setHours(kor.getHours()+9);
    const formattedDate = today.toLocaleString('ko-KR',{
        hour12 : false
    });

    const checkLogin = () => {
        if (userInfo.name === '') {
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
            // only front testing code
            await axios.post(`/product/delete`,{
                productId : data.id
            })
            .then(response=>{console.log(response)})

            // front + back
            // await axios.post(`http://localhost:8080/product/delete`,{
            //     productId : data.id
            // })
            // .then(response=>{console.log(response)})

            alert("삭제가 완료되었습니다.")
            navigate("/");
        } catch (error) {
            console.error('게시글 삭제 에러', error);
        }
    };
    
    useEffect(()=>{
        const postLog = async () => {
            try {
                // only front testing code
                await axios.post(`/detail/log`,{
                    userId : userInfo.id,
                    detailPageLog : formattedDate,
                })
                .then(response=>{console.log(response)})

                // front + back
                // await axios.post(`http://localhost:8080/detail/${data.id}`,{
                //     userId : userInfo.id,
                //     detailPageLog : formattedDate,
                // })
                // .then(response=>{console.log(response)})
            } catch (error) {
                console.error('로그를 게시하는 중 오류 발생:', error);
            }
        };
    
        postLog();
    },[])

    return (
        <div className="flex flex-col px-10">
            <div className="flex justify-around rounded-md h-ful w-[70%] bg-slate-300">
                <div className="flex flex-col m-4">
                    <div>
                        <img className="w-[200px] h-[200px]" src={data.image} alt="camping item img"/>
                    </div>
                    <div className="mt-2">
                        <div>
                            {data.name} ({data.brand && data.brand})
                        </div>
                    </div>
                    <div className="mt-2">
                        {data.headcount}
                    </div>
                    <div className="mt-2">
                        {data.price}원
                    </div>
                </div>
                <div className="flex w-full justify-between flex-col m-4">
                    <div>
                        <div className="flex w-full justify-between">
                            <div>{data.postUserName} ({data.address})</div>
                            {
                                data.postUserId === userInfo.id ? ( 
                                <div className="flex">
                                    <Link to={`/modify/${data.id}`} state={{item : data}}><div className="mr-3">수정</div></Link>
                                    <button onClick={()=>DeleteProduct()}>삭제</button>
                                </div> 
                                ) :
                                <div/>
                            }                       
                        </div>
                        <div className="mt-2">
                            {data.explanation}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between m-4">
                    <div>대여 여부 : {data.isRented === true ? "불가능" : "가능"}</div>
                    <div className="flex justify-center">
                        <Stack spacing={2} direction="row">
                            {
                                data.isRented === true ?
                                <Button variant="outlined" disabled>빌리기</Button> : 
                                <Button onClick={()=>checkLogin()} variant="outlined">빌리기</Button>
                            }
                        </Stack>
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
                        data.recommandProduct.map((item:CampingItemType,index:number)=>{
                            let findCampingItem = campItem.find((campItem)=>campItem.id===item.id)
                            return (
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <Link to={`/detail/${item.id}`} state={{item : findCampingItem}}><img className="rounded-t-lg" src={`${item.image}`} alt="recommandImage" /></Link>
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