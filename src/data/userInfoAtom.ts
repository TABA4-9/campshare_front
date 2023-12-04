import {atom } from 'recoil';

export const userInfoAtom = atom<UserInfoType>({
    key : 'AllUserInfo',
    default: {
        id : 0,
        name: '',
        email: '',
        kakaoAccessToken: '',
        // other properties based on your UserInfoType
    },
})