import React from 'react';
import cn from "classnames";
import './FiltersModalWindow.scss'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

interface IOption{
    value: string
    label: string
}

const genres: IOption[] = [
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

const animatedComponents = makeAnimated();

const FiltersModalWindow = () => {
    return (
        <div className={cn('filters-modal')}>
            <p className={cn('title')}>Filters</p>
            <div className={cn('filters')}>
                <div className={cn('genre')}>
                    <p className={cn('filter-title')}>Genre</p>
                    <Select classNamePrefix={'custom-select'}
                            options={genres} placeholder={'Choose...'}
                            isSearchable
                            isMulti
                            components={animatedComponents}
                    />
                </div>
                <div className={cn('city')}>
                    <p className={cn('filter-title')}>City</p>
                    <Select classNamePrefix={'custom-select'}
                            options={cities} placeholder={'Choose...'}
                            isSearchable
                    />
                </div>
                <div className={cn('checkboxes')}>
                    <div className={cn('checkbox-group')}>
                        <input type="radio" id="price"
                               name="filter-radio" value="price"
                               checked={true}/>
                        <label htmlFor="price">Price</label>
                    </div>

                    <div className={cn('checkbox-group')}>
                        <input type="radio" id="free"
                               name="filter-radio" value="free" />
                        <label htmlFor="free">Free</label>
                    </div>

                    <div className={cn('checkbox-group')}>
                        <input type="radio" id="bookcrossing"
                               name="filter-radio" value="bookcrossing" />
                        <label htmlFor="bookcrossing">Bookcrossing</label>
                    </div>
                </div>
            </div>
            <button>Done</button>
        </div>
    );
};

export default FiltersModalWindow;
