import { Link, useLocation } from "react-router-dom"

import { useState, useEffect } from "react";
import { campingItemAtom } from "../data/campingItemAtom";
import { useRecoilState } from "recoil";

export default function Detail() {
    const [campItem, setCampItem] = useRecoilState<CampingItemType[]>(campingItemAtom);
    const [itemInfo, setItemInfo] = useState<CampingItemType>()
    const location = useLocation();
    const data = location.state.item;
    
    console.log(data);

    // useEffect(()=>{
    //     if(data) {
    //         setItemInfo(data);
    //     }
    // },[])

    return (
        <div className="flex flex-col px-10">
            <div className="flex rounded-md h-ful w-[60%] bg-slate-300">
                <div className="flex flex-col m-4">
                    <div>
                        <img className="w-[200px] h-[200px]" src={data.image} alt="camping item img"/>
                    </div>
                    <div className="mt-2">
                        {data.name} ({data.brand && data.brand})
                    </div>
                    <div className="mt-2">
                        {data.headcount}
                    </div>
                    <div className="mt-2">
                        {data.price}원
                    </div>
                </div>
                <div className="flex justify-between flex-col m-4">
                    <div>
                        <div>
                            {data.postUserName} ({data.address})
                        </div>
                        <div className="mt-2">
                            {data.explanation}
                        </div>
                    </div>
                    <div className="flex ">
                        <div className="flex w-full justify-between">
                            <div/>
                            <div>
                                <button>빌리기</button>
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
                        data.recommandItem.map((item:CampingItemType,index:number)=>{
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