
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../Header/Header';
import './Sidebar.scss';


interface IProps {
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>,
    showSidebar: boolean
}

const Sidebar = ({ setShowSidebar, showSidebar }: IProps) => {

    const [style, setStyle] = useState('sidebar show');


    const closeSidebar = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const target = e.target as Element;

        if (target.classList.contains('sidebar__close') || target.classList.contains('sidebar') || target.tagName === 'A') {

            setStyle('sidebar hide');

            setTimeout(() => {
                setShowSidebar(false);
            }, 300);
        }
    }

    return (
        <aside
            className={style}
            onClick={e => closeSidebar(e)}>

            <div className='sidebar__wrap'>
                <header className={showSidebar ? 'show': ''}>
                    <img src={logo} alt="O Stories" />
                </header>

                <main>
                    <ul>
                        <li><Link to='/filter'>Search</Link></li>
                        <li><Link to='/about'>About us</Link></li>
                        <li><Link to='/contacts'>Contacts</Link></li>
                        <li><Link to='/delivery'>Delivery</Link></li>
                        <li><Link to='/payment'>Payment</Link></li>
                        <li><Link to='/login'>Account</Link></li>
                    </ul>
                </main>

                <footer>
                        Location:
                    <div className='map'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7815.450666198415!2d18.59964966762374!3d54.38264759772572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd74ea79e3fd01%3A0x3cd7c4eada1b8ed4!2sGaleria%20Ba%C5%82tycka!5e0!3m2!1sen!2spl!4v1681559533268!5m2!1sen!2spl"
                            width="80%" height="90%" loading='lazy' style={{ border: 0}} allowFullScreen={false} referrerPolicy="no-referrer-when-downgrade" title='location'>
                        </iframe>
                    </div>
                </footer>

            </div>
            <button className='sidebar__close'>
                X
            </button>
        </aside>
    )

};

export default Sidebar;