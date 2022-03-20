import React, {useEffect, useState} from 'react';
import './BooksChapter.scss'
import cn from 'classnames'
import {useTheme} from "../../../hooks/useTheme";
import Button from "../../Components/Button/Button";
import BookItem from "../../Components/BookItem/BookItem";
import H2 from "../../Components/H2/H2";
import BooksList from "../../Components/BooksList/BooksList";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getAllBooks} from "../../../redux/slices/books.slice";
import {BookType} from "../../../types/books";

const BooksChapter = () => {
    const {isDark} = useTheme()
    const dispatch = useAppDispatch()
    const {books:booksList} = useAppSelector(state => state.books)
    const [books, setBooks] = useState<BookType[]>(booksList)

    useEffect(() => {
        dispatch(getAllBooks())
    },[])

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
            <Button text={'main-page.books.button'} center={true} path={'books'}/>
        </div>
    );
};

export default BooksChapter;
