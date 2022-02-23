import React from 'react';
import cn from "classnames";
import './Main.scss'
import MainLayout from "../Components/MainLayout/MainLayout";
import TitlePage from "./TitlePage/TitlePage";
import FeaturesPage from "./FeaturesPage/FeaturesPage";

const Main = () => {

    return (
        <MainLayout>
            <div className={cn('main')}>
                <TitlePage/>
                <FeaturesPage/>
            </div>
        </MainLayout>
    );
};

export default Main;
