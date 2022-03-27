import React from 'react';
import './PostItem.scss'
import cn from "classnames";
import {useNavigate} from "react-router-dom";
import {BookType} from "../../../types/books";
import {API_URL} from "../../../utils/constants";

interface IPostItem{
    book: BookType
}

const PostItem = ({book}: IPostItem) => {
    const navigate = useNavigate()
    return (
        <div className={cn('post-item')} onClick={() => navigate(`/books/${book.id}`)}>
            <p className={cn('book-price')}>{book.cost!== '' ? book.cost : book.conditions || '---'}</p>
            <img src={`${API_URL}/${book.img}`} alt={'Book image'}/>
            <p className={cn('book-title')}>{book.title}</p>
            <p className={cn('book-author')}>{book.author}</p>
        </div>
    );
};

export default PostItem;
