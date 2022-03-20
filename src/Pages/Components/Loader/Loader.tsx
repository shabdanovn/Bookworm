import React from 'react';
import cn from "classnames";
import './Loader.scss'
import {useTheme} from "../../../hooks/useTheme";

const Loader = () => {
    const {isDark} = useTheme()
    return (
        <div className={cn('loader', {dark: isDark})}>
        </div>
    );
};

export default Loader;
