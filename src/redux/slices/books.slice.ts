import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import BookService from "../../services/books.services";
import {AttachGenreType, CommentType, CreateCommentType,} from "../../types/books";


const initialState = {
    books: [],
    isLoading: false,
    bookInfo: {},
    error: null,
    userCity: {},
    searchedBooks: [],
    comments: []
}

export const getAllBooks = createAsyncThunk(
    'books/getAllBooks',
    async (_,{rejectWithValue})=>{
        try{
            return await BookService.getAllBooks()
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getBook = createAsyncThunk(
    'books/getBook',
    async (id:number,{rejectWithValue, dispatch})=>{
        try{
            const response = await BookService.getBook(id)
            dispatch(getCity(response.user.cityId))
            return response
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getCity = createAsyncThunk(
    'books/getCity',
    async (id:number,{rejectWithValue})=>{
        try{
            return await BookService.getCity(id)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

interface ICreateBook{
    data: FormData
    genre: string
}

export const createBook = createAsyncThunk(
    'books/createBook',
    async ({data, genre}:ICreateBook,{rejectWithValue, dispatch})=>{
        try{
            await BookService.createBook(data, genre)
                .then(() => dispatch(getAllBooks()))
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const attachGenreToBook = createAsyncThunk(
    'books/attachGenreToBook',
    async (data: AttachGenreType,{rejectWithValue})=>{
        try{
            return await BookService.addGenreToBook(data)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getSearchedBooks = createAsyncThunk(
    'books/getSearchBooks',
    async (word: string,{rejectWithValue})=>{
        try{
            return await BookService.getSearchedBooks(word)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getFilteredBooks = createAsyncThunk(
    'books/getFilteredBooks',
    async (word: string,{rejectWithValue, dispatch})=>{
        try{
            return await BookService.getFilteredBooks(word)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const deleteBook = createAsyncThunk(
    'books/deleteBook',
    async (id: number,{rejectWithValue})=>{
        try{
            return await BookService.deleteBook(id)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getComments = createAsyncThunk(
    'books/getComments',
    async (id: number,{rejectWithValue})=>{
        try{
            return await BookService.getComments(id)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const createComment = createAsyncThunk(
    'books/createComment',
    async (data: CreateCommentType,{rejectWithValue, dispatch})=>{
        try{
            const response = await BookService.createComment(data)
            dispatch(getComments(response.bookId))
            return response
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)



const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers:{},
    extraReducers: {
        [getAllBooks.fulfilled.type]: (state, {payload}) => {
            state.isLoading = false
            state.books = payload
        },

        [getAllBooks.pending.type]: (state) => {
            state.isLoading = true
        },

        [getAllBooks.rejected.type]: (state, {payload}) => {
            state.isLoading = false
            state.error = payload
            state.books=[]
        },

        [getSearchedBooks.fulfilled.type]: (state, {payload}) => {
            state.isLoading = false
            state.searchedBooks = payload
        },

        [getSearchedBooks.pending.type]: (state) => {
            state.isLoading = true
        },

        [getSearchedBooks.rejected.type]: (state, {payload}) => {
            state.isLoading = false
            state.error = payload
            state.searchedBooks=[]
        },

        [getFilteredBooks.fulfilled.type]: (state, {payload}) => {
            state.isLoading = false
            state.searchedBooks = payload
        },

        [getFilteredBooks.pending.type]: (state) => {
            state.isLoading = true
        },

        [getFilteredBooks.rejected.type]: (state, {payload}) => {
            state.isLoading = false
            state.error = payload
            state.searchedBooks=[]
        },

        [getBook.fulfilled.type]: (state, {payload}) => {
            state.isLoading = false
            state.bookInfo = payload
        },

        [getBook.pending.type]: (state) => {
            state.isLoading = true
        },

        [getBook.rejected.type]: (state, {payload}) => {
            state.isLoading = false
            state.error = payload
            state.bookInfo={}
        },

        [getCity.fulfilled.type]: (state, {payload}) => {
            state.isLoading = false
            state.userCity = payload
        },

        [getCity.pending.type]: (state) => {
            state.isLoading = true
        },

        [getCity.rejected.type]: (state, {payload}) => {
            state.isLoading = false
            state.error = payload
            state.userCity={}
        },

        [createBook.fulfilled.type]: (state) => {
            state.isLoading = false
            // state.books = [...state.books, payload]
        },

        [createBook.pending.type]: (state) => {
            state.isLoading = true
        },

        [createBook.rejected.type]: (state, {payload}) => {
            state.isLoading = false
            state.error = payload
        },
        [deleteBook.pending.type]: (state) => {
            state.isLoading = true
        },

        [deleteBook.rejected.type]: (state, {payload}) => {
            state.isLoading = false
            state.error = payload
        },

        [createComment.fulfilled.type]: (state, {payload}) => {
            state.isLoading = false
        },

        [createComment.pending.type]: (state) => {
            state.isLoading = true
        },

        [createComment.rejected.type]: (state, {payload}) => {
            state.isLoading = false
            state.error = payload
        },

        [getComments.fulfilled.type]: (state, {payload}) => {
            state.isLoading = false
            state.comments = payload
        },

        [getComments.pending.type]: (state) => {
            state.isLoading = true
        },

        [getComments.rejected.type]: (state, {payload}) => {
            state.isLoading = false
            state.error = payload
        },
    }
})

const booksReducer = booksSlice.reducer
export default booksReducer