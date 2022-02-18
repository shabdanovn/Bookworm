import React, {useState} from 'react';
import './Header.scss'
import classNames from 'classnames'
import darkLogo from '../../../images/dark_logo.png'
import lightLogo from '../../../images/white_logo.png'

const Header = () => {
    const [darkTheme, setdarkTheme] = useState(false)
    const changeTheme = () => {
        setdarkTheme(prevState => !prevState)
    }

    return (
        <div className={classNames('header', {dark: darkTheme})} >
            {darkTheme
                ? <img className={classNames('logo')}
                       src={lightLogo} alt={'dark_logo'} onClick={changeTheme}/>
                : <img className={classNames('logo')}
                       src={darkLogo} alt={'light_logo'} onClick={changeTheme}/>
            }

        </div>
    )
}

export default Header;
