import React, {useCallback, useState} from 'react';
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

const Books = () => {
    const {t} = useTranslation()
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

    const [books, setBooks] = useState<BookItemType[]>(booksList)
    const {setModalContent, open, close} = useModal()

    const clickHandler = useCallback(
        () => {
            setModalContent(<FiltersModalWindow close={close}/>)
            open()
        },
        [],
    );

    console.log('rendered')

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
