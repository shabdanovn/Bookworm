import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import genresService from "../../services/genres.service";

const initialState = {
    genres: [],
    isLoading: false,
    error: null
}

export const getAllGenres = createAsyncThunk(
    'genres/getAllGenres',
    async (_, {rejectWithValue})=> {
        try {
            return await genresService.getGenres()
        }catch (error:any){
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllGenres.pending.type]: (state)=>{
            state.isLoading = true
        },
        [getAllGenres.fulfilled.type]: (state, {payload})=>{
            state.isLoading = false
            state.genres = payload
        },
        [getAllGenres.rejected.type]: (state, {paylaod})=>{
            state.isLoading = false
            state.error=paylaod
            state.genres=[]
        },
    }
})

const genreReducer = genresSlice.reducer
export default genreReducer