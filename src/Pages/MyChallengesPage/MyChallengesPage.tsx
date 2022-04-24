import React, {useEffect, useState} from 'react';
import './MyChallengesPage.scss'
import MainLayout from "../Components/MainLayout/MainLayout";
import cn from "classnames";
import H3 from "../Components/H3/H3";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import Loader from "../Components/Loader/Loader";
import {ChallengeType} from "../../types/challenges";
import {getUserCreatedChallenges, getUserInChallenges} from "../../redux/slices/challenges.slice";
import ChallengeItem from "../Components/ChallengeItem/ChallengeItem";

const MyChallengesPage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()
    const {isLoggedIn, user} = useAppSelector(state => state.auth)
    const {myCreatedChallenges, isLoading, challengesImIn: challengesImInList} = useAppSelector(state => state.challenges)
    const [challenges, setChallenges] = useState<ChallengeType[]>(myCreatedChallenges)
    const [challengesImIn, setChallengesimIn] = useState<ChallengeType[]>(challengesImInList)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(!isLoggedIn) navigate('/challenges')
    }, [isLoggedIn, navigate])

    useEffect(() => {
        if(isLoggedIn) {
            if(location.pathname === '/my-created-challenges') dispatch(getUserCreatedChallenges(user.id))
            else if(location.pathname === '/challenges-in') dispatch(getUserInChallenges(user.id))
        }
    },[])

    useEffect(() => {
        setChallenges(myCreatedChallenges)
    }, [myCreatedChallenges])

    useEffect(() => {
        setChallengesimIn(challengesImInList)
    }, [challengesImInList])

    if(isLoading) return <Loader/>

    return (
        <MainLayout>
            {isLoading ? <Loader/> :
                <div className={cn('my-challenges-page')}>
                <H3 text={location.pathname === '/my-created-challenges'
                    ? "My created challenges"
                    : "Challenges I am in"
                } font={true}/>
                <div className={cn('my-challenges-page__content')}>
                    {location.pathname === '/my-created-challenges' &&
                        challenges.length === 0 && <h3 className={cn('no-challenges')}>No challenges to show</h3>}
                    {location.pathname === '/challenges-in' &&
                        challengesImIn.length === 0 && <h3 className={cn('no-challenges')}>No challenges to show</h3>}
                    {location.pathname === '/my-created-challenges'
                        ?   challenges.map(challenge => {
                                return <ChallengeItem challenge={challenge} key={challenge.id}/>
                            })
                        :   challengesImIn.map(challenge => {
                                return <ChallengeItem challenge={challenge} key={challenge.id}/>
                            })
                    }
                </div>
            </div>
            }
        </MainLayout>
    );
};

export default MyChallengesPage;
