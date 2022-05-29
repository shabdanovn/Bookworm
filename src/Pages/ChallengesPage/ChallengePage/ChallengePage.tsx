import React, {useEffect, useState} from 'react';
import MainLayout from "../../Components/MainLayout/MainLayout";
import cn from "classnames";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import {API_URL} from "../../../utils/constants";
import avatar from "../../../images/avatar.svg";
import {useTranslation} from "react-i18next";
import H3 from "../../Components/H3/H3";
import {useTheme} from "../../../hooks/useTheme";
import {useGeneralContext} from "../../../hooks/useGeneralContext";
import ChallengeComments from "./ChallengeComments/ChallengeComments";
import {ChallengeType} from "../../../types/challenges";
import './ChallengePage.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {
    addUserToChallenge,
    deleteUserFromChallenge,
    getChallenge,
    getUserInChallenges
} from "../../../redux/slices/challenges.slice";
import NotAuthedModal from "../../Components/ModalWindows/NotAuthedModal/NotAuthedModal";
import useModal from "../../../hooks/useModal";

const ChallengePage = () => {
    const {id} = useParams()
    const {t} = useTranslation()
    const {isDark} = useTheme()
    const navigate = useNavigate()
    const {challenge: challengeInfo, challengesImIn} = useAppSelector(state => state.challenges)
    const {user, isLoggedIn} = useAppSelector(state => state.auth)
    const [challenge, setChallenge] = useState<ChallengeType|null>(challengeInfo)
    const dispatch = useAppDispatch()
    const {showComments, setShowComments} = useGeneralContext()
    const {setModalContent, open, close} = useModal()
    const [isMember, setIsMember] = useState<boolean>(false)

    useEffect(() => {
        setShowComments(false)
        if(id) dispatch(getChallenge(+id))
        if(user) dispatch(getUserInChallenges(user.id))
    }, []);

    useEffect(() => {
        setChallenge(challengeInfo)
    }, [challengeInfo]);

    useEffect(() => {
        if(id && challengesImIn.find(item => item.id === +id))
            setIsMember(true)
    }, [challengesImIn]);

    const joinClick = () => {
        if(!isLoggedIn) {
            setModalContent(<NotAuthedModal close={close}/>)
            open()
        }else {
            if(id){
                if(isMember) {
                    dispatch(deleteUserFromChallenge({userId: user.id, challengeId: +id}))
                    setIsMember(false)
                }
                else {
                    dispatch(addUserToChallenge({userId: user.id, challengeId: +id}))
                    setIsMember(true)
                }
            }
        }
    }

    const commentsClick = () => setShowComments(!showComments)

    if(showComments) window.scrollTo(0, document.body.scrollHeight+50)
    else window.scrollTo(0,0)

    return (
        <MainLayout>
            <div className={cn('challenge-page', {dark: isDark})}>
                <H3 text={challenge?.title || "---"} />
                <div className={cn('challenge-page__content')}>
                    <div className={cn('challenge-img-action-group')}>
                        <img alt={"Challenge"} className={cn('challenge-image')}
                             src={challenge && challenge.img ? `${API_URL}/${challenge.img}` : avatar}/>
                        <div className={cn('buttons')}>
                            <button onClick={commentsClick}>{t('book-page.comments')}</button>
                            <button onClick={joinClick}>{isMember ? t('challenges.leave') : t('challenges.join')}</button>
                        </div>
                    </div>
                    <div className={cn('challenge-descr')}>
                        <p className={cn('descr-title')}>{t('challenges.description')}:</p>
                        <p>{challenge?.description}</p>
                        <p className={cn('descr-title')}>{t('challenges.start-date')}:
                            <span> {challenge && new Date(challenge?.start_date).toLocaleDateString()}</span>
                        </p>
                        <p className={cn('descr-title')}>{t('challenges.end-date')}:
                            <span> {challenge && new Date(challenge?.end_date).toLocaleDateString()}</span>
                        </p>
                        <p className={cn('descr-title')}>{t('challenges.punishment')}:</p>
                        <p>{challenge?.punishment}</p>
                    </div>
                </div>
            </div>
            {showComments && id && <ChallengeComments challengeId={+id} />}
        </MainLayout>
    )
};

export default ChallengePage;
