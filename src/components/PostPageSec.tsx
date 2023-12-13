import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

import { SelectChangeEvent } from '@mui/material/Select';

import Button from '@mui/material/Button';

import { useState } from "react";
import ItemDetailModal from "./form/modal/ItemDetailModal";

import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import UploadFileModal from "./form/modal/UploadFileModal";
import { useLocation } from "react-router-dom";


interface propsType {
    DetailItem : string,
    handlePage : () => void,
    onChange : (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent<string>) => void,
    itemPrice : string,
    tradeAddress : string,
    productSubmit : (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    fileList : File[],
    setFileList : React.Dispatch<React.SetStateAction<File[]>>,
    modifyFilePath : string[],
    recommandPrice : number | undefined,
    setModifyFilePath : React.Dispatch<React.SetStateAction<string[]>>,
}

export default function PostPageSec({DetailItem, itemPrice, handlePage, onChange, tradeAddress, productSubmit, fileList, setFileList, modifyFilePath, setModifyFilePath, recommandPrice} : propsType) {
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [showUploadFileModal, setShowUploadFileModal] = useState<boolean>(false);
    const [explanation, setExplnation] = useState<string>(DetailItem ? DetailItem.slice(0,8) + "..." : "입력하기...");
    const urlLocation = useLocation();
    const urlPathname:string = urlLocation.pathname;
    const closeDetailModal = () => {
        setShowDetailModal(false);
    }

    const handleShowFile = () => {
        setShowUploadFileModal(true);
    }

    const closeUploadFileModal = () => {
        setShowUploadFileModal(false);
    }

    const checkDetail = () => {
        if(DetailItem.length > 8) {
            let strSlice = DetailItem.slice(0,8) + "...";
            setExplnation(strSlice);
        }
        else if(!DetailItem) {
            setExplnation("입력하기...")
        }
        else {
            setExplnation(DetailItem);
        }
        closeDetailModal();
    }

    const saveFileImage = async (e:any) => {
        e.preventDefault();
        const uploadFile = e.target.files[0];
        let newDataList = [...fileList, uploadFile];
        setFileList(newDataList);
      };

    return (
        <div className="flex flex-col w-6/12 float-right p-4 justify-around">
            <div className="flex h-full flex-col">
                <div className="flex flex-col">
                        <strong className="text-base">상품 이미지</strong>
                        <div className="flex w-full text-center mt-3 text-sm border rounded-md border-solid border-gray-300 px-4 py-2 text-gray-700">
                            <label className="w-full hover:cursor-pointer" htmlFor="file">Upload</label>
                            <input
                                style={{display:"none"}} 
                                type="file" 
                                id="file"
                                name="itemImage"
                                accept="image/*"
                                onChange={saveFileImage}
                                multiple
                            />
                        </div>
                        <button onClick={()=> handleShowFile()} className="mt-3 text-sm border rounded-md border-solid border-gray-300 px-4 py-2 text-gray-700">
                            업로드 파일 보기
                        </button>
                        {/* 이미지가 업로드 되었다면 해당 파일 명을 보여줄 것. */}
                </div>
                <div className="flex flex-col pt-4">
                    <strong className="text-base">상품 설명</strong>
                    <button onClick={()=> setShowDetailModal(true)} className="mt-3 text-sm border rounded-md border-solid border-gray-300 px-4 py-2 text-gray-700">
                        {explanation}
                    </button>
                </div>
                <div className="flex flex-col pt-4">
                    <strong className="text-base pb-3">가격</strong>
                    <FormControl size="small" variant="outlined">
                        <OutlinedInput
                            name="PriceItem"
                            id="outlined-adornment-weight"
                            placeholder={`추천 가격 ${recommandPrice !== undefined ? recommandPrice : ""}`}
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                            'aria-label': 'weight',
                            }}
                            value={itemPrice}
                            onChange={onChange}
                        />
                        <FormHelperText id="outlined-weight-helper-text">price</FormHelperText>
                    </FormControl>
                </div>
                <div className="flex flex-col pt-3 pb-2">
                    <strong className="text-base">거래 장소</strong>
                    <input
                        className="pt-3 text-sm bg-transparent border-b-2 border-solid border-gray-300 text-gray-500 box-border font-arvo h-50 w-400 focus:outline-none"
                        name="itemTradeAddress"
                        type="text"
                        value={tradeAddress}
                        onChange={onChange}
                        placeholder="ex) 경기도 용인시 수지구 풍덕천동..."
                    />
                </div>
            </div>
            <div className="flex flex-col align-middle w-full ">
                <button 
                    onClick={(e)=>productSubmit(e)} 
                    className="text-purple-700 w-full hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
                    {urlPathname === "/posts" ? "상품 등록" : "상품 수정"}
                </button>
                <Button variant="outlined" onClick={()=> handlePage()}>
                    <FontAwesomeIcon className="text-[20px] text-black" icon={faArrowLeft} />
                </Button>      
            </div>
            
            <ItemDetailModal 
                showDetailModal={showDetailModal}
                handleClose={closeDetailModal}
                checkDetail={checkDetail}
                DetailItem={DetailItem}
                onChange={onChange}
            />
            <UploadFileModal
                showUploadFileModal = {showUploadFileModal}
                handleClose={closeUploadFileModal}
                fileList={fileList}
                setFileList={setFileList}
                modifyFilePath ={modifyFilePath}
                setModifyFilePath = {setModifyFilePath}
            />
        </div>
    )
}