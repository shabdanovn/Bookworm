import React from 'react';
import './PostsPage.scss'
import cn from "classnames";
import MainLayout from "../Components/MainLayout/MainLayout";
import boy from '../../images/boy.jpg'
import post from '../../images/world_map_home.png'
import {useNavigate} from "react-router-dom";

const posts = [
    {id: 1, img: boy},
    {id: 2, img: boy},
    {id: 3, img: boy},
    {id: 4, img: boy},
    {id: 5, img: boy},
    {id: 6, img: boy},
    {id: 7, img: boy},
    {id: 8, img: boy},
    {id: 9, img: post}
]

const PostsPage = () => {
    const navigate = useNavigate()
    return (
        <MainLayout>
            <div className={cn('posts-page')}>
                <div className={cn('posts-page__content')}>
                    {posts.map(post=> {
                        return <img key={post.id}
                                    className={cn('posts-page__post')}
                                    src={post.img} alt={'Post image'}
                                    onClick={() => navigate(`/posts/${post.id}`)}
                        />
                    })}
                </div>
            </div>
        </MainLayout>
    );
};

export default PostsPage;
