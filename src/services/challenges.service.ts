import axios from "axios";
import {API_URL} from "../utils/constants";
import authHeader from "./auth-header";
import {AddUserToChallengeType, ChallengeCreateCommentType, ChallengeType} from "../types/challenges";

const getChallenges = async () => {
    try {
        const response = await axios.get(`${API_URL}/challenges`)
        return response.data
    }catch (e) {
        return e
    }
}

const getChallenge = async (id:number) => {
    try {
        const response = await axios.get(`${API_URL}/challenges/${id}`)
        return response.data
    }catch (e) {
        return e
    }
}

const createChallenge = async (data:FormData) => {
    try{
        const response = await axios.post(`${API_URL}/challenges`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })

        return response.data
    }catch (e){
        return e
    }
}

const getUserCreatedChallenges=async (userId:number)=> {
    try{
        const response = await axios.get(`${API_URL}/challenges/my-created-challenges/${userId}`,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const deleteChallenge=async (challenge: ChallengeType)=> {
    try{
        const response = await axios.delete(`${API_URL}/challenges`, {
            headers: {
                Authorization: 'Bearer ' + authHeader()
            },
            data: challenge
        })
        return response.data
    }catch (e){
        return e
    }
}

const updateChallengeWithImage=async (data: FormData)=> {
    try{
        const response = await axios.put(`${API_URL}/challenges/with-image`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const updateChallengeWithoutImage=async (challenge: ChallengeType)=> {
    try{
        const response = await axios.put(`${API_URL}/challenges/without-image`, challenge,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const addUserToChallenge = async (data: AddUserToChallengeType) => {
    try{
        const response = await axios.post(`${API_URL}/challenges-users`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const getUserInChallenges=async (userId:number)=> {
    try{
        const response = await axios.get(`${API_URL}/challenges-users/${userId}`,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const getChallengeMembers=async (challengeId:number)=> {
    try{
        const response = await axios.get(`${API_URL}/challenges-users/challenge-users/${challengeId}`,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const deleteUserFromChallenge=async (data: AddUserToChallengeType)=> {
    try{
        await axios.delete(`${API_URL}/challenges-users`, {
            headers: {
                Authorization: 'Bearer ' + authHeader()
            },
            data
        })
    }catch (e){
        return e
    }
}

const createChallengeComment=async (data: ChallengeCreateCommentType)=> {
    try{
        const response = await axios.post(`${API_URL}/challenge-comments`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const getChallengeComments=async (challengeId:number)=> {
    try{
        const response = await axios.get(`${API_URL}/challenge-comments/${challengeId}`)
        return response.data
    }catch (e){
        return e
    }
}

const deleteChallengeComment=async (commentID: number)=> {
    try{
        await axios.delete(`${API_URL}/challenge-comments/${commentID}`, {
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
    }catch (e){
        return e
    }
}

const postsService = {
    getChallenges, getChallenge, createChallenge,
    getUserCreatedChallenges, getUserInChallenges,deleteChallenge,
    updateChallengeWithImage, updateChallengeWithoutImage, addUserToChallenge,
    getChallengeMembers, deleteUserFromChallenge,
    createChallengeComment, getChallengeComments, deleteChallengeComment
}

export default postsService
