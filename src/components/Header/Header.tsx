import { NavLink } from 'react-router-dom';
import './Header.scss';
import Navigation from './Navigation';

export const logo = require('../../assets/logo/logo.svg').default;


interface IProps {
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>,
    showSidebar: boolean
}
const Header = ({setShowSidebar, showSidebar}: IProps) => {
    
    return (
        <>
            <header className='header'>
                {/* navigator menu  */}
                <button 
                    className='header__menu bttn__link'
                    aria-label='navigation' 
                    onClick={ () => setShowSidebar(true) }
                    />

                {/* navigator logo */}
                <NavLink to="/" className={showSidebar ? 'header__logo hide':'header__logo show'}>
                    <img src={logo} alt="O stories" loading='lazy' width={300} height={50} />
                </NavLink>

                {/* navigator options */}
                <Navigation />
            </header>
            <hr />
        </>
    );
};

export default Header;
