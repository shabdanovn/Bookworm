import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ConversationType, CreateConversationType, CreateMessageType, MessageType} from "../../types/chat";
import ChatService from "../../services/chat.service";

interface IInitialState {
    isLoading: boolean
    error: string | null
    messages: MessageType[],
    conversations: ConversationType[]
}

const initialState:IInitialState = {
    isLoading: false,
    error: null,
    messages: [],
    conversations: []
}

interface IAddConversation{
    data: CreateConversationType,
    senderId: number
    text: string
}

export const addConversation = createAsyncThunk(
    'chat/addConversation',
    async ({data,senderId, text}: IAddConversation, {rejectWithValue, dispatch}) => {
        try{
            const response = await ChatService.addConversation(data)
            if(response)
                dispatch(addMessage({
                    conversationId: response.id,
                    senderId,
                    text
                }))
            return response
        }catch (error:any){
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return  rejectWithValue(message)
        }
    }
)

export const getConversations = createAsyncThunk(
    'chat/getConversations',
    async (id:number, {rejectWithValue}) => {
        try{
            return await ChatService.getConversations(id)
        }catch (error:any){
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return  rejectWithValue(message)
        }
    }
)

export const addMessage = createAsyncThunk(
    'chat/addMessage',
    async (data: CreateMessageType, {rejectWithValue, dispatch}) => {
        try{
            const response = await ChatService.addMessage(data)
            dispatch(getMessages(data.conversationId))
            return response
        }catch (error:any){
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return  rejectWithValue(message)
        }
    }
)

export const getMessages = createAsyncThunk(
    'chat/getMessages',
    async (id:number, {rejectWithValue}) => {
        try{
            return await ChatService.getMessages(id)
        }catch (error:any){
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return  rejectWithValue(message)
        }
    }
)

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder.addCase(getConversations.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getConversations.fulfilled, (state, action) => {
            state.isLoading = false
            state.conversations = action.payload
        })

        builder.addCase(getConversations.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something went wrong while getting conversations"
        })

        builder.addCase(addConversation.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(addConversation.fulfilled, (state, action) => {
            state.isLoading = false
        })

        builder.addCase(addConversation.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something went wrong while getting conversations"
        })

        builder.addCase(getMessages.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.isLoading = false
            state.messages = action.payload
        })

        builder.addCase(getMessages.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something went wrong while getting conversations"
        })

        builder.addCase(addMessage.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(addMessage.fulfilled, (state, action) => {
            state.isLoading = false
        })

        builder.addCase(addMessage.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something went wrong while getting conversations"
        })
    }
})

const chatReducer = chatSlice.reducer
export default chatReducer