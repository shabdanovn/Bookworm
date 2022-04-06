import React, {MouseEvent, useEffect, useState} from 'react';
import cn from "classnames";
import avatar from "../../../images/username.svg";
import deleteItem from "../../../images/delete.svg";
import './DialogItem.scss'
import {ConversationItemType, ConversationType, IFriend} from "../../../types/chat";
import {API_URL} from "../../../utils/constants";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getConversationUser} from "../../../redux/slices/user.slice";
import axios from "axios";
import authHeader from "../../../services/auth-header";

interface IDialog{
    dialog: ConversationType
    onClick?: ()=> void
    setFriend: (friend: IFriend) => void
}

const DialogItem = ({dialog, onClick, setFriend}: IDialog) => {
    // const {isLoading, conversationUser} = useAppSelector(state => state.user)
    const [user, setUser] = useState<ConversationItemType>()
    const {user: currentUser} = useAppSelector(state => state.auth)
    // const dispatch = useAppDispatch()

    const deleteHandle = (e: MouseEvent<HTMLImageElement>) => {
        if(e.target===e.currentTarget){
            e.stopPropagation()
            // alert('deleted ' + dialog.id)
        }
    }

    useEffect( () => {
        const id = dialog.senderId !== currentUser.id ? dialog.senderId : dialog.receiverId
        const getUser = async () => {
            try {
                const response = await axios.get(`${API_URL}/users/${id}`, {
                    headers: {
                        Authorization: 'Bearer '+ authHeader()
                    }
                })

                setUser(response.data)
            }catch (e) {
                console.error(e)
            }
        }

        getUser()
        // dispatch(getConversationUser(dialog.receiverId))
    }, [])

    const clickHandle = () => {
        if(user && user.username){
          setFriend({
              username: user.username,
              img: user.img
          })
        }
        if(onClick) onClick()
    }
    return (
        <div onClick={clickHandle} className={cn('dialog-item', {active: false})}>
            <img src={user?.img ? `${API_URL}/${user?.img}` : avatar} alt={"User avatar"}/>
            <p className={cn('dialog-item__username')}>{user?.username}</p>
            {/*<div>*/}
                {/*<p>{dialog.date}</p>*/}
            {/*</div>*/}
            {/*<img onClick={deleteHandle} src={deleteItem} alt={'Delete icon'}/>*/}
        </div>
    );
};

export default DialogItem;
