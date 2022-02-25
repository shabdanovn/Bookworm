import React from 'react';
import {NavLink} from "react-router-dom";
import cn from "classnames";
import './SignInPage.scss'
import usernameLogo from '../../../images/username.svg'
import passwordLogo from '../../../images/password.svg'
import {useTranslation} from "react-i18next";
import RegistrationLayout from "../RegistrationLayout/RegistrationLayout";

const SignInPage = () => {
    const {t} = useTranslation()
    return (
        <RegistrationLayout path={'/sign-up'}
                            ButtonText={'registration.sign-up'}
                            titleText={'registration.no-account'}>
            <div className={cn('signin-content')}>
                <p className={cn('title')}>{t('registration.sign-in')}</p>
                <div className={cn('fields-group')}>
                    <div className={cn('username')}>
                        <img src={usernameLogo} alt={'Username icon'}/>
                        <input type={'text'} placeholder={t('registration.username')}/>
                    </div>
                    <div className={cn('password')}>
                        <img src={passwordLogo} alt={'Password icon'}/>
                        <input type={'password'} placeholder={t('registration.password')}/>
                    </div>
                </div>
                <NavLink to="sign-in" className={cn('forgot-pwd')}>{t('registration.forgot-password')}</NavLink>
                <button className={cn('start-btn')}>{t('registration.sign-in')}</button>
            </div>
        </RegistrationLayout>
    );
};

export default SignInPage;
