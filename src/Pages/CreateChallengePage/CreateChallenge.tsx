import React, {ChangeEvent, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import cn from "classnames";
import MainLayout from "../Components/MainLayout/MainLayout";
import FileUploader from "../Components/FileUploader/FileUploader";
import {useTheme} from "../../hooks/useTheme";
import map from '../../images/map.png'
import './CreateChallenge.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {CreateChallengeType} from "../../types/challenges";
import {createChallenge} from "../../redux/slices/challenges.slice";

const CreateChallenge = () => {
    const {t} = useTranslation()
    const {isDark} = useTheme()
    const location = useLocation()
    const navigate = useNavigate()
    // const {id} = useParams()
    const dispatch = useAppDispatch()
    const {user, isLoggedIn} = useAppSelector(state => state.auth)
    const [files, setFiles] = useState<FileList | null>()
    const [filesTitle, setFilesTitle] = useState<string>('')

    const [post, setPost] = useState<CreateChallengeType>({
        title: "",
        description: "",
        punishment: "",
        start_date: "",
        end_date: "",
        userId: user.id
    })

    // useEffect(() =>{
    //     if(location.pathname!=='/create-post'
    //         && bookInfo.book?.title && bookInfo.book?.author
    //         && bookInfo.book?.state && bookInfo.book?.notes
    //         && bookInfo.book?.img && (bookInfo.book?.cost || bookInfo.book?.cost==='')
    //         && (bookInfo.book?.conditions || bookInfo.book?.conditions==='') ) {
    //         const book = {
    //             title: bookInfo.book?.title,
    //             author: bookInfo.book?.author,
    //             cost: bookInfo.book?.cost,
    //             state: bookInfo.book?.state,
    //             conditions: bookInfo.book?.conditions,
    //             notes: bookInfo.book?.notes,
    //             img: bookInfo.book?.img
    //         }
    //         setFilesTitle("Book's picture")
    //         setPost(book)
    //     }
    // },[bookInfo])

    useEffect(()=>{
        if(!isLoggedIn) navigate('/challenges')
    }, [isLoggedIn, navigate])

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let item = JSON.parse(JSON.stringify(post))
        item[e.target.name] = e.target.value
        setPost(item)
    }

    const formDataCreator = () => {
        let formData = new FormData()
        formData.append('title', post.title)
        formData.append('description', post.description)
        formData.append('punishment', post.punishment)
        formData.append('start_date', post.start_date)
        formData.append('end_date', post.end_date)
        if(files) formData.append('img', files[0])
        formData.append('userId', user.id)

        return formData
    }
    const doneClick = () => {
        if(location.pathname === '/create-challenge') {
            if (files && files[0] && post.title &&
                post.description && post.start_date && post.end_date) {
                const formData = formDataCreator()
                dispatch(createChallenge(formData))
                navigate('/challenges')

                // console.log(new Date(post.start_date), new Date(post.end_date))
            }else{
                alert('All fields are required')
            }
        }else{
            // if (files && files[0] && post.author && post.state && post.title) {
            //     const formData = formDataCreator()
            //     if(id) formData.append('id', id)
            //     dispatch(updateBookWithImage(formData))
            //     navigate('/books')
            // }else{
            //     if(id && post.img){
            //         let data:UpdateBookType = {
            //             id: +id,
            //             title: post.title,
            //             author: post.author,
            //             cost: post.cost,
            //             state: post.state,
            //             conditions: post.conditions,
            //             notes: post.notes,
            //             userId: user.id,
            //             img: post.img
            //         }
            //         dispatch(updateBookWithoutImage(data))
            //         navigate('/books')
            //     }
            // }
        }
    }

    return (
        <MainLayout>
            <div className={cn('create-challenge', {dark: isDark})}>
                <p className={cn('page-title')}>{location.pathname==='/create-post'
                    ? t('create-post.title-create')
                    : t('create-post.title-edit') }</p>
                <div className={cn('create-challenge__content')}>
                    <div className={cn('create-form')}>
                        <FileUploader
                            title={location.pathname !== '/create-challenge'
                                ? files
                                    ? files[0].name
                                    : filesTitle
                                : files
                                    ? files[0].name
                                    : t('create-post.picture')}
                            setFiles={setFiles}
                        />

                        <div className={cn('title')}>
                            <div className={cn('title-content')}>
                                <p className={cn('book-title')}>{t('create-post.title-form')}</p>
                                <input type={'text'}
                                       value={post.title} name={'title'}
                                       onChange={changeHandler}
                                       placeholder={"Reading one book per month"}
                                       className={cn('input-item')}/>
                            </div>
                        </div>

                        <div className={cn('date')}>
                            <div className={cn('start_date')}>
                                <p className={cn('book-title')}>Start date</p>
                                <input type={'text'}
                                       value={post.start_date} name={'start_date'}
                                       onChange={changeHandler}
                                       placeholder={'MM/DD/YYYY'}
                                       className={cn('input-item')}/>
                            </div>
                            <div className={cn('end_date')}>
                                <p className={cn('book-title')}>End date</p>
                                <input type={'text'} placeholder={'MM/DD/YYYY'}
                                       value={post.end_date} name={'end_date'}
                                       onChange={changeHandler}
                                       className={cn('input-item')}/>
                            </div>
                        </div>

                        <div className={cn('punishment')}>
                            <div className={cn('punishment-content')}>
                            <p className={cn('book-title')}>Punishment</p>
                            <input type={'text'}
                                   value={post.punishment} name={'punishment'}
                                   onChange={changeHandler}
                                   placeholder={"Punishment for not finishing a challenge"}
                                   className={cn('input-item')}/>
                            </div>
                        </div>

                        <div className={cn('description')}>
                            <p className={cn('book-title')}>{t('create-post.description')}</p>
                            <textarea className={cn('input-item textarea')}
                                      value={post.description} name={'description'}
                                      onChange={changeHandler}
                                      placeholder={t('create-post.description-placeholder')}/>
                        </div>

                        <button onClick={doneClick}>{location.pathname==='/create-post'
                            ? "Create"
                            : "Save"}
                        </button>
                    </div>
                    <div className={cn('create-post-image')}>
                        <img src={map} alt={'Map pic'}/>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CreateChallenge;
