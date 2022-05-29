import React, {ChangeEvent, useEffect, useState} from 'react';
import Select, {OnChangeValue} from "react-select";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import cn from "classnames";
import MainLayout from "../Components/MainLayout/MainLayout";
import FileUploader from "../Components/FileUploader/FileUploader";
import {useTheme} from "../../hooks/useTheme";
import map from '../../images/map.png'
import './CreateBookPost.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {BookType, CreateBookType, GenreType, IOption, UpdateBookType} from "../../types/books";
import {getAllGenres} from "../../redux/slices/genres.slice";
import {createBook, getBook, updateBookWithImage, updateBookWithoutImage} from "../../redux/slices/books.slice";
import {GenresList} from "../Components/GenresDropdown/GenresList";

const CreateBookPost = () => {
    const {t} = useTranslation()
    const {isDark} = useTheme()
    const location = useLocation()
    const navigate = useNavigate()
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {genres, isLoading} = useAppSelector(state => state.genres)
    const {user, isLoggedIn} = useAppSelector(state => state.auth)
    const {bookInfo} = useAppSelector(state => state.books)
    const [files, setFiles] = useState<FileList | null>()
    const [filesTitle, setFilesTitle] = useState<string>('')
    const [genre, setGenre] = useState<IOption>({value: t(`genres.All`), label: t(`genres.All`)})
    const [genresList, setGenresList] = useState<IOption[]>(genres)
    const [language, setLanguage] = useState<IOption>({value: "---", label: "---"})

    const languageOptions = [
        {value: "english", label: "English"},
        {value: "russian", label: "Русский"},
        {value: "kyrgyz", label: "Кыргызча"}
    ]

    const [post, setPost] = useState<CreateBookType>({
        title: "",
        author: "",
        cost: '',
        state: '',
        conditions: 'price',
        notes: ""
    })

    useEffect(() => {
        if(genres.length===0) dispatch(getAllGenres())
        if(id) dispatch(getBook(+id))
    },[])

    useEffect(() => GenresList({genres, setGenresList, t}),[genres])
    useEffect(() =>{
        if(location.pathname!=='/create-post'
            && bookInfo.book?.title && bookInfo.book?.author
            && bookInfo.book?.state && bookInfo.book?.notes
            && bookInfo.book?.img && (bookInfo.book?.cost || bookInfo.book?.cost==='')
            && (bookInfo.book?.conditions || bookInfo.book?.conditions==='') ) {
            const book = {
                title: bookInfo.book?.title,
                author: bookInfo.book?.author,
                cost: bookInfo.book?.cost,
                state: bookInfo.book?.state,
                conditions: bookInfo.book?.conditions,
                notes: bookInfo.book?.notes,
                img: bookInfo.book?.img
            }
            setFilesTitle("Book's picture")
            setPost(book)
        }
    },[bookInfo])

    useEffect(()=>{
        if(!isLoggedIn) navigate('/books')
    }, [isLoggedIn, navigate])

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let item = JSON.parse(JSON.stringify(post))
        item[e.target.name] = e.target.value
        setPost(item)
    }

    const onChangeGenre = (newValue: OnChangeValue<IOption, boolean>) => setGenre(newValue as IOption)
    const onChangeLanguage = (newValue: OnChangeValue<IOption, boolean>) => setLanguage(newValue as IOption)

    const formDataCreator = () => {
        let formData = new FormData()
        formData.append('title', post.title)
        formData.append('author', post.author)
        formData.append('cost', post.cost)
        formData.append('conditions', post.conditions)
        formData.append('state', post.state)
        formData.append('notes', post.notes)
        if(language && language.value) formData.append('language', language.value)
        if(files) formData.append('img', files[0])
        formData.append('userId', user.id)

        return formData
    }
    const doneClick = () => {
        if(location.pathname === '/create-post') {
            if (genre.value && genre.value !== '---' && files && files[0] &&
                post.author && post.state && post.title) {
                const formData = formDataCreator()
                dispatch(createBook({data: formData, genre: genre.value}))
                navigate('/books')
            }
        }else{
            if (files && files[0] && post.author && post.state && post.title) {
                const formData = formDataCreator()
                if(id) formData.append('id', id)
                dispatch(updateBookWithImage(formData))
                navigate('/books')
            }else{
                if(id && post.img && language.value){
                    let data:UpdateBookType = {
                        id: +id,
                        title: post.title,
                        author: post.author,
                        cost: post.cost,
                        state: post.state,
                        conditions: post.conditions,
                        notes: post.notes,
                        userId: user.id,
                        img: post.img,
                        language: language.value
                    }
                    dispatch(updateBookWithoutImage(data))
                    navigate('/books')
                }
            }
        }
    }

    return (
        <MainLayout>
            <div className={cn('create-book-post', {dark: isDark})}>
                <p className={cn('page-title')}>{location.pathname==='/create-post'
                    ? t('create-post.title-create')
                    : t('create-post.title-edit') }</p>
                <div className={cn('create-book-post__content')}>
                    <div className={cn('create-form')}>
                        <FileUploader
                            title={location.pathname !== '/create-post'
                                ? files
                                    ? files[0].name
                                    : filesTitle
                                : files
                                    ? files[0].name
                                    : t('create-post.picture')}
                            setFiles={setFiles}/>

                        <div className={cn('title-author')}>
                            <div className={cn('title')}>
                                <p className={cn('book-title')}>{t('create-post.title-form')}</p>
                                <input type={'text'}
                                       value={post.title} name={'title'}
                                       onChange={changeHandler}
                                       placeholder={t('create-post.title-placeholder')}
                                       className={cn('input-item')}/>
                            </div>
                            <div className={cn('author')}>
                                <p className={cn('book-title')}>{t('create-post.author')}</p>
                                <input type={'text'}
                                       value={post.author} name={'author'}
                                       onChange={changeHandler}
                                       placeholder={t('create-post.author-placeholder')}
                                       className={cn('input-item')}/>
                            </div>
                        </div>

                        {location.pathname==='/create-post' &&
                            <div className={cn('genre-city')}>
                                <div className={cn('genre')}>
                                    <p className={cn('book-title')}>{t('books.filters.genre')}</p>
                                    <Select classNamePrefix={cn('input-item')}
                                            placeholder={'Choose...'}
                                            options={genresList}
                                            value={genre} onChange={onChangeGenre}
                                            isMulti={false} isSearchable
                                    />
                                </div>

                                <div className={cn('language')}>
                                    <p className={cn('book-title')}>{t('books.filters.language')}</p>
                                    <Select classNamePrefix={cn('input-item')}
                                            placeholder={'Choose...'}
                                            options={languageOptions}
                                            value={language} onChange={onChangeLanguage}
                                            isMulti={false} isSearchable
                                    />
                                </div>
                                {/*<div className={cn('city')}>*/}
                                {/*    <p className={cn('book-title')}>{t('books.filters.city')}</p>*/}
                                {/*    <Select classNamePrefix={cn('input-item')}*/}
                                {/*            placeholder={'Choose...'}*/}
                                {/*            options={cities}*/}
                                {/*            value={city} onChange={onChangeCity}*/}
                                {/*            isMulti={false} isSearchable*/}
                                {/*    />*/}
                                {/*</div>*/}
                            </div>
                        }

                        <div className={cn('price-state')}>
                            <div className={cn('price')}>
                                <p className={cn('book-title')}>{t('books.filters.price')}</p>
                                <input type={'text'}
                                       value={post.cost} name={'cost'}
                                       onChange={changeHandler}
                                       disabled={post.conditions!=='price'}
                                       placeholder={'250 сом/рублей/$'}
                                       className={cn('input-item')}/>
                            </div>
                            <div className={cn('state')}>
                                <p className={cn('book-title')}>{t('create-post.state')}</p>
                                <input type={'number'} placeholder={'8'}
                                       value={post.state} name={'state'}
                                       onChange={changeHandler}
                                       className={cn('input-item')}/>
                            </div>
                        </div>

                        <div className={cn('description')}>
                            <p className={cn('book-title')}>{t('create-post.description')}</p>
                            <textarea className={cn('input-item textarea')}
                                      value={post.notes} name={'notes'}
                                      onChange={changeHandler}
                                      placeholder={t('create-post.description-placeholder')}/>
                        </div>

                        <div className={cn('checkboxes')}>
                            <div className={cn('checkbox-group')}>
                                <input type="radio" id="price"
                                       name="conditions" value={'price'}
                                       onChange={changeHandler}
                                       checked={post.conditions==='price'}
                                />
                                <label htmlFor="price">{t('books.filters.price')}</label>
                            </div>

                            <div className={cn('checkbox-group')}>
                                <input type="radio" id="free"
                                       name="conditions" value='Free'
                                       onChange={changeHandler}
                                />
                                <label htmlFor="free">{t('books.filters.free')}</label>
                            </div>

                            <div className={cn('checkbox-group')}>
                                <input type="radio" id="bookcrossing"
                                       name="conditions" value='Bookcrossing'
                                       onChange={changeHandler}
                                />
                                <label htmlFor="bookcrossing">{t('books.filters.bookcrossing')}</label>
                            </div>
                        </div>

                        <button onClick={doneClick}>{location.pathname==='/create-post'
                            ? t('create-post.create')
                            : t('create-post.save') }</button>
                    </div>
                    <div className={cn('create-post-image')}>
                        <img src={map} alt={'Map pic'}/>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CreateBookPost;
