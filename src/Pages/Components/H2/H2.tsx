import React from 'react';
import './H2.scss'
import cn from "classnames";
import {useTheme} from "../../../hooks/useTheme";
import {useTranslation} from "react-i18next";

interface H2Props{
    text: string
    margin?: boolean
}

const H2 = ({text, margin}: H2Props) => {
    const {t} = useTranslation()
    const {isDark} = useTheme()
    return (
        <p className={cn('h2-title',  {dark: isDark, margin: margin})}>{t(text)}</p>
    );
};

export default H2;
