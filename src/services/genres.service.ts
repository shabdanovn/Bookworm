import axios from "axios";
import {API_URL} from "../utils/constants";
import authHeader from "./auth-header";
import {CreateGenreType, GenreType} from "../types/books";

const getGenres = async () => {
    try{
        const response = await axios.get(`${API_URL}/genres`)
        return response.data
    }catch (e){
        return e
    }
}

const createGenre =async (data: CreateGenreType) => {
    try{
        const response = await axios.post(`${API_URL}/genres`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const updateGenre =async (data: GenreType) => {
    try{
        const response = await axios.put(`${API_URL}/genres`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const deleteGenre =async (id:number) => {
    try{
        const response = await axios.delete(`${API_URL}/genres/${id}`,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const genreService = {getGenres, createGenre, updateGenre, deleteGenre}

export default genreService