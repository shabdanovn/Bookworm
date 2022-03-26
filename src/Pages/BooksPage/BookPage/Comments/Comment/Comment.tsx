import React, {ChangeEvent, useState} from 'react';
import cn from "classnames";
import './Comment.scss'
import username from '../../../../../images/username.svg'
import {useTheme} from "../../../../../hooks/useTheme";
import {ExampleCommentType} from "../../../../../types/types";
import {useTranslation} from "react-i18next";
import replyLogo from '../../../../../images/reply.svg'
import {CommentType} from "../../../../../types/books";
import {API_URL} from "../../../../../utils/constants";

interface IComment{
    comment: CommentType
}

const Comment = ({comment}: IComment) => {
    const {isDark} = useTheme()
    const {t} = useTranslation()
    const [showCommentBar, setShowCommentBar] = useState<boolean>(false)
    const [newComment, setNewComment] = useState<CommentType>(comment)

    const nestedComments = (newComment.comments || []).map(comment => {
        return <Comment key={comment.id} comment={comment} />
    })

    const [reply, setReply] = useState<string>('')

    // const clickHandler = () => {
    //     if(reply!==''){
    //         let response: ExampleCommentType = {
    //             id: new Date().getTime(),
    //             text: reply,
    //             author: `user${(new Date()).getTime()}`,
    //             children: []
    //         }
    //
    //         let newCommentCopy = JSON.parse(JSON.stringify(newComment))
    //         newCommentCopy.children = [response, ...newCommentCopy.children]
    //
    //         setNewComment(newCommentCopy)
    //         setReply('')
    //         setShowCommentBar(prevState => !prevState)
    //     }
    // }


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
                {/*<p onClick={() => setShowCommentBar(prevState => !prevState)}*/}
                {/*   className={cn('reply')}>{t('comments-page.reply')}</p>*/}
                {/*<img onClick={() => setShowCommentBar(prevState => !prevState)}*/}
                {/*     src={replyLogo} alt={'Replay logo'} className={cn('reply')} />*/}
            </div>

            {/*{showCommentBar && <div className={cn('add-response')}>*/}
            {/*    <textarea value={reply} onChange={(e=> setReply(e.target.value))}*/}
            {/*              placeholder={t('comments-page.textarea-reply')}/>*/}
            {/*    <button onClick={clickHandler}>{t('comments-page.add')}</button>*/}
            {/*</div>}*/}

            {nestedComments}
        </div>
    )
};

export default Comment;
