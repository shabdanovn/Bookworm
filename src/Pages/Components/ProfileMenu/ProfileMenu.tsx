import React from 'react';
import './ProfileMenu.scss'
import cn from "classnames";
import AuthedMenuLayout from "../ModalWindows/AuthedMenu/AuthedMenuLayout";
import MessageIcon from "../Icons/MessageIcon/MessageIcon";
import Bell from "../Icons/Bell/Bell";
import usernameLogo from '../../../images/username.svg'
import posts from '../../../images/posts.svg'
import signout from '../../../images/sign_out.svg'
import saved from '../../../images/saved.svg'
import notif from '../../../images/bell.svg'
import message from '../../../images/message.svg'
import {useTranslation} from "react-i18next";

const ProfileMenu = () => {
    const {t} = useTranslation()
    return (
        <AuthedMenuLayout>
            <div className={cn('profile-menu')}>
                <div className={cn('username')}>
                    <img src={usernameLogo} alt={'Username logo'}/>
                    <p>username</p>
                </div>
                <div className={cn('notifications')}>
                    <img src={notif} alt={'Notifications logo'}/>
                    <p>{t('auth-burger-menu.notifications')}</p>
                </div>
                <div className={cn('messages')}>
                    <img src={message} alt={'Messages logo'}/>
                    <p>{t('auth-burger-menu.messages')}</p>
                </div>
                <div className={cn('saved')}>
                    <img src={saved} alt={'Saved logo'}/>
                    <p>{t('auth-burger-menu.saved')}</p>
                </div>
                <div className={cn('my-posts')}>
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
