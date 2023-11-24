import {useState} from "react";

import picture1 from '../assets/picture1.jpg';
import DropDownForm from '../components/form/DropDownForm';

const categoryFilterOption:dropwDownOption[] = [

]

export default function Category() {
    const [filter, setFilter] = useState<string>("");
    return (
        <div className="flex flex-col px-10">
            {/* Home이랑 공통 부분이라 하나로 빼도 될듯 */}
            <div className="flex flex-col justify-between rounded-3xl bg-black shrink-0 bg-contain text-white" style={{ minHeight:"80%", backgroundImage: `url(${picture1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div></div>
                <div className="flex flex-col align-middle pt-20 pl-20">
                    <div className="text-5xl">
                        CampShare
                    </div>
                    <div className="flex flex-col min-h-[4/12] max-w-[6/12] text-2xl pt-8 pb-40">
                        <strong className="pb-5">캠핑, 부담은 감소하고 즐거움은 증가하다.</strong>
                    </div>
                </div>
                <div/>
            </div>
            <div className="flex justify-between py-16">
                <div className="flex flex-col">
                    <div className="text-stone-900 text-[25px] font-medium font-['Poppins']">filter</div>
                    <div className="w-[200px] h-[0px] border border-black"/>
                </div>
            </div>
        </div>
    )
}