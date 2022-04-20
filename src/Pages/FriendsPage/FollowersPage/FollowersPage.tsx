import React, {useEffect, useState} from 'react';
import './FollowersPage.scss'
import cn from "classnames";
import FriendsPageLayout from "../../Components/FriendsPageLayout/FriendsPageLayout";
import FriendItem from "../../Components/FriendItem/FriendItem";
import {UserType} from "../../../types/user";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getFollowers, getFollowings} from "../../../redux/slices/friends.slice";

const FollowersPage = () => {
    const {followers:followersList, followings: followingsList, isLoading} = useAppSelector(state => state.friends)
    const {user, isLoggedIn } = useAppSelector(state => state.auth)
    const [followers, setFollowers] = useState<UserType[]>(followersList);
    const [copy, setCopy] = useState<UserType[]>(followersList);
    const [followings, setFollowings] = useState<UserType[]>(followingsList);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getFollowers(user.id))
        dispatch(getFollowings(user.id))
    }, [])

    useEffect(() => {
        setFollowers(followersList)
        setFollowings(followingsList)
        setCopy(followersList)
    }, [followersList, followingsList])

    return (
        <FriendsPageLayout searchbarText={"Followers"} setFriends={setFollowers} friends={followers} copy={copy}>
            {followers.length===0 && <p className={cn('no-user-found')}>No user found</p>}
            {followers.map(follower => {
                if(followings.find(item => item.id === follower.id))
                    return <FriendItem key={follower.id} friend={follower} type={'unfollow'} />
                return <FriendItem key={follower.id} friend={follower} />
            })}
        </FriendsPageLayout>
    );
};

export default FollowersPage;
