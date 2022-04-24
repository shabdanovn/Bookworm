import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    AddUserToChallengeType,
    ChallengeCommentType,
    ChallengeCreateCommentType,
    ChallengeType
} from "../../types/challenges";
import challengesService from "../../services/challenges.service";

interface IInitialState {
    challenges: ChallengeType[],
    isLoading: boolean,
    challenge: ChallengeType | null,
    error: null|string,
    comments: ChallengeCommentType[],
    myCreatedChallenges: ChallengeType[],
    challengesImIn: ChallengeType[]
}

const initialState:IInitialState = {
    challenges: [],
    isLoading: false,
    challenge: null,
    error: null,
    comments: [],
    myCreatedChallenges: [],
    challengesImIn: []
}

export const getAllChallenges = createAsyncThunk(
    'challenges/getAllChallenges',
    async (_,{rejectWithValue})=>{
        try{
            return await challengesService.getChallenges()
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getChallenge = createAsyncThunk(
    'challenges/getChallenge',
    async (id:number,{rejectWithValue, dispatch})=>{
        try{
            return await challengesService.getChallenge(id)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getUserCreatedChallenges = createAsyncThunk(
    'challenges/getUserCreatedChallenges',
    async (userId:number,{rejectWithValue, dispatch})=>{
        try{
            return await challengesService.getUserCreatedChallenges(userId)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const createChallenge = createAsyncThunk(
    'challenges/createChallenge',
    async (data:FormData,{rejectWithValue, dispatch})=>{
        try{
            await challengesService.createChallenge(data)
                .then(() => dispatch(getAllChallenges()))
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const deleteChallenge = createAsyncThunk(
    'challenges/deleteChallenge',
    async (data: ChallengeType,{rejectWithValue, dispatch})=>{
        try{
            await challengesService.deleteChallenge(data)
            dispatch(getUserCreatedChallenges(data.userId))
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const updateChallengeWithImage = createAsyncThunk(
    'challenges/updateChallengeWithImage',
    async (data: FormData,{rejectWithValue, dispatch})=>{
        try{
            await challengesService.updateChallengeWithImage(data)
            dispatch(getAllChallenges())
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const updateChallengeWithoutImage = createAsyncThunk(
    'challenges/updateChallengeWithoutImage',
    async (data: ChallengeType,{rejectWithValue, dispatch})=>{
        try{
            await challengesService.updateChallengeWithoutImage(data)
            dispatch(getAllChallenges())
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getChallengeComments = createAsyncThunk(
    'challenges/getChallengeComments',
    async (challengeId: number,{rejectWithValue})=>{
        try{
            return await challengesService.getChallengeComments(challengeId)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const createChallengeComment = createAsyncThunk(
    'challenges/createChallengeComment',
    async (data: ChallengeCreateCommentType,{rejectWithValue, dispatch})=>{
        try{
            const response = await challengesService.createChallengeComment(data)
            dispatch(getChallengeComments(response.challengeId))
            return response
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)
export const addUserToChallenge = createAsyncThunk(
    'challenges/addUserToChallenge',
    async (data:AddUserToChallengeType,{rejectWithValue, dispatch})=>{
        try{
            await challengesService.addUserToChallenge(data)
            dispatch(getUserInChallenges(data.userId))
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getUserInChallenges = createAsyncThunk(
    'challenges/getUserInChallenges',
    async (userId:number,{rejectWithValue, dispatch})=>{
        try{
            return await challengesService.getUserInChallenges(userId)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getChallengeMembers = createAsyncThunk(
    'challenges/getChallengeMembers',
    async (challengeId:number,{rejectWithValue, dispatch})=>{
        try{
            return await challengesService.getChallengeMembers(challengeId)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)


export const deleteUserFromChallenge = createAsyncThunk(
    'challenges/deleteUserFromChallenge',
    async (data: AddUserToChallengeType,{rejectWithValue, dispatch})=>{
        try{
            await challengesService.deleteUserFromChallenge(data)
            dispatch(getUserInChallenges(data.userId))
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

const challengesSlice = createSlice({
    name: 'challenges',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getAllChallenges.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getAllChallenges.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.challenges = payload
        });

        builder.addCase(getAllChallenges.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting all challenges"
        });


        builder.addCase(getChallenge.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getChallenge.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.challenge = payload
        });

        builder.addCase(getChallenge.rejected, (state, action) => {
            state.isLoading = false
            state.challenge = null
            state.error = action.error.message || "Something wrong with getting a challenge"
        });



        builder.addCase(getUserCreatedChallenges.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getUserCreatedChallenges.fulfilled, (state, action) => {
            state.isLoading = false
            state.myCreatedChallenges = action.payload
        });

        builder.addCase(getUserCreatedChallenges.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting searched posts"
        });



        builder.addCase(updateChallengeWithImage.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(updateChallengeWithImage.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with updating a book without image"
        });




        builder.addCase(updateChallengeWithoutImage.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(updateChallengeWithoutImage.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with updating a book without image"
        });



        builder.addCase(createChallenge.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(createChallenge.fulfilled, (state, action) => {
            state.isLoading = false
        });

        builder.addCase(createChallenge.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting searched posts"
        });




        builder.addCase(createChallengeComment.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(createChallengeComment.fulfilled, (state) => {
            state.isLoading = false
        });

        builder.addCase(createChallengeComment.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting searched posts"
        });




        builder.addCase(deleteChallenge.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(deleteChallenge.fulfilled, (state) => {
            state.isLoading = false
        });

        builder.addCase(deleteChallenge.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting searched posts"
        });




        builder.addCase(getChallengeComments.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getChallengeComments.fulfilled, (state, action) => {
            state.isLoading = false
            state.comments = action.payload
        });

        builder.addCase(getChallengeComments.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting searched posts"
        });




        builder.addCase(addUserToChallenge.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(addUserToChallenge.fulfilled, (state, action) => {
            state.isLoading = false
        });

        builder.addCase(addUserToChallenge.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something went wrong with getting saved posts"
        });



        builder.addCase(getUserInChallenges.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getUserInChallenges.fulfilled, (state, action) => {
            state.isLoading = false
            state.challengesImIn = action.payload
        });

        builder.addCase(getUserInChallenges.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something went wrong with saving a book"
        });



        builder.addCase(getChallengeMembers.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getChallengeMembers.fulfilled, (state, action) => {
            state.isLoading = false
        });

        builder.addCase(getChallengeMembers.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something went wrong with saving a book"
        });



        builder.addCase(deleteUserFromChallenge.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(deleteUserFromChallenge.fulfilled, (state, action) => {
            state.isLoading = false
        });

        builder.addCase(deleteUserFromChallenge.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something went wrong with saving a book"
        });
    },
})

const challengesReducer = challengesSlice.reducer
export default challengesReducer