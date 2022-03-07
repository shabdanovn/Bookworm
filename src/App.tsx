import React from 'react';
import Main from "./Pages/MainPage/Main";
import { Route, Routes } from "react-router-dom";
import ThemeContextProvider from "./Pages/Components/Context/ThemeContextProvider";
import ModalContextProvider from "./Pages/Components/Context/ModalWinwow/ModalContextProvider";
import SignInPage from "./Pages/RegistrationPage/Signin/SignInPage";
import SignUpPage from "./Pages/RegistrationPage/Signup/SignUpPage";
import Books from "./Pages/BooksPage/Books";
import CreateBookPost from "./Pages/CreateBookPostPage/CreateBookPost";
import BookPage from "./Pages/BooksPage/BookPage/BookPage";
import NoFoundPage from "./Pages/404/404";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import EditProfilePage from "./Pages/ProfilePage/EditProfilePage/EditProfilePage";
import MyBooksPage from "./Pages/MyBooksPage/MyBooksPage";

function App() {
    return (
        <ThemeContextProvider>
            <ModalContextProvider>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path={'sign-in'} element={<SignInPage/>}/>
                    <Route path={'sign-up'} element={<SignUpPage/>}/>
                    <Route path={'books'} element={<Books/>}/>
                    <Route path='books/:id' element={<BookPage/>}/>
                    <Route path={'create-post'} element={<CreateBookPost/>}/>
                    <Route path={'edit-post/:id'} element={<CreateBookPost/>}/>
                    <Route path={'profile-page'} element={<ProfilePage/>}/>
                    <Route path={'profile-page/profile-edit'} element={<EditProfilePage/>}/>
                    <Route path={'profile-page/my-books'} element={<MyBooksPage/>}/>
                    <Route path={"*"} element={<NoFoundPage/>}/>
                </Routes>
            </ModalContextProvider>
        </ThemeContextProvider>
    );
}

export default App;
