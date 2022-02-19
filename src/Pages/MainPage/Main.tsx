import React from 'react';
import classNames from "classnames";
import './Main.scss'
import MainLayout from "../Components/MainLayout/MainLayout";

const Main = () => {
    return (
        <MainLayout>
            <div className={classNames('main')}>
                <p>Main page</p>
            </div>
        </MainLayout>
    );
};

export default Main;
