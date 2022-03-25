import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import BookService from "../../services/books.services";
import {CreateBookType} from "../../types/books";


const initialState = {
    books: [],
    isLoading: false,
    bookInfo: {},
    error: null,
    userCity: {},
    searchedBooks: []
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

export const createBook = createAsyncThunk(
    'books/createBook',
    async (data: CreateBookType,{rejectWithValue})=>{
        try{
            return await BookService.createBook(data)
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
    async (word: string,{rejectWithValue})=>{
        try{
            return await BookService.getFilteredBooks(word)
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
        },

        [createBook.pending.type]: (state) => {
            state.isLoading = true
        },

        [createBook.rejected.type]: (state, {payload}) => {
            state.isLoading = false
            state.error = payload
        },
    }
})

const booksReducer = booksSlice.reducer
export default booksReducer