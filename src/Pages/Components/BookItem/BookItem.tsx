import React, {MouseEvent} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import book3 from '../../../images/book3.png'
import {useTheme} from "../../../hooks/useTheme";
import editLogo from '../../../images/edit.svg'
import deleteLogo from '../../../images/delete.svg'
import savedLogo from '../../../images/saved.svg'
import saveLogo from '../../../images/save.svg'
import cn from "classnames";
import './BookItem.scss'
import {API_URL} from "../../../utils/constants";
import {BookType} from "../../../types/books";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {deleteBook, removeSavedBook, saveBook} from "../../../redux/slices/books.slice";
import Loader from "../Loader/Loader";

interface BookItemProps{
    book: BookType
}

const BookItem = ({book}: BookItemProps) => {
    const {isDark} = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const {isLoggedIn, user} = useAppSelector(state => state.auth)
    const {savedBooks, isLoading} = useAppSelector(state => state.books)
    const dispatch = useAppDispatch()

    const deleteHandle = (e: MouseEvent<HTMLImageElement>) => {
        if(e.target === e.currentTarget){
            e.stopPropagation()
            if(book.id && user.id)
                dispatch(deleteBook({id: book.id, userId: user.id}))
        }
    }

    const editHandle = (e: MouseEvent<HTMLImageElement>) => {
        if(e.target === e.currentTarget){
            e.stopPropagation()
            navigate(`/edit-post/${book.id}`)
        }
    }

    const saveHandle = (e: MouseEvent<HTMLImageElement>) => {
        if(e.target === e.currentTarget){
            e.stopPropagation()
            if(!isLoggedIn)
                alert('First you need to login')
            else {
                if(book.id) dispatch(saveBook({userId: user.id, bookId: book.id}))
            }
        }
    }

    const unsaveHandle = (e: MouseEvent<HTMLImageElement>) => {
        if(e.target === e.currentTarget){
            e.stopPropagation()
            if(book.id) dispatch(removeSavedBook({userId: user.id, bookId: book.id}))
        }
    }

    if(isLoading) return <Loader/>

    return (
        <div onClick={() => location.pathname!=='books' ? navigate(`/books/${book.id}`) :navigate(`${book.id}`)}
             className={cn('book-item', {dark: isDark})}>
                <div className={cn('price-actions-group', {edit: location.pathname==='/profile-page/my-books'})}>
                <p className={cn('book-price')}>{book.cost!== '' ? book.cost : book.conditions}</p>
                {location.pathname==='/profile-page/my-books' && <div>
                    <img onClick={editHandle}
                         className={cn('edit-logo')}
                         src={editLogo} alt={'Edit item'}/>
                    <img onClick={deleteHandle}
                         className={cn('delete-logo')}
                         src={deleteLogo} alt={'Delete item'}/>
                </div>}

            </div>
            <img className={cn('book-img')}
                 src={book.img ? `${API_URL}/${book.img}` : book3} alt={'Book image'}/>
            <p className={cn('book-title')}>{book.title}</p>
            <p className={cn('book-author')}>{book.author}</p>
            {location.pathname === '/saved-books'
                ?<p className={cn('id')}>{book.id}</p>
                :<p className={cn('id without-save')}>{book.id}</p>
            }
            {/*{isLoggedIn*/}
            {/*    ? savedBooks.find(item => item.id === book.id)*/}
            {/*        ? <img onClick={unsaveHandle}*/}
            {/*         className={cn('saved-logo')}*/}
            {/*         src={savedLogo} alt={'Saved item'}/>*/}
            {/*        : <img onClick={saveHandle}*/}
            {/*              className={cn('saved-logo')}*/}
            {/*              src={saveLogo} alt={'Save item'}/>*/}
            {/*    :   <img onClick={saveHandle}*/}
            {/*             className={cn('saved-logo')}*/}
            {/*             src={saveLogo} alt={'Save item'}/>*/}
            {/*}*/}
            {isLoggedIn && location.pathname === '/saved-books'
                    && <img onClick={unsaveHandle}
                           className={cn('saved-logo')}
                           src={savedLogo} alt={'Saved item'}/>}
        </div>
    );
};

export default BookItem;
