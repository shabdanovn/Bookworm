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
    user_id: number,
    genre?: string,
    state?: string
}

export type UserType = {
    id: number,
    username: string,
    email: string,
    fullname: string,
    img: string,
    city_id: number,
    city?: string
    phone: string
}

export type CommentType = {
    id: number,
    text: string,
    author_id: number,
    post_id: number,
    comment_id?: number,
    date: Date
}
