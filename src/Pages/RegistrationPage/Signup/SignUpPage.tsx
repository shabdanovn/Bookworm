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
import {useForm} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {useTheme} from "../../../hooks/useTheme";

interface IInputForms{
    fullname: string
    email: string
    username: string
    password: string
    phone: string
    city: string
}

const SignUpPage = () => {
    const {t} = useTranslation()
    const {isDark} = useTheme()

    const schema = yup.object({
        fullname: yup.string()
            .required(`${t('registration.fullname')} ${t('registration.required')}`),
        email: yup.string()
            .email(`${t('registration.invalid')} ${t('registration.email')}`)
            .required(`${t('registration.email')} ${t('registration.required')}`),
        username: yup.string()
            .required(`${t('registration.username')} ${t('registration.required')}`),
        password: yup.string()
            .min(8, `${t('registration.password')} ${t('registration.min')}`)
            .max(16,`${t('registration.password')} ${t('registration.max')}`)
            .required(`${t('registration.password')} ${t('registration.required')}`),
        phone: yup.string()
            .required(`${t('registration.phone')} ${t('registration.required')}`),
        city: yup.string()
            .required(`${t('registration.city')} ${t('registration.required')}`)
    }).required()

    const {register, handleSubmit, formState: {errors}} = useForm<IInputForms>({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: IInputForms) => {
        console.log(data)
    }

    return (
        <RegistrationLayout path={'/sign-in'}
                            ButtonText={'registration.sign-in'}
                            titleText={'registration.have-account'}>
            <div className={cn('signup-content')}>
                <p className={cn('title')}>{t('registration.registration')}</p>
                <div className={cn('fields-group')}>
                    <div className={cn('fullname')}>
                        <img src={fullnameLogo} alt={'Full name icon'}/>
                        <input {...register('fullname')}
                               type={'text'} placeholder={t('registration.fullname')}/>
                    </div>
                    <p className={cn('signup-error', {dark: isDark})}>{errors.fullname?.message}</p>
                    <div className={cn('email')}>
                        <img src={emailLogo} alt={'Email icon'}/>
                        <input {...register('email')}
                               type={'email'} placeholder={t('registration.email')}/>
                    </div>
                    <p className={cn('signup-error', {dark: isDark})}>{errors.email?.message}</p>

                    <div className={cn('field-group')}>
                        <div className={cn('username')}>
                            <img src={usernameLogo} alt={'Username icon'}/>
                            <input {...register('username')}
                                   type={'text'} placeholder={t('registration.username')}/>
                        </div>
                        <div className={cn('password')}>
                            <img src={passwordLogo} alt={'Password icon'}/>
                            <input {...register('password')}
                                   type={'password'} placeholder={t('registration.password')}/>
                        </div>
                    </div>
                    <p className={cn('signup-error', {dark: isDark})}>{errors.username?.message || errors.password?.message}</p>

                    <div className={cn('field-group')}>
                        <div className={cn('phone')}>
                            <img src={phoneLogo} alt={'Phone icon'}/>
                            <input {...register('phone')}
                                   type={'text'} placeholder={t('registration.phone')}/>
                        </div>
                        <div className={cn('city')}>
                            <img src={cityLogo} alt={'City icon'}/>
                            <input {...register('city')}
                                   type={'text'} placeholder={t('registration.city')}/>
                        </div>
                    </div>
                    <p className={cn('signup-error', {dark: isDark})}>{errors.phone?.message || errors.city?.message}</p>

                </div>
                <button onClick={handleSubmit(onSubmit)}
                    className={cn('start-btn')}>{t('registration.sign-up')}</button>
            </div>
        </RegistrationLayout>
    );
};

export default SignUpPage;
