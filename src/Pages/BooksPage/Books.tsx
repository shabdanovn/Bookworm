import React, {useEffect, useState} from 'react';
import MainLayout from "../Components/MainLayout/MainLayout";
import cn from "classnames";
import './Books.scss'
import BookItem from "../Components/BookItem/BookItem";
import Searchbar from "../Components/Searchbar/Searchbar";
import BooksList from "../Components/BooksList/BooksList";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getAllBooks} from "../../redux/slices/books.slice";
import {BookType} from "../../types/books";
import GenresDropdown from "../Components/GenresDropdown/GenresDropdown";
import Loader from "../Components/Loader/Loader";
import {useTheme} from "../../hooks/useTheme";

const Books = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const {books:booksList, isLoading} = useAppSelector(state => state.books)
    const [books, setBooks] = useState<BookType[]>(booksList)
    const {isDark} = useTheme()

    useEffect(() => {
        if(booksList.length===0) dispatch(getAllBooks())
    },[])

    useEffect(() => {
        setBooks(booksList)
    },[booksList])

    return (
        <MainLayout>
             <div className={cn('books-page')}>
                    <div className={cn('helpers')}>
                        <Searchbar setBooks={setBooks}/>
                        <GenresDropdown setBooks={setBooks}/>
                    </div>
                    <div className={cn('bookslist')}>
                        <BooksList>
                            {isLoading
                                ? <Loader/>
                                : books.map(book => {
                                        return <BookItem key={book.id} book={book}/>
                                    })
                            }
                        </BooksList>
                        {books.length===0 && <p className={cn('no-found', {dark: isDark})}>{t('books.no-found')}</p>}
                    </div>
                </div>
        </MainLayout>
    );
};

export default Books;
