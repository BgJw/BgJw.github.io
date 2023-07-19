import { NavLink } from 'react-router-dom';
import Badge from '../Badge/Badge';
import { useAppSelector } from '../../Hooks/useDispatch_Selector';

const Navigation = () => {
    const { cart, compare, favorites } = useAppSelector(state => state.BadgeSlice);
    console.log('render navigation');
    
    return (
        <div className='header__options'>

        {/* navigation search */}
        <NavLink to='/filter' className='search-button bttn__link' />

        {/* navigation compare */}
        <NavLink to='/compare' className='compare-link'>
            <Badge amount={compare.amount} />
        </NavLink>

        {/* navigation favorites */}
        <NavLink to="/favorites" className='favorites-link'>
            <Badge amount={favorites.amount} />
        </NavLink>

        {/* navigation cart */}
        <NavLink to="/cart" className='cart-link'  >
            <Badge amount={cart.amount} />
        </NavLink>
    </div>
    );
};

export default Navigation;