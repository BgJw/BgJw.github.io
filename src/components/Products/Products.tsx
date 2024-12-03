import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Products.scss';
import MyButtons from '../MyButtons/MyButtons';
import { BadgeType, IClothesService } from '../../types/Types';

interface IProduct {
    product: IClothesService,
    i: number
}

const Products = ({ product, i }: IProduct) => {
    const [itemsToShow, setItemsToShow] = useState<number>(7); 

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 426) {
                setItemsToShow(2);
            } else if (window.innerWidth < 769) {
                setItemsToShow(3);
            } else if (window.innerWidth < 1025) {
                setItemsToShow(5);
            } else {
                setItemsToShow(7);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []); 

    return (
        <div className='product'>
            <div className='product__img'>
                <MyButtons
                    type={BadgeType.favorite}
                    product={product}
                />
                <Link to={`/product/${product.id}`} aria-label={`View details of ${product.alt_description}`}>
                    <img
                        className='product__img-photo'
                        src={product.urls.regular}
                        srcSet={`
                            ${product.urls.thumb} 600w,
                            ${product.urls.regular} 900w,
                        `}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt={product.alt_description}
                        loading={i < itemsToShow ? 'eager' : 'lazy'}
                    />
                </Link>
            </div>

            <div className='product__preview'>
                <div className='product__preview-title'>{product.alt_description}</div>
                <div className='product__preview-buy'>
                    <p>{product.price} $</p>
                    <Link to={`/product/${product.id}`} aria-label='add to cart' />
                </div>
            </div>
        </div>
    );
};

export default Products;
