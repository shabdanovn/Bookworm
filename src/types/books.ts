import {UserType} from "./user";

export type GenreType = {
    id:number,
    name: string
}

export type CommentType = {
    id: number,
    text: string,
    authorId: number,
    author: string,
    authorImg: string,
    bookId?: number,
    commentId?: number|null,
    createdAt: string
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
    genres?: GenreType[]
}

export type CreateBookType = {
    title: string,
    author: string,
    notes?: string,
    img: FileList,
    cost?: string,
    conditions?: string,
    userId: number,
    state: string
}

export type UpdateBookType = {
    id: number,
    title: string,
    author: string,
    notes: string,
    img?: FileList | null,
    cost: string,
    conditions: string,
    userId: number,
    state: string,
}

export type AttachGenreType={
    name: string,
    bookId: number
}

