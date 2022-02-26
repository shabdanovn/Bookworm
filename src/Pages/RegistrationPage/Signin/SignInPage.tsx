import React, {useMemo} from 'react';
import {NavLink} from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import cn from "classnames";
import './SignInPage.scss'
import usernameLogo from '../../../images/username.svg'
import passwordLogo from '../../../images/password.svg'
import {useTranslation} from "react-i18next";
import RegistrationLayout from "../RegistrationLayout/RegistrationLayout";

interface IFormInputs{
    username: string
    password: string
}



const SignInPage = () => {
    const {t} = useTranslation()

    const schema = yup.object({
        username: yup.string().required(`${t('registration.username')} ${t('registration.required')}`),
        password: yup.string().required(`${t('registration.password')} ${t('registration.required')}`)
    }).required()


    const {register, handleSubmit, formState: {errors}} = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: IFormInputs) => {
        console.log(data)
    }

    return (
        <RegistrationLayout path={'/sign-up'}
                            ButtonText={'registration.sign-up'}
                            titleText={'registration.no-account'}>
            <div className={cn('signin-content')}>
                <p className={cn('title')}>{t('registration.sign-in')}</p>
                <div className={cn('fields-group')} >
                    <div className={cn('username')}>
                        <div className={cn('username-content')}>
                            <img src={usernameLogo} alt={'Username icon'}/>
                            <input {...register('username')} type={'text'} placeholder={t('registration.username')}/>
                        </div>
                        <p className={'sign-in-error'}>{errors.username?.message}</p>
                    </div>
                    <div className={cn('password')}>
                        <div className={cn('pwd-content')}>
                            <img src={passwordLogo} alt={'Password icon'}/>
                            <input {...register('password')} type={'password'} placeholder={t('registration.password')}/>
                        </div>
                        <p className={'sign-in-error'}>{errors.password?.message}</p>
                    </div>
                </div>
                <NavLink to="sign-in" className={cn('forgot-pwd')}>{t('registration.forgot-password')}</NavLink>
                <button className={cn('start-btn')} onClick={handleSubmit(onSubmit)}>{t('registration.sign-in')}</button>
            </div>
        </RegistrationLayout>
    );
};

export default SignInPage;
