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