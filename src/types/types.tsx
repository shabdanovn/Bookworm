import {Dispatch, SetStateAction} from "react";

export type TypeSetState<T> = Dispatch<SetStateAction<T>>

export type BookItemType = {
    id: number,
    title: string,
    author: string,
    description?: string,
    img: string,
    cost: string,
    conditions: string,
    user_id: number
}
