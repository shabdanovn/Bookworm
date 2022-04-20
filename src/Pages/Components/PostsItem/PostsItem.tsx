import React from 'react';
import cn from "classnames";
import {useNavigate} from "react-router-dom";
import './PostsItem.scss'
import {PostType} from "../../../types/posts";
import {API_URL} from "../../../utils/constants";

interface IPostsItem{
    post: PostType
}

const PostsItem = ({post}:IPostsItem) => {
    const navigate = useNavigate()
    return (
        <div className={cn('posts-page__post')}
             onClick={() => navigate(`/posts/${post.id}`)}>
            <img src={`${API_URL}/${post.img}`} alt={'Post image'}/>
            <h3 className={cn('post-page__id')}>{post.id}</h3>
        </div>
    );
};

export default PostsItem;
