import {atom } from 'recoil';

export const campingItemAtom = atom<CampingItemType[]>({
    key : 'AllCampingItem',
    default : [],
})