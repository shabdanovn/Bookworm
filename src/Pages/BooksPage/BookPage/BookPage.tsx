import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import MainLayout from "../../Components/MainLayout/MainLayout";
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
import {getBook, getSavedBooks, removeSavedBook, saveBook} from "../../../redux/slices/books.slice";
import {BookCityType, BookType} from "../../../types/books";
import Loader from "../../Components/Loader/Loader";
import {API_URL} from "../../../utils/constants";
import {CityType} from "../../../types/types";
import {useGeneralContext} from "../../../hooks/useGeneralContext";
import useModal from "../../../hooks/useModal";
import MessageModal from "../../Components/ModalWindows/MessageModal/MessageModal";
import NotAuthedModal from "../../Components/ModalWindows/NotAuthedModal/NotAuthedModal";
import cn from "classnames";
import { ToastContainer, toast } from 'react-toastify';
import './BookPage.scss'
import {getSavedPosts} from "../../../redux/slices/posts.slice";


const BookPage = () => {
    const {t} = useTranslation()
    const {id} = useParams()
    const {isDark} = useTheme()
    const {bookInfo, isLoading, savedBooks} = useAppSelector(state => state.books)
    const {isLoggedIn, user} = useAppSelector(state => state.auth)
    const {setBookId} = useGeneralContext()
    const dispatch = useAppDispatch()
    const [book, setBook]=useState<BookCityType>(bookInfo)
    const {showComments, setShowComments} = useGeneralContext()
    const [isSaved, setIsSaved] = useState<boolean>(false)
    const {open, close, setModalContent} = useModal()
    const commentsRef = useRef<null|HTMLDivElement>(null)

    const showCommentsHandle = () => setShowComments(!showComments)

    if(showComments) commentsRef.current?.scrollIntoView({behavior: "smooth"})
    else window.scrollTo(0,0)

    useEffect(() => {
        setShowComments(false)
        if(id) dispatch(getBook(+id))
        if(savedBooks.length === 0 && user) dispatch(getSavedBooks(user.id))
        if(id && savedBooks.find(item => item.id === +id))
            setIsSaved(true)
    }, [])

    useEffect(() => {
        setBook(bookInfo)
    }, [bookInfo])

    const saveHandle = (e: MouseEvent<HTMLImageElement>) => {
        if(!isLoggedIn) {
            setModalContent(<NotAuthedModal close={close}/>)
            open()
        }else {
            if(id){
                if(isSaved) {
                    dispatch(removeSavedBook({userId: user.id, bookId: +id}))
                    setIsSaved(false)
                    toast('???? Book is unsaved!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else {
                    dispatch(saveBook({userId: user.id, bookId: +id}))
                    setIsSaved(true)
                    toast('???? Book is saved!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        }
    }
    
    const messageHandle = () => {
        if(isLoggedIn){
            setModalContent(<MessageModal username={book.book?.user?.username}
                                          receiverId={book.book?.user?.id}
                                          senderId={user.id} close={close}/> )
            open()
        }else{
            setModalContent(<NotAuthedModal close={close}/>)
            open()
        }
    }
    

    return (
        <MainLayout>
            <div className={cn('book-page', {dark: isDark})}>
                {isLoading && <Loader/>}
                <div className={cn('image-info-group')}>
                    <div className={cn('book-img-action-group')}>
                        <div className={cn('book-image')}>
                            <img src={book.book && book.book.img ? `${API_URL}/${book.book.img}` : bookLogo} alt={'Book image'}/>
                        </div>
                        <div className={cn('buttons')}>
                            <button onClick={showCommentsHandle}>
                                {t('book-page.comments')}</button>
                            <div onClick={saveHandle}>
                                <img src={isSaved ? savedLogo : saveLogo} alt={'Save logo'}/>
                            </div>
                            <button onClick={messageHandle}>{t('book-page.message')} <img src={sendLogo} alt={'Send logo'}/></button>
                        </div>
                    </div>
                    <div className={cn('book-content')}>
                        <div className={cn('book-info')}>
                            <p>{t('book-page.title')}: <span>{book.book?.title}</span></p>
                            <p>{t('book-page.author')}: <span>{book.book?.author}</span></p>
                            <p>{t('book-page.genre')}: {book.book?.genres?.map(genre=> {
                                return <span key={genre.id}>{t(`genres.${genre.name}`)}</span>
                            })}</p>
                        </div>
                        <div className={cn('owner-info')}>
                            <p className={cn('owner-title')}>{t('book-page.owner')}</p>
                            <div>
                                <img src={usernameLogo} alt={'Username logo'}/>
                                <span>{book.book?.user?.username}</span>
                            </div>
                            <div>
                                <img src={phone} alt={'Phone logo'}/>
                                <span>{book.book?.user?.phone}</span>
                            </div>
                            <div>
                                <img src={city} alt={'City logo'}/>
                                <span>{book.city?.name}</span>
                            </div>
                            <div>
                                <img src={price} alt={'Price logo'}/>
                                <span>{book.book?.cost ? book.book?.cost : '-----'}</span>
                            </div>
                            <div>
                                <p>{t('book-page.state')}: <span>{book.book?.state} / 10</span></p>
                            </div>
                            <div>
                                <p>{t('book-page.other')}: <span>{book.book?.conditions ? book.book?.conditions : '-----'}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cn('book-descr')}>
                    <p className={cn('descr-title')}>{t('book-page.descr')}</p>
                    <p>{book.book?.notes}</p>
                </div>
                <ToastContainer/>
            </div>
            {showComments && <Comments bookId={book.book?.id} ref={commentsRef}/>}
        </MainLayout>
    );
};

export default BookPage;
