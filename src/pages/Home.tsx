import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faArrowRight } from '@fortawesome/free-solid-svg-icons';

import {useEffect} from "react";
import {useState} from "react";

import {Link} from "react-router-dom";

import { useRecoilState } from 'recoil';
import { campingItemAtom } from '../data/campingItemAtom';

import picture1 from '../assets/picture1.jpg';
import { userInfoAtom } from '../data/userInfoAtom';

import { useNavigate } from 'react-router-dom';
import SearchItem from '../components/SearchItem';

export default function Home() {
    let [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom);
    let [userSearch, setUserSearch] = useState<string>();
    let [campItem, setCampItem] = useRecoilState<CampingItemType[]>(campingItemAtom);

    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setUserSearch(e.target.value)
    }

    const onSubmitSearch = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          //키를 눌렀을 때 동작할 코드
          // /search?searchInput={userSearch}로 navigate
          navigate(`/search?searchInput=${userSearch}`)
        }
    };

    const handleIconClick = () => {
        navigate(`/search?searchInput=${userSearch}`)
    }

    useEffect(()=>{
        // 따로 3개의 item만 받는 것으로 변경.
        fetch("/api/item")
        .then(res=>res.json())
        .then(data=>{
            setCampItem(data)
        })
    }, [])

    return (
        <div className="flex flex-col px-10">
            {/* 이 부분은 무조건 컴포넌트 하나로 빼야겠네 */}
            <SearchItem/>

            <div className="flex justify-center mt-16">
                <div className="flex flex-col">
                    <div className="font-bold text-3xl pb-5">대여 가능 용품</div>
                    <Link to="/category"><button type="button" className="w-[120px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">더보기 <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                </div>
                <div>
                    <div className="flex px-10">
                        {
                            // 만약 index가 홀수라면 사진 padding or margin을 다르게 줘서 위아래로 만들기
                            campItem.slice(0,3).map((item,index)=>{
                                if(index >4) return null;
                                return (
                                    <div className={`w-[299px] h-[380px] bg-white border border-white flex-col justify-start items-start gap-3 inline-flex ${index % 2 === 0 && 'pt-14'}`}>
                                        <Link to={`/detail/${item.id}`} state={{item : item}}><img className="w-[200px] h-[200px]" src={item.image} alt="camping item img"/></Link>
                                        <div className="flex-col justify-start items-start flex">
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