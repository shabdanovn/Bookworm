import React from 'react';
import {useTranslation} from "react-i18next";
import {useTheme} from "../../../hooks/useTheme";
import cn from "classnames";
import book1 from "../../../images/book1.png";
import book2 from "../../../images/book2.png";
import book3 from "../../../images/book3.png";
import './TitlePage.scss'
import Arrow from "../../Components/Button/Arrow";
import Button from "../../Components/Button/Button";

const TitlePage = () => {
    const {t} = useTranslation()
    const {isDark} = useTheme()

    return (
        <div className={cn('title-page')}>
            <div className={cn('offer-part', {dark: isDark})}>
                <p className={cn('title')}>{t('main-page.title-page.title')}</p>
                <p className={cn('quote')}>{t('main-page.title-page.quote')}</p>
                <Button text={'main-page.title-page.button'} path={'books'}/>
            </div>
            <div className={cn('images-part')}>
                <img className={cn('book1')} src={book1} alt={'Book 1'}/>
                <img className={cn('book2')} src={book2} alt={'Book 2'}/>
                <img className={cn('book3')} src={book3} alt={'Book 3'}/>
            </div>
        </div>
    );
};

export default TitlePage;
