import React, {ChangeEvent, KeyboardEventHandler, useEffect, useRef, useState} from 'react';
import cn from "classnames";
import searchLogo from '../../../images/search.svg'
import './Searchbar.scss'
import {useTranslation} from "react-i18next";
import {BookType} from "../../../types/books";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getSearchedBooks} from "../../../redux/slices/books.slice";
import {UserType} from "../../../types/user";
import {useLocation} from "react-router-dom";

interface ISearchbar{
    setBooks?:(books: BookType[]) => void
    setFriends?: (friends: UserType[]) => void,
    full?: boolean
    placeholder: string
    friends?: UserType[]
    copy?: UserType[]
}

const Searchbar = ({setBooks, full=false, placeholder, setFriends, friends, copy}: ISearchbar) => {
    const {t} = useTranslation()
    const [word, setWord] = useState<string>('')
    const dispatch = useAppDispatch()
    const {searchedBooks, books} = useAppSelector(state => state.books)
    const location = useLocation()

    const btnClick = () => {
        check()
    }

    const check = () => {
        if(word) {
            if((location.pathname==='/followers' || location.pathname==='/followings') && friends && setFriends)
                setFriends(friends?.filter(friend => friend.username?.toLowerCase().includes(word.toLowerCase()) ||
                    friend.fullname?.toLowerCase().includes(word.toLowerCase())))
            else dispatch(getSearchedBooks(word))
        }
    }

    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            check()
        }
    };

    useEffect(() => {
        setBooks && setBooks(searchedBooks)
    }, [searchedBooks])

    useEffect(() => {
        if(!word && setBooks) setBooks(books)
        if(!word) {
            if((location.pathname==='/followers' || location.pathname==='/followings')
                && setFriends && copy){
                setFriends(copy)
            }
        }
    }, [word])

    return (
        <div className={cn('searchbar', {full: full})}>
            <input type={'text'} placeholder={t(placeholder)}
                   onKeyDown={keyDownHandler}
                   value={word} onChange={(e: ChangeEvent<HTMLInputElement>) => setWord(e.target.value)}/>
            <div className={cn('search-btn')} onClick={btnClick}>
                <img src={searchLogo} alt={'searchbar logo'}/>
            </div>
        </div>
    );
};

export default Searchbar;
