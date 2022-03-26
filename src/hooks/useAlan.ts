import React, {useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./redux";
import wordsToNumbers from "words-to-numbers";
import {logout} from "../redux/slices/auth.slice";
import {useTheme} from "./useTheme";
import {getAllBooks, getFilteredBooks, getSearchedBooks} from "../redux/slices/books.slice";

interface ICommandData{
    command: string
    number: string
    word: string
    genre: string
}

const ALAN_KEY='6dd5bf0eaf8eed5b3cf8ad6efeadef222e956eca572e1d8b807a3e2338fdd0dc/stage'


const useAlan = () => {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const {setIsDark, isDark} = useTheme()

    const parseNum = (number:string) => {
        return number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number
    }

    const searchBookByName = (word:string) => {
        if(word) dispatch(getSearchedBooks(word))
    }

    const searchBooksByGenre = (genre:string) => {
        if(genre) dispatch(getFilteredBooks(genre))
    }

    const findAllBooks = () => {
        dispatch(getAllBooks())
    }

    useEffect(()=> {
        alanBtn({
            zIndex: 100,
            // key: process.env.REACT_APP_ALAN_KEY || '',
            key: ALAN_KEY,
            onCommand: ({command, number, word, genre}: ICommandData) => {
                switch (command){
                    case 'books':
                    case 'sign-in':
                    case 'sign-up':
                        navigate(`/${command}`)
                        break
                    case 'goBack': navigate(-1); break
                    case 'sign-out': dispatch(logout()); break
                    case 'profile-page':
                        if (isLoggedIn) navigate(`/${command}`)
                        break
                    case 'my-books':
                        if (isLoggedIn) navigate(`/profile-page/${command}`)
                        break
                    case 'saved-books':
                        if (isLoggedIn) navigate(`/${command}`)
                        else {
                            // alanBtn().callProjectApi("checkAuthed", {
                            //     isLoggedIn: isLoggedIn
                            // }, function(error, result) {});
                            //@ts-ignore
                            alanBtn().playText('Jasdasd')
                        }
                        break
                    case 'open-book':
                        navigate(`/books/${parseNum(number)}`)
                        break
                    case 'main': navigate(`/`); break;
                    case "create-post":
                        if (isLoggedIn) navigate(`/${command}`)
                        break
                    case "edit-post":
                        if (isLoggedIn) navigate(`/${command}/${parseNum(number)}`)
                        break
                    case "edit-profile":
                        if (isLoggedIn) navigate('/profile-page/profile-edit')
                        break
                    case "messages-page":
                        if (isLoggedIn) navigate(`/${command}`)
                        break
                    case "find-book-by-name": searchBookByName(word); break;
                    case "find-books-by-genre": searchBooksByGenre(genre); break;
                    case "find-all-books": findAllBooks(); break;
                }
            }
        });
    }, [])
    return null
};

export default useAlan;
