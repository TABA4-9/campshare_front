import {atom } from 'recoil';

export const userInfoAtom = atom<UserInfoType>({
    key : 'AllUserInfo',
    default: {
        name: '',
        IsPosted: false,
        email: '',
        accessToken: '',
        // other properties based on your UserInfoType
    },
})