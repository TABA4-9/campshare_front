import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

import { SelectChangeEvent } from '@mui/material/Select';

import Button from '@mui/material/Button';

import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import DropDownForm from "./form/DropDownForm";


interface propsType {
    handlePage : () => void,
    onChange : (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent<string>) => void,
    itemPeriod : string,
    itemPrice : string,
}

const periodOptions:dropwDownOption[] = [
    { value: 10, label: '1박 2일' },
    { value: 20, label: '2박 3일' },
    { value: 30, label: '3박 4일' },
    { value: 40, label: '4박 5일' },
    { value: 50, label: '5일 이상' },
];

export default function PostPageSec({handlePage, onChange, itemPrice, itemPeriod} : propsType) {
    // 가격 => 적정 가격 보여주는 것도 따로
    // 사진

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
                                accept="image/*"
                            />
                        </div>
                        {/* 이미지가 업로드 되었다면 해당 파일 명을 보여줄 것. */}
                </div>
                <div className="flex flex-col pt-4">
                    <strong className="text-base pb-3">가격</strong>
                    {/* 가격을 받을 때, string만 받는데 여기서 숫자로 된 string만 받도록 검사하는 건 나중에 추가 */}
                    <FormControl size="small" variant="outlined">
                        <OutlinedInput
                            name="PriceItem"
                            id="outlined-adornment-weight"
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
                <div className="flex flex-col pt-4">
                    <DropDownForm
                        title="기간 설정"
                        label="period"
                        name="PeriodItem"
                        value={itemPeriod}
                        onChange={onChange}
                        options={periodOptions}
                    />
                    {/* 빌려주는 사람은 기간 설정을 그냥 1박 2일, 2박 3일 이렇게 약간 추상적으로 지정 하는 반면에
                    빌리는 사람은 캘린더로 지정하면, 이후에 카테고리에서 기간 설정으로 filter를 하면
                    빌리는 사람은 캘린더로 지정한 일정이 총 1박 2일인지, 2박 3일인지를 프론트에서 체크해서 그거를 따로
                    빌려주는 사람의 기간 설정과 매칭해서 보여주겠다 이건가 */}

                    {/* 일단 빌리는 사람이나 빌려주는 사람이나 드롭박스 형식으로 몇박 며칠을 원하는지 설정하게 만드는게
                    일관성 있고 component 유지보수 하기에도 편해서 안 그러면 빌려주는 사람을 위한 component, 빌리는 사람을 위한 component 따로 만들어야 함
                    + 알고리즘 적용 시에도 "빌리는 사람은 캘린더로 지정한 일정이 총 1박 2일인지, 2박 3일인지를 프론트에서 체크해서 그거를 따로
                    빌려주는 사람의 기간 설정과 매칭해서 보여주겠다"를 적용해야 하기 때문에 시간 너무 잡아먹음
                    */}
                </div>
            </div>
            <div className="flex flex-col align-middle w-full ">
                <button 
                    type="button" 
                    className="text-purple-700 w-full hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
                        상품 등록
                </button>
                <Button variant="outlined" onClick={()=> handlePage()}>
                    <FontAwesomeIcon className="text-[20px] text-black" icon={faArrowLeft} />
                </Button>      
            </div>
        </div>
    )
}