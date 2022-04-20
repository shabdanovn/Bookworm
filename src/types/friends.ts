export type FriendType = {
    id: number
}

export type CreateFriendType = {
    "userId": number,
    "followingId": number
}

export type FriendsCountType = {
    "followings"?: number,
    "followers"?: number
}
