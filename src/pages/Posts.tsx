import picture3 from "../assets/picture3.jpg"

import {useState} from "react";

export default function Posts() {
    const [explanation, setExplnation] = useState<string>("입력하기...")

    return (
        <div className="flex bg-slate-300">
            <div className="flex items-center justify-center w-screen h-screen">
                <div className="flex w-[550px] h-[550px] bg-white shadow-sharp rounded-md">
                    <div className="flex w-6/12 float-left rounded-md" style={{ minHeight:"80%", backgroundImage: `url(${picture3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}/>
                    <div className="flex flex-col w-6/12 float-right p-4">
                        <div className="flex flex-col">
                            <strong className="text-base">상품 이름</strong>
                            <input
                                className="pt-3 text-sm bg-transparent border-b-2 border-solid border-gray-300 text-gray-500 box-border font-arvo h-50 w-400 focus:outline-none"
                                type="text"
                                placeholder="ex) 텐트"
                            />
                        </div>
                        <div className="flex flex-col pt-4">
                            <strong className="text-base">상품 설명</strong>
                            {/* 입력하기 버튼 누르면 모달창으로 넘어가서 상품 설명 개시하기. */}
                            <button className="mt-3 text-sm border rounded-md border-solid border-gray-300 px-4 py-2 text-gray-700">
                                {explanation}
                            </button>
                        </div>
                        <div className="flex flex-col pt-4">
                            <strong className="text-base">카테고리 설정</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}