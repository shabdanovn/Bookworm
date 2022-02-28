import React from 'react';
import cn from "classnames";
import './FiltersModalWindow.scss'
import Button from "../../Button/Button";

const FiltersModalWindow = () => {
    return (
        <div className={cn('filters-modal')}>
            <p className={cn('title')}>Filters</p>
            <div className={cn('filters')}>
                <div className={cn('genre')}>
                    {/*<p className={cn('filter-title')}>Genre</p>*/}
                    <select className={cn('select')} value={'Horror'}
                            title={'Genre'} />
                </div>
                <div className={cn('city')}>
                    {/*<p className={cn('filter-title')}>Genre</p>*/}
                    <select className={cn('select')} value={'Bishkek'}
                            title={'City'} />
                </div>
                <div className={cn('price')}>
                    {/*<p className={cn('filter-title')}>Genre</p>*/}
                    <select className={cn('select')} value={'1000'}
                            title={'Price'} />
                </div>
                <div className={cn('checkboxes')}>
                    <input type={"checkbox"} title={'Bookcrossing'}/>
                    <input type={"checkbox"} title={'Free'}/>
                </div>
            </div>
            <button>Done</button>
        </div>
    );
};

export default FiltersModalWindow;
