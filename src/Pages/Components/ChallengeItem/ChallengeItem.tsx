import React from 'react';
import cn from "classnames";
import {useNavigate} from "react-router-dom";
import './ChallengeItem.scss'
import {ChallengeType} from "../../../types/challenges";
import {API_URL} from "../../../utils/constants";

interface IChallengeItem{
    challenge: ChallengeType
}

const ChallengeItem = ({challenge}: IChallengeItem) => {
    const navigate = useNavigate()

    return (
        <div key={challenge.id} className={cn('card')}
             onClick={() => navigate(`/challenges/${challenge.id}`)}
        >
            <img className={cn('card__img')}
                 src={`${API_URL}/${challenge.img}`} alt={'Challenge image'} />
            <h3 className={cn('card__title')}>{challenge.title}</h3>
            <h3 className={cn('card__id')}>{challenge.id}</h3>
        </div>
    );
};

export default ChallengeItem;
