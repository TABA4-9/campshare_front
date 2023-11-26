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
}

type dropwDownOption = {
    value : number,
    label : string
}

type UserInfoType = {
    name : string,
    IsPosted : boolean,
    email : string,
    accessToken : string,
    post? : CampingItemType,
}