import {useState, useEffect} from "react";

import picture1 from '../assets/picture1.jpg';
import DropDownForm from '../components/form/DropDownForm';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { Dropdown } from 'flowbite-react';

import { useRecoilState } from "recoil";
import { campingItemAtom } from "../data/campingItemAtom";
import { Link, useSearchParams } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function SearchResult() {
    const [campItem, setCampItem] = useRecoilState<CampingItemType[]>(campingItemAtom);

    const [searchParams, setSearchParams] = useSearchParams();
    const searchFilter: string|null = searchParams?.get('searchInput');

    const newCampingItem:CampingItemType[] = campItem.filter((item) => {
        return searchFilter !== null ? item.name.includes(searchFilter) : false
    });

    useEffect(()=>{
        fetch("/product/data/category")
        .then(res=>res.json())
        .then(data=>{
            setCampItem(data)
        })
    }, [])

    return (
        <div className="flex flex-col px-10">
            {/* 이 부분은 무조건 컴포넌트 하나로 빼야겠네 */}
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
            {
                newCampingItem.length !== 0 ? (
                    <div className="text-center my-16">
                        <p className="text-3xl font-semibold">
                        {searchFilter} 로 검색된 결과가 총 {newCampingItem.length} 건 있습니다.
                        </p>
                    </div>
                ) : (
                    <div className="text-center my-16">
                        <p className="text-3xl font-semibold">
                        {searchFilter} 로 검색된 결과가 존재하지 않습니다.
                        </p>
                    </div>
                )
            }
            <div>
                <div className="flex flex-col my-16">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {    
                                newCampingItem.map((item, index) => {
                                    return (
                                        <Grid item xs={2} sm={4} md={3} key={index}>
                                            <Item>
                                                <div className="flex">
                                                    <div className="flex-col justify-start items-start flex">
                                                        <Link to={`/detail/${item.id}`} state={{item : item}}><img className="w-full h-[200px]" src={item.image} alt="camping item img"/></Link>
                                                        <div className="text-stone-900 text-lg font-medium font-['Poppins']">{item.name}</div>
                                                        <div className="text-stone-900 text-opacity-50 text-lg font-medium font-['Poppins']">{item.price} ₩ / 일</div>
                                                    </div>
                                                </div>
                                            </Item>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                </div>
            </div>
        </div>
    )
}