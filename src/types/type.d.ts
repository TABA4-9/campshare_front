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

    isLended : boolean,
}

type dropwDownOption = {
    value : number,
    label : string
}

type UserInfoType = {
    id : number,
    name : string,
    email : string,
    accessToken : string,
    LendItem? : CampingItemType[],
    RentItem? : CampingItemType[],
}