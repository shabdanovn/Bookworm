import React from 'react';
import cn from "classnames";
import Arrow from "./Arrow";
import {useTranslation} from "react-i18next";
import './Button.scss'
import {useTheme} from "../../../hooks/useTheme";
import {useNavigate} from "react-router-dom";

interface ButtonProps{
    text: string
    center?: boolean
    mTopBottom?: boolean
    path:string
}
const Button = ({text, center, mTopBottom, path}: ButtonProps) => {
    const {t} = useTranslation()
    const {isDark} = useTheme()
    const navigate = useNavigate()

    const clickHandle = () =>{
        navigate(path)
    }
    return (
        <button onClick={clickHandle}
                className={cn('button', {center: center, dark:isDark, mTopBottom: mTopBottom})}>
            {t(text)}
            <Arrow/>
        </button>
    );
};

export default Button;
