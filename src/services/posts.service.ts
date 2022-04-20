import axios from "axios";
import {API_URL} from "../utils/constants";
import authHeader from "./auth-header";
import {PostCreateCommentType, SavePostType, UpdatePostType} from "../types/posts";


const getPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/posts`)
        return response.data
    }catch (e) {
        return e
    }
}

const getPost = async (id:number) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${id}`)
        return response.data
    }catch (e) {
        return e
    }
}

const createPost = async (data:FormData) => {
    try{
        const response = await axios.post(`${API_URL}/posts`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })

        return response.data
    }catch (e){
        return e
    }
}

const getUsersPosts=async (id:number)=> {
    try{
        const response = await axios.get(`${API_URL}/posts/my-posts/${id}`,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const getSavedPosts = async (userId:number)=> {
    try{
        const response = await axios.get(`${API_URL}/saved-posts/${userId}`,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const savePost = async (data: SavePostType)=> {
    try{
        const response = await axios.post(`${API_URL}/saved-posts`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const removeSavedPost = async (data: SavePostType)=> {
    try{
        const response = await axios.delete(`${API_URL}/saved-posts`, {
            headers: {
                Authorization: 'Bearer ' + authHeader()
            },
            data
        })
        return response.data
    }catch (e){
        return e
    }
}

const deletePost=async (id:number, userId:number)=> {
    try{
        const response = await axios.delete(`${API_URL}/posts`,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            },
            data: {id, userId}
        })
        return response.data
    }catch (e){
        return e
    }
}

const updatePostWithImage=async (data: FormData)=> {
    try{
        const response = await axios.put(`${API_URL}/posts/with-image`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const updatePostWithoutImage=async (data: UpdatePostType)=> {
    try{
        const response = await axios.put(`${API_URL}/posts/without-image`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const createPostComment=async (data: PostCreateCommentType)=> {
    try{
        const response = await axios.post(`${API_URL}/post-comments`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const getPostComments=async (id:number)=> {
    try{
        const response = await axios.get(`${API_URL}/post-comments/${id}`)
        return response.data
    }catch (e){
        return e
    }
}

const postsService = {
    getPosts, getPost, createPost,
    getUsersPosts, getSavedPosts, savePost,
    removeSavedPost, deletePost, updatePostWithImage,
    updatePostWithoutImage, getPostComments, createPostComment
}

export default postsService
