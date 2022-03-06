import React from 'react';
import './PostItem.scss'
import cn from "classnames";
import book3 from "../../../images/book3.png";
import {BookItemType} from "../../../types/types";
import {useNavigate} from "react-router-dom";

interface IPostItem{
    book: BookItemType
}

const PostItem = ({book}: IPostItem) => {
    const navigate = useNavigate()
    return (
        <div className={cn('post-item')} onClick={() => navigate(`/books/${book.id}`)}>
            <p className={cn('book-price')}>{book.cost!== '' ? book.cost : book.conditions}</p>
            {/*<img src={book.img} alt={'Book image'}/>*/}
            <img src={book3} alt={'Book image'}/>
            <p className={cn('book-title')}>{book.title}</p>
            <p className={cn('book-author')}>{book.author}</p>
        </div>
    );
};

export default PostItem;
