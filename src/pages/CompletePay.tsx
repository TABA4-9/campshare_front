import { Link } from "react-router-dom";

export default function CompletePay() {
    return (
        <div className="flex flex-col w-full h-full justify-center items-center mt-16 mb-16">
            <div className="font-semibold text-xl">결제 완료</div>
            <div className="flex flex-col justify-around items-center w-[400px] h-[300px] bg-gray-200 mt-4 rounded-3xl">
                <div>결제가 성공적으로 완료되었습니다.</div>
                <div>주문하신 정보는 <span className="font-semibold">마이페이지</span>에서 확인이 가능합니다.</div>
                <div className="flex justify-around items-center w-[350px] h-[40px] rounded-md bg-slate-800 text-white"><Link to='/'>확인</Link></div>
            </div>
        </div>
    )
}