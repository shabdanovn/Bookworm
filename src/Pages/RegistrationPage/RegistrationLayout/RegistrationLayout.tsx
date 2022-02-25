import React, {ReactChild, ReactNode} from 'react';
import './RegistrationLayout.scss'
import MainLayout from "../../Components/MainLayout/MainLayout";
import cn from "classnames";
import danielImg from "../../../images/daniel.png";
import statues from "../../../images/statue.png";
import frames from "../../../images/art2.png";
import SignInPage from "../Signin/SignInPage";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

interface RegistrationLayoutProps{
    children: ReactNode | ReactChild
    titleText: string
    ButtonText: string
    path: string
}

const RegistrationLayout = ({children, titleText, ButtonText, path}:RegistrationLayoutProps) => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    return (
        <MainLayout>
            <div className={cn('registration')}>
                <div className={cn('account')}>
                    <p>{t(titleText)}</p>
                    <button onClick={() => navigate(path)}
                            className={cn('account-btn')}>{t(ButtonText)}</button>
                </div>
                {children}
                <img src={danielImg} className={cn('daniel-img')} alt={'Bg image'}/>
                <img src={statues} className={cn('statue-img')} alt={'Bg image'}/>
                <img src={frames} className={cn('frames-img')} alt={'Bg image'}/>
            </div>
        </MainLayout>
    );
};

export default RegistrationLayout;
