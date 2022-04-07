import React, {ChangeEvent, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {CommentType, CreateCommentType} from "../../../../types/books";
import useModal from "../../../../hooks/useModal";
import {createComment, getComments} from "../../../../redux/slices/books.slice";
import NotAuthedModal from "../../../Components/ModalWindows/NotAuthedModal/NotAuthedModal";
import cn from "classnames";
import H2 from "../../../Components/H2/H2";
import Comment from "../../../Components/Comment/Comment";
import {PostCommentType} from "../../../../types/posts";
import './PostComments.scss'

interface IPostComments{
    postId: number
}

const PostComments = ({postId}:IPostComments) => {
    const {t} = useTranslation()
    const [text, setText] = useState<string>('')
    const {user, isLoggedIn} = useAppSelector(state => state.auth)
    // const {comments:postComments} = useAppSelector(state => state.posts)

    // const [comments, setComments] = useState<PostCommentType[]|undefined>(postComments)
    const {setModalContent, open, close} = useModal()
    const dispatch = useAppDispatch()

    // useEffect(() => {
        // if(postId) dispatch(getComments(bookId))
    // }, [])

    // useEffect(() => {
    //     setComments(postComments)
    // }, [postComments])


    // const clickHandler = () => {
    //     if(!isLoggedIn) {
    //         setModalContent(<NotAuthedModal close={close}/>)
    //         open()
    //     }else{
    //         if(text!==''){
    //             let comment: CreateCommentType = {
    //                 text,
    //                 author: user.username,
    //                 authorImg: user.img,
    //                 bookId: bookId,
    //                 authorId: user.id
    //             }
    //             dispatch(createComment(comment))
    //             setText('')
    //         }
    //     }
    // }

    return (
        <div className={cn('post-comments-page')}>
            <H2 text={t('comments-page.title')}/>
            {
                // comments && comments
                //     .map((comment) => {
                //         return (
                //             <Comment key={comment.id} comment={comment}/>
                //         )
                //     })
            }

            {postId}

            <div className={cn('add-comment')}>
                <textarea placeholder={t('comments-page.textarea-add')} value={text}
                          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>setText(e.target.value) }/>
                <button>{t('comments-page.add')}</button>
            </div>
        </div>
    );
};

export default PostComments;
