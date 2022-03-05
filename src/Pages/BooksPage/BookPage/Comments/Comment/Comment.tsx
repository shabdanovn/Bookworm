import React from 'react';
import cn from "classnames";
import './Comment.scss'
import username from '../../../../../images/username.svg'
import {useTheme} from "../../../../../hooks/useTheme";

export type CommentType = {
    id: number,
    text: string,
    author: string,
    children: CommentType[] | []
}

interface IComment{
    comment: CommentType
}

const Comment = ({comment}: IComment) => {
    const {isDark} = useTheme()
    const nestedComments = (comment.children || []).map(comment => {
        return <Comment key={comment.id} comment={comment} />
    })

    return (
        <div className={cn('comment', {dark: isDark})}>
            <div className={cn('author')}>
                <div className={cn('avatar')}>
                    <img src={username} alt={'Username logo'}/>
                </div>
                <p className={cn('comment-author')}>{comment.author}:</p>
            </div>
            <div className={cn('comment-content')}>
                <p className={cn('comment-text')}>{comment.text}</p>
            </div>
            {nestedComments}
        </div>
    )
};

export default Comment;
