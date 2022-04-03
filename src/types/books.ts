import {UserType} from "./user";
import {CityType} from "./types";

export type GenreType = {
    id:number,
    name: string
}

export type CreateGenreType ={
    name: string
}

export type AttachGenreType={
    name: string,
    bookId: number
}

export interface IOption{
    value?: string
    label?: string
}

export type CommentType = {
    id: number,
    text: string,
    authorId: number,
    author?: string,
    authorImg?: string,
    bookId?: number,
    commentId?: number|null,
    createdAt?: string,
    comments?: CommentType[]
}

export type CreateCommentType = {
    text: string,
    authorId: number,
    author?: string,
    authorImg?: string,
    bookId?: number,
    commentId?: number|null,
    createdAt?: string,
    comments?: CommentType[]
}

export type BookCityType = {
    book?: BookType,
    city?: CityType
}

export type BookType = {
    id?: number,
    title?: string,
    author?: string,
    notes?: string,
    img?: string | null,
    cost?: string,
    conditions?: string,
    userId?: number,
    state?: string,
    user?: UserType,
    genres?: GenreType[],
    comments?: CommentType[],
}

export type CreateBookType = {
    title: string,
    author: string,
    notes: string,
    img?: FileList | string,
    cost: string,
    conditions: string,
    userId?: number,
    state: string
}

export type UpdateBookType = {
    id: number,
    title: string,
    author: string,
    notes: string,
    cost: string,
    conditions: string,
    img: string|FileList,
    userId: number,
    state: string,
}

export type SavedBookType = {
    id?: number,
    userId: number,
    bookId: number
}


