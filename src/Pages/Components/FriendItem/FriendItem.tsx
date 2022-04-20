import React from 'react';
import './FriendItem.scss'
import cn from "classnames";
import avatar from "../../../images/avatar.svg";
import {UserType} from "../../../types/user";
import {API_URL} from "../../../utils/constants";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {followUser, unfollowUser} from "../../../redux/slices/friends.slice";

interface IFriendItem{
    friend: UserType
    type?: string
}

const FriendItem = ({friend, type="follow"}:IFriendItem) => {
    const {user} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const clickHandle = () => {
        if(type==='unfollow' && friend.id) {
            dispatch(unfollowUser({
                userId: user.id,
                followingId: friend.id
            }))
        }else if(type==='follow' && friend.id){
            dispatch(followUser({
                userId: user.id,
                followingId: friend.id
            }))
        }
    }

    return (
        <div className={cn('friend-item')}>
            <div className={cn('friend-item__content')}>
                <img src={friend.img ? `${API_URL}/${friend.img}` : avatar} alt={"Friend avatar"}/>
                <div className={cn('friend-name')}>
                    <p>{friend.username}</p>
                    <p>{friend.fullname}</p>
                </div>
            </div>
            <button onClick={clickHandle}>{type==='unfollow' ? type : 'follow'}</button>
        </div>
    );
};

export default FriendItem;
