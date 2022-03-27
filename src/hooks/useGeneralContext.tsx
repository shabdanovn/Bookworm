import React, {useContext} from 'react';
import {GeneralContext} from "../Pages/Components/Context/GeneralContextProvider";

export const useGeneralContext = () => useContext(GeneralContext);
