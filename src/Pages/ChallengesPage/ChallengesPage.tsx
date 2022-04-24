import React, {useEffect, useState} from 'react';
import './ChallengesPage.scss'
import cn from "classnames";
import MainLayout from "../Components/MainLayout/MainLayout";
import boy from '../../images/boy.jpg'
import ChallengeItem from "../Components/ChallengeItem/ChallengeItem";
import {ChallengeType} from "../../types/challenges";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getAllChallenges} from "../../redux/slices/challenges.slice";

// const posts = [
//     {id: 1, img: boy, title: 'The beach'},
//     {id: 2, img: boy, title: 'Reading 1 book per month'},
//     {id: 3, img: boy, title: "Read 12 books"},
//     {id: 4, img: boy, title: "Read 1 hour everyday"},
//     {id: 5, img: boy, title: "Read with 4 friends"},
//     {id: 6, img: boy, title: "Read with 4 friends"},
//     {id: 7, img: boy, title: "Read with 4 friends"},
//     {id: 8, img: boy, title: "Read with 4 friends"},
//     {id: 9, img: boy, title: "Read with 4 friends"},
//     {id: 10, img: boy, title: "Read with 4 friends"},
//     {id: 11, img: boy, title: "Read with 4 friends"},
//     {id: 8, img: boy, title: "Read with 4 friends"},
//     {id: 9, img: boy, title: "Read with 4 friends"},
//     {id: 10, img: boy, title: "Read with 4 friends"},
//     {id: 11, img: boy, title: "Read with 4 friends"},
// ]

const ChallengesPage = () => {
    const {challenges: challengesList} = useAppSelector(state => state.challenges)
    const [challenges, setChallenges] = useState<ChallengeType[]|null>(challengesList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllChallenges())
    }, [])

    useEffect(() => {
        setChallenges(challengesList)
    }, [challengesList])

    return (
        <MainLayout>
            <div className={cn('challenges-page')}>
                <div className={cn('challenges-page__content')}>
                    {challenges?.map(challenge=> {
                        return <ChallengeItem key={challenge.id} challenge={challenge} />
                    })}
                </div>
            </div>
        </MainLayout>
    );
};

export default ChallengesPage;
