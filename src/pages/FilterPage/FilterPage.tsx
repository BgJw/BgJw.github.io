import { useEffect, useState } from 'react';
import { useAppSelector } from '../../Hooks/useDispatch_Selector';
import { country, materials, sizes } from '../../services/ClothesService';
import { IClothesService } from '../../types/Types';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Products from '../../components/Products/Products';
import { Helmet } from "react-helmet";
import './FilterPage.scss';
import MyInput from './MyInput';

export interface IFilter {
    text: string,
    price: string,
    country: string[],
    material: string[],
    size: string[]
}


const FilterPage = () => {

    const { productsMan, productsWoman } = useAppSelector(state => state.ProductSlice);

    const [copyData, setCopyData] = useState<IClothesService[]>([]);

    const [filterOptions, setFilterOptions] = useState<IFilter>({
        text: '',
        price: '150',
        country: [],
        material: [],
        size: []
    });

    // open filter options
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [popUp, setPopUp] = useState(true);

    const filterClothers = (data: IClothesService[]) => {
        let copy = [...data];

        if (filterOptions.text.trim()) {
            copy = copy.filter(el => el.alt_description.includes(filterOptions.text));
        }
        if (filterOptions.price) {
            copy = copy.filter(el => Number(el.price) <= Number(filterOptions.price))
        }
        if (filterOptions.size.length > 0) {

            copy = isAvailabilityOptions(copy, filterOptions.size, 'sizes')
        }
        if (filterOptions.country.length > 0) {

            copy = isAvailabilityOptions(copy, filterOptions.country, 'country')
        }

        if (filterOptions.material.length > 0) {

            copy = isAvailabilityOptions(copy, filterOptions.material, 'material')
        }

        setCopyData(copy);
    }

    const isAvailabilityOptions = (data: IClothesService[], filter: string[], option: string) => {
        type key = keyof IClothesService;

        const temp = [];

        for (let i = 0; i < data.length; i++) {
            let s = data[i][option as key];

            if (filter.includes(String(s))) {
                temp.push(data[i])
            }
        }
        return temp
    };

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

        filterClothers([...productsMan, ...productsWoman]);

    }, [filterOptions, productsMan, productsWoman]);

    useEffect(() => {

        setTimeout( () => {
            setPopUp(false);
        }, 10000)
    }, [])
    return (
        <div className='filter'>
            <Helmet>
                <title>Search - Find the best for you</title>
            </Helmet>


            {/* links */}
            <Breadcrumbs />

            {/* filter Input */}
            <div className={`filter__position ${isOpenFilter ? 'active' : ''}`}>
                <h2>How to filter things?</h2>
                {/* search for filter products */}
                <div className='filter__position__search'>
                    <div 
                        className='bttnOptions'>
                            {popUp &&
                            <div className='helpers'>More options &#8681;</div>
                            }
                            <button onClick={() => {setIsOpenFilter(prev => !prev); setPopUp(false)}} />
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
            <div className={`filter__options ${isOpenFilter ? 'active' : ''}`}>
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
            <>
                <hr />
            </>

            <div className='filter__filteredProducts'>
                {
                    copyData.map(product => (
                        <Products key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    );
};

export default FilterPage;