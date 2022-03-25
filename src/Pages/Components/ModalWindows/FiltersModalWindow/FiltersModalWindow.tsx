import React, {ChangeEvent, useCallback, useState} from 'react';
import cn from "classnames";
import './FiltersModalWindow.scss'
import Select, {OnChangeValue} from 'react-select'
import {useTranslation} from "react-i18next";
// import makeAnimated from 'react-select/animated';

interface IOption{
    value: string
    label: string
}

const genres: IOption[] = [
    { value: 'All', label: 'All' },
    { value: 'Adult', label: 'Adult' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Biography', label: 'Biography' },
    { value: 'Business fiction', label: 'Business fiction' },
    { value: 'Classics', label: 'Classics' },
    { value: 'Children\'s', label: 'Children\'s' },
    { value: 'Crime', label: 'Crime' },
    { value: 'Detective', label: 'Detective' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'History', label: 'History' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Literary Fiction', label: 'Literary Fiction' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Poetry', label: 'Poetry' },
    { value: 'Romans', label: 'Romans' },
    { value: 'SCI-FI', label: 'SCI-FI' },
    { value: 'Thriller', label: 'Thriller' }
]

const cities: IOption[] = [
    { value: 'All', label: 'All' },
    { value: 'Bishkek', label: 'Bishkek' },
    { value: 'Osh', label: 'Osh' },
    { value: 'Kara-Kol', label: 'Kara-Kol' },
    { value: 'Talas', label: 'Talas' },
    { value: 'Djalal-Abad', label: 'Djalal-Abad' },
    { value: 'Toktogul', label: 'Toktogul' },
    { value: 'Naryn', label: 'Naryn' },
    { value: 'LA', label: 'LA' },
    { value: 'NYC', label: 'NYC' },
    { value: 'Las-Vegas', label: 'Las-Vegas' }
]

// const animatedComponents = makeAnimated();

interface IFiltersModalWindow{
    close: () => void
}

const FiltersModalWindow = ({close}: IFiltersModalWindow) => {
    const {t} = useTranslation()

    const [genre, setGenre] = useState<IOption>({value: 'All', label:'All'})
    const [city, setCity] = useState<IOption>({value: 'All', label:'All'})
    const [selectedRadio, setSelectedRadio] = useState<string>('price')

    const onChangeGenre = useCallback((newValue: OnChangeValue<IOption, boolean>) => (
        setGenre(newValue as IOption)),
        [setGenre]
    );

    const onChangeCity = useCallback((newValue: OnChangeValue<IOption, boolean>) => (
        setCity(newValue as IOption)),
        [setCity]
    );

    const onRadioChange = useCallback((e: ChangeEvent<HTMLInputElement>) => (
        setSelectedRadio(e.target.value)),
        [setSelectedRadio]
    );

    const doneClick = () => {
        let filters = {genre: genre.value, city: city.value, selectedRadio}
        // console.log(filters)
        close()
    }

    return (
        <div className={cn('filters-modal')}>
            <p className={cn('title')}>{t('books.filters.title')}</p>
            <div className={cn('filters')}>
                <div className={cn('genre')}>
                    <p className={cn('filter-title')}>{t('books.filters.genre')}</p>
                    <Select classNamePrefix={'custom-select'}
                            options={genres} placeholder={'Choose...'}
                            value={genre} onChange={onChangeGenre}
                            isMulti={false} isSearchable
                    />
                </div>
                <div className={cn('city')}>
                    <p className={cn('filter-title')}>{t('books.filters.city')}</p>
                    <Select classNamePrefix={'custom-select'}
                            options={cities} placeholder={'Choose...'}
                            value={city} onChange={onChangeCity}
                            isMulti={false} isSearchable
                    />
                </div>
                <div className={cn('checkboxes')}>
                    <div className={cn('checkbox-group')}>
                        <input type="radio" id="price"
                               name="filter-radio" value="price"
                               onChange={onRadioChange}
                               checked={selectedRadio==='price'}/>
                        <label htmlFor="price">{t('books.filters.price')}</label>
                    </div>

                    <div className={cn('checkbox-group')}>
                        <input type="radio" id="free"
                               name="filter-radio" value="free"
                               onChange={onRadioChange}
                        />
                        <label htmlFor="free">{t('books.filters.free')}</label>
                    </div>

                    <div className={cn('checkbox-group')}>
                        <input type="radio" id="bookcrossing"
                               name="filter-radio" value="bookcrossing"
                               onChange={onRadioChange}
                        />
                        <label htmlFor="bookcrossing">{t('books.filters.bookcrossing')}</label>
                    </div>
                </div>
            </div>
            <button onClick={doneClick}>{t('books.filters.done')}</button>
        </div>
    );
};

export default FiltersModalWindow;
