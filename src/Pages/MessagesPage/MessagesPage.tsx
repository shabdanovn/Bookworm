import React, {useState} from 'react';
import './MessagesPage.scss'
import MainLayout from "../Components/MainLayout/MainLayout";
import cn from "classnames";
import back from '../../images/reply.svg'
import send from '../../images/send.svg'
import DialogItem from "../Components/DialogItem/DialogItem";
import MessageItem from "../Components/MessageItem/MessageItem";
import {DialogType} from "../../types/types";
import art from '../../images/statue.png'
import {useTranslation} from "react-i18next";


const dialogs= [
    {id: 1, name: 'Napoleon', date: '1995-12-17T03:24:00', messages: [
            {msgId: 12, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 13, type: 'received', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 14, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 15, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 16, type: 'received', text: "Aasda asjdakj askdjasjbd sdasda ajshdbajh ajshdbahj ajsdb?"},
            {msgId: 17, type: 'received', text: "Aasda asjdakj askdjasjbd ahahah"},
            {msgId: 18, type: 'received', text: "Aasda asjdakj askdjasjb?"},
            {msgId: 20, type: 'received', text: "Aasda asjdakj askdjasjb?"},
            {msgId: 21, type: 'received', text: "Aasda asjdakj askdjasjb?"},
            {msgId: 22, type: 'received', text: "Aasda asjdakj askdjasjb?"},
            {msgId: 23, type: 'received', text: "Aasda asjdakj askdjasjb?"},
            {msgId: 24, type: 'received', text: "Aasda asjdakj askdjasjb?"},
            {msgId: 19, type: 'sent', text: "Aasda asjdakj askdjasjbd"}
        ]
    },
    {id: 2, name: 'Vladimir Putin', date: '2019-01-31', messages: [
            {msgId: 12, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 13, type: 'received', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 14, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 15, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 16, type: 'received', text: "Aasda asjdakj askdjasjbd sdasda ajshdbajh ajshdbahj ajsdb?"},
            {msgId: 17, type: 'received', text: "Aasda asjdakj askdjasjbd ahahah"},
            {msgId: 18, type: 'received', text: "Aasda asjdakj askdjasjb?"},
            {msgId: 19, type: 'sent', text: "Aasda asjdakj askdjasjbd"}
        ]
    },
    {id: 3, name: 'Jou Biden', date: '2019-01-31', messages: [
            {msgId: 12, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 13, type: 'received', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 14, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 15, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 16, type: 'received', text: "Aasda asjdakj askdjasjbd sdasda ajshdbajh ajshdbahj ajsdb?"},
            {msgId: 17, type: 'received', text: "Aasda asjdakj askdjasjbd ahahah"},
            {msgId: 18, type: 'received', text: "Aasda asjdakj askdjasjb?"},
            {msgId: 19, type: 'sent', text: "Aasda asjdakj askdjasjbd"}
        ]
    },
    {id: 4, name: 'Michael Stalin', date: '2019-01-31', messages: [
            {msgId: 12, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 13, type: 'received', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 14, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 15, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 16, type: 'received', text: "Aasda asjdakj askdjasjbd sdasda ajshdbajh ajshdbahj ajsdb?"},
            {msgId: 17, type: 'received', text: "Aasda asjdakj askdjasjbd ahahah"},
            {msgId: 18, type: 'received', text: "Aasda asjdakj askdjasjb?"},
            {msgId: 19, type: 'sent', text: "Aasda asjdakj askdjasjbd"}
        ]
    },
    {id: 5, name: 'Alexander the great the second', date: '2019-01-31', messages: [
            {msgId: 12, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 13, type: 'received', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 14, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 15, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 16, type: 'received', text: "Aasda asjdakj askdjasjbd sdasda ajshdbajh ajshdbahj ajsdb?"},
            {msgId: 17, type: 'received', text: "Aasda asjdakj askdjasjbd ahahah"},
            {msgId: 18, type: 'received', text: "Aasda asjdakj askdjasjb?"},
            {msgId: 19, type: 'sent', text: "Aasda asjdakj askdjasjbd"}
        ]
    },
    {id: 6, name: 'Napoleon', date: '2019-01-31', messages: [
            {msgId: 12, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 13, type: 'received', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 14, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 15, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 16, type: 'received', text: "Aasda asjdakj askdjasjbd sdasda ajshdbajh ajshdbahj ajsdb?"},
            {msgId: 17, type: 'received', text: "Aasda asjdakj askdjasjbd ahahah"},
            {msgId: 18, type: 'received', text: "Aasda asjdakj askdjasjb?"},
            {msgId: 19, type: 'sent', text: "Aasda asjdakj askdjasjbd"}
        ]
    },
    {id: 7, name: 'Vladimir Putin', date: '2019-01-31', messages: [
            {msgId: 12, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 13, type: 'received', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 14, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 15, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 16, type: 'received', text: "Aasda asjdakj askdjasjbd sdasda ajshdbajh ajshdbahj ajsdb?"},
            {msgId: 17, type: 'received', text: "Aasda asjdakj askdjasjbd ahahah"},
            {msgId: 18, type: 'received', text: "Aasda asjdakj askdjasjb?"},
            {msgId: 19, type: 'sent', text: "Aasda asjdakj askdjasjbd"}
        ]
    },
    {id: 8, name: 'Jou Biden', date: '2019-01-31', messages: [
            {msgId: 12, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 13, type: 'received', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 14, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 15, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 16, type: 'received', text: "Aasda asjdakj askdjasjbd sdasda ajshdbajh ajshdbahj ajsdb?"},
            {msgId: 17, type: 'received', text: "Aasda asjdakj askdjasjbd ahahah"},
            {msgId: 18, type: 'received', text: "Aasda asjdakj askdjasjb?"},
            {msgId: 19, type: 'sent', text: "Aasda asjdakj askdjasjbd"}
        ]
    },
    {id: 9, name: 'Michael Stalin', date: '2019-01-31', messages: [
            {msgId: 12, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 13, type: 'received', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 14, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 15, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 16, type: 'received', text: "Aasda asjdakj askdjasjbd sdasda ajshdbajh ajshdbahj ajsdb?"},
            {msgId: 17, type: 'received', text: "Aasda asjdakj askdjasjbd ahahah"},
            {msgId: 18, type: 'received', text: "Aasda asjdakj askdjasjb?"},
            {msgId: 19, type: 'sent', text: "Aasda asjdakj askdjasjbd"}
        ]
    },
    {id: 10, name: 'Alexander the great the second', date: '2019-01-31', messages: [
            {msgId: 12, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 13, type: 'received', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 14, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 15, type: 'sent', text: "Aasda asjdakj askdjasjbd"},
            {msgId: 16, type: 'received', text: "Aasda asjdakj askdjasjbd sdasda ajshdbajh ajshdbahj ajsdb?"},
            {msgId: 17, type: 'received', text: "Aasda asjdakj askdjasjbd ahahah"},
            {msgId: 18, type: 'received', text: "Aasda asjdakj askdjasjb?"},
            {msgId: 19, type: 'sent', text: "Aasda asjdakj askdjasjbd"}
        ]
    },
]

const MessagesPage = () => {
    const {t} = useTranslation()
    const [messageText, setMessageText] = useState<string>("");
    const [hideDialog, setHideDialog] = useState<boolean>(false);
    const [dialog, setDialog] = useState<DialogType|null>(null);

    const dialogClickHandle = (dialog: DialogType) => {
        setHideDialog(true)
        setDialog(dialog)
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
                            return <DialogItem key={dialog.id} dialog={dialog} onClick={() => dialogClickHandle(dialog)}/>
                        })}
                    </div>
                    <div className={cn('messages', {center: dialog === null})}>
                        {dialog
                            ? <><div className={cn('dialogs-user')}>
                                <img onClick={() => setHideDialog(false)} src={back} alt={'Go back item'}/>
                                <p>{dialog.name}</p>
                            </div>
                            <div className={cn('messages-part')}>
                                <div className={cn('date')}>
                                    <p>{new Date().toLocaleDateString('ru-RU')}</p>
                                </div>
                                {dialog.messages.map(msg => {
                                    return <MessageItem key={msg.msgId} msg={msg}/>
                                })}
                            </div>
                            <div className={cn('create-msg')}>
                                <textarea value={messageText}
                                          onChange={(event => setMessageText(event.target.value))}
                                          placeholder={t('messages-page.message')}/>
                                <button><img src={send} alt={'Send button icon'}/> </button>
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
