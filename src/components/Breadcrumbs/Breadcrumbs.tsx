import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Breadcrumbs.scss';


const Breadcrumbs = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    
    return (
        <div className='bread'>
            <Link to={'/'}>Home</Link>
            /
            <button onClick={() => navigate(-1)}>
                Back
            </button>
            {
            pathname !== '/filter' &&
            <>
                /
                <Link to={'/filter'}>
                    Filter
                </Link>
            </>
            }
        </div>
    );
};

export default Breadcrumbs;