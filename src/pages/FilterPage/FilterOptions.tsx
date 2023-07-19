import React, { memo, useEffect, useState } from 'react';
import { country, materials, sizes } from '../../services/ClothesService';
import MyInput from './MyInput';
import { IFilter } from './FilterPage';

interface IProps {
    setFilterOptions: React.Dispatch<React.SetStateAction<IFilter>>,
    filterOptions: IFilter
}
const FilterOptions = memo(({ filterOptions, setFilterOptions }: IProps) => {



    // open filter options
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [popUp, setPopUp] = useState(true);


    const clearAll = () => {
        setFilterOptions({
            text: '',
            price: '150',
            size: [],
            country: [],
            material: [],
        });

    }
    useEffect(() => {

        setTimeout(() => {
            setPopUp(false);
        }, 10000);
    }, [])

    return (
        <>
            <div className={`filter__position ${isOpenFilter ? 'active' : ''}`}>
                <h2>How to filter things?</h2>
                {/* search for filter products */}
                <div className='filter__position__search'>
                    <div className='bttnOptions'>
                        {
                            popUp && <div className='helpers'>More options &#8681;</div>
                        }
                        <button onClick={() => { setIsOpenFilter(prev => !prev); setPopUp(false) }} />
                    </div>
                    <input
                        value={filterOptions.text}
                        type="text"
                        placeholder='Search'
                        className='filter__position__search-input'
                        onChange={(e) => { setFilterOptions({ ...filterOptions, text: e.target.value }) }}
                    />
                    <button
                        className='filter__position__search-bttn'
                    />
                </div>
            </div>
            <div className={`filter__options ${isOpenFilter && 'active'}`}>
                <div className='price'>
                    <span>
                        Price:
                    </span>
                    <input
                        type="range"
                        min={35}
                        max={150}
                        value={filterOptions.price}
                        onChange={(e) => { setFilterOptions({ ...filterOptions, price: e.target.value }) }}
                    />
                    <div>
                        Up to:
                        <input
                            type="number"
                            value={filterOptions.price}
                            onChange={(e) => setFilterOptions({ ...filterOptions, price: e.target.value })}
                        />
                    </div>
                    <button
                        className='bttnClearAll'
                        onClick={clearAll}>
                        Clear all
                    </button>
                </div>
                {/* size  */}
                <MyInput
                    data={sizes}
                    name='size'
                    filterOption={filterOptions}
                    setFilter={setFilterOptions}
                />

                {/* country */}
                <MyInput
                    data={country}
                    name='country'
                    filterOption={filterOptions}
                    setFilter={setFilterOptions}
                />
                {/* material */}
                <MyInput
                    data={materials}
                    name='material'
                    filterOption={filterOptions}
                    setFilter={setFilterOptions}
                />
            </div>
        </>
    );
});

export default FilterOptions;