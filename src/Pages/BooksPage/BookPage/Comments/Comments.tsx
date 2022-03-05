import React from 'react';
import H2 from "../../../Components/H2/H2";
import {CommentType} from "../../../../types/types";
import Comment from "./Comment/Comment";
import cn from "classnames";
import './Comments.scss'

const commentData=[
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

    return (
        <div className={cn('comments-page')}>
            <H2 text={'Comments'}/>
            {
                commentData.map((comment) => {
                    return (
                        <Comment key={comment.id} comment={comment}/>
                    )
                })
            }

            <div className={cn('add-comment')}>
                <textarea placeholder={"Type your comment"}/>
                <button>Add</button>
            </div>

        </div>
    );
};

export default Comments;
