import React, {ChangeEvent, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import cn from "classnames";
import MainLayout from "../Components/MainLayout/MainLayout";
import FileUploader from "../Components/FileUploader/FileUploader";
import {useTheme} from "../../hooks/useTheme";
import map from '../../images/map.png'
import './CreatePost.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {CreatePostType} from "../../types/posts";
import {createPost} from "../../redux/slices/posts.slice";

const CreatePost = () => {
    const {t} = useTranslation()
    const {isDark} = useTheme()
    const location = useLocation()
    const navigate = useNavigate()
    // const {id} = useParams()
    const dispatch = useAppDispatch()
    const {user, isLoggedIn} = useAppSelector(state => state.auth)
    // const {bookInfo} = useAppSelector(state => state.books)
    const [files, setFiles] = useState<FileList | null>()
    const [filesTitle, setFilesTitle] = useState<string>('')

    const [post, setPost] = useState<CreatePostType>({
        userId: user.id,
        description: ''
    })

    // useEffect(() =>{
    //     if(location.pathname!=='/create-post-post'
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
    //
    useEffect(()=>{
        if(!isLoggedIn) navigate('/books')
    }, [isLoggedIn, navigate])

    const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let item:CreatePostType = JSON.parse(JSON.stringify(post))
        item.description = e.target.value
        setPost(item)
    }


    const formDataCreator = () => {
        let formData = new FormData()
        formData.append('description', post.description)
        if(files) formData.append('img', files[0])
        formData.append('userId', user.id)

        return formData
    }

    const doneClick = () => {
        if(location.pathname === '/create-post-post') {
            if (files && files[0] && post.description) {
                const formData = formDataCreator()
                dispatch(createPost(formData))
                navigate('/posts')
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
            <div className={cn('create-post', {dark: isDark})}>
                <p className={cn('page-title')}>
                    {location.pathname==='/create-post-post'
                    ? t('create-post.title-create')
                    : "Create a new post"}</p>

                <div className={cn('create-post__content')}>
                    <div className={cn('create-form')}>
                        <FileUploader
                            title={location.pathname !== '/create-post-post'
                                ? files
                                    ? files[0].name
                                    : filesTitle
                                : files
                                    ? files[0].name
                                    : t('create-post.picture')}
                            setFiles={setFiles}
                        />

                        <div className={cn('description')}>
                            <p className={cn('book-title')}>{t('create-post.description')}</p>
                            <textarea className={cn('input-item textarea')}
                                      value={post.description} name={'description'}
                                      onChange={changeHandler}
                                      placeholder={t('create-post.description-placeholder')}/>
                        </div>

                        <button onClick={doneClick}>
                            {location.pathname==='/create-post'
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

export default CreatePost;
