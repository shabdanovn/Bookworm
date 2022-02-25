import React, {useEffect} from 'react';
import './FeaturesPage.scss'
import cn from 'classnames'
import bookShelf from '../../../images/book_shelf.png'
import buyingIcon from '../../../images/Buying.png'
import sellingIcon from '../../../images/Selling.png'
import sharingIcon from '../../../images/Sharing.png'
import smsingIcon from '../../../images/SMSing.png'
import {useTranslation} from "react-i18next";
import {useTheme} from "../../../hooks/useTheme";
import H2 from "../../Components/H2/H2";
import H3 from "../../Components/H3/H3";

const FeaturesPage = () => {
    const {t} = useTranslation()
    const {isDark} = useTheme()

    return (
        <div className={cn('features-page', {dark: isDark})}>
            <div className={cn('description')}>
                <div className={cn('description-text')}>
                    <p className={cn('above-title')}>{t('main-page.features-page.above-title')}</p>
                    <H2 text={'main-page.features-page.title'}/>
                    <H3 text={'main-page.features-page.descr'}/>
                </div>
                <img data-aos="fade-up" className={cn('description-img')}
                     src={bookShelf} alt={'Bookshelf'}/>
            </div>
            <div className={cn('features')}>
                <div className={cn('features-group1')}>
                    <div className={cn('feature1')}>
                        <img src={buyingIcon} alt={'Buying'}/>
                        <p>{t('main-page.features-page.buying')}</p>
                    </div>
                    <div className={cn('feature2')}>
                        <img src={sellingIcon} alt={'Selling'}/>
                        <p>{t('main-page.features-page.selling')}</p>
                    </div>
                </div>

                <div className={cn('features-group2')}>
                    <div className={cn('feature3')}>
                        <img src={sharingIcon} alt={'Sharing'}/>
                        <p>{t('main-page.features-page.sharing')}</p>
                    </div>
                    <div className={cn('feature4')}>
                        <img src={smsingIcon} alt={'Smsing icon'}/>
                        <p>{t('main-page.features-page.smsing')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesPage;
