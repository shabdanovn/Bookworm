import React from 'react';
import cn from "classnames";
import {useTheme} from "../../../../hooks/useTheme";
import './Bell.scss'

const Bell = () => {
    const {isDark} = useTheme()
    return (
        <svg className={cn('bell-icon', {dark: isDark})} viewBox="0 0 32 32" fill={'currentColor'}>
            <title/>
            <g data-name="Layer 30" id="Layer_30">
                <path className="cls-1"
                      d="M27,27H5a1,1,0,0,1-.89-1.45,18.14,18.14,0,0,0,1.89-8V14a10,10,0,0,1,20,0v3.53a18.14,18.14,0,0,0,1.89,8A1,1,0,0,1,27,27ZM6.55,25h18.9A20.14,20.14,0,0,1,24,17.53V14A8,8,0,0,0,8,14v3.53A20.14,20.14,0,0,1,6.55,25Z"/>
                <path className="cls-1"
                      d="M16,31a5,5,0,0,1-5-5,1,1,0,0,1,2,0,3,3,0,0,0,.88,2.12,3.08,3.08,0,0,0,4.24,0,1,1,0,0,1,1.42,1.42A5,5,0,0,1,16,31Z"/>
                <path className="cls-1" d="M16,6a1,1,0,0,1-1-1V2a1,1,0,0,1,2,0V5A1,1,0,0,1,16,6Z"/>
                </g>
        </svg>
    );
};

export default Bell;
