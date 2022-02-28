import React, {ReactChild, ReactNode} from 'react';
import './BooksList.scss'
import cn from "classnames";
import BookItem from "../BookItem/BookItem";

interface IBooksList{
    children: ReactNode | ReactChild
}

const BooksList = ({children}: IBooksList) => {
    return (
        <div className={cn('books-list')}>
            {children}
        </div>
    );
};

export default BooksList;
