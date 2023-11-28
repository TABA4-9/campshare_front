import * as React from 'react';

import picture2 from "../assets/picture2.jpg"
import picture3 from "../assets/picture3.jpg"

import {useState} from "react";

import { SelectChangeEvent } from '@mui/material/Select';

import PostPageFirst from "../components/PostPageFirst";
import PostPageSec from '../components/PostPageSec';

export default function Posts() {
    const [itemName, setItemName] = useState<string>("");
    const [headcountItem, setHeadCountItem] = useState<string>("");
    const [itemBrand, setItemBrand] = useState<string>("");
    const [DetailItem, setDetailItem] = useState<string>("");
    const [CategoryItem, setCategoryItem] = useState<string>("");
    const [usingYearItem, setUsingYearItem] = useState<string>("");
    const [itemPrice, setItemPrice] = useState<string>("");
    const [tradeAddress, setTradeAddress] = useState<string>("");
    const [itemImage, setItemImage] = useState<File[]>([]);
    const [itemPeriod, setItemPeriod] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent<string>) :void => {
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

    const handlePage = () => {
        if(page === 1) setPage(2);
        else setPage(1);
        console.log(page)
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
                            />
                    }
                </div>
            </div>
        </div>
    )
}