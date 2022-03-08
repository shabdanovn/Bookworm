import React, {MouseEvent} from 'react';
import cn from "classnames";
import boy from "../../../images/boy.jpg";
import deleteItem from "../../../images/delete.svg";
import './DialogItem.scss'
import {DialogType} from "../../../types/types";

interface IDialog{
    dialog: DialogType
    onClick?: ()=> void
}

const DialogItem = ({dialog, onClick}: IDialog) => {

    const deleteHandle = (e: MouseEvent<HTMLImageElement>) => {
        if(e.target===e.currentTarget){
            e.stopPropagation()
            alert('deleted ' + dialog.id)
        }
    }

    return (
        <div onClick={onClick} className={cn('dialog-item', {active: false})}>
            <img src={boy} alt={"User avatar"}/>
            <div>
                <p>{dialog.name}</p>
                <p>{dialog.date}</p>
            </div>
            <img onClick={deleteHandle} src={deleteItem} alt={'Delete icon'}/>
        </div>
    );
};

export default DialogItem;
