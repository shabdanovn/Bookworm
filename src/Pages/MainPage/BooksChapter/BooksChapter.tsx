import React from 'react';
import './BooksChapter.scss'
import cn from 'classnames'
import {useTranslation} from "react-i18next";
import {useTheme} from "../../../hooks/useTheme";
import Button from "../../Components/Button/Button";
import BookItem from "../../Components/BookItem/BookItem";
import H2 from "../../Components/H2/H2";
import BooksList from "../../Components/BooksList/BooksList";

const BooksChapter = () => {
    const {t} = useTranslation()
    const {isDark} = useTheme()

    const books = [
        {id: 1, title: 'Python Basics', author: 'Dan Bader', img: '', cost: '250 som', conditions: '', user_id: 1},
        {id: 2, title: 'Whale of a Tale', author: 'E. Hemingway', img: '', cost: '', conditions: 'Free', user_id: 2},
        {id: 3, title: 'Killing', author: 'E. Hemingway', img: '', cost: '', conditions: 'Bookcrossing', user_id: 3},
        {id: 4, title: 'Imagine the possibilities', author: 'Written by You', img: '', cost: '', conditions: 'Bookcrossing', user_id: 4},
    ]

    return (
        <div className={cn('books-chapter', {dark: isDark})}>
            <H2 text={'main-page.books.title'} margin={true}/>
            <BooksList>
                {books.map(book=> {
                    return <BookItem key={book.id} book={book}/>
                })}
            </BooksList>
            <Button text={'main-page.books.button'} center={true} path={'books'}/>
        </div>
    );
};

export default BooksChapter;
