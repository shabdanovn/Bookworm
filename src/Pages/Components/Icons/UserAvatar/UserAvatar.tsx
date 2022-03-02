import React from 'react';
import './UserAvatar.scss'
import AvatarIcon from "./AvatarIcon/AvatarIcon";
import cn from "classnames";
import './UserAvatar.scss'
import {useTheme} from "../../../../hooks/useTheme";
import boy from '../../../../images/boy.jpg'

interface IUserAvatar{
    onClick: () => void
}

const UserAvatar = ({onClick}: IUserAvatar) => {
    const {isDark} = useTheme()
    return (
        <div className={cn('user-avatar', {dark: isDark})}
             onClick={onClick}>
            {/*<AvatarIcon/>*/}
            <img src={boy} alt={"User avatar"}/>
        </div>
    );
};

export default UserAvatar;
