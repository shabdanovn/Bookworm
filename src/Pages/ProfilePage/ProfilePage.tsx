import React, {useEffect, useState} from 'react';
import cn from "classnames";
import './ProfilePage.scss'
import MainLayout from "../Components/MainLayout/MainLayout";
import {BookItemType, UserType} from "../../types/types";
import avatar from '../../images/avatar.svg'
import PostItem from "../Components/PostItem/PostItem";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";
import {API_URL} from "../../utils/constants";
import Loader from "../Components/Loader/Loader";

const user: UserType = {
    id: 1,
    img: '',
    username: 'nightKnight',
    phone: "+996700100100",
    email: "hero@elixir.labs",
    city_id: 1,
    city: "Bishkek",
    fullname: 'John Doe'
}
const booksList: BookItemType[] = [
    {id: 1, title: 'Python Basics', author: 'Dan Bader', img: '', cost: '250 som', conditions: '', user_id: 1},
    {id: 2, title: 'Whale of a Tale', author: 'E. Hemingway', img: '', cost: '', conditions: 'Free', user_id: 2},
    {id: 3, title: 'Killing', author: 'E. Hemingway', img: '', cost: '', conditions: 'Bookcrossing', user_id: 3},
    {id: 4, title: 'Imagine the possibilities', author: 'Written by You', img: '', cost: '', conditions: 'Bookcrossing', user_id: 4},
]

const ProfilePage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {user: userNew, isLoggedIn} = useAppSelector(state => state.auth)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        if(!isLoggedIn) navigate('/books')
        setLoading(false)
    }, [isLoggedIn, navigate])

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
                            <img src={userNew && userNew.img ? `${API_URL}/${userNew.img}` : avatar} alt={"User avatar pic"}/>
                            {/*<img src={avatar} alt={"User avatar pic"}/>*/}
                            <div className={cn('profile-info')}>
                                <p className={cn('profile-info__fullname')}>{user.fullname}</p>
                                <p>{user.username}</p>
                                <p>{user.email}</p>
                                <p>{user.phone}</p>
                                <p>{user.city}</p>
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
                        {booksList.map(book => <PostItem key={book.id} book={book} />)}
                    </div>
                </div>
            </div>}
        </MainLayout>
    );
};

export default ProfilePage;
