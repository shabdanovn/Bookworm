import React, {useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "./redux";

interface ICommandData{
    command: string
}

const useAlan = () => {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(()=> {
        alanBtn({
            zIndex: 100,
            key: process.env.REACT_APP_ALAN_KEY || '',
            onCommand: ({command}: ICommandData) => {
                console.log('command', command)
                if(command === 'books') {
                    console.log('boks', command)
                    navigate(  '/books')}
                if(command === 'goBack') navigate(-1)
                if(command === 'profile-page' || command === 'saved-books') {
                    if (isLoggedIn) navigate(`/${command}`)
                    else { // @ts-ignore
                        alanBtn().playText('First you need to login to the system')
                    }
                }

            }
        });
    }, [])
    return null
};

export default useAlan;
