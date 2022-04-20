import React, {useEffect, useState} from 'react';
import './MyBooksPage.scss'
import MainLayout from "../Components/MainLayout/MainLayout";
import cn from "classnames";
import H3 from "../Components/H3/H3";
import BookItem from "../Components/BookItem/BookItem";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getUsersBooks} from "../../redux/slices/books.slice";
import {BookType} from "../../types/books";
import Loader from "../Components/Loader/Loader";

const MyBooksPage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {isLoggedIn, user} = useAppSelector(state => state.auth)
    const {myBooks, isLoading} = useAppSelector(state => state.books)
    const [booksList, setBooksList] = useState<BookType[]>(myBooks)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(!isLoggedIn) navigate('/books')
    }, [isLoggedIn, navigate])

    useEffect(() => {
        if(isLoggedIn) dispatch(getUsersBooks(user.id))
    },[])

    useEffect(() => {
        setBooksList(myBooks)
    }, [myBooks])

    if(isLoading) return <Loader/>

    return (
        <MainLayout>
            {isLoading ? <Loader/> :
                <div className={cn('my-books-page')}>
                <H3 text={t('my-books.title')} font={true}/>
                <div className={cn('books-content')}>
                    {booksList.map(book => {
                        return <BookItem book={book} key={book.id}/>
                    })}
                </div>
            </div>
            }
        </MainLayout>
    );
};

export default MyBooksPage;
