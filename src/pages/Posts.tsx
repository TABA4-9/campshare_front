import picture3 from "../assets/picture3.jpg"

import {useState} from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DropDownForm from "../components/form/DropDownForm";
import ItemDetailModal from "../components/form/modal/ItemDetailModal";
import PostPageFirst from "../components/PostPageFirst";

export default function Posts() {
    const [itemName, setItemName] = useState<string>("");
    const [DetailItem, setDetailItem] = useState<string>("");
    const [CategoryItem, setCategoryItem] = useState<string>("");
    const [usingYearItem, setUsingYearItem] = useState<string>("");
    
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement> | SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>) :void => {
        if(e.target.name === "DetailItem") setDetailItem(e.target.value);
        else if(e.target.name === "CategoryItem") setCategoryItem(e.target.value);
        else if(e.target.name === "usingYearItem") setUsingYearItem(e.target.value);
        else if(e.target.name === "itemName") setItemName(e.target.value);
    }

    return (
        <div className="flex bg-slate-300">
            <div className="flex flex-col pb-3 items-center justify-center w-screen h-screen">
                <div className="pb-3 text-lg font-bold">상품 등록</div>
                <div className="flex w-[550px] h-[550px] bg-white shadow-sharp rounded-md">
                    <div className="flex w-6/12 float-left rounded-md" style={{ minHeight:"80%", backgroundImage: `url(${picture3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}/>
                    <PostPageFirst 
                        DetailItem = {DetailItem}
                        itemName = {itemName}
                        onChange = {onChange}
                        CategoryItem = {CategoryItem}
                        usingYearItem = {usingYearItem}
                    />
                    </div>
                </div>
            </div>
    )
}