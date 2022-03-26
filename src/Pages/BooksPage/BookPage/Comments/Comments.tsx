import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import H2 from "../../../Components/H2/H2";
import Comment from "./Comment/Comment";
import cn from "classnames";
import './Comments.scss'
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import useModal from "../../../../hooks/useModal";
import {createComment, getComments} from "../../../../redux/slices/books.slice";
import {CommentType, CreateCommentType} from "../../../../types/books";

interface IComments {
    bookId: number | undefined
    bookComments: CommentType[] | undefined
}

const Comments = ({bookId}: IComments) => {
    const {t} = useTranslation()
    const [text, setText] = useState<string>('')
    const {user, isLoggedIn} = useAppSelector(state => state.auth)
    const {comments:bookComments} = useAppSelector(state => state.books)

    const [comments, setComments] = useState<CommentType[]|undefined>(bookComments)
    const {setModalContent, open} = useModal()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(bookId) dispatch(getComments(bookId))
    }, [])

    useEffect(() => {
        setComments(bookComments)
    }, [bookComments])


    const clickHandler = () => {
        if(!isLoggedIn) {
            setModalContent(<p>Login firts</p>)
            open()
        }else{
            if(text!==''){
                let comment: CreateCommentType = {
                    text,
                    author: user.username,
                    authorImg: user.img,
                    bookId: bookId,
                    authorId: user.id
                }
                dispatch(createComment(comment))
                setText('')
            }
        }
    }

    return (
        <div className={cn('comments-page')}>
            <H2 text={t('comments-page.title')}/>
            {
                comments && comments
                    .map((comment) => {
                    return (
                        <Comment key={comment.id} comment={comment}/>
                    )
                })
            }

            <div className={cn('add-comment')}>
                <textarea placeholder={t('comments-page.textarea-add')} value={text}
                          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>setText(e.target.value) }/>
                <button onClick={clickHandler}>{t('comments-page.add')}</button>
            </div>
        </div>
    );
};

export default Comments;
