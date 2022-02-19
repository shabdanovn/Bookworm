import React, {useContext} from 'react';
import {ThemeContext} from "../Pages/Components/context/ThemeContextProvider";

export const useTheme = () => useContext(ThemeContext);
