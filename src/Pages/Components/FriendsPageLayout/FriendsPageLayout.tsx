import React, {ReactChild, ReactChildren, ReactNode} from 'react';
import './FriendsPageLayout.scss'
import cn from "classnames";
import MainLayout from "../MainLayout/MainLayout";
import Searchbar from "../Searchbar/Searchbar";
import {UserType} from "../../../types/user";
import {fr} from "timeago.js/lib/lang";

interface IFriendsPageLayout {
    children: ReactNode | ReactChild | ReactChildren,
    setFriends?: (friends:UserType[]) => void
    searchbarText: string
    friends?: UserType[]
    copy?: UserType[]
}

const FriendsPageLayout = ({children, setFriends, searchbarText, friends, copy}: IFriendsPageLayout) => {
    return (
        <MainLayout>
            <div className={cn('friends-page-layout')}>
                <div className={cn('friends-helpers')}>
                    <Searchbar setFriends={setFriends}
                               friends={friends}
                               placeholder={searchbarText}
                               full={true} copy={copy}
                    />
                </div>
                <div className={cn('friends-page-layout__content')}>
                    {children}
                </div>
            </div>
        </MainLayout>
    );
};

export default FriendsPageLayout;
