import React, {useState} from 'react';
import './BookPage.scss'
import MainLayout from "../../Components/MainLayout/MainLayout";
import cn from "classnames";
import {useParams} from "react-router-dom";
import {BookItemType, UserType} from "../../../types/types";
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

const BookPage = () => {
    const {t} = useTranslation()
    const {id} = useParams()
    const {isDark} = useTheme()
    const [book, setBook] =useState<BookItemType>({
        id: 1,
        title:'Python Basics',
        author: 'Dan Bader',
        img: '',
        cost: '250 som',
        user_id: 12,
        conditions: 'Bookcrossing',
        description: 'The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn\'t distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.\n',
        genre: "Education",
        state: '8'
    })
    const [user, setUser] = useState<UserType>({
        id: 1,
        img: '',
        city: 'Bishkek',
        city_id: 1,
        email: 'nightKnight@gmail.com',
        fullname: 'Alisher Haha',
        phone: "+996700100100",
        username: 'nightKnight'
    })

    const [isSaved, setIsSaved] = useState<boolean>(false)
    const [showComments, setShowComments] = useState<boolean>(false)

    const saveClick = () => {
        setIsSaved(prevState => !prevState)
    }

    return (
        <MainLayout>
            <div className={cn('book-page', {dark: isDark})}>
                <div className={cn('image-info-group')}>
                    <div className={cn('book-img-action-group')}>
                        <div className={cn('book-image')}>
                            <img src={book.img ? book.img : bookLogo} alt={'Book image'}/>
                        </div>
                        <div className={cn('buttons')}>
                            <button onClick={() => setShowComments(prevState => !prevState)}>
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
                            <p>{t('book-page.genre')}: <span>{book.genre}</span></p>
                        </div>
                        <div className={cn('owner-info')}>
                            <p className={cn('owner-title')}>{t('book-page.owner')}</p>
                            <div>
                                <img src={usernameLogo} alt={'Username logo'}/>
                                <span>{user.username}</span>
                            </div>
                            <div>
                                <img src={phone} alt={'Phone logo'}/>
                                <span>{user.phone}</span>
                            </div>
                            <div>
                                <img src={city} alt={'City logo'}/>
                                <span>{user.city}</span>
                            </div>
                            <div>
                                <img src={price} alt={'Price logo'}/>
                                <span>{book.cost}</span>
                            </div>
                            <div>
                                <p>{t('book-page.state')}: <span>{book.state}</span></p>
                            </div>
                            <div>
                                <p>{t('book-page.other')}: <span>{book.conditions}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cn('book-descr')}>
                    <p className={cn('descr-title')}>{t('book-page.descr')}</p>
                    <p>The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.</p>
                </div>
            </div>
            {showComments && <Comments/>}
        </MainLayout>
    );
};

export default BookPage;
