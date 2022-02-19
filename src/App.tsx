import React from 'react';
import Main from "./Pages/MainPage/Main";
import { Route, Routes } from "react-router-dom";
import ThemeContextProvider from "./Pages/Components/context/ThemeContextProvider";

const Users = () => {
    return(
        <div>Users</div>
    )
}
function App() {
    return (
        <ThemeContextProvider>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path={'users'} element={<Users/>}/>
            </Routes>
        </ThemeContextProvider>
    );
}

export default App;
