import React, {useEffect, useState} from 'react';
import MainLayout from "../Components/MainLayout/MainLayout";
import cn from "classnames";
import H3 from "../Components/H3/H3";
import {BookItemType} from "../../types/types";
import BookItem from "../Components/BookItem/BookItem";
import './SavedPostsPage.scss'
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {BookType} from "../../types/books";
import {getSavedBooks} from "../../redux/slices/books.slice";
import Loader from "../Components/Loader/Loader";
import {PostType} from "../../types/posts";
import {getSavedPosts} from "../../redux/slices/posts.slice";
import PostsItem from "../Components/PostsItem/PostsItem";

const SavedPostsPage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {isLoggedIn, user} = useAppSelector(state => state.auth)
    const {savedPosts, isLoading} = useAppSelector(state => state.posts)
    const [postsList, setPostsList] = useState<PostType[]>(savedPosts)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(!isLoggedIn) navigate('/books')
    }, [isLoggedIn, navigate])

    useEffect(() => {
        if(isLoggedIn) dispatch(getSavedPosts(user.id))
    }, []);

    useEffect(() => {
        setPostsList(savedPosts)
    }, [savedPosts]);

    if(isLoading) return <Loader/>

    return (
        <MainLayout>
            {isLoading ? <Loader/> :
                <div className={cn('saved-books-page')}>
                    <H3 text={t('saved-books.title')} font={true}/>
                    <div className={cn('saved-books-content')}>
                        {postsList.map(book => {
                            return <PostsItem key={book.id} post={book}/>
                        })}
                    </div>
                </div>
            }
        </MainLayout>
    );
};

export default SavedPostsPage;
