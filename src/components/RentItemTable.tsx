import { useRecoilState } from "recoil";
import { userInfoAtom } from "../data/userInfoAtom";
import { Link } from "react-router-dom";

export default function RentItemTable() {
    const [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            상품 이름
                        </th>
                        <th scope="col" className="px-6 py-3">
                            기간
                        </th>
                        <th scope="col" className="px-6 py-3">
                            카테고리
                        </th>
                        <th scope="col" className="px-6 py-3">
                            가격
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userInfo.rentItem && userInfo.rentItem.map((item,index)=>{
                            return (
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <Link to={`/detail/${item.id}`} state={{item : item}}>{item.name}</Link>
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.period}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.price}원
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}