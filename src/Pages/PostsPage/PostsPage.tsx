import React, {useEffect, useState} from 'react';
import './PostsPage.scss'
import cn from "classnames";
import MainLayout from "../Components/MainLayout/MainLayout";
import PostsItem from "../Components/PostsItem/PostsItem";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {PostType} from "../../types/posts";
import {getAllPosts, getSavedPosts} from "../../redux/slices/posts.slice";
import Loader from "../Components/Loader/Loader";
import {getSavedBooks} from "../../redux/slices/books.slice";

const PostsPage = () => {
    const dispatch = useAppDispatch()
    const {posts: postsList, isLoading} = useAppSelector(state => state.posts)
    const {isLoggedIn, user} = useAppSelector(state => state.auth)
    const [posts, setPosts] = useState<PostType[]>(postsList)

    useEffect(() => {
        dispatch(getAllPosts())
        if(isLoggedIn) dispatch(getSavedPosts(user.id))
    }, [])

    useEffect(() => {
        setPosts(postsList)
    }, [postsList])

    return (
        <MainLayout>
            <div className={cn('posts-page')}>
                {isLoading
                    ? <Loader />
                    :   <div className={cn('posts-page__content')}>
                        {posts.map(post=> {
                            return <PostsItem key={post.id} post={post}/>
                        })}
                    </div>
                }
            </div>
        </MainLayout>
    );
};

export default PostsPage;
