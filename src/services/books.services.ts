import axios from "axios";
import {API_URL} from "../utils/constants";
import {AttachGenreType, CreateBookType, UpdateBookType} from "../types/books";
import authHeader from "./auth-header";

const createBook=async (data: CreateBookType)=> {
    try{
        const response = await axios.post(`${API_URL}/books`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const getAllBooks=async ()=> {
    try{
        const response = await axios.get(`${API_URL}/books`)
        return response.data
    }catch (e){
        return e
    }
}

const getBook=async (id:number)=> {
    try{
        const response = await axios.get(`${API_URL}/books/${id}`)
        return response.data
    }catch (e){
        return e
    }
}

const deleteBook=async (id:number)=> {
    try{
        const response = await axios.delete(`${API_URL}/books/${id}`)
        return response.data
    }catch (e){
        return e
    }
}

const getSearchedBooks=async (word:string)=> {
    try{
        const response = await axios.get(`${API_URL}/books/search/${word}`)
        return response.data
    }catch (e){
        return e
    }
}

const getFilteredBooks=async (word:string)=> {
    try{
        const response = await axios.get(`${API_URL}/books/search/genre/${word}`)
        return response.data
    }catch (e){
        return e
    }
}

const updateBookWithImage=async (data: UpdateBookType)=> {
    try{
        const response = await axios.put(`${API_URL}/books/with-image`, data)
        return response.data
    }catch (e){
        return e
    }
}

const updateBookWithoutImage=async (data: UpdateBookType)=> {
    try{
        const response = await axios.put(`${API_URL}/books/without-image`, data)
        return response.data
    }catch (e){
        return e
    }
}

const addGenreToBook=async (genre: AttachGenreType)=> {
    try{
        const response = await axios.post(`${API_URL}/books/genre`, genre)
        return response.data
    }catch (e){
        return e
    }
}

const getCity=async (id: number)=>{
    try{
        const response = await axios.get(`${API_URL}/cities/${id}`)
        return response.data
    }catch (e){
        return e
    }
}

const BookService = {createBook, getBook, deleteBook,
    getSearchedBooks, addGenreToBook, getAllBooks, getFilteredBooks,
    updateBookWithImage, updateBookWithoutImage, getCity}
export default BookService