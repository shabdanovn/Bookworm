import React from 'react';
import {useTranslation} from "react-i18next";
import cn from "classnames";
import {NavLink} from "react-router-dom";
import './BurgerMenu.scss'

const BurgerMenu = () => {
    const {t} = useTranslation()
    return(
        <div className={cn('side-menu')}>
            <NavLink className={cn('side-menu-item active')} to={'/'}>{t("navigation.main")}</NavLink>
            <NavLink className={cn('side-menu-item')}  to={'users'}>{t("navigation.books")}</NavLink>
            <p className={cn('side-menu-item')}  >{t("navigation.about-us")}</p>
            <NavLink className={cn('side-menu-item')}  to={'sign-in'}>{t("navigation.sign-in")}</NavLink>
        </div>
    )
}
export default BurgerMenu;
