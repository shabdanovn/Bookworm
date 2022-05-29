import React, {useCallback, useEffect, useState} from 'react';
import './GenresDropdown.scss'
import cn from "classnames";
import Select, {OnChangeValue} from "react-select";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getAllGenres} from "../../../redux/slices/genres.slice";
import {BookType, GenreType, IOption} from "../../../types/books";
import {getFilteredBooks} from "../../../redux/slices/books.slice";
import {GenresList} from "./GenresList";

interface IGenresDropdownProps{
    setBooks: (books: BookType[]) => void
}

const GenresDropdown = ({setBooks}: IGenresDropdownProps) => {
    const {t} = useTranslation()
    const [genre, setGenre] = useState<IOption>({value: t(`genres.All`), label: t(`genres.All`)})
    const {genres, isLoading} = useAppSelector(state => state.genres)
    const [genresList, setGenresList] = useState<IOption[]>(genres)
    const {books} = useAppSelector(state => state.books)
    const dispatch = useAppDispatch()

    const onChangeGenre = useCallback((newValue: OnChangeValue<IOption, boolean>) => (
            setGenre(newValue as IOption)),
        [setGenre]
    );

    useEffect(() => {
        if(genres.length===0) dispatch(getAllGenres())
    },[])

    useEffect(() => {
        if(genre.value && genre.value!==t(`genres.All`)) dispatch(getFilteredBooks(genre.value))
        else setBooks(books)
    }, [genre]);


    useEffect(() => {
        GenresList({genres, setGenresList, t})
    },[genres])

    // const changeValue = ():IOption => {
    //     let value = t(`genres.${genre.value}`)
    //     let label = t(`genres.${genre.value}`)
    //     return {value, label}
    // }

    return (
        <div className={cn('genres-dropdown')}>
            <Select classNamePrefix={cn('input-item1')}
                    placeholder={'Choose...'}
                    options={genresList}
                    value={genre} onChange={onChangeGenre}
                    isMulti={false} isSearchable
            />
        </div>
    );
};

export default GenresDropdown;
