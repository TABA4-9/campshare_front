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
    postUserName : string,
    postUserEmail : string,
    isRented : boolean,
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
    account : userAccount,
    kakaoAccessToken : string,
    lendItem? : CampingItemType[],
    rentItem? : CampingItemType[],
}

type userAccount = {
    id : number,
    name : string,
    email : string,
}

interface RequireContext {
    keys(): string[];
    (id: string): any;
    resolve(id: string): string;
    id: string;
  }
  
  interface NodeRequire {
    context: (directory: string, useSubdirectories: boolean, regExp: RegExp) => RequireContext;
  }