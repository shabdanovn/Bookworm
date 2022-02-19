import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {useTheme} from "../../../hooks/useTheme";
import cn from 'classnames'
import darkLogo from '../../../images/dark_logo.png'
import lightLogo from '../../../images/white_logo.png'
import darkSwitcher from '../../../images/dark_switcher.png'
import lightSwitcher from '../../../images/light_switcher.png'
import './Header.scss'
import LangDropdown from "../LangDropdown/LangDropdown";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Header = () => {
    const {isDark, setIsDark} = useTheme()
    const [showBurgerMenu, setShowBurgerMenu] = useState(false)
    const {t} = useTranslation()

    const changeTheme = () => isDark ? setIsDark(false):setIsDark(true)

    return (
        <div className={cn('header', {dark: isDark})} >

            {/*Burger menu*/}
            <div className={cn('burger-menu')}
                 onClick={()=> setShowBurgerMenu(prevState => !prevState)}>
                <div className={cn('burger-menu-1')}/>
                <div className={cn('burger-menu-2')}/>
                <div className={cn('burger-menu-3')}/>
            </div>

            {showBurgerMenu && <BurgerMenu/>}

            {/*Ordinary menu with logo*/}
            {isDark
                ? <img className={cn('logo')}
                       src={lightLogo} alt={'dark_logo'} />
                : <img className={cn('logo')}
                       src={darkLogo} alt={'light_logo'} />
            }

            <div className={cn('menu-nav')}>
                <NavLink className={cn('menu-item menu-nav__main', 'active')} to={'/'}>{t("navigation.main")}</NavLink>
                <NavLink className={cn('menu-item menu-nav__books')}  to={'users'}>{t("navigation.books")}</NavLink>
                <p className={cn('menu-item menu-nav__about')} >{t("navigation.about-us")}</p>
                <LangDropdown />

                {isDark
                    ? <img className={cn('theme-switcher')}
                           src={lightSwitcher} alt={'dark switcher'} onClick={changeTheme}/>
                    : <img className={cn('theme-switcher')}
                           src={darkSwitcher} alt={'light switcher'} onClick={changeTheme}/>
                }
                <div className={cn('menu-item sign-in', {'dark-theme': isDark})}>
                    <p>{t("navigation.sign-in")}</p>
                </div>
            </div>
        </div>
    )
}

export default Header;
