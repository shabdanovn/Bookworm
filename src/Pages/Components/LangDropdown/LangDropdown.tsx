import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import DropdownIcon from "./DropdownIcon";
import cn from "classnames";
import './LangDropdown.scss'

export const browserLang = navigator.language

type LangOptionType = {
    lang: string
    value: string
}

const languages = [
    {lang:'En', value: 'en'},
    {lang:'Ру', value: 'ru'},
    {lang:'Кг', value: 'kg'}
]

const LangDropdown = () => {
    const {i18n} = useTranslation()
    const [lang, setLang] = useState<LangOptionType>({lang: 'En', value: 'en'});
    const [showDrop, setShowDrop] = useState<boolean>(false);

    const changeLanguage = (lang:LangOptionType) => {
        setLang(lang)
        i18n.changeLanguage(lang.value)
        setShowDrop(prevState => !prevState)
    }

    const toggleDropdown = () => setShowDrop(prevState => !prevState)

    // Setting language after first detecting a browser lang
    useEffect(() => {
        if(browserLang==='en') setLang({lang: 'En', value: 'en'})
        else if(browserLang==='ru') setLang({lang: 'Ру', value: 'ru'})
        else if(browserLang==='kg') setLang({lang: 'Кг', value: 'kg'})
    }, [])

    // Setting language if it is already detected in localstorage
    useEffect(() => {
        const l = localStorage.getItem('i18nextLng')
        if(l){
            if(l === 'kg') setLang({lang: 'Кг', value: 'kg'})
            else if(l === 'ru') setLang({lang: 'Ру', value: 'ru'})
            else if(l === 'en') setLang({lang: 'En', value: 'en'})
        }
    }, [])

    return (
        <div className={cn('languages')}>
            <p className={cn('menu-item dropdown')}
               onClick={toggleDropdown}>{lang.lang}
                <DropdownIcon/>
            </p>

            {showDrop && <div className={cn('options')}>
                {languages.map(l=> {
                    if(l.lang!==lang.lang)
                        return <p key={l.value}
                            className={cn('dropdown-text')}
                            onClick={() => changeLanguage(l)}>
                            {l.lang}
                        </p>
                })}
            </div>}
        </div>
    );
};

export default LangDropdown;
