import {useAppSelector } from '../../Hooks/useDispatch_Selector';
import { IClothesService, Status } from '../../types/Types';
import FilterButton from './FilterButton';
import Products from '../Products/Products';
import Spinner from '../Spinner/Spinner';

import './MainContent.scss';



const MainContent = () => {
    const { productsMan, productsWoman, activeFilter, statusMan, statusWoman } = useAppSelector(state => state.ProductSlice);


    console.log('render MainContent');
    

    const filterProduct = (products: IClothesService[]): JSX.Element[] => {
        return products.map( product => (
            <Products key={product.id} product={product} />
        ))
    }


    return (
        <main className='content'>
            {/* filter content  */}
            <div className='content__filter'>
                <FilterButton name={'man'} />
                <FilterButton name={'woman'} />
            </div>
            
            {/* Product content */}
            { (statusMan === Status.error || statusWoman === Status.error) && <p>you need reload page</p> }
            { (statusMan === Status.loading || statusWoman === Status.loading) && <Spinner /> }

            <div className='content__products'>
                {
                    activeFilter === 'man' ?
                        <>
                            {statusMan === Status.idle && filterProduct(productsMan)}
                        </>
                        :
                        <>
                            {statusWoman === Status.idle && filterProduct(productsWoman)}
                        </>
                }
            </div>
        </main>
    );
};

export default MainContent;