import React, {useState} from 'react';
import cn from "classnames";
import './Comment.scss'
import username from '../../../images/username.svg'
import {useTheme} from "../../../hooks/useTheme";
import {useTranslation} from "react-i18next";
import {CommentType} from "../../../types/books";
import {API_URL} from "../../../utils/constants";
import {PostCommentType} from "../../../types/posts";

interface IComment{
    comment: CommentType | PostCommentType
}

const Comment = ({comment}: IComment) => {
    const {isDark} = useTheme()
    const {t} = useTranslation()

    return (
        <div className={cn('comment', {dark: isDark})}>
            <div className={cn('author')}>
                <div className={cn('avatar')}>
                    <img src={comment.authorImg ? `${API_URL}/${comment.authorImg}`: username} alt={'Username logo'}/>
                </div>
                <p className={cn('comment-author')}>{comment.author}:</p>
                <p className={cn('comment-time')}>{new Date(comment.createdAt ? comment.createdAt : '2022-01-01').toLocaleString()}</p>
            </div>
            <div className={cn('comment-content')}>
                <p className={cn('comment-text')}>{comment.text}</p>
            </div>
        </div>
    )
};

export default Comment;
