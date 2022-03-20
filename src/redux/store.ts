import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import booksReducer from "./slices/books.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        books: booksReducer
    },
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
