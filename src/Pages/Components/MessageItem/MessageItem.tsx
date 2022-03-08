import React from 'react';
import './MessageItem.scss'
import cn from "classnames";
import boy from "../../../images/boy.jpg";
import {MessageType} from "../../../types/types";

interface IMessageItem{
    msg: MessageType
}

const MessageItem = ({msg}: IMessageItem) => {
    return (
        msg.type === 'sent'
            ? <div key={msg.msgId} className={cn("sent-message")}><p>
                {msg.text}</p></div>
            : <div key={msg.msgId} className={cn('received-message')}>
                <img src={boy} alt={"Sender avatar"}/>
                <p >
                    {msg.text}</p>
            </div>
    );
};

export default MessageItem;
