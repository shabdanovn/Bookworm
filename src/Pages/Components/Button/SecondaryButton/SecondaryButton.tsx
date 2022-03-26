import React from 'react';
import cn from "classnames";
import {useTranslation} from "react-i18next";
import './SecondaryButton.scss'
import {useNavigate} from "react-router-dom";
import {useTheme} from "../../../../hooks/useTheme";
import Arrow from "../Arrow";

interface ButtonProps{
    text: string
    center?: boolean
    mTopBottom?: boolean
    path:string
}
const SecondaryButton = ({text, center, mTopBottom, path}: ButtonProps) => {
    const {t} = useTranslation()
    const {isDark} = useTheme()
    const navigate = useNavigate()

    const clickHandle = () =>{
        navigate(path)
    }
    return (
        <p onClick={clickHandle}
                className={cn('secondary-button', {center: center, dark:isDark, mTopBottom: mTopBottom})}>
            {t(text)}
            <Arrow/>
        </p>
    );
};

export default SecondaryButton;
