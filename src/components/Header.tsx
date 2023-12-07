import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import {Link, useLocation, useNavigate} from "react-router-dom";
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../data/userInfoAtom';


export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathSegments:string[] = location.pathname.split('/');
    const path:string = `/${pathSegments[1]}`;
    const [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom);

    const handlePosts = () => {
        if (userInfo.account.name === '') {
            alert("로그인 후 이용이 가능합니다.");
            return;
        }
        else navigate('/posts');
    }

    return (
        <div className="flex px-5">
            <div className="flex w-screen justify-between padding p-10">
                <div className="flex">
                    <div className="text-stone-900 text-xl font-normal font-['Asar']"><Link to="/">CAMPSHARE</Link></div>
                    <div className="flex pl-14">
                    <div className="w-[372px] h-[27px] justify-start items-start gap-[50px] inline-flex">
                        <div className={`text-stone-900 text-base font-medium font-['Poppins'] ${path === "/product" ? "font-bold" : "text-opacity-50"}`}><Link to="/product">Product</Link></div>
                        </div>
                    </div>
                </div>
                <div className="w-[71px] h-6 justify-start items-center gap-[23px] inline-flex mr-6">
                    <div className="cursor-pointer " onClick={() => handlePosts()}><FontAwesomeIcon icon={faPenToSquare} /></div>
                    <Link to={`${userInfo.account.name === '' ? '/loginOauth2' : '/mypage'}`}><div><FontAwesomeIcon icon={faUser} /></div></Link>
                </div>
            </div>
        </div>
    )
}