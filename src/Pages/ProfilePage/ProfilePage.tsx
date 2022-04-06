import React, {useEffect, useState} from 'react';
import cn from "classnames";
import './ProfilePage.scss'
import MainLayout from "../Components/MainLayout/MainLayout";
import avatar from '../../images/avatar.svg'
import PostItem from "../Components/PostItem/PostItem";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {API_URL} from "../../utils/constants";
import Loader from "../Components/Loader/Loader";
import {getUsersBooks} from "../../redux/slices/books.slice";
import {BookType} from "../../types/books";
import {getUser} from "../../redux/slices/user.slice";

const ProfilePage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {user: userNew, isLoggedIn} = useAppSelector(state => state.auth)
    const {currentUser, isLoading} = useAppSelector(state => state.user)
    const {myBooks} = useAppSelector(state => state.books)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(currentUser)
    const [booksList, setBooksList] = useState<BookType[]>(myBooks)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        setLoading(true)
        if(!isLoggedIn) navigate('/books')
        setLoading(false)
    }, [isLoggedIn, navigate])

    useEffect(() => {
        if(isLoggedIn) {
            if (myBooks.length === 0) dispatch(getUsersBooks(userNew.id))
            if (Object.keys(currentUser).length === 0) dispatch(getUser(userNew.id))
        }
    }, [])

    useEffect(() => setBooksList(myBooks), [myBooks])
    useEffect(() => setUser(currentUser), [currentUser])

    return (
        <MainLayout>
            {loading ? <Loader/> :
            <div className={cn('profile-page')}>
                <div className={cn('profile-page__profile-part')}>
                    <div className={cn('profile-page__profile')}>
                        <div className={cn('profile-page__title-edit title-btn')}>
                            <p className={'title'}>{t('profile-page.profile')}</p>
                            <button onClick={() => navigate('profile-edit')}>{t('profile-page.edit-profile')}</button>
                        </div>
                        <div className={cn('profile-page__profile-content')}>
                            <img src={user && user.img ? `${API_URL}/${user.img}` : avatar} alt={"User avatar pic"}/>
                            <div className={cn('profile-info')}>
                                <p className={cn('profile-info__fullname')}>{user.fullname}</p>
                                <p>{user.username}</p>
                                <p>{user.email}</p>
                                <p>{user.phone}</p>
                                <p>{user.city?.name || '---'}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cn('profile-page__friends')}>
                        <div className={'title-btn'}>
                            <p className={'title'}>{t('profile-page.friends')}</p>
                            <button>{t('profile-page.see-all')}</button>
                        </div>
                        <div className={cn('friends-blocks')}>
                            <div className={cn('friends-block followers')}>
                                <p>{t('profile-page.followings')}:</p>
                                <p>235</p>
                            </div>
                            <div className={cn('friends-block followings')}>
                                <p>{t('profile-page.followers')}:</p>
                                <p>12</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cn('profile-page__posts-part')}>
                    <div className={cn('profile-page__posts-title  title-btn')}>
                        <p className={'title'}>{t('profile-page.posts')}</p>
                        <button onClick={() => navigate('my-books')}>{t('profile-page.see-all')}</button>
                    </div>

                    <div className={cn('posts-part')}>
                        {booksList.slice(0, 4).map(book => <PostItem key={book.id} book={book} />)}
                    </div>
                </div>
            </div>}
        </MainLayout>
    );
};

export default ProfilePage;
