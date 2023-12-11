import {useState, useEffect} from "react";

import picture1 from '../assets/picture1.jpg';
import DropDownForm from '../components/form/DropDownForm';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { useRecoilState } from "recoil";
import { Link, useSearchParams } from "react-router-dom";
import SearchItem from "../components/SearchItem";
import axios from "axios";
import { userInfoAtom } from "../data/userInfoAtom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function SearchResult() {
    const [campItem, setCampItem] = useState<CampingItemType[]>([]);
    const [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom);

    const [searchParams, setSearchParams] = useSearchParams();
    const searchFilter: string|null = searchParams?.get('searchInput');

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/product/data/search?searchInput=${searchFilter}`);
            const data = response.data;
            setCampItem(data);
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };

    useEffect(()=>{
        fetchData();
    }, [campItem])

    return (
        <div className="flex flex-col px-10">
            <SearchItem/>
            {
                campItem.length !== 0 ? (
                    <div className="text-center my-16">
                        <p className="text-3xl font-semibold">
                        {searchFilter}{`(으)`}로 검색된 결과가 총 {campItem.length} 건 있습니다.
                        </p>
                    </div>
                ) : (
                    <div className="text-center my-16">
                        <p className="text-3xl font-semibold">
                        {searchFilter}{`(으)`}로 검색된 결과가 존재하지 않습니다.
                        </p>
                    </div>
                )
            }
            <div>
                <div className="flex flex-col my-16">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {    
                                campItem.map((item, index) => {
                                    return (
                                        <Grid item xs={2} sm={4} md={3} key={index}>
                                            <Item>
                                                <div className="flex">
                                                    <div className="flex-col justify-start items-start flex">
                                                        <Link to={`/detail/${item.id}`} state={{item : item}}><img className="w-full h-[200px]" src={item.imagePath[0]} alt="camping item img"/></Link>
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