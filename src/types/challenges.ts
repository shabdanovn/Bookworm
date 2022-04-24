export type CreateChallengeType = {
    img?: string,
    title: string,
    description: string,
    punishment: string,
    start_date: string,
    end_date: string,
    userId: number
}

export type ChallengeType = {
    id:number
    img?: string,
    title: string,
    description: string,
    punishment: string,
    start_date: string,
    end_date: string,
    userId: number
}

export type AddUserToChallengeType = {
    "userId": number,
    "challengeId": number
}

export type ChallengeCommentType = {
    id: number,
    text: string,
    authorId: number,
    author?: string,
    authorImg?: string,
    challengeId?: number,
    createdAt?: string,
}

export type ChallengeCreateCommentType = {
    text: string,
    authorId: number,
    challengeId: number,
}