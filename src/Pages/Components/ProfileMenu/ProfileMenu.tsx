import React from 'react';
import './ProfileMenu.scss'
import cn from "classnames";
import AuthedMenuLayout from "../ModalWindows/AuthedMenu/AuthedMenuLayout";
import usernameLogo from '../../../images/username.svg'
import posts from '../../../images/posts.svg'
import signout from '../../../images/sign_out.svg'
import saved from '../../../images/saved.svg'
import notif from '../../../images/bell.svg'
import message from '../../../images/message.svg'
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import useModal from "../../../hooks/useModal";

const ProfileMenu = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {close} = useModal()

    const clickHandle = (path: string) => {
        navigate(path)
        close()
    }

    return (
        <AuthedMenuLayout>
            <div className={cn('profile-menu')}>
                <div className={cn('username')}>
                    <img src={usernameLogo} alt={'Username logo'}/>
                    <p onClick={() => clickHandle('/profile-page')}>username</p>
                </div>
                <div className={cn('notifications')}>
                    <img src={notif} alt={'Notifications logo'}/>
                    <p>{t('auth-burger-menu.notifications')}</p>
                </div>
                <div onClick={() => clickHandle('/messages-page')}
                     className={cn('messages')}>
                    <img src={message} alt={'Messages logo'}/>
                    <p>{t('auth-burger-menu.messages')}</p>
                </div>
                <div onClick={() => clickHandle('/saved-books')}
                     className={cn('saved')}>
                    <img src={saved} alt={'Saved logo'}/>
                    <p>{t('auth-burger-menu.saved')}</p>
                </div>
                <div className={cn('my-posts')}
                     onClick={()=> clickHandle('/profile-page/my-books')}>
                    <img src={posts} alt={'Posts logo'}/>
                    <p>{t('auth-burger-menu.my-books')}</p>
                </div>
                <div className={cn('sign-out')}>
                    <img src={signout} alt={'Sign out logo'}/>
                    <p>{t('auth-burger-menu.sign-out')}</p>
                </div>
            </div>
        </AuthedMenuLayout>
    );
};

export default ProfileMenu;
