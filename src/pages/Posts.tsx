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

    // posts 변경 시, 실제로 state에 적용 되는가 확인
    // console.log("itemName : " + itemName);
    // console.log("headcountItem : " + headcountItem);
    // console.log("itemBrand : " + itemBrand);
    // console.log("CategoryItem : " + CategoryItem);
    // console.log("usingYearItem : " + usingYearItem);
    // console.log("itemPrice : " + itemPrice);
    // console.log("tradeAddress : " + tradeAddress);
    // console.log("itemPeriod : " + itemPeriod);
    // for(const item of fileList) console.log(item?.name);
    // console.log("DetailItem : " + DetailItem);

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

        const userData = {
            itemName,
            itemBrand,
            CategoryItem,
            itemPeriod,
            usingYearItem,
            headcountItem,
            DetailItem,
            itemPrice,
            tradeAddress,
        };
        // fileList to formData
        const formDataList = new FormData();  // formDataList 생성

        // testing only one image file
        // let testfile = fileList[0];
        // console.log(testfile);
        // formDataList.append('userFileList', testfile);

        // try {
        //     // axios를 이용한 post 요청. 헤더를 multipart/form-data 로 한다.
        //     await axios.post('/post/submit', formDataList, {
        //         headers: {'Content-Type': 'multipart/form-data', charset: 'utf-8'},
        //     });
        //     alert('게시글이 등록되었습니다');
        // } catch (err) {
        //     alert(err);
        // }
        let testFileList = [...fileList];
        for(const file of testFileList) {
            formDataList.append('userFileList', file);
            console.log("formDataList에 추가완료");
        }
        for(const listKeyValue of formDataList) console.log(listKeyValue);
        formDataList.append('userData', JSON.stringify(userData));

        // formDataList.append('itemName', new Blob([JSON.stringify(itemName)], {
        //     type: "application/json"
        // }));
        // formDataList.append('itemBrand', new Blob([JSON.stringify(itemBrand)], {
        //     type: "application/json"
        // }));
        // formDataList.append('CategoryItem', new Blob([JSON.stringify(CategoryItem)], {
        //     type: "application/json"
        // }));
        // formDataList.append('itemPeriod', new Blob([JSON.stringify(itemPeriod)], {
        //     type: "application/json"
        // }));
        // formDataList.append('usingYearItem', new Blob([JSON.stringify(usingYearItem)], {
        //     type: "application/json"
        // }));
        // formDataList.append('headcountItem', new Blob([JSON.stringify(headcountItem)], {
        //     type: "application/json"
        // }));
        // formDataList.append('DetailItem', new Blob([JSON.stringify(DetailItem)], {
        //     type: "application/json"
        // }));
        // formDataList.append('itemPrice', new Blob([JSON.stringify(itemPrice)], {
        //     type: "application/json"
        // }));
        // formDataList.append('tradeAddress', new Blob([JSON.stringify(tradeAddress)], {
        //     type: "application/json"
        // }));

        // 확인 url : http://httpbin.org/post
        // const results = await fetch('/post/submit', {
        //     method : "POST",
        //     body : formDataList,
        //     headers : {
        //         "Custom-Header" : "value",
        //     }
        // })
        // .then(res=>{
        //     if(!res.ok) {
        //         throw new Error("Bad response");
        //     }
        //     return res.json();
        // })
        // .then(data => console.log(data))
        // .catch(err => {
        //     console.log(err);
        // })

        // console.log('results : ' + results)

        // const url = 'http://localhost:3000/post/submit';
        // axios.post(url, formDataList).then((res)=>{
        //     console.log(res);
        // })
        
        // await axios({
        //     method: "post",
        //     url: "http://localhost:3000/post/submit",
        //     data: formDataList,
        //     headers: { "Content-Type": "multipart/form-data" }
        // }).then(function(response) {
        //     console.log(response)
        // }).catch((err) => {
        //     console.log(err)
        // })
        // try {
        //     // await axios.post("/post/submit", {
        //     //     name : "씨발",
        //     //     what : "이거 되면 님 뒤짐 씨발"
        //     // }).then(response=>{console.log(response)})
        //         await axios.post("/post/submit", formDataList, {
        //         headers: { 'Content-Type': 'multipart/form-data' },
        //     }).then(response=>{console.log(response)})
        // } catch (error) {
        //     console.error('로그를 게시하는 중 오류 발생:', error);
        // }
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
            // const blobData = data.blob();
            // console.log(blobData);
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

                // front + back
                // await axios.post(`http://localhost:8080/detail/${data.id}`,{
                //     userId : userInfo.id,
                //     detailPageLog : formattedDate,
                // })
                // .then(response=>{console.log(response)})
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