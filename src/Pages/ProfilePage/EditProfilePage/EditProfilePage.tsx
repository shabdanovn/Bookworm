import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {useTranslation} from "react-i18next";
import {yupResolver} from "@hookform/resolvers/yup";
import cn from "classnames";
import MainLayout from "../../Components/MainLayout/MainLayout";
import H3 from "../../Components/H3/H3";
import statue from '../../../images/daniel.png'
import username from '../../../images/username.svg'
import FileUploader from "../../Components/FileUploader/FileUploader";
import './EditProfilePage.scss'
import {useTheme} from "../../../hooks/useTheme";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {UpdateWithoutImageUserType, UserType} from "../../../types/user";
import {API_URL} from "../../../utils/constants";
import {updateUserWithImage, updateUserWithoutImage} from "../../../redux/slices/user.slice";

const EditProfilePage = () => {
    const {t} = useTranslation()
    const {isDark} = useTheme()
    const [files, setFiles] = useState<FileList | null>()
    const {currentUser} = useAppSelector(state => state.user)
    const [userInfo, setUserInfo] = useState<UserType>(currentUser)
    const [city, setCity] = useState(currentUser.city?.name)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {isLoggedIn, user} = useAppSelector(state => state.auth)

    useEffect(()=>{
        if(!isLoggedIn) navigate('/books')
    }, [isLoggedIn, navigate])

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

    const {handleSubmit, formState: {errors}, register} = useForm<UpdateWithoutImageUserType>({
        resolver: yupResolver(schema)
    })

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        const copy = JSON.parse(JSON.stringify(userInfo))
        copy[e.target.name] = e.target.value
        setUserInfo(copy)
    }

    const cityChange = (e:ChangeEvent<HTMLInputElement>) => setCity(e.target.value)

    const onSubmit = () => {
        if(files){
            let formData = new FormData()
            if(userInfo.fullname && userInfo.username && userInfo.email && userInfo.phone && city && userInfo.id) {
                formData.append('id', `${userInfo.id}`)
                formData.append('fullname', userInfo.fullname)
                formData.append('username', userInfo.username)
                formData.append('email', userInfo.email)
                formData.append('cityName', city)
                formData.append('phone', userInfo.phone)
                formData.append('img', files[0])
                dispatch(updateUserWithImage({data: formData, userId: userInfo.id}))

                navigate('/profile-page')
            }
        }else{
            if(userInfo.fullname && userInfo.username && userInfo.email && userInfo.phone && city && userInfo.id) {
                const data = {
                    id: user.id,
                    fullname: userInfo.fullname,
                    username: userInfo.username,
                    email: userInfo.email,
                    cityName: city,
                    phone: userInfo.phone
                }
                if(data.id) dispatch(updateUserWithoutImage(data))
                navigate('/profile-page')
            }
        }
    }

    return (
        <MainLayout>
            <div className={cn('edit-profile-page')}>
                <H3 font={true} text={t('profile-page.edit-page.edit')}/>
                <div className={cn('profile-img-edit')}>
                    <img src={files
                        ? URL.createObjectURL(files[0])
                        : userInfo.img ? `${API_URL}/${userInfo.img}` : username} alt={'File'}/>

                    <FileUploader setFiles={setFiles}
                                  title={files ? files[0].name: t('profile-page.edit-page.change')}/>
                </div>
                <div className={cn('fields-group')}>
                    <input  {...register('fullname')}
                            placeholder={t('profile-page.edit-page.fullname-placeholder')}
                            name={'fullname'} type={'text'}
                            value={userInfo.fullname} onChange={onChange}/>
                    <p className={cn('form-error fullname-error', {dark: isDark})}>{errors.fullname?.message}</p>
                    <div className={cn('email-username-div')}>
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

                    <div className={cn('phone-city-div')}>
                        <input {...register('phone')} type={'text'}
                               placeholder={t('profile-page.edit-page.phone-placeholder')}
                               name={'phone'} className={cn('half-input')}
                               value={userInfo.phone} onChange={onChange}/>
                        <input {...register('cityName')} type={'text'}
                               placeholder={t('profile-page.edit-page.city-placeholder')}
                               name={'city'} className={cn('half-input')}
                               value={city} onChange={cityChange}/>

                    </div>
                    <p className={cn('form-error phone-error', {dark: isDark})}>{errors.phone?.message || errors.cityName?.message}</p>

                    <div className={cn('btns-div')}>
                        <button onClick={() => navigate(-1)}>{t('profile-page.edit-page.cancel')}</button>
                        <button onClick={onSubmit}>{t('profile-page.edit-page.save')}</button>
                    </div>
                </div>
                <img className={cn('statue-img')} src={statue} alt={'Statue picture'}/>
            </div>
        </MainLayout>
    );
};

export default EditProfilePage;
