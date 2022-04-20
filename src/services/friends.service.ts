import {CreateFriendType} from "../types/friends";
import axios from "axios";
import {API_URL} from "../utils/constants";
import authHeader from "./auth-header";

const followUser = async (data: CreateFriendType) => {
    try{
        const response = await axios.put(`${API_URL}/followings/follow`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })

        return response.data
    }catch (e){
        return e
    }
}

const unfollowUser = async (data: CreateFriendType) => {
    try{
        const response = await axios.put(`${API_URL}/followings/unfollow`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })

        return response.data
    }catch (e){
        return e
    }
}

const getFollowers = async (userId: number) => {
    try{
        const response = await axios.get(`${API_URL}/followings/followers/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const getFollowings = async (userId: number) => {
    try{
        const response = await axios.get(`${API_URL}/followings/followings/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const getFriendsCount = async (userId: number) => {
    try{
        const response = await axios.get(`${API_URL}/followings/friends/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const FriendsService = {
    followUser, unfollowUser,
    getFollowers, getFollowings, getFriendsCount
}

export default FriendsService

