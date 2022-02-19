import React from 'react';
import './Footer.scss'
import classNames from 'classnames'
import lightLogo from '../../../images/white_logo.png'
import Up from '../../../images/Up.png'

const Footer = () => {

    return (
        <div className={classNames('footer-content')} >
            <img className={classNames('logo')}
                 src={lightLogo} alt={'dark_logo'} />

            <img  className={classNames('up-pic')}
                  src={Up} alt={'up logo'}/>

            <p>Shabdanov N. 2022</p>
        </div>
    )
}

export default Footer;
