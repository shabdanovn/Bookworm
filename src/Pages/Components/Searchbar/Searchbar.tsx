import React from 'react';
import {BookItemType} from "../../../types/types";
import cn from "classnames";
import searchLogo from '../../../images/search.svg'
import './Searchbar.scss'

interface ISearchbar{
    setBooks:(books: BookItemType[]) => void
}

const Searchbar = ({setBooks}: ISearchbar) => {
    return (
        <div className={cn('searchbar')}>
            <input type={'text'} placeholder={'Title or author'}/>
            <div className={cn('search-btn')}>
                <img src={searchLogo}/>
            </div>
        </div>
    );
};

export default Searchbar;
