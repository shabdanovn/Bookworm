import React from 'react';

interface IAddIcon{
    width: string,
    onClick?: () => void
}

const AddIcon = ({width, onClick}: IAddIcon) => {
    return (
        <svg fill="none" height={width}
             onClick={onClick} width={width} style={{cursor: 'pointer'}}
             stroke={'currentColor'} strokeLinecap="round"
             strokeLinejoin="round" strokeWidth="2"
             viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" x2="12" y1="8" y2="16"/>
            <line x1="8" x2="16" y1="12" y2="12"/>
        </svg>
    );
};

export default AddIcon;
