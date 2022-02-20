import React, {createContext, ReactChild, ReactNode, useCallback, useState} from 'react';
import ModalWindow from "./ModalWindow";

interface ModalContextProps{
    children: ReactNode | ReactChild
}

type ModalContextType = {
    isOpen: boolean,
    open:()=>void,
    close:()=>void,
    setModalContent:(modalContent:ReactChild | ReactNode | null) => void
}

export const ModalContext = createContext<ModalContextType>({
    isOpen: false,
    open:()=>{},
    close:()=>{},
    setModalContent:(modalContent) => {}
})

const ModalContextProvider = ({children}: ModalContextProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<ReactChild | ReactNode | null>(null)

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    return (
        <ModalContext.Provider
            value={{isOpen, open, close, setModalContent}}>
            {children}
            <ModalWindow>
                {modalContent}
            </ModalWindow>
        </ModalContext.Provider>
    );
};

export default ModalContextProvider;
