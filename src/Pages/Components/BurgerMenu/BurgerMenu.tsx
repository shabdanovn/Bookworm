import React from 'react';
import {useTranslation} from "react-i18next";
import cn from "classnames";
import {useLocation, useNavigate} from "react-router-dom";
import './BurgerMenu.scss'
import useModal from "../../../hooks/useModal";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {logout} from "../../../redux/slices/auth.slice";

const BurgerMenu = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {close} = useModal()
    const location = useLocation()
    const isAuth = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const clickHandle = (text: string) => {
        navigate(text)
        close()
    }

    const signoutHandle = () => {
        dispatch(logout())
        close()
    }

    return(
        <div className={cn('side-menu')}>
            <p className={cn('side-menu-item', {active: location.pathname==='/'})}
               onClick={() => clickHandle('/')}>{t("navigation.main")}</p>
            <p className={cn('side-menu-item', {active: location.pathname==='/books'})}
               onClick={() => clickHandle('books')}>{t("navigation.books")}</p>
            <p className={cn('side-menu-item', {active: location.pathname==='/posts'})}
               onClick={() => clickHandle('posts')}>{t("navigation.posts")}</p>
            <p className={cn('side-menu-item', {active: location.pathname==='/challenges'})}
               onClick={() => clickHandle('challenges')}>{t("navigation.challenges")}</p>
            {location.pathname==='/' && <p className={cn('side-menu-item')}  >{t("navigation.about-us")}</p>}
            {!isAuth
                ? <p className={cn('side-menu-item')} onClick={() => clickHandle('sign-in')}>{t("navigation.sign-in")}</p>
                : <p className={cn('side-menu-item')} onClick={signoutHandle}>{t("navigation.sign-out")}</p>
            }
        </div>
    )
}
export default BurgerMenu;
