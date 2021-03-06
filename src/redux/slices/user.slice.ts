import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IData, UpdateWithoutImageUserType, UserType} from "../../types/user";
import UserService from "../../services/user.service";
import {updateUser} from "./auth.slice";
import {ConversationItemType} from "../../types/chat";

type InitialStateType = {
    isLoading: boolean,
    error: null|string,
    currentUser: UserType,
    conversationUser: ConversationItemType,
}

const initialState:InitialStateType = {
    isLoading: false,
    error: null,
    currentUser: {},
    conversationUser: {}
}

export const getUser = createAsyncThunk(
    'user/getUser',
    async (id:number, {rejectWithValue, dispatch}) => {
        try {
            const response = await UserService.getUser(id)
            dispatch(updateUser(response))
            return response
        }catch (error: any){
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getConversationUser = createAsyncThunk(
    'user/getConversationUser',
    async (id:number, {rejectWithValue}) => {
        try {
            return await UserService.getUser(id)
        }catch (error: any){
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const updateUserWithImage = createAsyncThunk(
    'user/updateUserWithImage',
    async (data: IData, {rejectWithValue, dispatch}) => {
        try {
            await UserService.updateUserWithImage(data.data)
            dispatch(getUser(data.userId))
        }catch (error: any){
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const updateUserWithoutImage = createAsyncThunk(
    'user/updateUserWithoutImage',
    async (data:UpdateWithoutImageUserType, {rejectWithValue, dispatch}) => {
        try {
            await UserService.updateUserWithoutImage(data)
            dispatch(getUser(data.id))
        }catch (error: any){
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.currentUser = action.payload
        });

        builder.addCase(getUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || 'Something went wrong when getting a user'
        });

        builder.addCase(getConversationUser.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getConversationUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.conversationUser = action.payload
        });

        builder.addCase(getConversationUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || 'Something went wrong when getting a user'
        });

        builder.addCase(updateUserWithImage.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(updateUserWithImage.fulfilled, (state, action) => {
            state.isLoading = false
        });

        builder.addCase(updateUserWithImage.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || 'Something went wrong when getting a user'
        });

        builder.addCase(updateUserWithoutImage.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(updateUserWithoutImage.fulfilled, (state, action) => {
            state.isLoading = false
        });

        builder.addCase(updateUserWithoutImage.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || 'Something went wrong when getting a user'
        });
    }
})

const userReducer = UserSlice.reducer

export default  userReducer