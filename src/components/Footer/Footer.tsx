import { Link } from 'react-router-dom';
import './Footer.scss';
import { memo } from 'react';

const telegram = require('../../assets/icons/telegram_icon.png');
const facebook = require('../../assets/icons/facebook_icon.png');
const youtube = require('../../assets/icons/youtube_icon.png');

const Footer = memo(() => {
    
    return (
        <footer className='footer'>
            <div className='footer__position'>
                <Link 
                    to={'/'} 
                    className='footer__logo'
                    aria-label='logo'
                    onClick={() => window.scrollTo({top: 0, left: 0, behavior: "smooth" })}
                />
            </div>
            <hr />
            <div className='footer__icons'>
                <img src={telegram} alt="telegram" loading='lazy' />
                <img src={facebook} alt="facebook" loading='lazy' />
                <img src={youtube} alt="youtube" loading='lazy' />
            </div>
            
        </footer>
    );
});

export default Footer;