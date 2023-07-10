import { Link } from 'react-router-dom';
import { BadgeType, IClothesService } from '../../types/Types';
import MyButtons from '../../components/MyButtons/MyButtons';

interface IProps {
    el: IClothesService,
    i: number
};

const Component = ({ el, i }: IProps) => {

    return (
        <div className='compare'>
            <Link to={`/product/${el.id}`} >
                <img className='compare__img' src={el.urls.regular} alt={el.alt_description} />
            </Link>
            <div className='compare__information'>
                <p className='compare__information-p'>{el.alt_description}</p>
               
                <div className='compare__information-bttn'>
                        <MyButtons
                            type={BadgeType.compare}
                            product={el}
                        />
                        <MyButtons
                            type={BadgeType.favorite}
                            product={el}
                        />
                </div>
                <div className='compare__information-feather'>
                    <small>{i === 0 && 'Price'}</small> <p>{el.price} $</p>
                    <small>{i === 0 && 'Material'}</small> <p> {el.material}</p>
                    <small>{i === 0 && 'Country'}</small> <p> {el.country}</p>

                </div>
            </div>
        </div>
    );
};

export default Component;