import React from 'react';
import './H3.scss'
import cn from "classnames";
import {useTranslation} from "react-i18next";
import {useTheme} from "../../../hooks/useTheme";

interface H3Props{
    text: string
    font?: boolean
}

const H3 = ({text, font}: H3Props) => {
    const {t} = useTranslation()
    const {isDark} = useTheme()
    return (
        <p className={cn('h3', {dark: isDark, font: font})}>{t(text)}</p>
    );
};

export default H3;
