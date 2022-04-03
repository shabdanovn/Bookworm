import axios from "axios";
import {API_URL} from "../utils/constants";
import authHeader from "./auth-header";
import {UpdateWithoutImageUserType} from "../types/user";

const getUser =async (id:number) => {
    const response = await axios.get(`${API_URL}/users/${id}`, {
        headers:{
            Authorization: "Bearer " + authHeader()
        }
    })

    let newUser = {
        id: response.data.id,
        username: response.data.username,
        img: response.data.img
    }

    localStorage.setItem('user', JSON.stringify(newUser))
    return response.data
}

const updateUserWithImage =async (data: FormData) => {
    const response = await axios.put(`${API_URL}/users/with-image`, data,{
        headers:{
            Authorization: "Bearer " + authHeader()
        }
    })

    return response.data
}

const updateUserWithoutImage =async (data: UpdateWithoutImageUserType) => {
    const response = await axios.put(`${API_URL}/users/without-image`, data,{
        headers:{
            Authorization: "Bearer " + authHeader()
        }
    })

    return response.data
}

const UserService = {getUser, updateUserWithImage, updateUserWithoutImage}

export default UserService