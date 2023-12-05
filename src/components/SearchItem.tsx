import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import picture1 from '../assets/picture1.jpg';
import picture4 from '../assets/picture4.jpg';
import picture5 from '../assets/picture5.jpg';

export default function SearchItem() {
    let [userSearch, setUserSearch] = useState<string>();
    let navigate = useNavigate();

    let urlStr = useLocation().pathname;
    let pictureURL;
    switch (urlStr) {
    case "/":
        pictureURL = picture1;
        break;
    case "/product":
        pictureURL = picture4;
        break;
    case "/search":
        pictureURL = picture5;
        break;
    default:
        // 기본값 설정 또는 다른 처리를 원할 경우 여기에 추가
        break;
    }

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

    return (
        <div className="flex flex-col justify-between rounded-3xl bg-black shrink-0 bg-contain text-white" style={{ minHeight:"80%", backgroundImage: `url(${pictureURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div/>
            <div className="flex flex-col align-middle pt-20 pl-20">
                <div className="text-5xl">
                    CampShare
                </div>
                <div className="flex flex-col min-h-[4/12] max-w-[6/12] text-2xl pt-8 pb-40">
                    <strong className="pb-5">캠핑, 부담은 감소하고 즐거움은 증가하다.</strong>
                    <div className="flex flex-col justify-between min-h-[42px] max-w-xs bg-white rounded-md">
                        <div/>
                        <div className="ml-3">
                            <input 
                                className="w-64 mb-1 text-black text-lg outline-none"
                                type="text"
                                value={userSearch}
                                onChange={onChange}
                                onKeyDown={onSubmitSearch}
                            />
                            {/* 아이콘을 눌렀을 때 해당 페이지로 이동하도록.. 수정... */}
                            <FontAwesomeIcon className="cursor-pointer text-[24px] text-black pl-4" icon={faSearch} onClick={handleIconClick}/>
                        </div>
                        <div/>
                    </div>
                </div>
            </div>
            <div/>
        </div>
    )
}