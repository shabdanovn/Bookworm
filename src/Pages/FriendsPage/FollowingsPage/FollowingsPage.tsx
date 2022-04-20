import React, {useEffect, useState} from 'react';
import './FollowingsPage.scss'
import FriendsPageLayout from "../../Components/FriendsPageLayout/FriendsPageLayout";
import FriendItem from "../../Components/FriendItem/FriendItem";
import {UserType} from "../../../types/user";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getFollowings} from "../../../redux/slices/friends.slice";
import cn from "classnames";

const FollowingsPage = () => {
    const {followings:followingsList , isLoading} = useAppSelector(state => state.friends)
    const {user, isLoggedIn } = useAppSelector(state => state.auth)
    const [followings, setFollowings] = useState<UserType[]>(followingsList);
    const [copy, setCopy] = useState<UserType[]>(followingsList);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getFollowings(user.id))
    }, [])

    useEffect(() => {
        setFollowings(followingsList)
        setCopy(followingsList)
    }, [followingsList])

    return (
        <FriendsPageLayout searchbarText={"Followings"} copy={copy}
                           setFriends={setFollowings} friends={followings}>
            {followings.length===0 && <p className={cn('no-user-found')}>No user found</p>}
            {followings.map(following => {
                return <FriendItem key={following.id} friend={following}
                                   type={'unfollow'}/>
            })}
        </FriendsPageLayout>
    );
};

export default FollowingsPage;
