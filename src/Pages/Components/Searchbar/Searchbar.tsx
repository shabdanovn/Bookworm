import React, {ChangeEvent, KeyboardEventHandler, useEffect, useState} from 'react';
import cn from "classnames";
import searchLogo from '../../../images/search.svg'
import './Searchbar.scss'
import {useTranslation} from "react-i18next";
import {BookType} from "../../../types/books";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getSearchedBooks} from "../../../redux/slices/books.slice";

interface ISearchbar{
    setBooks:(books: BookType[]) => void
}

const Searchbar = ({setBooks}: ISearchbar) => {
    const {t} = useTranslation()
    const [word, setWord] = useState<string>('')
    const dispatch = useAppDispatch()
    const {searchedBooks, books} = useAppSelector(state => state.books)

    const btnClick = () => {
        if(word) dispatch(getSearchedBooks(word))
    }

    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if(word) dispatch(getSearchedBooks(word))
        }
    };

    useEffect(() => {
        setBooks(searchedBooks)
    }, [searchedBooks])

    useEffect(() => {
        if(!word) setBooks(books)
    }, [word])

    return (
        <div className={cn('searchbar')}>
            <input type={'text'} placeholder={t('books.searchbar')}
                   onKeyDown={keyDownHandler}
                   value={word} onChange={(e: ChangeEvent<HTMLInputElement>) => setWord(e.target.value)}/>
            <div className={cn('search-btn')} onClick={btnClick}>
                <img src={searchLogo} alt={'searchbar logo'}/>
            </div>
        </div>
    );
};

export default Searchbar;
