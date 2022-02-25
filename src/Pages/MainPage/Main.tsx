import React from 'react';
import cn from "classnames";
import './Main.scss'
import MainLayout from "../Components/MainLayout/MainLayout";
import TitlePage from "./TitlePage/TitlePage";
import FeaturesPage from "./FeaturesPage/FeaturesPage";
import BooksChapter from "./BooksChapter/BooksChapter";
import AboutUsPage from "./AboutUsPage/AboutUsPage";

const Main = () => {

    return (
        <MainLayout>
            <div className={cn('main')}>
                <TitlePage/>
                <FeaturesPage/>
                <BooksChapter/>
                <AboutUsPage/>
            </div>
        </MainLayout>
    );
};

export default Main;
