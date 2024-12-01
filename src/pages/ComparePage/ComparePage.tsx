import { useAppSelector } from '../../Hooks/useDispatch_Selector';
import Component from './Component';
import { Helmet } from "react-helmet";
import './ComparePage.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const ComparePage = () => {
    const compare = useAppSelector(state => state.BadgeSlice.compare);
    
    return (
        <>
            <Helmet>
                <title>Your Compare</title>
            </Helmet>
            <Breadcrumbs />
            <h2 className='pageName'>Compare</h2>
            {
                compare.data.length ?
                    <div className='container'>
{                        compare.data.map((el, i) => (
                        <Component el={el} key={el.id} i={i}/>
                        ))}
                    </div>
                    :
                    <h3 className='pageEmpty'>Compare list is empty</h3>
            }
        </>
    );
};

export default ComparePage;