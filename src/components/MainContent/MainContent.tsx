import {useAppDispatch, useAppSelector } from '../../Hooks/useDispatch_Selector';
import { IClothesService, Status } from '../../types/Types';
import FilterButton from './FilterButton';
import Products from '../Products/Products';
import './MainContent.scss';
import Skeleton from '../Skeleton';
import { useEffect } from 'react';
import { fetchClothesForMan, fetchClothesForWoman } from '../../Slices/ProductSlice';



const MainContent = () => {
    const { productsMan, productsWoman, activeFilter, statusMan, statusWoman } = useAppSelector(state => state.ProductSlice);
    const dispatch = useAppDispatch();
        console.log('rendered');
    useEffect(() => {
    if (activeFilter === 'man' && (productsMan.length === 0 && statusMan === Status.idle)) {
    dispatch(fetchClothesForMan());
    } else if (activeFilter === 'woman' && (productsWoman.length === 0 && statusWoman === Status.idle)) {
    dispatch(fetchClothesForWoman());
    }
    }, [activeFilter, dispatch, productsMan.length, productsWoman.length, statusMan, statusWoman]);




    const filterProduct = (products: IClothesService[]): JSX.Element[] => {
        return products.map( (product, i) => (
            <Products key={product.id} product={product} i={i}/>
        ))
    }
    const renderSkeletons = () => {
        return Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} />);
    };

    return (
        <main className='content'>
            {/* filter content  */}
            <div className='content__filter'>
                <FilterButton name={'man'} />
                <FilterButton name={'woman'} />
            </div>
            
             {/* Product content */}
             {(statusMan === Status.error || statusWoman === Status.error) && <p>You need to reload the page</p>}

            <div className="content__products">
                {statusMan === Status.loading || statusWoman === Status.loading
                    ? renderSkeletons()
                    : activeFilter === 'man'
                    ? statusMan === Status.success  && filterProduct(productsMan)
                    : statusWoman === Status.success  && filterProduct(productsWoman)}
            </div>
        </main>
    );
};

export default MainContent;