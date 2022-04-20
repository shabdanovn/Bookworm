import React, {useEffect, useState} from 'react';
import MainLayout from "../Components/MainLayout/MainLayout";
import cn from "classnames";
import H3 from "../Components/H3/H3";
import {BookItemType} from "../../types/types";
import BookItem from "../Components/BookItem/BookItem";
import './SavedBooksPage.scss'
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {BookType} from "../../types/books";
import {getSavedBooks} from "../../redux/slices/books.slice";
import Loader from "../Components/Loader/Loader";

const SavedBooksPage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {isLoggedIn, user} = useAppSelector(state => state.auth)
    const {savedBooks, isLoading} = useAppSelector(state => state.books)
    const [booksList, setBooksList] = useState<BookType[]>(savedBooks)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(!isLoggedIn) navigate('/books')
    }, [isLoggedIn, navigate])

    useEffect(() => {
        if(isLoggedIn) dispatch(getSavedBooks(user.id))
    }, []);

    useEffect(() => {
        setBooksList(savedBooks)
    }, [savedBooks]);

    if(isLoading) return <Loader/>

    return (
        <MainLayout>
            {isLoading ? <Loader/> :
                <div className={cn('saved-books-page')}>
                    <H3 text={t('saved-books.title')} font={true}/>
                    <div className={cn('saved-books-content')}>
                        {booksList.map(book => {
                            return <BookItem key={book.id} book={book}/>
                        })}
                    </div>
                </div>
            }
        </MainLayout>
    );
};

export default SavedBooksPage;
