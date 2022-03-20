import React, {ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {useTranslation} from "react-i18next";
import {yupResolver} from "@hookform/resolvers/yup";
import cn from "classnames";
import MainLayout from "../../Components/MainLayout/MainLayout";
import H3 from "../../Components/H3/H3";
import statue from '../../../images/daniel.png'
import {UserType} from "../../../types/types";
import username from '../../../images/username.svg'
import FileUploader from "../../Components/FileUploader/FileUploader";
import './EditProfilePage.scss'
import {useTheme} from "../../../hooks/useTheme";

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

interface IInputForms{
    fullname: string
    email: string
    username: string
    phone: string
    city: string
}

const EditProfilePage = () => {
    const {t} = useTranslation()
    const {isDark} = useTheme()
    const [files, setFiles] = useState<FileList | null>()
    const [userInfo, setUserInfo] = useState<UserType>(user)
    const navigate = useNavigate()

    const schema = yup.object({
        fullname: yup.string()
            .required(`${t('registration.fullname')} ${t('registration.required')}`),
        email: yup.string()
            .email(`${t('registration.invalid')} ${t('registration.email')}`)
            .required(`${t('registration.email')} ${t('registration.required')}`),
        username: yup.string()
            .required(`${t('registration.username')} ${t('registration.required')}`),
        phone: yup.string()
            .required(`${t('registration.phone')} ${t('registration.required')}`),
        city: yup.string()
            .required(`${t('registration.city')} ${t('registration.required')}`)
    }).required()

    const {handleSubmit, formState: {errors}, register} = useForm<IInputForms>({
        resolver: yupResolver(schema)
    })

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        const copy = JSON.parse(JSON.stringify(userInfo))
        copy[e.target.name] = e.target.value
        setUserInfo(copy)
    }

    const saveData = () => {
        alert(userInfo.fullname)
    }

    return (
        <MainLayout>
            <div className={cn('edit-profile-page')}>
                <H3 font={true} text={t('profile-page.edit-page.edit')}/>
                <div className={cn('profile-img-edit')}>
                    <img src={files
                        ? URL.createObjectURL(files[0])
                        : user.img ? user.img : username} alt={'File'}/>

                    <FileUploader setFiles={setFiles}
                                  title={files ? files[0].name: t('profile-page.edit-page.change')}/>
                </div>
                <div className={cn('fields-group')}>
                    <input  {...register('fullname')}
                            placeholder={t('profile-page.edit-page.fullname-placeholder')}
                            name={'fullname'} type={'text'}
                            value={userInfo.fullname} onChange={onChange}/>
                    <p className={cn('form-error fullname-error', {dark: isDark})}>{errors.fullname?.message}</p>
                    <div>
                        <input {...register('email')} type={'email'}
                               placeholder={t('profile-page.edit-page.email-placeholder')}
                               name={'email'} className={cn('half-input')}
                               value={userInfo.email} onChange={onChange}/>
                        <input {...register('username')} type={'text'}
                               placeholder={t('profile-page.edit-page.username-placeholder')}
                               name={'username'} className={cn('half-input')}
                               value={userInfo.username} onChange={onChange}/>
                    </div>
                    <p className={cn('form-error email-error', {dark: isDark})}>{errors.email?.message || errors.username?.message}</p>

                    <div>
                        <input {...register('phone')} type={'text'}
                               placeholder={t('profile-page.edit-page.phone-placeholder')}
                               name={'phone'} className={cn('half-input')}
                               value={userInfo.phone} onChange={onChange}/>
                        <input {...register('city')} type={'text'}
                               placeholder={t('profile-page.edit-page.city-placeholder')}
                               name={'city'} className={cn('half-input')}
                               value={userInfo.city} onChange={onChange}/>
                    </div>
                    <p className={cn('form-error phone-error', {dark: isDark})}>{errors.phone?.message || errors.city?.message}</p>

                    <div>
                        <button onClick={() => navigate(-1)}>{t('profile-page.edit-page.cancel')}</button>
                        <button onClick={handleSubmit(saveData)}>{t('profile-page.edit-page.save')}</button>
                    </div>
                </div>
                <img className={cn('statue-img')} src={statue} alt={'Statue picture'}/>
            </div>
        </MainLayout>
    );
};

export default EditProfilePage;
