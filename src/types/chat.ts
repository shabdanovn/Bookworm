export type CreateConversationType = {
    senderId: number,
    receiverId: number
}

export type CreateMessageType = {
    conversationId: number,
    senderId: number,
    text: string
}

export type ConversationType = {
    id: number,
    senderId: number,
    receiverId: number
}

export type MessageType = {
    id:number,
    conversationId: number,
    senderId: number,
    text: string,
    createdAt: string|Date
}

export type ConversationItemType = {
    username?: string,
    img?: string,
}

export interface IFriend{
    username: string
    img?: string
}