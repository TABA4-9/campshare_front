import * as React from 'react';

import picture2 from "../assets/picture2.jpg"
import picture3 from "../assets/picture3.jpg"

import {useState} from "react";

import { SelectChangeEvent } from '@mui/material/Select';

import PostPageFirst from "../components/PostPageFirst";
import PostPageSec from '../components/PostPageSec';
import axios from 'axios';

export default function Posts() {
    const [itemName, setItemName] = useState<string>("");
    const [headcountItem, setHeadCountItem] = useState<string>("");
    const [itemBrand, setItemBrand] = useState<string>("");
    const [DetailItem, setDetailItem] = useState<string>("");
    const [CategoryItem, setCategoryItem] = useState<string>("");
    const [usingYearItem, setUsingYearItem] = useState<string>("");
    const [itemPrice, setItemPrice] = useState<string>("");
    const [tradeAddress, setTradeAddress] = useState<string>("");
    const [fileList, setFileList] = useState<File[]>([]);
    const [itemPeriod, setItemPeriod] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent<string> ) :void => {
        e.preventDefault();
        if(e.target.name === "DetailItem") setDetailItem(e.target.value);
        else if(e.target.name === "CategoryItem") setCategoryItem(e.target.value);
        else if(e.target.name === "usingYearItem") setUsingYearItem(e.target.value);
        else if(e.target.name === "itemName") setItemName(e.target.value);
        else if(e.target.name === "PriceItem") setItemPrice(e.target.value);
        else if(e.target.name === "PeriodItem") setItemPeriod(e.target.value);
        else if(e.target.name === "itemBrand") setItemBrand(e.target.value);
        else if(e.target.name === "headcountItem") setHeadCountItem(e.target.value);
        else if(e.target.name === "itemTradeAddress") setTradeAddress(e.target.value);
    }

    const productSubmit = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // fileList to formData
        const formDataList = new FormData();  // formDataList 생성

        let testFileList = [...fileList];
        for(const file of testFileList) {
            formDataList.append('userFileList', file);
            console.log("formDataList에 추가완료");
        }
        for(const listKeyValue of formDataList) console.log(listKeyValue);

        formDataList.append('name', itemName);
        formDataList.append('brand', itemBrand);
        formDataList.append('category', CategoryItem);
        formDataList.append('usingYear', usingYearItem);
        formDataList.append('headcount', headcountItem);
        formDataList.append('explanation', DetailItem);
        formDataList.append('price', itemPrice);
        formDataList.append('address', tradeAddress);

        const results = await fetch('/post/submit', {
            method : "POST",
            body : formDataList,
            headers : {
                "Custom-Header" : "value; charset=UTF-8"
            },
        })
        .then(res=>{
            if(!res.ok) {
                throw new Error("Bad response");
            }
            return res.json();
        })
        .then(data => {
            console.log(data)
            console.log(data.contentsImage);
            console.log("응답")
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handlePage = async () => {
        if(page === 1) {
            setPage(2);
            try {
                // only front testing code
                await axios.post('/post/nextPage',{
                    name : itemName,
                    period : itemPeriod,
                    category : CategoryItem,
                    headcount : headcountItem,
                    usingYear : usingYearItem,
                    brand : itemBrand,
                })
                .then(response=>{console.log(response)})
            } catch (error) {
                console.error('로그를 게시하는 중 오류 발생:', error);
            }
        }
        else setPage(1);
    }

    return (
        <div className="flex bg-slate-300">
            <div className="flex flex-col pb-3 items-center justify-center w-screen h-screen">
                <div className="pb-3 text-lg font-bold">상품 등록</div>
                <div className="flex w-[550px] h-[550px] bg-white shadow-sharp rounded-md">
                    <div className="flex w-6/12 float-left rounded-md" style={{ minHeight:"80%", backgroundImage: `url(${page === 1 ? picture2 : picture3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}/>
                    {
                        page === 1 ? 
                            <PostPageFirst 
                                headcountItem = {headcountItem}
                                itemName = {itemName}
                                onChange = {onChange}
                                CategoryItem = {CategoryItem}
                                usingYearItem = {usingYearItem}
                                handlePage={handlePage}
                                itemBrand={itemBrand}
                                itemPeriod = {itemPeriod}
                            /> :
                            <PostPageSec
                                DetailItem = {DetailItem}
                                itemPrice = {itemPrice}
                                tradeAddress = {tradeAddress}
                                handlePage={handlePage}
                                onChange = {onChange}
                                productSubmit = {productSubmit}
                                fileList = {fileList}
                                setFileList = {setFileList}
                            />
                    }
                </div>
            </div>
        </div>
    )
}