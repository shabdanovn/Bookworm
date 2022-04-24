import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import booksReducer from "./slices/books.slice";
import genreReducer from "./slices/genres.slice";
import userReducer from "./slices/user.slice";
import chatReducer from "./slices/chat.slice";
import postsReducer from "./slices/posts.slice";
import friendsReducer from "./slices/friends.slice";
import challengesReducer from "./slices/challenges.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        books: booksReducer,
        genres: genreReducer,
        user: userReducer,
        chat: chatReducer,
        posts: postsReducer,
        friends: friendsReducer,
        challenges: challengesReducer
    },
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
