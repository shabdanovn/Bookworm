import axios from "axios";
import {API_URL} from "../utils/constants";
import {CreateConversationType, CreateMessageType} from "../types/chat";
import authHeader from "./auth-header";



const addConversation =async (data: CreateConversationType) => {
    try{
        const response = await axios.post(`${API_URL}/conversations`, data, {
            headers: {
                Authorization: "Bearer " + authHeader()
            }
        })

        return response.data
    }catch (e) {
        return e
    }
}

const getConversations =async (id:number) => {
    try{
        const response = await axios.get(`${API_URL}/conversations/${id}`,{
            headers: {
                Authorization: "Bearer " + authHeader()
            }
        })

        return response.data
    }catch (e) {
        return e
    }
}

const addMessage =async (data: CreateMessageType) => {
    try{
        const response = await axios.post(`${API_URL}/messages`, data, {
            headers: {
                Authorization: "Bearer " + authHeader()
            }
        })

        return response.data
    }catch (e) {
        return e
    }
}

const getMessages =async (id:number) => {
    try{
        const response = await axios.get(`${API_URL}/messages/${id}`, {
            headers: {
                Authorization: "Bearer " + authHeader()
            }
        })

        return response.data
    }catch (e) {
        return e
    }
}

const chatService = {
    addConversation, getConversations,
    addMessage, getMessages
}

export  default chatService