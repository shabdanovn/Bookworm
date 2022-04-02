import React, {useEffect, useState} from 'react';
import './BooksChapter.scss'
import cn from 'classnames'
import {useTheme} from "../../../hooks/useTheme";
import BookItem from "../../Components/BookItem/BookItem";
import H2 from "../../Components/H2/H2";
import BooksList from "../../Components/BooksList/BooksList";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getAllBooks, getSavedBooks} from "../../../redux/slices/books.slice";
import {BookType} from "../../../types/books";
import SecondaryButton from "../../Components/Button/SecondaryButton/SecondaryButton";

const BooksChapter = () => {
    const {isDark} = useTheme()
    const dispatch = useAppDispatch()
    const {books:booksList} = useAppSelector(state => state.books)
    const {isLoggedIn, user} = useAppSelector(state => state.auth)
    const [books, setBooks] = useState<BookType[]>(booksList)

    useEffect(() => {
        dispatch(getAllBooks())
        if(isLoggedIn) dispatch(getSavedBooks(user.id))
    },[dispatch])

    useEffect(() => {
        setBooks(booksList)
    },[booksList])

    return (
        <div className={cn('books-chapter', {dark: isDark})}>
            <H2 text={'main-page.books.title'} margin={true}/>
            <BooksList>
                {books.slice(0, 4).map(book=> {
                    return <BookItem key={book.id} book={book}/>
                })}
            </BooksList>
            <SecondaryButton text={'main-page.books.button'} center={true} path={'books'}/>
        </div>
    );
};

export default BooksChapter;
