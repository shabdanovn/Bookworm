import React from 'react';
import cn from "classnames";
import './CreateModal.scss'
import useModal from "../../../../hooks/useModal";
import {useNavigate} from "react-router-dom";

enum CreateType {
    Book,
    Post,
    Challenge
}

const CreateModal = () => {
    const {close} = useModal()
    const navigate = useNavigate()

    const navigateHandle = (type: number) => {
        if(type === CreateType.Book) navigate('/create-post')
        else if (type === CreateType.Post) navigate('/create-post-post')
        else navigate('/create-challenge')
        close()
    }

    return (
        <div className={cn('create-modal')}>
            <p onClick={() => navigateHandle(CreateType.Book)}>Create a book</p>
            <p onClick={() => navigateHandle(CreateType.Post)}>Create a post</p>
            <p onClick={() => navigateHandle(CreateType.Challenge)}>Create a challenge</p>
        </div>
    );
};

export default CreateModal;
