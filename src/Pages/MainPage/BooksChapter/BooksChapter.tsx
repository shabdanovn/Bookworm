import React from 'react';
import './BooksChapter.scss'
import cn from 'classnames'
import {useTranslation} from "react-i18next";
import {useTheme} from "../../../hooks/useTheme";
import Button from "../../Components/Button/Button";
import BookItem from "../../Components/BookItem/BookItem";
import H2 from "../../Components/H2/H2";

const BooksChapter = () => {
    const {t} = useTranslation()
    const {isDark} = useTheme()

    const books = [
        {id: 1, title: 'Python Basics', author: 'Dan Bader', img: '', price: '250 som', conditions: ''},
        {id: 8, title: 'Whale of a Tale', author: 'E. Hemingway', img: '', price: '', conditions: 'Free'},
        {id: 7, title: 'Killing', author: 'E. Hemingway', img: '', price: '', conditions: 'Bookcrossing'},
        {id: 5, title: 'Imagine the possibilities', author: 'Written by You', img: '', price: '', conditions: 'Bookcrossing'},
    ]

    return (
        <div className={cn('books-chapter', {dark: isDark})}>
            <H2 text={'main-page.books.title'} margin={true}/>
            <div className={cn('books')}>
                {books.map(book=> {
                    return <BookItem key={book.id} book={book}/>
                })}
            </div>
            <Button text={'main-page.books.button'} center={true} path={'books'}/>
        </div>
    );
};

export default BooksChapter;
