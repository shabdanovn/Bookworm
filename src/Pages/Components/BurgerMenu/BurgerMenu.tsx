import React from 'react';
import {useTranslation} from "react-i18next";
import cn from "classnames";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import './BurgerMenu.scss'
import useModal from "../../../hooks/useModal";

const BurgerMenu = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {close} = useModal()
    const location = useLocation()

    const clickHandle = (text: string) => {
        navigate(text)
        close()
    }
    return(
        <div className={cn('side-menu')}>
            <p className={cn('side-menu-item', {active: location.pathname==='/'})}
               onClick={() => clickHandle('/')}>{t("navigation.main")}</p>
            <p className={cn('side-menu-item', {active: location.pathname==='books'})}
               onClick={() => clickHandle('books')}>{t("navigation.books")}</p>
            {location.pathname==='/' && <p className={cn('side-menu-item')}  >{t("navigation.about-us")}</p>}
            <p className={cn('side-menu-item')} onClick={() => clickHandle('sign-in')}>{t("navigation.sign-in")}</p>
        </div>
    )
}
export default BurgerMenu;
