import React from 'react';
import {BookItemType} from "../../../types/types";
import cn from "classnames";
import searchLogo from '../../../images/search.svg'
import './Searchbar.scss'
import {useTranslation} from "react-i18next";

interface ISearchbar{
    setBooks:(books: BookItemType[]) => void
}

const Searchbar = ({setBooks}: ISearchbar) => {
    const {t} = useTranslation()
    return (
        <div className={cn('searchbar')}>
            <input type={'text'} placeholder={t('books.searchbar')}/>
            <div className={cn('search-btn')}>
                <img src={searchLogo} alt={'searchbar logo'}/>
            </div>
        </div>
    );
};

export default Searchbar;
