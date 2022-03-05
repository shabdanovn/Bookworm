import React from 'react';
import noFound from '../../images/404.png'
import cn from "classnames";
import './404.scss'
import {NavLink} from "react-router-dom";

const NoFoundPage = () => {
    return (
        <div className={cn('no-found')}>
            <img src={noFound} alt={'404 No page found!'}/>
            <NavLink className={cn('go-back')} to={'/'}>Go back</NavLink>
        </div>
    );
};

export default NoFoundPage;
