import DropDownForm from "./form/DropDownForm";

import {useState} from "react";


import { SelectChangeEvent } from '@mui/material/Select';

import Button from '@mui/material/Button';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";
import CalendarModal from "./form/modal/CalendarModal";

const categoryOptions:dropwDownOption[] = [
    { value: '텐트', label: '텐트' },
    { value: '타프', label: '타프' },
    { value: '캠핑의자', label: '캠핑의자' },
    { value: '화로대', label: '화로대' },
    { value: '랜턴', label: '랜턴' },
];

const yearOptions:dropwDownOption[] = [
    { value: '1년 이하', label: '1년 이하' },
    { value: '3년 이하', label: '3년 이하' },
    { value: '5년 이상', label: '5년 이상' },
];

const headCountOptions:dropwDownOption[] = [
    { value: '1인', label: '1인' },
    { value: '2인', label: '2인' },
    { value: '3인', label: '3인' },
    { value: '4인', label: '4인' },
    { value: '5인 이상', label: '5인 이상' },
];

const periodOptions:dropwDownOption[] = [
    { value: '1박 2일', label: '1박 2일' },
    { value: '2박 3일', label: '2박 3일' },
    { value: '3박 4일', label: '3박 4일' },
    { value: '4박 5일', label: '4박 5일' },
    { value: '5일 이상', label: '5일 이상' },
];

interface propsType {
    itemName : string,
    itemBrand : string,
    onChange : (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent<string>) => void,
    CategoryItem : string,
    usingYearItem : string,
    headcountItem : string,
    handlePage : () => void,
    startDate : string,
    endDate : string,
    onChangeDate : (e : any) => void,
}

export default function PostPageFirst({itemName, headcountItem, itemBrand, onChange, CategoryItem, usingYearItem, handlePage, startDate, endDate, onChangeDate} : propsType) {
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [userPeriod, setUserPeriod] = useState<string>(startDate ? `${startDate} ~ ${endDate}` : "설정하기");

    const handleClose = () => {
        if(startDate) {
            const newPeriod = `${startDate} ~ ${endDate}`;
            setUserPeriod(newPeriod)
            console.log(newPeriod)
        }
        setShowCalendar(false);
    }

    return (
        <div className="flex flex-col w-6/12 float-right p-4 justify-around">
            <div className="flex h-full flex-col">
                {/* 이 부분도 겹치니까 빼면 좋긴 하겠다 */}
                <div className="flex flex-col pb-2">
                    <strong className="text-base">상품 이름</strong>
                    <input
                        className="pt-3 text-sm bg-transparent border-b-2 border-solid border-gray-300 text-gray-500 box-border font-arvo h-50 w-400 focus:outline-none"
                        name="itemName"
                        type="text"
                        value={itemName}
                        onChange={onChange}
                        placeholder="ex) 텐트"
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <strong className="text-base">브랜드</strong>
                    <input
                        className="pt-3 text-sm bg-transparent border-b-2 border-solid border-gray-300 text-gray-500 box-border font-arvo h-50 w-400 focus:outline-none"
                        name="itemBrand"
                        type="text"
                        value={itemBrand}
                        onChange={onChange}
                        placeholder="ex) K2"
                    />
                </div>
                <div className="pt-2"/>
                <DropDownForm 
                    title="카테고리 설정"
                    label="Category"
                    name="CategoryItem"
                    value={CategoryItem}
                    onChange={onChange}
                    options={categoryOptions}
                />
                <div className="pt-2"/>
                <DropDownForm
                    title="사용 연수"
                    label="UsingYear"
                    name="usingYearItem"
                    value={usingYearItem}
                    onChange={onChange}
                    options={yearOptions}
                />
                <div className="flex flex-col pt-2">
                    <strong className="text-base">대여 기간</strong>
                    <button onClick={()=> {
                        setShowCalendar(true)
                    }} className="mt-3 text-xs border rounded-md border-solid border-gray-300 px-4 py-2 text-gray-700">
                        {userPeriod}
                    </button>
                </div>
                <div className="pt-2"/>
                <DropDownForm
                    title="인원수"
                    label="headcount"
                    name="headcountItem"
                    value={headcountItem}
                    onChange={onChange}
                    options={headCountOptions}
                />
            </div>
            <Button 
                variant="outlined"
                onClick={()=> handlePage()}
            ><FontAwesomeIcon className="text-[20px] text-black" icon={faArrowRight} /></Button>
            <CalendarModal
                showCalendar = {showCalendar}
                handleClose = {handleClose}
                onChangeDate = {onChangeDate}
            />
        </div>
    )
}