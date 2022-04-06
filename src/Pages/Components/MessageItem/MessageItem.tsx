import React, {forwardRef} from 'react';
import cn from "classnames";
import avatar from "../../../images/username.svg";
import {IFriend, MessageType} from "../../../types/chat";
import {useAppSelector} from "../../../hooks/redux";
import * as timeago from 'timeago.js';
import './MessageItem.scss'
import {API_URL} from "../../../utils/constants";
// import {MessageType} from "../../../types/types";

interface IMessageItem{
    msg: MessageType,
    friend?: IFriend,
}

const MessageItem = forwardRef(({msg, friend}: IMessageItem, ref: React.Ref<HTMLDivElement>) => {
    const {user} = useAppSelector(state => state.auth)

    return (
        msg.senderId === user.id
            ? <div key={msg.id} ref={ref} className={cn("sent-message")}>
                <p>{msg.text}</p>
                <p className={cn('timestamp')} >{timeago.format(msg.createdAt)}</p>
            </div>
            : <div key={msg.id} className={cn('received-message')}>
                <div className={cn('received-message-content')}>
                    <img src={friend?.img ? `${API_URL}/${friend.img}` : avatar} alt={"Sender avatar"}/>
                    <p className={cn('received-message-text')}>{msg.text}</p>
                </div>
                <p className={cn('timestamp')}>{timeago.format(msg.createdAt)}</p>
            </div>
    );
});

export default MessageItem;
