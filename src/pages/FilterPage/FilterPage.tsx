import { useEffect, useState } from 'react';
import { useAppSelector } from '../../Hooks/useDispatch_Selector';
import { IClothesService } from '../../types/Types';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Products from '../../components/Products/Products';
import { Helmet } from "react-helmet";
import FilterOptions from './FilterOptions';
import './FilterPage.scss';

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

        const temp: IClothesService[] = [];

        for (let i = 0; i < data.length; i++) {
            let s = data[i][option as key];

            if (filter.includes(String(s))) {
                temp.push(data[i])
            }
        }
        return temp
    };


    useEffect(() => {

        filterClothers([...productsMan, ...productsWoman]);

    }, [filterOptions, productsMan, productsWoman]);


    return (
        <div className='filter'>
            <Helmet>
                <title>Search - Find the best for you</title>
            </Helmet>


            {/* links */}
            <Breadcrumbs />

            {/* filter Input */}
            <FilterOptions 
                filterOptions={filterOptions} 
                setFilterOptions={setFilterOptions} />
            <hr />
            <div className='filter__filteredProducts'>
                {
                    copyData.map((product, i )=> (
                        <Products key={product.id} product={product} i={i} />
                    ))
                }
            </div>
        </div>
    );
};

export default FilterPage;
