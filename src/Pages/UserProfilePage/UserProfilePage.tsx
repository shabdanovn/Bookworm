import React, {useEffect, useState} from 'react';
import cn from "classnames";
import './UserProfilePage.scss'
import MainLayout from "../Components/MainLayout/MainLayout";
import avatar from '../../images/avatar.svg'
import book from '../../images/book3.png'
import PostItem from "../Components/PostItem/PostItem";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {API_URL} from "../../utils/constants";
import Loader from "../Components/Loader/Loader";
import {getUsersBooks} from "../../redux/slices/books.slice";
import {BookType} from "../../types/books";
import {getUser} from "../../redux/slices/user.slice";
import {FriendsCountType} from "../../types/friends";
import {getFriendsCount} from "../../redux/slices/friends.slice";

const UserProfilePage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {id} = useParams()
    const {user: userNew, isLoggedIn} = useAppSelector(state => state.auth)
    // const {currentUser, isLoading} = useAppSelector(state => state.user)
    // const {myBooks} = useAppSelector(state => state.books)
    // const {friendsCount} = useAppSelector(state => state.friends)
    const [loading, setLoading] = useState(false)
    // const [user, setUser] = useState(currentUser)
    // const [friends, setFriends] = useState<FriendsCountType>(friendsCount)
    // const [booksList, setBooksList] = useState<BookType[]>(myBooks)
    const dispatch = useAppDispatch()

    // useEffect(()=>{
    //     setLoading(true)
    //     if(!isLoggedIn) navigate('/books')
    //     setLoading(false)
    // }, [isLoggedIn, navigate])

    useEffect(() => {
        if(isLoggedIn && id) {
            dispatch(getUsersBooks(+id))
            dispatch(getUser(+id))
            dispatch(getFriendsCount(+id))
        }
    }, [])

    // useEffect(() => setBooksList(myBooks), [myBooks])
    // useEffect(() => setUser(currentUser), [currentUser])
    // useEffect(() => setFriends(friendsCount), [friendsCount])

    return (
        <MainLayout>
            {loading ? <Loader/> :
            <div className={cn('user-profile-page')}>
                <div className={cn("user-profile-page__content")}>
                    <div className={cn('user-profile-page__profile-part')}>
                        <div className={cn('user-profile-page__profile')}>
                            <div className={cn('user-profile-page__title-edit title-btn')}>
                                <p className={'title'}>{t('profile-page.profile')}</p>
                                <button onClick={() => navigate('profile-edit')}>{t('profile-page.edit-profile')}</button>
                            </div>
                            <div className={cn('user-profile-page__profile-content')}>
                                {/*<img src={user && user.img ? `${API_URL}/${user.img}` : avatar} alt={"User avatar pic"}/>*/}
                                {/*<div className={cn('profile-info')}>*/}
                                {/*    <p className={cn('profile-info__fullname')}>{user.fullname}</p>*/}
                                {/*    <p>{user.username}</p>*/}
                                {/*    <p>{user.email}</p>*/}
                                {/*    <p>{user.phone}</p>*/}
                                {/*    <p>{user.city?.name || '---'}</p>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className={cn('user-profile-page__friends')}>
                            <div className={'title-btn'}>
                                <p className={'title'}>{t('profile-page.friends')}</p>
                            </div>
                            <div className={cn('friends-blocks')}>
                                <div className={cn('friends-block followers')}
                                    onClick={() => navigate('/followers')}
                                >
                                    <p>{t('profile-page.followers')}:</p>
                                    {/*<p>{friends.followers}</p>*/}
                                </div>
                                <div className={cn('friends-block followings')}
                                     onClick={() => navigate('/followings')}
                                >
                                    <p>{t('profile-page.followings')}:</p>
                                    {/*<p>{friends.followings}</p>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cn('user-profile-page__posts-reading-book-part')}>
                    <div className={cn('reading-book-item')}>
                        <div className={cn('user-profile-page__posts-title  title-btn')}>
                            <p className={'title'}>Reading book</p>
                            <button onClick={() => navigate('edit-reading-book')}>Edit book</button>
                        </div>

                        <div className={cn('reading-book-item__part')}>
                            {/*<img src={user && user.img ? `${API_URL}/${user.img}` : avatar} alt={"User avatar pic"}/>*/}
                            <img src={book} alt={"User avatar pic"}/>
                            <div>
                                <p className={cn('book-title')}>Killing Hemingway</p>
                                <p>Brian D.Meeks</p>
                                <p>Classics</p>
                                <p>Start date: 22 March 2022</p>
                            </div>
                        </div>
                    </div>

                    <div className={cn('post-part')}>
                        <div className={cn('user-profile-page__posts-title  title-btn')}>
                            <p className={'title'}>{t('profile-page.posts')}</p>
                            <button onClick={() => navigate('my-books')}>{t('profile-page.see-all')}</button>
                        </div>

                        <div className={cn('posts-part')}>
                            {/*{booksList.slice(0, 2).map(book => <PostItem key={book.id} book={book} />)}*/}
                        </div>
                    </div>
                </div>
                </div>
                <div className={cn('user-profile-page__my-posts-challenges')}>
                    <p onClick={() => navigate('my-posts')}>My created posts</p>
                    <p onClick={() => navigate('/my-created-challenges')}>My created challenges</p>
                    <p onClick={() => navigate('/challenges-in')}>Challenges I am in</p>
                </div>
            </div>}
        </MainLayout>
    );
};

export default UserProfilePage;
