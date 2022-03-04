import React, {ChangeEvent, useState} from 'react';
import Select, {OnChangeValue} from "react-select";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import cn from "classnames";
import MainLayout from "../Components/MainLayout/MainLayout";
import FileUploader from "../Components/FileUploader/FileUploader";
import {useTheme} from "../../hooks/useTheme";
import map from '../../images/map.png'
import './CreateBookPost.scss'

interface IOption{
    value: string
    label: string
}

const genres: IOption[] = [
    { value: 'Adult', label: 'Adult' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Biography', label: 'Biography' },
    { value: 'Business fiction', label: 'Business fiction' },
    { value: 'Classics', label: 'Classics' },
    { value: 'Children\'s', label: 'Children\'s' },
    { value: 'Crime', label: 'Crime' },
    { value: 'Detective', label: 'Detective' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'History', label: 'History' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Literary Fiction', label: 'Literary Fiction' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Poetry', label: 'Poetry' },
    { value: 'Romans', label: 'Romans' },
    { value: 'SCI-FI', label: 'SCI-FI' },
    { value: 'Thriller', label: 'Thriller' }
]

const cities: IOption[] = [
    { value: 'Bishkek', label: 'Bishkek' },
    { value: 'Osh', label: 'Osh' },
    { value: 'Kara-Kol', label: 'Kara-Kol' },
    { value: 'Talas', label: 'Talas' },
    { value: 'Djalal-Abad', label: 'Djalal-Abad' },
    { value: 'Toktogul', label: 'Toktogul' },
    { value: 'Naryn', label: 'Naryn' },
    { value: 'LA', label: 'LA' },
    { value: 'NYC', label: 'NYC' },
    { value: 'Las-Vegas', label: 'Las-Vegas' }
]

interface IBookPost{
    title: string
    author: string
    genre: string
    city: string
    price: string
    state: string
    description: string
    conditions: string
}

const CreateBookPost = () => {
    const {t} = useTranslation()
    const {isDark} = useTheme()
    const location = useLocation()
    const [files, setFiles] = useState<FileList | null>()
    const [genre, setGenre] = useState<IOption>({value: '', label:''})
    const [city, setCity] = useState<IOption>({value: '', label:''})
    const [post, setPost] = useState<IBookPost>({
        title: "",
        author: "",
        genre: '',
        city: '',
        price: '',
        state: '',
        description: '',
        conditions: 'price'
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let item = JSON.parse(JSON.stringify(post))
        item[e.target.name] = e.target.value
        setPost(item)
    }

    const onChangeGenre = (newValue: OnChangeValue<IOption, boolean>) => setGenre(newValue as IOption)
    const onChangeCity = (newValue: OnChangeValue<IOption, boolean>) => setCity(newValue as IOption)

    const doneClick = () => {
        let item = JSON.parse(JSON.stringify(post))
        item.genre = genre.value
        item.city = city.value
        console.log(item)
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
                            title={files ? files[0].name: t('create-post.picture')}
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

                        <div className={cn('genre-city')}>
                            <div className={cn('genre')}>
                                <p className={cn('book-title')}>{t('books.filters.genre')}</p>
                                <Select classNamePrefix={cn('input-item')}
                                        placeholder={'Choose...'}
                                        options={genres}
                                        value={genre} onChange={onChangeGenre}
                                        isMulti={false} isSearchable
                                />
                            </div>
                            <div className={cn('city')}>
                                <p className={cn('book-title')}>{t('books.filters.city')}</p>
                                <Select classNamePrefix={cn('input-item')}
                                        placeholder={'Choose...'}
                                        options={cities}
                                        value={city} onChange={onChangeCity}
                                        isMulti={false} isSearchable
                                />
                            </div>
                        </div>

                        <div className={cn('price-state')}>
                            <div className={cn('price')}>
                                <p className={cn('book-title')}>{t('books.filters.price')}</p>
                                <input type={'text'}
                                       value={post.price} name={'price'}
                                       onChange={changeHandler}
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
                                      value={post.description} name={'description'}
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
                                       name="conditions" value='free'
                                       onChange={changeHandler}
                                />
                                <label htmlFor="free">{t('books.filters.free')}</label>
                            </div>

                            <div className={cn('checkbox-group')}>
                                <input type="radio" id="bookcrossing"
                                       name="conditions" value='bookcrossing'
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
