import React, {ReactChild, ReactNode} from 'react';
import cn from "classnames";
import './AuthedMenuLayout.scss'

interface IAuthedMenuLayout{
    children: ReactNode | ReactChild
}

const AuthedMenuLayout = ({children}: IAuthedMenuLayout) => {
    return (
        <div className={cn('authed-menu-layout')}>
            {children}
        </div>
    );
};

export default AuthedMenuLayout;
