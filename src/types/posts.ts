export type PostType = {
    id: number,
    img: string,
    username: string,
    userId: number,
    description: string
}

export type CreatePostType = {
    user_id: number, //fk
    img: string,
    username: string,
    userId: number,
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
    author?: string,
    authorImg?: string,
    postId?: number,
    createdAt?: string,
}
