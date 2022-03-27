import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ILogin, IRegister} from "../../types/auth";
import AuthService from "../../services/auth.service";

// @ts-ignore
const token = JSON.parse(localStorage.getItem('token'))
// @ts-ignore
const user = JSON.parse(localStorage.getItem('user'))

export const login = createAsyncThunk(
    'auth/login',
    async (data: ILogin, {rejectWithValue, dispatch}) => {
        try {
            return await AuthService.login(data)
        }catch (error:any){
            const message = (error.message && error.response.data && error.response.data.message)
                || error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const signup = createAsyncThunk(
    'auth/signup',
    async (data: IRegister, {rejectWithValue, dispatch}) => {
        try {
            return await AuthService.signup(data)
        }catch (error:any){
            const message = (error.message && error.response.data && error.response.data.message)
                || error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)


export const logout = createAsyncThunk( 'auth/logout',
    async () => {
          await AuthService.logout()
    }
)

const initialState = token && user ? {isLoggedIn: true, user} : {isLoggedIn: false, user:null}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers:{
        [login.fulfilled.type]:(state, action) => {
            state.isLoggedIn = true
            state.user = action.payload.user
        },

        [login.rejected.type]: (state) => {
            state.isLoggedIn = false
            state.user = null
        },

        [logout.fulfilled.type]:(state) => {
            state.isLoggedIn = false
            state.user = null
        },

        [signup.fulfilled.type]:(state, action) => {
            state.isLoggedIn = true
            state.user = action.payload.user
        },

        [signup.rejected.type]: (state) => {
            state.isLoggedIn = false
            state.user = null
        },
    }
})

const authReducer = authSlice.reducer
export default authReducer
