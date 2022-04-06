import {Dispatch, SetStateAction} from "react";

export type TypeSetState<T> = Dispatch<SetStateAction<T>>

export type CityType = {
    id?: number,
    name?: string
}

export type BookItemType = {
    id: number,
    title: string,
    author: string,
    description?: string,
    img: string,
    cost: string,
    conditions: string,
    user_id: number,
    genre?: string,
    state?: string
}

export type ExampleCommentType = {
    id: number,
    text: string,
    author: string,
    children: ExampleCommentType[]
}