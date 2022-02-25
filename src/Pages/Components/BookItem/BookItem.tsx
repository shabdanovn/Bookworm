import React from 'react';
import cn from "classnames";
import book3 from '../../../images/book3.png'
import './BookItem.scss'
import {useTheme} from "../../../hooks/useTheme";

export type BookType = {
    id: number,
    price: string,
    conditions: string,
    img: string | HTMLImageElement | File,
    title: string,
    author: string,
}

interface BookItemProps{
    book: BookType
}

const BookItem = ({book}: BookItemProps) => {
    const {isDark} = useTheme()
    return (
        <div key={book.id} className={cn('book-item', {dark: isDark})}>
            <p className={cn('book-price')}>{book.price!== '' ? book.price : book.conditions}</p>
            {/*<img src={book.img} alt={'Book image'}/>*/}
            <img src={book3} alt={'Book image'}/>
            <p className={cn('book-title')}>{book.title}</p>
            <p className={cn('book-author')}>{book.author}</p>
        </div>
    );
};

export default BookItem;
