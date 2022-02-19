import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import DropdownIcon from "./DropdownIcon";
import cn from "classnames";
import './LangDropdown.scss'


type LangOptionType = {
    lang: string
    value: string
}
const languages = [
    {lang:'En', value: 'en'},
    {lang:'Ру', value: 'ru'},
    {lang:'Кырг', value: 'kg'}
]

const LangDropdown = () => {
    const {i18n} = useTranslation()
    const [lang, setLang] = useState<LangOptionType>({lang:'En', value: 'en'});
    const [showDrop, setShowDrop] = useState<boolean>(false);

    const changeLanguage = (lang:LangOptionType) => {
        setLang(lang)
        i18n.changeLanguage(lang.value)
        setShowDrop(prevState => !prevState)
    }

    const toggleDropdown = () => setShowDrop(prevState => !prevState)

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
                            className={cn()}
                            onClick={() => changeLanguage(l)}>
                            {l.lang}
                        </p>
                })}
            </div>}
        </div>
    );
};

export default LangDropdown;
