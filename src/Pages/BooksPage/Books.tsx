import React, {useCallback, useEffect, useState} from 'react';
import MainLayout from "../Components/MainLayout/MainLayout";
import cn from "classnames";
import './Books.scss'
import BookItem from "../Components/BookItem/BookItem";
import Searchbar from "../Components/Searchbar/Searchbar";
import {BookItemType} from "../../types/types";
import BooksList from "../Components/BooksList/BooksList";
import DropdownIcon from "../Components/LangDropdown/DropdownIcon";
import useModal from "../../hooks/useModal";
import FiltersModalWindow from "../Components/ModalWindows/FiltersModalWindow/FiltersModalWindow";
import {useTranslation} from "react-i18next";
import { Outlet } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getAllBooks} from "../../redux/slices/books.slice";
import {BookType} from "../../types/books";

const Books = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    const {books:booksList, isLoading} = useAppSelector(state => state.books)
    const [books, setBooks] = useState<BookType[]>(booksList)
    const {setModalContent, open, close} = useModal()

    const clickHandler = useCallback(
        () => {
            setModalContent(<FiltersModalWindow close={close}/>)
            open()
        },
        [],
    );

    useEffect(() => {
        dispatch(getAllBooks())
    },[])

    useEffect(() => {
        setBooks(booksList)
    },[booksList])

    return (
        <MainLayout>
            <div className={cn('books-page')}>
                <div className={cn('helpers')}>
                    <Searchbar setBooks={setBooks}/>
                    <button className={cn('filters-btn')} onClick={clickHandler}>{t('books.filters.title')}</button>
                </div>
                <div className={cn('bookslist')}>
                    <BooksList>
                        {books.map(book => {
                            return <BookItem key={book.id} book={book}/>
                        })}
                    </BooksList>
                </div>
            </div>
        </MainLayout>
    );
};

export default Books;
