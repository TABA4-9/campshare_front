import * as React from 'react';

import picture2 from "../assets/picture2.jpg"
import picture3 from "../assets/picture3.jpg"

import {useState, useEffect} from "react";

import { SelectChangeEvent } from '@mui/material/Select';

import {useNavigate } from 'react-router-dom';

import moment from "moment";

import PostPageFirst from "../components/PostPageFirst";
import PostPageSec from '../components/PostPageSec';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../data/userInfoAtom';

export default function Posts() {
    const navigate = useNavigate();
    const urlLocation = useLocation();
    const urlPathname:string = urlLocation.pathname;

    const [recommandPrice, setRecommandPrice] = useState<number>();

    const [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom);

    const [itemName, setItemName] = useState<string>(urlPathname === "/posts" ? "" : urlLocation.state.item.name);
    const [headcountItem, setHeadCountItem] = useState<string>(urlPathname === "/posts" ? "" : urlLocation.state.item.headcount);
    const [itemBrand, setItemBrand] = useState<string>(urlPathname === "/posts" ? "" : urlLocation.state.item.brand);
    const [DetailItem, setDetailItem] = useState<string>(urlPathname === "/posts" ? "" : urlLocation.state.item.explanation);
    const [CategoryItem, setCategoryItem] = useState<string>(urlPathname === "/posts" ? "" : urlLocation.state.item.category);
    const [usingYearItem, setUsingYearItem] = useState<string>(urlPathname === "/posts" ? "" : urlLocation.state.item.usingYear);
    const [itemPrice, setItemPrice] = useState<string>(urlPathname === "/posts" ? "" : urlLocation.state.item.price);
    const [tradeAddress, setTradeAddress] = useState<string>(urlPathname === "/posts" ? "" : urlLocation.state.item.address);
    const [fileList, setFileList] = useState<File[]>([]);
    const [startDate, setStartDate] = useState<string>(urlPathname === "/posts" ? "" : urlLocation.state.item.startDate);
    const [endDate, setEndDate] = useState<string>(urlPathname === "/posts" ? "" : urlLocation.state.item.endDate);
    const [modifyFilePath, setModifyFilePath] = useState<string[]>(urlPathname === "/posts" ? "" : urlLocation.state.item.imagePath);
    const [page, setPage] = useState<number>(1);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent<string> ) :void => {
        e.preventDefault();
        if(e.target.name === "DetailItem") setDetailItem(e.target.value);
        else if(e.target.name === "CategoryItem") setCategoryItem(e.target.value);
        else if(e.target.name === "usingYearItem") setUsingYearItem(e.target.value);
        else if(e.target.name === "itemName") setItemName(e.target.value);
        else if(e.target.name === "PriceItem") setItemPrice(e.target.value);
        else if(e.target.name === "itemBrand") setItemBrand(e.target.value);
        else if(e.target.name === "headcountItem") setHeadCountItem(e.target.value);
        else if(e.target.name === "itemTradeAddress") setTradeAddress(e.target.value);
    }

    const onChangeDate = (e:any) :void => {
        const startDateFormat = moment(e[0]).format("YYYY[년] MM[월] DD[일]");
        const endDateFormat = moment(e[1]).format("YYYY[년] MM[월] DD[일]");
        setStartDate(startDateFormat);
        setEndDate(endDateFormat);
    }

    const productSubmit = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if(!modifyFilePath && fileList.length === 0) {
            alert("사진을 등록해주세요.");
            return ;
        }

        // fileList to formData
        const formDataList = new FormData();  // formDataList 생성
        let testFileList = [...fileList];
        for(const file of testFileList) {
            formDataList.append('image', file);
            console.log("formDataList에 추가완료");
        }

        // 이전에 이미 있던 사진이라면 그것도 formData에 넣어줌.
        // 근데 이건 url이라 위처럼 image와 동일하게 보내는 것은 맞지 않음.
        // 위는 type이 file이고 아래는 string임.
        if(modifyFilePath) {
            let testFilePath = [...modifyFilePath];
            for(const file of testFilePath) {
                formDataList.append('imageUrl', file);
                console.log("formDataList에 이전 사진 추가완료")
            }
        }

        formDataList.append('name', itemName);
        formDataList.append('brand', itemBrand);
        formDataList.append('category', CategoryItem);
        formDataList.append('usingYear', usingYearItem);
        formDataList.append('headcount', headcountItem);
        formDataList.append('explanation', DetailItem);
        formDataList.append('price', itemPrice);
        formDataList.append('address', tradeAddress);
        formDataList.append('startDate', startDate);
        formDataList.append('endDate', endDate);

        // string or blob 형태만 보낼 수 있음.
        formDataList.append('postUserId', String(userInfo?.account.id));
        formDataList.append('isRented', String(false));

        let apiUrl = 'http://localhost:8080/post/submit';
        
        if(urlPathname !== "/posts") {
            apiUrl = 'http://localhost:8080/product/update';
            formDataList.append('id', String(urlLocation.state.item.id));
        }

        await fetch(apiUrl, {
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
            setUserInfo(prev => ({
                ...prev,
                lendItem: data.lendItem  // 여기를 수정
            }));
            alert("상품 등록이 완료되었습니다.");
            navigate("/");
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handlePage = async () => {
        if(page === 1) {
            setPage(2);
            try {
                await axios.post('http://localhost:8080/post/nextPage', {
                    name : itemName,
                    startDate,
                    endDate,
                    category : CategoryItem,
                    headcount : headcountItem,
                    usingYear : usingYearItem,
                    brand : itemBrand,
                })
                .then(response=>{setRecommandPrice(response?.data)})
            } catch (error) {
                console.error('로그를 게시하는 중 오류 발생:', error);
            }
        }
        else setPage(1);
    }

    return (
        <div className="flex bg-slate-300">
            <div className="flex flex-col pb-3 items-center justify-center w-screen h-screen">
                <div className="pb-3 text-lg font-bold">{urlPathname === "/posts" ? "상품 등록" : "상품 수정"}</div>
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
                                startDate = {startDate}
                                endDate = {endDate}
                                onChangeDate = {onChangeDate}
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
                                modifyFilePath = {modifyFilePath}
                                setModifyFilePath = {setModifyFilePath}
                                recommandPrice={recommandPrice}
                            />
                    }
                </div>
            </div>
        </div>
    )
}