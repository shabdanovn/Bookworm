import React, {ChangeEvent, useState} from 'react';
import './FileUploader.scss'
import cn from "classnames";
import {useTranslation} from "react-i18next";

interface IFileUploader{
    title?: string
    setFiles: (files: FileList | null) => void
}

const FileUploader = ({setFiles, title}: IFileUploader) => {
    const {t} = useTranslation()

    return (
        <div className={'pic-file'}>
            <input type="file" name="file" id="file"
                   className={cn('inputfile')}
                   accept={'image/jpeg, image/png'}
                   onChange={(e: ChangeEvent<HTMLInputElement> ) =>  setFiles(e.target.files)}
            />
            <label htmlFor="file">{title}</label>
        </div>
    );
};

export default FileUploader;
