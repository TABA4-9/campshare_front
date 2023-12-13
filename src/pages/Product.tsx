import {useState, useEffect} from "react";

import DropDownForm from '../components/form/DropDownForm';

import { SelectChangeEvent } from '@mui/material/Select';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import { Dropdown } from 'flowbite-react';

import { useRecoilState } from "recoil";
import { campingItemAtom } from "../data/campingItemAtom";
import { Link } from "react-router-dom";
import SearchItem from "../components/SearchItem";
import CalendarModal from "../components/form/modal/CalendarModal";
import moment from "moment";

const StyledDropDown = styled(Dropdown)`
    border : 0;

`;

const StyledDropDownForm = styled(DropDownForm)`
    max-width : 180px;
`

const StyledDropdownItem = styled(Dropdown.Item)`
    width : 220px;
    &:hover {
        background-color: transparent; // 배경색을 투명하게 하여 hover 효과 제거
        color: inherit; // 기존 텍스트 색상을 유지하도록 설정
        // 다른 hover 스타일도 여기에 추가할 수 있습니다.
`;

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Category() {
    const [campItem, setCampItem] = useRecoilState<CampingItemType[]>(campingItemAtom);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const [startDate, setStartDate] = useState<string>(moment(new Date()).format("YYYY[년] MM[월] DD[일]"));
    const [endDate, setEndDate] = useState<string>("");

    const [categoryfilter, setCategoryFilter] = useState<string>("");
    const category:string[] = ["텐트", "타프", "랜턴", "화로대", "캠핑의자"];

    const handleClose = () => {
        setShowCalendar(false);
    }

    // 이게 잘 동작하는지부터 확인해야겠네 씨부렐
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

    const onChangeDate = (e:any) :void => {
        const startDateFormat = moment(e[0]).format("YYYY[년] MM[월] DD[일]");
        const endDateFormat = moment(e[1]).format("YYYY[년] MM[월] DD[일]");
        setStartDate(startDateFormat);
        setEndDate(endDateFormat);
    }

    // 문제 => 필터 누적이 안됨
    const filteredCampItems = () => {
        let categoryFilterCheck = categoryfilter !== "";
        let dateFilterCheck = endDate !== "";
        
        let filteredItems = campItem.slice(); // 새로운 배열을 만들어 복사

        if (categoryFilterCheck) {
            filteredItems = filteredItems.filter(value => value.category === categoryfilter);
        }
    
        // 날짜 필터 적용
        if (dateFilterCheck) {
            filteredItems = filterDate(filteredItems);
        }

        console.log(filteredItems);
    
        // 최종 필터된 배열 반환
        return filteredItems;
        
    }
    

    const handleFilter = (value: string) => {
        setCategoryFilter(value);
    };

    useEffect(()=>{
        fetch("http://43.200.250.149:8080/product/data/category")
        .then(res=>res.json())
        .then(data=>{
            setCampItem(data)
        })
    }, [])

    return (
        <div className="flex flex-col px-10">
            <SearchItem/>
            <div className="flex justify-between py-16">
                <div className="flex flex-col">
                    <div className="text-stone-900 text-[25px] font-medium font-['Poppins'] px-1">filter</div>
                    <div className="w-[200px] h-[0px] border border-black"/>
                    <div className="px-1 w-[200px]">
                        <StyledDropDown 
                            label="categoryfilter" 
                            dismissOnClick={false} renderTrigger={() => <span className="text-stone-900 text-base font-light font-['Poppins']">Category
                            <FontAwesomeIcon className="pt-3 pl-28 text-[14px] text-black" icon={faPlus} />
                        </span>}>
                        {
                            category.map((item,index)=>{
                                return (
                                    <StyledDropdownItem className={`${categoryfilter === item ? "font-bold" : null}`} onClick={()=>handleFilter(`${item}`)}>{item}</StyledDropdownItem>
                                )
                            })
                        }
                        </StyledDropDown>
                    </div>
                </div>
                <div className="flex flex-col">
                    <strong>날짜 설정</strong>
                    <button onClick={()=>setShowCalendar(true)} className="w-[300px] h-[50px] bg-gray-300 rounded-lg mt-2">{startDate} ~ {endDate}</button>
                </div>
            </div>

            {/* content */}
            <div className="">
                <div className="flex flex-col ml-52 mb-16">
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
                                                        <Link to={`/detail/${item.id}`} state={{item : item}}><img className="object-cover w-[260px] h-[200px]" src={item.imagePath[0]} alt="camping item img"/></Link>}
                                                        <div className="w-full h-full flex flex-col justify-center items-center mt-2">
                                                            <div className="text-stone-900 text-base font-medium font-['Poppins']"><strong>{item.name}</strong></div>
                                                            <div className="text-stone-900 text-opacity-50 text-base font-medium font-['Poppins']">{item.price} ₩ / 박</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Item>
                                        </Grid>
                                    )
                                })) : (<div className="flex w-full justify-center my-20 mr-52"><strong>조회된 결과가 존재하지 않습니다.</strong></div>)
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