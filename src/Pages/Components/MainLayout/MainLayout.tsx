import React, {ReactChild, ReactNode} from 'react';
import classNames from "classnames";
import Header from "../Header/Header";
import './MainLayout.scss'
import Footer from "../Footer/Footer";
import {useTheme} from "../../../hooks/useTheme";

interface MainLayoutProps{
    children: ReactChild | ReactNode
}

const MainLayout = ({children}:MainLayoutProps) => {
    const {isDark} = useTheme()

    return (
        <div className={classNames('mainLayout', {dark: isDark})}>
            <div className={classNames('mainLayout-content')}>
                {/*<div className={classNames('header')}/>*/}
                <Header/>
                {children}
                <div className={classNames('footer')}/>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
