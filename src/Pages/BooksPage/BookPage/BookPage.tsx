import React, {useEffect, useState} from 'react';
import './BookPage.scss'
import MainLayout from "../../Components/MainLayout/MainLayout";
import cn from "classnames";
import {useParams} from "react-router-dom";
import bookLogo from '../../../images/book2.png'
import usernameLogo from '../../../images/username.svg'
import phone from '../../../images/phone.svg'
import city from '../../../images/city.svg'
import price from '../../../images/price.svg'
import saveLogo from '../../../images/save.svg'
import savedLogo from '../../../images/saved.svg'
import sendLogo from '../../../images/send.svg'
import {useTheme} from "../../../hooks/useTheme";
import {useTranslation} from "react-i18next";
import Comments from "./Comments/Comments";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getBook} from "../../../redux/slices/books.slice";
import {BookType} from "../../../types/books";
import Loader from "../../Components/Loader/Loader";
import {API_URL} from "../../../utils/constants";
import {CityType} from "../../../types/types";


const BookPage = () => {
    const {t} = useTranslation()
    const {id} = useParams()
    const {isDark} = useTheme()
    const {bookInfo, isLoading, userCity: CityName} = useAppSelector(state => state.books)
    const dispatch = useAppDispatch()
    const [book, setBook] =useState<BookType>(bookInfo)
    const [userCity, setUserCity] = useState<CityType>(CityName)


    const [isSaved, setIsSaved] = useState<boolean>(false)
    const [showComments, setShowComments] = useState<boolean>(false)

    const saveClick = () => {
        setIsSaved(prevState => !prevState)
    }

    const showCommentsHandle = () => {
        setShowComments(prevState => !prevState)
    }

    if(showComments) window.scrollTo(0, document.body.scrollHeight+50)
    else window.scrollTo(0,0)

    useEffect(() => {
        if(id) dispatch(getBook(+id))
    }, [])

    useEffect(() => {
        setBook(bookInfo)
    }, [bookInfo])

    return (
        <MainLayout>
            <div className={cn('book-page', {dark: isDark})}>
                {isLoading
                    ? <Loader/>
                    :  <><div className={cn('image-info-group')}>
                        <div className={cn('book-img-action-group')}>
                            <div className={cn('book-image')}>
                                <img src={book && book.img ? `${API_URL}/${book.img}` : bookLogo} alt={'Book image'}/>
                            </div>
                            <div className={cn('buttons')}>
                                <button onClick={showCommentsHandle}>
                                    {t('book-page.comments')}</button>
                                <div onClick={saveClick}>
                                    <img src={isSaved ? savedLogo : saveLogo} alt={'Save logo'}/></div>
                                <button>{t('book-page.message')} <img src={sendLogo} alt={'Send logo'}/></button>
                            </div>
                        </div>
                        <div className={cn('book-content')}>
                            <div className={cn('book-info')}>
                                <p>{t('book-page.title')}: <span>{book.title}</span></p>
                                <p>{t('book-page.author')}: <span>{book.author}</span></p>
                                <p>{t('book-page.genre')}: {book.genres?.map(genre=> {
                                    return <span key={genre.id}>{genre.name}</span>
                                })}</p>
                            </div>
                            <div className={cn('owner-info')}>
                                <p className={cn('owner-title')}>{t('book-page.owner')}</p>
                                <div>
                                    <img src={usernameLogo} alt={'Username logo'}/>
                                    <span>{book.user?.username}</span>
                                </div>
                                <div>
                                    <img src={phone} alt={'Phone logo'}/>
                                    <span>{book.user?.phone}</span>
                                </div>
                                <div>
                                    <img src={city} alt={'City logo'}/>
                                    <span>{userCity.name}</span>
                                </div>
                                <div>
                                    <img src={price} alt={'Price logo'}/>
                                    <span>{book.cost ? book.cost : '-----'}</span>
                                </div>
                                <div>
                                    <p>{t('book-page.state')}: <span>{book.state} / 10</span></p>
                                </div>
                                <div>
                                    <p>{t('book-page.other')}: <span>{book.conditions ? book.conditions : '-----'}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cn('book-descr')}>
                        <p className={cn('descr-title')}>{t('book-page.descr')}</p>
                        <p>{book.notes}</p>
                    </div></>
                }
            </div>
            {showComments && <Comments bookId={book.id} bookComments={book.comments}/>}
        </MainLayout>
    );
};

export default BookPage;
