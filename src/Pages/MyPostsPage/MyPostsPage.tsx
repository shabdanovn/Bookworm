import React, {useEffect, useState} from 'react';
import './MyPostsPage.scss'
import MainLayout from "../Components/MainLayout/MainLayout";
import cn from "classnames";
import H3 from "../Components/H3/H3";
import BookItem from "../Components/BookItem/BookItem";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getUsersBooks} from "../../redux/slices/books.slice";
import {BookType} from "../../types/books";
import Loader from "../Components/Loader/Loader";
import {PostType} from "../../types/posts";
import {getUsersPosts} from "../../redux/slices/posts.slice";
import {my} from "timeago.js/lib/lang";
import PostsItem from "../Components/PostsItem/PostsItem";

const MyPostsPage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {isLoggedIn, user} = useAppSelector(state => state.auth)
    const {myPosts, isLoading} = useAppSelector(state => state.posts)
    const [posts, setPosts] = useState<PostType[]>(myPosts)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(!isLoggedIn) navigate('/books')
    }, [isLoggedIn, navigate])

    useEffect(() => {
        if(isLoggedIn) dispatch(getUsersPosts(user.id))
    },[])

    useEffect(() => {
        setPosts(myPosts)
    }, [myPosts])

    if(isLoading) return <Loader/>

    return (
        <MainLayout>
            {isLoading ? <Loader/> :
                <div className={cn('my-posts-page')}>
                {/*<H3 text={t('my-books.title')} font={true}/>*/}
                <H3 text={"My posts"} font={true}/>
                <div className={cn('posts-content')}>
                    {posts.map(post => {
                        return <PostsItem post={post} key={post.id}/>
                    })}
                </div>
            </div>
            }
        </MainLayout>
    );
};

export default MyPostsPage;
