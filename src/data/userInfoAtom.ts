import {atom } from 'recoil';

export const userInfoAtom = atom<UserInfoType>({
    key : 'AllUserInfo',
    default: {
        account : {
            id : 0,
            name : '',
            email : '',
        },
        kakaoAccessToken: '',
        // other properties based on your UserInfoType
    },
})