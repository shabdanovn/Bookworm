import React from 'react';
import './NotAuthedModal.scss'
import cn from "classnames";
import {useTheme} from "../../../../hooks/useTheme";
import {useNavigate} from "react-router-dom";

interface INotAuthedModal{
    close: () => void
}

const NotAuthedModal = ({close}:INotAuthedModal) => {
    const {isDark} = useTheme()
    const navigate = useNavigate()
    return (
        <div className={cn('not-authed-modal', {dark: isDark})}>
            <p>Oops! First you need to login!</p>
            <button onClick={() => {
                navigate('/sign-in')
                close()
            }}>Login</button>
        </div>
    );
};

export default NotAuthedModal;
