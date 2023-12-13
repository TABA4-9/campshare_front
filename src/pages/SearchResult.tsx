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
import moment from "moment";
import CalendarModal from "../components/form/modal/CalendarModal";

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

    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const [startDate, setStartDate] = useState<string>(moment(new Date()).format("YYYY[년] MM[월] DD[일]"));
    const [endDate, setEndDate] = useState<string>("");

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/product/data/search?searchInput=${searchFilter}`);
            const data = response.data;
            setCampItem(data);
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };

    const filterDate = (filteredItems:CampingItemType[]) => {
        return filteredItems.filter(item => {
            let formattedItemStartDate:string = item.startDate.replace(/년|월/g, '-').replace('일', '');
            let formattedItemEndDate:string = item.endDate.replace(/년|월/g, '-').replace('일', '');
            let formattedUserStartDate:string = startDate.replace(/년|월/g, '-').replace('일', '');
            let formattedUserEndDate:string = endDate?.replace(/년|월/g, '-').replace('일', '');


            const itemStartDate = new Date(formattedItemStartDate);
            const itemEndDate = new Date(formattedItemEndDate);

            const userStartDate = new Date(formattedUserStartDate);
            const userEndDate = new Date(formattedUserEndDate);

            console.log("userStartDate보다 itemStartDate가 더 큰가");
            console.log(itemStartDate.getTime() >= userStartDate.getTime())

            // formatted 하기 전에 문자 구조 자체가 일치해야함(띄어쓰기 조차 일치해야 비교 가능)
            return ((itemStartDate <= userStartDate) && (userStartDate <= itemEndDate)) && ((userEndDate >= itemStartDate) && (userEndDate <=itemEndDate));
        })
    }

    // 문제 => 필터 누적이 안됨
    const filteredCampItems = () => {
        let dateFilterCheck = endDate !== "";
        
        let filteredItems = campItem.slice(); // 새로운 배열을 만들어 복사
    
        // 날짜 필터 적용
        if (dateFilterCheck) {
            filteredItems = filterDate(filteredItems);
        }

        console.log(filteredItems);
    
        // 최종 필터된 배열 반환
        return filteredItems;
        
    }

    const handleClose = () => {
        setShowCalendar(false);
    }

    const onChangeDate = (e:any) :void => {
        const startDateFormat = moment(e[0]).format("YYYY[년] MM[월] DD[일]");
        const endDateFormat = moment(e[1]).format("YYYY[년] MM[월] DD[일]");
        setStartDate(startDateFormat);
        setEndDate(endDateFormat);
    }

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
                        {searchFilter}{`(으)`}로 검색된 결과가 총 {endDate ? filteredCampItems().length : campItem.length} 건 있습니다.
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
            <div className="flex justify-between">
                <div></div>
                <div className="flex flex-col">
                    <strong>날짜 설정</strong>
                    <button onClick={()=>setShowCalendar(true)} className="w-[300px] h-[50px] bg-gray-300 rounded-lg mt-2">{startDate} ~ {endDate}</button>
                </div>
            </div>
            <div>
                <div className="flex flex-col my-16">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {    
                                filteredCampItems().length !== 0 ? (filteredCampItems().map((item, index) => {
                                    return (
                                        <Grid item xs={2} sm={4} md={3} key={index}>
                                            <Item>
                                                <div className="flex">
                                                    <div className="flex-col justify-start items-start flex">
                                                        {
                                                        <Link to={`/detail/${item.id}`} state={{item : item}}><img className="object-cover w-[330px] h-[200px]" src={item.imagePath[0]} alt="camping item img"/></Link>}
                                                        <div className="w-full h-full flex flex-col justify-center items-center mt-2">
                                                            <div className="text-stone-900 text-base font-medium font-['Poppins']"><strong>{item.name}</strong></div>
                                                            <div className="text-stone-900 text-opacity-50 text-base font-medium font-['Poppins']">{item.price} ₩ / 일</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Item>
                                        </Grid>
                                    ) 
                                })) : (<div className="flex w-full justify-center my-32 pb-8"><strong>조회된 결과가 존재하지 않습니다.</strong></div>)
                            }
                        </Grid>
                    </Box>
                </div>
            </div>

            <CalendarModal
                showCalendar={showCalendar}
                handleClose={handleClose}
                onChangeDate={onChangeDate}
            />
        </div>
    )
}