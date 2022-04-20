import React, {useEffect, useState} from 'react';
import MainLayout from "../../Components/MainLayout/MainLayout";
import cn from "classnames";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import {API_URL} from "../../../utils/constants";
import boy from "../../../images/boy.jpg";
import {useTranslation} from "react-i18next";
import H3 from "../../Components/H3/H3";
import {useTheme} from "../../../hooks/useTheme";
import {useGeneralContext} from "../../../hooks/useGeneralContext";
import ChallengeComments from "./ChallengeComments/ChallengeComments";
import {ChallengeType} from "../../../types/challenges";
import './ChallengePage.scss'

const ChallengePage = () => {
    const {id} = useParams()
    const {t} = useTranslation()
    const {isDark} = useTheme()
    const navigate = useNavigate()

    const [challenge, setChallenge] = useState<ChallengeType>({
        id: id ? +id : 1,
        userId: 1,
        description: 'The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn\'t distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.',
        punishment: 'Shabdanov Nurs',
        start_date: '25/01/2022',
        end_date: '25/12/2022',
        title: 'Reading one per month'
    })

    const {showComments, setShowComments} = useGeneralContext()
    const [isSaved, setIsSaved] = useState<boolean>(false)

    useEffect(() => {
        setShowComments(false)
    }, []);

    const commentsClick = () => setShowComments(!showComments)

    if(showComments) window.scrollTo(0, document.body.scrollHeight+50)
    else window.scrollTo(0,0)

    return (
        <MainLayout>
            <div className={cn('challenge-page', {dark: isDark})}>
                <H3 text={challenge.title} />
                <div className={cn('challenge-page__content')}>
                    <div className={cn('challenge-img-action-group')}>
                        <img className={cn('challenge-image')} src={challenge.img ? challenge.img : boy}/>
                        <div className={cn('buttons')}>
                            <button onClick={commentsClick}>{t('book-page.comments')}</button>
                            <button onClick={commentsClick}>JOIN</button>
                        </div>
                    </div>
                    <div className={cn('challenge-descr')}>
                        <p className={cn('descr-title')}>Description:</p>
                        <p>{challenge.description}</p>
                        <p className={cn('descr-title')}>Start date:</p>
                        <p>{challenge.start_date}</p>
                        <p className={cn('descr-title')}>End date:</p>
                        <p>{challenge.end_date}</p>
                        <p className={cn('descr-title')}>Punishment:</p>
                        <p>{challenge.punishment}</p>
                    </div>
                </div>
            </div>
            {showComments && <ChallengeComments challengeId={id ? +id: 1} />}
        </MainLayout>
    )
};

export default ChallengePage;
