import React, {ChangeEvent, forwardRef, useEffect, useState, } from 'react';
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import useModal from "../../../../hooks/useModal";
import NotAuthedModal from "../../../Components/ModalWindows/NotAuthedModal/NotAuthedModal";
import cn from "classnames";
import H2 from "../../../Components/H2/H2";
import Comment from "../../../Components/Comment/Comment";
import {PostCommentType, PostCreateCommentType} from "../../../../types/posts";
import './PostComments.scss'
import {createPostComment, getPostComments} from "../../../../redux/slices/posts.slice";

interface IPostComments{
    postId?: number
}

const PostComments = forwardRef(({postId}:IPostComments, ref: React.Ref<HTMLDivElement>) => {
    const {t} = useTranslation()
    const [text, setText] = useState<string>('')
    const {user, isLoggedIn} = useAppSelector(state => state.auth)
    const {comments:postComments} = useAppSelector(state => state.posts)

    const [comments, setComments] = useState<PostCommentType[]>(postComments)
    const {setModalContent, open, close} = useModal()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(postId) dispatch(getPostComments(postId))
    }, [])

    useEffect(() => {
        setComments(postComments)
    }, [postComments])


    const clickHandler = () => {
        if(!isLoggedIn) {
            setModalContent(<NotAuthedModal close={close}/>)
            open()
        }else{
            if(text!=='' && postId){
                let comment: PostCreateCommentType = {
                    text,
                    postId: postId,
                    authorId: user.id
                }
                dispatch(createPostComment(comment))
                setText('')
            }
        }
    }

    return (
        <div className={cn('post-comments-page')}>
            <H2 text={t('comments-page.title')}/>
            {
                comments && comments
                    .map((comment) => {
                        return (
                            <Comment key={comment.id} comment={comment}/>
                        )
                    })
            }

            <div className={cn('add-comment')} ref={ref}>
                <textarea placeholder={t('comments-page.textarea-add')} value={text}
                          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>setText(e.target.value) }/>
                <button onClick={clickHandler}>{t('comments-page.add')}</button>
            </div>
        </div>
    );
});

export default PostComments;
