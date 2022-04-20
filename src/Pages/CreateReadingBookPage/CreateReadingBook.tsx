import React, {ChangeEvent, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import cn from "classnames";
import MainLayout from "../Components/MainLayout/MainLayout";
import FileUploader from "../Components/FileUploader/FileUploader";
import {useTheme} from "../../hooks/useTheme";
import map from '../../images/map.png'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {CreateChallengeType} from "../../types/challenges";
import './CreateReadingBook.scss'
import {CreateReadingType} from "../../types/user";

const CreateReadingBook = () => {
    const {t} = useTranslation()
    const {isDark} = useTheme()
    const location = useLocation()
    const navigate = useNavigate()
    // const {id} = useParams()
    // const dispatch = useAppDispatch()
    const {user, isLoggedIn} = useAppSelector(state => state.auth)
    const [files, setFiles] = useState<FileList | null>()
    const [filesTitle, setFilesTitle] = useState<string>('')

    const [post, setPost] = useState<CreateReadingType>({
        title: "",
        author: "",
        start_date: "",
        userId: user.id,
        genre: ''
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
        if(!isLoggedIn) navigate('/books')
    }, [isLoggedIn, navigate])

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let item = JSON.parse(JSON.stringify(post))
        item[e.target.name] = e.target.value
        setPost(item)
    }

    // const formDataCreator = () => {
    //     let formData = new FormData()
    //     formData.append('title', post.title)
    //     formData.append('author', post.author)
    //     formData.append('cost', post.cost)
    //     formData.append('conditions', post.conditions)
    //     formData.append('state', post.state)
    //     formData.append('notes', post.notes)
    //     if(files) formData.append('img', files[0])
    //     formData.append('userId', user.id)
    //
    //     return formData
    // }
    // const doneClick = () => {
    //     if(location.pathname === '/create-post') {
    //         if (genre.value && genre.value !== '---' && files && files[0] &&
    //             post.author && post.state && post.title) {
    //             const formData = formDataCreator()
    //             dispatch(createBook({data: formData, genre: genre.value}))
    //             navigate('/books')
    //         }
    //     }else{
    //         if (files && files[0] && post.author && post.state && post.title) {
    //             const formData = formDataCreator()
    //             if(id) formData.append('id', id)
    //             dispatch(updateBookWithImage(formData))
    //             navigate('/books')
    //         }else{
    //             if(id && post.img){
    //                 let data:UpdateBookType = {
    //                     id: +id,
    //                     title: post.title,
    //                     author: post.author,
    //                     cost: post.cost,
    //                     state: post.state,
    //                     conditions: post.conditions,
    //                     notes: post.notes,
    //                     userId: user.id,
    //                     img: post.img
    //                 }
    //                 dispatch(updateBookWithoutImage(data))
    //                 navigate('/books')
    //             }
    //         }
    //     }
    // }

    const doneClick = () => {
      console.log(post, files && files[0])
    }

    return (
        <MainLayout>
            <div className={cn('create-reading-book', {dark: isDark})}>
                <p className={cn('page-title')}>Edit reading book</p>
                <div className={cn('create-reading-book__content')}>
                    <div className={cn('create-form')}>
                        <FileUploader
                            // title={location.pathname !== '/profile-page/create-reading-book'
                            //     ? files
                            //         ? files[0].name
                            //         : filesTitle
                            //     : files
                            //         ? files[0].name
                            //         : t('create-post.picture')}
                            title={files
                                ? files[0].name
                                : "Choose book picture"}
                            setFiles={setFiles}
                        />

                        <div className={cn('title')}>
                            <div className={cn('title-content')}>
                                <p className={cn('book-title')}>{t('create-post.title-form')}</p>
                                <input type={'text'}
                                       value={post.title} name={'title'}
                                       onChange={changeHandler}
                                       placeholder={"Book title"}
                                       className={cn('input-item')}/>
                            </div>
                        </div>

                        <div className={cn('author')}>
                            <div className={cn('author-content')}>
                                <p className={cn('book-title')}>Author</p>
                                <input type={'text'}
                                       value={post.author} name={'author'}
                                       onChange={changeHandler}
                                       placeholder={"Book author name"}
                                       className={cn('input-item')}/>
                            </div>
                        </div>

                        <div className={cn('genre')}>
                            <div className={cn('genre-content')}>
                                <p className={cn('book-title')}>Genre</p>
                                <input type={'text'}
                                       value={post.genre} name={'genre'}
                                       onChange={changeHandler}
                                       placeholder={'Detective'}
                                       className={cn('input-item')}/>
                            </div>
                        </div>

                        <div className={cn('date')}>
                            <div className={cn('start_date')}>
                                <p className={cn('book-title')}>Start date</p>
                                <input type={'text'}
                                       value={post.start_date} name={'start_date'}
                                       onChange={changeHandler}
                                       placeholder={'25/02/2022'}
                                       className={cn('input-item')}/>
                            </div>
                        </div>


                        <button onClick={doneClick}>{location.pathname==='profile-page/create-reading-book'
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

export default CreateReadingBook;
