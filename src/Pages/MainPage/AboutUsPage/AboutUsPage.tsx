import React from 'react';
import cn from "classnames";
import Button from "../../Components/Button/Button";
import world from '../../../images/world_map_home.png'
import art from '../../../images/artt.png'
import H2 from "../../Components/H2/H2";
import H3 from "../../Components/H3/H3";
import './AboutUsPage.scss'

const AboutUsPage = () => {
    return (
        <div className={cn('aboutus-page')}>
            <div className={cn('about-description')}>
                <H2 text={'main-page.aboutus.title'} margin={true}/>
                <H3 text={'main-page.aboutus.descr'}/>
                <Button text={'main-page.aboutus.sign-in'}
                        mTopBottom={true} path={'sign-in'}/>
            </div>
            <div className={cn('about-image')}>
                <img src={world} alt={'World map'}/>
            </div>
        </div>
    );
};

export default AboutUsPage;
