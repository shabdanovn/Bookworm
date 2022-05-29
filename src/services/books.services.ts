import axios from "axios";
import {API_URL} from "../utils/constants";
import {AttachGenreType, CommentType, CreateCommentType, SavedBookType, UpdateBookType} from "../types/books";
import authHeader from "./auth-header";

const addGenreToBook=async (genre: AttachGenreType)=> {
    try{
        const response = await axios.post(`${API_URL}/books/genre`, genre,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

enum GenreEnum{
    "Detective"="Detective",
    "Детектив"="Detective",
    "Sci-Fi"="Sci-Fi",
    "Илимий-Фантастикалык"="Sci-Fi",
    "Научная фантастика"="Sci-Fi",
    "Horror"="Horror",
    "Ужас"="Horror",
    "Ужасы"="Horror",
    "Adventure"="Adventure",
    "Укмуштуу окуялар"="Adventure",
    "Приключение"="Adventure",
    "Biography"="Biography",
    "Өмүр баяны"="Biography",
    "Биография"="Biography",
    "Business"="Business",
    "Бизнес"="Business",
    "Classics"="Classics",
    "Классика"="Classics",
    "Crime"="Crime",
    "Кылмыш"="Crime",
    "Преступление"="Crime",
    "Fantasy"="Fantasy",
    "Фантастика"="Fantasy",
    "History"="History",
    "История"="History",
    "Тарых"="History",
    "Literary"="Literary",
    "Адабий"="Literary",
    "Литература"="Literary",
    "Mystery"="Mystery",
    "Мистика"="Mystery",
    "Poetry"="Poetry",
    "Поэзия"="Poetry",
    "Romans"="Romans",
    "Романы"="Romans",
    "Романдар"="Romans",
    "Thriller"="Thriller",
    "Триллер"="Thriller",
    "Adult"="Adult",
    "Чондор учун"="Adult",
    "Взрослое"="Adult",
    "Education"="Education",
    "Билим"="Education",
    "Образование"="Education"
}

const createBook=async (data: FormData, genre:string)=> {
    try{
        // @ts-ignore
        const temp = GenreEnum[`${genre}`]
        // console.log(temp)
        await axios.post(`${API_URL}/books`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
            .then((response) => addGenreToBook({name: temp, bookId: response.data.id}))
    }catch (e){
        return e
    }
}

const getAllBooks=async ()=> {
    try{
        const response = await axios.get(`${API_URL}/books`, {withCredentials: false})
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

const getUsersBooks=async (id:number)=> {
    try{
        const response = await axios.get(`${API_URL}/books/my/${id}`,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const getSavedBooks = async (userId:number)=> {
    try{
        const response = await axios.get(`${API_URL}/saved-books/${userId}`,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const saveBook = async (data: SavedBookType)=> {
    try{
        const response = await axios.post(`${API_URL}/saved-books`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const removeSavedBook = async (data: SavedBookType)=> {
    try{
        const response = await axios.delete(`${API_URL}/saved-books`, {
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

const deleteBook=async (id:number, userId:number)=> {
    try{
        const response = await axios.delete(`${API_URL}/books`,{
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
        // @ts-ignore
        const temp = GenreEnum[`${word}`]
        const response = await axios.get(`${API_URL}/books/search/genre/${temp}`)
        return response.data
    }catch (e){
        return e
    }
}

const updateBookWithImage=async (data: FormData)=> {
    try{
        const response = await axios.put(`${API_URL}/books/with-image`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const updateBookWithoutImage=async (data: UpdateBookType)=> {
    try{
        const response = await axios.put(`${API_URL}/books/without-image`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
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

const createComment=async (data: CreateCommentType)=> {
    try{
        const response = await axios.post(`${API_URL}/comments`, data,{
            headers: {
                Authorization: 'Bearer ' + authHeader()
            }
        })
        return response.data
    }catch (e){
        return e
    }
}

const getComments=async (id:number)=> {
    try{
        const response = await axios.get(`${API_URL}/comments/${id}`)
        return response.data
    }catch (e){
        return e
    }
}

const BookService = {createBook, getBook, deleteBook,
    getSearchedBooks, addGenreToBook, getAllBooks, getFilteredBooks,
    createComment, getComments, getUsersBooks,
    saveBook, getSavedBooks, removeSavedBook,
    updateBookWithImage, updateBookWithoutImage, getCity}
export default BookService