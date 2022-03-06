import React, {ChangeEvent, useState} from 'react';
import H2 from "../../../Components/H2/H2";
// import {CommentType} from "../../../../types/types";
import Comment from "./Comment/Comment";
import cn from "classnames";
import './Comments.scss'
import {ExampleCommentType} from "../../../../types/types";
import {useTranslation} from "react-i18next";



const commentData: ExampleCommentType[]=[
        {
            id: 1,
            text: "Example comment here 1. Example comment here 1. Example comment here 1. Example comment here 1. Example comment here 1. Example comment here 1. Example comment here 1. Example comment here 1. Example comment here 1.Example comment here 1.Example comment here 1.Example comment here 1.Example comment here 1.Example comment here 1.Example comment here 1.Example comment here 1. Example comment here 1. Example comment here 1.",
            author: "user2",
            children: [
                {
                    id: 2,
                    text: "Another example comment text 2.",
                    author: "user3",
                    children: [
                        {
                            id: 3,
                            text: "Another example comment text 3.",
                            author: "user4",
                            children: []
                        }
                    ]
                },
                {
                    id: 5,
                    text: "Another example comment text 5.",
                    author: "user5",
                    children: [
                        {
                            id: 6,
                            text: "Another example comment text 6.",
                            author: "user6",
                            children: []
                        },
                        {
                            id: 7,
                            text: "Another example comment text 7.",
                            author: "user7",
                            children: []
                        }
                    ]
                }

            ]
        },
        {
            id: 4,
            text: "Example comment here 2.",
            author: "user5",
            children: []
        }
    ]

const Comments = () => {
    const {t} = useTranslation()
    const [text, setText] = useState<string>('')
    const [comments, setComments] = useState<ExampleCommentType[]>(commentData)

    const clickHandler = () => {
        if(text!==''){
            let comment: ExampleCommentType = {
                id: new Date().getTime(),
                text,
                author: `user${(new Date()).getTime()}`,
                children: []
            }
            setComments(prevState => [...prevState, comment])
            setText('')
        }
    }

    return (
        <div className={cn('comments-page')}>
            <H2 text={t('comments-page.title')}/>
            {
                comments.map((comment) => {
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
