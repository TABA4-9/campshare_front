type CampingItemType = {
    id : number,
    name : string,
    period : string,
    category : string,
    headcount : number,
    usingYear : string,
    brand : string,
    image : string,
    explanation : string,
    price : string,
    address : string,
    userName : string,
    isLended : boolean,
    postUserId : number,
    recommandItem : CampingItemType[],
    imagePath : string[],
    startDate : string,
    endDate : string,
}

type dropwDownOption = {
    value : string,
    label : string
}

type UserInfoType = {
    id : number,
    name : string,
    email : string,
    kakaoAccessToken : string,
    lendItem? : CampingItemType[],
    rentItem? : CampingItemType[],
}