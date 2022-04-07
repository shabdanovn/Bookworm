import React from 'react';
import './H3.scss'
import cn from "classnames";
import {useTranslation} from "react-i18next";
import {useTheme} from "../../../hooks/useTheme";

interface H3Props{
    text: string
    font?: boolean
    onClick?: () => void
}

const H3 = ({text, font, onClick}: H3Props) => {
    const {t} = useTranslation()
    const {isDark} = useTheme()
    return (
        <p onClick={onClick}
           className={cn('h3', {dark: isDark, font: font})}>{t(text)}</p>
    );
};

export default H3;
