import React from 'react';
import cn from "classnames";
import book3 from '../../../images/book3.png'
import './BookItem.scss'
import {useTheme} from "../../../hooks/useTheme";
import {BookItemType} from "../../../types/types";
import {useLocation, useNavigate} from "react-router-dom";

interface BookItemProps{
    book: BookItemType
}

const BookItem = ({book}: BookItemProps) => {
    const {isDark} = useTheme()
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`${book.id}`)}
             className={cn('book-item', {dark: isDark})}>
            <p className={cn('book-price')}>{book.cost!== '' ? book.cost : book.conditions}</p>
            {/*<img src={book.img} alt={'Book image'}/>*/}
            <img src={book3} alt={'Book image'}/>
            <p className={cn('book-title')}>{book.title}</p>
            <p className={cn('book-author')}>{book.author}</p>
        </div>
    );
};

export default BookItem;
