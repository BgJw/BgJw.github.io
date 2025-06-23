import { useEffect, useState } from 'react';
import { useAppSelector } from '../../Hooks/useDispatch_Selector';
import { IClothesService } from '../../types/Types';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Products from '../../components/Products/Products';
import { Helmet } from "react-helmet";
import FilterOptions from './FilterOptions';
import './FilterPage.scss';

export interface IFilter {
    text: string;
    price: string;
    country: string[];
    material: string[];
    size: string[];
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

    const isAvailabilityOptions = (
        data: IClothesService[],
        filter: string[],
        option: keyof IClothesService
    ) => {
        return data.filter(item => {
            const field = item[option];

            if (Array.isArray(field)) {
                // Проверяем пересечение массивов
                return field.some(val => filter.includes(String(val)));
            } else if (typeof field === 'string' || typeof field === 'number') {
                return filter.includes(String(field));
            }
            return false;
        });
    };

    const filterClothers = (data: IClothesService[]) => {
        const textLower = filterOptions.text.trim().toLowerCase();

        let filtered = data.filter(el => {
            // Фильтрация по тексту (alt_description)
            if (textLower && !el.alt_description.toLowerCase().includes(textLower)) {
                return false;
            }
            // Фильтрация по цене
            if (filterOptions.price && Number(el.price) > Number(filterOptions.price)) {
                return false;
            }
            return true;
        });

        if (filterOptions.size.length > 0) {
            filtered = isAvailabilityOptions(filtered, filterOptions.size, 'sizes');
        }
        if (filterOptions.country.length > 0) {
            filtered = isAvailabilityOptions(filtered, filterOptions.country, 'country');
        }
        if (filterOptions.material.length > 0) {
            filtered = isAvailabilityOptions(filtered, filterOptions.material, 'material');
        }

        setCopyData(filtered);
    };

    useEffect(() => {
        filterClothers([...productsMan, ...productsWoman]);
    }, [filterOptions, productsMan, productsWoman]);

    return (
        <div className='filter'>
            <Helmet>
                <title>Search - Find the best for you</title>
            </Helmet>

            <Breadcrumbs />

            <FilterOptions 
                filterOptions={filterOptions} 
                setFilterOptions={setFilterOptions} 
            />
            <hr />
            <div className='filter__filteredProducts'>
                {copyData.map((product, i) => (
                    <Products key={product.id} product={product} i={i} />
                ))}
            </div>
        </div>
    );
};

export default FilterPage;
