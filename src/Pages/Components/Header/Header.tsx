import React, {MouseEvent, useState} from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {useTheme} from "../../../hooks/useTheme";
import cn from 'classnames'
import darkLogo from '../../../images/dark_logo.png'
import lightLogo from '../../../images/white_logo.png'
import './Header.scss'
import LangDropdown from "../LangDropdown/LangDropdown";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import useModal from "../../../hooks/useModal";
import SwitcherIcon from "./SwitcherIcon";


const Header = () => {
    const {isDark, setIsDark} = useTheme()
    const {t} = useTranslation()
    const {setModalContent, open} = useModal()
    const navigate = useNavigate()
    const location = useLocation()


    const changeTheme = () => {
        if(isDark){
            setIsDark(false)
            localStorage.removeItem('theme')
        }else{
            setIsDark(true)
            localStorage.setItem('theme', 'dark')
        }
    }

    const burgerHandle = () => {
        setModalContent(<BurgerMenu/>)
        open()
    }

    return (
        <div className={cn('header', {dark: isDark})} >

            {/*Burger menu*/}
            <div className={cn('burger-menu')}
                 onClick={burgerHandle}>
                <div className={cn('burger-menu-1')}/>
                <div className={cn('burger-menu-2')}/>
                <div className={cn('burger-menu-3')}/>
            </div>

            {/*Ordinary menu with logo*/}
            {isDark
                ? <img className={cn('logo')}
                       src={lightLogo} alt={'dark_logo'} />
                : <img className={cn('logo')}
                       src={darkLogo} alt={'light_logo'} />
            }

            <div className={cn('menu-nav')}>
                <NavLink className={cn('menu-item menu-nav__main', {active: location.pathname==='/'})}
                         to={'/'}>{t("navigation.main")}</NavLink>
                <NavLink className={cn('menu-item menu-nav__books', {active: location.pathname==='books'})}  to={'books'}>{t("navigation.books")}</NavLink>
                {location.pathname==='/' && <p className={cn('menu-item menu-nav__about')} >{t("navigation.about-us")}</p>}
                <LangDropdown />

                <SwitcherIcon changeTheme={changeTheme} />
                {location.pathname!=='/sign-in' && location.pathname!=='/sign-up' && <div className={cn('menu-item sign-in', {'dark-theme': isDark})}>
                    <p onClick={() => navigate('sign-in')}>{t("navigation.sign-in")}</p>
                </div>}
            </div>
        </div>
    )
}

export default Header;
