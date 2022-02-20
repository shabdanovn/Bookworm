import React, {useContext} from 'react';
import {ThemeContext} from "../Pages/Components/Context/ThemeContextProvider";

export const useTheme = () => useContext(ThemeContext);
