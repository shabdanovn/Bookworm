import React, {ChangeEvent, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import useModal from "../../../../hooks/useModal";
import NotAuthedModal from "../../../Components/ModalWindows/NotAuthedModal/NotAuthedModal";
import cn from "classnames";
import H2 from "../../../Components/H2/H2";
import Comment from "../../../Components/Comment/Comment";
import {PostCommentType} from "../../../../types/posts";
import './ChallengeComments.scss'
import {ChallengeCommentType, ChallengeCreateCommentType} from "../../../../types/challenges";
import {createChallengeComment, getChallengeComments} from "../../../../redux/slices/challenges.slice";

interface IChallengeComments{
    challengeId?: number
}

const ChallengeComments = ({challengeId}:IChallengeComments) => {
    const {t} = useTranslation()
    const [text, setText] = useState<string>('')
    const {user, isLoggedIn} = useAppSelector(state => state.auth)
    const {comments:challengeComments} = useAppSelector(state => state.challenges)

    const [comments, setComments] = useState<ChallengeCommentType[]|undefined>(challengeComments)
    const {setModalContent, open, close} = useModal()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(challengeId) dispatch(getChallengeComments(challengeId))
    }, [])

    useEffect(() => {
        setComments(challengeComments)
    }, [challengeComments])


    const clickHandler = () => {
        if(!isLoggedIn) {
            setModalContent(<NotAuthedModal close={close}/>)
            open()
        }else{
            if(text!=='' && challengeId){
                let comment: ChallengeCreateCommentType = {
                    text,
                    challengeId,
                    authorId: user.id
                }
                dispatch(createChallengeComment(comment))
                setText('')
            }
        }
    }

    return (
        <div className={cn('challenge-comments-page')}>
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

export default ChallengeComments;
