import React from 'react';
import Main from "./Pages/MainPage/Main";
import { Route, Routes } from "react-router-dom";
import ThemeContextProvider from "./Pages/Components/Context/ThemeContextProvider";
import ModalContextProvider from "./Pages/Components/Context/ModalWinwow/ModalContextProvider";
import SignInPage from "./Pages/RegistrationPage/Signin/SignInPage";
import SignUpPage from "./Pages/RegistrationPage/Signup/SignUpPage";
import Books from "./Pages/BooksPage/Books";

function App() {
    return (
        <ThemeContextProvider>
            <ModalContextProvider>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path={'sign-in'} element={<SignInPage/>}/>
                    <Route path={'sign-up'} element={<SignUpPage/>}/>
                    <Route path={'books'} element={<Books/>}/>
                </Routes>
            </ModalContextProvider>
        </ThemeContextProvider>
    );
}

export default App;
