import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import booksReducer from "./slices/books.slice";
import genreReducer from "./slices/genres.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        books: booksReducer,
        genres: genreReducer
    },
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
