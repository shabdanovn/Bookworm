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
import useModal from "./useModal";
import NotAuthedModal from "../Pages/Components/ModalWindows/NotAuthedModal/NotAuthedModal";
import {PostCreateCommentType} from "../types/posts";
import {createPostComment} from "../redux/slices/posts.slice";
import {ChallengeCreateCommentType} from "../types/challenges";
import {createChallengeComment} from "../redux/slices/challenges.slice";
import {toast, ToastContainer} from 'react-toastify'

interface ICommandData{
    command: string
    number: string
    word: string
    genre: string
    text:string
}

const ALAN_KEY='6dd5bf0eaf8eed5b3cf8ad6efeadef222e956eca572e1d8b807a3e2338fdd0dc/stage'

const useAlan = () => {
    const navigate = useNavigate()
    const {isLoggedIn, user} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const {setIsDark} = useTheme()
    const {setShowComments} = useGeneralContext()
    const {setModalContent, open, close} = useModal()

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

    const commentToBook = (text:string, id:number) => {
        let comment: CreateCommentType = {
            text,
            author: user.username,
            authorImg: user.img,
            bookId: id,
            authorId: user.id
        }
        dispatch(createComment(comment))
    }

    const commentToPost = (text:string, id:number) => {
        let comment: PostCreateCommentType = {
            text,
            postId: id,
            authorId: user.id
        }
        dispatch(createPostComment(comment))
    }

    const commentToChallenge = (text:string, id:number) => {
        let comment: ChallengeCreateCommentType = {
            text,
            challengeId: id,
            authorId: user.id
        }
        dispatch(createChallengeComment(comment))
    }

    const addComment = (text:string) => {
        if(!isLoggedIn) {
            console.log('you gere')
            setModalContent(<NotAuthedModal close={close } />)
            open()
        }else{
            const array = window.location.pathname.split('/')
            const id = array[array.length-1]
            if(text!==''){
                if(array[array.length-2]==='books')
                     commentToBook(text, +id)
                if(array[array.length-2]==='posts')
                    commentToPost(text, +id)
                if(array[array.length-2]==='challenges')
                    commentToChallenge(text, +id)
                toast('👍 Your comment was added!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                <ToastContainer />
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
                    case 'posts':
                    case 'challenges':
                    case 'sign-in':
                    case 'sign-up':
                        navigate(`/${command}`)
                        break
                    case 'goBack': navigate(-1); break
                    case 'sign-out': dispatch(logout()); break
                    case 'profile-page':
                    case 'my-created-challenges':
                    case 'challenges-in':
                    case 'followers':
                    case 'followings':
                        if (isLoggedIn) navigate(`/${command}`)
                        break
                    case 'my-books':
                        if (isLoggedIn) navigate(`/profile-page/${command}`)
                        break
                    case 'my-posts':
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
                    case 'saved-posts':
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
                    case 'open-post':
                        navigate(`/posts/${parseNum(number)}`)
                        break
                    case 'open-challenge':
                        navigate(`/challenges/${parseNum(number)}`)
                        break
                    case 'main': navigate(`/`); break;
                    case "create-post":
                        if (isLoggedIn) navigate(`/${command}`)
                        break
                    case "create-challenge":
                        if (isLoggedIn) navigate(`/${command}`)
                        break
                    case "create-post-post":
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
