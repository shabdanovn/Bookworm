import React, {useState} from 'react';
import './MessageModal.scss'
import cn from "classnames";
import {useTheme} from "../../../../hooks/useTheme";
import {useAppDispatch} from "../../../../hooks/redux";
import {addConversation} from "../../../../redux/slices/chat.slice";



interface IMessageModal {
    username?: string
    receiverId?: number
    senderId: number
    close: () => void
}

const MessageModal = ({username, senderId, receiverId, close}: IMessageModal) => {
    const {isDark} = useTheme()
    const [text, setText] = useState<string>('')
    const dispatch = useAppDispatch()

    const sendClick = () => {
        if(senderId && receiverId)
            dispatch(addConversation({data: {senderId, receiverId}, senderId, text}))
        close()
    }

    return (
        <div className={cn('message-modal', {dark: isDark})}>
            <p>{username || '---'}</p>
            <div className={cn('message-modal__content')}>
                <textarea value={text} onChange={e => setText(e.target.value)}/>
            </div>
            <button onClick={sendClick}>Send</button>

        </div>
    );
};

export default MessageModal;
