import React, {useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./redux";
import wordsToNumbers from "words-to-numbers";
import {logout} from "../redux/slices/auth.slice";
import {useTheme} from "./useTheme";
import {createComment, getAllBooks, getFilteredBooks, getSearchedBooks} from "../redux/slices/books.slice";
import {useGeneralContext} from "./useGeneralContext";
import { CreateCommentType} from "../types/books";

interface ICommandData{
    command: string
    number: string
    word: string
    genre: string
    text:string
}


const useAlan = () => {
    const navigate = useNavigate()
    const {isLoggedIn, user} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const {setIsDark} = useTheme()
    const {setShowComments} = useGeneralContext()

    const parseNum = (number:string) => {
        return number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number
    }

    const searchBookByName = (word:string) => {
        if (word) dispatch(getSearchedBooks(word))
    }

    const searchBooksByGenre = (genre:string) => {
        if(genre) dispatch(getFilteredBooks(genre))
    }

    const findAllBooks = () => dispatch(getAllBooks())

    const addComment = (text:string) => {
        if(!isLoggedIn) {
            // setModalContent(<p>Login firts</p>)
            // open()
            return null
        }else{
            const array = window.location.pathname.split('/')
            const bookId = array[array.length-1]
            if(text!==''){
                let comment: CreateCommentType = {
                    text,
                    author: user.username,
                    authorImg: user.img,
                    bookId: +bookId,
                    authorId: user.id
                }
                dispatch(createComment(comment))
            }
        }
    }

    useEffect(()=> {
        alanBtn({
            zIndex: 100,
            // key: process.env.REACT_APP_ALAN_KEY || '',
            key: ALAN_KEY,
            onCommand: ({command, number, word, genre, text}: ICommandData) => {
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
                    case "show-comments": setShowComments(true); break;
                    case "close-comments": setShowComments(false); break;
                    case "dark-mode": setIsDark(true); break;
                    case "light-mode": setIsDark(false); break;
                    case "add-comment": addComment(text); break;
                }
            }
        });
    }, [])
    return null
};

export default useAlan;
