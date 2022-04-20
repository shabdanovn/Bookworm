import {UserType} from "./user";

export type PostType = {
    id?: number,
    img?: string,
    userId?: number,
    description?: string
    user?: UserType
}

export type CreatePostType = {
    img?: FileList,
    authorId: number,
    description: string
}

export type UpdatePostType = {
    id: number,
    authorId: number,
    description: string
}

export type PostCommentType = {
    id: number,
    text: string,
    authorId: number,
    author?: string,
    authorImg?: string,
    postId?: number,
    createdAt?: string,
}

export type PostCreateCommentType = {
    text: string,
    authorId: number,
    postId: number,
}

export type SavePostType = {
    userId: number,
    postId: number
}
