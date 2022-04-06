import React, {useEffect, useRef, useState} from 'react';
import './MessagesPage.scss'
import MainLayout from "../Components/MainLayout/MainLayout";
import cn from "classnames";
import back from '../../images/reply.svg'
import send from '../../images/send.svg'
import DialogItem from "../Components/DialogItem/DialogItem";
import MessageItem from "../Components/MessageItem/MessageItem";
import art from '../../images/statue.png'
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {ConversationItemType, ConversationType, CreateMessageType, IFriend, MessageType} from "../../types/chat";
import {addMessage, getConversations, getMessages} from "../../redux/slices/chat.slice";


const MessagesPage = () => {
    const {t} = useTranslation()
    const {isLoggedIn, user} = useAppSelector(state => state.auth)
    const {isLoading, messages: messagesList, conversations} = useAppSelector(state => state.chat)
    const [dialogs, setDialogs] = useState<ConversationType[]>(conversations)
    const [messages, setMessages] = useState<MessageType[]>(messagesList)
    const [friend, setFriend] = useState<IFriend>()
    const [messageText, setMessageText] = useState<string>("");
    const [hideDialog, setHideDialog] = useState<boolean>(false);
    const [dialog, setDialog] = useState<ConversationType|null>(null);
    const messageRef = useRef<null | HTMLDivElement>(null)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(()=>{
        !isLoggedIn && navigate('/books')
    }, [isLoggedIn, navigate])

    useEffect(()=>{
        isLoggedIn && dispatch(getConversations(user.id))
    }, [])

    useEffect(()=> setDialogs(conversations), [conversations])

    const dialogClickHandle = (dialog: ConversationType) => {
        setHideDialog(true)
        setDialog(dialog)
    }

    useEffect(()=>{
        if(dialog) dispatch(getMessages(dialog.id))
        setMessageText('')
    }, [dialog])

    useEffect(()=> setMessages(messagesList), [messagesList])
    useEffect(()=> messageRef.current?.scrollIntoView({behavior: "smooth"}), [messages])

    const sendMessage = () => {
        if(messageText && dialog) {
            const message: CreateMessageType = {
                conversationId: dialog.id,
                senderId: user.id,
                text: messageText
            }
            dispatch(addMessage(message))
            setMessageText('')
        }
    }

    return (
        <MainLayout>
            <div className={cn('messages-page')}>
                <div className={cn('messages-content', {hide: hideDialog})}>
                    <div className={cn('dialogs')}>
                        <div className={cn('dialogs-title')}>
                            <p>{t('messages-page.title')}</p>
                        </div>
                        {dialogs.map(dialog => {
                            return <DialogItem key={dialog.id} dialog={dialog}
                                               setFriend={setFriend}
                                               onClick={() => dialogClickHandle(dialog)}
                            />
                        })}
                    </div>
                    <div className={cn('messages', {center: dialog === null})}>
                        {dialog
                            ? <><div className={cn('dialogs-user')}>
                                <img onClick={() => setHideDialog(false)} src={back} alt={'Go back item'}/>
                                <p>{friend?.username || '---'}</p>
                            </div>
                            <div className={cn('messages-part')}>
                                <div className={cn('date')}>
                                    <p>{new Date().toLocaleDateString('ru-RU')}</p>
                                </div>
                                {messages.map(msg => {
                                    return <MessageItem key={msg.id} ref={messageRef}
                                                        msg={msg} friend={friend}/>
                                })}
                            </div>
                            <div className={cn('create-msg')}>
                                <textarea value={messageText}
                                          onChange={(event => setMessageText(event.target.value))}
                                          placeholder={t('messages-page.message')}/>
                                <button onClick={sendMessage}><img src={send} alt={'Send button icon'}/> </button>
                            </div></>
                            :<div className={cn('no-content')}>
                                <p>{t('messages-page.start-chat')}</p>
                                <img src={art} alt={'Art logo'}/>
                            </div>}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default MessagesPage;
