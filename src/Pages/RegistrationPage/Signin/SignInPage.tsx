import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import cn from "classnames";
import './SignInPage.scss'
import emailLogo from '../../../images/email.svg'
import passwordLogo from '../../../images/password.svg'
import {useTranslation} from "react-i18next";
import RegistrationLayout from "../RegistrationLayout/RegistrationLayout";
import {useTheme} from "../../../hooks/useTheme";
import {ILogin} from "../../../types/auth";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {login} from "../../../redux/slices/auth.slice";
import Loader from "../../Components/Loader/Loader";



const SignInPage = () => {
    const {t} = useTranslation()
    const {isDark} = useTheme()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState('')

    const schema = yup.object({
        email: yup.string().email().required(`${t('registration.email')} ${t('registration.required')}`),
        password: yup.string().required(`${t('registration.password')} ${t('registration.required')}`)
    }).required()


    const {register, handleSubmit, formState: {errors}} = useForm<ILogin>({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: ILogin) => {
        setLoading(true)
        dispatch(login(data))
            .unwrap()
            .then(() => {
                setLoading(false)
                navigate('/books')
            })
            .catch((e) => {
                setLoading(false)
                setMessages(t('errors.sign-in'))
            })
    }

    useEffect(()=>{
        if(isLoggedIn){
            navigate('/books')
        }
    }, [])


    return (
        <RegistrationLayout path={'/sign-up'}
                            ButtonText={'registration.sign-up'}
                            titleText={'registration.no-account'}>
            <div className={cn('signin-content')}>
                <p className={cn('title')}>{t('registration.sign-in')}</p>
                {loading && <Loader/>}
                <div className={cn('fields-group')} >
                    <div className={cn('username')}>
                        <div className={cn('username-content')}>
                            <img src={emailLogo} alt={'Email icon'}/>
                            <input {...register('email')} type={'email'} placeholder={t('registration.email')}/>
                        </div>
                        <p className={cn('sign-in-error', {dark:isDark})}>{errors.email?.message}</p>
                    </div>
                    <div className={cn('password')}>
                        <div className={cn('pwd-content')}>
                            <img src={passwordLogo} alt={'Password icon'}/>
                            <input {...register('password')} type={'password'} placeholder={t('registration.password')}/>
                        </div>
                        <p className={cn('sign-in-error', {dark:isDark})}>{errors.password?.message}</p>
                        {messages && <p className={cn('sign-in-error', {dark:isDark})}>{messages}</p>}

                    </div>
                </div>
                <NavLink to="sign-in" className={cn('forgot-pwd')}>{t('registration.forgot-password')}</NavLink>
                <button className={cn('start-btn')} onClick={handleSubmit(onSubmit)}>{t('registration.sign-in')}</button>
            </div>
        </RegistrationLayout>
    );
};

export default SignInPage;
