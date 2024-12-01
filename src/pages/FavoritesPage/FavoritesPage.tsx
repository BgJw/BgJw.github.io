import { Link } from 'react-router-dom';
import { useAppSelector } from '../../Hooks/useDispatch_Selector';
import { BadgeType } from '../../types/Types';
import MyButtons from '../../components/MyButtons/MyButtons';
import { Helmet } from "react-helmet";
import './FavoritesPage.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { memo } from 'react';

const FavoritesPage = memo( () => {
    const favorites  = useAppSelector(state => state.BadgeSlice.favorites);
    
    return (
        <>
            <Helmet>
                <title>Your Favorites</title>
            
            </Helmet>
            
            <Breadcrumbs />
            
            <h2 className='pageName'>Favorites</h2>
            
            {favorites.data.length ?
                <div className='favorites'>


                    {favorites.data.map(el => (
                        <div key={el.id} className='favorites__content'>
                            <MyButtons
                                type={BadgeType.favorite}
                                product={el}
                            />
                            <Link to={`/product/${el.id}`}>
                                <img className='favorites__content-img' src={el.urls.regular} alt={el.alt_description} />
                            </Link>

                            <div className='favorites__content-title'>
                                <p>{el.alt_description}</p>
                                <div className='favorites__content-title-buy'>
                                    <span className='favorites__content-title-buy-price'>{el.price} $</span>
                                    <Link to={`/product/${el.id}`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <h3 className='pageEmpty'>Favorites list is empty</h3>
            }
        </>
    );
});

export default FavoritesPage;