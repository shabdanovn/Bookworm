import React from 'react';
import './ChallengesPage.scss'
import cn from "classnames";
import MainLayout from "../Components/MainLayout/MainLayout";
import boy from '../../images/boy.jpg'
import ChallengeItem from "../Components/ChallengeItem/ChallengeItem";

const posts = [
    {id: 1, img: boy, title: 'The beach'},
    {id: 2, img: boy, title: 'Reading 1 book per month'},
    {id: 3, img: boy, title: "Read 12 books"},
    {id: 4, img: boy, title: "Read 1 hour everyday"},
    {id: 5, img: boy, title: "Read with 4 friends"},
    {id: 6, img: boy, title: "Read with 4 friends"},
    {id: 7, img: boy, title: "Read with 4 friends"},
    {id: 8, img: boy, title: "Read with 4 friends"},
    {id: 9, img: boy, title: "Read with 4 friends"},
    {id: 10, img: boy, title: "Read with 4 friends"},
    {id: 11, img: boy, title: "Read with 4 friends"},
    {id: 8, img: boy, title: "Read with 4 friends"},
    {id: 9, img: boy, title: "Read with 4 friends"},
    {id: 10, img: boy, title: "Read with 4 friends"},
    {id: 11, img: boy, title: "Read with 4 friends"},
]

const ChallengesPage = () => {
    return (
        <MainLayout>
            <div className={cn('challenges-page')}>
                <div className={cn('challenges-page__content')}>
                    {posts.map(post=> {
                        return <ChallengeItem key={post.id} challenge={post} />
                    })}
                </div>
            </div>
        </MainLayout>
    );
};

export default ChallengesPage;
