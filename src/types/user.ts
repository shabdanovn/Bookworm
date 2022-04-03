import {CityType} from "./types";

export type UserType = {
    id?: number,
    email?:string,
    username?:string,
    fullname?: string,
    img?: string | null,
    phone?: string,
    cityId?:number,
    city?: CityType
}

export type UpdateWithoutImageUserType = {
    id: number,
    email:string,
    username:string,
    fullname: string,
    phone: string,
    cityName: string
}

export interface IData {
    data: FormData
    userId: number
}