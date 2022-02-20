import React, {useContext} from 'react';
import {ModalContext} from "../Pages/Components/Context/ModalWinwow/ModalContextProvider";

const useModal = () => useContext(ModalContext)

export default useModal;
