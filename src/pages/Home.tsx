import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import {useEffect} from "react";

import {Link} from "react-router-dom";

import { useRecoilState } from 'recoil';
import { campingItemAtom } from '../data/campingItemAtom';

import SearchItem from '../components/SearchItem';

export default function Home() {
    // 여기서 다 받아야겠네 detail page까지 하려면
    let [campItem, setCampItem] = useRecoilState<CampingItemType[]>(campingItemAtom);

    useEffect(()=>{
        // 따로 3개의 item만 받는 것으로 변경.
        fetch("http://localhost:8080/product/data/main")
        .then(res=>res.json())
        .then(data=>{
            setCampItem(data)
        })
    }, [])

    return (
        <div className="flex flex-col px-10">
            <SearchItem/>

            <div className="flex w-full justify-center my-16">
                <div className="flex flex-col pt-16">
                    <div className="font-bold text-3xl pb-5 mr-8">대여 가능 용품</div>
                    <Link to="/product"><button type="button" className="w-[120px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">더보기 <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                </div>
                <div>
                    <div className="flex px-10 w-full mb-16">
                        {
                            // 만약 index가 홀수라면 사진 padding or margin을 다르게 줘서 위아래로 만들기
                            campItem.map((item,index)=>{
                                return (
                                    <div className={`w-[300px] h-[200px] flex-col justify-start items-start gap-3 inline-flex pr-24`}>
                                        <Link to={`/detail/${item.id}`} state={{item : item}}><img className="w-[300px] h-[200px]" src={item.imagePath[0]} alt="camping item img"/></Link>
                                        <div className="flex-col w-full justify-center items-center flex">
                                            <div className="text-stone-900 text-lg font-medium font-['Poppins']">{item.name}</div>
                                            <div className="text-stone-900 text-opacity-50 text-lg font-medium font-['Poppins']">{item.price} ₩ / 일</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            


        </div>
    )
}