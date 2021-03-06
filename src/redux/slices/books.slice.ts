import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import BookService from "../../services/books.services";
import {
    AttachGenreType,
    BookCityType,
    BookType,
    CommentType,
    CreateCommentType,
    SavedBookType, UpdateBookType,
} from "../../types/books";
import {CityType} from "../../types/types";

interface IInitialState {
    books: BookType[],
    isLoading: boolean,
    bookInfo: BookCityType,
    bookId: number|undefined,
    error: null|string,
    userCity: CityType,
    searchedBooks: BookType[],
    comments: CommentType[],
    myBooks: BookType[],
    savedBooks: BookType[]
}

const initialState:IInitialState = {
    books: [],
    isLoading: false,
    bookInfo: {},
    bookId: undefined,
    error: null,
    userCity: {},
    searchedBooks: [],
    comments: [],
    myBooks: [],
    savedBooks: []
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
            return await BookService.getBook(id)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getUsersBooks = createAsyncThunk(
    'books/getUsersBooks',
    async (id:number,{rejectWithValue, dispatch})=>{
        try{
            return await BookService.getUsersBooks(id)
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

interface IDeleteBook{
    id: number
    userId: number
}

export const deleteBook = createAsyncThunk(
    'books/deleteBook',
    async ({id, userId}:IDeleteBook,{rejectWithValue, dispatch})=>{
        try{
            await BookService.deleteBook(id, userId)
            dispatch(getUsersBooks(userId))
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

export const getSavedBooks = createAsyncThunk(
    'books/getSavedBooks',
    async (id:number,{rejectWithValue, dispatch})=>{
        try{
            return await BookService.getSavedBooks(id)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const saveBook = createAsyncThunk(
    'books/saveBook',
    async (data: SavedBookType,{rejectWithValue, dispatch})=>{
        try{
            await BookService.saveBook(data)
            dispatch(getSavedBooks(data.userId))
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)


export const removeSavedBook = createAsyncThunk(
    'books/removeSavedBook',
    async (data: SavedBookType,{rejectWithValue, dispatch})=>{
        try{
            await BookService.removeSavedBook(data)
            dispatch(getSavedBooks(data.userId))
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const updateBookWithImage = createAsyncThunk(
    'books/updateBookWithImage',
    async (data: FormData,{rejectWithValue, dispatch})=>{
        try{
            await BookService.updateBookWithImage(data)
            dispatch(getAllBooks())
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const updateBookWithoutImage = createAsyncThunk(
    'books/updateBookWithoutImage',
    async (data: UpdateBookType,{rejectWithValue, dispatch})=>{
        try{
            await BookService.updateBookWithoutImage(data)
            dispatch(getAllBooks())
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
    extraReducers: builder => {
        builder.addCase(getAllBooks.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getAllBooks.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.books = payload
        });

        builder.addCase(getAllBooks.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting all books"
        });

        builder.addCase(getUsersBooks.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getUsersBooks.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.myBooks = payload
        });

        builder.addCase(getUsersBooks.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting all books"
        });

        builder.addCase(getSearchedBooks.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getSearchedBooks.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.searchedBooks = payload
        });

        builder.addCase(getSearchedBooks.rejected, (state, action) => {
            state.isLoading = false
            state.searchedBooks=[]
            state.error = action.error.message || "Something wrong with getting searched books"
        });

        builder.addCase(getFilteredBooks.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getFilteredBooks.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.searchedBooks = payload
        });

        builder.addCase(getFilteredBooks.rejected, (state, action) => {
            state.isLoading = false
            state.searchedBooks=[]
            state.error = action.error.message || "Something wrong with getting searched books"
        });

        builder.addCase(getBook.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getBook.fulfilled, (state, action) => {
            state.isLoading = false
            state.bookInfo = action.payload
            state.bookId = action.payload.id
        });

        builder.addCase(getBook.rejected, (state, action) => {
            state.isLoading = false
            state.bookInfo={}
            state.error = action.error.message || "Something wrong with getting searched books"
        });

        builder.addCase(updateBookWithImage.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(updateBookWithImage.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with updating a book with image"
        });

        builder.addCase(updateBookWithoutImage.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(updateBookWithoutImage.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with updating a book without image"
        });



        builder.addCase(getCity.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getCity.fulfilled, (state, action) => {
            state.isLoading = false
            state.userCity = action.payload
        });

        builder.addCase(getCity.rejected, (state, action) => {
            state.isLoading = false
            state.userCity = {}
            state.error = action.error.message || "Something wrong with getting searched books"
        });

        builder.addCase(createBook.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(createBook.fulfilled, (state, action) => {
            state.isLoading = false
        });

        builder.addCase(createBook.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting searched books"
        });

        builder.addCase(createComment.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(createComment.fulfilled, (state) => {
            state.isLoading = false
        });

        builder.addCase(createComment.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting searched books"
        });

        builder.addCase(deleteBook.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(deleteBook.fulfilled, (state) => {
            state.isLoading = false
        });

        builder.addCase(deleteBook.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting searched books"
        });

        builder.addCase(getComments.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getComments.fulfilled, (state, action) => {
            state.isLoading = false
            state.comments = action.payload
        });

        builder.addCase(getComments.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting searched books"
        });

        builder.addCase(getSavedBooks.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getSavedBooks.fulfilled, (state, action) => {
            state.isLoading = false
            state.savedBooks = action.payload
        });

        builder.addCase(getSavedBooks.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something went wrong with getting saved books"
        });

        builder.addCase(saveBook.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(saveBook.fulfilled, (state, action) => {
            state.isLoading = false
        });

        builder.addCase(saveBook.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something went wrong with saving a book"
        });

        builder.addCase(removeSavedBook.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(removeSavedBook.fulfilled, (state, action) => {
            state.isLoading = false
        });

        builder.addCase(removeSavedBook.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something went wrong with saving a book"
        });
    },
})

const booksReducer = booksSlice.reducer
export default booksReducer