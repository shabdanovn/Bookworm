import React from 'react';
import {NavLink} from "react-router-dom";
import cn from "classnames";
import './SignUpPage.scss'
import usernameLogo from '../../../images/username.svg'
import passwordLogo from '../../../images/password.svg'
import fullnameLogo from '../../../images/fullname.svg'
import emailLogo from '../../../images/email.svg'
import phoneLogo from '../../../images/phone.svg'
import cityLogo from '../../../images/city.svg'
import {useTranslation} from "react-i18next";
import RegistrationLayout from "../RegistrationLayout/RegistrationLayout";

const SignUpPage = () => {
    const {t} = useTranslation()
    return (
        <RegistrationLayout path={'/sign-in'}
                            ButtonText={'registration.sign-in'}
                            titleText={'registration.have-account'}>
            <div className={cn('signup-content')}>
                <p className={cn('title')}>{t('registration.registration')}</p>
                <div className={cn('fields-group')}>
                    <div className={cn('fullname')}>
                        <img src={fullnameLogo} alt={'Full name icon'}/>
                        <input type={'text'} placeholder={t('registration.fullname')}/>
                    </div>
                    <div className={cn('email')}>
                        <img src={emailLogo} alt={'Email icon'}/>
                        <input type={'password'} placeholder={t('registration.email')}/>
                    </div>
                    <div className={cn('field-group')}>
                        <div className={cn('username')}>
                            <img src={usernameLogo} alt={'Username icon'}/>
                            <input type={'text'} placeholder={t('registration.username')}/>
                        </div>
                        <div className={cn('password')}>
                            <img src={passwordLogo} alt={'Password icon'}/>
                            <input type={'password'} placeholder={t('registration.password')}/>
                        </div>
                    </div>
                    <div className={cn('field-group')}>
                        <div className={cn('phone')}>
                            <img src={phoneLogo} alt={'Phone icon'}/>
                            <input type={'text'} placeholder={t('registration.phone')}/>
                        </div>
                        <div className={cn('city')}>
                            <img src={cityLogo} alt={'City icon'}/>
                            <input type={'password'} placeholder={t('registration.city')}/>
                        </div>
                    </div>
                </div>
                <button className={cn('start-btn')}>{t('registration.sign-up')}</button>
            </div>
        </RegistrationLayout>
    );
};

export default SignUpPage;
