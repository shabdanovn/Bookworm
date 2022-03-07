import React from 'react';
import './MyBooksPage.scss'
import MainLayout from "../Components/MainLayout/MainLayout";
import cn from "classnames";
import H3 from "../Components/H3/H3";
import {BookItemType} from "../../types/types";
import BookItem from "../Components/BookItem/BookItem";
import {useTranslation} from "react-i18next";

const booksList: BookItemType[] = [
    {id: 1, title: 'Python Basics', author: 'Dan Bader', img: '', cost: '250 som', conditions: '', user_id: 1},
    {id: 2, title: 'Whale of a Tale', author: 'E. Hemingway', img: '', cost: '', conditions: 'Free', user_id: 2},
    {id: 3, title: 'Killing', author: 'E. Hemingway', img: '', cost: '', conditions: 'Bookcrossing', user_id: 3},
    {id: 4, title: 'Imagine the possibilities', author: 'Written by You', img: '', cost: '', conditions: 'Bookcrossing', user_id: 4},
    {id: 6, title: 'Imagine the possibilities', author: 'Written by You', img: '', cost: '230 som', conditions: '', user_id: 4},
    {id: 7, title: 'Imagine the possibilities', author: 'Written by You', img: '', cost: '', conditions: 'Bookcrossing', user_id: 4},
    {id: 8, title: 'Imagine the possibilities', author: 'Written by You', img: '', cost: '350R', conditions: '', user_id: 4},
    {id: 9, title: 'Imagine the possibilities', author: 'Written by You', img: '', cost: '', conditions: 'Bookcrossing', user_id: 4},
    {id: 10, title: 'Imagine the possibilities', author: 'Written by You', img: '', cost: '', conditions: 'Free', user_id: 4},
    {id: 11, title: 'Imagine the possibilities', author: 'Written by You', img: '', cost: '', conditions: 'Bookcrossing', user_id: 4},
    {id: 12, title: 'Imagine the possibilities', author: 'Written by You', img: '', cost: '', conditions: 'Free', user_id: 4},
    // {id: 13, title: 'Imagine the possibilities', author: 'Written by You', img: '', cost: '215$', conditions: '', user_id: 4},
]

const MyBooksPage = () => {
    const {t} = useTranslation()
    return (
        <MainLayout>
            <div className={cn('my-books-page')}>
                <H3 text={t('my-books.title')} font={true}/>
                <div className={cn('books-content')}>
                    {booksList.map(book => {
                        return <BookItem book={book} key={book.id}/>
                    })}
                </div>
            </div>
        </MainLayout>
    );
};

export default MyBooksPage;
