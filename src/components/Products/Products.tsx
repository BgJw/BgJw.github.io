import { Link } from 'react-router-dom';
import './Products.scss';
import MyButtons from '../MyButtons/MyButtons';
import { BadgeType, IClothesService } from '../../types/Types';

interface IProduct {
    product: IClothesService,
    i: number
}

const Products = ({ product, i }: IProduct) => {

    return (
        <div className='product'>
            <div className='product__img'>
                <MyButtons
                    type={BadgeType.favorite}
                    product={product}
                />
                <Link to={`/product/${product.id}`} aria-label={`View details of ${product.alt_description}`}>
                    <img
                        className='product__img-photo lazy'
                        src={product.urls.thumb}
                        srcSet={`
                            ${product.urls.thumb} 600w,
                            ${product.urls.small} 900w,
                        `}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt={product.alt_description}
                        width={200}
                        height={300}
                        loading={ i < 6 ? 'eager' : 'lazy'}
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
