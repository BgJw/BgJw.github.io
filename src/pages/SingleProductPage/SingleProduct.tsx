import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Hooks/useDispatch_Selector';
import { fetchClothesForSingleProduct } from '../../Slices/ProductSlice';
import { Status } from '../../types/Types';
import Spinner from '../../components/Spinner/Spinner';
import Component from './Component';
import { Helmet } from "react-helmet";
import './SingleProduct.scss';

const SingleProduct = () => {
    const { productId } = useParams();
    const { singleProduct, statusSingleProduct } = useAppSelector(state => state.ProductSlice);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if (productId !== singleProduct.id) {
            dispatch(fetchClothesForSingleProduct(String(productId)))
        }
    }, [dispatch, productId, singleProduct.id]);

    return (
        <>
            <Helmet>
                <title>{singleProduct.alt_description}</title>
            </Helmet>

            {statusSingleProduct === Status.loading && <Spinner />}
            {statusSingleProduct === Status.error && <p> you need to reload page </p>}
            {statusSingleProduct === Status.idle &&
                <Component singleProduct={singleProduct} />
            }
        </>
    )
};

export default SingleProduct;