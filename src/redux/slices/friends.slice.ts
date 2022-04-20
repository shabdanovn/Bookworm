import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserType} from "../../types/user";
import FriendsService from "../../services/friends.service";
import {CreateFriendType, FriendsCountType} from "../../types/friends";



interface IInitialState{
    followers: UserType[]
    followings: UserType[]
    friendsCount: FriendsCountType | {}
    isLoading: boolean
    error: null | string
}

const initialState:IInitialState = {
    followers: [],
    followings: [],
    friendsCount:{},
    isLoading: false,
    error: null
}

export const getFollowings = createAsyncThunk(
    'friends/getFollowings',
    async (userId: number, {rejectWithValue})=> {
        try {
            return await FriendsService.getFollowings(userId)
        }catch (error:any){
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getFollowers = createAsyncThunk(
    'friends/getFollowers',
    async (userId: number, {rejectWithValue})=> {
        try {
            return await FriendsService.getFollowers(userId)
        }catch (error:any){
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getFriendsCount = createAsyncThunk(
    'friends/getFriendsCount',
    async (userId: number, {rejectWithValue})=> {
        try {
            return await FriendsService.getFriendsCount(userId)
        }catch (error:any){
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const followUser = createAsyncThunk(
    'friends/followUser',
    async (data: CreateFriendType, {rejectWithValue, dispatch})=> {
        try {
            await FriendsService.followUser(data)
            dispatch(getFollowings(data.userId))
        }catch (error:any){
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const unfollowUser = createAsyncThunk(
    'friends/unfollowUser',
    async (data: CreateFriendType, {rejectWithValue, dispatch})=> {
        try {
            await FriendsService.unfollowUser(data)
            dispatch(getFollowings(data.userId))
        }catch (error:any){
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)



const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {},
    extraReducers: {
        [getFollowers.pending.type]: (state)=>{
            state.isLoading = true
        },
        [getFollowers.fulfilled.type]: (state, {payload})=>{
            state.isLoading = false
            state.followers = payload
        },
        [getFollowers.rejected.type]: (state, {payload})=>{
            state.isLoading = false
            state.error=payload
        },

        [getFollowings.pending.type]: (state)=>{
            state.isLoading = true
        },
        [getFollowings.fulfilled.type]: (state, {payload})=>{
            state.isLoading = false
            state.followings = payload
        },
        [getFollowings.rejected.type]: (state, {payload})=>{
            state.isLoading = false
            state.error=payload
        },
        [getFriendsCount.pending.type]: (state)=>{
            state.isLoading = true
        },
        [getFriendsCount.fulfilled.type]: (state, {payload})=>{
            state.isLoading = false
            state.friendsCount = payload
        },
        [getFriendsCount.rejected.type]: (state, {payload})=>{
            state.isLoading = false
            state.error=payload
        },

        [followUser.pending.type]: (state)=>{
            state.isLoading = true
        },
        [followUser.fulfilled.type]: (state)=>{
            state.isLoading = false
        },
        [followUser.rejected.type]: (state, {payload})=>{
            state.isLoading = false
            state.error=payload
        },

        [unfollowUser.pending.type]: (state)=>{
            state.isLoading = true
        },
        [unfollowUser.fulfilled.type]: (state)=>{
            state.isLoading = false
        },
        [unfollowUser.rejected.type]: (state, {payload})=>{
            state.isLoading = false
            state.error=payload
        },
    }
})

const friendsReducer = friendsSlice.reducer
export default friendsReducer