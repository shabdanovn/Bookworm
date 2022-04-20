import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    PostCommentType,
    PostCreateCommentType,
    PostType,
    SavePostType,
    UpdatePostType
} from "../../types/posts";
import postsService from "../../services/posts.service";
interface IInitialState {
    posts: PostType[],
    isLoading: boolean,
    post: PostType,
    error: null|string,
    comments: PostCommentType[],
    myPosts: PostType[],
    savedPosts: PostType[]
}

const initialState:IInitialState = {
    posts: [],
    isLoading: false,
    post: {},
    error: null,
    comments: [],
    myPosts: [],
    savedPosts: []
}

export const getAllPosts = createAsyncThunk(
    'posts/getAllPosts',
    async (_,{rejectWithValue})=>{
        try{
            return await postsService.getPosts()
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getPost = createAsyncThunk(
    'posts/getPost',
    async (id:number,{rejectWithValue, dispatch})=>{
        try{
            return await postsService.getPost(id)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getUsersPosts = createAsyncThunk(
    'posts/getUsersPosts',
    async (id:number,{rejectWithValue, dispatch})=>{
        try{
            return await postsService.getUsersPosts(id)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (data:FormData,{rejectWithValue, dispatch})=>{
        try{
            await postsService.createPost(data)
                .then(() => dispatch(getAllPosts()))
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

interface IDeletePost{
    id: number
    userId: number
}

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async ({id, userId}:IDeletePost,{rejectWithValue, dispatch})=>{
        try{
            await postsService.deletePost(id, userId)
            dispatch(getUsersPosts(userId))
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getPostComments = createAsyncThunk(
    'posts/getPostComments',
    async (id: number,{rejectWithValue})=>{
        try{
            return await postsService.getPostComments(id)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const createPostComment = createAsyncThunk(
    'posts/createPostComment',
    async (data: PostCreateCommentType,{rejectWithValue, dispatch})=>{
        try{
            const response = await postsService.createPostComment(data)
            dispatch(getPostComments(response.postId))
            return response
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const getSavedPosts = createAsyncThunk(
    'posts/getSavedPosts',
    async (id:number,{rejectWithValue, dispatch})=>{
        try{
            return await postsService.getSavedPosts(id)
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const savePost = createAsyncThunk(
    'posts/savePost',
    async (data: SavePostType,{rejectWithValue, dispatch})=>{
        try{
            await postsService.savePost(data)
            dispatch(getSavedPosts(data.userId))
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)


export const removeSavedPost = createAsyncThunk(
    'posts/removeSavedPost',
    async (data: SavePostType,{rejectWithValue, dispatch})=>{
        try{
            await postsService.removeSavedPost(data)
            dispatch(getSavedPosts(data.userId))
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const updatePostWithImage = createAsyncThunk(
    'posts/updatePostWithImage',
    async (data: FormData,{rejectWithValue, dispatch})=>{
        try{
            await postsService.updatePostWithImage(data)
            dispatch(getAllPosts())
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

export const updatePostWithoutImage = createAsyncThunk(
    'posts/updatePostWithoutImage',
    async (data: UpdatePostType,{rejectWithValue, dispatch})=>{
        try{
            await postsService.updatePostWithoutImage(data)
            dispatch(getAllPosts())
        }catch (error:any) {
            const message = (error.message && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return rejectWithValue(message)
        }
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getAllPosts.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getAllPosts.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.posts = payload
        });

        builder.addCase(getAllPosts.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting all posts"
        });

        builder.addCase(getUsersPosts.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getUsersPosts.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.myPosts = payload
        });

        builder.addCase(getUsersPosts.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting all posts"
        });

        builder.addCase(getPost.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getPost.fulfilled, (state, action) => {
            state.isLoading = false
            state.post = action.payload
        });

        builder.addCase(getPost.rejected, (state, action) => {
            state.isLoading = false
            state.post={}
            state.error = action.error.message || "Something wrong with getting searched posts"
        });

        builder.addCase(updatePostWithImage.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(updatePostWithImage.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with updating a book with image"
        });

        builder.addCase(updatePostWithoutImage.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(updatePostWithoutImage.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with updating a book without image"
        });

        builder.addCase(createPost.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(createPost.fulfilled, (state, action) => {
            state.isLoading = false
        });

        builder.addCase(createPost.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting searched posts"
        });

        builder.addCase(createPostComment.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(createPostComment.fulfilled, (state) => {
            state.isLoading = false
        });

        builder.addCase(createPostComment.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting searched posts"
        });

        builder.addCase(deletePost.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(deletePost.fulfilled, (state) => {
            state.isLoading = false
        });

        builder.addCase(deletePost.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting searched posts"
        });

        builder.addCase(getPostComments.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getPostComments.fulfilled, (state, action) => {
            state.isLoading = false
            state.comments = action.payload
        });

        builder.addCase(getPostComments.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something wrong with getting searched posts"
        });

        builder.addCase(getSavedPosts.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getSavedPosts.fulfilled, (state, action) => {
            state.isLoading = false
            state.savedPosts = action.payload
        });

        builder.addCase(getSavedPosts.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something went wrong with getting saved posts"
        });

        builder.addCase(savePost.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(savePost.fulfilled, (state, action) => {
            state.isLoading = false
        });

        builder.addCase(savePost.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something went wrong with saving a book"
        });

        builder.addCase(removeSavedPost.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(removeSavedPost.fulfilled, (state, action) => {
            state.isLoading = false
        });

        builder.addCase(removeSavedPost.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || "Something went wrong with saving a book"
        });
    },
})

const postsReducer = postsSlice.reducer
export default postsReducer