import React, {MouseEvent, ReactChild, ReactNode} from 'react';
import cn from "classnames";
import useModal from "../../../../hooks/useModal";
import './ModalWindow.scss'
import {useTheme} from "../../../../hooks/useTheme";


interface ModalWindowProps{
    children: ReactNode | ReactChild
}

const ModalWindow = ({children}: ModalWindowProps) => {
    const {isOpen, close} = useModal()
    const {isDark} = useTheme()

    if(!isOpen) return null

    const handleModalClick = (e:MouseEvent<HTMLDivElement>) => {
        if(e.target === e.currentTarget) close()
    }

    return (
        <div className={cn('modal-bg', {dark: isDark})} onClick={handleModalClick}>
            {children}
        </div>
    );
};

export default ModalWindow;
