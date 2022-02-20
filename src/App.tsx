import React from 'react';
import Main from "./Pages/MainPage/Main";
import { Route, Routes } from "react-router-dom";
import ThemeContextProvider from "./Pages/Components/Context/ThemeContextProvider";
import ModalContextProvider from "./Pages/Components/Context/ModalWinwow/ModalContextProvider";

const Users = () => {
    return(
        <div>Users</div>
    )
}
function App() {
    return (
        <ThemeContextProvider>
            <ModalContextProvider>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path={'users'} element={<Users/>}/>
                </Routes>
            </ModalContextProvider>
        </ThemeContextProvider>
    );
}

export default App;
