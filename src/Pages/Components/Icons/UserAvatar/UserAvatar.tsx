import React from 'react';
import './UserAvatar.scss'
import AvatarIcon from "./AvatarIcon/AvatarIcon";
import cn from "classnames";
import './UserAvatar.scss'
import {useTheme} from "../../../../hooks/useTheme";
import {useAppSelector} from "../../../../hooks/redux";
import {API_URL} from "../../../../utils/constants";

interface IUserAvatar{
    onClick: () => void
}

const UserAvatar = ({onClick}: IUserAvatar) => {
    const {isDark} = useTheme()
    const user = useAppSelector(state => state.auth.user)
    return (
        <div className={cn('user-avatar', {dark: isDark})}
             onClick={onClick}>
            {user.img ? <img src={`${API_URL}/${user.img}`} alt={"User avatar"}/> : <AvatarIcon/>}

        </div>
    );
};

export default UserAvatar;
